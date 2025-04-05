
import { useState } from 'react';
import { FlashcardList } from '@/components/FlashcardList';
import { getWordsByLevel } from '@/data/academicWords';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Bell } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useWordNotifications } from '@/hooks/useWordNotifications';
import { QuizProvider } from '@/contexts/QuizContext';
import { Quiz } from '@/components/Quiz';
import { QuizButton } from '@/components/QuizButton';
import { ImportWordsButton } from '@/components/ImportWordsButton';

const Index = () => {
  const [level, setLevel] = useState('beginner');
  const { toast } = useToast();
  const { sendTestNotification } = useWordNotifications();
  
  const handleTestNotification = async () => {
    try {
      const result = await sendTestNotification();
      
      toast({
        title: "Notification Sent",
        description: `Word of the day: "${result.word.word}" - Next notification at ${result.nextNotification.toLocaleTimeString()}`,
        duration: 5000,
      });
    } catch (error) {
      toast({
        title: "Notification Error",
        description: "Failed to send notification. Check permissions.",
        variant: "destructive",
        duration: 5000,
      });
    }
  };
  
  return (
    <QuizProvider>
      <div className="container mx-auto p-4 max-w-4xl">
        <header className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-gray-800">WordPill</h1>
          <div className="flex items-center">
            <Button 
              variant="outline" 
              size="icon"
              onClick={handleTestNotification}
              title="Test Daily Word Notification"
            >
              <Bell className="h-[1.2rem] w-[1.2rem]" />
            </Button>
            <ImportWordsButton />
          </div>
        </header>
        
        <Tabs defaultValue="beginner" className="mb-8" onValueChange={setLevel}>
          <TabsList className="w-full grid grid-cols-3">
            <TabsTrigger value="beginner">Beginner</TabsTrigger>
            <TabsTrigger value="intermediate">Intermediate</TabsTrigger>
            <TabsTrigger value="advanced">Advanced</TabsTrigger>
          </TabsList>
          
          <TabsContent value="beginner">
            <FlashcardList words={getWordsByLevel('beginner')} />
            <QuizButton words={getWordsByLevel('beginner')} level="beginner" />
          </TabsContent>
          
          <TabsContent value="intermediate">
            <FlashcardList words={getWordsByLevel('intermediate')} />
            <QuizButton words={getWordsByLevel('intermediate')} level="intermediate" />
          </TabsContent>
          
          <TabsContent value="advanced">
            <FlashcardList words={getWordsByLevel('advanced')} />
            <QuizButton words={getWordsByLevel('advanced')} level="advanced" />
          </TabsContent>
        </Tabs>
        
        <Quiz />
      </div>
    </QuizProvider>
  );
};

export default Index;
