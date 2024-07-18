import React from 'react';
// eslint-disable-next-line import/no-extraneous-dependencies
import { useParams } from 'react-router-dom';
import Profile from '../../componenets/Profile';

function ProfilePage() {
  const { userId } = useParams();
  const user = {
    id: userId || null,
    email: 'user@example.com',
  };

  return (
    <div className="container mx-auto p-6 bg-white rounded-lg shadow-lg">
      <Profile user={user} />
    </div>
  );
}

export default ProfilePage;
