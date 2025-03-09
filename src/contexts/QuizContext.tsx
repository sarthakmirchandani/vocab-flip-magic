
import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Word } from '@/components/Flashcard';

export interface QuizQuestion {
  word: Word;
  options: string[];
  correctAnswer: string;
  userAnswer?: string;
}

interface QuizContextType {
  questions: QuizQuestion[];
  currentQuestion: number;
  score: number;
  quizActive: boolean;
  quizCompleted: boolean;
  startQuiz: (words: Word[], level: string) => void;
  answerQuestion: (answer: string) => void;
  nextQuestion: () => void;
  resetQuiz: () => void;
  editQuizOptions: (questionIndex: number, options: string[]) => void;
}

const QuizContext = createContext<QuizContextType | undefined>(undefined);

export const useQuiz = () => {
  const context = useContext(QuizContext);
  if (context === undefined) {
    throw new Error('useQuiz must be used within a QuizProvider');
  }
  return context;
};

export const QuizProvider = ({ children }: { children: ReactNode }) => {
  const [questions, setQuestions] = useState<QuizQuestion[]>([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [quizActive, setQuizActive] = useState(false);
  const [quizCompleted, setQuizCompleted] = useState(false);

  const generateRandomOptions = (correctDefinition: string, allWords: Word[]): string[] => {
    // Filter out the correct answer to avoid duplicates
    const otherWords = allWords.filter(word => word.definition !== correctDefinition);
    
    // Shuffle and take 3 random definitions
    const shuffled = [...otherWords].sort(() => 0.5 - Math.random());
    const wrongOptions = shuffled.slice(0, 3).map(word => word.definition);
    
    // Combine with correct answer and shuffle again
    return [...wrongOptions, correctDefinition].sort(() => 0.5 - Math.random());
  };

  const startQuiz = (words: Word[], level: string) => {
    // Shuffle and select 5 random words
    const shuffled = [...words].sort(() => 0.5 - Math.random());
    const selectedWords = shuffled.slice(0, 5);
    
    // Create quiz questions
    const newQuestions = selectedWords.map(word => ({
      word,
      options: generateRandomOptions(word.definition, words),
      correctAnswer: word.definition,
    }));
    
    setQuestions(newQuestions);
    setCurrentQuestion(0);
    setScore(0);
    setQuizActive(true);
    setQuizCompleted(false);
  };

  const answerQuestion = (answer: string) => {
    // Update the current question with user's answer
    const updatedQuestions = [...questions];
    updatedQuestions[currentQuestion] = {
      ...updatedQuestions[currentQuestion],
      userAnswer: answer,
    };

    // Update score if answer is correct
    if (answer === questions[currentQuestion].correctAnswer) {
      setScore(prevScore => prevScore + 1);
    }

    setQuestions(updatedQuestions);
  };

  const nextQuestion = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(prev => prev + 1);
    } else {
      setQuizCompleted(true);
    }
  };

  const resetQuiz = () => {
    setQuizActive(false);
    setQuizCompleted(false);
    setQuestions([]);
    setCurrentQuestion(0);
    setScore(0);
  };

  const editQuizOptions = (questionIndex: number, options: string[]) => {
    if (questionIndex >= 0 && questionIndex < questions.length) {
      const updatedQuestions = [...questions];
      updatedQuestions[questionIndex] = {
        ...updatedQuestions[questionIndex],
        options,
      };
      setQuestions(updatedQuestions);
    }
  };

  return (
    <QuizContext.Provider
      value={{
        questions,
        currentQuestion,
        score,
        quizActive,
        quizCompleted,
        startQuiz,
        answerQuestion,
        nextQuestion,
        resetQuiz,
        editQuizOptions,
      }}
    >
      {children}
    </QuizContext.Provider>
  );
};
