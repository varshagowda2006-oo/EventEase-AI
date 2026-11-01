import { EventInputData, GeneratedEventPlan, ChatMessage } from '../types/event';
import { sampleWeddingPlan, sampleBirthdayPlan, sampleCommunityPlan } from './sampleData';

const GEMINI_API_KEY = import.meta.env.VITE_GEMINI_API_KEY || "";

export const isGeminiConfigured = Boolean(
  GEMINI_API_KEY && 
  GEMINI_API_KEY !== "your-gemini-api-key" && 
  GEMINI_API_KEY.length > 10
);

export interface PlanGenerationResult {
  plan: GeneratedEventPlan;
  isAiGenerated: boolean;
  modelUsed?: string;
  error?: string;
}

export async function generateEventPlanWithAI(input: EventInputData): Promise<PlanGenerationResult> {
  // If not configured, immediately use realistic domain-specific simulation with clear flag
  if (!isGeminiConfigured) {
    console.info("Gemini API key not detected or placeholder. Using intelligent fallback event plan.");
    return {
      plan: getFallbackPlanForInput(input),
      isAiGenerated: false
    };
  }

  const systemPrompt = `You are EventEase AI, an expert luxury event planner, financial budget estimator, and cultural celebration director.
Generate a comprehensive, highly customized event plan in strict JSON format based on the user's specific requirements.
All financial estimates must be in Indian Rupees (INR ₹) and the total sum of allocated budget categories must exactly match or be just under the user's total budget of ₹${input.budget.toLocaleString('en-IN')}.
Make ideas culturally nuanced, modern, and realistic for ${input.location || 'India'}.

Return ONLY valid JSON matching this schema:
{
  "overview": {
    "concept": "string",
    "recommendedTheme": "string",
    "colorPalette": ["#hex1", "#hex2", "#hex3", "#hex4", "#hex5"],
    "decorationIdeas": ["string", "string", "string", "string"],
    "personalizedSuggestions": ["string", "string", "string", "string"],
    "highlights": ["string", "string", "string"]
  },
  "budgetBreakdown": [
    {
      "category": "string (e.g. Venue, Catering, Decoration, Photography, Entertainment, Invitations, Miscellaneous)",
      "allocated": number (in INR),
      "percentage": number,
      "description": "string explaining what this covers"
    }
  ],
  "timeline": [
    {
      "task": "string",
      "daysBefore": number,
      "priority": "High" | "Medium" | "Low",
      "category": "string",
      "suggestedDeadlineDescription": "string (e.g. 2 months before)"
    }
  ],
  "vendorChecklist": [
    {
      "category": "string (e.g. Venue, Catering, Decorator, Photographer, DJ/Sound, Florist, Makeup, Security)",
      "suggestedName": "string",
      "estimatedCost": number (in INR),
      "importance": "Must-Have" | "Recommended" | "Optional",
      "deliverables": "string"
    }
  ],
  "personalizedIdeas": {
    "themeConcept": "string",
    "decorStyle": "string",
    "foodMenu": {
      "appetizers": ["string", "string", "string", "string"],
      "mains": ["string", "string", "string", "string"],
      "desserts": ["string", "string", "string"],
      "beverages": ["string", "string", "string"]
    },
    "guestActivities": ["string", "string", "string"],
    "entertainment": ["string", "string"],
    "budgetFriendlyAlternatives": ["string", "string", "string"]
  }
}`;

  const userPrompt = `
Event Details:
- Category: ${input.category}
- Event Name: ${input.name}
- Date: ${input.date}
- Location: ${input.location}
- Total Budget: INR ₹${input.budget}
- Expected Guests: ${input.guestCount}
- Preferred Theme: ${input.theme || 'Open / Curated by AI'}
- Event Style: ${input.style}
- Additional Details / Special Requirements: ${input.additionalRequirements || 'None'}
- Category-specific Details: ${JSON.stringify(input.categorySpecific || {})}

Ensure:
1. Budget allocations are practical and sum up to ₹${input.budget}.
2. Timeline tasks are sorted chronologically from earliest preparation to the event day.
3. Vendors include all essential categories for a ${input.category}.
4. Food menu is curated for ${input.guestCount} guests reflecting ${input.location} and style ${input.style}.
`;

  // Try Gemini 1.5 Flash or 2.0 Flash
  const models = ['gemini-1.5-flash', 'gemini-2.0-flash', 'gemini-1.5-pro'];

  for (const model of models) {
    try {
      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${GEMINI_API_KEY}`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            contents: [
              {
                role: 'user',
                parts: [{ text: `${systemPrompt}\n\n${userPrompt}` }]
              }
            ],
            generationConfig: {
              temperature: 0.7,
              responseMimeType: "application/json"
            }
          })
        }
      );

      if (!response.ok) {
        const errorText = await response.text();
        console.warn(`Gemini API error with model ${model}:`, response.status, errorText);
        continue;
      }

      const data = await response.json();
      const rawText = data?.candidates?.[0]?.content?.parts?.[0]?.text;
      if (!rawText) continue;

      const parsedPlan: GeneratedEventPlan = JSON.parse(rawText);
      return {
        plan: parsedPlan,
        isAiGenerated: true,
        modelUsed: model
      };
    } catch (err: any) {
      console.warn(`Failed call to ${model}:`, err.message);
    }
  }

  // If live calls failed, return customized fallback
  console.warn("Live Gemini API call was unsuccessful. Falling back to realistic domain template.");
  return {
    plan: getFallbackPlanForInput(input),
    isAiGenerated: false,
    error: "Live AI generation service momentarily unreachable; using curated realistic planner model."
  };
}

export async function askEventEaseAssistant(
  question: string, 
  eventContext?: EventInputData | null, 
  history: ChatMessage[] = []
): Promise<{ reply: string; isAiGenerated: boolean }> {
  if (!isGeminiConfigured) {
    return {
      reply: getDemoAssistantAnswer(question, eventContext),
      isAiGenerated: false
    };
  }

  const contextStr = eventContext 
    ? `Current Event Context: Type: ${eventContext.category}, Name: "${eventContext.name}", Budget: ₹${eventContext.budget.toLocaleString('en-IN')}, Guests: ${eventContext.guestCount}, Location: ${eventContext.location}, Style: ${eventContext.style}.`
    : `No specific event selected yet. Provide general smart event planning guidance.`;

  const systemInstruction = `You are the EventEase Assistant, a warm, knowledgeable, and practical event planning AI assistant.
${contextStr}
Help the user with practical advice on budgeting, themes, vendor negotiation, menus, timeline planning, and troubleshooting.
Format with clean bullet points and markdown where helpful. Mention budgets in Indian Rupees (₹) when relevant. Keep answers concise, actionable, and encouraging.`;

  try {
    const formattedHistory = history.slice(-6).map(msg => ({
      role: msg.role === 'assistant' ? 'model' : 'user',
      parts: [{ text: msg.content }]
    }));

    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${GEMINI_API_KEY}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          systemInstruction: {
            parts: [{ text: systemInstruction }]
          },
          contents: [
            ...formattedHistory,
            {
              role: 'user',
              parts: [{ text: question }]
            }
          ],
          generationConfig: {
            temperature: 0.7,
            maxOutputTokens: 800
          }
        })
      }
    );

    if (response.ok) {
      const data = await response.json();
      const text = data?.candidates?.[0]?.content?.parts?.[0]?.text;
      if (text) {
        return { reply: text, isAiGenerated: true };
      }
    }
  } catch (err) {
    console.warn("Gemini chat assistant error:", err);
  }

  return {
    reply: getDemoAssistantAnswer(question, eventContext),
    isAiGenerated: false
  };
}

function getFallbackPlanForInput(input: EventInputData): GeneratedEventPlan {
  const base = input.category === 'wedding'
    ? JSON.parse(JSON.stringify(sampleWeddingPlan))
    : input.category === 'birthday'
    ? JSON.parse(JSON.stringify(sampleBirthdayPlan))
    : JSON.parse(JSON.stringify(sampleCommunityPlan));

  // Scale the budget breakdown to match the user's specific budget
  const userBudget = input.budget || 500000;
  const currentTotal = base.budgetBreakdown.reduce((sum: number, item: any) => sum + item.allocated, 0);
  const factor = userBudget / (currentTotal || 1);

  base.budgetBreakdown = base.budgetBreakdown.map((item: any) => {
    const newAlloc = Math.round((item.allocated * factor) / 500) * 500;
    return {
      ...item,
      allocated: newAlloc,
      percentage: Math.round((newAlloc / userBudget) * 1000) / 10
    };
  });

  // Scale vendor costs accordingly
  base.vendorChecklist = base.vendorChecklist.map((v: any) => ({
    ...v,
    estimatedCost: Math.round((v.estimatedCost * factor) / 500) * 500
  }));

  // Adapt title and theme concepts
  if (input.theme) {
    base.overview.recommendedTheme = `${input.theme} (${input.style})`;
    base.personalizedIdeas.themeConcept = `${input.theme} tailored for ${input.name}`;
  }
  if (input.location) {
    base.overview.concept += ` • ${input.location} Edition`;
  }

  return base;
}

function getDemoAssistantAnswer(question: string, eventContext?: EventInputData | null): string {
  const q = question.toLowerCase();
  
  if (q.includes('3 lakh') || q.includes('300000') || q.includes('low budget') || (q.includes('budget') && q.includes('wedding'))) {
    return `### 💡 How to Plan a Beautiful Wedding Within ₹3 Lakh:

1. **Venue Selection (₹60,000 – ₹80,000)**:
   - Opt for an intimate community hall, temple trust venue, or an aesthetic family garden lawn during daytime.
   - Day weddings save considerably on high-intensity electrical lighting and generator costs.

2. **Catering Strategy (₹1,20,000 – ₹1,40,000 for 100–120 guests)**:
   - Cap guest list strictly to close family and friends (100–120 pax).
   - Choose a curated traditional thali or focused buffet (2 starters, 3 mains, 2 desserts) rather than an oversized 20-item spread.

3. **Decoration & Florals (₹40,000)**:
   - Use locally grown marigolds, rajnigandha, brass urlis, and warm fairy lights.
   - Fabric drapes in ivory and pastel yellow create luxury without high floral cost.

4. **Photography & Styling (₹40,000)**:
   - Hire a talented up-and-coming freelance candid photographer for a single day.
   - Rent or purchase bridal wear from designer rental boutiques like Rent An Attire or Flyrobe.

5. **Key Secret**: Allocate a 5% contingency (₹15,000) for last-minute transport and ritual items!`;
  }

  if (q.includes('birthday') && (q.includes('theme') || q.includes('unique'))) {
    return `### 🎈 Unique Birthday Party Themes for Every Style:

1. **Boho Starlight Picnic (Modern & Aesthetic)**:
   - Low wooden pallet tables with floor cushions, macrame backdrops, warm string lights, and dried pampas grass.
   - Perfect for 20s, 30s, and aesthetic milestone birthdays.

2. **Retro Arcade & Neon Glow**:
   - UV blacklights, neon signs, retro arcade games, and neon mocktails with glow-stick stirrers.

3. **Under the Tuscan Sun**:
   - Rustic Italian theme featuring live wood-fired pizza, olive branch garlands, checkered linen, and an Italian gelato bar.

4. **Royal Enchanted Garden (Kids/Teens)**:
   - Pastel floral arches, fairy wings, butterfly centerpieces, and a DIY cupcake decorating station.`;
  }

  if (q.includes('reduce') || q.includes('decoration') || q.includes('cut cost') || q.includes('save')) {
    return `### ✂️ Top Ways to Reduce Decoration Costs by 30-40%:

- **Swap Exotic Imported Blooms for Local Botanicals**: Using local mogra, marigold, eucalyptus, and baby's breath instead of imported lilies and hydrangeas saves up to 50% on floral bills.
- **Warm Ambient Lighting over Heavy Structures**: Fairy lights, tungsten Edison bulbs, and paper lanterns cost far less than massive wooden sets and create a much cozier atmosphere.
- **Repurpose Decor Across Ceremonies**: Move entrance floral arches and lounge furniture from the daytime Sangeet/Mehendi to the evening dinner reception.
- **Minimalist Focal Backdrop**: Instead of decorating the whole hall, focus high-impact decor on one photogenic backdrop (where 90% of photos will be taken).`;
  }

  if (q.includes('community') || q.includes('vendor') || q.includes('permission')) {
    return `### 🏛️ Essential Vendor & Checklist for Community Events:

1. **Permissions & Compliance (Critical First Step)**:
   - Local Municipal Corporation / Police NOC.
   - Fire safety clearance & electrical inspector sign-off for heavy generators.
2. **Key Vendors**:
   - **Stage & Sound (Line Array)**: Crucial for clear announcements across the ground.
   - **Water & Sanitation**: Water dispensers, clean mobile toilets, and trash bins every 20 meters.
   - **Private Security & Parking Marshals**: Ensures smooth crowd flow and traffic control.
   - **First-Aid Booth**: Paramedic kit with an on-call emergency ambulance contact.`;
  }

  if (q.includes('vegetarian') || q.includes('food') || q.includes('menu') || q.includes('100')) {
    return `### 🍽️ Curated Vegetarian Feast Menu for 100 Guests:

**Welcome Drinks**:
- Signature Rose-Cardamom Lassi & Fresh Mint Lemon Cooler

**Starters (Pass-around)**:
- Paneer Malai Tikka with Mint Chutney
- Crispy Corn & Water Chestnut Tartlets
- Dahi Ke Kebab

**Main Course**:
- Dal Makhani (Slow-cooked 18 hours)
- Paneer Butter Masala
- Methi Matar Malai
- Hyderabadi Subz Dum Biryani with Burani Garlic Raita
- Assorted Breads (Butter Naan, Laccha Paratha, Missi Roti)

**Dessert Counter**:
- Warm Angoori Gulab Jamun with Rabri
- Fresh Mango Kulfi

*Estimated Catering Cost: ₹450 – ₹650 per plate depending on venue and live counters.*`;
  }

  // General helpful response
  return `### Hello! I'm your EventEase Assistant.

I can help you with:
- **Budget optimization** and cost-cutting ideas.
- **Vendor checklists & contracts** (what to ask caterers, decorators, and photographers).
- **Curated themes & color palettes** tailored for weddings, birthdays, and community festivals.
- **Customized food menus** and guest hospitality logistics.

${eventContext ? `Feel free to ask questions specifically about your upcoming **${eventContext.name}**!` : 'Tell me what you are planning, or ask a question to get started!'}`;
}

