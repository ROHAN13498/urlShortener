import axios from 'axios';
import { notFound } from 'next/navigation';
import React from 'react';

interface PageProps {
  params: { slug: string };
}

export default async function Page({ params }: PageProps) {
  const { slug } = params;

  try {
    const res = await axios.get(`http://localhost:5000/api/user/geturl/${slug}`);
    const url = res.data?.link;

    if (!url) {
      notFound();
      return null; // Return null to avoid further rendering
    }

    return (
      <>
        <meta httpEquiv="refresh" content={`0;url=${url}`} />
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 text-gray-800">
          <div className="flex items-center space-x-3">
            <p className="text-xl font-semibold">Redirecting to {url}...</p>
            <div className="animate-spin rounded-full h-6 w-6 border-t-4 border-blue-500"></div>
          </div>
        </div>
      </>
    );
  } catch (error) {
    console.error("Error fetching the URL:", error);
    notFound();
    return null;
  }
}
