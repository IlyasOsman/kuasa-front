import {useAuth} from "../contexts/AuthContext";
import PropTypes from "prop-types";
import Loader from "./Loader";
import {ToastContainer, toast} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {useFormik} from "formik";
import * as Yup from "yup";
import {useState} from "react";

const AddBlog = ({setShowModal, kuasaBlogData, setKuasaBlogData}) => {
  const kuasaApi = import.meta.env.VITE_REACT_APP_KUASA_API;
  const {accessToken, user} = useAuth();
  const [isAddingBlog, setIsAddingBlog] = useState(false);

  const formik = useFormik({
    initialValues: {
      title: "",
      description: "",
      link: "",
      cover_image: null,
      is_project: false,
      author: user.pk
    },
    validationSchema: Yup.object({
      title: Yup.string().required("Title is required").max(200),
      description: Yup.string().required("Description is required").max(1000),
      link: Yup.string().required("Link is required"),
      cover_image: Yup.mixed().required("Cover image is required")
    }),
    onSubmit: (values, {setSubmitting, resetForm}) => {
      setIsAddingBlog(true);
      const formDataWithImage = new FormData();
      formDataWithImage.append("title", values.title);
      formDataWithImage.append("description", values.description);
      formDataWithImage.append("link", values.link);
      formDataWithImage.append("is_project", values.is_project);
      formDataWithImage.append("cover_image", values.cover_image);
      formDataWithImage.append("author", values.author);

      fetch(`${kuasaApi}/api/blogs/`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${accessToken}`
        },
        body: formDataWithImage
      })
        .then((response) => {
          if (response.ok) {
            return response.json();
          } else {
            throw new Error("Failed to add blog");
          }
        })
        .then((newBlogData) => {
          const updatedKuasaBlogData = [...kuasaBlogData, newBlogData];
          setKuasaBlogData(updatedKuasaBlogData);

          resetForm();

          setShowModal(false);

          setTimeout(() => {
            toast.success("Blog Added", {
              position: "top-center",
              autoClose: 3000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              theme: "dark"
            });
          }, 300);
        })
        .catch((error) => {
          console.error("Error adding blog:", error);
        })
        .finally(() => {
          setIsAddingBlog(false);
          setSubmitting(false);
        });
    }
  });

  const handleInputChange = (e) => {
    const {name, value, type} = e.target;
    const newValue = type === "checkbox" ? !formik.values.is_project : value;
    formik.setFieldValue(name, newValue);
  };

  const handleCoverImageChange = (event) => {
    const file = event.target.files[0];
    formik.setFieldValue("cover_image", file);
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="modal-container bg-gray-800 w-auto my-6 mx-auto max-w-3xl p-6 rounded-lg shadow-lg">
        <form onSubmit={formik.handleSubmit}>
          <h2 className="text-xl font-semibold mb-4 text-white">Add Blog</h2>
          <input
            type="text"
            name="title"
            value={formik.values.title}
            onChange={handleInputChange}
            onBlur={formik.handleBlur}
            placeholder="Title"
            className="block w-full px-5 py-3 mt-2 border rounded-md bg-gray-900 text-white border-gray-600 focus:border-blue-300 focus:outline-none focus:ring"
            maxLength={200}
          />
          {formik.touched.title && formik.errors.title ? (
            <div className="text-red-500">{formik.errors.title}</div>
          ) : null}

          <textarea
            type="text"
            name="description"
            value={formik.values.description}
            onChange={handleInputChange}
            onBlur={formik.handleBlur}
            placeholder="Write a brief summary of blog."
            className="block w-full px-5 py-3 mt-2 border rounded-md bg-gray-900 text-white border-gray-600 focus:border-blue-300 focus:outline-none focus:ring"
            maxLength={1000}
          />
          {formik.touched.description && formik.errors.description ? (
            <div className="text-red-500">{formik.errors.description}</div>
          ) : null}

          <input
            type="text"
            name="link"
            value={formik.values.link}
            onChange={handleInputChange}
            onBlur={formik.handleBlur}
            placeholder="Link to the blog or project."
            className="w-full px-5 py-3 mt-2 border rounded-md bg-gray-900 text-white border-gray-600 focus:border-blue-300 focus:outline-none focus:ring"
          />
          {formik.touched.link && formik.errors.link ? (
            <div className="text-red-500">{formik.errors.link}</div>
          ) : null}

          <input
            type="checkbox"
            id="is_project"
            name="is_project"
            checked={formik.values.is_project}
            onChange={handleInputChange}
            className="mr-2"
          />
          <label htmlFor="is_project" className="text-white mt-2">
            This is a project
          </label>

          <input
            type="file"
            name="cover_image"
            accept=".jpg, .jpeg, .png"
            onChange={handleCoverImageChange}
            className="w-full px-5 py-3 mt-2 border rounded-md bg-gray-900 text-white border-gray-600 focus:border-blue-300 focus:outline-none focus:ring"
          />
          {formik.touched.cover_image && formik.errors.cover_image ? (
            <div className="text-red-500">{formik.errors.cover_image}</div>
          ) : null}

          <div className="flex justify-end mt-2">
            {isAddingBlog ? (
              <Loader />
            ) : (
              <button
                type="submit"
                className="bg-blue-500 text-white px-4 py-2 rounded-lg"
                disabled={formik.isSubmitting || !formik.isValid}
              >
                Add Blog
              </button>
            )}
            <button
              onClick={() => setShowModal(false)}
              className="bg-gray-500 text-white px-4 py-2 rounded-lg mx-2"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>

      <ToastContainer />
    </div>
  );
};

AddBlog.propTypes = {
  setShowModal: PropTypes.func.isRequired,
  setKuasaBlogData: PropTypes.func.isRequired,
  kuasaBlogData: PropTypes.array.isRequired
};

export default AddBlog;
