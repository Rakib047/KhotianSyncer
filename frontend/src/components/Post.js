import React, { useState, useEffect } from "react";
import axios from "axios";
import { useAuthContext } from "../hooks/useAuthContext";

const Post = ({ postId, userName, content, likes, comments }) => {
  const [isLiked, setIsLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(likes.length);
  const { user } = useAuthContext();
  const [postTime, setPostTime] = useState("");
  const [isCommenting, setIsCommenting] = useState(false);
  const [newComment, setNewComment] = useState("");
  const [postComments, setPostComments] = useState(comments);

  useEffect(() => {
    const likedPosts = JSON.parse(localStorage.getItem("likedPosts")) || [];

    // Check if the likedPosts array contains an object with the given userId and postId
    const isPostLiked = likedPosts.some(
      (like) => like.userId === user.roll && like.postId === postId
    );

    setIsLiked(isPostLiked);

    // Calculate and set the post time
    const postDate = new Date(parseInt(postId.substring(0, 8), 16) * 1000);
    setPostTime(formatPostTime(postDate));
  }, [postId, user.roll]);

  const formatPostTime = (postDate) => {
    const currentTime = new Date();
    const timeDifference = Math.floor((currentTime - postDate) / 1000); // in seconds

    if (timeDifference < 60) {
      return `${timeDifference} seconds ago`;
    } else if (timeDifference < 3600) {
      const minutesDifference = Math.floor(timeDifference / 60);
      return `${minutesDifference} minutes ago`;
    } else if (timeDifference < 86400) {
      const hoursDifference = Math.floor(timeDifference / 3600);
      return `${hoursDifference} hours ago`;
    } else {
      const daysDifference = Math.floor(timeDifference / 86400);
      return `${daysDifference} days ago`;
    }
  };

  const handleLike = async () => {
    try {
      // Send a request to the backend to update like count
      const response = await axios.post(`/api/post/${postId}/like`, null, {
        headers: {
          Authorization: `Bearer ${user.jwtToken}`,
        },
      });

      // Update the like count based on the response
      setLikeCount(response.data);

      // Update local storage to persist liked state for the specific user
      const likedPosts = JSON.parse(localStorage.getItem("likedPosts")) || [];

      // Find the index of the post in likedPosts array for the specific user
      const userLikeIndex = likedPosts.findIndex(
        (like) => like.userId === user.roll && like.postId === postId
      );

      if (userLikeIndex !== -1) {
        // Remove the like for the specific user
        likedPosts.splice(userLikeIndex, 1);
        setIsLiked(false);
      } else {
        // Add the like for the specific user
        likedPosts.push({ userId: user.roll, postId });
        setIsLiked(true);
      }

      localStorage.setItem("likedPosts", JSON.stringify(likedPosts));
    } catch (error) {
      console.error("Error liking post:", error);
    }
  };

  const handleCommentToggle = () => {
    setIsCommenting(!isCommenting);
  };

  const handleCommentSubmit = async () => {
    try {
      // Send a request to the backend to add a new comment
      const response = await axios.post(
        `/api/post/${postId}/comment`,
        {
          commenter: user.username,
          text: newComment,
        },
        {
          headers: {
            Authorization: `Bearer ${user.jwtToken}`,
          },
        }
      );

      // Update the post comments based on the response
      setPostComments(response.data.comments);
      console.log(response.data.comments)

      // Clear the comment input field
      setNewComment("");
    } catch (error) {
      console.error("Error adding comment:", error);
    }
  };

  return (
    <div className="post-container">
      <div className="post-header">
        <h2>{userName}</h2>
        <span className="post-time">{postTime}</span>
      </div>
      <div className="post-content">
        <p>{content}</p>
      </div>
      <div className="post-footer">
        <div className="post-likes">
          <span>
            <button onClick={handleLike}>
              {isLiked ? <i class="fa-solid fa-thumbs-down"></i> : <i class="fa-solid fa-thumbs-up"></i>} {likeCount}
            </button>
          </span>
        </div>
        <div className="post-comments">
          <h3>Comments</h3>
          <ul>
            {postComments.map((comment, index) => (
              <li key={index}><strong style={{ color: '#1aac83' }}>{comment.commenter}</strong> : {comment.text}</li>
            ))}
          </ul>
          {isCommenting && (
            <div>
              <textarea
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                placeholder="Type your comment..."
              />
              <button onClick={handleCommentSubmit}>Submit Comment</button>
            </div>
          )}
          <button onClick={handleCommentToggle}>
            {isCommenting ? "Cancel Comment" : "Add a Comment"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Post;
