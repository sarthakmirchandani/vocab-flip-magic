
import { useState } from "react";
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

  const handleFlip = () => {
    setIsFlipped(!isFlipped);
  };

  return (
    <div
      className="w-full max-w-md aspect-[3/4] perspective-1000 cursor-pointer mx-auto"
      onClick={handleFlip}
    >
      <div
        className={`relative w-full h-full transition-transform duration-500 transform-style-3d ${
          isFlipped ? "rotate-y-180" : ""
        }`}
      >
        <AnimatePresence mode="wait">
          {!isFlipped ? (
            <motion.div
              key="front"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 backface-hidden bg-white rounded-xl shadow-lg p-6 flex flex-col items-center justify-center gap-4"
            >
              <span className="text-sm font-medium text-primary/80">tap to flip</span>
              <h2 className="text-3xl font-bold text-gray-800 mb-4">{word.word}</h2>
              <p className="text-lg text-gray-600 text-center mb-4">{word.definition}</p>
              <div className="space-y-2 w-full">
                {word.examples.map((example, idx) => (
                  <p
                    key={idx}
                    className="text-sm text-gray-500 italic bg-gray-50 p-3 rounded-lg"
                  >
                    "{example}"
                  </p>
                ))}
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="back"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 backface-hidden bg-white rounded-xl shadow-lg rotate-y-180 overflow-hidden"
            >
              <img
                src={word.image}
                alt={word.word}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black/20 flex items-end p-6">
                <p className="text-white text-xl font-semibold">{word.word}</p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};
