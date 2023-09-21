import React, {useState, useEffect} from "react";
import {placeholderprofileimage, linkedin} from "../assets";
import BlogCard from "./BlogCard";
import styles from "../style";
import MemberTable from "./MemberTable";
import {useAuth} from "../contexts/AuthContext";
import {useParams} from "react-router-dom";
import Loader from "./Loader";

const kuasaApi = import.meta.env.VITE_REACT_APP_KUASA_API;

const MemberProfile = () => {
  const {accessToken} = useAuth();
  const {pk} = useParams();
  const [member, setMember] = useState(null);

  useEffect(() => {
    // Replace with your actual API endpoint
    fetch(`${kuasaApi}/api/members/${pk}/`, {
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        setMember(data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, [accessToken, pk]);

  if (!member) {
    return <Loader />;
  }

  return (
    <section className={`${styles.flexCenter} ${styles.marginY} ${styles.marginX}`}>
      <div className={`${styles.boxWidth}`}>
        <div className="md:flex md:-mx-2">
          {/* Left Side */}
          <div className="w-full md:w-3/12 md:mx-2 md:flex-shrink-0">
            {member && (
              <div className="bg-gray-900 p-3 border-t-4 border-secondary rounded-md">
                <div className="image overflow-hidden flex justify-start">
                  {member.profile_image !== null ? (
                    <img
                      className="h-48 w-48 border-2 border-secondary rounded-full"
                      src={member.profile_image}
                      alt=""
                    />
                  ) : (
                    <img
                      className="h-48 w-48 border-2 border-secondary rounded-full"
                      src={placeholderprofileimage}
                      alt=""
                    />
                  )}
                </div>

                <h1 className="text-secondary font-bold text-xl leading-8 my-1">{`${member.first_name} ${member.last_name}`}</h1>
                <p className="text-sm text-secondary hover:text-dimWhite leading-6">{member.bio}</p>
                <ul className="bg-black-gradient-2 text-white py-2 px-3 mt-3 rounded shadow-sm divide-y">
                  {member.leadership_role && (
                    <li className="flex items-center py-3">
                      <span className="text-secondary font-bold">{member.leadership_role}</span>
                    </li>
                  )}

                  {member.is_corporate_member && (
                    <li className="flex items-center py-3">
                      <span className="text-secondary font-bold">
                        {member.is_corporate_member ? "Corporate Member" : null}
                      </span>
                    </li>
                  )}

                  <li className="flex items-center py-3">
                    <span>Member</span>
                    <span className="ml-auto">
                      <span
                        className={`bg-${
                          member.is_member ? "green" : "red"
                        }-500 py-1 px-2 text-white rounded text-sm`}
                      >
                        {member.is_member ? "YES" : "NO"}
                      </span>
                    </span>
                  </li>
                  {/* Add other profile data here */}
                </ul>
              </div>
            )}
          </div>
          {/* End of Left Side */}

          {/* Right Side */}
          <div className="w-full md:w-9/12 mx-2 mt-4 md:mt-0">
            {member && (
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
                      <div className="px-4 py-2">{member.first_name}</div>
                    </div>
                    <div className="grid grid-cols-2">
                      <div className="px-4 py-2 font-semibold">Last Name</div>
                      <div className="px-4 py-2">{member.last_name}</div>
                    </div>
                    <div className="grid grid-cols-2">
                      <div className="px-4 py-2 font-semibold">Email</div>
                      <div className="px-4 py-2">
                        <a
                          className="text-blue-800 whitespace-normal break-words"
                          href={`mailto:${member.email}`}
                        >
                          {member.email}
                        </a>
                      </div>
                    </div>
                    <div className="grid grid-cols-2">
                      <div className="px-4 py-2 font-semibold">Contact No.</div>
                      <div className="px-4 py-2">{member.phone_number}</div>
                    </div>
                    <div className="grid grid-cols-2">
                      <div className="px-4 py-2 font-semibold">Linkedin</div>
                      <div className="px-4 py-2">
                        {member.linkedin && (
                          <a href={member.linkedin} target="_blank" rel="noopener noreferrer">
                            <img src={linkedin} alt="LinkedIn" width={24} height={24} />
                          </a>
                        )}
                      </div>
                    </div>
                    <div className="grid grid-cols-2">
                      <div className="px-4 py-2 font-semibold">Projects & Blogs</div>
                      <div className="px-4 py-2">0</div>
                    </div>
                    <div className="grid grid-cols-2">
                      <div className="px-4 py-2 font-semibold">Alternative Email</div>
                      <div className="px-4 py-2">
                        <a
                          className="text-blue-800 whitespace-normal break-words"
                          href={`mailto:${member.alternative_email}`}
                        >
                          {member.alternative_email}
                        </a>
                      </div>
                    </div>
                    <div className="grid grid-cols-2">
                      <div className="px-4 py-2 font-semibold">Year of study</div>
                      <div className="px-4 py-2">
                        {member.year_of_study === 6 ? "Alumni" : member.year_of_study}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
            {/* End of About Section */}

            {/* Blogs and Projects Section */}
            {member && (
              <div className="mt-4 bg-grey-900 p-3 shadow-sm rounded-md flex flex-col">
                <div className="flex items-center space-x-2 font-semibold text-white leading-8 mb-3">
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
                  <span className="tracking-wide">Blogs and Projects</span>
                </div>
                <div className="mt-2 space-y-4 flex-grow">
                  {/* Sample Blog/Project */}
                  <BlogCard />
                  {/* Add more Blog/Project components here */}
                </div>
              </div>
            )}
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

export default MemberProfile;
