
import { useEffect, useState } from "react";
import {signUp} from "./api"

//Reac'ta component oluştururken iki tane yöntem var. Fonksiyonel component ve class component var.
//Fonksiyonel ve class componentlerin özellikleri vardo ama artık.
//React'in 16.8 versiyonu ile bu fark ortadan kalktı

export function SignUp() {
  //UseState:Bir değeri,tutabilmemiz ve o değerdeki değişimlere componentlerin reaksiyon göstermesi diyebiliriz.
  //UseState bizlere bir array döndürür,
  //UseState React built-in hooklarından biridir.
  //username ve diğer değişkenler artık input'a yazdığımız değer alacak.
  const [username, setUsername] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [passwordRepeat, setPasswordRepeat] = useState();
  const [successMessage,setSuccessMessage] = useState();
  const [errors,SetErrors] = useState({});
  
  const [apiProgress,setApiProgress] = useState(false); //Buton submit anında disable olması gerekir,çünkü kullanıcı
                                                        //istemeden de olsa butona sürekli basabilir ve sürekli istek gönderilir.


  //Parametre olarak bir fonksiyon alır,ikinci bir parametre daha alıyor orda da şartlı alıyor ve bir arraydir.
  //Ne gibi parametre bağlı olarak,hangi değerlerin değişimlerine bağlı olabilir ikinci parametre
  //Şuandaki kullanmamızın sebebi username'de eğer bir değer yazarsak hatayı ortadan kaldırmak için.
  //Boş olduğu zaman bir uyarı varken,yazdıktan sonra ise hata mesajı gitmesi için.
  useEffect(() =>{
    SetErrors({})
  },[username] )

  const onSubmit = async (event) => { //Form submit edildiğini anda true olur setApiProgress(true)
    event.preventDefault();
    setSuccessMessage();
    setApiProgress(true);
   
    try {
      const response = await signUp({
        username,
        email,
        password,
      });
      setSuccessMessage(response.data.message);
    }catch(axiosError){
      if(axiosError.response?.data && axiosError.response.data.status === 400)
      {
      SetErrors(axiosError.response.data.validationErrors);
      }
    }finally{
      setApiProgress(false);
    }
    // .then((response) => {
    //   
    // }).finally(() => setApiProgress(false))   //cevap aldıktan sonra spinner(logo olarak dönüyor diyebiliriz.) durması..
  };
  //Dışardan erişmek için export edilir
  //jsx'de sadece 1 parent element dönebiliriz.
  //11.satırdaki username ile 12.satırdaki username ilişkili oldu ve labela tıklandığı zaman input çalıştı.
  //Ayrı satırlar için div kullanabiliriz
  //type ile password'u maskeledik.
  //OnChange ile console'dan değişen eventleri loglama ile bakabiliriz.
  return (
    <div className="container">
      <div className="col-lg-6 offset-lg-3 col-sm-8 offset-sm-2 ">
      <form className="card" onSubmit={onSubmit}>
        <div className="text-center card-header">
          <h1>SignUp</h1>
        </div>
        <div className="card-body">
        <div className="mb-3">
          <label htmlFor="username" className="form-label">
            Username
          </label>
          <input
            id="username"
            className={
              errors.username ? "form-control is-invalid" :
            "form-control" }
            onChange={(event) => setUsername(event.target.value)}
          />
          <div className="invalid-feedback">
            {errors.username}
          </div>
        </div>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            Email
          </label>
          <input
            id="email"
            className="form-control"
            onChange={(event) => setEmail(event.target.value)}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">
            Password
          </label>
          <input
            id="password"
            className="form-control"
            type="password"
            onChange={(event) => setPassword(event.target.value)}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="passwordRepeat">Password Repeat</label>
          <input
            id="passwordRepeat"
            className="form-control"
            type="password"
            onChange={(event) => setPasswordRepeat(event.target.value)}
          />
        </div>
        {successMessage && <div className="alert alert-success" >{successMessage}</div>}

        <div className="text-center">
          <button
            className="btn btn-primary"
            disabled={ apiProgress || (!password || password !== passwordRepeat)}>
              {apiProgress &&  <span className="spinner-border spinner-border-sm" aria-hidden ="true"></span>}
            Sign Up
          </button>
        </div>
        </div>
      </form>
      </div>
    </div>
  );
}

