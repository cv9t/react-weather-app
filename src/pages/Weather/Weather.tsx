import React from 'react';
import { useParams } from 'react-router-dom';

function Weather() {
  const { location } = useParams();

  return <div>{location}</div>;
}

export { Weather };
