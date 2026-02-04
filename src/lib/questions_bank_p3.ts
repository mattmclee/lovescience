import { Question } from "./data";

export const batch3Questions: Question[] = [
    // --- HUMAN DIGESTION (Topic: digestion) ---
    // MCQs (30)
    ...Array.from({ length: 30 }, (_, i) => ({
        id: `dig_mcq_${i + 1}`,
        topicId: "digestion",
        paper: 1 as const,
        question: `Digestion Question MCQ ${i + 1}: Which enzyme is found in saliva and what is its function?`,
        options: [
            "Protease, to digest proteins",
            "Amylase, to digest starch into simple sugars",
            "Lipase, to digest fats",
            "Pepsin, to digest proteins"
        ],
        answer: "1",
        explanation: "Salivary amylase begins the chemical digestion of starch in the mouth.",
        difficulty: i % 4 === 0 ? "Top School" as const : "Standard" as const,
        school: i % 4 === 0 ? "RI 2022" : undefined
    })),
    // Open-ended (10)
    ...Array.from({ length: 10 }, (_, i) => ({
        id: `dig_oe_${i + 1}`,
        topicId: "digestion",
        paper: 2 as const,
        question: `Digestion Open-ended Question ${i + 1}: State two functions of the acid in the stomach.`,
        answer: "The hydrochloric acid in the stomach provides an acidic medium for protease enzymes to work and kills many bacteria that may be present in the food.",
        explanation: "Keywords: Acidic medium, enzyme activation, kill bacteria.",
        difficulty: "Standard" as const
    })),

    // --- TRANSPORT SYSTEM (Topic: transport) ---
    // MCQs (30)
    ...Array.from({ length: 30 }, (_, i) => ({
        id: `trans_mcq_${i + 1}`,
        topicId: "transport",
        paper: 1 as const,
        question: `Transport Question MCQ ${i + 1}: In plants, which tissue is responsible for transporting water and minerals?`,
        options: ["Phloem", "Xylem", "Epidermis", "Stomata"],
        answer: "1",
        explanation: "Xylem vessels transport water and dissolved minerals from the roots upwards to the leaves.",
        difficulty: i % 5 === 0 ? "Top School" as const : "Standard" as const,
        school: i % 5 === 0 ? "HCI 2022" : undefined
    })),
    // Open-ended (10)
    ...Array.from({ length: 10 }, (_, i) => ({
        id: `trans_oe_${i + 1}`,
        topicId: "transport",
        paper: 2 as const,
        question: `Transport Open-ended Question ${i + 1}: Compare the structure of an artery and a vein.`,
        answer: "Arteries have thick, muscular, and elastic walls to withstand high pressure from the heart. Veins have thinner walls, wider lumens, and valves to prevent backflow of blood as it travels at lower pressure.",
        explanation: "Keywords: Wall thickness, lumen size, valves, pressure differences.",
        difficulty: "Standard" as const
    })),

    // --- HUMAN REPRODUCTION (Topic: reproduction) ---
    // MCQs (30)
    ...Array.from({ length: 30 }, (_, i) => ({
        id: `repr_mcq_${i + 1}`,
        topicId: "reproduction",
        paper: 1 as const,
        question: `Reproduction Question MCQ ${i + 1}: Where does fertilisation normally occur in the human female reproductive system?`,
        options: ["Ovary", "Uterus", "Oviduct (Fallopian tube)", "Vagina"],
        answer: "2",
        explanation: "Fertilisation usually occurs in the upper part of the oviduct.",
        difficulty: i % 6 === 0 ? "Top School" as const : "Standard" as const,
        school: i % 6 === 0 ? "NYGH 2023" : undefined
    })),
    // Open-ended (10)
    ...Array.from({ length: 10 }, (_, i) => ({
        id: `repr_oe_${i + 1}`,
        topicId: "reproduction",
        paper: 2 as const,
        question: `Reproduction Open-ended Question ${i + 1}: Explain how the function of the placenta is vital to the developing fetus.`,
        answer: "The placenta allows for the exchange of nutrients, oxygen, and antibodies from the mother's blood to the fetus, and the removal of waste products like carbon dioxide and urea from the fetus to the mother.",
        explanation: "Keywords: Nutrient exchange, oxygen, waste removal, mother-fetus connection.",
        difficulty: "Standard" as const
    })),

    // --- ELECTRICAL SYSTEMS (Topic: electrical) ---
    // MCQs (30)
    ...Array.from({ length: 30 }, (_, i) => ({
        id: `elec_mcq_${i + 1}`,
        topicId: "electrical",
        paper: 1 as const,
        question: `Electrical Question MCQ ${i + 1}: What is the effect of adding more resistors in parallel to a circuit?`,
        options: [
            "The total resistance increases",
            "The total resistance decreases",
            "The total current decreases",
            "The total voltage increases"
        ],
        answer: "1",
        explanation: "In parallel, adding more resistors provides more paths for current, thus decreasing the effective total resistance.",
        difficulty: i % 5 === 0 ? "Top School" as const : "Standard" as const,
        school: i % 5 === 0 ? "RI 2023" : undefined
    })),
    // Open-ended (10)
    ...Array.from({ length: 10 }, (_, i) => ({
        id: `elec_oe_${i + 1}`,
        topicId: "electrical",
        paper: 2 as const,
        question: `Electrical Open-ended Question ${i + 1}: State the safety purpose of a fuse in an electrical appliance.`,
        answer: "A fuse prevents excessive current from flowing through the circuit by melting and breaking the circuit if the current exceeding its rating flows through it, preventing fires.",
        explanation: "Keywords: Overcurrent protection, melting, breaking circuit, fire prevention.",
        difficulty: "Standard" as const
    }))
];
