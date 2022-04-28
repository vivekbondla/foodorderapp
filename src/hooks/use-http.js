import React, { useState } from "react";

const useHTTP = (requestConf, applyData) => {
    const [isLoading,setIsLoading]= useState(false);
    const [httpError,setHttpError] =useState(false);
  const sendRequest = async () => {
      setIsLoading(true)
    try {
      const response = await fetch(requestConf.url, {
        method: requestConf.method ? requestConf.method : "GET",
        headers: requestConf.headers ? requestConf.headers : {},
        body: requestConf.body ? JSON.stringify(requestConf.body) : null,
      });

      if (!response.ok) {
        throw new Error("Something went wrong");
      }

      const data = await response.json();
      applyData(data);
     
    } catch (err) {
      console.log(err);
      setHttpError(err.message);
    }
    setIsLoading(false);
  };
  return {
    sendRequest : sendRequest,
    isLoading:isLoading,
    isError : httpError
}

  
};
export default useHTTP;
