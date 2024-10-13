import { useAuth } from '@/utils/authcontext';
import AxiosInstance from '@/utils/axios';
import React, { useEffect, useState } from 'react';

const Page = () => {
  const { accessToken } = useAuth();
  const [userName, setUserName] = useState('');

  useEffect(() => {
    // Function to get the username
    const getUsername = async () => {
      if (!accessToken) {
        console.error("Access token is not available");
        return; 
      }

      try {
        const response = await AxiosInstance.get('/username', {
          headers: {
            Authorization: `Bearer ${accessToken}` 
          }
        });
        setUserName(response.data); 
      } catch (error) {
        console.error("Error getting the username", error);
      }
    };

    getUsername(); 
  }, []); 

  return (
    <div>
      The username is: {userName || 'Loading...'}
    </div>
  );
};

export default Page;
