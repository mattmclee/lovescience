"use client";

import { useState } from "react";
import { topics } from "@/lib/data";
import ExamEngine from "@/components/ExamEngine";

export default function Home() {
  const [selectedTopics, setSelectedTopics] = useState<string[]>([]);
  const [difficulty, setDifficulty] = useState<"Standard" | "Top School">("Standard");
  const [paperType, setPaperType] = useState<"Paper 1" | "Paper 2">("Paper 1");
  const [isExamMode, setIsExamMode] = useState(false);

  const toggleTopic = (id: string) => {
    setSelectedTopics((prev) =>
      prev.includes(id) ? prev.filter((t) => t !== id) : [...prev, id]
    );
  };

  const startExam = () => {
    if (selectedTopics.length === 0) {
      alert("Please select at least one topic!");
      return;
    }
    setIsExamMode(true);
  };

  if (isExamMode) {
    return (
      <main className="py-12 min-h-screen bg-[var(--background)]">
        <ExamEngine
          selectedTopicIds={selectedTopics}
          paperType={paperType as any}
          difficulty={difficulty}
          onComplete={() => setIsExamMode(false)}
        />
      </main>
    );
  }

  return (
    <main className="max-w-6xl mx-auto px-6 py-12">
      <header className="text-center mb-16 animate-in fade-in slide-in-from-top duration-700">
        <h1 className="text-6xl font-black mb-4 bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 to-pink-500 tracking-tight">
          LoveScience
        </h1>
        <p className="text-slate-400 text-lg max-w-2xl mx-auto">
          Master Sec 2 G3 Science with gamified practice and top school questions.
        </p>
      </header>
// ... rest of the file ...

      <section className="grid lg:grid-cols-12 gap-12">
        {/* Topic Selection */}
        <div className="lg:col-span-8">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold">Select Topics</h2>
            <button
              onClick={() => setSelectedTopics(topics.map(t => t.id))}
              className="text-sm text-indigo-400 hover:text-indigo-300"
            >
              Select All
            </button>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {topics.map((topic) => (
              <button
                key={topic.id}
                onClick={() => toggleTopic(topic.id)}
                className={`glass-card p-6 flex flex-col items-center text-center gap-3 relative transition-all ${selectedTopics.includes(topic.id)
                  ? "ring-2 ring-indigo-500 bg-white/10"
                  : ""
                  }`}
              >
                <span className="text-4xl">{topic.icon}</span>
                <span className="font-semibold text-sm">{topic.name}</span>
                {selectedTopics.includes(topic.id) && (
                  <div className="absolute top-2 right-2 w-4 h-4 bg-indigo-500 rounded-full flex items-center justify-center">
                    <svg className="w-2.5 h-2.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={4} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Configuration Sidebar */}
        <div className="lg:col-span-4 space-y-6">
          <div className="glass-card p-8 sticky top-24">
            <h2 className="text-xl font-bold mb-6">Configure Paper</h2>

            <div className="space-y-6">
              {/* Paper Type */}
              <div>
                <label className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-3 block">Paper Type</label>
                <div className="grid grid-cols-2 gap-2 bg-black/40 p-1 rounded-xl">
                  {["Paper 1", "Paper 2"].map((t) => (
                    <button
                      key={t}
                      onClick={() => setPaperType(t as any)}
                      className={`py-2 px-4 rounded-lg text-sm font-bold transition-all ${paperType === t ? "bg-indigo-600 shadow-lg" : "text-slate-400 hover:text-white"
                        }`}
                    >
                      {t}
                    </button>
                  ))}
                </div>
              </div>

              {/* Difficulty */}
              <div>
                <label className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-3 block">Difficulty</label>
                <div className="grid grid-cols-2 gap-2 bg-black/40 p-1 rounded-xl">
                  {["Standard", "Top School"].map((d) => (
                    <button
                      key={d}
                      onClick={() => setDifficulty(d as any)}
                      className={`py-2 px-4 rounded-lg text-sm font-bold transition-all ${difficulty === d ? "bg-pink-600 shadow-lg" : "text-slate-400 hover:text-white"
                        }`}
                    >
                      {d}
                    </button>
                  ))}
                </div>
              </div>

              <div className="pt-6 border-t border-[var(--glass-border)]">
                <div className="flex justify-between items-center mb-6">
                  <span className="text-sm text-slate-400">Selected Topics</span>
                  <span className="font-bold text-indigo-400">{selectedTopics.length}</span>
                </div>
                <button
                  onClick={startExam}
                  className="btn-primary w-full text-lg py-4"
                >
                  Generate Paper
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
