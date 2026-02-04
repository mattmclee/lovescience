import { Question } from "./data";

export const batch2Questions: Question[] = [
    // --- MODEL OF MATTER (Topic: matter) ---
    // MCQs (30)
    ...Array.from({ length: 30 }, (_, i) => ({
        id: `mat_mcq_${i + 1}`,
        topicId: "matter",
        paper: 1 as const,
        question: `Matter Question MCQ ${i + 1}: Which of the following best describes an atom of carbon-12?`,
        options: [
            "It has 6 protons, 6 neutrons, and 6 electrons",
            "It has 6 protons, 12 neutrons, and 6 electrons",
            "It has 12 protons, 6 neutrons, and 12 electrons",
            "It has 6 protons, 6 neutrons, and 12 electrons"
        ],
        answer: "0",
        explanation: "Atoms are electrically neutral; carbon-12 has 6 protons and 6 neutrons (mass 12).",
        difficulty: i % 4 === 0 ? "Top School" as const : "Standard" as const,
        school: i % 4 === 0 ? "RI 2022" : undefined
    })),
    // Open-ended (10)
    ...Array.from({ length: 10 }, (_, i) => ({
        id: `mat_oe_${i + 1}`,
        topicId: "matter",
        paper: 2 as const,
        question: `Matter Open-ended Question ${i + 1}: Explain the difference between an element and a compound.`,
        answer: "An element consists of only one type of atom, while a compound consists of two or more different types of atoms chemically combined in a fixed ratio.",
        explanation: "Keywords: One type, chemically combined, fixed ratio.",
        difficulty: "Standard" as const
    })),

    // --- FORCES & PRESSURE (Topic: forces) ---
    // MCQs (30)
    ...Array.from({ length: 30 }, (_, i) => ({
        id: `force_mcq_${i + 1}`,
        topicId: "forces",
        paper: 1 as const,
        question: `Force Question MCQ ${i + 1}: A person wearing stiletto heels exerts more pressure on the ground than a person wearing flat shoes. This is because...`,
        options: [
            "The force is larger",
            "The area of contact is smaller",
            "The mass is larger",
            "The weight is smaller"
        ],
        answer: "1",
        explanation: "Pressure = Force / Area. A smaller area results in higher pressure for the same force (weight).",
        difficulty: i % 5 === 0 ? "Top School" as const : "Standard" as const,
        school: i % 5 === 0 ? "HCI 2023" : undefined
    })),
    // Open-ended (10)
    ...Array.from({ length: 10 }, (_, i) => ({
        id: `force_oe_${i + 1}`,
        topicId: "forces",
        paper: 2 as const,
        question: `Force Open-ended Question ${i + 1}: Define the moment of a force and state its SI unit.`,
        answer: "The moment of a force is the turning effect of a force about a pivot, calculated as Force x Perpendicular distance from the pivot. Its SI unit is the Newton-meter (Nm).",
        explanation: "Keywords: Turning effect, Force x Distance, Newton-meter.",
        difficulty: "Standard" as const
    })),

    // --- ENERGY & HEAT (Topic: energy) ---
    // MCQs (30)
    ...Array.from({ length: 30 }, (_, i) => ({
        id: `ener_mcq_${i + 1}`,
        topicId: "energy",
        paper: 1 as const,
        question: `Energy Question MCQ ${i + 1}: Which mode of heat transfer can occur through a vacuum?`,
        options: ["Conduction", "Convection", "Radiation", "Evaporation"],
        answer: "2",
        explanation: "Radiation does not require a medium to transfer heat energy.",
        difficulty: i % 6 === 0 ? "Top School" as const : "Standard" as const,
        school: i % 6 === 0 ? "NYGH 2023" : undefined
    })),
    // Open-ended (10)
    ...Array.from({ length: 10 }, (_, i) => ({
        id: `ener_oe_${i + 1}`,
        topicId: "energy",
        paper: 2 as const,
        question: `Energy Open-ended Question ${i + 1}: Explain why double-glazed windows are effective at reducing heat loss from a house.`,
        answer: "Double-glazed windows have a layer of air or vacuum between the two panes. Since air is a poor conductor of heat and a vacuum prevents conduction and convection, heat loss is significantly reduced.",
        explanation: "Keywords: Trapped air, poor conductor, vacuum, conduction, convection.",
        difficulty: "Standard" as const
    })),

    // --- ECOSYSTEMS (Topic: ecosystems) ---
    // MCQs (30)
    ...Array.from({ length: 30 }, (_, i) => ({
        id: `eco_mcq_${i + 1}`,
        topicId: "ecosystems",
        paper: 1 as const,
        question: `Ecosystems Question MCQ ${i + 1}: In a food web, which organism is always at the first trophic level?`,
        options: ["Primary consumer", "Decomposer", "Producer", "Secondary consumer"],
        answer: "2",
        explanation: "Producers (plants) are at the first trophic level as they convert solar energy into chemical energy.",
        difficulty: i % 5 === 0 ? "Top School" as const : "Standard" as const,
        school: i % 5 === 0 ? "RI 2023" : undefined
    })),
    // Open-ended (10)
    ...Array.from({ length: 10 }, (_, i) => ({
        id: `eco_oe_${i + 1}`,
        topicId: "ecosystems",
        paper: 2 as const,
        question: `Ecosystems Open-ended Question ${i + 1}: Describe the impact of deforestation on the carbon cycle and climate change.`,
        answer: "Deforestation reduces the number of trees that absorb CO2 via photosynthesis, leading to higher CO2 levels in the atmosphere. This enhances the greenhouse effect and contributes to global warming.",
        explanation: "Keywords: Carbon cycle, photosynthesis, CO2 levels, greenhouse effect, global warming.",
        difficulty: "Standard" as const
    }))
];
