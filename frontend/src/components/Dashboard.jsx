import { useState, useEffect } from 'react';
import axios from 'axios';

export default function Dashboard({ token }) {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  
  // Pagination State
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const limit = 5;

  useEffect(() => {
    fetchPosts();
  }, [page]); // Re-run whenever 'page' changes

  const fetchPosts = async () => {
    setLoading(true);
    setError('');
    try {
      const response = await axios.get(`http://localhost:5000/api/posts?page=${page}&limit=${limit}`, {
        headers: { Authorization: `Bearer ${token}` } // Send auth token
      });
      
      setPosts(response.data.data);
      setTotalPages(response.data.metadata.totalPages);
    } catch (err) {
      setError('Failed to load content. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="dashboard">
      <h2>My Content Dashboard</h2>

      {/* State Handling */}
      {loading && <p>Loading your content...</p>}
      {error && <p style={{color: 'red'}}>{error}</p>}
      {!loading && posts.length === 0 && !error && <p>No content found. Create your first post!</p>}

      {/* Display Data */}
      <div className="post-list">
        {posts.map(post => (
          <div key={post._id} className="post-card">
            <h3>{post.title}</h3>
            <p>{post.content}</p>
          </div>
        ))}
      </div>

      {/* Pagination Controls */}
      {!loading && posts.length > 0 && (
        <div className="pagination">
          <button 
            onClick={() => setPage(p => Math.max(1, p - 1))} 
            disabled={page === 1}
          >
            Previous
          </button>
          <span> Page {page} of {totalPages} </span>
          <button 
            onClick={() => setPage(p => p + 1)} 
            disabled={page >= totalPages}
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
}