import { Question } from "./data";

export const batch3Questions: Question[] = [
    // --- HUMAN DIGESTION (digestion) ---
    {
        id: "digestion_mcq_1",
        topicId: "digestion",
        paper: 1,
        question: "Which enzyme is responsible for the digestion of proteins in the stomach?",
        options: ["Amylase", "Lipase", "Pepsin", "Maltase"],
        answer: "2",
        explanation: "Pepsin (a protease) works in the acidic environment of the stomach to break down proteins.",
        difficulty: "Standard"
    },
    {
        id: "digestion_oe_1",
        topicId: "digestion",
        paper: 2,
        question: "Describe the function of the gall bladder in digestion.",
        answer: "The gall bladder stores bile produced by the liver and releases it into the small intestine to emulsify fats, increasing the surface area for lipase to act on.",
        explanation: "Keywords: Store bile, emulsify fats, surface area.",
        difficulty: "Standard"
    },

    // --- TRANSPORT SYSTEM (transport) ---
    {
        id: "transport_mcq_1",
        topicId: "transport",
        paper: 1,
        question: "Which component of blood is primarily responsible for the transport of oxygen?",
        options: ["Plasma", "Red blood cells", "White blood cells", "Platelets"],
        answer: "1",
        explanation: "Red blood cells contain haemoglobin which binds to oxygen.",
        difficulty: "Standard"
    },
    {
        id: "transport_oe_1",
        topicId: "transport",
        paper: 2,
        question: "How do capillaries facilitate the exchange of substances between blood and body cells?",
        answer: "Capillaries have very thin walls (one-cell thick) and a large surface area, which allows for rapid diffusion of nutrients and waste products.",
        explanation: "Keywords: One-cell thick, large surface area, diffusion.",
        difficulty: "Top School",
        school: "NYGH 2022"
    },

    // --- HUMAN REPRODUCTION (reproduction) ---
    {
        id: "reproduction_mcq_1",
        topicId: "reproduction",
        paper: 1,
        question: "In the male reproductive system, where is sperm produced?",
        options: ["Sperm duct", "Penis", "Testis", "Scrotum"],
        answer: "2",
        explanation: "The testes are the site of sperm and testosterone production.",
        difficulty: "Standard"
    },
    {
        id: "reproduction_oe_1",
        topicId: "reproduction",
        paper: 2,
        question: "Identify one function of the amniotic fluid during pregnancy.",
        answer: "Amniotic fluid cushions the fetus against physical shocks and provides a stable temperature for development.",
        explanation: "Keywords: Cushion, physical shock, temperature stability.",
        difficulty: "Standard"
    },

    // --- ELECTRICAL SYSTEMS (electrical) ---
    {
        id: "electrical_mcq_1",
        topicId: "electrical",
        paper: 1,
        question: "What happens to the total resistance in a series circuit if more resistors are added?",
        options: ["It increases.", "It decreases.", "It remains the same.", "It fluctuates depending on the voltage."],
        answer: "0",
        explanation: "In a series circuit, R total = R1 + R2 + ...",
        difficulty: "Standard"
    },
    {
        id: "electrical_oe_1",
        topicId: "electrical",
        paper: 2,
        question: "Explain why electrical appliances with a metal casing must be grounded (earthed).",
        answer: "Earthing provides a low-resistance path for the current to flow to the ground if there is a fault. This prevents the metal casing from becoming live and giving the user an electric shock.",
        explanation: "Keywords: Earthing, low-resistance path, fault, electric shock prevention.",
        difficulty: "Standard"
    }
];
