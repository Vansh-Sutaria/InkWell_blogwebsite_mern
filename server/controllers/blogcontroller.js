const Blog = require('../models/Blog');

const createBlog = async (req, res) => {
  const { title, content } = req.body;

  // Use a dummy user ID (replace with a valid user ID from your database)
  const dummyUserId = '64d35e0e8c28d5d816fba69a'; // Example ObjectId, replace it with a valid ID

  const blog = new Blog({
    title,
    content,
    user: dummyUserId,  // Dummy user ID for testing
  });

  try {
    const createdBlog = await blog.save();
    res.status(201).json(createdBlog);
    
  } catch (error) {
    console.error('Error creating blog:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

const getBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find({}).populate('user', 'username');
    res.json(blogs);
  } catch (error) {
    console.error('Error fetching blogs:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

const getBlogById = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id).populate('user', 'username');
    if (blog) {
      res.json(blog);
    } else {
      res.status(404).json({ message: 'Blog not found' });
    }
  } catch (error) {
    console.error('Error fetching blog by ID:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

module.exports = { createBlog, getBlogs, getBlogById };
