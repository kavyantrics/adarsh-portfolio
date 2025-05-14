'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mic, MicOff, VolumeX } from 'lucide-react';

interface Experience {
  title: string;
  company: string;
  period: string;
  description: string;
}

// Add type definitions for Web Speech API
interface SpeechRecognitionEvent extends Event {
  results: {
    [index: number]: {
      [index: number]: {
        transcript: string;
      };
    };
  };
}

interface SpeechRecognition extends EventTarget {
  continuous: boolean;
  interimResults: boolean;
  lang: string;
  onresult: (event: SpeechRecognitionEvent) => void;
  onend: () => void;
  start: () => void;
  stop: () => void;
}

declare global {
  interface Window {
    SpeechRecognition: new () => SpeechRecognition;
    webkitSpeechRecognition: new () => SpeechRecognition;
  }
}

const experiences: Experience[] = [
  {
    title: 'Senior Full Stack Developer',
    company: 'Tech Solutions Inc.',
    period: '2022 - Present',
    description: 'Leading the development of enterprise-level applications using React, Node.js, and cloud technologies.',
  },
  {
    title: 'Full Stack Developer',
    company: 'Digital Innovations',
    period: '2020 - 2022',
    description: 'Developed and maintained multiple web applications using React, TypeScript, and Node.js.',
  },
  {
    title: 'Frontend Developer',
    company: 'Web Creations',
    period: '2018 - 2020',
    description: 'Built responsive and interactive user interfaces using React and modern CSS frameworks.',
  },
];

export default function VoiceAssistant() {
  const [isListening, setIsListening] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [response, setResponse] = useState('');

  useEffect(() => {
    let recognition: SpeechRecognition | null = null;
    let synthesis: SpeechSynthesis | null = null;

    if (typeof window !== 'undefined') {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      if (SpeechRecognition) {
        recognition = new SpeechRecognition();
        recognition.continuous = false;
        recognition.interimResults = false;
        recognition.lang = 'en-US';

        recognition.onresult = (event: SpeechRecognitionEvent) => {
          const transcript = event.results[0][0].transcript.toLowerCase();
          setTranscript(transcript);
          handleVoiceCommand(transcript);
        };

        recognition.onend = () => {
          setIsListening(false);
        };
      }

      synthesis = window.speechSynthesis;
    }

    return () => {
      if (recognition) {
        recognition.stop();
      }
      if (synthesis) {
        synthesis.cancel();
      }
    };
  }, []);

  const handleVoiceCommand = (command: string) => {
    let responseText = '';

    if (command.includes('experience')) {
      responseText = `I have ${experiences.length} years of experience in software development. `;
      experiences.forEach((exp) => {
        responseText += `From ${exp.period}, I worked as a ${exp.title} at ${exp.company}. ${exp.description} `;
      });
    } else if (command.includes('skills')) {
      responseText = 'I specialize in React, TypeScript, Node.js, and cloud technologies. I also have experience with Python, Docker, Kubernetes, and various databases.';
    } else if (command.includes('projects')) {
      responseText = 'I have worked on several projects including a portfolio website, an e-commerce platform, a task management app, and a weather dashboard.';
    } else {
      responseText = "I'm sorry, I didn't understand that. You can ask me about my experience, skills, or projects.";
    }

    setResponse(responseText);
    speakResponse(responseText);
  };

  const speakResponse = (text: string) => {
    if (typeof window !== 'undefined' && window.speechSynthesis) {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.onstart = () => setIsSpeaking(true);
      utterance.onend = () => setIsSpeaking(false);
      window.speechSynthesis.speak(utterance);
    }
  };

  const toggleListening = () => {
    if (typeof window !== 'undefined') {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      if (SpeechRecognition) {
        const recognition = new SpeechRecognition();
        recognition.continuous = false;
        recognition.interimResults = false;
        recognition.lang = 'en-US';

        if (!isListening) {
          recognition.start();
          setIsListening(true);
        } else {
          recognition.stop();
          setIsListening(false);
        }
      }
    }
  };

  const stopSpeaking = () => {
    if (typeof window !== 'undefined' && window.speechSynthesis) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        className="bg-white dark:bg-gray-800 rounded-full shadow-lg p-4"
      >
        <div className="flex items-center gap-4">
          <AnimatePresence>
            {isListening && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                className="bg-blue-100 dark:bg-blue-900 px-4 py-2 rounded-full"
              >
                <p className="text-sm text-blue-600 dark:text-blue-200">
                  {transcript || 'Listening...'}
                </p>
              </motion.div>
            )}
          </AnimatePresence>

          <button
            onClick={toggleListening}
            className={`p-3 rounded-full transition-colors ${
              isListening
                ? 'bg-red-500 hover:bg-red-600'
                : 'bg-blue-500 hover:bg-blue-600'
            }`}
          >
            {isListening ? (
              <MicOff className="w-6 h-6 text-white" />
            ) : (
              <Mic className="w-6 h-6 text-white" />
            )}
          </button>

          {isSpeaking && (
            <button
              onClick={stopSpeaking}
              className="p-3 bg-gray-200 dark:bg-gray-700 rounded-full hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
            >
              <VolumeX className="w-6 h-6 text-gray-600 dark:text-gray-300" />
            </button>
          )}
        </div>

        <AnimatePresence>
          {response && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              className="mt-4 bg-gray-100 dark:bg-gray-700 p-4 rounded-lg max-w-sm"
            >
              <p className="text-sm text-gray-700 dark:text-gray-200">{response}</p>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
} 