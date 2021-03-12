import ApiService from '../Services/Api';
class UserService{

Login(user){
return ApiService.Acquire('Login',user);
}
Signup(user){
    return ApiService.Acquire('signup',user);
    }
Profile(props){
    return ApiService.Common('GetClient',{},props); 
}
FriendList(props){
    let data={
        row_count:"100",
        start_row:"0"
        }
    return ApiService.GetRequest('AllUsers',data,props); 
}
GroupList(props){
    return ApiService.GetRequest('AllGroups',{},props); 
}
CreateGroup(data,props){
    return ApiService.Common('CreateGroup',data,props); 
}


}
const User=new UserService();
export  default User;