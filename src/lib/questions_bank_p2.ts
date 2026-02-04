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
            school: i < 5 ? "HCI 2023" : undefined
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

export const batch2Questions: Question[] = [
    ...generateMCQs("matter", "Model of Matter", [
        { q: "An atom is mostly made of...", o: ["Solid matter", "Empty space", "Energy", "Liquid"], a: "1", e: "The Rutherford experiment showed atoms are mostly empty space." },
        { q: "Which particle has a positive charge?", o: ["Electron", "Neutron", "Proton", "Photon"], a: "2", e: "Protons are positive, electrons are negative." }
    ]),
    ...generateOEs("matter", "Model of Matter", [
        { q: "Explain the particulate nature of matter.", a: "Matter is made up of tiny particles that are in constant, random motion.", e: "Keywords: Particles, random motion." }
    ]),
    ...generateMCQs("forces", "Forces & Pressure", [
        { q: "Pressure is defined as force per unit...", o: ["Volume", "Mass", "Area", "Time"], a: "2", e: "P = F / A." },
        { q: "SI unit of force is...", o: ["Joule", "Pascal", "Newton", "Watt"], a: "2", e: "Named after Sir Isaac Newton." }
    ]),
    ...generateOEs("forces", "Forces & Pressure", [
        { q: "Why are snowshoes useful in deep snow?", a: "They increase the surface area in contact with the snow, thereby reducing the pressure exerted by weight.", e: "Keywords: Surface area, pressure reduction." }
    ]),
    ...generateMCQs("energy", "Energy & Heat", [
        { q: "Energy cannot be created or destroyed, only...", o: ["Disappeared", "Transformed", "Multiplied", "Divided"], a: "1", e: "Law of conservation of energy." },
        { q: "Which is a renewable source of energy?", o: ["Coal", "Solar", "Natural gas", "Nuclear"], a: "1", e: "Solar energy is replenished naturally." }
    ]),
    ...generateOEs("energy", "Energy & Heat", [
        { q: "State the difference between heat and temperature.", a: "Heat is a form of energy (J), while temperature is a measure of the degree of hotness (deg C or K).", e: "Energy vs Degree." }
    ]),
    ...generateMCQs("ecosystems", "Ecosystems", [
        { q: "A group of the same species in an area is a...", o: ["Community", "Population", "Habitat", "Biosphere"], a: "1", e: "Population refers to the same species." },
        { q: "Interconnected food chains form a...", o: ["Food link", "Food web", "Food circle", "Food block"], a: "1", e: "Food webs show multiple energy paths." }
    ]),
    ...generateOEs("ecosystems", "Ecosystems", [
        { q: "What is an invasive species?", a: "An organism that is not native to a specific location and has a tendency to spread to a degree believed to cause damage to the environment.", e: "Keywords: Non-native, environmental damage." }
    ])
];
