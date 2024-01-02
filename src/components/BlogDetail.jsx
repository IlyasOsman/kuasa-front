import React, {useEffect, useState} from "react";
import styles from "../style";
import {Link, useNavigate, useParams} from "react-router-dom";
import Loader from "./Loader";
import Comment from "./Comment";
import {useAuth} from "../contexts/AuthContext";
import DOMPurify from "dompurify";
import Button from "./Button";
import {ToastContainer, toast} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  activeupvoteIcon,
  arrowRight,
  commentIcon,
  deleteIcon,
  downvoteIcon,
  downvotedIcon,
  editIcon,
  shareIcon,
  upvoteIcon
} from "../assets";

export const BlogDetail = () => {
  const {slug} = useParams();
  const navigate = useNavigate();
  const {accessToken, user} = useAuth();

  const kuasaApi = import.meta.env.VITE_REACT_APP_KUASA_API;
  const [blog, setBlog] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [isEditingCoverImage, setIsEditingCoverImage] = useState(false);
  const [loading, setLoading] = useState(false);

  const [commentVisible, setCommentVisible] = useState(false);

  const [newComment, setNewComment] = useState("");

  const [upvotedblog, setUpvotedBlog] = useState(false);

  const [isDownvoted, setIsDownvoted] = useState(false);

  const [author, setAuthor] = useState(null);

  const [charCount, setCharCount] = useState(0);

  const [charCommentCount, setCharCommentCount] = useState(0);

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    link: "",
    cover_image: null,
    is_project: false
  });

  useEffect(() => {
    const fetchBlogAndUpvoteStatus = async () => {
      try {
        const response = await fetch(`${kuasaApi}/api/blogs/${slug}/`);
        const data = await response.json();
        setBlog(data);

        // Initialize formData after fetching the blog data
        setFormData({
          title: data.title,
          description: data.description,
          link: data.link,
          is_project: data.is_project,
          cover_image: data.cover_image
        });

        // Fetch upvote status only if user is logged in
        if (user) {
          const upvotesResponse = await fetch(`${kuasaApi}/api/blogs/${slug}/`);
          const upvotesData = await upvotesResponse.json();
          const hasUpvoted = upvotesData.upvotes.some((vote) => vote.upvoted_by === user.pk);
          setUpvotedBlog(hasUpvoted);
        } else {
          // Reset upvote status if the user is not logged in
          setUpvotedBlog(false);
        }
        fetchAuthor(data.author);
        setCharCount(formData.description.length);
      } catch (error) {
        console.error("Error fetching blog data or upvote status: ", error);
      }
    };

    const fetchAuthor = async (authorId) => {
      if (user && authorId) {
        try {
          const response = await fetch(`${kuasaApi}/api/members/${authorId}/`, {
            headers: {
              Authorization: `Bearer ${accessToken}`
            }
          });
          const authorData = await response.json();
          setAuthor(authorData);
        } catch (error) {
          console.error("Error fetching author data: ", error);
        }
      }
    };

    fetchBlogAndUpvoteStatus();
  }, [slug, user]);

  if (!blog) {
    return <Loader />;
  }

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const today = new Date();
    const diffTime = today - date;
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays === 0) {
      return "Today";
    } else if (diffDays === 1) {
      return "Yesterday";
    } else {
      return date.toLocaleDateString("en-US", {month: "short", day: "numeric"});
    }
  };

  const handleInputChange = (blog) => {
    const {name, value, type} = blog.target;
    const newValue = type === "checkbox" ? !formData.is_project : value;
    setFormData({...formData, [name]: newValue});
  };

  const handleEditBlog = () => {
    setIsEditing(true);
  };

  // Function to handle the save button in the editing modal
  const handleSaveEdit = () => {
    const formDataToSend = new FormData();
    formDataToSend.append("title", formData.title);
    formDataToSend.append("description", formData.description);
    formDataToSend.append("link", formData.link);
    formDataToSend.append("is_project", formData.is_project);

    setLoading(true);

    fetch(`${kuasaApi}/api/blogs/${slug}/`, {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${accessToken}`
      },
      body: formDataToSend
    }).then((response) => {
      if (response.status === 200) {
        setIsEditing(false);

        setLoading(false);
        fetch(`${kuasaApi}/api/blogs/${slug}/`)
          .then((response) => response.json())
          .then((data) => setBlog(data))
          .catch((error) => console.error("Error fetching updated blog data: ", error));
      } else {
        console.error("Error updating blog");
        setLoading(false);
      }
    });
  };

  // Function to handle the cancel button in the editing modal
  const handleCancelEdit = () => {
    setIsEditing(false);
  };

  const handleCoverImageChange = (blog) => {
    const file = blog.target.files[0];
    setFormData({
      ...formData,
      cover_image: file
    });
  };

  // Function to send a PATCH request for cover image only
  const updateCoverImage = () => {
    if (formData.cover_image === null) {
      alert("Please select a cover image (JPEG or PNG).");
      return;
    }

    const formDataToSend = new FormData();
    formDataToSend.append("cover_image", formData.cover_image);
    setLoading(true);
    fetch(`${kuasaApi}/api/blogs/${slug}/`, {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${accessToken}`
      },
      body: formDataToSend
    }).then((response) => {
      if (response.status === 200) {
        setIsEditingCoverImage(false);
        setLoading(false);
        toast.success("Cover photo updated successfully.", {
          position: "top-center",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          theme: "dark"
        });
        fetch(`${kuasaApi}/api/blogs/${slug}/`)
          .then((response) => response.json())
          .then((data) => setBlog(data))
          .catch((error) => console.error("Error fetching updated blog data: ", error));
      } else {
        console.error("Error updating cover photo");
        alert("Error updating cover photo");
        setIsEditingCoverImage(false);
        setLoading(false);
      }
    });
  };

  function sanitizeAndRenderDescription(description) {
    const sanitizedDescription = DOMPurify.sanitize(description);
    return {__html: sanitizedDescription};
  }

  const handleDeleteBlog = () => {
    if (window.confirm("Are you sure you want to delete this blog?")) {
      fetch(`${kuasaApi}/api/blogs/${slug}/`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${accessToken}`
        }
      }).then((response) => {
        if (response.status === 204) {
          navigate("/blog");
        } else {
          console.error("Error deleting blog");
        }
      });
    }
  };

  // Function to toggle visibility
  const toggleCommentVisibility = () => {
    if (!user) {
      navigate("/signin");
    }
    setCommentVisible(!commentVisible);
  };

  const handleCommentChange = (event) => {
    setNewComment(event.target.value);
    setCharCommentCount(newComment.length);
  };

  const fetchUpdatedComment = async () => {
    try {
      const response = await fetch(`${kuasaApi}/api/blogs/${slug}/`);
      if (response.ok) {
        const updatedBlogData = await response.json();
        setBlog(updatedBlogData);
        setCommentVisible(false); // Close the comment section
      } else {
        console.error("Failed to fetch updated blog data");
        // Handle error scenarios
      }
    } catch (error) {
      console.error("Error fetching updated blog data:", error);
      // Handle error scenarios
    }
  };

  const handlePostComment = () => {
    if (newComment.length > 500) {
      alert("Comment exceeds 500 characters.");
      return;
    }
    const commentData = {
      commenter: user.pk,
      comment: newComment,
      blog: blog.id
    };

    fetch(`${kuasaApi}/api/comment/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`
      },
      body: JSON.stringify(commentData)
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error("Failed to post comment");
        }
      })
      .then((data) => {
        console.log("Comment posted:", data);
        setNewComment("");

        fetchUpdatedComment();
      })
      .catch((error) => {
        console.error("Error posting comment:", error);
      });
  };

  // Function to update comments after deletion
  const handleUpdateComments = (deletedCommentId) => {
    const updatedComments = blog.comments.filter((comment) => comment.id !== deletedCommentId);
    setBlog({...blog, comments: updatedComments});
    fetchUpdatedComment();
  };

  const handleBlogUpvote = async () => {
    if (user) {
      try {
        // Check if the user has already upvoted this comment
        const hasUpvoted = blog.upvotes.some((vote) => vote.upvoted_by === user.pk);
        if (hasUpvoted) {
          console.log("You have already upvoted this blog.");
          setUpvotedBlog(true);
          return;
        }

        // Perform the upvote by making a POST request to your endpoint
        const response = await fetch(`${kuasaApi}/api/blogs/${slug}/upvote/`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`
          },
          body: JSON.stringify({
            upvoted_by: user.pk,
            post: blog.id
          })
        });

        if (response.ok) {
          setUpvotedBlog(true);
          setBlog((prevBlog) => ({
            ...prevBlog,
            upvotes: [...prevBlog.upvotes, {upvoted_by: user.pk}]
          }));
        } else {
          console.error("Failed to upvote blog");
        }
      } catch (error) {
        console.error("Error upvoting blog:", error);
      }
    }
  };

  const handleBlogRemoveUpvote = async () => {
    if (user) {
      try {
        // Check if the user has upvoted this comment
        const upvoteIndex = blog.upvotes.findIndex((vote) => vote.upvoted_by === user.pk);
        if (upvoteIndex === -1) {
          console.log("You have not upvoted this comment.");
          return;
        }

        const postId = blog.id;

        // Perform the removal of upvote by making a DELETE request to your endpoint
        const response = await fetch(`${kuasaApi}/api/blogs/${slug}/upvote/${postId}/`, {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${accessToken}`
          }
        });

        if (response.ok) {
          const updatedUpvotes = [...blog.upvotes];
          updatedUpvotes.splice(upvoteIndex, 1);
          setUpvotedBlog(false);
          setBlog((prevBlog) => ({
            ...prevBlog,
            upvotes: updatedUpvotes
          }));
        } else {
          console.error("Failed to remove upvote");
        }
      } catch (error) {
        console.error("Error removing upvote:", error);
      }
    }
  };

  const handleDownvoteClick = () => {
    // Toggle the downvote status
    setIsDownvoted((prevState) => !prevState);
  };

  const copyBlogLink = (slug) => {
    const baseURL = "https://kuasa.live/blog-detail/";
    const blogURL = baseURL + slug;

    navigator.clipboard
      .writeText(blogURL)
      .then(() => {
        toast.success("Link copied to clipboard", {
          position: "top-center",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          theme: "dark"
        });
      })
      .catch((error) => {
        console.error("Failed to copy link", error);
        toast.error("Failed to copy link", {
          position: "top-center",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          theme: "dark"
        });
      });
  };

  const handleDescChange = (e) => {
    const descValue = e.target.value;
    setCharCount(descValue.length);
    handleInputChange(e);
  };

  return (
    <div className={`bg-primary ${styles.flexCenter} ${styles.paddingX} ${styles.paddingY}`}>
      <div className={`${styles.boxWidth}`}>
        <div className="text-center">
          <h1 className={`${styles.heading2} ${styles.flexStart} text-left`}>{blog.title}</h1>

          <p
            className={`${styles.paragraph} text-left mt-2`}
            style={{whiteSpace: "pre-wrap"}}
            dangerouslySetInnerHTML={sanitizeAndRenderDescription(
              `<strong class="text-white ">TLDR</strong>    ${blog.description}`
            )}
          />
          <small className="flex justify-start mt-2 text-sm">
            Submitted by{" "}
            {author ? (
              <Link to={`/members/${blog.author}`}>
                <span className="text-teal-500 mx-2 italic hover:underline cursor-pointer">{`${author.first_name} ${author.last_name}`}</span>
              </Link>
            ) : (
              <Link to="/signin">
                <span className="text-teal-500 mx-2 italic hover:underline cursor-pointer">
                  Author
                </span>
              </Link>
            )}
          </small>
          <p className="text-white text-left mt-4 flex justify-between">
            <small className="text-teal-500">{formatDate(blog.created_at)}</small>
            <a
              className="inline-flex items-center py-2 px-4 text-sm font-poppins font-medium text-primary bg-blue-gradient rounded-[10px]
                outline-none capitalize transition-colors duration-300 transform hover:bg-green-400 active:bg-green-500 focus:outline-none
                focus:ring focus:ring-green-200 focus:ring-opacity-50 cursor-pointer"
              href={blog.link}
              target="_blank"
              rel="noreferrer"
            >
              Read Post
              <img
                src={arrowRight}
                alt="arrow-right"
                className="w-[23px] h-[16px] object-contain"
              />
            </a>
          </p>

          <div className="mt-4 rounded-lg overflow-hidden">
            <img
              src={blog.cover_image}
              alt="Blog Cover"
              className="my-4 cursor-pointer rounded-lg"
              onClick={() => setIsEditingCoverImage(true)}
              style={{width: "800px", height: "auto"}}
            />
          </div>

          <div className="mt-5 flex justify-start">
            {/* Comment Section */}
            <p>{blog.upvotes.length} Upvotes</p>
            <p className="mx-2">{blog.comments.length} comments</p>
          </div>

          <div className="mt-4 border border-gray-700 rounded-lg p-3">
            {/* Comment Section */}
            {user ? (
              <div className="flex justify-between">
                {!upvotedblog ? (
                  <button className="" onClick={handleBlogUpvote}>
                    <img
                      src={upvoteIcon}
                      alt="upvote"
                      className="w-[24px] h-[24px] object-contain"
                    />
                  </button>
                ) : (
                  <button className="text-teal-500 mx-2" onClick={handleBlogRemoveUpvote}>
                    <img
                      src={activeupvoteIcon}
                      alt="active_upvote"
                      className="w-[24px] h-[24px] object-contain"
                    />
                  </button>
                )}
                <button className="" onClick={handleDownvoteClick}>
                  <img
                    src={isDownvoted ? downvotedIcon : downvoteIcon}
                    alt="downvote"
                    className="w-[24px] h-[24px] object-contain"
                  />
                </button>
                <button className="">
                  <img
                    src={commentIcon}
                    alt="comment"
                    className="w-[24px] h-[24px] object-contain"
                    onClick={toggleCommentVisibility}
                  />
                </button>

                <div className="dropdown dropdown-bottom dropdown-end">
                  <div tabIndex={0} role="button">
                    <button>
                      <img
                        src={shareIcon}
                        alt="share"
                        className="w-[24px] h-[24px] object-contain"
                      />
                    </button>
                  </div>
                  <ul
                    tabIndex={0}
                    className="dropdown-content z-[1] menu p-2 shadow bg-gray-900 rounded-box w-52"
                  >
                    <li>
                      <a onClick={() => copyBlogLink(blog.slug)}>Copy link</a>
                    </li>
                  </ul>
                </div>
              </div>
            ) : (
              <div className="flex justify-between">
                <Link to="/signin">
                  <button className="">
                    <img
                      src={upvoteIcon}
                      alt="upvote"
                      className="w-[24px] h-[24px] object-contain"
                    />
                  </button>
                </Link>

                <Link to="/signin">
                  <button className="">
                    <img
                      src={downvoteIcon}
                      alt="downvote"
                      className="w-[24px] h-[24px] object-contain"
                    />
                  </button>
                </Link>

                <Link to="/signin">
                  <button className="">
                    <img
                      src={commentIcon}
                      alt="comment"
                      className="w-[24px] h-[24px] object-contain"
                    />
                  </button>
                </Link>

                <div className="dropdown dropdown-bottom dropdown-end">
                  <div tabIndex={0} role="button">
                    <button>
                      <img
                        src={shareIcon}
                        alt="share"
                        className="w-[24px] h-[24px] object-contain"
                      />
                    </button>
                  </div>
                  <ul
                    tabIndex={0}
                    className="dropdown-content z-[1] menu p-2 shadow bg-gray-900 rounded-box w-52"
                  >
                    <li>
                      <a onClick={() => copyBlogLink(blog.slug)}>Copy link</a>
                    </li>
                  </ul>
                </div>
              </div>
            )}
          </div>

          {/* When this button is clicked I want to post comment */}
          {!commentVisible && (
            <button
              type="button"
              className="flex items-center p-3 w-full rounded-lg border border-gray-700 my-6"
              onClick={toggleCommentVisibility}
            >
              <span className="ml-4">Share your thoughts</span>
              <span className="readOnly medium btn flex-row items-center border f border-gray-700 ont-bold cursor-pointer select-none focus-outline justify-center flex relative ml-auto btn-neutral">
                <span>Post</span>
              </span>
            </button>
          )}

          {commentVisible && (
            <div className="h-80 w-full border border-gray-700 rounded-lg p-4 my-6">
              <p className="font-semibold text-white cursor-pointer transition-all hover:text-dimWhite">
                Share your thoughts
              </p>
              <textarea
                className="h-40 p-5 text-sm py-1 mt-5 outline-none border-gray-700 w-full resize-none border rounded-lg bg-gray-900"
                placeholder="Add your comments here"
                value={newComment}
                required
                onChange={handleCommentChange}
                maxLength={500}
              ></textarea>

              <div className="flex justify-end mt-2">
                <span className="text-white mr-2">{charCommentCount}/500 characters</span>
                <Button text="Comment" type="submit" onClick={handlePostComment} />
              </div>
            </div>
          )}

          <div>
            {blog.comments.map((comment) => (
              <Comment key={comment.id} comment={comment} onUpdateComments={handleUpdateComments} />
            ))}
          </div>

          {isEditing && (
            <div className="fixed inset-0 flex items-center justify-center z-50">
              <div className="modal-container">
                <div className="bg-gray-800 w-auto my-6 mx-auto max-w-3xl p-6 rounded-lg shadow-lg">
                  <h2 className="text-xl font-semibold mb-4 text-white">Edit Blog</h2>
                  <input
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleInputChange}
                    placeholder="Title"
                    className="w-full px-5 py-3 mt-2 border rounded-md bg-gray-900 text-white border-gray-600 focus:border-blue-300 focus:outline-none focus:ring"
                  />
                  <div className="relative">
                    <textarea
                      type="text"
                      name="description"
                      value={formData.description}
                      onChange={handleDescChange}
                      placeholder="Description"
                      className="w-full px-5 py-3 mt-2 border rounded-md bg-gray-900 text-white border-gray-600 focus:border-blue-300 focus:outline-none focus:ring"
                      maxLength={1000}
                    />
                    <div className="absolute right-6 bottom-2 text-gray-400 text-xs">
                      {charCount}/{1000}
                    </div>
                  </div>
                  <input
                    type="text"
                    name="link"
                    value={formData.link}
                    onChange={handleInputChange}
                    placeholder="Link"
                    className="w-full px-5 py-3 mt-2 border rounded-md bg-gray-900 text-white border-gray-600 focus:border-blue-300 focus:outline-none focus:ring"
                  />
                  <input
                    type="checkbox"
                    name="is_project"
                    checked={formData.is_project}
                    onChange={handleInputChange}
                    className="mr-2 mt-6"
                  />
                  <label htmlFor="is_project" className="text-white">
                    This is a project
                  </label>
                  {loading ? (
                    <Loader />
                  ) : (
                    <div className="flex justify-end mt-2">
                      <button
                        onClick={handleSaveEdit}
                        disabled={loading}
                        className="bg-blue-500 text-white px-4 py-2 rounded-lg"
                      >
                        Edit
                      </button>
                      <button
                        onClick={handleCancelEdit}
                        className="bg-gray-500 text-white px-4 py-2 rounded-lg mx-2"
                      >
                        Cancel
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {user && user.pk == blog.author && (
            <>
              {loading ? (
                <Loader />
              ) : (
                <div className="flex justify-between items-center mt-10">
                  <img
                    src={deleteIcon}
                    alt="comment"
                    onClick={handleDeleteBlog}
                    className="w-[24px] h-[24px] object-contain cursor-pointer"
                  />
                  <img
                    src={editIcon}
                    alt="comment"
                    onClick={handleEditBlog}
                    className="w-[24px] h-[24px] object-contain cursor-pointer"
                  />
                </div>
              )}
            </>
          )}

          {user &&
            isEditingCoverImage &&
            user.pk == blog.author && ( // Show cover image input when isEditingCoverImage is true
              <div className="fixed inset-0 flex items-center justify-center z-50">
                <div className="modal-container">
                  <div className="bg-gray-800 w-96 p-6 rounded-lg shadow-lg">
                    <h2 className="text-xl font-semibold mb-4 text-white">Change Cover Photo</h2>
                    <input
                      type="file"
                      accept=".jpg, .jpeg, .png"
                      onChange={handleCoverImageChange}
                      className="w-full mb-4 p-2 border border-gray-300 rounded-md text-white"
                    />
                    {loading ? (
                      <Loader />
                    ) : (
                      <div className="flex justify-end">
                        <button
                          onClick={updateCoverImage}
                          disabled={loading}
                          className="bg-blue-500 text-white px-4 py-2 rounded-lg"
                        >
                          Update
                        </button>
                        <button
                          onClick={() => setIsEditingCoverImage(false)}
                          className="bg-gray-500 text-white px-4 py-2 rounded-lg mx-2"
                        >
                          Cancel
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}

          <ToastContainer />
        </div>
      </div>
    </div>
  );
};
