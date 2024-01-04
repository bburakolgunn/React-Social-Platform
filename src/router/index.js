

import { createBrowserRouter} from "react-router-dom";
import { Home } from "../pages/Home";
import { SignUp } from "../pages/SignUp";

export default  createBrowserRouter([
    {
      path : "*", //Burada kullanıcı yanlıslıkla bir adres girdiğinde otomatik olarak Home sayfasına yönlendir.
      Component : Home,
    },
  
    {
      path : "/signup",
      Component : SignUp
    },
  ])