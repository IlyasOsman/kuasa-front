import React, {useState, useEffect} from "react";
import {linkedin, whatsapp} from "../assets";
import {useAuth} from "../contexts/AuthContext";
import {Link} from "react-router-dom";

const MemberTable = () => {
  const [originalData, setOriginalData] = useState([]); // Store the original data
  const [data, setData] = useState([]); // Initialize with an empty array
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const {accessToken} = useAuth();

  const itemsPerPage = 10;
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedData = data.slice(startIndex, endIndex);
  const kuasaApi = import.meta.env.VITE_REACT_APP_KUASA_API;

  // Function to handle page navigation
  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  // Function to handle search input change
  const handleSearchChange = (e) => {
    const searchTerm = e.target.value.toLowerCase();
    setSearchTerm(searchTerm);

    // Filter data based on the search term
    const filteredData = originalData.filter(
      (item) =>
        item.first_name.toLowerCase().includes(searchTerm) ||
        item.last_name.toLowerCase().includes(searchTerm)
    );

    setCurrentPage(1);
    setData(filteredData);
  };

  // Use useEffect to fetch data from the API when the component mounts
  useEffect(() => {
    // Fetch data from the API using the appropriate endpoint and headers
    fetch(`${kuasaApi}/api/members/`, {
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    })
      .then((response) => response.json())
      .then((apiData) => {
        setOriginalData(apiData); // Store the original data
        setData(apiData); // Update the data state with fetched data
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []); // Empty dependency array ensures the effect runs only once when the component mounts

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth" // You can change this to "auto" for instant scrolling
    });
  };

  // Function to capitalize the first letter of a string
  const capitalize = (str) => {
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
  };

  return (
    <div className="flex flex-col mt-6">
      {/* Search input */}
      <div className="mb-4">
        <input
          type="text"
          placeholder="Search by first name or last name"
          value={searchTerm}
          onChange={handleSearchChange}
          className="px-4 py-2 border border-secondary text-white rounded-md bg-transparent"
        />
      </div>

      <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">
          <div className="overflow-hidden">
            <table className="min-w-full text-left text-sm font-light">
              {/* Table header here */}
              <thead className="border-b font-medium border-neutral-500 text-secondary">
                <tr>
                  <th scope="col" className="px-6 py-4">
                    First
                  </th>
                  <th scope="col" className="px-6 py-4">
                    Last
                  </th>
                  <th scope="col" className="px-6 py-4">
                    Linkedin
                  </th>
                  <th scope="col" className="px-6 py-4">
                    WhatsApp
                  </th>
                </tr>
              </thead>
              <tbody>
                {paginatedData.map((row) => (
                  <tr
                    key={row.pk}
                    className="border-b border-neutral-500 text-white cursor-pointer hover:bg-gray-900"
                  >
                    <td className="whitespace-nowrap px-6 py-4 hover:text-secondary">
                      <Link to={`/members/${row.pk}`} onClick={scrollToTop}>
                        {capitalize(row.first_name)}
                      </Link>
                    </td>
                    <td className="whitespace-nowrap px-6 py-4 hover:text-secondary">
                      <Link to={`/members/${row.pk}`} onClick={scrollToTop}>
                        {capitalize(row.last_name)}
                      </Link>
                    </td>
                    <td className="whitespace-nowrap px-6 py-4">
                      {row.linkedin && ( // Check if row.linkedin is not null or empty
                        <a href={row.linkedin} target="_blank" rel="noopener noreferrer">
                          <img src={linkedin} alt="LinkedIn" width={24} height={24} />
                        </a>
                      )}
                    </td>
                    <td className="whitespace-nowrap px-6 py-4">
                      {row.phone_number && ( // Check if row.phone_number is not null or empty
                        <a
                          href={`https://api.whatsapp.com/send/?phone=${row.phone_number}`}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <img src={whatsapp} alt="WhatsApp" width={24} height={24} />
                        </a>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Pagination */}
      <div className="flex justify-center mt-4">
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="px-4 py-2 mr-2 bg-blue-500 text-white rounded"
        >
          Previous
        </button>
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={endIndex >= data.length}
          className="px-4 py-2 bg-blue-500 text-white rounded"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default MemberTable;
