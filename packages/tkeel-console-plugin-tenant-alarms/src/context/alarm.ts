import React, { useContext } from 'react';

interface Store {
  refetch: () => void;
}

const AlarmContext = React.createContext<Store>({
  refetch: () => {},
});

export function useAlarmContext() {
  return useContext(AlarmContext);
}

export default AlarmContext;
