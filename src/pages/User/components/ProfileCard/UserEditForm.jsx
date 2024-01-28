import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useAuthDispatch, useAuthState } from "../../../../shared/state/context";
import { updateUser } from "./api";
import { Input } from "../../../../shared/components/Input";
import { Alert } from "../../../../shared/components/Alert";
import { Button } from "../../../../shared/components/Button";
import { Form } from "react-router-dom";

export function UserEditForm({setEditMode, setTempImage}) {
  const authState = useAuthState();
  const { t } = useTranslation();
  const [newUsername, setNewUsername] = useState(authState.username);
  const [apiProgress, setApiProgress] = useState(false);
  const [errors, SetErrors] = useState({});
  const [generalError, setGeneralError] = useState();
  const dispatch = useAuthDispatch();
  const [newImage,setNewImage] = useState();

  const onChangeUsername = (event) => {
    setNewUsername(event.target.value);
      SetErrors(function(lastErrors){
        return {
          ...lastErrors,
          username: undefined
        }
      });      
  };

  //Edit tuşuna basıp yazı yazıldıktan sonra cancel'a basıp daha sonra eski yazıyı save edildiğinde
  // cancel'a basılan ortaya çıkmaktadır,hataya çözüm için yazılmıştır.
  const onClickCancel = () => {
    setEditMode(false);
    setNewUsername(authState.username);
    setNewImage();
    setTempImage();
  };

  //Profil resim yükleme işlemi
  const onSelectImage  = (event) => {
    SetErrors(function(lastErrors){
      return {
        ...lastErrors,
        image: undefined
      }
    });  
    if(event.target.files< 1) return;
    const file = event.target.files[0]
    const fileReader = new FileReader();

    fileReader.onloadend = () =>{
      const data = fileReader.result //Seçilen dosyanın yada image'ın String olmuş hali
      setNewImage(data);
      setTempImage(data);
    }


    fileReader.readAsDataURL(file);
  }

  const onSubmit = async (event) => {
    event.preventDefault(); //Submit eventleri tarayıcıda işlem çalıştığından onu event.prevendDefault ile durdurulmalı.
    setApiProgress(true); //Yoksa sayfanın yenilenmesine sebep olur
    SetErrors({});
    setGeneralError();
    try {
       const { data } =  await updateUser(authState.id, { username: newUsername , image : newImage });
      dispatch({
        type: "user-update-success",
        data: { username: data.username , image : data.image },
      });
      setEditMode(false);
    } catch (axiosError) {
      if (axiosError.response?.data) {
        if (axiosError.response.data.status === 400) {
          SetErrors(axiosError.response.data.validationError);
        } else {
          setGeneralError(axiosError.response.data.message);
        }
      } else {
        setGeneralError(t("genericError"));
      }
    } finally {
      setApiProgress(false);
    }
  };

  return (
    <Form onSubmit={onSubmit}>
      <Input
        label={t("username")}
        defaultValue={authState.username}
        onChange={onChangeUsername}
        error={errors.username}
      />
      <Input
      label = {t("ProfileImage")}
      type = "file"
      onChange = {onSelectImage}
      error = {errors.image}
      />
      {generalError && <Alert styleType="danger">{generalError}</Alert>}
      <Button apiProgress={apiProgress}  type="submit">
        Save
      </Button>
      <div className="d-inline m-1"></div>
      <Button styleType="outline-secondary" onClick={onClickCancel} type="button">
        Cancel
      </Button>
    </Form>
  );
  //edit modda isek kişinin kullanıcı adı gözükmesin orada sadece username başlığı gözüksün
}
