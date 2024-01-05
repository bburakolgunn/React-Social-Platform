
import { getUser } from "./api";
import { Alert } from "../../shared/components/Alert";
import { Spinner } from "../../shared/components/Spinner";
import { useRouteParamApiRequest } from "../../shared/hooks/useRouteParamApiRequest";
import { ProfileCard } from "./components/ProfileCard";

export function User() {
  const {
    apiProgress,
    data: user,
    error,
  } = useRouteParamApiRequest("id", getUser);
  //getUser fonksiyonu aracılığıyla  "id" react-router'dan alacağımız değeriyle birlikte api request yapılır.
  //Onunla ilgili apiProgress'i takip edilir,bir hata varsa hatayı setleriz,success ise datayı response body'nin
  //tamamı dönülür.

  return (
    <>
      {apiProgress && (
        <Alert styleType="secondary" center>
          {" "}
          <Spinner />
        </Alert>
      )}
      {user && <ProfileCard user={user}/>}
      {error && <Alert styleType="primary">{error}</Alert>}
    </>
  );
}
