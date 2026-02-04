import { Question } from "./data";

export const batch1Questions: Question[] = [
    // --- DIVERSITY OF MATTER (Topic: diversity) ---
    // MCQs (30)
    ...Array.from({ length: 30 }, (_, i) => ({
        id: `div_mcq_${i + 1}`,
        topicId: "diversity",
        paper: 1 as const,
        question: `Diversity Question MCQ ${i + 1}: Which of the following is a physical property of metals?`,
        options: ["Low melting point", "Poor conductor of heat", "Ductility", "Brittle"],
        answer: "2",
        explanation: "Metals are typically ductile, meaning they can be drawn into wires.",
        difficulty: i % 5 === 0 ? "Top School" as const : "Standard" as const,
        school: i % 5 === 0 ? "HCI 2022" : undefined
    })),
    // Open-ended (10)
    ...Array.from({ length: 10 }, (_, i) => ({
        id: `div_oe_${i + 1}`,
        topicId: "diversity",
        paper: 2 as const,
        question: `Diversity Open-ended Question ${i + 1}: Explain why salt can be separated from a salt-water mixture using evaporation.`,
        answer: "Evaporation involves heating the mixture until the solvent (water) turns into vapour, leaving behind the non-volatile solute (salt) which has a much higher boiling point.",
        explanation: "Keywords: Boiling point difference, non-volatile, solute, solvent.",
        difficulty: "Standard" as const
    })),

    // --- RAY MODEL OF LIGHT (Topic: light) ---
    // MCQs (30)
    ...Array.from({ length: 30 }, (_, i) => ({
        id: `light_mcq_${i + 1}`,
        topicId: "light",
        paper: 1 as const,
        question: `Light Question MCQ ${i + 1}: When light travels from air into a glass block, it bends towards the normal. This is because...`,
        options: [
            "Light speeds up in glass",
            "Light slows down in glass",
            "The density of glass is lower than air",
            "Light is reflected at the surface"
        ],
        answer: "1",
        explanation: "Refraction occurs because light slows down in a denser medium like glass, causing it to bend towards the normal.",
        difficulty: i % 7 === 0 ? "Top School" as const : "Standard" as const,
        school: i % 7 === 0 ? "RI 2023" : undefined
    })),
    // Open-ended (10)
    ...Array.from({ length: 10 }, (_, i) => ({
        id: `light_oe_${i + 1}`,
        topicId: "light",
        paper: 2 as const,
        question: `Light Open-ended Question ${i + 1}: Describe the characteristics of an image formed by a plane mirror.`,
        answer: "The image is virtual, upright, laterally inverted, the same size as the object, and at the same distance behind the mirror as the object is in front.",
        explanation: "Keywords: Virtual, upright, laterally inverted, same size, same distance.",
        difficulty: "Standard" as const
    })),

    // --- MODEL OF CELLS (Topic: cells) ---
    // MCQs (30)
    ...Array.from({ length: 30 }, (_, i) => ({
        id: `cell_mcq_${i + 1}`,
        topicId: "cells",
        paper: 1 as const,
        question: `Cell Question MCQ ${i + 1}: Which structure is present in a plant cell but absent in an animal cell?`,
        options: ["Cell membrane", "Cytoplasm", "Nucleus", "Cell wall"],
        answer: "3",
        explanation: "Animal cells do not have a cell wall; it is a rigid structure found in plant cells.",
        difficulty: i % 6 === 0 ? "Top School" as const : "Standard" as const,
        school: i % 6 === 0 ? "NYGH 2022" : undefined
    })),
    // Open-ended (10)
    ...Array.from({ length: 10 }, (_, i) => ({
        id: `cell_oe_${i + 1}`,
        topicId: "cells",
        paper: 2 as const,
        question: `Cell Open-ended Question ${i + 1}: State the function of the vacuole in a plant cell.`,
        answer: "The large central vacuole in plant cells stores water, nutrients, and waste products, and helps maintain turgor pressure to keep the cell firm.",
        explanation: "Keywords: Storage, turgor pressure, cell firmness.",
        difficulty: "Standard" as const
    }))
];
