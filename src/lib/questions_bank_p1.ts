import { Question } from "./data";

export const batch1Questions: Question[] = [
    // --- DIVERSITY OF MATTER (diversity) ---
    {
        id: "diversity_mcq_1",
        topicId: "diversity",
        paper: 1,
        question: "Which of the following describes a physical property of copper?",
        options: ["It reacts with oxygen to form a green layer.", "It is a good conductor of electricity.", "It is resistant to corrosion.", "It reacts with acids to produce hydrogen gas."],
        answer: "1",
        explanation: "Conductivity is a physical property. Chemical reactions describe chemical properties.",
        difficulty: "Standard"
    },
    {
        id: "diversity_mcq_2",
        topicId: "diversity",
        paper: 1,
        question: "Which separation technique is most suitable for obtaining pure water from sea water?",
        options: ["Filtration", "Evaporation to dryness", "Crystallisation", "Distillation"],
        answer: "3",
        explanation: "Distillation allows for the collection of the solvent (water) by boiling and then condensing it.",
        difficulty: "Standard"
    },
    {
        id: "diversity_mcq_3",
        topicId: "diversity",
        paper: 1,
        question: "In chromatography, what determines the distance a substance travels on the paper?",
        options: ["Its color and density.", "Its solubility in the solvent and its affinity for the paper.", "The temperature of the room.", "The size of the paper."],
        answer: "1",
        explanation: "Solubility and affinity determine the Rf value.",
        difficulty: "Top School",
        school: "RI 2023"
    },
    {
        id: "diversity_oe_1",
        topicId: "diversity",
        paper: 2,
        question: "Explain why filtration cannot be used to separate salt from a salt solution.",
        answer: "Salt is a soluble solute in water. The salt particles in a solution are too small to be trapped by the pores of the filter paper and will pass through as part of the filtrate.",
        explanation: "Keywords: Soluble, particle size, pores, filtrate.",
        difficulty: "Standard"
    },
    {
        id: "diversity_oe_2",
        topicId: "diversity",
        paper: 2,
        question: "Describe how you would separate a mixture of sand and iron filings.",
        answer: "Use a magnet. Iron is a magnetic material and will be attracted to the magnet, leaving the non-magnetic sand behind.",
        explanation: "Keywords: Magnet, magnetic material, attraction.",
        difficulty: "Standard"
    },

    // --- RAY MODEL OF LIGHT (light) ---
    {
        id: "light_mcq_1",
        topicId: "light",
        paper: 1,
        question: "A light ray hits a plane mirror at an angle of 30° to the mirror surface. What is the angle of reflection?",
        options: ["30°", "60°", "90°", "120°"],
        answer: "1",
        explanation: "Angle of incidence = 90 - 30 = 60°. Angle of reflection = Angle of incidence = 60°.",
        difficulty: "Top School",
        school: "HCI 2022"
    },
    {
        id: "light_mcq_2",
        topicId: "light",
        paper: 1,
        question: "Which of the following is an example of diffuse reflection?",
        options: ["Light reflecting off a calm lake.", "Light reflecting off a polished silver cup.", "Light reflecting off a piece of white paper.", "Light reflecting off a high-quality glass mirror."],
        answer: "2",
        explanation: "Rough surfaces like paper cause light to reflect in many directions (diffuse).",
        difficulty: "Standard"
    },
    {
        id: "light_oe_1",
        topicId: "light",
        paper: 2,
        question: "Explain the phenomenon of refraction when light enters water from air.",
        answer: "Refraction is the bending of light as it passes from one medium to another of different optical density. Water is optically denser than air, so light slows down and bends towards the normal.",
        explanation: "Keywords: Medium, optical density, speed change, bend towards normal.",
        difficulty: "Standard"
    },

    // --- MODEL OF CELLS (cells) ---
    {
        id: "cells_mcq_1",
        topicId: "cells",
        paper: 1,
        question: "Which part of the cell controls all cellular activities and contains genetic material?",
        options: ["Cytoplasm", "Cell membrane", "Nucleus", "Vacuole"],
        answer: "2",
        explanation: "The nucleus is the control center of the cell.",
        difficulty: "Standard"
    },
    {
        id: "cells_mcq_2",
        topicId: "cells",
        paper: 1,
        question: "What is the primary function of the cell wall in plant cells?",
        options: ["To store water and nutrients.", "To control the entry and exit of substances.", "To provide structural support and a fixed shape.", "To carry out photosynthesis."],
        answer: "2",
        explanation: "The rigid cell wall made of cellulose provides support.",
        difficulty: "Standard"
    },
    {
        id: "cells_oe_1",
        topicId: "cells",
        paper: 2,
        question: "State one structural difference between a typical plant cell and a typical animal cell.",
        answer: "Plant cells have a cell wall and chloroplasts, whereas animal cells do not. Also, plant cells usually have a large central vacuole, while animal cells have small, temporary ones.",
        explanation: "Keywords: Cell wall, chloroplasts, large central vacuole.",
        difficulty: "Standard"
    }
];
