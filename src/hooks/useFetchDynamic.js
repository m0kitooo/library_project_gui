import { useState, useCallback } from "react";

function useFetchDynamic() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetcher = useCallback(async (url, options) => {
    setLoading(true);
    setError(null);
    setData(null);
    try {
      const response = await fetch(url, options);
      if (!response.ok) setError("Network response was not ok");
      const result = await response.json();
      setData(result);
      return result;
    } catch (err) {
      setError(err);
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  console.log(error, loading, data);
  return { data, loading, error, fetcher };
}

export default useFetchDynamic;
