  //blogroutes.js
const express = require('express');
const { createBlog, getBlogs, getBlogById } = require('../controllers/blogcontroller');
const router = express.Router();

router.route('/')
  .post(createBlog)
  .get(getBlogs);

router.route('/:id')
  .get(getBlogById);

module.exports = router;
