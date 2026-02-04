"use client";

interface ResultsProps {
    score: number;
    total: number;
    onRestart: () => void;
}

export default function Results({ score, total, onRestart }: ResultsProps) {
    const percentage = Math.round((score / total) * 100);

    return (
        <div className="max-w-2xl mx-auto text-center px-6">
            <div className="glass-card p-12 animate-in zoom-in duration-500">
                <div className="w-32 h-32 bg-gradient-to-tr from-indigo-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-8 shadow-xl shadow-indigo-500/20">
                    <span className="text-4xl font-black text-white">{percentage}%</span>
                </div>

                <h2 className="text-4xl font-bold mb-4">Exam Completed!</h2>
                <p className="text-slate-400 text-lg mb-8">
                    You scored <span className="text-white font-bold">{score}</span> out of <span className="text-white font-bold">{total}</span> questions correctly.
                </p>

                <div className="grid grid-cols-2 gap-4 mb-10">
                    <div className="bg-white/5 p-6 rounded-2xl">
                        <span className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-1">XP Earned</span>
                        <span className="text-2xl font-black text-indigo-400">+{score * 10}</span>
                    </div>
                    <div className="bg-white/5 p-6 rounded-2xl">
                        <span className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-1">Accuracy</span>
                        <span className="text-2xl font-black text-pink-400">{percentage}%</span>
                    </div>
                </div>

                <button
                    onClick={onRestart}
                    className="btn-primary w-full text-lg py-4"
                >
                    Return to Dashboard
                </button>
            </div>
        </div>
    );
}
