
import  { useState, useEffect } from 'react';
import axios from 'axios';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { useParams, useNavigate } from 'react-router-dom'; // Updated import

import './Update.css'; // Assuming PostForm.css contains necessary styles
const apiUrl = import.meta.env.VITE_API_URL;
const Update = () => {
  const { id } = useParams(); // Get post ID from URL
  const navigate = useNavigate(); // Updated hook
  
  // State variables to hold post data
  const [post, setPost] = useState({
    title: '',
    description: '',
    type: '',
    url: '',
    urlToImage: '',
    publishedAt: new Date(),
  });

  // Fetch post data from API on component mount
  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await axios.get(`${apiUrl}/api/posts/${id}`);
        const postData = response.data; // Assuming response.data is the post object
        console.log(postData);
        setPost(postData);
      } catch (error) {
        console.error('Error fetching post:', error);
        // Handle error (show message or redirect, etc.)
      }
    };

    fetchPost();
  }, [id]); // Fetch data only when id changes

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.put(`${apiUrl}/api/posts/${id}`, post, {
        withCredentials: true,  // Ensure cookies are sent with the request
      });
      console.log(res.data);
      alert('Post updated successfully!');
      navigate('/dashboard'); // Redirect to dashboard after successful update
    } catch (error) {
      console.error('Error updating post:', error);
      alert('There was an error updating the post! ' + error.message);
    }
  };

  return (
    <div className="post-form container">
      <h1>Update Post</h1>
      <form onSubmit={handleSubmit}>
        <div className="input-group">
          <input
            type="text"
            placeholder="Title"
            value={post.title}
            onChange={(e) => setPost({ ...post, title: e.target.value })}
            required
          />
        </div>
        <div className="input-group">
          <textarea
            placeholder="Description"
            value={post.description}
            onChange={(e) => setPost({ ...post, description: e.target.value })}
            required
          ></textarea>
        </div>
        <div className="input-group">
          <select
            value={post.type}
            onChange={(e) => setPost({ ...post, type: e.target.value })}
            required
          >
            <option value="" disabled>Select type</option>
            <option value="news">News</option>
            <option value="events">Events</option>
            <option value="tender">Tender</option>
            <option value="press release">Press Release</option>
          </select>
        </div>
        <div className="input-group">
          <DatePicker
            selected={new Date(post.publishedAt)}
            onChange={(date) => setPost({ ...post, publishedAt: date })}
            showTimeSelect
            dateFormat="Pp"
            placeholderText="Select Published Time"
          />
        </div>
        <div className="input-group">
          <input
            type="text"
            placeholder="URL"
            value={post.url}
            onChange={(e) => setPost({ ...post, url: e.target.value })}
          />
        </div>
        <div className="input-group">
          <input
            type="text"
            placeholder="Image URL"
            value={post.urlToImage}
            onChange={(e) => setPost({ ...post, urlToImage: e.target.value })}
          />
        </div>

        <div className="input-group">
          <button type="submit" className="btn-primary">Update Post</button>
        </div>
      </form>
    </div>
  );
};

export default Update;

