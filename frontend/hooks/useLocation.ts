import { useContext } from 'react';
import { LocationContext } from '@/utils/init-location';

function useLocation() {
  return useContext(LocationContext);
}

export default useLocation;
