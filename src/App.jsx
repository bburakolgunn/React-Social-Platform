import "./App.css";
import { Link, Outlet } from "react-router-dom";
import { LanguageSelector } from "./shared/components/LanguageSelector";

import { AuthenticationContext } from "./shared/state/context";
import { NavBar } from "./shared/components/NavBar/Index";


function App() {
  // //Outlet placeholder belirlemizi sağlar.

  // //Login sayfası setAuthState aracılığyla useState'ı güncelleyecek.
  // //NavBar'da authState'i alarak authState'de ki değişimlere göre NavBar'da gösterdiği durumu düzenleyecek.
  // const [authState, setAuthState] = useState({
  //   id: 0

  // });

  // //Burada Login sayfası dönen response datayı versin ve biz burada response datayı setAuthState'e datayı direk
  // //buraya verebiliriz.
  // const  onLoginSuccess = (data) => {
  //   setAuthState(data)
  // }



  return (
    <AuthenticationContext>
      <NavBar/>
      <div className="container mt-3">
        <Outlet/>  
        <LanguageSelector />
      </div>
    </AuthenticationContext>
  );
}

export default App;
