import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import { Editor, EditorState, RichUtils } from 'draft-js';
import 'draft-js/dist/Draft.css';
import { stateToHTML } from 'draft-js-export-html';
import './Createblog.css';

function CreateBlog() {
  const [title, setTitle] = useState('');
  const [editorState, setEditorState] = useState(EditorState.createEmpty());
  const navigate = useNavigate(); // Initialize useNavigate

  const handleSubmit = async (e) => {
    e.preventDefault();

    const content = stateToHTML(editorState.getCurrentContent());
    const blog = { title, content };

    try {
      const response = await fetch('http://localhost:5000/api/blogs', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify(blog),
      });

      if (response.ok) {
        alert('Blog created successfully!');
        // Redirect to the dashboard after successful creation
        navigate('/dashboard'); // Change this to your dashboard route
      } else {
        const errorData = await response.json();
        alert(`Error: ${errorData.message}`);
      }
    } catch (error) {
      console.error('Error creating blog:', error);
      alert('There was an error creating the blog. Please try again.');
    }
  };

  const handleKeyCommand = (command) => {
    const newState = RichUtils.handleKeyCommand(editorState, command);
    if (newState) {
      setEditorState(newState);
      return 'handled';
    }
    return 'not-handled';
  };

  const onBoldClick = () => {
    setEditorState(RichUtils.toggleInlineStyle(editorState, 'BOLD'));
  };

  const onItalicClick = () => {
    setEditorState(RichUtils.toggleInlineStyle(editorState, 'ITALIC'));
  };

  const onUnderlineClick = () => {
    setEditorState(RichUtils.toggleInlineStyle(editorState, 'UNDERLINE'));
  };

  return (
    <div className="create-blog-container">
      <h1>Create a New Blog</h1>
      <form onSubmit={handleSubmit}>
        <div className="input-box">
          <label>Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Blog Title"
            required
          />
        </div>

        <div className="editor-toolbar">
          <button type="button" onClick={onBoldClick} className="toolbar-button">
            <b>B</b>
          </button>
          <button type="button" onClick={onItalicClick} className="toolbar-button">
            <i>I</i>
          </button>
          <button type="button" onClick={onUnderlineClick} className="toolbar-button">
            <u>U</u>
          </button>
        </div>

        <div className="input-box">
          <label>Content</label>
          <div className="editor-box">
            <Editor
              editorState={editorState}
              handleKeyCommand={handleKeyCommand}
              onChange={setEditorState}
              placeholder="Write your blog content here..."
            />
          </div>
        </div>

        <button type="submit" className="submit-button">Submit</button>
      </form>
    </div>
  );
}

export default CreateBlog;
