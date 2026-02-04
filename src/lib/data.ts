export interface Topic {
    id: string;
    name: string;
    icon: string;
    color: string;
}

export const topics: Topic[] = [
    { id: "diversity", name: "Diversity of Matter", icon: "💎", color: "#6366f1" },
    { id: "light", name: "Ray Model of Light", icon: "🔦", color: "#f59e0b" },
    { id: "cells", name: "Model of Cells", icon: "🧫", color: "#10b981" },
    { id: "matter", name: "Model of Matter", icon: "⚛️", color: "#ec4899" },
    { id: "forces", name: "Forces & Pressure", icon: "🏋️", color: "#ef4444" },
    { id: "energy", name: "Energy & Heat", icon: "🔥", color: "#f97316" },
    { id: "ecosystems", name: "Ecosystems", icon: "🌳", color: "#22c55e" },
    { id: "digestion", name: "Human Digestion", icon: "🍎", color: "#db2777" },
    { id: "transport", name: "Transport System", icon: "🩸", color: "#9333ea" },
    { id: "reproduction", name: "Human Reproduction", icon: "🧬", color: "#3b82f6" },
    { id: "electrical", name: "Electrical Systems", icon: "⚡", color: "#eab308" },
];

export interface Question {
    id: string;
    topicId: string;
    paper: 1 | 2;
    question: string;
    options?: string[]; // For Paper 1 (MCQ)
    answer: string | string[]; // Correct option index or model answer
    explanation: string;
    difficulty: "Standard" | "Top School";
    school?: string;
}

import { batch1Questions } from "./questions_bank_p1";
import { batch2Questions } from "./questions_bank_p2";
import { batch3Questions } from "./questions_bank_p3";
import { textbook2AQuestions } from "./questions_textbook_2a";

export const initialQuestions: Question[] = [
    ...batch1Questions,
    ...batch2Questions,
    ...batch3Questions,
    ...textbook2AQuestions,
    // Integrative Questions
    {
        id: "int_1",
        topicId: "forces",
        paper: 2,
        question: "Describe how forces are involved in the human digestive system, particularly in the movement of food through the alimentary canal.",
        answer: "Forces are involved through peristalsis, where the contraction and relaxation of longitudinal and circular muscles in the walls of the esophagus and intestines create a wave-like movement (force) that pushes the bolus/chyme along.",
        explanation: "Integration: Forces + Human Digestive System. Keywords: Peristalsis, muscle contraction, wave-like movement.",
        difficulty: "Top School",
        school: "NYGH 2023"
    }
];
