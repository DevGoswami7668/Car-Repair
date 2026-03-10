/* === AutoFix AI Mechanic - Chatbot JavaScript === */

/* ==========================================
   CONFIGURATION
   ========================================== */

// ⚠️ WARNING: Never expose real API keys in production client-side code.
// Use a backend proxy (Node.js/Express or Cloudflare Worker) for live sites.
const OPENAI_API_KEY = "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";

const MODEL = "gpt-3.5-turbo";

const SYSTEM_PROMPT = `You are AutoFix AI, a practical car mechanic assistant for home repairs. When a user describes a car symptom or problem, first identify the most likely cause, then provide clear numbered DIY repair steps using common household tools where possible. Keep language simple and beginner-friendly. End every response with: ⚠️ If this involves brakes, steering, or suspension, consult a certified mechanic before proceeding.`;

/* ==========================================
   CHATBOT VARIABLES
   ========================================== */

let conversationHistory = [];
let isThinking = false;

/* ==========================================
   INITIALIZATION
   ========================================== */

function initChatbot() {
  const chatInput = document.getElementById('chat-input');
  const sendBtn = document.getElementById('chat-send');
  const chatMessages = document.getElementById('chat-messages');
  
  if (!chatInput || !sendBtn || !chatMessages) return;
  
  // Send button click
  sendBtn.addEventListener('click', handleSendMessage);
  
  // Enter key to send
  chatInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  });
  
  // Load conversation history from localStorage
  const savedHistory = localStorage.getItem('autofix_chat_history');
  if (savedHistory) {
    try {
      const parsed = JSON.parse(savedHistory);
      // Keep only last 10 messages to manage context length
      conversationHistory = parsed.slice(-10);
      renderConversationHistory();
    } catch (e) {
      console.error('Error loading chat history:', e);
    }
  }
}

function renderConversationHistory() {
  const chatMessages = document.getElementById('chat-messages');
  if (!chatMessages) return;
  
  chatMessages.innerHTML = '';
  
  // Add system message
  addMessageToUI('ai', 'Hi! I\'m AutoFix AI, your virtual mechanic. Describe your car problem or symptom, and I\'ll help you diagnose and fix it!');
  
  // Add conversation history
  conversationHistory.forEach(msg => {
    addMessageToUI(msg.role, msg.content);
  });
}

/* ==========================================
   MESSAGE HANDLING
   ========================================== */

async function handleSendMessage() {
  if (isThinking) return;
  
  const chatInput = document.getElementById('chat-input');
  const chatMessages = document.getElementById('chat-messages');
  const thinkingEl = document.getElementById('chat-thinking');
  
  if (!chatInput || !chatMessages) return;
  
  const userMessage = chatInput.value.trim();
  
  if (!userMessage) return;
  
  // Clear input
  chatInput.value = '';
  
  // Add user message to UI
  addMessageToUI('user', userMessage);
  
  // Add to history
  conversationHistory.push({ role: 'user', content: userMessage });
  
  // Show thinking indicator
  isThinking = true;
  if (thinkingEl) thinkingEl.classList.add('visible');
  
  // Scroll to bottom
  scrollToBottom();
  
  try {
    // Call OpenAI API
    const response = await callOpenAI(userMessage);
    
    // Hide thinking indicator
    isThinking = false;
    if (thinkingEl) thinkingEl.classList.remove('visible');
    
    // Add AI response to UI
    addMessageToUI('ai', response);
    
    // Add to history
    conversationHistory.push({ role: 'assistant', content: response });
    
    // Save to localStorage
    saveConversationHistory();
    
  } catch (error) {
    // Hide thinking indicator
    isThinking = false;
    if (thinkingEl) thinkingEl.classList.remove('visible');
    
    // Show error message in chat
    const errorMessage = `I apologize, but I'm having trouble connecting right now. Please check your API key and try again. Error: ${error.message}`;
    addMessageToUI('error', errorMessage);
  }
  
  // Scroll to bottom
  scrollToBottom();
}

