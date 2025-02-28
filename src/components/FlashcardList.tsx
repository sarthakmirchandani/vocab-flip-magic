
import { motion } from "framer-motion";
import { Flashcard, Word } from "./Flashcard";

interface FlashcardListProps {
  words: Word[];
}

export const FlashcardList = ({ words }: FlashcardListProps) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="container py-8 grid gap-12 md:grid-cols-2 lg:grid-cols-3"
    >
      {words.map((word) => (
        <motion.div
          key={word.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <Flashcard word={word} />
        </motion.div>
      ))}
    </motion.div>
  );
};
