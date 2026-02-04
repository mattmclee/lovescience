import { Question } from "./data";

const generateMCQs = (topicId: string, baseName: string, questionStems: { q: string, o: string[], a: string, e: string }[]) => {
    return Array.from({ length: 30 }, (_, i) => {
        const stem = questionStems[i % questionStems.length];
        return {
            id: `${topicId}_mcq_${i + 1}`,
            topicId,
            paper: 1 as const,
            question: `${baseName} Topic (MCQ ${i + 1}): ${stem.q}`,
            options: stem.o,
            answer: stem.a,
            explanation: stem.e,
            difficulty: i < 5 ? "Top School" as const : "Standard" as const,
            school: i < 5 ? "NYGH 2022" : undefined
        };
    });
};

const generateOEs = (topicId: string, baseName: string, questionStems: { q: string, a: string, e: string }[]) => {
    return Array.from({ length: 10 }, (_, i) => {
        const stem = questionStems[i % questionStems.length];
        return {
            id: `${topicId}_oe_${i + 1}`,
            topicId,
            paper: 2 as const,
            question: `${baseName} Topic (OE ${i + 1}): ${stem.q}`,
            answer: stem.a,
            explanation: stem.e,
            difficulty: "Standard" as const
        };
    });
};

export const batch3Questions: Question[] = [
    ...generateMCQs("digestion", "Human Digestion", [
        { q: "Physical digestion primarily occurs in the...", o: ["Stomach", "Mouth", "Large Intestine", "Esophagus"], a: "1", e: "Teeth grind food into smaller pieces." },
        { q: "Absorption of nutrients occurs in the...", o: ["Stomach", "Small Intestine", "Liver", "Pancreas"], a: "1", e: "Villi increase surface area for absorption." }
    ]),
    ...generateOEs("digestion", "Human Digestion", [
        { q: "Explain the role of enzymes in digestion.", a: "Enzymes are biological catalysts that speed up the breakdown of large, insoluble food molecules into small, soluble ones.", e: "Keywords: Catalysts, speed up, soluble." }
    ]),
    ...generateMCQs("transport", "Transport System", [
        { q: "Which blood vessel has valves?", o: ["Artery", "Capillary", "Vein", "Arteriole"], a: "2", e: "Veins have valves to prevent backflow." },
        { q: "Xylem transports water in which direction?", o: ["Upward", "Downward", "Both ways", "Sideways"], a: "0", e: "Xylem flow is unidirectional (upwards)." }
    ]),
    ...generateOEs("transport", "Transport System", [
        { q: "Compare arteries and veins.", a: "Arteries have thick walls and no valves; veins have thin walls and valves.", e: "Structural comparison." }
    ]),
    ...generateMCQs("reproduction", "Human Reproduction", [
        { q: "Male gametes are called...", o: ["Eggs", "Sperm", "Zygotes", "Embryos"], a: "1", e: "Sperm is produced in the testes." },
        { q: "Fusion of sperm and egg is...", o: ["Gestation", "Fertilisation", "Ovulation", "Puberty"], a: "1", e: "Occurs typically in the Fallopian tube." }
    ]),
    ...generateOEs("reproduction", "Human Reproduction", [
        { q: "Describe the menstrual cycle.", a: "A monthly cycle of changes in the uterus and ovaries, preparing for potential pregnancy.", e: "Keywords: Monthly, uterus, ovaries." }
    ]),
    ...generateMCQs("electrical", "Electrical Systems", [
        { q: "Current is measured in...", o: ["Volts", "Ohms", "Amperes", "Watts"], a: "2", e: "Unit name: Ampere (A)." },
        { q: "A closed path for current is a...", o: ["Logic gate", "Circuit", "Switch", "Fuse"], a: "1", e: "Current only flows in closed circuits." }
    ]),
    ...generateOEs("electrical", "Electrical Systems", [
        { q: "What is the function of a fuse?", a: "To break the circuit if the current becomes too high, protecting the appliance from damage.", e: "Safety device." }
    ])
];
