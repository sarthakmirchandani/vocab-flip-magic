
import React from 'react';
import { Button } from '@/components/ui/button';
import { ListChecks } from 'lucide-react';
import { useQuiz } from '@/contexts/QuizContext';
import { Word } from '@/components/Flashcard';

interface QuizButtonProps {
  words: Word[];
  level: string;
}

export const QuizButton = ({ words, level }: QuizButtonProps) => {
  const { startQuiz, quizActive } = useQuiz();

  const handleStartQuiz = () => {
    startQuiz(words, level);
  };

  return (
    <div className="flex justify-center my-6">
      <Button 
        onClick={handleStartQuiz}
        disabled={quizActive}
        className="flex items-center"
      >
        <ListChecks className="mr-2 h-5 w-5" />
        Take Quiz
      </Button>
    </div>
  );
};
