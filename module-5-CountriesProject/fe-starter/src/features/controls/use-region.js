import { useSelector, useDispatch } from 'react-redux';

import { selectRegion, setRegion } from './controls-slice.js';

export const useRegion = () => {
  const dispatch = useDispatch();
  const region = useSelector(selectRegion);

  const handleSelect = (reg) => {
    dispatch(setRegion(reg?.value || ''));
  };

  return [region, handleSelect];
};
