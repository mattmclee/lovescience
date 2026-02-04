import { Question } from "./data";

export const batch2Questions: Question[] = [
    // --- MODEL OF MATTER (matter) ---
    {
        id: "matter_mcq_1",
        topicId: "matter",
        paper: 1,
        question: "According to the kinetic particle theory, what happens to the particles in a solid when it is heated?",
        options: ["They gain energy and move further apart.", "They lose energy and vibrate more slowly.", "They expand in size.", "They turn into liquid particles."],
        answer: "0",
        explanation: "Heating gives particles more kinetic energy, causing them to vibrate more vigorously and move slightly further apart.",
        difficulty: "Standard"
    },
    {
        id: "matter_oe_1",
        topicId: "matter",
        paper: 2,
        question: "Why do gases have no fixed shape or volume?",
        answer: "Particles in a gas are very far apart with negligible forces of attraction. They move at high speeds in all directions, filling up any available space.",
        explanation: "Keywords: Far apart, negligible forces, high speeds.",
        difficulty: "Standard"
    },

    // --- FORCES & PRESSURE (forces) ---
    {
        id: "forces_mcq_1",
        topicId: "forces",
        paper: 1,
        question: "A person exerts a force of 500 N on an area of 0.25 m². What is the pressure exerted?",
        options: ["125 Pa", "1000 Pa", "2000 Pa", "2500 Pa"],
        answer: "2",
        explanation: "Pressure = Force / Area = 500 / 0.25 = 2000 Pa.",
        difficulty: "Standard"
    },
    {
        id: "forces_oe_1",
        topicId: "forces",
        paper: 2,
        question: "Explain why sharp knives cut more easily than blunt knives.",
        answer: "A sharp knife has a smaller surface area at its edge. For the same applied force, a smaller area results in a much higher pressure, which cuts through material more easily.",
        explanation: "Keywords: Surface area, pressure direct proportion.",
        difficulty: "Top School",
        school: "RI 2022"
    },

    // --- ENERGY & HEAT (energy) ---
    {
        id: "energy_mcq_1",
        topicId: "energy",
        paper: 1,
        question: "Which of the following processes involves heat transfer by convection?",
        options: ["Sunlight warming the Earth.", "Feeling the heat from a metal spoon in hot tea.", "The cooling of a room by an air conditioner.", "Heat moving through the glass of a window."],
        answer: "2",
        explanation: "Convection involves the movement of fluid (air) due to density changes.",
        difficulty: "Standard"
    },
    {
        id: "energy_oe_1",
        topicId: "energy",
        paper: 2,
        question: "State the law of conservation of energy.",
        answer: "Energy cannot be created or destroyed, but can only be changed from one form to another.",
        explanation: "Standard physical law.",
        difficulty: "Standard"
    },

    // --- ECOSYSTEMS (ecosystems) ---
    {
        id: "ecosystems_mcq_1",
        topicId: "ecosystems",
        paper: 1,
        question: "In a food chain, which organism is usually found at the first trophic level?",
        options: ["Primary consumer", "Secondary consumer", "Producer", "Decomposer"],
        answer: "2",
        explanation: "Producers (plants) start the flow of energy in an ecosystem.",
        difficulty: "Standard"
    },
    {
        id: "ecosystems_oe_1",
        topicId: "ecosystems",
        paper: 2,
        question: "Define the term 'community' in an ecological context.",
        answer: "A community consists of all the populations of different species living and interacting together in the same habitat.",
        explanation: "Keywords: Populations, different species, interacting.",
        difficulty: "Standard"
    }
];
