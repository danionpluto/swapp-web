import React, { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import {auth} from "./firebase.js";
import { onAuthStateChanged } from 'firebase/auth';
import Home from './pages/Home';
import Chat from './pages/Chat';
import SearchListing from './pages/SearchListing';
import Profile from './pages/Profile';
import SignUp from './pages/SignUp';
import LogIn from './pages/LogIn';
import Navbar from './components/Navbar.js';

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
    });
    return () => unsubscribe();
  }, []);
  return (
    <BrowserRouter>
    <Navbar user={user} />
      <Routes>
        <Route path="/" element={<Home />} />

        {user ? (
          <>
          <Route path="/Chat" element={<Chat />} />
        <Route path="/Profile" element={<Profile />} />
        <Route path="/SearchListing" element={<SearchListing />} />
          </>
        ):(
          <>
          <Route path="/SignUp" element={<SignUp />} />
        <Route path="/LogIn" element={<LogIn />} />
          </>
        )}
        


        
      </Routes>
    </BrowserRouter>
  );
}

export default App;
