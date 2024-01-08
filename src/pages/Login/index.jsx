import { useContext, useEffect, useMemo, useState } from "react";

import { useTranslation } from "react-i18next";
import { Alert } from "../../shared/components/Alert";
import { Spinner } from "../../shared/components/Spinner";
import { Input } from "../../shared/components/Input";
import { Button } from "../../shared/components/Button";
import { login } from "./api";
import { AuthContext, useAuthDispatch } from "../../shared/state/context";
import { useNavigate } from "react-router-dom";

//Reac'ta component oluştururken iki tane yöntem var. Fonksiyonel component ve class component var.
//Fonksiyonel ve class componentlerin özellikleri vardo ama artık.
//React'in 16.8 versiyonu ile bu fark ortadan kalktı

export function Login({}) {
  //UseState:Bir değeri,tutabilmemiz ve o değerdeki değişimlere componentlerin reaksiyon göstermesi diyebiliriz.
  //UseState bizlere bir array döndürür,
  //UseState React built-in hooklarından biridir.
  //username ve diğer değişkenler artık input'a yazdığımız değer alacak.
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [errors, SetErrors] = useState({});
  const [generalError, setGeneralError] = useState();
  const { t } = useTranslation();
  const navigate = useNavigate();
  const dispatch = useAuthDispatch();

  const [apiProgress, setApiProgress] = useState(true); //Buton submit anında disable olması gerekir,çünkü kullanıcı
  //istemeden de olsa butona sürekli basabilir ve sürekli istek gönderilir.

  //UseEffect : Parametre olarak bir fonksiyon alır,ikinci bir parametre daha alıyor orda da şartlı alıyor ve bir arraydir.
  //Ne gibi parametre bağlı olarak,hangi değerlerin değişimlerine bağlı olabilir ikinci parametre
  //Şuandaki kullanmamızın sebebi username'de eğer bir değer yazarsak hatayı ortadan kaldırmak için.
  //Boş olduğu zaman bir uyarı varken,yazdıktan sonra ise hata mesajı gitmesi için.

  useEffect(() => {
    SetErrors(function (lastErrors) {
      return {
        ...lastErrors,
        email: undefined,
      };
    });
  }, [email]);

  useEffect(() => {
    SetErrors(function (lastErrors) {
      return {
        ...lastErrors,
        password: undefined,
      };
    });
  }, [password]);

  const onSubmit = async (event) => {
    //Form submit edildiğini anda true olur setApiProgress(true)
    event.preventDefault();
    setGeneralError();
    setApiProgress(true);

    try {
      const response = await login({ email, password });
      dispatch({ type: "login-success", data: response.data });
      navigate("/");
    } catch (axiosError) {
      //Backend'e gelen bir hata mesajı içerisinde data body varsa eğer 400 cevabı aldıysak validatonError'u
      //set ediyoruz aksi takdirde gelen response body'deki messagı general error olarak set ediyoruz.
      if (axiosError.response?.data) {
        if (axiosError.response.data.status === 400) {
          SetErrors(axiosError.response.data.validationError);
        } else {
          setGeneralError(axiosError.response.data.message);
        }
      } else {
        setGeneralError(t("genericError"));
      }
    } finally {
      setApiProgress(false);
    }
  };
  // .then((response) => {
  //
  // }).finally(() => setApiProgress(false))   //cevap aldıktan sonra spinner(logo olarak dönüyor diyebiliriz.) durması..

  //Dışardan erişmek için export edilir
  //jsx'de sadece 1 parent element dönebiliriz.
  //Ayrı satırlar için div kullanabiliriz
  //type ile password'u maskeledik.
  //OnChange ile console'dan değişen eventleri loglama ile bakabiliriz.

  return (
    <div className="container">
      <div className="col-lg-6 offset-lg-3 col-sm-8 offset-sm-2 ">
        <form className="card" onSubmit={onSubmit}>
          <div className="text-center card-header">
            <h1>{t("login")}</h1>
          </div>
          <div className="card-body">
            <Input
              id="email"
              label={t("email")}
              error={errors.email}
              onChange={(event) => setEmail(event.target.value)}
            />
            <Input
              id="password"
              label={t("password")}
              error={errors.password}
              onChange={(event) => setPassword(event.target.value)}
              type="password"
            />

            {generalError && <Alert styleType="danger">{generalError}</Alert>}
            <div className="text-center">
              <Button apiProgress={apiProgress}>{t("login")}</Button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
