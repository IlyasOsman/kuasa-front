import React, {useState} from "react";
import {useFormik} from "formik";
import * as Yup from "yup";
import PropTypes from "prop-types";
import {useAuth} from "../contexts/AuthContext";
import {ToastContainer, toast} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const kuasaApi = import.meta.env.VITE_REACT_APP_KUASA_API;

const ProfileEditForm = ({user, onCancel, onSave}) => {
  const {accessToken, updateUser} = useAuth();
  const validationSchema = Yup.object({
    first_name: Yup.string(),
    last_name: Yup.string(),
    // email: Yup.string().email("Invalid email address").required("Email is required"),
    alternative_email: Yup.string().nullable().email("Invalid email address"),
    registration_no: Yup.string().matches(
      /^J\d{1,3}[A-Za-z]?\/\d{4,5}\/(201[0-9]|202[0-9]|2030)$/,
      "Invalid registration number format"
    ),
    phone_number: Yup.string().matches(/^(?![+])[0-9]{12,14}$/, "Invalid phone number"),
    year_of_study: Yup.number()
      .min(1, "Year of study cannot be less than 1")
      .max(6, "Year of study cannot be greater than 6"),
    linkedin: Yup.string(),
    bio: Yup.string().max(100, "Bio must be at most 100 characters")
  });

  const initialValues = {
    first_name: user.first_name || "",
    last_name: user.last_name || "",
    // email: user.email || "",
    alternative_email: user.alternative_email || null,
    registration_no: user.registration_no || "",
    phone_number: user.phone_number || "",
    year_of_study: user.year_of_study || "",
    linkedin: user.linkedin || "",
    bio: user.bio || ""
  };

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: async (values) => {
      try {
        const response = await fetch(`${kuasaApi}/api/profile/`, {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}` // Include the accessToken in headers
          },
          body: JSON.stringify(values) // Send the updated values as JSON
        });

        if (response.ok) {
          // If the request is successful, call onSave
          onSave(values);
          // Manually update the user object in the AuthContext
          updateUser({...user, ...values});

          toast.success("Profile updated successfully!", {
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark"
          });
        } else {
          // Handle any errors here, e.g., show an error message to the user
          console.error("Error updating profile");
          // Handle errors
          const errorData = await response.json();
          console.error("Error:", errorData);
          // Set form errors
          formik.setErrors(errorData);
        }
      } catch (error) {
        console.error("Error updating profile", error);
      }
    }
  });

  const [charCount, setCharCount] = useState(formik.values.bio.length);

  const handleBioChange = (e) => {
    const bioValue = e.target.value;
    setCharCount(bioValue.length);
    formik.handleChange(e);
  };

  return (
    <form onSubmit={formik.handleSubmit} className="">
      <div className="mb-4">
        <label className="block mb-2 text-sm text-white">First Name</label>
        <input
          type="text"
          name="first_name"
          placeholder="First name"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.first_name}
          className="block w-full py-3 px-10 focus:ring-opacity-40 border rounded-md bg-gray-900 text-gray-300 border-gray-600 focus:border-blue-300 focus:outline-none focus:ring"
        />
        {formik.touched.first_name && formik.errors.first_name && (
          <div className="text-red-500 text-sm mt-1">{formik.errors.first_name}</div>
        )}
      </div>

      <div className="mb-4">
        <label className="block mb-2 text-sm text-white">Last Name</label>
        <input
          type="text"
          name="last_name"
          placeholder="Last name"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.last_name}
          className="block w-full py-3 px-10 focus:ring-opacity-40 border rounded-md bg-gray-900 text-gray-300 border-gray-600 focus:border-blue-300 focus:outline-none focus:ring"
        />
        {formik.touched.last_name && formik.errors.last_name && (
          <div className="text-red-500 text-sm mt-1">{formik.errors.last_name}</div>
        )}
      </div>

      {/* <div className="mb-4">
        <label className="block mb-2 text-sm text-white">Email</label>
        <input
          type="email"
          name="email"
          placeholder="Email"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.email}
          className="block w-full py-3 px-10 focus:ring-opacity-40 border rounded-md bg-gray-900 text-gray-300 border-gray-600 focus:border-blue-300 focus:outline-none focus:ring"
        />
        {formik.touched.email && formik.errors.email && (
          <div className="text-red-500 text-sm mt-1">{formik.errors.email}</div>
        )}
      </div> */}

      <div className="mb-4">
        <label className="block mb-2 text-sm text-white">Alternative Email</label>
        <input
          type="email"
          name="alternative_email"
          placeholder="Alternative Email"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.alternative_email}
          className="block w-full py-3 px-10 focus:ring-opacity-40 border rounded-md bg-gray-900 text-gray-300 border-gray-600 focus:border-blue-300 focus:outline-none focus:ring"
        />
        {formik.touched.alternative_email && formik.errors.alternative_email && (
          <div className="text-red-500 text-sm mt-1">{formik.errors.alternative_email}</div>
        )}
      </div>

      <div className="mb-4">
        <label className="block mb-2 text-sm text-white">Reg No.</label>
        <input
          type="text"
          name="registration_no"
          placeholder="Registration No"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.registration_no}
          className="block w-full py-3 px-10 focus:ring-opacity-40 border rounded-md bg-gray-900 text-gray-300 border-gray-600 focus:border-blue-300 focus:outline-none focus:ring"
        />
        {formik.touched.registration_no && formik.errors.registration_no && (
          <div className="text-red-500 text-sm mt-1">{formik.errors.registration_no}</div>
        )}
      </div>

      <div className="mb-4">
        <label className="block mb-2 text-sm text-white">Phone Number</label>
        <input
          type="text"
          name="phone_number"
          placeholder="2547xx-xx-xx"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.phone_number}
          className="block w-full py-3 px-10 focus:ring-opacity-40 border rounded-md bg-gray-900 text-gray-300 border-gray-600 focus:border-blue-300 focus:outline-none focus:ring"
        />
        {formik.touched.phone_number && formik.errors.phone_number && (
          <div className="text-red-500 text-sm mt-1">{formik.errors.phone_number}</div>
        )}
      </div>

      <div className="mb-4">
        <label className="block mb-2 text-sm text-white">Year of Study</label>
        <input
          type="text"
          name="year_of_study"
          placeholder="Year of Study"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.year_of_study}
          className="block w-full py-3 px-10 focus:ring-opacity-40 border rounded-md bg-gray-900 text-gray-300 border-gray-600 focus:border-blue-300 focus:outline-none focus:ring"
        />
        {formik.touched.year_of_study && formik.errors.year_of_study && (
          <div className="text-red-500 text-sm mt-1">{formik.errors.year_of_study}</div>
        )}
      </div>

      <div className="mb-4">
        <label className="block mb-2 text-sm text-white">Linkedin link</label>
        <input
          type="text"
          name="linkedin"
          placeholder="LinkedIn"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.linkedin}
          className="block w-full py-3 px-10 focus:ring-opacity-40 border rounded-md bg-gray-900 text-gray-300 border-gray-600 focus:border-blue-300 focus:outline-none focus:ring"
        />
        {formik.touched.linkedin && formik.errors.linkedin && (
          <div className="text-red-500 text-sm mt-1">{formik.errors.linkedin}</div>
        )}
      </div>

      <div className="mb-4">
        <label className="block mb-2 text-sm text-white">Bio</label>
        <div className="relative">
          <textarea
            name="bio"
            placeholder="Bio (limited to 100 characters)"
            onChange={handleBioChange}
            onBlur={formik.handleBlur}
            value={formik.values.bio}
            maxLength={100}
            className="block w-full py-3 px-10 focus:ring-opacity-40 border rounded-md bg-gray-900 text-gray-300 border-gray-600 focus:border-blue-300 focus:outline-none focus:ring"
          />
          <div className="absolute right-2 bottom-2 text-gray-400 text-xs">
            {charCount}/{100}
          </div>
        </div>
        {formik.touched.bio && formik.errors.bio && (
          <div className="text-red-500 text-sm mt-1">{formik.errors.bio}</div>
        )}
      </div>

      <div className="flex justify-end">
        <button
          type="submit"
          className="bg-secondary text-white py-2 px-4 rounded hover:bg-secondary-dark"
        >
          Save
        </button>
        <button
          type="button"
          onClick={onCancel}
          className="bg-gray-400 text-gray-800 py-2 px-4 rounded ml-2 hover:bg-gray-500"
        >
          Cancel
        </button>
      </div>

      <ToastContainer />
    </form>
  );
};

ProfileEditForm.propTypes = {
  user: PropTypes.shape({
    first_name: PropTypes.string,
    last_name: PropTypes.string,
    email: PropTypes.string,
    alternative_email: PropTypes.string,
    registration_no: PropTypes.string,
    phone_number: PropTypes.string,
    year_of_study: PropTypes.number,
    linkedin: PropTypes.string,
    bio: PropTypes.string
  }).isRequired,
  onCancel: PropTypes.func.isRequired,
  onSave: PropTypes.func.isRequired
};

export default ProfileEditForm;
