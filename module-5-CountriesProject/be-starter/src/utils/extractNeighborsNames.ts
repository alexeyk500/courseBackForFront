export const extractNeighborsNames = (
  collection = [] as { name: { common: string } }[],
) => {
  return collection.map((cur) => cur.name.common);
};
