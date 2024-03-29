
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



