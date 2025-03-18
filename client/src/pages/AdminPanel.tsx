import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import React, { useState } from "react";
import { createPost, deletePost, fetchPosts, updatePost } from "../api/posts";
import Sidebar from "../components/Sidebar";
import { Post } from "../types/post";
import PostComponent from "../components/Post";

const AdminPanel: React.FC = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [tags, setTags] = useState("");
  const [editId, setEditId] = useState<string | null>(null);
  const [titleError, setTitleError] = useState("");
  const [contentError, setContentError] = useState("");
  const [tagsError, setTagsError] = useState("");

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
    setTitleError("");
    setContentError("");
    setTagsError("");
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (title.trim() === "") {
      setTitleError("Title is required");
      return;
    }

    if (content.trim() === "") {
      setContentError("Content is required");
      return;
    }

    if (tags.trim() === "") {
      setTagsError("Tags are required");
      return;
    }

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
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-amber-500"></div>
        <p className="ml-4 text-gray-600 text-lg">Loading...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center">
        <p className="text-red-500 text-lg">
          Error: {(error as Error).message}
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex">
      <Sidebar />
      <div className="flex-1 md:ml-64 p-4 md:p-8">
        <h1 className="text-4xl font-bold text-center text-gray-800 mb-8">
          Admin Panel
        </h1>

        <form
          onSubmit={handleSubmit}
          className="bg-white rounded-xl shadow-xl p-6 mb-8 max-w-2xl mx-auto border border-gray-100"
        >
          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-2">
              Title
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full p-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all"
              required
            />
            {titleError && <p className="text-red-500 text-sm">{titleError}</p>}
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-2">
              Content
            </label>
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="w-full p-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all"
              rows={5}
              required
            />
            {contentError && (
              <p className="text-red-500 text-sm">{contentError}</p>
            )}
          </div>
          <div className="mb-6">
            <label className="block text-gray-700 font-medium mb-2">
              Tags (comma-separated)
            </label>
            <input
              type="text"
              value={tags}
              onChange={(e) => setTags(e.target.value)}
              className="w-full p-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all"
            />
            {tagsError && <p className="text-red-500 text-sm">{tagsError}</p>}
          </div>
          <button
            type="submit"
            className="w-full bg-amber-500 text-white p-3 rounded-lg hover:bg-amber-600 transition-all duration-200 disabled:bg-gray-400 disabled:cursor-not-allowed"
            disabled={createMutation.isPending || updateMutation.isPending}
          >
            {editId ? "Update Post" : "Add Post"}
          </button>
        </form>

        <div className="space-y-6">
          {posts?.map((post) => (
            <PostComponent
              key={post._id}
              post={post}
              handleEdit={handleEdit}
              handleDelete={handleDelete}
              deleteMutation={deleteMutation}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default AdminPanel;
