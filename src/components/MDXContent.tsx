'use client';

import { useMDXComponent } from 'next-contentlayer/hooks';
import { ComponentProps, ReactElement } from 'react';

interface MDXContentProps {
  code: string;
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
    <h1 {...props} className="text-4xl font-bold font-heading mt-8 mb-4 text-foreground" />
  ),
  h2: (props) => (
    <h2 {...props} className="text-3xl font-bold font-heading mt-8 mb-4 text-foreground" />
  ),
  h3: (props) => (
    <h3 {...props} className="text-2xl font-bold font-heading mt-6 mb-3 text-foreground" />
  ),
  p: (props) => (
    <p {...props} className="my-4 text-foreground/80 leading-relaxed" />
  ),
  a: (props) => (
    <a {...props} className="text-accent hover:text-accent/80 underline underline-offset-4" />
  ),
  ul: (props) => (
    <ul {...props} className="list-disc list-inside my-4 text-foreground/80" />
  ),
  ol: (props) => (
    <ol {...props} className="list-decimal list-inside my-4 text-foreground/80" />
  ),
  li: (props) => <li {...props} className="my-1" />,
  blockquote: (props) => (
    <blockquote {...props} className="border-l-4 border-primary/30 pl-4 my-4 italic text-foreground/70" />
  ),
  code: (props) => (
    <code {...props} className="bg-primary/10 text-primary px-1.5 py-0.5 rounded text-sm font-mono" />
  ),
  pre: (props) => (
    <pre {...props} className="bg-primary/5 rounded-lg p-4 my-4 overflow-x-auto" />
  ),
};

export function MDXContent({ code }: MDXContentProps) {
  const Component = useMDXComponent(code);
  return (
    <div className="mdx">
      <Component components={components} />
    </div>
  );
} 