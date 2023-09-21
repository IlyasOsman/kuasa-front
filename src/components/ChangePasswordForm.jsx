import React from "react";
import {useFormik} from "formik";
import * as Yup from "yup";
import PropTypes from "prop-types"; // Added PropTypes
import {useAuth} from "../contexts/AuthContext";
import {ToastContainer, toast} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const kuasaApi = import.meta.env.VITE_REACT_APP_KUASA_API;

const ProfileEditForm = ({onCancel, onSave}) => {
  const {accessToken} = useAuth();

  const validationSchema = Yup.object({
    old_password: Yup.string().required("Old Password is required"),
    new_password: Yup.string()
      .min(6, "New Password must be at least 6 characters")
      .required("New Password is required"),
    confirm_new_password: Yup.string()
      .oneOf([Yup.ref("new_password"), null], "Passwords must match")
      .required("Confirm New Password is required")
  });

  const formik = useFormik({
    initialValues: {
      old_password: "",
      new_password: "",
      confirm_new_password: ""
    },
    validationSchema,
    onSubmit: async (values) => {
      try {
        const response = await fetch(`${kuasaApi}/api/profile/change_password/`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`
          },
          body: JSON.stringify(values)
        });

        if (response.ok) {
          onSave(values);

          toast.success("Password successfully changed!", {
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
          // Handle errors
          const errorData = await response.json();
          toast.error(errorData.detail, {
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark"
          });
        }
      } catch (error) {
        console.error("Error updating password", error);
        toast.error(error, {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark"
        });
      }
    }
  });

  return (
    <form onSubmit={formik.handleSubmit} className="">
      <div className="mb-4">
        <label className="block mb-2 text-sm text-white">Old Password</label>
        <input
          type="password" // Changed input type to password
          name="old_password"
          placeholder="Old Password"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.old_password}
          className="block w-full py-3 px-10 focus:ring-opacity-40 border rounded-md bg-gray-900 text-gray-300 border-gray-600 focus:border-blue-300 focus:outline-none focus:ring"
        />
        {formik.touched.old_password && formik.errors.old_password && (
          <div className="text-red-500 text-sm mt-1">{formik.errors.old_password}</div>
        )}
      </div>

      <div className="mb-4">
        <label className="block mb-2 text-sm text-white">New Password</label>
        <input
          type="password" // Changed input type to password
          name="new_password"
          placeholder="New Password"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.new_password}
          className="block w-full py-3 px-10 focus:ring-opacity-40 border rounded-md bg-gray-900 text-gray-300 border-gray-600 focus:border-blue-300 focus:outline-none focus:ring"
        />
        {formik.touched.new_password && formik.errors.new_password && (
          <div className="text-red-500 text-sm mt-1">{formik.errors.new_password}</div>
        )}
      </div>

      <div className="mb-4">
        <label className="block mb-2 text-sm text-white">Confirm New Password</label>
        <input
          type="password" // Changed input type to password
          name="confirm_new_password"
          placeholder="Confirm New Password"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.confirm_new_password}
          className="block w-full py-3 px-10 focus:ring-opacity-40 border rounded-md bg-gray-900 text-gray-300 border-gray-600 focus:border-blue-300 focus:outline-none focus:ring"
        />
        {formik.touched.confirm_new_password && formik.errors.confirm_new_password && (
          <div className="text-red-500 text-sm mt-1">{formik.errors.confirm_new_password}</div>
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
  onCancel: PropTypes.func.isRequired,
  onSave: PropTypes.func.isRequired
};

export default ProfileEditForm;
