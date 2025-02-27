
import { useState, useEffect } from "react";
import { FlashcardList } from "@/components/FlashcardList";
import { useToast } from "@/hooks/use-toast";
import { Word } from "@/components/Flashcard";
import { Button } from "@/components/ui/button";
import { getWordsByLevel } from "@/data/academicWords";

const Index = () => {
  const { toast } = useToast();
  const [currentLevel, setCurrentLevel] = useState<string>("beginner");
  const [displayedWords, setDisplayedWords] = useState<Word[]>(getWordsByLevel("beginner"));

  useEffect(() => {
    // Simulate daily notification
    const timer = setTimeout(() => {
      toast({
        title: "Word of the Day",
        description: "Learn 'Analyze' - tap to explore its meaning!",
        duration: 5000,
      });
    }, 2000);

    return () => clearTimeout(timer);
  }, [toast]);

  const handleLevelChange = (level: string) => {
    setCurrentLevel(level);
    setDisplayedWords(getWordsByLevel(level));
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm">
        <div className="container py-6">
          <h1 className="text-3xl font-bold text-gray-800">Vocab Flip Magic</h1>
          <p className="text-gray-600 mt-2">Expand your vocabulary with interactive flashcards</p>
          
          <div className="flex gap-2 mt-4">
            <Button 
              variant={currentLevel === "beginner" ? "default" : "outline"}
              onClick={() => handleLevelChange("beginner")}
              className="rounded-full"
            >
              Beginner
            </Button>
            <Button 
              variant={currentLevel === "intermediate" ? "default" : "outline"}
              onClick={() => handleLevelChange("intermediate")}
              className="rounded-full"
            >
              Intermediate
            </Button>
            <Button 
              variant={currentLevel === "advanced" ? "default" : "outline"}
              onClick={() => handleLevelChange("advanced")}
              className="rounded-full"
            >
              Advanced
            </Button>
          </div>
        </div>
      </header>
      <main>
        <FlashcardList words={displayedWords} />
      </main>
    </div>
  );
};

export default Index;
