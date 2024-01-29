

import { createBrowserRouter} from "react-router-dom";
import { Home } from "../pages/Home";
import { SignUp } from "../pages/SignUp";
import App from "../App";
import { Activation } from "../pages/Activation";
import { User } from "../pages/User";
import { Login } from "../pages/Login";

export default  createBrowserRouter([
  {
    path : "/",
    Component : App,
    children : [
      {
        path : "/", // /*Burada kullanıcı yanlıslıkla bir adres girdiğinde otomatik olarak Home sayfasına yönlendir.
        index : true,
        Component : Home,
      },
    
      {
        path : "/signup",
        Component : SignUp
      },
      {
        path : "/activation/:token", //Dinamik değerleri tanımlamak için :
        Component : Activation
      },
      {
        path: "/user/:id",
        Component :  User
      },
      {
        path: '/login',
        Component : Login
      },

      {
        path: "/password-reset/request",
        Component : PasswordResetRequest
      }

    ]
  }
  ])