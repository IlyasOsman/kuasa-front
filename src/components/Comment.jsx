import React, {useEffect, useState} from "react";
import PropTypes from "prop-types";
import {useAuth} from "../contexts/AuthContext";
import {Link} from "react-router-dom";
import {
  activeupvoteIcon,
  commentIcon,
  deleteIcon,
  editIcon,
  placeholderprofileimage,
  upvoteIcon
} from "../assets";
import DOMPurify from "dompurify";

const Comment = ({comment, onUpdateComments}) => {
  const {commenter, comment: commentText, created_at, replies} = comment;

  const [commenterInfo, setCommenterInfo] = useState(null);
  const [repliesInfo, setRepliesInfo] = useState([]);

  const kuasaApi = import.meta.env.VITE_REACT_APP_KUASA_API;
  const {accessToken, user} = useAuth();

  const [editingComment, setEditingComment] = useState(false);
  const [editedComment, setEditedComment] = useState(commentText);

  const [commentTextDisplay, setCommentTextDisplay] = useState(commentText);

  const [newReplyText, setNewReplyText] = useState("");

  // const [editingReplyId, setEditingReplyId] = useState(null);
  // const [editedReplyText, setEditedReplyText] = useState("");

  const [replying, setReplying] = useState(false);

  const [upvoted, setUpvoted] = useState(false);

  const [upvotedReplies, setUpvotedReplies] = useState(
    new Set(
      replies
        .filter((reply) => reply.upvotes.some((vote) => vote.upvoted_by === user?.pk))
        .map((reply) => reply.id)
    )
  );

  const [charCountEditedComment, setCharCountEditedComment] = useState(editedComment.length);
  const [charCountNewReplyText, setCharCountNewReplyText] = useState(newReplyText.length);

  useEffect(() => {
    fetchCommenterDetails();
    fetchRepliesDetails();

    if (user) {
      const hasUpvoted = comment.upvotes.some((vote) => vote.upvoted_by === user.pk);
      setUpvoted(hasUpvoted);
    }
  }, []);

  // console.log(upvotedreply);

  const fetchCommenterDetails = async () => {
    try {
      if (user) {
        const response = await fetch(`${kuasaApi}/api/members/${commenter}`, {
          headers: {
            Authorization: `Bearer ${accessToken}`
          }
        });
        const data = await response.json();
        setCommenterInfo(data);
      } else {
        const data = {first_name: "Member", last_name: "1", profile_image: placeholderprofileimage};
        setCommenterInfo(data);
      }
    } catch (error) {
      console.error("Error fetching commenter details: ", error);
    }
  };

  // console.log(commenterInfo)

  const fetchRepliesDetails = async () => {
    try {
      if (user) {
        const promises = replies.map((reply) =>
          fetch(`${kuasaApi}/api/members/${reply.replier}`, {
            headers: {
              Authorization: `Bearer ${accessToken}`
            }
          })
        );
        const responses = await Promise.all(promises);
        const repliesData = await Promise.all(responses.map((response) => response.json()));
        setRepliesInfo(repliesData);
      } else {
        const data = [];
        for (let i = 1; i <= replies.length; i++) {
          data.push({first_name: "Member", last_name: "2", profile_image: placeholderprofileimage});
        }
        setRepliesInfo(data);
      }
    } catch (error) {
      console.error("Error fetching replies details: ", error);
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = now - date;
    const diffSeconds = Math.floor(diffTime / 1000);
    const diffMinutes = Math.floor(diffSeconds / 60);
    const diffHours = Math.floor(diffMinutes / 60);
    const diffDays = Math.floor(diffHours / 24);
    const diffMonths = Math.floor(diffDays / 30);
    const diffYears = Math.floor(diffDays / 365);

    if (diffSeconds < 60) {
      return `${diffSeconds} s`;
    } else if (diffMinutes < 60) {
      return `${diffMinutes} min`;
    } else if (diffHours < 24) {
      return `${diffHours} hr`;
    } else if (diffDays === 1) {
      return "Yesterday";
    } else if (diffYears >= 1) {
      return date.toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric"
      });
    } else if (diffMonths >= 1 && diffMonths < 12) {
      return date.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric"
      });
    } else {
      return date.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric"
      });
    }
  };

  // Function to handle editing comment
  const handleEditComment = async () => {
    // Check if the logged-in user matches the commenter before editing
    if (editedComment.length > 500) {
      alert("Comment exceeds 500 characters.");
      return;
    }
    if (user && user.pk === commenter) {
      try {
        const response = await fetch(`${kuasaApi}/api/comment/${comment.id}/`, {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`
          },
          body: JSON.stringify({comment: editedComment})
        });

        if (response.ok) {
          setEditingComment(false);

          try {
            const updatedResponse = await fetch(`${kuasaApi}/api/comment/${comment.id}/`);
            const updatedComment = await updatedResponse.json();
            setCommentTextDisplay(updatedComment.comment); // Update displayed comment
          } catch (error) {
            console.error("Error fetching updated comment:", error);
          }
        } else {
          console.error("Failed to edit comment");
        }
      } catch (error) {
        console.error("Error editing comment:", error);
      }
    } else {
      console.error("User is not authorized to edit this comment");
    }
    setUpvotedReplies(new Set(upvotedReplies));
  };

  // Function to handle deleting comment
  const handleDeleteComment = async () => {
    if (
      user &&
      user.pk === commenter &&
      window.confirm("Are you sure you want to delete this comment?")
    ) {
      try {
        const response = await fetch(`${kuasaApi}/api/comment/${comment.id}/`, {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${accessToken}`
          }
        });

        if (response.ok) {
          onUpdateComments(comment.id);
        } else {
          console.error("Failed to delete comment");
        }
      } catch (error) {
        console.error("Error deleting comment:", error);
      }
    }
  };

  // Function to handle posting a new reply
  const handlePostReply = async () => {
    if (newReplyText.length > 500) {
      alert("Reply cannot exceed 500 characters.");
      return;
    }
    try {
      const response = await fetch(`${kuasaApi}/api/replies/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`
        },
        body: JSON.stringify({
          comment: comment.id,
          reply: newReplyText,
          replier: user.pk
        })
      });

      if (response.ok) {
        // Fetch updated replies after posting a new reply
        setNewReplyText(""); // Clear the reply input field after posting
        // Fetch and update the replies array
        onUpdateComments(comment.id);
      } else {
        console.error("Failed to post reply");
      }
    } catch (error) {
      console.error("Error posting reply:", error);
    }
  };

  // Function to handle editing a reply
  // const handleEditReply = async (replyId, editedReply) => {
  //   try {
  //     setEditedReplyText(editedReplyText);
  //     const response = await fetch(`${kuasaApi}/api/replies/${replyId}/`, {
  //       method: "PATCH",
  //       headers: {
  //         "Content-Type": "application/json",
  //         Authorization: `Bearer ${accessToken}`
  //       },
  //       body: JSON.stringify({reply: editedReply})
  //     });
  //     setEditedReplyText(editedReplyText);
  //     if (response.ok) {
  //       // Update the UI with edited reply
  //       setEditingReplyId(null); // Reset editing state
  //     } else {
  //       console.error("Failed to edit reply");
  //     }
  //   } catch (error) {
  //     console.error("Error editing reply:", error);
  //   }
  // };

  // Function to handle deleting a reply
  const handleDeleteReply = async (replyId) => {
    if (window.confirm("Are you sure you want to delete this reply?")) {
      try {
        const response = await fetch(`${kuasaApi}/api/replies/${replyId}/`, {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${accessToken}`
          }
        });

        if (response.ok) {
          // Handle successful deletion
          onUpdateComments(comment.id);
        } else {
          console.error("Failed to delete reply");
        }
      } catch (error) {
        console.error("Error deleting reply:", error);
      }
    }
  };

  const toggleReplyInput = () => {
    setReplying(!replying);
  };

  const handleUpvote = async () => {
    if (user) {
      try {
        // Check if the user has already upvoted this comment
        const hasUpvoted = comment.upvotes.some((vote) => vote.upvoted_by === user.pk);
        if (hasUpvoted) {
          console.log("You have already upvoted this comment.");
          return;
        }

        // Perform the upvote by making a POST request to your endpoint
        const response = await fetch(`${kuasaApi}/api/comment-upvote/`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`
          },
          body: JSON.stringify({
            upvoted_by: user.pk,
            comment: comment.id
          })
        });

        if (response.ok) {
          setUpvoted(true);
          onUpdateComments(comment);
        } else {
          console.error("Failed to upvote comment");
        }
      } catch (error) {
        console.error("Error upvoting comment:", error);
      }
    }
  };

  const handleRemoveUpvote = async () => {
    if (user) {
      try {
        // Check if the user has upvoted this comment
        const upvoteIndex = comment.upvotes.findIndex((vote) => vote.upvoted_by === user.pk);
        if (upvoteIndex === -1) {
          console.log("You have not upvoted this comment.");
          return;
        }

        const commentId = comment.id;

        // Perform the removal of upvote by making a DELETE request to your endpoint
        const response = await fetch(`${kuasaApi}/api/comment-upvote/${commentId}/`, {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${accessToken}`
          }
        });

        if (response.ok) {
          const updatedUpvotes = [...comment.upvotes];
          updatedUpvotes.splice(upvoteIndex, 1);
          setUpvoted(false);
          onUpdateComments(comment);
        } else {
          console.error("Failed to remove upvote");
        }
      } catch (error) {
        console.error("Error removing upvote:", error);
      }
    }
  };

  const handleReplyUpvote = async (replyId) => {
    if (user) {
      try {
        // Check if the reply has already been upvoted
        const isUpvoted = upvotedReplies.has(replyId);

        if (!isUpvoted) {
          // Upvote the reply
          const response = await fetch(`${kuasaApi}/api/reply-upvote/`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${accessToken}`
            },
            body: JSON.stringify({
              upvoted_by: user.pk,
              reply: replyId
            })
          });

          if (response.ok) {
            upvotedReplies.add(replyId); // Add the reply ID to the upvotedReplies set
            setUpvotedReplies(new Set(upvotedReplies));
            onUpdateComments(comment);
          } else {
            console.error("Failed to upvote reply");
          }
        } else {
          // Remove upvote
          const response = await fetch(`${kuasaApi}/api/reply-upvote/${replyId}/`, {
            method: "DELETE",
            headers: {
              Authorization: `Bearer ${accessToken}`
            }
          });

          if (response.ok) {
            upvotedReplies.delete(replyId); // Remove the reply ID from the upvotedReplies set
          } else {
            console.error("Failed to remove upvote");
          }
        }
      } catch (error) {
        console.error("Error upvoting reply:", error);
      }
    }
  };

  const handleRemoveReplyUpvote = async (replyId) => {
    if (user) {
      try {
        // Check if the reply has already been upvoted
        const isUpvoted = upvotedReplies.has(replyId);

        if (isUpvoted) {
          // Remove upvote
          const response = await fetch(`${kuasaApi}/api/reply-upvote/${replyId}/`, {
            method: "DELETE",
            headers: {
              Authorization: `Bearer ${accessToken}`
            }
          });

          if (response.ok) {
            upvotedReplies.delete(replyId); // Remove the reply ID from the upvotedReplies set
            onUpdateComments(comment);
          } else {
            console.error("Failed to remove upvote");
          }
        }
      } catch (error) {
        console.error("Error upvoting reply:", error);
      }
    }
  };

  // console.log(upvotedreply);

  function sanitizeAndRenderDescription(description) {
    const sanitizedDescription = DOMPurify.sanitize(description);
    return {__html: sanitizedDescription};
  }

  return (
    <div className="border border-gray-700 mt-4 rounded-lg">
      <div className="flex flex-col items-stretch space-x-4">
        <div className="border-b border-gray-700 rounded-lg p-4 hover:bg-gray-900 cursor-pointer">
          {!editingComment && (
            <div className="flex justify-start m-4">
              {/* Display commenter info */}
              {commenterInfo && (
                <div className="flex justify-start md:m-4">
                  {commenterInfo.profile_image == null ? (
                    <img
                      src={placeholderprofileimage}
                      alt="Commenter"
                      className="w-10 h-10 rounded-full mx-2"
                    />
                  ) : (
                    <img
                      src={commenterInfo.profile_image}
                      alt="Commenter"
                      className="w-10 h-10 rounded-full mx-2"
                    />
                  )}
                  <p className="mx-2 text-dimWhite">
                    {commenterInfo.first_name} {commenterInfo.last_name}
                  </p>
                  &bull;
                  <p className="mx-2 text-teal-700 text-sm">{formatDate(created_at)}</p>
                </div>
              )}
            </div>
          )}

          {!editingComment && (
            <div className="flex flex-col justify-start mb-2">
              <p
                className="md:mx-6 text-white text-left flex justify-start"
                style={{whiteSpace: "pre-wrap"}}
                dangerouslySetInnerHTML={sanitizeAndRenderDescription(`${commentTextDisplay}`)}
              />
              <div className="flex justify-start mt-3 mx-4">
                {user ? (
                  <>
                    {!upvoted ? (
                      <button
                        className="text-teal-500 mx-2"
                        aria-label="Upvote"
                        onClick={handleUpvote}
                      >
                        <img
                          src={upvoteIcon}
                          alt="upvote"
                          className="w-[24px] h-[24px] object-contain"
                        />
                      </button>
                    ) : (
                      <button
                        className="text-teal-500 mx-2"
                        aria-label="Remove Upvote"
                        onClick={handleRemoveUpvote}
                      >
                        <img
                          src={activeupvoteIcon}
                          alt="active_upvote"
                          className="w-[24px] h-[24px] object-contain"
                        />
                      </button>
                    )}
                    <button className="text-teal-500 mx-2" onClick={toggleReplyInput}>
                      <img
                        src={commentIcon}
                        alt="comment"
                        className="w-[24px] h-[24px] object-contain"
                      />
                    </button>
                  </>
                ) : (
                  <Link to="/signin">
                    <button className="text-teal-500 mx-2">
                      <img
                        src={upvoteIcon}
                        alt="upvote"
                        className="w-[24px] h-[24px] object-contain"
                      />
                    </button>
                    <button className="text-teal-500 mx-2">
                      <img
                        src={commentIcon}
                        alt="comment"
                        className="w-[24px] h-[24px] object-contain"
                      />
                    </button>
                  </Link>
                )}

                {user && user.pk === commenter && (
                  <>
                    <button onClick={() => setEditingComment(true)} className="text-teal-500 mx-2">
                      <img
                        src={editIcon}
                        alt="comment"
                        className="w-[24px] h-[24px] object-contain"
                      />
                    </button>
                    <button onClick={handleDeleteComment} className="text-red-500 mx-2">
                      <img
                        src={deleteIcon}
                        alt="comment"
                        className="w-[24px] h-[24px] object-contain"
                      />
                    </button>
                  </>
                )}
                <p className="ml-auto">{comment.upvotes.length} upvotes</p>
              </div>
            </div>
          )}

          {editingComment && (
            <div className="flex flex-col justify-between">
              <textarea
                value={editedComment}
                onChange={(e) => {
                  setEditedComment(e.target.value);
                  setCharCountEditedComment(e.target.value.length);
                }}
                className="text-white bg-transparent h-40 p-2 text-sm outline-none border-gray-700 w-full border rounded-lg bg-gray-900"
                maxLength={500}
              />
              <div className="flex justify-end space-x-2 mt-2">
                <span className="text-gray-400 text-xs mt-2 mr-4">
                  {charCountEditedComment}/500 characters
                </span>
                <button onClick={handleEditComment} className="text-teal-500 mx-2">
                  Save
                </button>
                <button onClick={() => setEditingComment(false)} className="text-red-500">
                  Cancel
                </button>
              </div>
            </div>
          )}
        </div>

        <div>
          {/* Display replies */}
          {repliesInfo.length > 0 &&
            repliesInfo.map((reply, index) => (
              <div
                key={index}
                className="flex flex-col items-start space-x-4 p-4 rounded-lg hover:bg-gray-900 cursor-pointer relative"
              >
                {reply && (
                  <div className="flex justify-start m-4 relative z-20">
                    <img
                      src={reply.profile_image ? reply.profile_image : placeholderprofileimage}
                      alt="Reply Author"
                      className="w-8 h-8 rounded-full mx-2"
                    />
                    <p className="mx-2 text-dimWhite">
                      {reply.first_name} {reply.last_name}
                    </p>
                    &bull;
                    <div className="mx-2 text-teal-700 text-sm">
                      {formatDate(replies[index]?.created_at)}
                    </div>
                  </div>
                )}

                <div className="flex justify-start mx-4">
                  <p
                    className="mx-12 text-white text-left"
                    style={{whiteSpace: "pre-wrap"}}
                    dangerouslySetInnerHTML={sanitizeAndRenderDescription(
                      `${replies[index]?.reply}`
                    )}
                  />
                </div>
                <div className="absolute z-0 top-0 bottom-0 left-8 ml-px w-0.5 bg-gray-700"></div>

                <div className="flex justify-start mt-3">
                  <div className="flex justify-start mt-3 mx-10">
                    {user ? (
                      <>
                        {upvotedReplies.has(replies[index]?.id) ? (
                          <button
                            className="text-teal-500 mx-2"
                            onClick={() => handleRemoveReplyUpvote(replies[index]?.id)}
                          >
                            <img
                              src={activeupvoteIcon}
                              alt="active_upvote"
                              className="w-[24px] h-[24px] object-contain"
                            />
                          </button>
                        ) : (
                          <button
                            className="text-teal-500 mx-2"
                            onClick={() => handleReplyUpvote(replies[index]?.id)}
                          >
                            <img
                              src={upvoteIcon}
                              alt="upvote"
                              className="w-[24px] h-[24px] object-contain"
                            />
                          </button>
                        )}
                        <button className="text-teal-500 mx-2" onClick={toggleReplyInput}>
                          <img
                            src={commentIcon}
                            alt="comment"
                            className="w-[24px] h-[24px] object-contain"
                          />
                        </button>
                      </>
                    ) : (
                      <Link to="/signin">
                        <button className="text-teal-500 mx-2">
                          <img
                            src={upvoteIcon}
                            alt="upvote"
                            className="w-[24px] h-[24px] object-contain"
                          />
                        </button>
                        <button className="text-teal-500 mx-2" onClick={toggleReplyInput}>
                          <img
                            src={commentIcon}
                            alt="reply"
                            className="w-[24px] h-[24px] object-contain"
                          />
                        </button>
                      </Link>
                    )}

                    {user && user.pk === replies[index]?.replier && (
                      <div className="flex mt-3">
                        {/* {editingReplyId === replies[index]?.id ? (
                          <>
                            <textarea
                              type="text"
                              value={editedReplyText}
                              onChange={(e) => setEditedReplyText(e.target.value)}
                              className="mx-6 mt-5 text-white bg-transparent h-40 p-5 text-sm py-1 outline-none border-gray-700 w-full resize-none border rounded-lg bg-gray-900"
                            />
                            <div className="flex">
                              <button
                                onClick={() => handleEditReply(replies[index]?.id, editedReplyText)}
                                className="text-teal-500 mx-2"
                              >
                                Save
                              </button>
                              <button
                                onClick={() => setEditingReplyId(null)}
                                className="text-red-500"
                              >
                                Cancel
                              </button>
                            </div>
                          </>
                        ) : ( */}
                        <div className="">
                          {/* <button
                              onClick={() => setEditingReplyId(replies[index]?.id)}
                              className="text-teal-500 mx-2 "
                            >
                              Edit
                            </button> */}
                          <button
                            onClick={() => handleDeleteReply(replies[index]?.id)}
                            className="text-red-500 mx-2"
                          >
                            <img
                              src={deleteIcon}
                              alt="comment"
                              className="w-[24px] h-[24px] object-contain"
                            />
                          </button>
                        </div>
                        {/* )} */}
                      </div>
                    )}
                  </div>
                  <p className="flex justify-end mt-3">{replies[index]?.upvotes.length} upvotes</p>
                </div>
              </div>
            ))}
        </div>
      </div>
      {replying && user && (
        <div className="flex flex-col">
          <textarea
            type="text"
            value={newReplyText}
            onChange={(e) => {
              setNewReplyText(e.target.value);
              setCharCountNewReplyText(e.target.value.length);
            }}
            placeholder="Write a reply..."
            className="mt-1 text-white bg-transparent h-40 p-5 text-sm py-1 outline-none border-gray-700 w-full border rounded-lg bg-gray-900"
            maxLength={500}
          />
          <div className="flex items-center justify-end">
            <span className="text-gray-400 text-xs mx-4">
              {charCountNewReplyText}/500 characters
            </span>
            <button onClick={handlePostReply} className="text-teal-500 mx-2 mt-auto mb-2">
              Reply
              <img src={commentIcon} alt="comment" className="w-[24px] h-[24px] object-contain" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

Comment.propTypes = {
  comment: PropTypes.shape({
    id: PropTypes.number.isRequired,
    commenter: PropTypes.number.isRequired,
    upvotes: PropTypes.array.isRequired,
    comment: PropTypes.string.isRequired,
    created_at: PropTypes.string.isRequired,
    replies: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number.isRequired,
        upvotes: PropTypes.array.isRequired,
        replier: PropTypes.number.isRequired,
        reply: PropTypes.string.isRequired,
        created_at: PropTypes.string.isRequired
      })
    )
  }).isRequired,
  onUpdateComments: PropTypes.func.isRequired
};

export default Comment;
