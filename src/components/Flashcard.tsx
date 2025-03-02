
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export interface Word {
  id: string;
  word: string;
  definition: string;
  examples: string[];
  image: string;
}

interface FlashcardProps {
  word: Word;
}

export const Flashcard = ({ word }: FlashcardProps) => {
  const [isFlipped, setIsFlipped] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);

  useEffect(() => {
    // Log component mounting for debugging in Capacitor
    console.log("Flashcard component mounted with word:", word.word);
    
    // Prefetch the image to check if it's accessible
    const img = new Image();
    img.src = word.image;
    img.onload = () => {
      console.log(`Image for ${word.word} loaded successfully`);
      setImageLoaded(true);
      setImageError(false);
    };
    img.onerror = (e) => {
      console.error(`Error loading image for ${word.word}:`, e);
      setImageError(true);
    };

    return () => {
      // Clean up
      img.onload = null;
      img.onerror = null;
    };
  }, [word]);

  const handleFlip = () => {
    console.log(`Flipping card for: ${word.word}`);
    setIsFlipped(!isFlipped);
  };

  // Placeholder image in case the original image fails to load
  const fallbackImage = "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80";

  return (
    <div className="w-full max-w-md mx-auto h-[400px] relative">
      <div
        className="w-full h-full cursor-pointer perspective-1000"
        onClick={handleFlip}
      >
        <div
          className={`relative w-full h-full transition-all duration-500 transform-style-3d ${
            isFlipped ? "rotate-y-180" : ""
          }`}
        >
          {/* Front of card */}
          <div className="absolute w-full h-full backface-hidden bg-white rounded-xl shadow-lg p-6 flex flex-col items-center justify-center gap-4">
            <span className="text-sm font-medium text-primary/80">tap to flip</span>
            <h2 className="text-3xl font-bold text-gray-800 mb-4">{word.word}</h2>
            <p className="text-lg text-gray-600 text-center mb-4">{word.definition}</p>
            <div className="space-y-2 w-full">
              {word.examples.map((example, idx) => (
                <p
                  key={idx}
                  className="text-sm text-gray-500 italic bg-gray-50 p-3 rounded-lg break-words"
                >
                  "{example}"
                </p>
              ))}
            </div>
          </div>
          
          {/* Back of card */}
          <div className="absolute w-full h-full backface-hidden bg-white rounded-xl shadow-lg rotate-y-180 overflow-hidden">
            {/* Only render the visible image */}
            <img
              src={imageError ? fallbackImage : word.image}
              alt={word.word}
              className="w-full h-full object-cover"
              onLoad={() => {
                console.log(`Visible image for ${word.word} loaded successfully`);
                setImageLoaded(true);
              }}
              onError={(e) => {
                console.error(`Error loading visible image for ${word.word}`);
                e.currentTarget.src = fallbackImage;
                setImageError(true);
              }}
            />
            
            <div className="absolute inset-0 bg-black/20 flex items-end p-6">
              <p className="text-white text-xl font-semibold">{word.word}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
