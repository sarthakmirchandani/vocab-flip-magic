
import { useEffect } from "react";
import { FlashcardList } from "@/components/FlashcardList";
import { useToast } from "@/hooks/use-toast";
import { Word } from "@/components/Flashcard";

// Sample data - In a real app, this would come from an API
const sampleWords: Word[] = [
  {
    id: "1",
    word: "Serendipity",
    definition: "The occurrence and development of events by chance in a happy or beneficial way",
    examples: [
      "Finding my dream job while helping a friend with their resume was pure serendipity",
      "The serendipitous discovery of penicillin changed medical history"
    ],
    image: "https://images.unsplash.com/photo-1533227268428-f9ed0900fb3b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2071&q=80"
  },
  {
    id: "2",
    word: "Ephemeral",
    definition: "Lasting for a very short time",
    examples: [
      "The ephemeral beauty of a rainbow after the storm",
      "Social media posts are often ephemeral, disappearing after 24 hours"
    ],
    image: "https://images.unsplash.com/photo-1568127335414-de4b3363e13e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
  },
  {
    id: "3",
    word: "Luminescent",
    definition: "Emitting light by a process that does not derive energy from the temperature of the emitting body",
    examples: [
      "The luminescent jellyfish glowed in the dark ocean depths",
      "The northern lights created a luminescent display in the night sky"
    ],
    image: "https://images.unsplash.com/photo-1483347756197-71ef80e95f73?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
  }
];

const Index = () => {
  const { toast } = useToast();

  useEffect(() => {
    // Simulate daily notification
    const timer = setTimeout(() => {
      toast({
        title: "Word of the Day",
        description: "Learn 'Serendipity' - tap to explore its meaning!",
        duration: 5000,
      });
    }, 2000);

    return () => clearTimeout(timer);
  }, [toast]);

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm">
        <div className="container py-6">
          <h1 className="text-3xl font-bold text-gray-800">Vocab Flip Magic</h1>
          <p className="text-gray-600 mt-2">Expand your vocabulary with interactive flashcards</p>
        </div>
      </header>
      <main>
        <FlashcardList words={sampleWords} />
      </main>
    </div>
  );
};

export default Index;
