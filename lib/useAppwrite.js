import { useEffect, useState } from "react";

const useAppwrite = (fetchFunction) => {
    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const fetchData = async () => {
        setIsLoading(true);
        try {
          const response = await fetchFunction();
          setData(response);
        } catch (error) {
          Alert.alert("Error", error.message); 
        } finally {
          //console.log(data);
          setIsLoading(false);
        }
    }
    useEffect(() => {
        fetchData();
    }, []);
    const refetch = () => fetchData();

  return {data, isLoading, refetch};
}

export default useAppwrite;