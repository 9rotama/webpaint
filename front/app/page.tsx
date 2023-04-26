'use client';
import { useEffect } from 'react';
import axios from 'axios';

export default function Page() {
  useEffect(() => {
    const get_url = process.env.NEXT_PUBLIC_API_URL + '/discover/1';
    axios.get(get_url).then((response) => {
      console.log('body:', response.data);
    });
  }, []);
  return <div className=""></div>;
}
