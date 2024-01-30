import React, { useState, useEffect } from "react";
import axios from "axios";
import { useAuthContext } from "../hooks/useAuthContext";
import Swal from "sweetalert2";
import "sweetalert2/dist/sweetalert2.min.css";

const Post = ({
  postId,
  postUser,
  content,
  likes,
  comments,
  updateAllPosts,
}) => {
  const [isLiked, setIsLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(likes.length);
  const { user } = useAuthContext();
  const [postTime, setPostTime] = useState("");
  const [isCommenting, setIsCommenting] = useState(false);
  const [newComment, setNewComment] = useState("");
  const [postComments, setPostComments] = useState(comments);
  const [isCommentsExpanded, setIsCommentsExpanded] = useState(false);
  const [totalComment, setTotalComment] = useState(comments.length);
  const [isEditing, setIsEditing] = useState(false);
  const [editedContent, setEditedContent] = useState(content);

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

      if (!isLiked && user.roll !== postUser.roll) {
        const firstFewWords = content.split(' ').slice(0, 1).join(' ');
        const notificationResponse = await axios.post(
          `/api/user/notification/${postUser._id}`,
          {
            actorRoll: user.roll,
            actorName: user.username,
            postId:postId,
            type: `Liked your post : "${firstFewWords}..."`,
          }
        );

        console.log(notificationResponse.data);
      } else if (user.roll !== postUser.roll) {
        console.log(user.roll)
        const notificationResponse = await axios.delete(
          `/api/user/notification/${postUser._id}`,
          {
            data: {
              actorRoll: user.roll,
              postId:postId,
            },
          }
        );
        console.log(notificationResponse.data);
      }
    } catch (error) {
      console.error("Error liking post:", error);
    }
  };

  const handleCommentExpand = () => {
    setIsCommentsExpanded(!isCommentsExpanded);
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
      setTotalComment(response.data.comments.length);

      // Clear the comment input field
      setIsCommenting(!isCommenting);
      setNewComment("");
      
      //sending comment notification to the poster
      if (user.roll !== postUser.roll) {
        const firstFewWords = content.split(' ').slice(0, 1).join(' ');
        const notificationResponse = await axios.post(
          `/api/user/notification/${postUser._id}`,
          {
            actorRoll: user.roll,
            actorName: user.username,
            postId:postId,
            type: `Commented on your post : "${firstFewWords}..."`,
          }
        );

        console.log(notificationResponse.data);
      } 
    

    } catch (error) {
      console.error("Error adding comment:", error);
    }

  };

  const handleDeletePost = async () => {
    try {
      const response = await axios.delete(`/api/post/${postId}`, {
        headers: {
          Authorization: `Bearer ${user.jwtToken}`,
        },
      });
      updateAllPosts(response.data);
      Swal.fire({
        icon: "warning",
        title: "Post deleted!",
        text: "Your post has been deleted from Discussion Forum!",
        confirmButtonColor: "#e7195a",
        background: "#f1f1f1",
      });
    } catch (error) {
      console.error("Error deleting post:", error);
    }
  };

  const handleEditToggle = () => {
    setIsEditing(!isEditing);
    setEditedContent(content);
  };

  const handleSave = async () => {
    try {
      // Send a request to the backend to save the edited post content
      const response = await axios.put(
        `/api/post/${postId}`,
        {
          editedContent: editedContent,
        },
        {
          headers: {
            Authorization: `Bearer ${user.jwtToken}`,
          },
        }
      );
      handleEditToggle();

      setEditedContent(response.data.content);

      

      Swal.fire({
        icon: "info",
        title: "Post Edited!",
        text: "Your post content has been edited!",
        confirmButtonColor: "#1aac83",
        background: "#f1f1f1",
      });
    } catch (error) {
      console.error("Error saving post content:", error);
    }
  };

  return (
    <div className="post-container">
      <div className="delete-post-button-container">
        {user.roll === postUser.roll && (
          <>
            <button onClick={handleEditToggle} className="edit-post-button">
              <i class="fa-solid fa-pencil"></i> {isEditing ? "Cancel" : "Edit"}
            </button>
            <button onClick={handleDeletePost} className="delete-post-button">
              <i class="fa-solid fa-trash"></i> Delete
            </button>
          </>
        )}
      </div>
      <div className="post-header">
        <h2>{postUser.username}</h2>
        <span className="post-time">{postTime}</span>
      </div>
      <div className="post-content">
        {isEditing ? (
          <>
            <textarea
              value={editedContent}
              onChange={(e) => setEditedContent(e.target.value)}
              placeholder="Edit your post..."
            />
            <br />
            <button onClick={handleSave}>Save</button>
          </>
        ) : (
          <p>{editedContent}</p>
        )}
      </div>
      <div className="post-footer">
        <div className="post-likes">
          <span>
            <button onClick={handleLike}>
              {isLiked ? (
                <i class="fa-solid fa-thumbs-down"></i>
              ) : (
                <i class="fa-solid fa-thumbs-up"></i>
              )}{" "}
              {likeCount}
            </button>
          </span>
        </div>
        <div className="post-comments">
          <button onClick={handleCommentExpand}>
            <i class="fa-solid fa-comment"></i> Comments{" "}
            {isCommentsExpanded ? `(${totalComment})` : ""}
          </button>

          {isCommentsExpanded && (
            <div>
              <ul>
                {postComments.map((comment, index) => (
                  <li key={index}>
                    <strong style={{ color: "#1aac83" }}>
                      {comment.commenter}
                      {/* {console.log(comment.createdAt)} */}
                    </strong>{" "}
                    <br />
                    {comment.text}
                  </li>
                ))}
              </ul>
              <div className="add-comment">
                <textarea
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  placeholder="Type your comment..."
                />
                <button onClick={handleCommentSubmit}>
                  <i class="fa-solid fa-plus"></i> Add
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Post;
