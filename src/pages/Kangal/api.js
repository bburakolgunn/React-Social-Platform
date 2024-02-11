import http from "../../lib/http";


export function postKangal(kangalite){
    return http.post('api/v1/kangals',kangalite);
}

export function getKangals(page = 0 ) {
    return http.get('api/v1/kangals?page=' + page);
};