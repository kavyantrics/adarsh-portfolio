'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import Image from 'next/image';
import { Quote, ChevronLeft, ChevronRight } from 'lucide-react';

interface Testimonial {
  id: number;
  name: string;
  role: string;
  image: string;
  content: string;
}

const testimonialsData: Testimonial[] = [
  {
    id: 1,
    name: "Sarah Johnson",
    role: "Product Manager @ TechSphere",
    image: "/testimonials/sarah.jpg",
    content: "Adarsh's knack for blending intricate technical solutions with intuitive UI/UX is remarkable. A true asset to any team looking for top-tier web experiences."
  },
  {
    id: 2,
    name: "Michael Chen",
    role: "Lead Engineer @ InnovateX",
    image: "/testimonials/michael.jpg",
    content: "The clarity in Adarsh's code and his proactive problem-solving significantly streamlined our project. His expertise in modern frameworks is evident."
  },
  {
    id: 3,
    name: "Emily Rodriguez",
    role: "Senior UX Designer @ Creativa",
    image: "/testimonials/emily.jpg",
    content: "Collaborating with Adarsh on UI implementation was seamless. He possesses a rare ability to translate design vision into pixel-perfect, performant reality."
  },
  {
    id: 4,
    name: "David Lee",
    role: "CTO @ AlphaDev",
    image: "/testimonials/david.jpg",
    content: "Adarsh is a highly skilled developer with a strong work ethic. He consistently delivers high-quality work and is always eager to learn and adapt."
  }
];

const Testimonials = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [direction, setDirection] = useState(1);

  const handleNext = () => {
    setIsAutoPlaying(false);
    setDirection(1);
    setCurrentIndex((prev) => (prev + 1) % testimonialsData.length);
  };

  const handlePrev = () => {
    setIsAutoPlaying(false);
    setDirection(-1);
    setCurrentIndex((prev) => (prev - 1 + testimonialsData.length) % testimonialsData.length);
  };

  useEffect(() => {
    if (!isAutoPlaying) return;
    const interval = setInterval(() => {
      setDirection(1);
      setCurrentIndex((prev) => (prev + 1) % testimonialsData.length);
    }, 7000);
    return () => clearInterval(interval);
  }, [isAutoPlaying]);

  const handleDotClick = (index: number) => {
    setDirection(index > currentIndex ? 1 : -1);
    setCurrentIndex(index);
    setIsAutoPlaying(false);
  };

  const currentTestimonial = testimonialsData[currentIndex];

  const variants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 300 : -300,
      opacity: 0,
      scale: 0.95
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
      scale: 1
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction < 0 ? 300 : -300,
      opacity: 0,
      scale: 0.95
    })
  };

  return (
    <section id="testimonials" className="py-24 px-4 md:px-8 bg-[#18181b] font-mono text-gray-300">
      <div className="container mx-auto max-w-4xl">
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.5 }}
          className="text-4xl md:text-5xl font-bold uppercase tracking-wider text-center mb-16 text-accent"
        >
          Kind Words
        </motion.h2>

        <div className="relative min-h-[380px] md:min-h-[320px]"> 
          <AnimatePresence initial={false} custom={direction} mode="wait">
            <motion.div
              key={currentIndex}
              custom={direction}
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ x: { type: "spring", stiffness: 300, damping: 30 }, opacity: { duration: 0.3 }, scale: {duration: 0.3} }}
              className="absolute w-full bg-[#27272a] border border-accent/30 rounded-xl p-8 md:p-10 shadow-neon-lg flex flex-col md:flex-row items-center gap-6 md:gap-8"
            >
              <div className="relative w-28 h-28 md:w-32 md:h-32 rounded-full overflow-hidden border-2 border-accent/50 shadow-lg flex-shrink-0">
                <Image
                  src={currentTestimonial.image}
                  alt={currentTestimonial.name}
                  fill
                  sizes="(max-width: 768px) 112px, 128px"
                  className="object-cover"
                />
              </div>
              <div className="flex-1 text-center md:text-left">
                <Quote className="absolute top-4 left-4 md:top-6 md:left-6 w-8 h-8 text-accent/20 transform rotate-0" />
                <motion.p 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2, duration: 0.4 }}
                  className="text-lg md:text-xl italic text-gray-200 mb-4 leading-relaxed"
                >
                  &ldquo;{currentTestimonial.content}&rdquo;
                </motion.p>
                <motion.h3 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3, duration: 0.4 }}
                  className="text-xl font-semibold text-accent mb-1"
                >
                  {currentTestimonial.name}
                </motion.h3>
                <motion.p 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4, duration: 0.4 }}
                  className="text-sm text-gray-400 tracking-wide"
                >
                  {currentTestimonial.role}
                </motion.p>
                <Quote className="absolute bottom-4 right-4 md:bottom-6 md:right-6 w-8 h-8 text-accent/20 transform rotate-180" />
              </div>
            </motion.div>
          </AnimatePresence>

          <button 
            onClick={handlePrev} 
            className="absolute top-1/2 -left-4 md:-left-10 transform -translate-y-1/2 bg-[#27272a]/70 hover:bg-accent/20 text-accent p-2.5 rounded-full transition-all duration-200 border border-accent/30 hover:border-accent/70 shadow-md focus:outline-none focus:ring-2 focus:ring-accent/50 z-10"
            aria-label="Previous testimonial"
          >
            <ChevronLeft size={22} />
          </button>
          <button 
            onClick={handleNext} 
            className="absolute top-1/2 -right-4 md:-right-10 transform -translate-y-1/2 bg-[#27272a]/70 hover:bg-accent/20 text-accent p-2.5 rounded-full transition-all duration-200 border border-accent/30 hover:border-accent/70 shadow-md focus:outline-none focus:ring-2 focus:ring-accent/50 z-10"
            aria-label="Next testimonial"
          >
            <ChevronRight size={22} />
          </button>
        </div>

        <div className="flex justify-center gap-2.5 mt-12 md:mt-16">
          {testimonialsData.map((_, index) => (
            <button
              key={index}
              onClick={() => handleDotClick(index)}
              className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ease-in-out transform hover:scale-125 ${
                index === currentIndex ? 'bg-accent scale-125 w-3 h-3' : 'bg-accent/30'
              }`}
              aria-label={`Go to testimonial ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;

 