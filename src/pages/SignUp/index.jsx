
import { useEffect, useMemo, useState } from "react";
import {signUp} from "./api"
import { Input } from "./components/Input";
import { useTranslation } from "react-i18next";


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
  const [generalError,setGeneralError] = useState();
  const { t } = useTranslation();
  
  const [apiProgress,setApiProgress] = useState(false); //Buton submit anında disable olması gerekir,çünkü kullanıcı
                                                        //istemeden de olsa butona sürekli basabilir ve sürekli istek gönderilir.


  //UseEffect : Parametre olarak bir fonksiyon alır,ikinci bir parametre daha alıyor orda da şartlı alıyor ve bir arraydir.
  //Ne gibi parametre bağlı olarak,hangi değerlerin değişimlerine bağlı olabilir ikinci parametre
  //Şuandaki kullanmamızın sebebi username'de eğer bir değer yazarsak hatayı ortadan kaldırmak için.
  //Boş olduğu zaman bir uyarı varken,yazdıktan sonra ise hata mesajı gitmesi için.

  
  useEffect(() =>{
    SetErrors(function(lastErrors){
      return {
        ...lastErrors,
        username: undefined
      }
    });               //username ya da diğer değerler için state değerlerini güncellerken callback fonksiyonu
        //güncellemek tercih edilmeli,parçalı olarak tabiki.Aksi takdirde beklenmektedik davranış,öngöremediğimiz davranışlar
        //olabilir.SetError güncelleme fonksiyonları asenkron çalışıyor,react optimize etmeye çalışıyor.
        //Güncellemeye çalıştığınız errors oobjesinin tam olarak en sonki değerini sahip olup olmadığınızı bilemeyebilirsiniz
        //Bu tip senaryoları çözmek için callback fonksiyonunu parametre olarak verebiliriz.Obje üzerinde(lastError) değiştirmeden
        //onun bir kopyasını oluşturup spread ile onun içerisine değiştirmek istediğiniz kısımları(username) ekleyebilirsiniz.
        //İstediğiniz formdaki objeyi en nihai hale getirip dönebilirsiniz.Ve bu dönülen değerde errorsa setlenmiş olacak.
        //Bu şekilde username etkileşimi ile birlikte hata mesajlarınıda kaldırabiliriz.
   }, [username] )


   useEffect(() =>{
    SetErrors(function(lastErrors){
      return{
        ...lastErrors,
        email : undefined,
      }
    });
   },[email])

   useEffect(() =>{
    SetErrors(function(lastErrors){
      return{
        ...lastErrors,
        password : undefined,
      }
    });
   },[password])

  const onSubmit = async (event) => { //Form submit edildiğini anda true olur setApiProgress(true)
    event.preventDefault();
    setSuccessMessage();
    setGeneralError();
    setApiProgress(true);
   
    try {
      const response = await signUp({
        username,
        email,
        password,
      });
      setSuccessMessage(response.data.message);
    } catch (axiosError) {

      //Backend'e gelen bir hata mesajı içerisinde data body varsa eğer 400 cevabı aldıysak validatonError'u
      //set ediyoruz aksi takdirde gelen response body'deki messagı general error olarak set ediyoruz.
      if (axiosError.response?.data) {
        if (axiosError.response.data.status === 400) {
          SetErrors(axiosError.response.data.validationError);
        } else {
          setGeneralError(axiosError.response.data.message)
        }
        
      } 
      else
      {
        setGeneralError(t('genericError'))
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

  const passwordRepeatError = useMemo(()=> {; //Daha önce bir değişiklik yok ise hesaplanmış halini döner.
  //Böylece inputlarda bir değişiklik yoksa outputlarda da yoktur.
  if(password && password != passwordRepeat){
   return  t('passwordMismatch')
  }
  return '';
  },[password,passwordRepeat]);


  return (
    <div className="container">
      <div className="col-lg-6 offset-lg-3 col-sm-8 offset-sm-2 ">
        <form className="card" onSubmit={onSubmit}>
          <div className="text-center card-header">
            <h1>{t('signUp')}</h1>
          </div>
          <div className="card-body">
            <Input id="username" label={t('username')} error = {errors.username} 
            onChange = {(event) => setUsername(event.target.value)} />
            <Input id = "email" label = {t('email')} error = {errors.email}
            onChange = {(event) => setEmail(event.target.value)}/>
            <Input id = "password" label = {t('password')} error = {errors.password}
            onChange = {(event) => setPassword(event.target.value) } type ="password" />
             <Input id = "passwordRepeat" label = {t('passwordRepeat')} error = {passwordRepeatError}
            onChange = {(event) => setPasswordRepeat(event.target.value) } type ="password" />
         
            {successMessage && (<div className="alert alert-success">{successMessage}</div>)}
            {generalError && (<div className="alert alert-danger">{generalError}</div>)}
            <div className="text-center">
              <button
                className="btn btn-primary"
                disabled={apiProgress || (!password || password !== passwordRepeat)}
              >
                {apiProgress && <span className="spinner-border spinner-border-sm" aria-hidden="true"></span>}
                {t('signUp')}
              </button>
            </div>
          </div>
        </form>
        
      </div>
    </div>
  );
}


