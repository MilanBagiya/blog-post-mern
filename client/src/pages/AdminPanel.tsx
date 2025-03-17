import React, { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { fetchPosts, createPost, updatePost, deletePost } from "../api/posts";
import Sidebar from "../components/Sidebar";
import { Post } from "../types/post";

const AdminPanel: React.FC = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [tags, setTags] = useState("");
  const [editId, setEditId] = useState<string | null>(null);

  const queryClient = useQueryClient();

  const {
    data: posts,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["posts"],
    queryFn: fetchPosts,
  });

  const createMutation = useMutation({
    mutationFn: createPost,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["posts"] });
      resetForm();
    },
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, post }: { id: string; post: Partial<Post> }) =>
      updatePost(id, post),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["posts"] });
      resetForm();
    },
  });

  const deleteMutation = useMutation({
    mutationFn: deletePost,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["posts"] }),
  });

  const resetForm = () => {
    setTitle("");
    setContent("");
    setTags("");
    setEditId(null);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const postData = {
      title,
      content,
      tags: tags.split(",").map((tag) => tag.trim()),
    };

    if (editId) {
      updateMutation.mutate({ id: editId, post: postData });
    } else {
      createMutation.mutate(postData);
    }
  };

  const handleEdit = (post: Post) => {
    setEditId(post._id);
    setTitle(post.title);
    setContent(post.content);
    setTags(post.tags.join(", "));
  };

  const handleDelete = (id: string) => {
    deleteMutation.mutate(id);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <p className="text-gray-500 text-lg">Loading...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <p className="text-red-500 text-lg">
          Error: {(error as Error).message}
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 flex">
      <Sidebar />
      <div className="flex-1 md:ml-64 p-4 md:p-8">
        <h1 className="text-4xl font-bold text-center text-gray-800 mb-8">
          Admin Panel
        </h1>

        {/* Form */}
        <form
          onSubmit={handleSubmit}
          className="bg-white rounded-lg shadow-lg p-6 mb-8 max-w-2xl mx-auto"
        >
          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-2">
              Title
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-2">
              Content
            </label>
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              rows={5}
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-2">
              Tags (comma-separated)
            </label>
            <input
              type="text"
              value={tags}
              onChange={(e) => setTags(e.target.value)}
              className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-indigo-500 text-white p-3 rounded-lg hover:bg-indigo-600 transition-colors duration-200 disabled:bg-gray-400"
            disabled={createMutation.isPending || updateMutation.isPending}
          >
            {editId ? "Update Post" : "Add Post"}
          </button>
        </form>

        {/* Post List */}
        <div className="space-y-4">
          {posts?.map((post) => (
            <div
              key={post._id}
              className="bg-white rounded-lg shadow-lg p-6 flex justify-between items-center"
            >
              <div>
                <h2 className="text-xl font-semibold text-gray-800">
                  {post.title}
                </h2>
                <p className="text-gray-600 line-clamp-1">{post.content}</p>
              </div>
              <div className="flex space-x-4">
                <button
                  onClick={() => handleEdit(post)}
                  className="bg-indigo-500 text-white px-4 py-2 rounded-lg hover:bg-indigo-600 transition-colors duration-200"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(post._id)}
                  className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition-colors duration-200"
                  disabled={deleteMutation.isPending}
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AdminPanel;
