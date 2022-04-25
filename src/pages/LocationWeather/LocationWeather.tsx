import React from 'react';
import { useLocation } from 'react-router-dom';
import { LocationType } from '../../types';

interface LocationStateType {
  location: LocationType;
}

function LocationWeather() {
  const { location } = useLocation().state as LocationStateType;

  return (
    <div>
      description: {location.description} coords: {`${location.coords.lat}, ${location.coords.lng}`}
    </div>
  );
}

export { LocationWeather };
