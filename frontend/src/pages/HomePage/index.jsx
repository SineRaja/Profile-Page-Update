/* eslint-disable linebreak-style */
/* eslint-disable react/button-has-type */
/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable linebreak-style */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function HomePage() {
  const [userId, setUserId] = useState('');
  const navigate = useNavigate();

  const handleUpdateUser = () => {
    if (userId) {
      navigate(`/profile/${userId}`);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-lg">
      <h1 className="text-2xl font-bold mb-4">Home Page</h1>
      <div className="space-y-4">
        <div>
          <label htmlFor="userId" className="block text-sm font-medium text-gray-700">Enter User ID to Update</label>
          <input
            id="userId"
            name="userId"
            type="text"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            value={userId}
            onChange={(e) => setUserId(e.target.value)}
          />
        </div>
        <button
          onClick={handleUpdateUser}
          className="w-full bg-indigo-600 text-white py-2 rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
        >
          Update User
        </button>
        <button
          onClick={() => navigate('/profile')}
          className="w-full bg-green-600 text-white py-2 rounded-md shadow-sm hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
        >
          Create New User
        </button>
      </div>
    </div>
  );
}

export default HomePage;
