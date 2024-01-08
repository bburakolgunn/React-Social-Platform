import { useContext, useState } from "react";
import { AuthContext, useAuthDispatch, useAuthState } from "../../../../shared/state/context";
import { Button } from "../../../../shared/components/Button";
import { useTranslation } from "react-i18next";
import { Input } from "../../../../shared/components/Input";
import { updateUser } from "./api";
import { Alert } from "../../../../shared/components/Alert";
import { ProfileImage } from "../../../../shared/components/ProfileImage";

export function ProfileCard({ user }) {
  const authState = useAuthState();
  const [editMode, setEditMode] = useState(false); //Edit butonu başka in-aktif
  const isEditButtonVisible = !editMode && authState.id === user.id;
  const { t } = useTranslation();
  const [newUsername, setNewUsername] = useState(authState.username);
  const [apiProgress,setApiProgress] = useState(false);
  const [errors, SetErrors] = useState({});
  const [generalError, setGeneralError] = useState();
  const dispatch = useAuthDispatch();

  //Login kullanıcı için göstereceksek o bilgiyi  context'teki username'den al,yoksa property olarak aldığın 
  //export function ProfileCard({ user }) username'den al. 
  const visibleUsername = authState.id === user.id ? authState.username : user.username;

  const onChangeUsername = (event) => {
    setNewUsername(event.target.value);
    SetErrors({})
  };

  //Edit tuşuna basıp yazı yazıldıktan sonra cancel'a basıp daha sonra eski yazıyı save edildiğinde
  // cancel'a basılan ortaya çıkmaktadır,hataya çözüm için yazılmıştır.
  const onClickCancel = () => {
    setEditMode(false);
    setNewUsername(authState.username)
  }

  const onClickSave = async () => {
    setApiProgress(true);
    SetErrors({})
    setGeneralError();
    try{
        await updateUser (user.id, {username: newUsername});
        dispatch({type : 'user-update-success', data : {username : newUsername}})
        setEditMode(false);
    }catch (axiosError) {
       
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

    }finally{
        setApiProgress(false);
    }
  }



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
        {editMode && (
          <>
            <Input
              label={t("username")}
              defaultValue={visibleUsername}
              onChange={onChangeUsername}
              error = {errors.username}
            />
            {generalError && <Alert styleType="danger">{generalError}</Alert>}
            <Button apiProgress={apiProgress} onClick={onClickSave} >Save</Button>
            <div className="d-inline m-1"></div>
            <Button
              styleType="outline-secondary"
              onClick={onClickCancel}
            >
              Cancel
            </Button>
          </>
          //edit modda isek kişinin kullanıcı adı gözükmesin orada sadece username başlığı gözüksün
        )}
      </div>
    </div>
  );
}
