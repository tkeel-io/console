import { useEffect } from 'react';
import { Location, useLocation } from 'react-router-dom';

type Options = {
  onChange: (location: Location) => void;
};

export default function useLocationChange({ onChange }: Options) {
  const location = useLocation();

  useEffect(() => onChange(location), [location, onChange]);
}
