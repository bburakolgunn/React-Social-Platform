import {  useState } from "react";
import {  useAuthState } from "../../../../shared/state/context";
import { Button } from "../../../../shared/components/Button";

import { ProfileImage } from "../../../../shared/components/ProfileImage";
import { UserEditForm } from "./UserEditForm";



 
 
  
  export function ProfileCard({ user }) {

    const authState = useAuthState();
    const [editMode, setEditMode] = useState(false); //Edit butonu başka in-aktif
 
    

        //Login kullanıcı için göstereceksek o bilgiyi  context'teki username'den al,yoksa property olarak aldığın 
    //export function ProfileCard({ user }) username'den al. 
    const visibleUsername = authState.id === user.id ? authState.username : user.username;

    const isEditButtonVisible = !editMode && authState.id === user.id;
  
  
    return (
      <div className="card">
        <div className="card-header">
          <ProfileImage width={200}/>
          
        </div>
        <div className="card-body text-center">
          {!editMode && <span className="fs-3 d-block">{visibleUsername}</span>}
          {isEditButtonVisible && (
            <Button onClick={() => setEditMode(true)}>Edit</Button>
          )}
          {editMode && <UserEditForm setEditMode={setEditMode}/>}
        </div>
      </div>
    );
  }