import { useState,useEffect, useCallback } from "react";
import { loadUsers } from "./api";
import { Spinner } from "../../../shared/components/Spinner";
import { UserListItem } from "./UserListItem";



//Sayfa bilgileri
export function UserList(){
    const[userPage,setUserPage] = useState({
        content : [],
        last : false,
        first :false,
        number : 0
    });

    const [apiProgess,setApiProgress] = useState(false);

    //Uygulama component ekrana geldiğinde getUsers çağrılıyor,getUsers da loadUsers'ı API request'i yapıp
    //userları state e veriyor.Bu sayede button ve previous sayfa arasında geçişkenlik yapabiliriz.
    //parametre olarak page alır.
    const getUsers = useCallback( async(page) => {
        setApiProgress(true);
        try{
            const response = await loadUsers(page);
            setUserPage(response.data);
        }catch{

        }finally{
            setApiProgress(false);
        }
            

    },[])

    useEffect(() => {
      
        getUsers();
      }, []);

      //useState([] arraydaki userleri Uİ de göstermek için statede users arrayinde buradaki objeyi bir jsx 
      //elementine çevirmemiz gerekiyor.Bu dönüşüm işlemine map diyebiliriz.Array üzerinde iterate ederek her bir
      //item i(user objesini) alıp bir div dönebiliriz.Ve user objesinin username'ini yazabiliriz.
    return(
        <div className="card">
            
        <div className="card-header text-center fs-4">User List</div>
        <ul className="list-group list-group-flash">
        {userPage.content.map(user => {
           return <UserListItem key={user.id} user={user}/>
        })}
        </ul>
        <div className="card-footer text-center">
        {apiProgess && <Spinner/>}
        {!apiProgess && !userPage.first &&  <button className="btn btn-outline-secondary btn-sm float-start" onClick={() => getUsers(userPage.number-1)}>Previous</button>}
        {!apiProgess && !userPage.last && <button className="btn btn-outline-secondary btn-sm float-end" onClick={() => getUsers (userPage.number+1)}>Next</button>}
        </div>
        </div>
    )

}