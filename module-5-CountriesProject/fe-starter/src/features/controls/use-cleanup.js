import { useDispatch } from 'react-redux';
import { clearControls } from './controls-slice.js';

export const useCleanup = () => {
  const dispatch = useDispatch();

  const cleanUp = () => dispatch(clearControls());

  return () => dispatch(cleanUp());
};
