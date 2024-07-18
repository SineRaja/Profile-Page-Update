/* eslint-disable quotes */
/* eslint-disable import/no-extraneous-dependencies */
import React, { useState } from 'react';
import {
  BrowserRouter as Router, Route, Routes, Link,
} from 'react-router-dom';
import ProfilePage from './pages/profile';
import HomePage from './pages/HomePage';

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <Router>
      <div className="min-h-screen bg-gray-100">
        <nav className="bg-white shadow-md">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between h-16">
              <div className="flex">
                <div className="flex-shrink-0">
                  <Link to="/" className="text-xl font-bold text-indigo-600">Logo</Link>
                </div>
                <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
                  <Link to="/" className="text-gray-900 hover:text-indigo-600 px-3 py-2 rounded-md text-sm font-medium">Home</Link>
                  <Link to="/profile" className="text-gray-900 hover:text-indigo-600 px-3 py-2 rounded-md text-sm font-medium">Profile</Link>
                </div>
              </div>
              <div className="-mr-2 flex items-center sm:hidden">
                <button
                  onClick={() => setIsMenuOpen(!isMenuOpen)}
                  type="button"
                  // eslint-disable-next-line max-len
                  className="bg-indigo-600 inline-flex items-center justify-center p-2 rounded-md text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-white"
                  aria-controls="mobile-menu"
                  aria-expanded="false"
                >
                  <span className="sr-only">Open main menu</span>
                  <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={isMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16m-7 6h7"} />
                  </svg>
                </button>
              </div>
            </div>
          </div>

          <div className={`${isMenuOpen ? 'block' : 'hidden'} sm:hidden`} id="mobile-menu">
            <div className="px-2 pt-2 pb-3 space-y-1">
              <Link to="/" className="text-gray-900 hover:bg-indigo-600 hover:text-white block px-3 py-2 rounded-md text-base font-medium">Home</Link>
              <Link to="/profile" className="text-gray-900 hover:bg-indigo-600 hover:text-white block px-3 py-2 rounded-md text-base font-medium">Profile</Link>
            </div>
          </div>
        </nav>
        <div className="p-6">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/profile/:userId?" element={<ProfilePage />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
