import React, { useState } from 'react';
import { useQuery } from 'react-query';

import { City } from '../types';

// This path is set at `site/_api/base/browse.ts`,
// this file contains an action that responds when
// triggering `/base`
const request = () => fetch('/_api/base').then(response => response.json());

export const App: React.FC = () => {
  const [name] = useState('Kretes');
  const { data, isLoading, error } = useQuery<City, Error>('example', request);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  const { city, ip } = data as City;

  return (
    <div className="max-w-2xl mx-auto">
      <div className="text-3xl">
        Hello, <span className="font-semibold">{name}</span>
      </div>
      <div className="text-gray-400 text-lg">
        You are now in {city} and your IP is {ip}
      </div>
      <div className="text-gray-400">(refresh this page)</div>
    </div>
  );
}
