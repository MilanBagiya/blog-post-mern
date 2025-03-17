export interface Post {
    _id: string;
    title: string;
    content: string;
    tags: string[];
    createdAt: Date;
}

let posts: Post[] = [
    {
        _id: '1',
        title: 'Getting Started with MERN Stack',
        content:
            'The MERN stack is a powerful combination of MongoDB, Express.js, React, and Node.js. In this post, we’ll explore how to set up a simple blog application using these technologies.',
        tags: ['MERN', 'JavaScript', 'Web Development'],
        createdAt: new Date('2025-03-17T10:00:00Z'),
    },
    {
        _id: '2',
        title: 'Why TypeScript is Awesome',
        content:
            'TypeScript adds static typing to JavaScript, making it easier to catch errors early. This post dives into the benefits of using TypeScript in a MERN application.',
        tags: ['TypeScript', 'Programming', 'MERN'],
        createdAt: new Date('2025-03-16T14:30:00Z'),
    },
    {
        _id: '3',
        title: 'Deploying a MERN App',
        content:
            'Learn how to deploy your MERN application using Vercel for the frontend and Render for the backend. This guide covers free-tier deployment options and best practices.',
        tags: ['Deployment', 'MERN', 'DevOps'],
        createdAt: new Date('2025-03-15T09:15:00Z'),
    },
];

// Utility to generate a simple unique ID
const generateId = (): string => {
    return Math.random().toString(36).substr(2, 9);
};

export const getPosts = (): Post[] => posts;

export const getPostById = (id: string): Post | undefined => posts.find((post) => post._id === id);

export const createPost = (post: Omit<Post, '_id' | 'createdAt'>): Post => {
    const newPost = { ...post, _id: generateId(), createdAt: new Date() };
    posts.push(newPost);
    return newPost;
};

export const updatePost = (id: string, updatedPost: Partial<Post>): Post | undefined => {
    const postIndex = posts.findIndex((post) => post._id === id);
    if (postIndex === -1) return undefined;
    posts[postIndex] = { ...posts[postIndex], ...updatedPost };
    return posts[postIndex];
};

export const deletePost = (id: string): boolean => {
    const initialLength = posts.length;
    posts = posts.filter((post) => post._id !== id);
    return posts.length < initialLength;
};