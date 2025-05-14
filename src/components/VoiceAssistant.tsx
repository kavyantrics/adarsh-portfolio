'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mic, MicOff, VolumeX, MessageCircle, X } from 'lucide-react';

interface Experience {
  title: string;
  company: string;
  period: string;
  description: string;
}

// Default Event type for SpeechRecognitionEvent and SpeechRecognitionErrorEvent
// as specific properties are causing persistent issues with TS built-in libs.

interface SpeechRecognition extends EventTarget {
  continuous: boolean;
  interimResults: boolean;
  lang: string;
  onresult: (event) => void;
  onend: () => void;
  start: () => void;
  stop: () => void;
  onerror: (event) => void;
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
  const [showPanel, setShowPanel] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined' && window.speechSynthesis) {
      window.speechSynthesis.getVoices();
    }
  }, []);

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

        recognition.onresult = (event) => {
          let finalTranscript = '';
          let interimTranscript = '';
          for (let i = event.resultIndex; i < event.results.length; ++i) {
            const result = event.results[i];
            if (result.isFinal) {
              finalTranscript += result[0].transcript;
            } else {
              interimTranscript += result[0].transcript;
            }
          }
          setTranscript(interimTranscript || finalTranscript || 'Listening...');
          if (finalTranscript) {
            handleVoiceCommand(finalTranscript.toLowerCase().trim());
          }
        };

        recognition.onend = () => {
          setIsListening(false);
        };

        recognition.onerror = (event) => {
          console.error("Speech recognition error", event.error, event.message);
          setIsListening(false);
          setTranscript('Error listening. Try again.');
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
      responseText = `I have ${experiences.length} items in my experience list. `;
      experiences.forEach((exp, index) => {
        responseText += `${index + 1}. From ${exp.period}, I worked as a ${exp.title} at ${exp.company}. During this time, ${exp.description} `;
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
        recognition.interimResults = true;
        recognition.lang = 'en-US';

        recognition.onresult = (event) => {
          let finalTranscript = '';
          let interimTranscript = '';
          for (let i = event.resultIndex; i < event.results.length; ++i) {
            const result = event.results[i];
            if (result.isFinal) {
              finalTranscript += result[0].transcript;
            } else {
              interimTranscript += result[0].transcript;
            }
          }
          setTranscript(interimTranscript || finalTranscript || 'Listening...');
          if (finalTranscript) {
            handleVoiceCommand(finalTranscript.toLowerCase().trim());
          }
        };

        recognition.onend = () => {
          setIsListening(false);
        };

        recognition.onerror = (event) => {
          console.error("Speech recognition error", event.error, event.message);
          setIsListening(false);
          setTranscript('Error listening. Try again.');
        };

        if (!isListening) {
          try {
            recognition.start();
            setIsListening(true);
            setResponse('');
            setTranscript('Listening...');
          } catch (e) {
            console.error("Recognition start error", e);
            setIsListening(false);
            setTranscript('Mic access denied?');
          }
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

  const fabVariants = {
    closed: { scale: 0, rotate: -45 },
    open: { scale: 1, rotate: 0 }
  };

  const panelVariants = {
    hidden: { opacity: 0, y: 50, scale: 0.9 },
    visible: { opacity: 1, y: 0, scale: 1, transition: { type: 'spring', stiffness: 300, damping: 30 } },
    exit: { opacity: 0, y: 30, scale: 0.95, transition: { duration: 0.2 } }
  };

  return (
    <div className="fixed bottom-8 right-8 z-[1000] font-mono">
      <AnimatePresence>
        {showPanel && (
          <motion.div
            variants={panelVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="w-80 md:w-96 bg-[#222225]/80 backdrop-blur-md border border-accent/30 rounded-xl shadow-neon-lg flex flex-col overflow-hidden max-h-[calc(100vh-10rem)] mb-4"
          >
            <header className="p-4 border-b border-accent/20 flex justify-between items-center bg-[#27272a]/90">
              <h3 className="font-semibold text-lg text-accent flex items-center">
                <MessageCircle size={20} className="mr-2.5" /> Voice Assistant
              </h3>
              {isSpeaking && (
                <button
                  onClick={stopSpeaking}
                  className="p-1.5 bg-red-500/20 text-red-400 rounded-full hover:bg-red-500/40 transition-colors"
                  aria-label="Stop Speaking"
                >
                  <VolumeX size={18} />
                </button>
              )}
            </header>

            <div className="flex-1 overflow-y-auto p-4 space-y-3 scrollbar-thin scrollbar-thumb-accent/60 scrollbar-track-transparent min-h-[150px]">
              {response && (
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="bg-[#2c2c30] text-gray-200 rounded-lg p-3 text-sm shadow-md border border-gray-700/50"
                >
                  <strong className="text-accent/90 block mb-1">Assistant:</strong>
                  {response}
                </motion.div>
              )}
              {transcript && (
                 <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className={`p-3 text-sm rounded-lg ${isListening ? 'bg-accent/10 text-accent' : 'bg-gray-700/30 text-gray-400'}`}
                >
                  <strong className="block mb-1">{isListening ? 'Listening' : 'You said'}:</strong> 
                  {transcript}
                </motion.div>
              )}
              {!transcript && !response && !isListening && (
                 <p className="text-gray-500 text-center text-xs py-4">Click the mic to start.</p>
              )}
            </div>

            <footer className="p-3 border-t border-accent/20 bg-[#27272a]/90">
              <p className="text-xs text-gray-500 text-center">
                Ask about experience, skills, or projects.
              </p>
            </footer>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        variants={fabVariants}
        initial="closed"
        animate="open"
        transition={{ type: 'spring', stiffness: 260, damping: 20, delay: 0.3 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => { 
          if (showPanel && isListening) { toggleListening(); } 
          setShowPanel(!showPanel); 
        }}
        className={`p-4 rounded-full shadow-neon-lg focus:outline-none focus:ring-2 ring-offset-2 ring-offset-[#18181b] transition-all duration-300 flex items-center justify-center 
                    ${showPanel 
                      ? (isListening ? 'bg-red-500/80 text-white ring-red-500/50 hover:bg-red-600/80' : 'bg-accent text-[#18181b] ring-accent/50 hover:bg-accent/90') 
                      : 'bg-accent text-[#18181b] ring-accent/50 hover:bg-accent/90'}`}
        aria-label={showPanel ? (isListening ? "Stop Listening" : "Toggle Voice Assistant Panel") : "Open Voice Assistant"}
      >
        {showPanel ? (isListening ? <MicOff size={24}/> : <X size={24} />) : <Mic size={24} />}
      </motion.button>

      {showPanel && (
         <motion.button
            initial={{scale:0, opacity: 0, y: 10}}
            animate={{scale:1, opacity:1, y: 0, transition: {delay: 0.1, type: 'spring', stiffness:200, damping:15 }}}
            exit={{scale:0, opacity: 0, y:10}}
            onClick={toggleListening}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            className={`absolute bottom-0 right-[72px] p-3.5 rounded-full shadow-neon-md focus:outline-none focus:ring-2 ring-offset-2 ring-offset-[#222225] transition-all duration-300 
                        ${isListening ? 'bg-red-500 text-white ring-red-500/70 hover:bg-red-600' : 'bg-accent/80 text-[#18181b] ring-accent/50 hover:bg-accent'}`}
            aria-label={isListening ? "Stop Listening" : "Start Listening"}
          >
            {isListening ? <MicOff size={22}/> : <Mic size={22}/>}
          </motion.button>
      )}
    </div>
  );
} 