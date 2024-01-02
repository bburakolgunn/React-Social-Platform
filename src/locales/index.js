import i18n from "i18next";
import {  initReactI18next } from "react-i18next";
import en from "./translations/en.json"
import tr from "./translations/tr.json"

const initialLanguage = localStorage.getItem('lang') || navigator.language || 'en'
//fallbacklng localstore'da eğer dil seçimi varsa onu kullan demek istiyorum.
//Key'imiz lang.
//Uygulamaya ilk geldiğinde bir kullanıcı LocalStore boş olabilir.
//Bu sayede kullanıcının seçimini localstore'da tutuyoruz,sayfayı yenilese dahi dil seçimi değişmeyecektir.
//Uygulamayla etkileşimini kolaylaştıran bir davranış sunuyoruz. 

export const i18nInstance = i18n.use(initReactI18next) 

i18nInstance.init({
   
    resources: {
      en: {
        translation: en
      },
      tr : {
        translation: tr
      }
    },
   
    fallbackLng: initialLanguage,

    interpolation: {
      escapeValue: false // react already safes from xss => https://www.i18next.com/translation-function/interpolation#unescape
    }
  });