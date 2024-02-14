import {KangalSubmit} from "../../shared/components/KangalSubmit";
import { UserList } from "./components/UserList";
import { useAuthState } from "../../shared/state/context";
import {Kangalite} from "../../shared/components/Kangalite";

export function Home (){
  const authState = useAuthState();
  const isLoggedInUser = !!authState.id; //Login olmayınca textarea gözükmesin.

  return (
    <div className="container">
      <div className="row">
        <div className="col">
          {isLoggedInUser && (
            <div className="mb-1">
              <KangalSubmit />
            </div>
          )}
          {isLoggedInUser && <Kangalite />}
        </div>
        <div className="col">
          <UserList />  
        </div>
      </div>
    </div>
  );
}