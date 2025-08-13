'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';

interface BlogCardProps {
  title: string;
  description: string;
  tags: string[];
  slug: string;
}

const BlogCard = ({ title, description, tags, slug }: BlogCardProps) => {
  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4 }}
      whileHover={{ y: -4, scale: 1.01 }}
      className="group relative bg-gradient-to-br from-[#27272a] via-[#2a2a2d] to-[#27272a] border border-accent/20 rounded-xl overflow-hidden shadow-neon-sm hover:shadow-neon-md transition-all duration-300 hover:border-accent/40 backdrop-blur-sm h-full flex flex-col"
    >
      {/* Background accent glow */}
      <div className="absolute inset-0 bg-gradient-to-r from-accent/5 via-accent/10 to-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl"></div>
      
      {/* Top accent line */}
      <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-accent via-accent/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
      
      <div className="relative z-10 p-5 flex flex-col h-full">
        {/* Title Section */}
        <Link href={`/blog/${slug}`} className="block mb-3 group-hover:transform group-hover:translate-x-1 transition-transform duration-300">
          <h2 className="text-lg md:text-xl font-bold text-gray-100 group-hover:text-accent transition-colors duration-300 leading-tight line-clamp-2">
            {title}
          </h2>
        </Link>
        
        {/* Description */}
        <p className="text-gray-400 text-sm mb-4 flex-grow leading-relaxed line-clamp-3 group-hover:text-gray-300 transition-colors duration-300">
          {description}
        </p>
        
        {/* Tags Section */}
        <div className="mt-auto mb-3">
          <div className="flex flex-wrap gap-1.5">
            {tags.slice(0, 3).map((tag, index) => (
              <motion.div
                key={tag}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1, duration: 0.3 }}
              >
                <Link
                  href={`/blog/tags/${tag}`}
                  className="inline-flex items-center gap-1 px-2 py-1 rounded-md bg-accent/10 text-accent hover:bg-accent hover:text-gray-600 transition-all duration-300 font-medium text-xs border border-accent/20 hover:border-accent/50 hover:scale-105 shadow-sm hover:shadow-neon-sm"
                >
                  <div className="w-1 h-1 bg-accent rounded-full group-hover:bg-gray-600 transition-colors duration-300"></div>
                  {tag}
                </Link>
              </motion.div>
            ))}
            {tags.length > 3 && (
              <span className="text-xs text-gray-500 px-2 py-1">
                +{tags.length - 3} more
              </span>
            )}
          </div>
        </div>
        
        {/* Read More Indicator */}
        <div className="mt-auto pt-2 border-t border-accent/10">
          <Link 
            href={`/blog/${slug}`}
            className="inline-flex items-center gap-1.5 text-accent hover:text-accent/80 transition-colors duration-300 font-medium text-xs group-hover:gap-2 transition-all"
          >
            <span>Read full article</span>
            <svg 
              className="w-3 h-3 transform group-hover:translate-x-1 transition-transform duration-300" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
      </div>
    </motion.article>
  );
};

export default BlogCard; 