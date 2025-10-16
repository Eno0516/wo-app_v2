//Cookieに関する処理

//Cookieを設定
export function SetCookie(name:string,value:string,days?:number): void {
    let expires = ""
    if (days) {
        const date = new Date()
        date.setTime(date.getTime()+(days*24*60*60*1000))
        expires = "; expires="+date.toUTCString()
    }
    document.cookie = name+"="+encodeURIComponent(value)+expires+"; path=/"
}

//cookieを取得
export function GetCookie(name:string):string|null{
    const cookies = document.cookie.split(";")
    for (const cookie of cookies) {
        const [key,value] = cookie.split("=");
        if (key === name){
            return decodeURIComponent(value)
        }
    }
    return null
}

//cookieを削除
export function DeleteCookie (name:string):void {
    document.cookie = name + "=; expires=Thu,01 Jan 1970 00:00:00 UTC; path=/;"
}
