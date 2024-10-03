import { authData } from "../models/user";

const useApi = () => {
  const fetchData = async (path: string, method: string, body: authData) => {
    const response = await fetch(`http://localhost:4001${path}`, {
      method: method,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });
    const data = await response.json();
    return data;
  };

  return { fetchData };
};

export default useApi;
