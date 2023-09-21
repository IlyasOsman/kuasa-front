import React, {useState, useEffect, useRef} from "react";
import {useAuth} from "../contexts/AuthContext";
import {ToastContainer, toast} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const EditProfilePhoto = () => {
  const {accessToken, user, updateUser} = useAuth();
  const [showEditOptions, setShowEditOptions] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const editOptionsRef = useRef(null);

  const onUpload = () => {
    // Add your logic to handle profile photo upload
    console.log("Profile photo uploaded.");
  };

  const onRemove = () => {
    // Add your logic to handle profile photo removal
    console.log("Profile photo removed.");
  };

  const handleUploadClick = async () => {
    try {
      if (!selectedFile) {
        console.error("Please select a file to upload.");
        return;
      }

      const formData = new FormData();
      formData.append("profile_image", selectedFile);

      const response = await fetch("/profile/image/upload/", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${accessToken}`
        },
        body: formData
      });

      if (response.ok) {
        // Handle success, e.g., refresh the user's profile data
        onUpload();
        setSelectedFile(null); // Clear the selected file
        setShowEditOptions(false); // Close the edit options
        updateUser(user);
      } else {
        // Handle error, e.g., display an error message
        console.error("Error uploading photo");
        toast.error("Upload coming soon!", {
          position: "top-center",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          theme: "dark"
        });

      }
    } catch (error) {
      console.error("Error uploading photo", error);
    }
  };

  const handleRemoveClick = async () => {
    try {
      const response = await fetch("api/profile/image/remove/", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${accessToken}`
        }
      });

      if (response.ok) {
        // Handle success, e.g., refresh the user's profile data
        onRemove();
        setSelectedFile(null); // Clear the selected file
        setShowEditOptions(false); // Close the edit options
        updateUser(user);
      } else {
        // Handle error, e.g., display an error message
        console.error("Error removing photo");
      }
    } catch (error) {
      console.error("Error removing photo", error);
    }
  };

  const handleEditClick = () => {
    setShowEditOptions(!showEditOptions); // Toggle the edit options
  };

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (editOptionsRef.current && !editOptionsRef.current.contains(event.target)) {
        // Clicked outside the edit options container, so close it
        setShowEditOptions(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      // Clean up the event listener when the component unmounts
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
            <button className="bg-green-500 text-white rounded mb-2" onClick={handleUploadClick}>
              Upload
            </button>
            <button className="bg-red-500 text-white rounded" onClick={handleRemoveClick}>
              Remove
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
