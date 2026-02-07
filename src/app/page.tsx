"use client";

import { useState } from "react";
import { topics } from "@/lib/data";
import ExamEngine from "@/components/ExamEngine";
import FlashCardEngine from "@/components/FlashCardEngine";

export default function Home() {
  const [selectedTopics, setSelectedTopics] = useState<string[]>([]);
  const [paperType, setPaperType] = useState<"Paper 1" | "Paper 2">("Paper 1");
  const [isExamMode, setIsExamMode] = useState(false);
  const [isFlashMode, setIsFlashMode] = useState(false);

  const [showQuizOptions, setShowQuizOptions] = useState(false);

  const toggleTopic = (id: string) => {
    setSelectedTopics((prev) =>
      prev.includes(id) ? prev.filter((t) => t !== id) : [...prev, id]
    );
  };

  const startExam = (type: "Paper 1" | "Paper 2") => {
    if (selectedTopics.length === 0) {
      alert("Please select at least one topic!");
      return;
    }
    setPaperType(type);
    setIsExamMode(true);
    setShowQuizOptions(false);
  };

  const startFlashCards = () => {
    if (selectedTopics.length === 0) {
      alert("Please select at least one topic!");
      return;
    }
    setIsFlashMode(true);
  };

  if (isExamMode) {
    return (
      <main className="min-h-screen bg-[var(--background)]">
        <ExamEngine
          selectedTopicIds={selectedTopics}
          paperType={paperType as any}
          onComplete={() => setIsExamMode(false)}
        />
      </main>
    );
  }

  if (isFlashMode) {
    return (
      <main className="min-h-screen bg-[var(--background)]">
        <FlashCardEngine
          selectedTopicIds={selectedTopics}
          onComplete={() => setIsFlashMode(false)}
        />
      </main>
    );
  }

  function BottomBar() {
    return (
      <div className="fixed bottom-0 left-0 right-0 flex flex-col items-center z-50 pointer-events-none">
        {/* Quiz Options Popup */}
        {showQuizOptions && (
          <div className="mb-4 flex gap-4 p-2 glass-card border-indigo-500/30 animate-in slide-in-from-bottom-4 fade-in duration-300 pointer-events-auto shadow-2xl shadow-indigo-500/20">
            <button
              onClick={() => startExam("Paper 1")}
              className="flex flex-col items-center gap-1 px-6 py-3 rounded-xl hover:bg-white/10 transition-colors"
            >
              <span className="text-[10px] font-black uppercase tracking-widest text-indigo-400">Paper 1</span>
              <span className="text-xs font-bold">MCQ</span>
            </button>
            <div className="w-px bg-white/10 my-2" />
            <button
              onClick={() => startExam("Paper 2")}
              className="flex flex-col items-center gap-1 px-6 py-3 rounded-xl hover:bg-white/10 transition-colors"
            >
              <span className="text-[10px] font-black uppercase tracking-widest text-pink-400">Paper 2</span>
              <span className="text-xs font-bold">Open Ended</span>
            </button>
          </div>
        )}

        {/* Main Bar */}
        <div className="w-full bg-black/80 backdrop-blur-2xl border-t border-white/10 shadow-2xl pointer-events-auto">
          <div className="max-w-4xl mx-auto flex items-center justify-center gap-12 p-2">
            <button
              onClick={startFlashCards}
              className={`flex items-center gap-3 px-8 py-3 rounded-2xl transition-all ${isFlashMode ? 'bg-pink-500/20 text-pink-400 border border-pink-500/30' : 'text-slate-400 hover:text-white hover:bg-white/5'}`}
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
              </svg>
              <span className="text-sm font-bold tracking-tight">Flash Card</span>
            </button>

            <div className="w-px h-8 bg-white/10" />

            <button
              onClick={() => setShowQuizOptions(!showQuizOptions)}
              className={`flex items-center gap-3 px-8 py-3 rounded-2xl transition-all ${showQuizOptions ? 'bg-indigo-500 text-white' : 'text-slate-400 hover:text-white hover:bg-white/5'}`}
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
              </svg>
              <span className="text-sm font-bold tracking-tight">Quiz game</span>
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <main className="max-w-4xl mx-auto px-6 py-12 pb-32">
      <header className="text-center mb-16 animate-in fade-in slide-in-from-top duration-700">
        <h1 className="text-6xl font-black mb-4 bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 to-pink-500 tracking-tight">
          LoveScience
        </h1>
        <p className="text-slate-400 text-lg max-w-2xl mx-auto">
          Master Sec 2 G3 Science with gamified practice and top school questions.
        </p>
      </header>

      <section className="animate-in fade-in slide-in-from-bottom duration-700 delay-200">
        {/* Topic Selection */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Select Topics</h2>
          <div className="flex gap-4 items-center">
            <span className="text-sm text-slate-500 bg-white/5 px-3 py-1 rounded-full border border-white/10">
              {selectedTopics.length} Selected
            </span>
            <button
              onClick={() => setSelectedTopics(topics.map(t => t.id))}
              className="text-sm text-indigo-400 hover:text-indigo-300 font-bold uppercase tracking-widest"
            >
              Select All
            </button>
          </div>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {topics.map((topic) => (
            <button
              key={topic.id}
              onClick={() => toggleTopic(topic.id)}
              className={`glass-card p-6 flex flex-col items-center text-center gap-3 relative transition-all duration-300 group ${selectedTopics.includes(topic.id)
                ? "ring-2 ring-indigo-500 bg-indigo-500/10 scale-[1.02]"
                : "hover:bg-white/5"
                }`}
            >
              <span className="text-4xl transition-transform group-hover:scale-110">{topic.icon}</span>
              <span className="font-semibold text-sm">{topic.name}</span>
              {selectedTopics.includes(topic.id) && (
                <div className="absolute top-3 right-3 w-5 h-5 bg-indigo-500 rounded-full flex items-center justify-center animate-in zoom-in duration-300 border-2 border-slate-900">
                  <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={4} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
              )}
            </button>
          ))}
        </div>
      </section>

      <BottomBar />
    </main>
  );
}
