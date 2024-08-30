// Search.jsx
import { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../../context/authContext';
import { useNavigate, useLocation } from 'react-router-dom';
import LaunchIcon from '@mui/icons-material/Launch';
import './Search.css';
const apiUrl = import.meta.env.VITE_API_URL;

const Search = () => {
  const [posts, setPosts] = useState([]);
  const { currentUser } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();

  const getKeywordFromQuery = () => {
    const params = new URLSearchParams(location.search);
    return params.get('keyword') || '';
  };

  useEffect(() => {
    const keyword = getKeywordFromQuery();
    if (keyword) {
      searchPosts(keyword);
    }
  }, [location.search]);

  const searchPosts = async (keyword) => {
    try {
      const res = await axios.post(`${apiUrl}/api/posts/search`, { keyword }, {
        withCredentials: true,
      });
      setPosts(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this post?')) {
      try {
        await axios.delete(`${apiUrl}/api/posts/${id}`, {
          withCredentials: true,
        });
        setPosts(posts.filter((post) => post.id !== id));
      } catch (err) {
        console.log(err);
      }
    }
  };

  return (
    <div className="search-container">
      <div className="posts-grid">
        {posts.map((post) => (
          <div className="post-card" key={post.id}>
            {post.urlToImage && <img src={post.urlToImage} alt={post.title} className="post-image" />}
            <div className="post-content">
              <h2>
                {post.title.length > 50 ? post.title.substring(0, 50) + "..." : post.title}
                <a href={post.url} target="_blank" rel="noopener noreferrer" className="post-url">
                  <LaunchIcon />
                </a>
              </h2>
              <span className="post-type">{post.type}</span>
              <p>{post.description.split(" ").slice(0, 50).join(" ") + (post.description.split(" ").length > 50 ? "..." : "")}</p>
              <div className="post-footer">
                <div>
                  <span className="post-publisher">{post.name}</span>
                  <span className="post-date">{new Date(post.publishedAt).toLocaleDateString()}</span>
                </div>
                <div className="post-actions">
                  {currentUser && (currentUser.role === 'Admin' || currentUser.id === post.source_id) && (
                    <>
                      {/* <button onClick={() => navigate(`/update/${post.id}`)}>Update</button> */}
                      <button onClick={() => navigate(`/view/${post.id}`)}>View Details</button>
                      <button onClick={() => handleDelete(post.id)}>Delete</button>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Search;
