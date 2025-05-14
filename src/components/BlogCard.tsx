'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { format } from 'date-fns';
import { CalendarDays, Tag } from 'lucide-react';

interface BlogCardProps {
  title: string;
  description: string;
  date: string;
  tags: string[];
  slug: string;
  image?: string;
}

const BlogCard = ({ title, description, date, tags, slug, image }: BlogCardProps) => {
  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4 }}
      className="group bg-[#27272a] border border-accent rounded-lg overflow-hidden shadow-neon flex flex-col h-full font-mono transition-all duration-300 hover:border-accent/70 hover:shadow-neon-md"
    >
      {image && (
        <div className="relative h-52 w-full overflow-hidden">
          <img
            src={image}
            alt={title}
            className="w-full h-full object-cover transition-transform duration-300 ease-in-out group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-black/30 group-hover:bg-black/10 transition-colors duration-300"></div>
        </div>
      )}
      
      <div className="p-6 flex flex-col flex-grow">
        <div className="flex items-center gap-2 text-xs text-gray-500 mb-3">
          <CalendarDays size={14} />
          <time dateTime={date}>
            {format(new Date(date), 'MMMM d, yyyy')}
          </time>
        </div>
        
        <Link href={`/blog/${slug}`} className="block mb-2">
          <h2 className="text-xl font-semibold text-gray-100 group-hover:text-accent transition-colors line-clamp-2">
            {title}
          </h2>
        </Link>
        
        <p className="text-gray-400 text-sm mb-5 flex-grow line-clamp-3">
          {description}
        </p>
        
        <div className="flex flex-wrap gap-2 mt-auto">
          {tags.map((tag) => (
            <Link
              key={tag}
              href={`/blog/tags/${tag}`}
              className="inline-flex items-center gap-1 text-xs px-3 py-1 rounded-full bg-accent/10 text-accent hover:bg-accent/20 transition-colors font-medium"
            >
              <Tag size={12}/> {tag}
            </Link>
          ))}
        </div>
      </div>
    </motion.article>
  );
};

export default BlogCard; 