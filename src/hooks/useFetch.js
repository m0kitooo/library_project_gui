import { useState, useEffect, useRef } from "react";

function useFetch(url, options) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const optionsRef = useRef(options);
  console.log('testing', optionsRef.current);

  useEffect(() => {
    let isMounted = true;
    setLoading(true);
    setError(null);

    fetch(url, optionsRef.current)
      .then(res => {
        if (!res.ok) throw new Error("Network response was not ok");
        return res.json();
      })
      .then(data => isMounted && setData(data))
      .catch(err => isMounted && setError(err))
      .finally(() => isMounted && setLoading(false));

    return () => { isMounted = false; };
  }, [url, optionsRef.current]);

  return { data, loading, error };
}

export default useFetch;