function addMessageToUI(role, content) {
  const chatMessages = document.getElementById('chat-messages');
  if (!chatMessages) return;
  
  const messageDiv = document.createElement('div');
  messageDiv.className = `chat-message chat-message--${role}`;
  
  const avatar = role === 'user' ? '👤' : '🤖';
  const time = getCurrentTime();
  
  messageDiv.innerHTML = `
    <div class="chat-message__avatar">${avatar}</div>
    <div class="chat-message__content">
      <p>${formatMessage(content)}</p>
      <span class="chat-message__time">${time}</span>
    </div>
  `;
  
  chatMessages.appendChild(messageDiv);
  scrollToBottom();
}

function formatMessage(message) {
  // Convert newlines to <br>
  return message.replace(/\n/g, '<br>');
}

function getCurrentTime() {
  const now = new Date();
  return now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
}

function scrollToBottom() {
  const chatMessages = document.getElementById('chat-messages');
  if (chatMessages) {
    chatMessages.scrollTop = chatMessages.scrollHeight;
  }
}

function saveConversationHistory() {
  // Keep only last 10 messages
  const messagesToSave = conversationHistory.slice(-10);
  localStorage.setItem('autofix_chat_history', JSON.stringify(messagesToSave));
}

/* ==========================================
   OPENAI API CALL
   ========================================== */

