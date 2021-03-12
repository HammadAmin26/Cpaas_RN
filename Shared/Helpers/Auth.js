export  function Auth(){
return localStorage.getItem('__t');
}
export  function AuthUser(){
    return JSON.parse(window.atob(localStorage.getItem('__u')));
    }
export  function SetAuth(t){
    return localStorage.setItem('__t',t);
}
export  function SetAuthUser(u){
     localStorage.setItem('__u',window.btoa(JSON.stringify(u)));
}
export  function RemoveAuth(t){
     localStorage.removeItem('__t');
     localStorage.removeItem('__u');
}
export  function SetAuthWithData(props,data){
    data.auth_token=props.user.auth_token;
    return props.user.auth_token;;
}
export  function SetAuthWithHeader(props){
    return 'Bearer ' +props.user.auth_token;
}
