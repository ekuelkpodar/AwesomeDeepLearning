import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { UserProgress } from '../types';

interface ProgressContextType {
  progress: UserProgress;
  markAsLearned: (architectureId: string) => void;
  toggleBookmark: (architectureId: string) => void;
  addNote: (architectureId: string, note: string) => void;
  addTimeSpent: (architectureId: string, minutes: number) => void;
  saveQuizScore: (architectureId: string, score: number) => void;
}

const ProgressContext = createContext<ProgressContextType | undefined>(undefined);

const STORAGE_KEY = 'ai-learning-progress';

const defaultProgress: UserProgress = {
  learnedArchitectures: [],
  bookmarkedArchitectures: [],
  notes: {},
  timeSpent: {},
  quizScores: {},
};

export const ProgressProvider = ({ children }: { children: ReactNode }) => {
  const [progress, setProgress] = useState<UserProgress>(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : defaultProgress;
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
  }, [progress]);

  const markAsLearned = (architectureId: string) => {
    setProgress(prev => ({
      ...prev,
      learnedArchitectures: prev.learnedArchitectures.includes(architectureId)
        ? prev.learnedArchitectures.filter(id => id !== architectureId)
        : [...prev.learnedArchitectures, architectureId],
    }));
  };

  const toggleBookmark = (architectureId: string) => {
    setProgress(prev => ({
      ...prev,
      bookmarkedArchitectures: prev.bookmarkedArchitectures.includes(architectureId)
        ? prev.bookmarkedArchitectures.filter(id => id !== architectureId)
        : [...prev.bookmarkedArchitectures, architectureId],
    }));
  };

  const addNote = (architectureId: string, note: string) => {
    setProgress(prev => ({
      ...prev,
      notes: { ...prev.notes, [architectureId]: note },
    }));
  };

  const addTimeSpent = (architectureId: string, minutes: number) => {
    setProgress(prev => ({
      ...prev,
      timeSpent: {
        ...prev.timeSpent,
        [architectureId]: (prev.timeSpent[architectureId] || 0) + minutes,
      },
    }));
  };

  const saveQuizScore = (architectureId: string, score: number) => {
    setProgress(prev => ({
      ...prev,
      quizScores: { ...prev.quizScores, [architectureId]: score },
    }));
  };

  return (
    <ProgressContext.Provider
      value={{
        progress,
        markAsLearned,
        toggleBookmark,
        addNote,
        addTimeSpent,
        saveQuizScore,
      }}
    >
      {children}
    </ProgressContext.Provider>
  );
};

export const useProgress = () => {
  const context = useContext(ProgressContext);
  if (!context) {
    throw new Error('useProgress must be used within ProgressProvider');
  }
  return context;
};
