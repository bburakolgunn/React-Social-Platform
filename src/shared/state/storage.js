
//Login girişi yaptıktan sonra sayfa yenilerken navi'nin korunması

export function storeAuthState(auth){
    localStorage.setItem('auth',JSON.stringify(auth));
}

export function loadAuthState(){
    const defaultState = {id : 0};
    const authStateInStorage = localStorage.getItem('auth');
    if(!authStateInStorage) return defaultState;
    try{
        return JSON.parse(authStateInStorage)
    }catch{
        return defaultState;
    }

}

//Burada Authorization sekmesinde tokenlerin sayfa yenilenirken kaybolması sebebi ile yazıldı.
export function storeToken(token){
if(token){
    localStorage.setItem('token',JSON.stringify(token))//token bir obje olduğu için String'e çevrildi.
} else{
    localStorage.removeItem('token') //Logout senaryosu
}
}

//İnitialize anında  localstorage'den token getirilmesi
export function loadToken(){
     const  tokenInString = localStorage.getItem('token')
     if(!tokenInString) return null;
     try{
        return JSON.parse(tokenInString);
     }
     catch{
        return null;
     }
}

