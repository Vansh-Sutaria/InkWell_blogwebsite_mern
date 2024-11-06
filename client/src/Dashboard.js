// import React, { useState } from "react";
// import "./Dashboard.css";
// import Navbar from "./Navbar";

// function Dashboard() {
//   const blogs = new Array(9).fill({
//     title: "BLOG TITLE",
//     description:
//       "BLOG DESCRIPTION: LKASDJFLKSAJDFOAJFOIAEJFOEMOFSODFJEOIJF OIEFJOIEFJOIWEFJIOEFJOIEFJOEIJFOIEJFOIEDJFIOEEJ FIOEJFIOEWFJFOIEOJFOIEJFIOEJFWEOJFIOWEJFOIEWJ FIOWEJFIOWEJFIOEWFJFOIEWJFIOIEWJFIOIEWJ",
//     author: "BY NAME OF THE AUTHOR",
//     views: "1.2M",
//     likes: "2.7k",
//     authorImg: "/path-to-author-image.jpg", // Replace with the actual image path
//   });

//   const [currentPage, setCurrentPage] = useState(1);
//   const blogsPerPage = 6;

//   // Pagination logic
//   const indexOfLastBlog = currentPage * blogsPerPage;
//   const indexOfFirstBlog = indexOfLastBlog - blogsPerPage;
//   const currentBlogs = blogs.slice(indexOfFirstBlog, indexOfLastBlog);

//   const nextPage = () => {
//     if (currentPage * blogsPerPage < blogs.length) {
//       setCurrentPage((prevPage) => prevPage + 1);
//     }
//   };

//   const prevPage = () => {
//     if (currentPage > 1) {
//       setCurrentPage((prevPage) => prevPage - 1);
//     }
//   };

//   return (
//     <div className="dashboard-container">
//       <Navbar/>
//       <h2>Popular Blogs</h2>
//       <div className="blogs-grid">
//         {currentBlogs.map((blog, index) => (
//           <div key={index} className="blog-card">
//             <h3>{blog.title}</h3>
//             <p>{blog.description}</p>
//             <div className="blog-footer">
//               <div className="blog-author">
//                 <img
//                   src={blog.authorImg}
//                   alt="Author"
//                   className="author-image"
//                 />
//                 <span>{blog.author}</span>
//               </div>
//               <div className="blog-stats">
//                 <span>VIEWS: {blog.views}</span>
//                 <span className="likes">
//                   <span role="img" aria-label="heart">
//                     ❤️
//                   </span>{" "}
//                   {blog.likes}
//                 </span>
//               </div>
//             </div>
//           </div>
//         ))}
//       </div>
//       <div className="pagination">
//         <button onClick={prevPage} disabled={currentPage === 1}>
//           Previous
//         </button>
//         <button
//           onClick={nextPage}
//           disabled={currentPage * blogsPerPage >= blogs.length}
//         >
//           Next
//         </button>
//       </div>
//     </div>
//   );
// }

// export default Dashboard;


import React, { useState, useEffect } from "react";
import "./Dashboard.css";
import Navbar from "./Navbar";

function Dashboard() {
  const [blogs, setBlogs] = useState([]); // State to hold fetched blogs
  const [loading, setLoading] = useState(true); // State for loading indicator
  const [error, setError] = useState(null); // State for error handling
  const [currentPage, setCurrentPage] = useState(1);
  const blogsPerPage = 6;

  // Fetch blogs from the backend
  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/blogs"); // Adjust to your actual API endpoint
        if (!response.ok) {
          throw new Error("Failed to fetch blogs");
        }
        const data = await response.json();
        setBlogs(data); // Update the state with fetched blogs
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false); // Set loading to false after fetching is done
      }
    };

    fetchBlogs();
  }, []);

  // Pagination logic
  const indexOfLastBlog = currentPage * blogsPerPage;
  const indexOfFirstBlog = indexOfLastBlog - blogsPerPage;
  const currentBlogs = blogs.slice(indexOfFirstBlog, indexOfLastBlog);

  const nextPage = () => {
    if (currentPage * blogsPerPage < blogs.length) {
      setCurrentPage((prevPage) => prevPage + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prevPage) => prevPage - 1);
    }
  };

  return (
    <div className="dashboard-container">
      <Navbar />
      <h2>Popular Blogs</h2>
      {loading && <div>Loading...</div>} {/* Show loading message */}
      {error && <div>Error: {error}</div>} {/* Show error message */}
      {blogs.length === 0 && !loading && !error && ( // Check for no blogs only if not loading and no error
        <div>No blogs available.</div>
      )}
      {blogs.length > 0 && ( // Only render blogs if there are any
        <div className="blogs-grid">
          {currentBlogs.map((blog, index) => (
            <div key={index} className="blog-card">
              <h3>{blog.title}</h3>
              <p>{blog.description}</p>
              <div className="blog-footer">
                <div className="blog-author">
                  <img
                    src={blog.authorImg}
                    alt="Author"
                    className="author-image"
                  />
                  <span>{blog.author}</span>
                </div>
                <div className="blog-stats">
                  <span>VIEWS: {blog.views}</span>
                  <span className="likes">
                    <span role="img" aria-label="heart">
                      ❤️
                    </span>{" "}
                    {blog.likes}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
      <div className="pagination">
        <button onClick={prevPage} disabled={currentPage === 1}>
          Previous
        </button>
        <button
          onClick={nextPage}
          disabled={currentPage * blogsPerPage >= blogs.length}
        >
          Next
        </button>
      </div>
    </div>
  );
}

export default Dashboard;
