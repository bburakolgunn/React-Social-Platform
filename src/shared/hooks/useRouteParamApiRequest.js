import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export function useRouteParamApiRequest(param, httpFunction){
    const params = useParams();

    const pathParam = params[param]; //id,token param değerleri 
    const [apiProgress, setApiProgress] = useState(true);
    const [data, setData] = useState();
    const [error, setError] = useState();
  
    useEffect(() => {
      async function sendRequest() {
        setApiProgress(true)
        try {
          const response = await httpFunction(pathParam);
          setData(response.data);
        } catch (axiosError) {
          setError(
            axiosError.response?.data?.message || "An unknown error occurred"
          );
        } finally {
          setApiProgress(false);
        }
      }
      sendRequest();
    }, [pathParam]);//Reaksiyonlara değişkenlik göstermesi için ekledik


    return{apiProgress,data,error}

}