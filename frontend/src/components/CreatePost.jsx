import { useState } from 'react';
import axios from 'axios';

export default function CreatePost({ token, onPostCreated }) {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [status, setStatus] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('Creating...');
    try {
      await axios.post('http://localhost:5000/api/posts', 
        { title, content },
        { headers: { Authorization: `Bearer ${token}` }}
      );
      setStatus('Success!');
      setTitle('');
      setContent('');
      onPostCreated(); // Refresh dashboard
    } catch (error) {
      setStatus('Error creating post.');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Create New Post</h2>
      <input 
        type="text" 
        placeholder="Title" 
        value={title} 
        onChange={(e) => setTitle(e.target.value)} 
        required 
      />
      <textarea 
        placeholder="Content" 
        value={content} 
        onChange={(e) => setContent(e.target.value)} 
        required 
      />
      <button type="submit">Publish</button>
      <p>{status}</p>
    </form>
  );
}