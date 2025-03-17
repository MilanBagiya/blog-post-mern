import { Request, Response } from 'express';
import { getPosts } from '../mockdata';
import Post, { IPost } from '../models/post';

// Get all posts
export const getAllPosts = async (req: Request, res: Response) => {
    try {
        const posts = await Post.find();
        res.json(posts);
    } catch (error) {
        console.error('Error fetching posts:', error);
        res.status(500).json({ message: 'Server error' });
    }
};

// export const getAllPosts = async (req: Request, res: Response) => {
//     try {
//         const posts = getPosts();
//         res.json(posts);
//     } catch (error) {
//         console.error('Error fetching posts:', error);
//         res.status(500).json({ message: 'Server error' });
//     }
// };


// Get a single post by ID
export const getPostById = async (req: Request, res: Response) => {
    try {
        const post = await Post.findById(req.params.id);
        if (!post) {
            return res.status(404).json({ message: 'Post not found' });
        }
        res.json(post);
    } catch (error) {
        console.error('Error fetching post:', error);
        res.status(500).json({ message: 'Server error' });
    }
};

// Create a new post
export const createPost = async (req: Request, res: Response) => {
    try {
        const { title, content, tags } = req.body;
        const newPost: IPost = new Post({ title, content, tags: tags || [] });
        await newPost.save();
        res.status(201).json(newPost);
    } catch (error) {
        console.error('Error creating post:', error);
        res.status(400).json({ message: 'Bad request' });
    }
};

// Update a post by ID
export const updatePost = async (req: Request, res: Response) => {
    try {
        const { title, content, tags } = req.body;
        const updatedPost = await Post.findByIdAndUpdate(
            req.params.id,
            { title, content, tags, updatedAt: new Date() },
            { new: true }
        );
        if (!updatedPost) {
            return res.status(404).json({ message: 'Post not found' });
        }
        res.json(updatedPost);
    } catch (error) {
        console.error('Error updating post:', error);
        res.status(400).json({ message: 'Bad request' });
    }
};

// Delete a post by ID
export const deletePost = async (req: Request, res: Response) => {
    try {
        const deletedPost = await Post.findByIdAndDelete(req.params.id);
        if (!deletedPost) {
            return res.status(404).json({ message: 'Post not found' });
        }
        res.json({ message: 'Post deleted' });
    } catch (error) {
        console.error('Error deleting post:', error);
        res.status(500).json({ message: 'Server error' });
    }
};