export const getLocalData = (id: string) => {
  const localData = localStorage.getItem(id);
  return localData ? JSON.parse(localData) : null;
};
