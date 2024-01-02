import React, {useState} from "react";
import {placeholderprofileimage} from "../assets";
import styles from "../style";
import MemberTable from "./MemberTable";
import {useAuth} from "../contexts/AuthContext";
import ProfileEditForm from "./ProfileEditForm";
import ChangePasswordForm from "./ChangePasswordForm";
import EditProfilePhoto from "./EditProfilePhoto";
import {linkedin} from "../assets";
import Loader from "./Loader";

const Profile = () => {
  const {user} = useAuth();
  const [isEditMode, setIsEditMode] = useState(false);
  const [isChangePasswordMode, setIsChangePasswordMode] = useState(false);

  if (!user) {
    // Handle the case where user is null or undefined
    return <Loader />;
  }

  const toggleEditMode = () => {
    setIsEditMode(!isEditMode);
  };

  const toggleIsChangePasswordMode = () => {
    setIsChangePasswordMode(!isChangePasswordMode);
  };

  // Function to capitalize the first letter of a string
  const capitalize = (str) => {
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
  };

  const capitalizedFirstName = capitalize(user.first_name);
  const capitalizedLastName = capitalize(user.last_name);

  return (
    <section className={`${styles.flexCenter} ${styles.marginY} ${styles.marginX}`}>
      <div className={`${styles.boxWidth}`}>
        <div className="md:flex md:-mx-2">
          {/* Left Side */}
          <div className="w-full md:w-3/12 md:mx-2 md:flex-shrink-0">
            {/* Profile Card */}

            <div className="bg-gray-900 p-3 border-t-4 border-secondary rounded-md">
              <div className="relative overflow-hidden flex justify-start">
                {user.profile_image !== null ? (
                  <img
                    className="h-48 w-48 border-2 border-secondary rounded-full"
                    src={user.profile_image}
                    alt=""
                  />
                ) : (
                  <img
                    className="h-48 w-48 border-2 border-secondary rounded-full"
                    src={placeholderprofileimage}
                    alt=""
                  />
                )}
                <div className="absolute bottom-2 right-2">
                  <EditProfilePhoto />
                </div>
              </div>

              <h1 className="text-secondary font-bold text-xl leading-8 my-1">{`${capitalizedFirstName} ${capitalizedLastName}`}</h1>
              <p className="text-sm text-white hover:text-dimWhite leading-6">{user.bio}</p>
              <ul className="bg-black-gradient-2 text-white py-2 px-3 mt-3 rounded shadow-sm divide-y">
                {user.leadership_role && (
                  <li className="flex items-center py-3">
                    <span className="text-secondary font-bold">{user.leadership_role}</span>
                  </li>
                )}

                {user.is_corporate_member && (
                  <li className="flex items-center py-3">
                    <span className="text-secondary font-bold">
                      {user.is_corporate_member ? "Corporate Member" : null}
                    </span>
                  </li>
                )}

                <li className="flex items-center py-3">
                  <span>Member</span>
                  <span className="ml-auto">
                    <span
                      className={`bg-${
                        user.is_member ? "green" : "red"
                      }-500 py-1 px-2 text-white rounded text-sm`}
                    >
                      {user.is_member ? "YES" : "NO"}
                    </span>
                  </span>
                </li>
                {/* Add other profile data here */}
              </ul>
            </div>
            {/* End of Profile Card */}
            <div
              className={`bg-black-gradient-2 text-white hover:text-gray-700 hover:shadow py-2 px-3 mt-3 divide-y rounded shadow-sm ${
                isEditMode ? "cursor-default" : "cursor-pointer"
              }`}
              onClick={!isEditMode ? toggleEditMode : undefined}
            >
              {isEditMode ? (
                // Render ProfileEditForm when in edit mode
                <ProfileEditForm user={user} onCancel={toggleEditMode} onSave={toggleEditMode} />
              ) : (
                <button className="font-bold">Edit Profile</button>
              )}
            </div>

            <div
              className={`bg-black-gradient-2 text-white hover:text-gray-700 hover:shadow py-2 px-3 mt-3 divide-y rounded shadow-sm ${
                isEditMode ? "cursor-default" : "cursor-pointer"
              }`}
              onClick={!isChangePasswordMode ? toggleIsChangePasswordMode : undefined}
            >
              {isChangePasswordMode ? (
                // Render ChangePasswordForm when in edit mode
                <ChangePasswordForm
                  user={user}
                  onCancel={toggleIsChangePasswordMode}
                  onSave={toggleIsChangePasswordMode}
                />
              ) : (
                <button className="font-bold">Change Password</button>
              )}
            </div>
          </div>
          {/* End of Left Side */}

          {/* Right Side */}
          <div className="w-full md:w-9/12 mx-2 mt-4 md:mt-0">
            {/* About Section */}
            <div className="bg-gray-900 p-3 shadow-sm rounded-md">
              <div className="flex items-center space-x-2 font-semibold text-white leading-8">
                <span className="text-secondary">
                  <svg
                    className="h-5"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                    />
                  </svg>
                </span>
                <span className="tracking-wide">About</span>
              </div>
              <div className="text-white">
                <div className="grid md:grid-cols-2 text-sm">
                  {/* Populate the rest of the profile data using user properties */}
                  <div className="grid grid-cols-2">
                    <div className="px-4 py-2 font-semibold">First Name</div>
                    <div className="px-4 py-2">{capitalizedFirstName}</div>
                  </div>
                  <div className="grid grid-cols-2">
                    <div className="px-4 py-2 font-semibold">Last Name</div>
                    <div className="px-4 py-2">{capitalizedLastName}</div>
                  </div>
                  <div className="grid grid-cols-2">
                    <div className="px-4 py-2 font-semibold">Email</div>
                    <div className="px-4 py-2">
                      <a
                        className="text-blue-800 whitespace-normal break-words"
                        href={`mailto:${user.email}`}
                      >
                        {user.email}
                      </a>
                    </div>
                  </div>
                  <div className="grid grid-cols-2">
                    <div className="px-4 py-2 font-semibold">Contact No.</div>
                    <div className="px-4 py-2">+{user.phone_number}</div>
                  </div>
                  <div className="grid grid-cols-2">
                    <div className="px-4 py-2 font-semibold">Linkedin</div>
                    <div className="px-4 py-2">
                      {user.linkedin && (
                        <a href={user.linkedin} target="_blank" rel="noopener noreferrer">
                          <img src={linkedin} alt="LinkedIn" width={24} height={24} />
                        </a>
                      )}
                    </div>
                  </div>
                  <div className="grid grid-cols-2">
                    <div className="px-4 py-2 font-semibold">Alternative Email</div>
                    <div className="px-4 py-2">
                      <a
                        className="text-blue-800 whitespace-normal break-words"
                        href={`mailto:${user.alternative_email}`}
                      >
                        {user.alternative_email}
                      </a>
                    </div>
                  </div>
                  <div className="grid grid-cols-2">
                    <div className="px-4 py-2 font-semibold">Year of study</div>
                    <div className="px-4 py-2">
                      {user.year_of_study === 6 ? "Alumni" : user.year_of_study}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* End of About Section */}

            {/* End of Blogs and Projects Section */}

            {/* Other Members Section */}
            <div className="bg-grey-900 p-3 hover:shadow mt-4 rounded-md">
              <div className="flex items-center space-x-3 font-semibold text-white text-xl leading-8">
                <span className="text-secondary">
                  <svg
                    className="h-5 fill-current"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                    />
                  </svg>
                </span>
                <span>Other Members</span>
              </div>
              <MemberTable />
            </div>
            {/* End of Other Members Section */}
          </div>
          {/* End of Right Side */}
        </div>
      </div>
    </section>
  );
};

export default Profile;
