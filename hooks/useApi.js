import axios from "axios";
import { useState } from "react";

const useApi = () => {
  const [data, setData] = useState();
  const [error, setError] = useState();
  const [loading, setLoading] = useState(false);
  // console.log({ ...axios.defaults.headers });
  return {
    data,
    error,
    loading,
    fetch: async (
      { url, method = "GET", data, headers },
      callback = (error, res) => {}
    ) => {
      setLoading(true);
      try {
        let res;
        res = await axios.request({
          method,
          url,
          headers,
          data,
        });

        setLoading(false);

        setData(res?.data?.data);

        callback(undefined, res);
      } catch (error) {
        setLoading(false);
        setError(error);
        callback(error, undefined);
      }
    },
  };
};

export default useApi;
