import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useAuthDispatch, useAuthState } from "../../../../shared/state/context";
import { updateUser } from "./api";
import { Input } from "../../../../shared/components/Input";
import { Alert } from "../../../../shared/components/Alert";
import { Button } from "../../../../shared/components/Button";
import { Form } from "react-router-dom";

export function UserEditForm({setEditMode}) {
  const authState = useAuthState();
  const { t } = useTranslation();
  const [newUsername, setNewUsername] = useState(authState.username);
  const [apiProgress, setApiProgress] = useState(false);
  const [errors, SetErrors] = useState({});
  const [generalError, setGeneralError] = useState();
  const dispatch = useAuthDispatch();

  const onChangeUsername = (event) => {
    setNewUsername(event.target.value);
    SetErrors({});
  };

  //Edit tuşuna basıp yazı yazıldıktan sonra cancel'a basıp daha sonra eski yazıyı save edildiğinde
  // cancel'a basılan ortaya çıkmaktadır,hataya çözüm için yazılmıştır.
  const onClickCancel = () => {
    setEditMode(false);
    setNewUsername(authState.username);
  };

  const onSubmit = async (event) => {
    event.preventDefault(); //Submit eventleri tarayıcıda işlem çalıştığından onu event.prevendDefault ile durdurulmalı.
    setApiProgress(true); //Yoksa sayfanın yenilenmesine sebep olur
    SetErrors({});
    setGeneralError();
    try {
      await updateUser(authState.id, { username: newUsername });
      dispatch({
        type: "user-update-success",
        data: { username: newUsername },
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
