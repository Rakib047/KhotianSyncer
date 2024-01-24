import React, { useState, useEffect } from "react";
import axios from "axios";
import Post from "../components/Post"; // Import the Post component
import { useAuthContext } from "../hooks/useAuthContext";

const Discussion = () => {
  const [posts, setPosts] = useState([]);
  const [newPostContent, setNewPostContent] = useState("");
  const [isFormOpen, setIsFormOpen] = useState(false); // State to track whether the form is open or not
  const { user } = useAuthContext();

  useEffect(() => {
    // Fetch posts when the component mounts....
    axios
      .get("/api/post")
      .then((response) => {
        setPosts(response.data);
      })
      .catch((error) => {
        console.error("Error fetching posts:", error);
      });
  }, []); // Run the effect only once when the component mounts

  const handlePostSubmit = async (e) => {
    e.preventDefault();

    try {
      // Make a POST request to create a new post
      await axios.post(
        "/api/post",
        {
          content: newPostContent,
        },
        {
          headers: {
            Authorization: `Bearer ${user.jwtToken}`,
          },
        }
      );

      // Fetch the updated list of posts
      const response = await axios.get("/api/post");
      setPosts(response.data);
      

      // Clear the input fields
      setNewPostContent("");
      // Close the form after successful submission
      setIsFormOpen(false);
    } catch (error) {
      console.error("Error creating post:", error);
    }
  };

  return (
    <div>
      <h2 className="headings"><i class="fa-solid fa-square-rss"></i> Discussion Forum</h2>
      <div className="writePostDiv"><button onClick={() => setIsFormOpen(true)} className="add-resource-link-button"><i class="fa-solid fa-pen-nib"></i> Create Post</button></div>
      
      
      {isFormOpen && (
        <div className="post-form">
          <form onSubmit={handlePostSubmit}>
            <label>
              Create Post:
              <textarea
                value={newPostContent}
                onChange={(e) => setNewPostContent(e.target.value)}
                placeholder="Write Something...."
              />
            </label>
            <br />
            <button type="submit">Post</button>
            <button type="button" onClick={() => setIsFormOpen(false)} className="cancel-button">
              Cancel
            </button>
          </form>
        </div>
      )}
      <div>
        {posts.map((post) => (
          <Post
            key={post._id} // Make sure each post has a unique key
            postId={post._id}
            postUser={post.user}
            content={post.content}
            likes={post.likes}
            comments={post.comments}
          />
        ))}
      </div>
    </div>
  );
};

export default Discussion;
