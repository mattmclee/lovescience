"use client";

import { useState, useEffect } from "react";
import Cookies from "js-cookie";
import { Question, initialQuestions } from "@/lib/data";
import Results from "./Results";

interface ExamEngineProps {
    selectedTopicIds: string[];
    paperType: "Paper 1" | "Paper 2";
    difficulty: "Standard" | "Top School";
    onComplete: () => void;
}

const COOKIE_NAME = "lovescience_wrong_answers";

export default function ExamEngine({
    selectedTopicIds,
    paperType,
    difficulty,
    onComplete
}: ExamEngineProps) {
    const [questions, setQuestions] = useState<Question[]>([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [selectedOption, setSelectedOption] = useState<string | null>(null);
    const [userTextAnswer, setUserTextAnswer] = useState("");
    const [isAnswered, setIsAnswered] = useState(false);
    const [score, setScore] = useState(0);
    const [showResults, setShowResults] = useState(false);

    useEffect(() => {
        // 1. Get wrong answer IDs from cookies
        const wrongAnswerIds = JSON.parse(Cookies.get(COOKIE_NAME) || "[]") as string[];

        // 2. Filter initial questions based on criteria
        const filtered = initialQuestions.filter(q =>
            selectedTopicIds.includes(q.topicId) &&
            ((paperType === "Paper 1" && q.paper === 1) || (paperType === "Paper 2" && q.paper === 2)) &&
            q.difficulty === difficulty
        );

        // 3. Shuffle logic (Shuffle only on mount/selection change)
        const shuffle = (array: Question[]) => [...array].sort(() => Math.random() - 0.5);

        const prevWrong = filtered.filter(q => wrongAnswerIds.includes(q.id));
        const others = filtered.filter(q => !wrongAnswerIds.includes(q.id));

        const finalQuestions = [...shuffle(prevWrong), ...shuffle(others)];
        setQuestions(finalQuestions);
        setCurrentIndex(0); // Reset index whenever questions change
    }, [selectedTopicIds, paperType, difficulty]);

    if (showResults) {
        return (
            <Results
                score={score}
                total={questions.length}
                onRestart={onComplete}
            />
        );
    }

    if (questions.length === 0) {
        return (
            <div className="glass-card p-12 text-center max-w-2xl mx-auto">
                <h3 className="text-2xl font-bold mb-4">No questions found!</h3>
                <p className="text-slate-400 mb-8">Try selecting more topics or changing the difficulty.</p>
                <button onClick={onComplete} className="btn-primary">Back to Dashboard</button>
            </div>
        );
    }

    const currentQuestion = questions[currentIndex];
    const progress = ((currentIndex + 1) / questions.length) * 100;

    const handleCheck = () => {
        let isCorrect = false;
        if (paperType === "Paper 1") {
            if (selectedOption === currentQuestion.answer) {
                isCorrect = true;
                setScore(s => s + 1);
            }
        } else {
            isCorrect = true;
            setScore(s => s + 1);
        }

        // Cookie persistence logic
        const currentWrongIds = JSON.parse(Cookies.get(COOKIE_NAME) || "[]") as string[];
        if (!isCorrect) {
            if (!currentWrongIds.includes(currentQuestion.id)) {
                Cookies.set(COOKIE_NAME, JSON.stringify([...currentWrongIds, currentQuestion.id]), { expires: 30 });
            }
        } else {
            const updatedIds = currentWrongIds.filter(id => id !== currentQuestion.id);
            Cookies.set(COOKIE_NAME, JSON.stringify(updatedIds), { expires: 30 });
        }

        setIsAnswered(true);
    };

    const handleNext = () => {
        if (currentIndex < questions.length - 1) {
            setCurrentIndex(prev => prev + 1);
            setSelectedOption(null);
            setUserTextAnswer("");
            setIsAnswered(false);
        } else {
            setShowResults(true);
        }
    };

    return (
        <div className="max-w-4xl mx-auto px-6">
            {/* Progress Header */}
            <div className="flex items-center gap-4 mb-12">
                <button onClick={onComplete} className="text-slate-400 hover:text-white">
                    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>
                <div className="flex-1 h-3 bg-white/5 rounded-full overflow-hidden">
                    <div
                        className="h-full bg-gradient-to-r from-indigo-500 to-pink-500 transition-all duration-500"
                        style={{ width: `${progress}%` }}
                    />
                </div>
                <span className="font-bold text-sm text-slate-400">{currentIndex + 1} / {questions.length}</span>
            </div>

            <div className="space-y-8">
                {/* Question Area - ADDED KEY TO FORCE RE-MOUNT ON CHANGE */}
                <div key={currentQuestion.id} className="glass-card p-10 animate-in fade-in slide-in-from-bottom-4 duration-500">
                    {currentQuestion.school && (
                        <span className="inline-block px-3 py-1 rounded-full bg-indigo-500/20 text-indigo-400 text-[10px] font-black uppercase tracking-widest mb-4">
                            {currentQuestion.school} • {currentQuestion.difficulty}
                        </span>
                    )}
                    <h2 className="text-2xl font-semibold leading-relaxed">
                        {currentQuestion.question}
                    </h2>

                    <div className="mt-10 space-y-3">
                        {paperType === "Paper 1" ? (
                            currentQuestion.options?.map((option, idx) => (
                                <button
                                    key={idx}
                                    disabled={isAnswered}
                                    onClick={() => setSelectedOption(idx.toString())}
                                    className={`w-full text-left p-5 rounded-2xl border-2 transition-all flex items-center gap-4 group ${isAnswered
                                        ? idx.toString() === currentQuestion.answer
                                            ? "bg-emerald-500/20 border-emerald-500 text-emerald-400"
                                            : idx.toString() === selectedOption
                                                ? "bg-rose-500/20 border-rose-500 text-rose-400"
                                                : "bg-white/5 border-transparent opacity-50"
                                        : selectedOption === idx.toString()
                                            ? "bg-indigo-500/10 border-indigo-500 text-indigo-100"
                                            : "bg-white/5 border-transparent hover:bg-white/10 text-slate-300"
                                        }`}
                                >
                                    <span className={`w-8 h-8 rounded-lg flex items-center justify-center font-bold text-sm ${selectedOption === idx.toString() ? "bg-indigo-500 text-white" : "bg-white/10"
                                        }`}>
                                        {String.fromCharCode(65 + idx)}
                                    </span>
                                    <span className="flex-1">{option}</span>
                                </button>
                            ))
                        ) : (
                            <div className="space-y-6">
                                <textarea
                                    disabled={isAnswered}
                                    value={userTextAnswer}
                                    onChange={(e) => setUserTextAnswer(e.target.value)}
                                    placeholder="Type your answer here..."
                                    className="w-full h-48 bg-white/5 border-2 border-transparent focus:border-indigo-500 rounded-2xl p-6 outline-none transition-all resize-none text-lg"
                                />
                                {isAnswered && (
                                    <div className="p-6 rounded-2xl bg-indigo-500/10 border border-indigo-500/30 animate-in zoom-in-95 duration-300">
                                        <h4 className="font-bold text-indigo-400 mb-2 uppercase text-xs tracking-widest">Model Answer</h4>
                                        <p className="text-slate-300 leading-relaxed mb-4">{currentQuestion.answer}</p>
                                        <h4 className="font-bold text-indigo-400 mb-2 uppercase text-xs tracking-widest">Marking Tip</h4>
                                        <p className="text-slate-400 text-sm italic">{currentQuestion.explanation}</p>
                                    </div>
                                )}
                            </div>
                        )}
                    </div>
                </div>

                {/* Footer Actions */}
                <div className="flex justify-end pt-4">
                    {!isAnswered ? (
                        <button
                            disabled={paperType === "Paper 1" ? selectedOption === null : userTextAnswer.length < 5}
                            onClick={handleCheck}
                            className="btn-primary px-12 py-4 text-xl disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            Check Answer
                        </button>
                    ) : (
                        <button
                            onClick={handleNext}
                            className="btn-primary px-12 py-4 text-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 border-none"
                        >
                            {currentIndex < questions.length - 1 ? "Next Question" : "Finish Review"}
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
}
