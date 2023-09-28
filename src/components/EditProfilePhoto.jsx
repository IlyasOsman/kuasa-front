import React, {useState, useEffect, useRef} from "react";
import {useAuth} from "../contexts/AuthContext";
import {ToastContainer, toast} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const EditProfilePhoto = () => {
  const {accessToken, user, updateUser} = useAuth();
  const [showEditOptions, setShowEditOptions] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploading, setUploading] = useState(false); // Track upload status
  const [removing, setRemoving] = useState(false); // Track remove status
  const editOptionsRef = useRef(null);

  const kuasaApi = import.meta.env.VITE_REACT_APP_KUASA_API;

  const handleUploadError = (error) => {
    console.error("Error uploading photo", error);
    toast.error("Error uploading photo", {
      position: "top-center",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      theme: "dark"
    });
    setUploading(false); // Set uploading to false on error
  };

  const handleUploadClick = async () => {
    if (uploading) {
      // Prevent multiple uploads while one is in progress
      return;
    }

    try {
      if (!selectedFile) {
        toast.error("Select a photo to upload.", {
          position: "top-center",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          theme: "dark"
        });
        return;
      }

      setUploading(true); // Set uploading to true when starting the upload

      if (user.profile_image) {
        const responseDelete = await fetch(`${kuasaApi}/api/profile/image/remove/`, {
          method: "POST",
          headers: {
            Authorization: `Bearer ${accessToken}`
          }
        });

        if (!responseDelete.ok) {
          console.error("Error deleting the previous image.");
          setUploading(false); // Set uploading to false on error
          return;
        }
      }

      const formData = new FormData();
      formData.append("profile_image", selectedFile);

      const response = await fetch(`${kuasaApi}/api/profile/image/upload/`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${accessToken}`
        },
        body: formData
      });

      if (response.ok) {
        setSelectedFile(null);
        setShowEditOptions(false);
        const responseData = await response.json();
        const imageUrl = responseData.profile_image;
        const updatedUser = {...user, profile_image: imageUrl};
        updateUser(updatedUser);

        toast.success(responseData.detail, {
          position: "top-center",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          theme: "dark"
        });
      } else {
        handleUploadError(response);
      }
    } catch (error) {
      handleUploadError(error);
    } finally {
      setUploading(false); // Set uploading to false after the operation
    }
  };

  const handleRemoveClick = async () => {
    if (removing) {
      // Prevent removing the image while a remove operation is in progress
      return;
    }

    // Display a confirmation dialog
    const confirmed = window.confirm("Are you sure you want to remove your profile photo?");

    if (!confirmed) {
      return;
    }

    try {
      setRemoving(true); // Set removing to true when starting the remove operation

      const response = await fetch(`${kuasaApi}/api/profile/image/remove/`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${accessToken}`
        }
      });

      if (response.ok) {
        setSelectedFile(null);
        setShowEditOptions(false);
        const updatedUser = {...user, profile_image: null};
        updateUser(updatedUser);
      } else {
        console.error("Error removing photo", response.error);
      }
    } catch (error) {
      console.error("Error removing photo", error);
    } finally {
      setRemoving(false); // Set removing to false after the operation
    }
  };

  const handleEditClick = () => {
    setShowEditOptions(!showEditOptions);
  };

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (editOptionsRef.current && !editOptionsRef.current.contains(event.target)) {
        setShowEditOptions(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="flex flex-col items-center">
      {showEditOptions ? (
        <div
          ref={editOptionsRef}
          className="bg-primary text-white py-2 px-4 rounded cursor-pointer mt-2 w-48"
        >
          <input type="file" onChange={handleFileChange} accept=".jpg, .jpeg, .png" />
          <div className="flex flex-col mt-2">
            <button
              className={`bg-green-500 text-white rounded mb-2 ${
                uploading ? "opacity-50 pointer-events-none" : ""
              }`}
              onClick={handleUploadClick}
            >
              {uploading ? "Uploading..." : "Upload"}
            </button>
            <button
              className={`bg-red-500 text-white rounded ${
                removing ? "opacity-50 pointer-events-none" : ""
              }`}
              onClick={handleRemoveClick}
            >
              {removing ? "Removing..." : "Remove"}
            </button>
          </div>
        </div>
      ) : (
        <button onClick={handleEditClick} className="bg-primary text-white px-2 py-1 rounded mt-2">
          Edit Photo
        </button>
      )}

      <ToastContainer />
    </div>
  );
};

export default EditProfilePhoto;
