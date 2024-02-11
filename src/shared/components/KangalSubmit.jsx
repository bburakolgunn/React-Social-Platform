import { useState } from "react";
import { ProfileImage } from "./ProfileImage";
import { useTranslation } from "react-i18next";
import { useEffect } from "react";
import { postKangal } from "../../pages/Kangal/api";

//textarea bize birden fazla birkaç satırlık input alanı sunabilmesi.
export function KangalSubmit(){
  const { tempImage } = useState();
  const [focused, setFocused] = useState(false);
  const [errors,setErrors] = useState({});
  const [kangal, setKangal] = useState(""); //boş text verme amacı:Bir şekilde kullanıcı kangalite derse o json içerisine bu field gösterilmiyor olacak.
  const { t } = useTranslation();

  useEffect(() => {
    if(!focused){
        setKangal('');
        setErrors({})
    }
  },[focused])

  useEffect(() => { //istenilen karakter aralığında yazılırsa validation kalksın.
    setErrors({})  
  }, [kangal])

  const onClickKangal = async () => {
    const body = {
        content : kangal
    }
    try{
       await postKangal(body) 
       setFocused(false);//butona basınca text kaybolsun
    }
    catch(error){
      if (error.response.data.validationError){
        setErrors(error.response.data.validationError);
    }
    }
  }

  let textAreaClass = 'form-control';
  if(errors.content){
    textAreaClass += ' is-invalid';
  }

  return (
    <div className="card p-1 flex-row">
      <ProfileImage
        width={32}
        tempImage={tempImage}
        height="32"
        className="rounded-circle mr-2"
      />
      <div className="flex-fill">
        <textarea
          className={textAreaClass}
          rows={focused ? "3" : "1"}
          onFocus={() => setFocused(true)}
          onChange={(event) => setKangal(event.target.value)}
          value={kangal}
        />
        <div className="invalid-feedback">{errors.content}</div>
        {focused && (
          <div className="text-right mt-1">
            <button className="btn btn-primary" onClick={onClickKangal}>Kangalite</button>
            <button
              className="btn btn-light d-inline-flex ml-1"
              onClick={() => setFocused(false)}
            >
              <i className="material-icons" />
              {t("Cancel")}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

