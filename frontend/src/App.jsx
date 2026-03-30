import { useState } from 'react';
import Dashboard from './components/Dashboard';
import CreatePost from './components/CreatePost';
import './index.css';

export default function App() {
  // For this assignment, we are mocking a logged-in user's token.
  // In a real app, you would get this from a login screen.
  const mockToken = "fake-jwt-token-123"; 
  
  // State to toggle between "Dashboard" and "Create" views
  const [currentView, setCurrentView] = useState('dashboard');

  return (
    <div className="app-container">
      <nav>
        <h1>My Content Platform</h1>
        <div>
          <button onClick={() => setCurrentView('dashboard')}>Dashboard</button>
          <button onClick={() => setCurrentView('create')}>Create New Post</button>
        </div>
      </nav>

      <main>
        {currentView === 'dashboard' ? (
          <Dashboard token={mockToken} />
        ) : (
          <CreatePost 
            token={mockToken} 
            onPostCreated={() => setCurrentView('dashboard')} 
          />
        )}
      </main>
    </div>
  );
}