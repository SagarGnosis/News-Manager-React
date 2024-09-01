// dashboard.jsx
import { useEffect, useState, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../../context/authContext";
import { useNavigate } from "react-router-dom";
import LaunchIcon from "@mui/icons-material/Launch";
import "./Dashboard.css";

const apiUrl = import.meta.env.VITE_API_URL;

const Dashboard = () => {
  const [posts, setPosts] = useState([]);
  const { currentUser } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await axios.get(`${apiUrl}/api/posts`, {
          withCredentials: true,
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`, // Include token in Authorization header
          },
        });
        setPosts(res.data);
      } catch (err) {
        console.error(err);
       
      }
    };
    fetchPosts();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this post?")) {
      try {
        await axios.delete(`${apiUrl}/api/posts/${id}`, {
          withCredentials: true,
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`, // Include token in Authorization header
          },
        });
        setPosts(posts.filter((post) => post.id !== id));
      } catch (err) {
        console.error(err);
        
      }
    }
  };

  return (
    <div className="dashboard-container">
      <h1>Dashboard</h1>
      <div className="posts-grid">
        {posts.map((post) => (
          <div className="post-card" key={post.id}>
            {post.urlToImage && (
              <img
                src={post.urlToImage}
                alt={post.title}
                className="post-image"
              />
            )}
            <div className="post-content">
              <h2>
                {post.title.length > 50
                  ? post.title.substring(0, 50) + "..."
                  : post.title}
                <a
                  href={post.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="post-url"
                >
                  <LaunchIcon />
                </a>
              </h2>
              <span className="post-type">{post.type}</span>
              <p>
                {post.description
                  .split(" ")
                  .slice(0, 50)
                  .join(" ") +
                  (post.description.split(" ").length > 50 ? "..." : "")}
              </p>
              <div className="post-footer">
                <div>
                  <span className="post-publisher">{post.name}</span>
                  <span className="post-date">
                    {new Date(post.publishedAt).toLocaleDateString()}
                  </span>
                </div>
                <div className="post-actions">
                  <button onClick={() => navigate(`/view/${post.id}`)}>
                    View Details
                  </button>
                  {/* <button onClick={() => navigate(`/update/${post.id}`)}>Update</button> */}
                  <button onClick={() => handleDelete(post.id)}>Delete</button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
