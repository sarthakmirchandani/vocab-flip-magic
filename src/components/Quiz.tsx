import React, { useState } from 'react';
import { useQuiz, QuizQuestion } from '@/contexts/QuizContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle, XCircle, Edit2, Save, ArrowRight } from 'lucide-react';

export const Quiz = () => {
  const { 
    questions, 
    currentQuestion, 
    score, 
    quizActive, 
    quizCompleted, 
    answerQuestion, 
    nextQuestion, 
    resetQuiz,
    editQuizOptions
  } = useQuiz();

  const [editing, setEditing] = useState(false);
  const [editedOptions, setEditedOptions] = useState<string[]>([]);

  const handleAnswer = (answer: string) => {
    answerQuestion(answer);
  };

  const startEditing = () => {
    setEditedOptions([...questions[currentQuestion].options]);
    setEditing(true);
  };

  const saveEdits = () => {
    editQuizOptions(currentQuestion, editedOptions);
    setEditing(false);
  };

  const updateOption = (index: number, value: string) => {
    const newOptions = [...editedOptions];
    newOptions[index] = value;
    setEditedOptions(newOptions);
  };

  if (!quizActive) {
    return null;
  }

  if (quizCompleted) {
    return (
      <Card className="w-full max-w-3xl mx-auto mt-8">
        <CardHeader>
          <CardTitle className="text-center">Quiz Results</CardTitle>
        </CardHeader>
        <CardContent className="text-center">
          <p className="text-2xl font-bold mb-4">
            You scored {score} out of {questions.length}!
          </p>
          <div className="grid gap-4 mt-4">
            {questions.map((q, index) => (
              <div key={index} className="flex items-center gap-2 p-3 rounded-md border">
                <div className={q.userAnswer === q.correctAnswer ? "text-green-500" : "text-red-500"}>
                  {q.userAnswer === q.correctAnswer ? <CheckCircle /> : <XCircle />}
                </div>
                <div className="ml-2">
                  <p className="font-semibold">{q.word.word}</p>
                  <p className="text-sm text-muted-foreground">
                    {q.userAnswer === q.correctAnswer 
                      ? "Correct!" 
                      : `You answered: "${q.userAnswer || 'No answer'}" — Correct answer: "${q.correctAnswer}"`}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
        <CardFooter className="flex justify-center">
          <Button onClick={resetQuiz}>Finish</Button>
        </CardFooter>
      </Card>
    );
  }

  const currentQ = questions[currentQuestion];
  const hasAnswered = currentQ.userAnswer !== undefined;

  return (
    <Card className="w-full max-w-3xl mx-auto mt-8">
      <CardHeader>
        <div className="flex justify-between items-center">
          <CardTitle>Question {currentQuestion + 1} of {questions.length}</CardTitle>
          <div className="text-sm">Score: {score}</div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="mb-6">
          <h3 className="text-xl font-bold mb-2">
            What does "{currentQ.word.word}" mean?
          </h3>
          {editing ? (
            <div className="space-y-2 mt-4">
              {editedOptions.map((option, idx) => (
                <div key={idx} className="flex gap-2">
                  <Input 
                    value={option} 
                    onChange={(e) => updateOption(idx, e.target.value)} 
                    className="flex-1"
                  />
                </div>
              ))}
              <div className="flex justify-end mt-4">
                <Button onClick={saveEdits} className="flex items-center">
                  <Save className="mr-2 h-4 w-4" />
                  Save Options
                </Button>
              </div>
            </div>
          ) : (
            <div className="space-y-2 mt-4">
              {currentQ.options.map((option, idx) => (
                <div key={idx}>
                  <Button
                    variant={
                      hasAnswered
                        ? option === currentQ.correctAnswer
                          ? "default"
                          : option === currentQ.userAnswer
                            ? "destructive"
                            : "outline"
                        : "outline"
                    }
                    className={`w-full justify-start text-left p-4 h-auto break-words whitespace-normal overflow-hidden max-w-full flex items-center ${
                      hasAnswered && option === currentQ.correctAnswer ? "bg-green-500 hover:bg-green-600" : ""
                    }`}
                    onClick={() => !hasAnswered && handleAnswer(option)}
                    disabled={hasAnswered}
                    style={{ wordBreak: 'break-word' }}
                  >
                    <div className="flex-grow mr-2 overflow-wrap-anywhere">{option}</div>
                    {hasAnswered && option === currentQ.correctAnswer && (
                      <CheckCircle className="ml-auto h-5 w-5 flex-shrink-0" />
                    )}
                    {hasAnswered && option === currentQ.userAnswer && option !== currentQ.correctAnswer && (
                      <XCircle className="ml-auto h-5 w-5 flex-shrink-0" />
                    )}
                  </Button>
                </div>
              ))}
              {hasAnswered && (
                <div className="flex justify-between mt-4">
                  <Button onClick={startEditing} variant="outline">
                    <Edit2 className="mr-2 h-4 w-4" />
                    Edit Options
                  </Button>
                  <Button onClick={nextQuestion} className="flex items-center">
                    {currentQuestion < questions.length - 1 ? (
                      <>Next<ArrowRight className="ml-2 h-4 w-4" /></>
                    ) : (
                      "See Results"
                    )}
                  </Button>
                </div>
              )}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};
