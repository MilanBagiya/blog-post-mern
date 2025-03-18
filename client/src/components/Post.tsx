import React from "react";
import { Post as PostType } from "../types/post";

interface PostProps {
  post: PostType;
  handleEdit: (post: PostType) => void;
  handleDelete: (id: string) => void;
  deleteMutation: {
    isPending: boolean;
  };
}

const PostComponent: React.FC<PostProps> = ({
  post,
  handleEdit,
  handleDelete,
  deleteMutation,
}) => {
  return (
    <div
      key={post._id}
      className="bg-white rounded-lg shadow-lg p-6 flex justify-between items-center"
    >
      <div>
        <h2 className="text-xl font-semibold text-gray-800">{post.title}</h2>
        <p className="text-gray-600 line-clamp-1">{post.content}</p>
      </div>
      <div className="flex space-x-2">
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
  );
};

export default PostComponent;
