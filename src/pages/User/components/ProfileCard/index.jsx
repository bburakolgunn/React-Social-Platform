import {  useState } from "react";
import {  useAuthState } from "../../../../shared/state/context";
import { Button } from "../../../../shared/components/Button";

import { ProfileImage } from "../../../../shared/components/ProfileImage";
import { UserEditForm } from "./UserEditForm";
import { UserDeleteButton } from "./UserDeleteButton";



 
 
  
  export function ProfileCard({ user }) {

    const authState = useAuthState();
    const [editMode, setEditMode] = useState(false); //Edit butonu başka in-aktif
    const [tempImage,setTempImage] = useState();
 
    

        //Login kullanıcı için göstereceksek o bilgiyi  context'teki username'den al,yoksa property olarak aldığın 
    //export function ProfileCard({ user }) username'den al. 
    const visibleUsername = authState.id === user.id ? authState.username : user.username;

    const isLoggedInUser = !editMode && authState.id === user.id;
  
  
    return (
      <div className="card">
        <div className="card-header">
          <ProfileImage width={200} tempImage = {tempImage} image={user.image}/>
          
        </div>
        <div className="card-body text-center">
          {!editMode && <span className="fs-3 d-block">{visibleUsername}</span>}
          {isLoggedInUser && (
            <>
            <Button onClick={() => setEditMode(true)}>Edit</Button>
            <div className="d-inline m-1"></div>
            <UserDeleteButton/>
            </>
            
          )}
          {editMode && <UserEditForm setEditMode={setEditMode} setTempImage = {setTempImage}/>}
        </div>
      </div>
    );
  }