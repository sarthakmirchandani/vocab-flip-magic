
import { useState, useEffect } from "react";
import { FlashcardList } from "@/components/FlashcardList";
import { useToast } from "@/hooks/use-toast";
import { Word } from "@/components/Flashcard";
import { Button } from "@/components/ui/button";

// Academic words categorized by difficulty level
const academicWords: { [key: string]: Word[] } = {
  "beginner": [
    {
      id: "b1",
      word: "Analyze",
      definition: "To examine methodically by separating into parts and studying their interrelations",
      examples: [
        "The scientists will analyze the data from the experiment.",
        "Students are expected to analyze the poem and discuss its themes."
      ],
      image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
    },
    {
      id: "b2",
      word: "Concept",
      definition: "An abstract idea generalized from particular instances",
      examples: [
        "The concept of justice varies across different cultures.",
        "This new teaching method is based on the concept of experiential learning."
      ],
      image: "https://images.unsplash.com/photo-1580894732444-8ecded7900cd?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
    },
    {
      id: "b3",
      word: "Define",
      definition: "To state the precise meaning of a word, phrase, or term",
      examples: [
        "Please define the term 'democracy' in your own words.",
        "The researcher had to define the parameters of the study."
      ],
      image: "https://images.unsplash.com/photo-1577563908411-5077b6dc7624?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
    },
    {
      id: "b4",
      word: "Evidence",
      definition: "Information indicating whether a belief or proposition is true or valid",
      examples: [
        "The prosecution presented compelling evidence of the defendant's guilt.",
        "Scientists gather evidence through careful observation and experimentation."
      ],
      image: "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
    },
    {
      id: "b5",
      word: "Factor",
      definition: "A circumstance, fact, or influence that contributes to a result",
      examples: [
        "Economic factors played a significant role in the election results.",
        "Stress is a major factor in many health problems."
      ],
      image: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
    },
    {
      id: "b6",
      word: "Method",
      definition: "A particular procedure for accomplishing or approaching something",
      examples: [
        "The teacher used an interactive method to engage the students.",
        "The scientific method involves observation, hypothesis, experimentation, and conclusion."
      ],
      image: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
    },
    {
      id: "b7",
      word: "Principle",
      definition: "A fundamental truth or proposition that serves as the foundation for a system of belief or chain of reasoning",
      examples: [
        "The principle of democracy is based on equal rights and freedoms.",
        "The company operates on the principle that customer satisfaction comes first."
      ],
      image: "https://images.unsplash.com/photo-1615827157389-991d5b156c37?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
    },
    {
      id: "b8",
      word: "Process",
      definition: "A series of actions or steps taken to achieve a particular end",
      examples: [
        "The process of photosynthesis converts light energy into chemical energy.",
        "Writing a research paper is a complex process that involves multiple stages."
      ],
      image: "https://images.unsplash.com/photo-1576153192396-180ecef2a715?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2074&q=80"
    },
    {
      id: "b9",
      word: "Research",
      definition: "The systematic investigation into and study of materials and sources in order to establish facts and reach new conclusions",
      examples: [
        "The professor has published extensive research on climate change.",
        "Students are encouraged to do their own research before writing essays."
      ],
      image: "https://images.unsplash.com/photo-1532094349884-543bc11b234d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
    },
    {
      id: "b10",
      word: "Theory",
      definition: "A supposition or a system of ideas intended to explain something, especially one based on general principles independent of the facts",
      examples: [
        "Darwin's theory of evolution explains the diversity of species.",
        "The teacher explained the theory behind the mathematical formula."
      ],
      image: "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
    }
  ],
  "intermediate": [
    {
      id: "i1",
      word: "Ambiguous",
      definition: "Open to more than one interpretation; having a double meaning",
      examples: [
        "The conclusion of the novel was deliberately ambiguous.",
        "The politician's ambiguous statement left reporters confused."
      ],
      image: "https://images.unsplash.com/photo-1560780552-ba54683cb263?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
    },
    {
      id: "i2",
      word: "Coherent",
      definition: "Logically and aesthetically consistent; forming a unified whole",
      examples: [
        "The essay was well-researched but lacked a coherent argument.",
        "After the accident, he had trouble forming coherent sentences."
      ],
      image: "https://images.unsplash.com/photo-1493612276216-ee3925520721?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2064&q=80"
    },
    {
      id: "i3",
      word: "Empirical",
      definition: "Based on, concerned with, or verifiable by observation or experience rather than theory or pure logic",
      examples: [
        "The study provided empirical evidence supporting the new treatment.",
        "Science relies on empirical data gathered through experimentation."
      ],
      image: "https://images.unsplash.com/photo-1581093196277-9f1725e520f8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
    },
    {
      id: "i4",
      word: "Hypothesis",
      definition: "A proposed explanation for a phenomenon, based on limited evidence, as a starting point for further investigation",
      examples: [
        "The scientist developed a hypothesis about the cause of the disease.",
        "Their hypothesis was supported by the experimental results."
      ],
      image: "https://images.unsplash.com/photo-1633613286991-611fe299c4be?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
    },
    {
      id: "i5",
      word: "Paradigm",
      definition: "A typical example or pattern of something; a model",
      examples: [
        "The discovery led to a paradigm shift in our understanding of physics.",
        "This new technology represents a paradigm of modern engineering."
      ],
      image: "https://images.unsplash.com/photo-1549732420-cfdcce887904?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
    },
    {
      id: "i6",
      word: "Phenomenon",
      definition: "A fact or situation that is observed to exist or happen, especially one whose cause or explanation is in question",
      examples: [
        "Scientists study the phenomenon of bioluminescence in deep-sea creatures.",
        "Social media addiction is a relatively new phenomenon."
      ],
      image: "https://images.unsplash.com/photo-1534447677768-be436bb09401?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2071&q=80"
    },
    {
      id: "i7",
      word: "Rationalize",
      definition: "To attempt to explain or justify behavior or an attitude with logical reasons, even if these are not appropriate",
      examples: [
        "He tried to rationalize his poor performance by blaming his tools.",
        "People often rationalize their prejudices with false claims."
      ],
      image: "https://images.unsplash.com/photo-1504639725590-34d0984388bd?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2074&q=80"
    },
    {
      id: "i8",
      word: "Subsequent",
      definition: "Coming after something in time; following",
      examples: [
        "The initial experiment failed, but subsequent attempts were successful.",
        "Her subsequent novels never achieved the fame of her first book."
      ],
      image: "https://images.unsplash.com/photo-1506784983877-45594efa4cbe?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2068&q=80"
    },
    {
      id: "i9",
      word: "Synthesis",
      definition: "The combination of ideas to form a theory or system",
      examples: [
        "Her paper offered a synthesis of several competing theories.",
        "The synthesis of different research findings led to a breakthrough."
      ],
      image: "https://images.unsplash.com/photo-1544383835-bda2bc66a55d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2021&q=80"
    },
    {
      id: "i10",
      word: "Valid",
      definition: "Having a sound basis in logic or fact; reasonable or cogent",
      examples: [
        "The researcher's conclusions are valid only within certain parameters.",
        "She made a valid point about the flaws in the study's methodology."
      ],
      image: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
    }
  ],
  "advanced": [
    {
      id: "a1",
      word: "Ameliorate",
      definition: "To make something bad or unsatisfactory better",
      examples: [
        "The new policies are designed to ameliorate poverty in urban areas.",
        "Various treatments can ameliorate the symptoms, though there is no cure."
      ],
      image: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
    },
    {
      id: "a2",
      word: "Corroborate",
      definition: "To confirm or give support to a statement, theory, or finding",
      examples: [
        "The new evidence corroborates the witness's account of events.",
        "Multiple studies corroborate the link between smoking and lung cancer."
      ],
      image: "https://images.unsplash.com/photo-1521791136064-7986c2920216?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2069&q=80"
    },
    {
      id: "a3",
      word: "Dichotomy",
      definition: "A division or contrast between two things that are represented as being opposed or entirely different",
      examples: [
        "There is a false dichotomy between economic growth and environmental protection.",
        "The researcher challenged the traditional dichotomy between nature and nurture."
      ],
      image: "https://images.unsplash.com/photo-1605106702734-205df224ecce?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
    },
    {
      id: "a4",
      word: "Epistemology",
      definition: "The theory of knowledge, especially with regard to its methods, validity, and scope",
      examples: [
        "Kant's work revolutionized epistemology in Western philosophy.",
        "The course explores epistemology and the nature of scientific inquiry."
      ],
      image: "https://images.unsplash.com/photo-1457369804613-52c61a468e7d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
    },
    {
      id: "a5",
      word: "Exacerbate",
      definition: "To make a problem, bad situation, or negative feeling worse",
      examples: [
        "The drought has exacerbated food shortages in the region.",
        "Poor communication can exacerbate conflicts in the workplace."
      ],
      image: "https://images.unsplash.com/photo-1500964757637-c85e8a162699?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2103&q=80"
    },
    {
      id: "a6",
      word: "Hegemony",
      definition: "Leadership or dominance, especially by one country or social group over others",
      examples: [
        "The country's economic hegemony in the region is being challenged.",
        "Cultural hegemony can influence societal norms and values."
      ],
      image: "https://images.unsplash.com/photo-1569025690938-a00729c9e1f9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
    },
    {
      id: "a7",
      word: "Juxtaposition",
      definition: "The fact of two things being seen or placed close together with contrasting effect",
      examples: [
        "The juxtaposition of ancient ruins against modern skyscrapers created a striking image.",
        "The author uses juxtaposition to highlight the characters' different perspectives."
      ],
      image: "https://images.unsplash.com/photo-1534008897995-27a23e859048?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
    },
    {
      id: "a8",
      word: "Paradoxical",
      definition: "Seemingly absurd or contradictory, yet possibly true",
      examples: [
        "It's paradoxical that reducing sleep can sometimes reduce fatigue.",
        "The paradoxical nature of quantum physics challenges our intuitive understanding of reality."
      ],
      image: "https://images.unsplash.com/photo-1626266962067-9db7284a5c12?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
    },
    {
      id: "a9",
      word: "Ubiquitous",
      definition: "Present, appearing, or found everywhere",
      examples: [
        "Smartphones have become ubiquitous in modern society.",
        "Plastic pollution is now ubiquitous in the world's oceans."
      ],
      image: "https://images.unsplash.com/photo-1518020382113-a7e8fc38eac9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2017&q=80"
    },
    {
      id: "a10",
      word: "Verisimilitude",
      definition: "The appearance of being true or real",
      examples: [
        "The novel achieves verisimilitude through detailed descriptions of the city.",
        "Good historical fiction requires verisimilitude in its portrayal of the past."
      ],
      image: "https://images.unsplash.com/photo-1603190287605-e6ade32fa852?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
    }
  ]
};

// The list can be expanded with more words to reach 100 total. This is a starting point with 30 words.

const Index = () => {
  const { toast } = useToast();
  const [currentLevel, setCurrentLevel] = useState<string>("beginner");
  const [displayedWords, setDisplayedWords] = useState<Word[]>(academicWords.beginner);

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
    setDisplayedWords(academicWords[level]);
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
