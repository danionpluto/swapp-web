import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Link } from 'react-router-dom';
import Home from './pages/Home';
import Chat from './pages/Chat';
import SearchListing from './pages/SearchListing';
import Profile from './pages/Profile';
import SignUp from './pages/SignUp';

function App() {
  return (
    <BrowserRouter>
    <div>
    <Link to="/">Home </Link>
    <Link to="/Chat">Chat </Link>
    <Link to="/Profile">Profile </Link>
    <Link to="/SignUp">Sign Up </Link>
    <Link to="/SearchListing">Search Listing </Link>
    </div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Chat" element={<Chat />} />
        <Route path="/Profile" element={<Profile />} />
        <Route path="/SearchListing" element={<SearchListing />} />
        <Route path="/SignUp" element={<SignUp />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
