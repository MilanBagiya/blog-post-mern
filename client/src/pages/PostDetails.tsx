import { useQuery } from "@tanstack/react-query";
import React from "react";
import { useParams } from "react-router-dom";
import { fetchPostById } from "../api/posts";
import Sidebar from "../components/Sidebar";

const PostDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const {
    data: post,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["post", id],
    queryFn: () => fetchPostById(id!),
    enabled: !!id,
  });

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <p className="text-gray-500 text-lg">Loading...</p>
      </div>
    );
  }

  if (error || !post) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <p className="text-red-500 text-lg">
          {error ? `Error: ${(error as Error).message}` : "Post not found"}
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 flex">
      <Sidebar />
      <div className="flex-1 md:ml-64 p-4 md:p-8">
        <div className="bg-white rounded-lg shadow-lg p-6 max-w-3xl mx-auto">
          <h1 className="text-3xl font-bold text-gray-800 mb-4">
            {post.title}
          </h1>
          <p className="text-gray-500 mb-4">
            Posted on: {new Date(post.createdAt).toLocaleDateString()}
          </p>
          <p className="text-gray-700 leading-relaxed mb-6">{post.content}</p>
          <div className="flex flex-wrap gap-2">
            {post.tags.map((tag) => (
              <span
                key={tag}
                className="bg-amber-100 text-amber-800 text-sm font-medium px-2.5 py-0.5 rounded"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostDetails;
