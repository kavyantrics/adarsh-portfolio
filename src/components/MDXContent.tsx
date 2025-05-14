'use client';

import { MDXRemote, MDXRemoteSerializeResult } from 'next-mdx-remote';
import { ComponentProps, ReactElement } from 'react';

interface MDXContentProps {
  source: MDXRemoteSerializeResult;
}

type MDXComponents = {
  h1: (props: ComponentProps<'h1'>) => ReactElement;
  h2: (props: ComponentProps<'h2'>) => ReactElement;
  h3: (props: ComponentProps<'h3'>) => ReactElement;
  p: (props: ComponentProps<'p'>) => ReactElement;
  a: (props: ComponentProps<'a'>) => ReactElement;
  ul: (props: ComponentProps<'ul'>) => ReactElement;
  ol: (props: ComponentProps<'ol'>) => ReactElement;
  li: (props: ComponentProps<'li'>) => ReactElement;
  blockquote: (props: ComponentProps<'blockquote'>) => ReactElement;
  code: (props: ComponentProps<'code'>) => ReactElement;
  pre: (props: ComponentProps<'pre'>) => ReactElement;
};

const components: MDXComponents = {
  h1: (props) => (
    <h1 {...props} className="text-4xl font-bold font-mono mt-10 mb-5 text-accent tracking-tight" />
  ),
  h2: (props) => (
    <h2 {...props} className="text-3xl font-bold font-mono mt-8 mb-4 text-gray-100 tracking-tight" />
  ),
  h3: (props) => (
    <h3 {...props} className="text-2xl font-semibold font-mono mt-6 mb-3 text-gray-200" />
  ),
  p: (props) => (
    <p {...props} className="my-5 text-gray-400 leading-relaxed font-mono text-base" />
  ),
  a: (props) => (
    <a {...props} className="text-accent hover:text-accent/80 underline underline-offset-4 font-mono transition-colors" />
  ),
  ul: (props) => (
    <ul {...props} className="list-disc list-outside pl-6 my-5 text-gray-400 space-y-2 font-mono" />
  ),
  ol: (props) => (
    <ol {...props} className="list-decimal list-outside pl-6 my-5 text-gray-400 space-y-2 font-mono" />
  ),
  li: (props) => <li {...props} className="my-1.5 font-mono text-gray-400" />,
  blockquote: (props) => (
    <blockquote {...props} className="border-l-4 border-accent/50 pl-5 py-2 my-6 italic text-gray-500 bg-[#27272a]/30 rounded-r-md font-mono" />
  ),
  code: (props) => (
    <code {...props} className="bg-accent/10 text-accent px-1.5 py-0.5 rounded-sm text-sm font-mono" />
  ),
  pre: (props) => (
    <pre {...props} className="bg-[#222225] border border-gray-700/50 rounded-lg p-4 my-6 overflow-x-auto font-mono text-sm scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-transparent" />
  ),
};

export function MDXContent({ source }: MDXContentProps) {
  return (
    <article className="mdx prose prose-invert prose-sm md:prose-base max-w-none font-mono py-8">
      <MDXRemote {...source} components={components} />
    </article>
  );
} 