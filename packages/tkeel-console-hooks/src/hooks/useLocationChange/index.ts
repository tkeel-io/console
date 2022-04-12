import { useEffect } from 'react';
import { Location, useLocation } from 'react-router-dom';

type OnChangeOptions = {
  prevLocation: Location;
  location: Location;
};

type Options = {
  onChange: ({ prevLocation, location }: OnChangeOptions) => void;
};

let prevLocation: Location;

export default function useLocationChange({ onChange }: Options) {
  const location = useLocation();

  useEffect(() => {
    if (prevLocation?.key !== location?.key) {
      onChange({ prevLocation, location });
    }
    prevLocation = location;
  }, [location, onChange]);
}
