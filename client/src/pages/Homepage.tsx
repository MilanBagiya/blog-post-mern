import React from "react";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import { fetchPosts } from "../api/posts";
import Sidebar from "../components/Sidebar";

const Homepage: React.FC = () => {
  const {
    data: posts,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["posts"],
    queryFn: fetchPosts,
  });

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
          Error loading posts: {(error as Error).message}
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 flex">
      <Sidebar />
      <div className="flex-1 md:ml-64 p-4 md:p-8">
        <h1 className="text-4xl font-bold text-center text-gray-800 mb-8">
          Latest Blog Posts
        </h1>
        {posts?.length === 0 ? (
          <p className="text-center text-gray-500">No posts available.</p>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {posts?.map((post) => (
              <div
                key={post._id}
                className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow duration-300"
              >
                <h2 className="text-2xl font-semibold text-gray-800 mb-2">
                  {post.title}
                </h2>
                <p className="text-gray-600 mb-4 line-clamp-2">
                  {post.content}
                </p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {post.tags.map((tag) => (
                    <span
                      key={tag}
                      className="bg-indigo-100 text-indigo-800 text-sm font-medium px-2.5 py-0.5 rounded"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <Link
                  to={`/post/${post._id}`}
                  className="inline-block bg-indigo-500 text-white px-4 py-2 rounded-lg hover:bg-indigo-600 transition-colors duration-200"
                >
                  Read More
                </Link>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Homepage;
