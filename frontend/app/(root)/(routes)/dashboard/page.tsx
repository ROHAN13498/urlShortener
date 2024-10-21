"use client";
import AxiosInstance from '@/utils/axios';
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button';

const Page = () => {
  const router = useRouter()
  const [userName, setUserName] = useState('');
  useEffect(() => {
    const getUsername = async () => {
      try {
        const response = await AxiosInstance.get('/api/user/username',{
          withCredentials:true
        });
        setUserName(response.data.username);
      } catch (error) {
        console.error("Error getting the username", error);
      }
    };

    getUsername(); 
  }, []); 

  const handleClick=async()=>{
    await AxiosInstance.post("/api/auth/logout");
    router.push("/auth/login");
  }

  return (
    <div>
      The username is: {userName || 'Loading...'}
      <Button onClick={()=>handleClick()} className='block'>
        logout
      </Button>
      <Button onClick={()=>handleClick()} className='block'>
        logout
      </Button><Button onClick={()=>handleClick()} className='block'>
        logout
      </Button><Button onClick={()=>handleClick()} className='block'>
        logout
      </Button><Button onClick={()=>handleClick()} className='block'>
        logout
      </Button><Button onClick={()=>handleClick()} className='block'>
        logout
      </Button><Button onClick={()=>handleClick()} className='block'>
        logout
      </Button><Button onClick={()=>handleClick()} className='block'>
        logout
      </Button><Button onClick={()=>handleClick()} className='block'>
        logout
      </Button><Button onClick={()=>handleClick()} className='block'>
        logout
      </Button><Button onClick={()=>handleClick()} className='block'>
        logout
      </Button><Button onClick={()=>handleClick()} className='block'>
        logout
      </Button><Button onClick={()=>handleClick()} className='block'>
        logout
      </Button><Button onClick={()=>handleClick()} className='block'>
        logout
      </Button><Button onClick={()=>handleClick()} className='block'>
        logout
      </Button><Button onClick={()=>handleClick()} className='block'>
        logout
      </Button><Button onClick={()=>handleClick()} className='block'>
        logout
      </Button><Button onClick={()=>handleClick()} className='block'>
        logout
      </Button><Button onClick={()=>handleClick()} className='block'>
        logout
      </Button><Button onClick={()=>handleClick()} className='block'>
        logout
      </Button><Button onClick={()=>handleClick()} className='block'>
        logout
      </Button><Button onClick={()=>handleClick()} className='block'>
        logout
      </Button><Button onClick={()=>handleClick()} className='block'>
        logout
      </Button><Button onClick={()=>handleClick()} className='block'>
        logout
      </Button><Button onClick={()=>handleClick()} className='block'>
        logout
      </Button><Button onClick={()=>handleClick()} className='block'>
        logout
      </Button><Button onClick={()=>handleClick()} className='block'>
        logout
      </Button><Button onClick={()=>handleClick()} className='block'>
        logout
      </Button><Button onClick={()=>handleClick()} className='block'>
        logout
      </Button><Button onClick={()=>handleClick()} className='block'>
        logout
      </Button><Button onClick={()=>handleClick()} className='block'>
        logout
      </Button><Button onClick={()=>handleClick()} className='block'>
        logout
      </Button>
    </div>
  );
};

export default Page;
