import React, { useState, useEffect } from "react";
import axios from "axios";
import Post from "../components/Post"; // Import the Post component

const Discussion = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    // Fetch posts when the component mounts
    axios.get("/api/post")
      .then((response) => {
        setPosts(response.data);
      })
      .catch((error) => {
        console.error("Error fetching posts:", error);
      });
  }, []); // Run the effect only once when the component mounts

  return (
    <div>
      {posts.map((post) => (
        <Post
          key={post._id} // Make sure each post has a unique key
          postId = {post._id}
          userName={post.userName}
          content={post.content}
          likes={post.likes}
          comments={post.comments}
        />
      ))}
    </div>
  );
};

export default Discussion;
