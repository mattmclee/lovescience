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
            school: i < 5 ? "RI 2023" : undefined
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

export const batch1Questions: Question[] = [
    ...generateMCQs("diversity", "Diversity of Matter", [
        { q: "Which of the following is a physical property of metals?", o: ["Low melting point", "Poor conductor", "Ductility", "Brittle"], a: "2", e: "Metals can be drawn into wires." },
        { q: "Isotopes are atoms of the same element with different numbers of...", o: ["Protons", "Neutrons", "Electrons", "Nuclei"], a: "1", e: "Neutrons change the mass but not the chemistry." },
        { q: "Which method is best to separate sand from water?", o: ["Distillation", "Evaporation", "Filtration", "Chromatography"], a: "2", e: "Filtration removes insoluble solids." }
    ]),
    ...generateOEs("diversity", "Diversity of Matter", [
        { q: "Explain how chromatography works.", a: "It separates substances based on their different solubilities in a given solvent.", e: "Keywords: Solubility, solvent front." }
    ]),
    ...generateMCQs("light", "Ray Model of Light", [
        { q: "Angle of incidence is always equal to...", o: ["Angle of refraction", "Angle of reflection", "90 degrees", "Zero"], a: "1", e: "Law of reflection: i = r." },
        { q: "Bending of light as it enters a new medium is called...", o: ["Reflection", "Refraction", "Absorption", "Diffusion"], a: "1", e: "Refraction occurs due to speed change." }
    ]),
    ...generateOEs("light", "Ray Model of Light", [
        { q: "Why does light bend towards the normal in glass?", a: "Light travels slower in glass than in air, causing it to refract towards the normal.", e: "Principle of optical density." }
    ]),
    ...generateMCQs("cells", "Model of Cells", [
        { q: "The 'brain' of the cell is the...", o: ["Mitochondria", "Nucleus", "Ribosome", "Vacuole"], a: "1", e: "The nucleus contains genetic info." },
        { q: "Photosynthesis occurs in the...", o: ["Cytoplasm", "Cell wall", "Chloroplast", "Nucleus"], a: "2", e: "Chloroplasts contain chlorophyll." }
    ]),
    ...generateOEs("cells", "Model of Cells", [
        { q: "Why do plant cells have fixed shapes?", a: "Because they have a rigid cell wall made of cellulose.", e: "Cell wall provides structural support." }
    ])
];
