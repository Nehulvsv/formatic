const {
    GoogleGenerativeAI,
    HarmCategory,
    HarmBlockThreshold,
  } = require("@google/generative-ai");

  const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY;
const genAI = new GoogleGenerativeAI(apiKey);

const model = genAI.getGenerativeModel({
  model: "gemini-1.5-flash",
});

const generationConfig = {
  temperature: 1,
  topP: 0.95,
  topK: 64,
  maxOutputTokens: 8192,
  responseMimeType: "application/json",
};

async function run() {
  const chatSession = model.startChat({
    generationConfig,
 // safetySettings: Adjust safety settings
 // See https://ai.google.dev/gemini-api/docs/safety-settings
    history: [
      {
        role: "user",
        parts: [
          {text: "description : student registration for coding workshop on react and react native , on the besis of descriptipn please give a form in json format with a form title, a subheading, and a formsubheading, form fild ,form name  , placeholder name ,and form lable in json formate "},
        ],
      },
      {
        role: "model",
        parts: [
          {text: "```json\n{\"formTitle\": \"React & React Native Coding Workshop Registration\", \"subheading\": \"Join us for an immersive workshop exploring the power of React and React Native.\", \"formSubheading\": \"Please fill out the following information to register.\", \"formFields\": [{\"name\": \"firstName\", \"label\": \"First Name\", \"placeholder\": \"Enter your first name\"}, {\"name\": \"lastName\", \"label\": \"Last Name\", \"placeholder\": \"Enter your last name\"}, {\"name\": \"email\", \"label\": \"Email Address\", \"placeholder\": \"Enter your email address\"}, {\"name\": \"phoneNumber\", \"label\": \"Phone Number\", \"placeholder\": \"Enter your phone number\"}, {\"name\": \"experienceLevel\", \"label\": \"Experience Level\", \"placeholder\": \"Select your experience level\", \"type\": \"select\", \"options\": [\"Beginner\", \"Intermediate\", \"Advanced\"]}, {\"name\": \"workshopInterest\", \"label\": \"Workshop Interest\", \"placeholder\": \"Select your primary interest\", \"type\": \"select\", \"options\": [\"React\", \"React Native\", \"Both\"]}, {\"name\": \"comments\", \"label\": \"Comments or Questions\", \"placeholder\": \"Any questions or comments you have?\", \"type\": \"textarea\"}]}\n\n```"},
        ],
      },
    ],
  });

  const result = await chatSession.sendMessage("INSERT_INPUT_HERE");
  console.log(result.response.text());
}

run();

export const aiChatSession = model.startChat({
    generationConfig,
 history:[]
})