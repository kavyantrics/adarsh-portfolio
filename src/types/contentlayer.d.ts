declare module 'contentlayer/generated' {
  export const allPosts: {
    title: string;
    date: string;
    description: string;
    tags: string[];
    image?: string;
    slug: string;
    body: {
      code: string;
    };
  }[];
} 