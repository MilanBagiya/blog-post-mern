export interface Post {
    _id?: string; 
    title: string;
    content: string;
    tags: string[];
    createdAt: Date;
}