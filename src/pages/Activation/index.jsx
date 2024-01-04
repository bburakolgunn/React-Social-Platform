import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { activateUser } from "./api";

export function Activation() {
  const { token } = useParams();
  const [apiProgress, setApiProgress] = useState(false);
  const [successMessage, setSuccessMesage] = useState();
  const [errorMessage, setErrorMessage] = useState();

  useEffect(() => {
    async function activate() {
      try {
        const response = await activateUser(token);
        setSuccessMesage(response.data.message);
      } catch (axiosError) {
        setErrorMessage(axiosError.response?.data?.message || "An unknown error occurred");
      } finally {
        setApiProgress(false);
      }
    }
    activate();
  }, [token]);

  return (
    <>
      {apiProgress && <span className="spinner-border" aria-hidden="true"></span>}
      {successMessage && <div className="alert alert-success">{successMessage}</div>}
      {errorMessage && <div className="alert alert-danger">{errorMessage}</div>}
    </>
  );
}


