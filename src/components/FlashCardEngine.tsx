"use client";

import { useState, useEffect, useRef } from "react";
import { flashCardsData, FlashCard } from "@/lib/flashcards";
import { topics } from "@/lib/data";

interface FlashCardEngineProps {
    selectedTopicIds: string[];
    onComplete: () => void;
}

export default function FlashCardEngine({ selectedTopicIds, onComplete }: FlashCardEngineProps) {
    const [cards, setCards] = useState<FlashCard[]>([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [showConcept, setShowConcept] = useState(false);
    const [ticks, setTicks] = useState(0);
    const [crosses, setCrosses] = useState(0);
    const [useTTS, setUseTTS] = useState(false);
    const [isAutoPlaying, setIsAutoPlaying] = useState(false);
    const [isBeeping, setIsBeeping] = useState(false);
    const [hasMarkedCurrent, setHasMarkedCurrent] = useState(false);
    const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([]);
    const [selectedVoice, setSelectedVoice] = useState<string>("");
    const [pitch, setPitch] = useState(1);
    const [showSettings, setShowSettings] = useState(false);

    const autoPlayRef = useRef<NodeJS.Timeout | null>(null);
    const touchStartX = useRef<number | null>(null);

    // Load voices
    useEffect(() => {
        const loadVoices = () => {
            const availableVoices = window.speechSynthesis.getVoices();
            setVoices(availableVoices);
            if (availableVoices.length > 0 && !selectedVoice) {
                // Try to find a good English voice by default
                const defaultVoice = availableVoices.find(v => v.lang.includes("en-US") || v.lang.includes("en-GB")) || availableVoices[0];
                setSelectedVoice(defaultVoice.voiceURI);
            }
        };
        loadVoices();
        window.speechSynthesis.onvoiceschanged = loadVoices;
    }, []);

    // Initialize cards
    useEffect(() => {
        const filteredCards = selectedTopicIds.flatMap(id => flashCardsData[id] || []);
        // Shuffle cards
        const shuffled = [...filteredCards].sort(() => Math.random() - 0.5);
        setCards(shuffled);
        setCurrentIndex(0);
        setShowConcept(false);
    }, [selectedTopicIds]);

    const speak = (text: string) => {
        if (!useTTS) return;
        window.speechSynthesis.cancel();
        const utterance = new SpeechSynthesisUtterance(text);
        const voice = voices.find(v => v.voiceURI === selectedVoice);
        if (voice) utterance.voice = voice;
        utterance.pitch = pitch;
        window.speechSynthesis.speak(utterance);
    };

    const playBeeps = async () => {
        setIsBeeping(true);
        const audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
        for (let i = 0; i < 5; i++) {
            const oscillator = audioCtx.createOscillator();
            const gainNode = audioCtx.createGain();
            oscillator.connect(gainNode);
            gainNode.connect(audioCtx.destination);
            oscillator.type = "sine";
            oscillator.frequency.setValueAtTime(880, audioCtx.currentTime);
            gainNode.gain.setValueAtTime(0.1, audioCtx.currentTime);
            oscillator.start();
            oscillator.stop(audioCtx.currentTime + 0.1);
            if (i < 4) await new Promise(resolve => setTimeout(resolve, 1000));
        }
        await audioCtx.close();
        setIsBeeping(false);
    };

    const handleMark = (known: boolean) => {
        if (hasMarkedCurrent) return;
        if (known) setTicks(prev => prev + 1);
        else setCrosses(prev => prev + 1);
        setHasMarkedCurrent(true);
    };

    const moveNext = () => {
        if (currentIndex < cards.length - 1) {
            setCurrentIndex(prev => prev + 1);
            setShowConcept(false);
            setHasMarkedCurrent(false);
            return true;
        }
        return false;
    };

    const movePrevious = () => {
        if (currentIndex > 0) {
            setCurrentIndex(prev => prev - 1);
            setShowConcept(false);
            setHasMarkedCurrent(false);
            return true;
        }
        return false;
    };

    const goToNextCard = () => {
        setIsAutoPlaying(false);
        if (autoPlayRef.current) clearTimeout(autoPlayRef.current);
        moveNext();
    };

    const goToPreviousCard = () => {
        setIsAutoPlaying(false);
        if (autoPlayRef.current) clearTimeout(autoPlayRef.current);
        movePrevious();
    };

    const handleTouchStart = (e: React.TouchEvent) => {
        touchStartX.current = e.touches[0].clientX;
    };

    const handleTouchEnd = (e: React.TouchEvent) => {
        if (touchStartX.current === null) return;

        const touchEndX = e.changedTouches[0].clientX;
        const diff = touchStartX.current - touchEndX;

        // Threshold of 50px for a swipe
        if (Math.abs(diff) > 50) {
            if (diff > 0) {
                // Swipe Left -> Next
                goToNextCard();
            } else {
                // Swipe Right -> Previous
                goToPreviousCard();
            }
        }

        touchStartX.current = null;
    };

    useEffect(() => {
        if (isAutoPlaying && cards.length > 0) {
            const runStep = async () => {
                const currentCard = cards[currentIndex];

                // 1. Show Keyword & Speak
                setShowConcept(false);
                speak(currentCard.keyword);

                // 2. Wait a bit, then Beep
                await new Promise(resolve => setTimeout(resolve, 1500));
                await playBeeps();

                // 3. Show Concept & Speak
                setShowConcept(true);
                speak(currentCard.concept);

                // 4. Wait before next card (if not last)
                autoPlayRef.current = setTimeout(() => {
                    // Default to "To Review" if not marked
                    setHasMarkedCurrent(prev => {
                        if (!prev) setCrosses(c => c + 1);
                        return true;
                    });

                    if (currentIndex < cards.length - 1) {
                        moveNext();
                    } else {
                        setIsAutoPlaying(false);
                    }
                }, 5000);
            };
            runStep();
        }

        return () => {
            if (autoPlayRef.current) clearTimeout(autoPlayRef.current);
        };
    }, [isAutoPlaying, currentIndex, cards, useTTS]);

    // Manual Speech Effect: Speak keyword when it appears in manual mode
    useEffect(() => {
        if (!isAutoPlaying && cards.length > 0 && useTTS && !showConcept) {
            speak(cards[currentIndex].keyword);
        }
    }, [currentIndex, isAutoPlaying, useTTS, showConcept, cards]);

    if (cards.length === 0) {
        return (
            <div className="glass-card p-12 text-center max-w-2xl mx-auto">
                <h3 className="text-2xl font-bold mb-4">No cards found!</h3>
                <p className="text-slate-400 mb-8">Please select at least one topic.</p>
                <button onClick={onComplete} className="btn-primary">Back</button>
            </div>
        );
    }

    const currentCard = cards[currentIndex];
    const progress = ((currentIndex + 1) / cards.length) * 100;
    const selectedTopicNames = topics.filter(t => selectedTopicIds.includes(t.id)).map(t => t.name).join(", ");

    return (
        <div className="max-w-4xl mx-auto px-6 pt-24 pb-32">
            {/* Header Controls - Fixed to Top */}
            <div className="fixed top-0 left-0 right-0 bg-black/80 backdrop-blur-xl p-4 border-b border-white/10 shadow-2xl z-50 flex justify-center">
                <div className="max-w-4xl w-full flex items-center gap-4 px-6">
                    <button onClick={onComplete} className="text-slate-400 hover:text-white p-2 -ml-2">
                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" />
                        </svg>
                    </button>
                    <div className="flex-1 min-w-0">
                        <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-0.5">Topics</p>
                        <p className="text-sm text-indigo-300 font-medium truncate">{selectedTopicNames}</p>
                    </div>
                    <div className="flex items-center gap-4">
                        <div className="relative">
                            <button
                                onClick={() => setShowSettings(!showSettings)}
                                className={`p-2 rounded-lg transition-colors ${showSettings ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:text-white hover:bg-white/5'}`}
                            >
                                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                </svg>
                            </button>
                            {showSettings && (
                                <div className="absolute right-0 top-full mt-2 w-64 glass-card p-4 z-50 shadow-2xl animate-in fade-in zoom-in-95 duration-200">
                                    <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-indigo-400 mb-4">TTS Settings</h4>
                                    <div className="space-y-4">
                                        <div>
                                            <label className="text-[8px] font-bold text-slate-500 uppercase mb-2 block tracking-widest">Select Voice</label>
                                            <select
                                                value={selectedVoice}
                                                onChange={(e) => setSelectedVoice(e.target.value)}
                                                className="w-full bg-black/40 border border-white/10 rounded-lg px-2 py-1.5 text-[10px] text-slate-300 outline-none focus:border-indigo-500"
                                            >
                                                {voices.map(v => (
                                                    <option key={v.voiceURI} value={v.voiceURI}>{v.name} ({v.lang})</option>
                                                ))}
                                            </select>
                                        </div>
                                        <div>
                                            <div className="flex justify-between items-center mb-2">
                                                <label className="text-[8px] font-bold text-slate-500 uppercase tracking-widest">Pitch</label>
                                                <span className="text-[10px] font-black text-indigo-400">{pitch}</span>
                                            </div>
                                            <input
                                                type="range"
                                                min="0.5"
                                                max="2"
                                                step="0.1"
                                                value={pitch}
                                                onChange={(e) => setPitch(parseFloat(e.target.value))}
                                                className="w-full h-1 bg-white/5 rounded-full appearance-none cursor-pointer accent-indigo-500"
                                            />
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                        <label className="flex items-center gap-2 cursor-pointer group">
                            <div className="relative">
                                <input
                                    type="checkbox"
                                    className="sr-only"
                                    checked={useTTS}
                                    onChange={(e) => setUseTTS(e.target.checked)}
                                />
                                <div className={`block w-10 h-6 rounded-full transition-colors ${useTTS ? 'bg-indigo-600' : 'bg-slate-700'}`}></div>
                                <div className={`dot absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition-transform ${useTTS ? 'transform translate-x-4' : ''}`}></div>
                            </div>
                            <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest group-hover:text-white transition-colors">Voice TTS</span>
                        </label>
                        <button
                            onClick={() => setIsAutoPlaying(!isAutoPlaying)}
                            className={`px-4 py-2 rounded-lg text-[10px] font-black uppercase tracking-widest transition-all ${isAutoPlaying ? 'bg-pink-600 text-white animate-pulse' : 'bg-white/10 text-slate-300 hover:bg-white/20'}`}
                        >
                            {isAutoPlaying ? 'Stop Auto' : 'Auto Play'}
                        </button>
                    </div>
                </div>
            </div>

            {/* Flash Card Area */}
            <div
                onTouchStart={handleTouchStart}
                onTouchEnd={handleTouchEnd}
                className="relative perspective-1000 mb-6 group/nav"
            >
                {/* Navigation Arrows */}
                <button
                    onClick={(e) => { e.stopPropagation(); goToPreviousCard(); }}
                    disabled={currentIndex === 0}
                    className={`absolute left-[-48px] top-1/2 -translate-y-1/2 p-4 rounded-full text-slate-500 hover:text-white hover:bg-white/5 transition-all z-10 ${currentIndex === 0 ? 'opacity-0 cursor-default' : 'opacity-0 group-hover/nav:opacity-100'}`}
                >
                    <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                </button>

                <button
                    onClick={(e) => { e.stopPropagation(); goToNextCard(); }}
                    disabled={currentIndex === cards.length - 1}
                    className={`absolute right-[-48px] top-1/2 -translate-y-1/2 p-4 rounded-full text-slate-500 hover:text-white hover:bg-white/5 transition-all z-10 ${currentIndex === cards.length - 1 ? 'opacity-0 cursor-default' : 'opacity-0 group-hover/nav:opacity-100'}`}
                >
                    <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                </button>

                <div
                    onClick={() => {
                        if (!showConcept && !isBeeping) {
                            setShowConcept(true);
                            speak(currentCard.concept);
                        }
                    }}
                    className={`h-[320px] transition-all duration-500 transform cursor-pointer ${showConcept ? 'scale-105' : 'hover:scale-[1.02] shadow-indigo-500/10'}`}
                >
                    <div className="glass-card p-10 h-full flex flex-col items-center justify-center text-center">
                        <span className="text-indigo-400 font-black text-[10px] uppercase tracking-[0.3em] mb-2">
                            {isBeeping ? 'Wait for it...' : showConcept ? 'The Concept' : 'The Keyword'}
                        </span>

                        <h2 className={`font-bold leading-tight transition-all duration-500 ${showConcept ? 'text-2xl text-slate-300' : 'text-5xl bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 to-pink-500'}`}>
                            {currentCard.keyword}
                        </h2>

                        {showConcept && (
                            <div className="mt-6 pt-6 border-t border-white/5 animate-in fade-in slide-in-from-bottom-4 duration-500">
                                <p className="text-lg text-slate-100 leading-relaxed font-medium">
                                    {currentCard.concept}
                                </p>
                            </div>
                        )}

                        {isBeeping && (
                            <div className="mt-8 flex gap-2">
                                {[...Array(5)].map((_, i) => (
                                    <div key={i} className="w-2 h-2 rounded-full bg-pink-500 animate-bounce" style={{ animationDelay: `${i * 0.1}s` }}></div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Footer Summary, Progress & Actions combined */}
            <div className="fixed bottom-0 left-0 right-0 bg-black/80 backdrop-blur-xl p-4 border-t border-white/10 shadow-2xl flex items-center justify-center z-50">
                <div className="max-w-4xl w-full flex items-center justify-between gap-8 px-6">
                    {/* Progress (Bottom Left) */}
                    <div className="flex items-center gap-4 flex-1">
                        <div className="min-w-[40px]">
                            <p className="text-[10px] font-black text-indigo-400">
                                {currentIndex + 1} <span className="text-slate-600 text-[8px]">/ {cards.length}</span>
                            </p>
                        </div>
                        <div className="h-1.5 bg-white/5 rounded-full overflow-hidden flex-1 max-w-[150px]">
                            <div
                                className="h-full bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 transition-all duration-700 ease-out"
                                style={{ width: `${progress}%` }}
                            />
                        </div>
                    </div>

                    {/* Combined Actions (Bottom Right) */}
                    <div className="flex items-center gap-4">
                        <button
                            onClick={() => handleMark(false)}
                            disabled={hasMarkedCurrent}
                            className={`group flex items-center gap-3 px-5 py-2.5 rounded-2xl transition-all transform ${hasMarkedCurrent ? 'opacity-50 grayscale cursor-not-allowed' : 'bg-rose-500/10 border border-rose-500/30 text-rose-500 hover:bg-rose-500 hover:text-white hover:scale-105 shadow-lg shadow-rose-500/10'}`}
                        >
                            <div className="w-6 h-6 rounded-full flex items-center justify-center bg-rose-500/20 group-hover:bg-white/20">
                                <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01" />
                                </svg>
                            </div>
                            <div className="text-left">
                                <p className="text-[8px] font-black uppercase tracking-widest opacity-70">To review</p>
                                <p className="text-lg font-black leading-none">{crosses}</p>
                            </div>
                        </button>

                        <button
                            onClick={() => handleMark(true)}
                            disabled={hasMarkedCurrent}
                            className={`group flex items-center gap-3 px-5 py-2.5 rounded-2xl transition-all transform ${hasMarkedCurrent ? 'opacity-50 grayscale cursor-not-allowed' : 'bg-emerald-500/10 border border-emerald-500/30 text-emerald-500 hover:bg-emerald-500 hover:text-white hover:scale-105 shadow-lg shadow-emerald-500/10'}`}
                        >
                            <div className="w-6 h-6 rounded-full flex items-center justify-center bg-emerald-500/20 group-hover:bg-white/20">
                                <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                                </svg>
                            </div>
                            <div className="text-left">
                                <p className="text-[8px] font-black uppercase tracking-widest opacity-70">Mastered</p>
                                <p className="text-lg font-black leading-none">{ticks}</p>
                            </div>
                        </button>

                        {!isAutoPlaying && (
                            <button
                                onClick={goToNextCard}
                                className="bg-indigo-600 hover:bg-indigo-500 text-white px-6 py-3 rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] transition-all hover:scale-105 shadow-xl shadow-indigo-500/30 flex items-center gap-2 group"
                            >
                                {currentIndex < cards.length - 1 ? 'Next Card' : 'Finish'}
                                <svg className="w-3 h-3 transform transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M9 5l7 7-7 7" />
                                </svg>
                            </button>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