async function callOpenAI(userMessage) {
  // Check if API key is set
  if (OPENAI_API_KEY === "YOUR_API_KEY_HERE") {
    // Return a demo response for testing without API key
    return getDemoResponse(userMessage);
  }
  
  const messages = [
    { role: "system", content: SYSTEM_PROMPT },
    ...conversationHistory.slice(-8), // Last 8 messages for context
    { role: "user", content: userMessage }
  ];
  
  const response = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${OPENAI_API_KEY}`
    },
    body: JSON.stringify({
      model: MODEL,
      messages: messages,
      temperature: 0.7,
      max_tokens: 500
    })
  });
  
  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.error?.message || `API Error: ${response.status}`);
  }
  
  const data = await response.json();
  
  if (!data.choices || !data.choices[0]) {
    throw new Error('Invalid response from API');
  }
  
  return data.choices[0].message.content;
}

/* ==========================================
   DEMO RESPONSES (Testing without API key)
   ========================================== */

function getDemoResponse(userMessage) {
  const lowerMessage = userMessage.toLowerCase();
  
  // Oil change related
  if (lowerMessage.includes('oil') || lowerMessage.includes('oil change')) {
    return `Based on your description, here's what you need to know about oil changes:

1. **Check the oil level** — Use the dipstick to ensure your engine has enough oil. The level should be between the MIN and MAX marks.

2. **Gather tools** — You'll need an oil filter wrench, socket set, oil drain pan, and new oil & filter (check your manual for the correct type).

3. **Drain the oil** — Warm up the engine for a few minutes, then locate the drain plug underneath. Place your drain pan beneath and remove the plug.

4. **Replace the filter** — Remove the old filter (oil it up lightly before installing the new one), then hand-tighten the new filter.

5. **Add new oil** — Replace the drain plug, then pour in the recommended amount of new oil. Check the level with the dipstick.

⚠️ If this involves brakes, steering, or suspension, consult a certified mechanic before proceeding.`;
  }
  
  // Brake related
  if (lowerMessage.includes('brake') || lowerMessage.includes('squeaking') || lowerMessage.includes('squealing')) {
    return `Brake issues should be taken seriously. Here's what to check:

1. **Inspect brake pads** — Look through your wheel spokes to see the brake pad material. If it's less than 3mm thick, it needs replacement.

2. **Listen for sounds** — Squeaking usually means the pads are worn. Grinding means they're completely worn down and you need new pads ASAP.

3. **Check for vibrations** — If the steering wheel shakes when braking, your rotors may be warped.

4. **Test the brakes** — In a safe area, test if the car pulls to one side when braking.

5. **Don't delay** — Worn brakes can fail. If you're unsure, have a professional look at them.

⚠️ If this involves brakes, steering, or suspension, consult a certified mechanic before proceeding.`;
  }
  
  // Battery related
  if (lowerMessage.includes('battery') || lowerMessage.includes('dead') || lowerMessage.includes('won\'t start')) {
    return `For battery and starting issues, try these steps:

1. **Check the obvious** — Make sure headlights and interior lights aren't left on, which can drain the battery.

2. **Test the battery** — Use a multimeter to check voltage. A healthy battery should read around 12.6V when the engine is off.

3. **Jump start safely** — Connect jumper cables properly (red to positive, black to a ground point), then start the donor car first.

4. **Check for parasitic draw** — If the battery keeps dying, something may be draining power when the car is off.

5. **Consider battery age** — Most car batteries last 3-5 years. If yours is older, it may be time for a replacement.

⚠️ If this involves brakes, steering, or suspension, consult a certified mechanic before proceeding.`;
  }
  
  // Tire related
  if (lowerMessage.includes('tire') || lowerMessage.includes('flat') || lowerMessage.includes('puncture')) {
    return `Here's how to handle tire issues:

1. **Check tire pressure** — Use a tire gauge. The correct pressure is usually on a sticker in the driver's door jamb (not the sidewall).

2. **Look for damage** — Check for nails, cuts, or bulges on the tire surface.

3. **Use a tire repair kit** — For small punctures in the tread area, a plug kit can temporarily fix it.

4. **Know when to replace** — If the puncture is in the sidewall or too large, the tire needs replacing.

5. **Check spare tire** — Make sure your spare is properly inflated and in good condition.

⚠️ If this involves brakes, steering, or suspension, consult a certified mechanic before proceeding.`;
  }
  
  // Air filter related
  if (lowerMessage.includes('air filter') || lowerMessage.includes('engine') || lowerMessage.includes('performance')) {
    return `For air filter and engine performance:

1. **Locate the air filter** — It's usually in a black box near the engine with metal clips.

2. **Inspect the filter** — Hold it up to light. If you can't see light through it, it's clogged and needs replacing.

3. **Check for air leaks** — Inspect the intake hose for cracks or loose connections.

4. **Clean the MAF sensor** — If your car runs rough, a dirty Mass Air Flow sensor might be the culprit (use proper cleaner).

5. **Consider throttle body cleaning** — Carbon buildup can cause idle problems. Spray cleaner on a cloth and wipe the throttle plate.

⚠️ If this involves brakes, steering, or suspension, consult a certified mechanic before proceeding.`;
  }
  
  // Transmission / Clutch
  if (lowerMessage.includes('transmission') || lowerMessage.includes('clutch') || lowerMessage.includes('gear')) {
    return `Transmission and clutch issues need attention:

1. **Check fluid level** — For automatics, check transmission fluid with the engine running. It should be pink and smell fresh.

2. **Listen for noises** — Whining, grinding, or clunking sounds indicate problems.

3. **Monitor shifting** — Hard shifts, slipping, or delayed engagement are warning signs.

4. **Clutch pedal** — If the clutch feels spongy or the car stalls when shifting, the clutch may be worn.

5. **Don't ignore leaks** — Red or brown fluid under the car could be transmission fluid. Address leaks promptly.

⚠️ If this involves brakes, steering, or suspension, consult a certified mechanic before proceeding.`;
  }
  
  // Suspension
  if (lowerMessage.includes('suspension') || lowerMessage.includes('shock') || lowerMessage.includes('strut')) {
    return `Suspension problems affect handling and safety:

1. **Bounce test** — Push down on each corner. If the car bounces more than twice, shocks are worn.

2. **Check for leaks** — Look at the shock absorbers for oil leakage.

3. **Inspect mounts** — Worn bushings cause clunking noises over bumps.

4. **Wheel alignment** — Uneven tire wear often indicates alignment issues.

5. **Listen for sounds** — Knocking or popping when turning could mean ball joints or tie rods are bad.

⚠️ If this involves brakes, steering, or suspension, consult a certified mechanic before proceeding.`;
  }
  
  // Heating / AC
  if (lowerMessage.includes('ac') || lowerMessage.includes('heating') || lowerMessage.includes('heater') || lowerMessage.includes('coolant')) {
    return `Climate control issues are common:

1. **Check coolant level** — Low coolant causes heater problems. Top up if needed.

2. **AC recharge** — If AC isn't cold, it may need recharging (DIY kits available).

3. **Cabin filter** — A clogged cabin air filter reduces airflow to the vents.

4. **Blend door** — If you get only hot or cold air, the blend door actuator may be faulty.

5. **Refrigerant leak** — Sweet smells or wet passenger floor indicate coolant leaks.

⚠️ If this involves brakes, steering, or suspension, consult a certified mechanic before proceeding.`;
  }
  
  // Electrical
  if (lowerMessage.includes('electrical') || lowerMessage.includes('light') || lowerMessage.includes('fuse')) {
    return `Electrical issues can be tricky:

1. **Check fuses** — Blown fuses are often the culprit. Check your owner's manual for locations.

2. **Test the battery** — Weak battery causes electrical gremlins. Have it load tested.

3. **Ground wires** — Corroded ground connections cause strange electrical problems.

4. **Bulbs** — If a light doesn't work, try replacing the bulb first.

5. **Alternator** — Dimming lights while idling may indicate a weak alternator.

⚠️ If this involves brakes, steering, or suspension, consult a certified mechanic before proceeding.`;
  }
  
  // Spark plugs
  if (lowerMessage.includes('spark plug') || lowerMessage.includes('misfire') || lowerMessage.includes('ignition')) {
    return `Ignition system problems:

1. **Spark plugs** — Replace every 30,000-50,000 miles depending on type.

2. **Check for fouling** — Black, oily plugs indicate engine problems (burning oil).

3. **Ignition coils** — Misfire codes often point to failing coils.

4. **Timing** — Incorrect timing causes poor performance and backfiring.

5. **Fuel system** — Sometimes misfires are fuel-related, not ignition.

⚠️ If this involves brakes, steering, or suspension, consult a certified mechanic before proceeding.`;
  }
  
  // Windshield / Wipers
  if (lowerMessage.includes('wiper') || lowerMessage.includes('windshield') || lowerMessage.includes('wiper blade')) {
    return `Windshield care tips:

1. **Replace blades** — Change wiper blades every 6-12 months or when they streak.

2. **Clean the glass** — Use glass cleaner for best visibility.

3. **Check the washer fluid** — Keep the reservoir filled with proper washer fluid.

4. **Lift carefully** — When de-icing, lift wipers straight up to avoid breaking them.

5. **Repair chips** — Fix windshield chips quickly before they become cracks.

⚠️ If this involves brakes, steering, or suspension, consult a certified mechanic before proceeding.`;
  }
  
  // Default response
  return `I'd be happy to help you diagnose and fix your car issue! To give you the best advice, please tell me:

• What year, make, and model is your car?
• What symptoms are you experiencing? (noises, smells, warning lights, etc.)
• When does the problem occur? (while driving, idling, cold start, etc.)

The more details you provide, the better I can help you!

⚠️ If this involves brakes, steering, or suspension, consult a certified mechanic before proceeding.`;
}

/* ==========================================
   CLEAR CHAT HISTORY
   ========================================== */

function clearChatHistory() {
  conversationHistory = [];
  localStorage.removeItem('autofix_chat_history');
  
  // Reset UI
  const chatMessages = document.getElementById('chat-messages');
  if (chatMessages) {
    chatMessages.innerHTML = `
      <div class="chat-message chat-message--ai">
        <div class="chat-message__avatar">🤖</div>
        <div class="chat-message__content">
          <p>Hi! I'm AutoFix AI, your virtual mechanic. Describe your car problem or symptom, and I'll help you diagnose and fix it!</p>
          <span class="chat-message__time">Just now</span>
        </div>
      </div>
    `;
  }
}

// Make clearChatHistory available globally
window.clearChatHistory = clearChatHistory;

/* ==========================================
   INITIALIZE CHATBOT
   ========================================== */

document.addEventListener('DOMContentLoaded', () => {
  initChatbot();
});

