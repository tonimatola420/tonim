import React, { useState } from 'react';

export default function useOnFetch() {
  
  const [isSuccess, setIsSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState();

  let onFetch = async (fetchingFn: any) => {
    setIsLoading(true);

    const data = await fetchingFn();
    // console.log('somak tomak', data);
    setResult(data.result);
    if (data.success === true) {
      setIsSuccess(true);
    } else {
      setIsSuccess(false);
    }

    setIsLoading(false);
  };

  return { onFetch, result, isSuccess, isLoading };
}
