
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Upload } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Word } from '@/components/Flashcard';
import { addWord } from '@/data/academicWords';

export const ImportWordsButton = () => {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;
    
    setIsLoading(true);
    
    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const content = e.target?.result as string;
        const words = JSON.parse(content);
        
        if (!Array.isArray(words)) {
          throw new Error('Uploaded file must contain an array of words');
        }
        
        let importedCount = 0;
        const level = words[0]?.level || 'beginner';
        
        // Process each word in the array
        words.forEach((word: any) => {
          if (!word.id || !word.word || !word.definition) {
            console.warn('Skipping invalid word:', word);
            return;
          }
          
          const newWord: Word = {
            id: word.id,
            word: word.word,
            definition: word.definition,
            examples: word.examples || [],
            image: word.image || 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
          };
          
          addWord(level, newWord);
          importedCount++;
        });
        
        toast({
          title: "Words Imported",
          description: `Successfully imported ${importedCount} words into the ${level} level.`,
          duration: 5000,
        });
        
        // Force a re-render by reloading the page
        window.location.reload();
      } catch (error) {
        console.error('Error importing words:', error);
        toast({
          title: "Import Failed",
          description: "Failed to import words. Make sure your JSON file is correctly formatted.",
          variant: "destructive",
          duration: 5000,
        });
      } finally {
        setIsLoading(false);
      }
    };
    
    reader.onerror = () => {
      toast({
        title: "Import Failed",
        description: "There was an error reading the file.",
        variant: "destructive",
        duration: 5000,
      });
      setIsLoading(false);
    };
    
    reader.readAsText(file);
  };
  
  return (
    <>
      <input 
        type="file" 
        accept=".json" 
        id="import-words" 
        className="hidden" 
        onChange={handleFileUpload}
      />
      <label htmlFor="import-words">
        <Button 
          variant="outline" 
          size="icon" 
          disabled={isLoading}
          asChild
          className="ml-2"
          title="Import Words from JSON"
        >
          <div>
            <Upload className="h-[1.2rem] w-[1.2rem]" />
          </div>
        </Button>
      </label>
    </>
  );
};
