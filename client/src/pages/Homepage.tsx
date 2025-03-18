import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import { fetchPosts } from "../api/posts";
import Sidebar from "../components/Sidebar";

const Homepage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedTag, setSelectedTag] = useState("");
  const {
    data: posts,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["posts"],
    queryFn: fetchPosts,
  });

  const filteredPosts = posts
    ?.filter((post) => {
      const titleMatches = post.title
        .toLowerCase()
        .includes(searchTerm.toLowerCase());
      const tagMatches = selectedTag === "" || post.tags.includes(selectedTag);
      return titleMatches && tagMatches;
    })
    .sort((a, b) => a.title.toLowerCase().localeCompare(b.title.toLowerCase()));

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-amber-500"></div>
        <p className="ml-4 text-gray-500 text-lg">Loading...</p>
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
          Blog Posts
        </h1>
        <div className="flex space-x-2 mb-8">
          <input
            type="text"
            placeholder="Search posts..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="block w-full max-w-md mx-auto p-2 border border-gray-300 rounded-lg"
          />
          <select
            value={selectedTag}
            onChange={(e) => setSelectedTag(e.target.value)}
            className="block w-full max-w-md mx-auto p-2 border border-gray-300 rounded-lg"
          >
            <option value="">All tags</option>
            {posts
              ?.flatMap((post) => post.tags)
              .filter((tag, index, self) => self.indexOf(tag) === index)
              .sort()
              .map((tag) => (
                <option key={tag} value={tag}>
                  {tag}
                </option>
              ))}
          </select>
        </div>
        {filteredPosts?.length === 0 ? (
          <p className="text-center text-gray-500">No posts available.</p>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filteredPosts?.map((post) => (
              <div
                key={post._id}
                className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow duration-300 transform hover:-translate-y-1"
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
                      className="bg-indigo-100 text-amber-800 text-sm font-medium px-2.5 py-0.5 rounded"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <Link
                  to={`/post/${post._id}`}
                  className="inline-block bg-amber-500 text-white px-4 py-2 rounded-lg hover:bg-amber-600 transition-colors duration-200"
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