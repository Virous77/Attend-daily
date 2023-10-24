export const getLocalData = (id: string) => {
  const localData = localStorage.getItem(id);
  return localData ? JSON.parse(localData) : null;
};

export const localAppError = {
  data: {
    message: "Something went wrong,Try again later",
    status: 400,
    success: false,
    stack: "",
  },
};
