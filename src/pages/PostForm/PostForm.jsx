//PostForm.jsx
import  { useState, useContext } from 'react';
import axios from 'axios';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import './PostForm.css';
import { AuthContext } from '../../context/authContext';
const apiUrl = import.meta.env.VITE_API_URL;


const PostForm = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [type, setType] = useState('');
  const [url, setUrl] = useState('');
  const [urlToImage, setUrlToImage] = useState('');
  const [publishedAt, setPublishedAt] = useState(new Date());
  const [showImagePreview, setShowImagePreview] = useState(false);
  const { currentUser } = useContext(AuthContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!currentUser) {
      alert("You must be logged in to create a post");
      return;
    }

    if (!title || !description) {
      alert("Title and Description are mandatory.");
      return;
    }

    const postData = {
      title,
      description,
      type,
      url: url || null,
      urlToImage: urlToImage || null,
      publishedAt: publishedAt.toISOString(),
    };

    try {
      const res = await axios.post(`${apiUrl}/api/posts`, postData, {
        withCredentials: true,  // Ensure cookies are sent with the request
      });
      console.log(res.data);
      alert("Post created successfully!");
      console.log(res.data);
      window.location.href = '/dashboard';
    } catch (error) {
      console.error("There was an error creating the post!", error);
      alert("There was an error creating the post! " + error.message);
    }
  };

  const handleImagePreview = () => {
    setShowImagePreview(true);
  };

  return (
    <div className="post-form container">
      <h1>Add New Post</h1>
      <form onSubmit={handleSubmit}>
        <div className="input-group">
          <input
            type="text"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div className="input-group">
          <textarea
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          ></textarea>
        </div>
        <div className="input-group">
          <select value={type} onChange={(e) => setType(e.target.value)} required>
            <option value="" disabled>Select type</option>
            <option value="news">News</option>
            <option value="events">Events</option>
            <option value="tender">Tender</option>
            <option value="press release">Press Release</option>
          </select>
        </div>
        <div className="input-group">
          <DatePicker
            selected={publishedAt}
            onChange={(date) => setPublishedAt(date)}
            showTimeSelect
            dateFormat="Pp"
            placeholderText="Select Published Time"
          />
        </div>
        <div className="input-group">
          <input
            type="text"
            placeholder="URL"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
          />
        </div>
        <div className="input-group">
          <input
            type="text"
            placeholder="Image URL"
            value={urlToImage}
            onChange={(e) => setUrlToImage(e.target.value)}
          />
          <button type="button" className="btn-primary" onClick={handleImagePreview}>Preview Image</button>
        </div>
        {showImagePreview && urlToImage && (
          <div className="image-preview">
            <img src={urlToImage} alt="Preview" />
          </div>
        )}
        
        <div className="input-group">
          <button type="submit" className="btn-primary">Add Post</button>
        </div>
      </form>
    </div>
  );
};

export default PostForm;
