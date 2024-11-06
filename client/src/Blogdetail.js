import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './Blogdetail.css'; // You can create a CSS file for styling

const BlogList = () => {
  const [blogs, setBlogs] = useState([]); // State to hold the list of blogs
  const [loading, setLoading] = useState(true); // State for loading

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/blogs'); // Fetch all blogs from the server
        if (!response.ok) {
          throw new Error('Failed to fetch blogs');
        }
        const data = await response.json();
        setBlogs(data); // Set the fetched blogs to state
      } catch (error) {
        console.error('Error fetching blogs:', error);
      } finally {
        setLoading(false); // Set loading to false after fetching
      }
    };

    fetchBlogs(); // Call the fetch function
  }, []); // Empty dependency array means this runs once when the component mounts

  if (loading) {
    return <div>Loading...</div>; // Show loading state while fetching
  }

  return (
    <div className="blog-list-container">
      <h1>All Blogs</h1>
      <ul className="blog-list">
        {blogs.map((blog) => (
          <li key={blog._id} className="blog-item">
            <Link to={`/blogs/${blog._id}`}>
              <h2>{blog.title}</h2>
              <p>{blog.content.slice(0, 100)}...</p> {/* Display a snippet of the content */}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default BlogList;