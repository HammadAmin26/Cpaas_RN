import { API } from '../Constants/Api/index';
import {Auth,SetAuthWithHeader} from '../Helpers/Auth';
let https=API.APISERVER.replace('http','https')
let serverApiUrl=https
console.log("api url-->",serverApiUrl);
class Api{
    async Request(url,data) {
        try {
          return await this.Post(`${serverApiUrl}/${url}`, data);
        } catch (error) {
          return false;
        }
      
      }  
       Acquire(url,data) {
      
       return fetch(`${serverApiUrl}/${url}`, { 
        method: 'POST',
        body: JSON.stringify(data),
        mode: 'cors',
        headers: {
            'Content-Type': 'application/json',
            "Accept": 'application/json',
        }
    })
.then((data) => data.json())
.then((resp) => {return resp})
.catch((err) => console.log(err))
      
      } 
      GetRequest(url,data,props) { 
        return this.Get(url,data,SetAuthWithHeader(props)); 
       } 
       async  Get(url = '', data = {},bearer) {
        // Default options are marked with *
        let  userData ={};
      await  fetch(`${serverApiUrl}/${url}`, {
               // method: 'GET',
               // body: JSON.stringify(data),
                mode: 'cors',
                headers: {
                  'Authorization': bearer,
                    'Content-Type': 'application/json',
                    "Accept": 'application/json',
                }
            })
        .then((data) => data.json())
        .then((resp) => userData=resp)
        .catch((err) => console.log(err))
        return userData; // parses JSON response into native JavaScript objects
      }      
      async  Post(url = '', data = {},bearer) {
          // Default options are marked with *
          let  userData ={};
        await  fetch(`${serverApiUrl}/${url}`, {
                  method: 'POST',
                  body: JSON.stringify(data),
                  mode: 'cors',
                  headers: {
                    'Authorization': bearer,
                      'Content-Type': 'application/json',
                      "Accept": 'application/json',
                  }
              })
          .then((data) => data.json())
          .then((resp) => userData=resp)
          .catch((err) => console.log(err))
          return userData; // parses JSON response into native JavaScript objects
        }
   Common(url = '', data = {},props){
    
    return this.Post(url,data,SetAuthWithHeader(props));
   }     

}
const ApiService=new Api();
export default ApiService;