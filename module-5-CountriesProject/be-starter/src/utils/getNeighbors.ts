import { BASE_URL } from '../constants/urlsContants';
import { extractNeighborsNames } from './extractNeighborsNames';

export const getNeighbors = async (codes: string) => {
  const result = await fetch(BASE_URL + 'alpha?codes=' + codes);
  const data = await result.json();
  return extractNeighborsNames(data);
}