// viewDetails.jsx
import  { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/authContext';
import './ViewDetails.css';
const apiUrl = import.meta.env.VITE_API_URL;


const ViewDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { currentUser } = useContext(AuthContext);
  const [post, setPost] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [updatedPost, setUpdatedPost] = useState({});
  const [showImagePreview, setShowImagePreview] = useState(false);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const res = await axios.get(`${apiUrl}/api/posts/${id}`, {
          withCredentials: true,
        });
        setPost(res.data);
        setUpdatedPost(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchPost();
  }, [id]);

  const handleEdit = () => {
    setEditMode(true);
  };

  const handleUpdate = async () => {
    try {
      const res = await axios.put(`${apiUrl}/api/posts/${id}`, updatedPost, {
        withCredentials: true,
      });
      console.log(res.data);
      alert('Post updated successfully!');
      setEditMode(false);
      setPost(updatedPost);
      navigate(`/view/${id}`); // Redirect to view details after successful update
    } catch (err) {
      console.log(err);
    }
  };

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this post?')) {
      try {
        await axios.delete(`${apiUrl}/api/posts/${id}`, {
          withCredentials: true,
        });
        alert('Post deleted successfully!');
        navigate('/dashboard'); // Redirect to dashboard after successful delete
      } catch (err) {
        console.log(err);
      }
    }
  };

  const handleChange = (e) => {
    setUpdatedPost({ ...updatedPost, [e.target.name]: e.target.value });
  };

  const handleCancel = () => {
    setEditMode(false);
    setUpdatedPost(post); // Reset changes
  };

  const handleImagePreview = () => {
    setShowImagePreview(true);
  };

  if (!post) {
    return <div>Loading...</div>;
  }

  return (
    <div className="view-details-container">
      <h1>View Details</h1>
      {editMode ? (
        <div className="edit-form">
          <input
            type="text"
            name="title"
            value={updatedPost.title}
            onChange={handleChange}
            placeholder="Title"
          />
          <textarea
            name="description"
            value={updatedPost.description}
            onChange={handleChange}
            placeholder="Description"
          ></textarea>
          <input
            type="text"
            name="type"
            value={updatedPost.type}
            onChange={handleChange}
            placeholder="Type"
          />
          

          <div className="input-group">
            <input
              type="text"
              placeholder="Image URL"
              value={updatedPost.urlToImage}
              onChange={(e) => handleChange(e)}
              name="urlToImage"
            />
            <button type="button" className="btn-primary" onClick={handleImagePreview}>
              Preview Image
            </button>
          </div>
          {showImagePreview && updatedPost.urlToImage && (
            <div className="image-preview">
              <img src={updatedPost.urlToImage} alt="Preview" />
            </div>
          )}
          <input
            type="text"
            name="url"
            value={updatedPost.url}
            onChange={handleChange}
            placeholder="URL"
          />
          <div className="button-group">
            <button onClick={handleUpdate}>Update</button>
            <button onClick={handleCancel}>Cancel</button>
          </div>
        </div>
      ) : (
        <div className="post-details">
          {post.urlToImage && <img src={post.urlToImage} alt={post.title} />}
          <h2>{post.title}</h2>
          <p>{post.description}</p>
          <span>{post.type}</span>
          <span>{post.name}</span>
          <span>{new Date(post.publishedAt).toLocaleDateString()}</span>
          <a href={post.url} target="_blank" rel="noopener noreferrer">
            Read more
          </a>
          <div className="button-group">
            <button onClick={handleEdit}>Edit</button>
            <button onClick={handleDelete}>Delete</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ViewDetails;
