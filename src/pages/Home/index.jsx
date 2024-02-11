import { useState } from "react";
import {KangalSubmit} from "../../shared/components/KangalSubmit";
import { UserList } from "./components/UserList";
import { Login } from "../Login";
import { useAuthState } from "../../shared/state/context";
import {Kangalite} from "../../shared/components/Kangalite";

export function Home (){
    const { isLoggedIn } = useAuthState(action => ({isLoggedIn:action.isLoggedIn}));
  return(
    <div className="container">
        <div className="row">
        <div className="col">
            {( 
            <div className="mb-1">
            <KangalSubmit/>
            </div>
            )}
            <Kangalite/>
            </div>
        <div className="col">
          <UserList/>  
        </div>
        </div>
    </div>
    )
};