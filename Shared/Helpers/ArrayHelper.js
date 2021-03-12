
export  function FindIndexOfObject(inputArray,key,value){
  return inputArray.findIndex(e=>e[key]==value);
}
export  function FindIndexOfObjectKey(inputArray,key){
    return inputArray.findIndex((e,k)=>k==key);
  }
export  function FindIndexOfArray(inputArray,value){
    return inputArray.findIndex(e=>e==value);
  }

  export  function FindObjectByKey(inputArray,key){
    return inputArray.find((e,k)=>k==key);
  }  
  export  function FindArrayObject(inputArray,key,value){
    return inputArray.find(e=>e[key]==value);
  }
  export  function FindArrayValue(inputArray,value){
      return inputArray.find(e=>e==value);
} 
export  function FindIndexOfArrayValue(inputArray,value){
  return inputArray.findIndex(e=>e==value);
} 
export  function MakeArrayOfObjectKey(inputArray,key){
    
   return[... new Set([...new Set(inputArray)].map(e=>e[key]))] ;
}  
export  function MakeObjectWithArray(inputArray,key,innerArray){
    let arrayOfObjs=[...new Set(inputArray)];
    let keyInd=FindIndexOfObjectKey(arrayOfObjs,key);
    let newObj={[key]:innerArray};
    if(keyInd > -1)
    arrayOfObjs[keyInd]=newObj;
    else
    arrayOfObjs.push(newObj);
    return[...new Set(arrayOfObjs)] ;
 } 
 export  function AddSingleValueInArryByKey(inputArray,key,value){
  
  let newArrCopy=[...new Set(inputArray)];
  let indexOfObj=newArrCopy.findIndex((e)=>e[key]!=undefined);
  if(indexOfObj > -1){
    let valObj=newArrCopy[indexOfObj];
    let valArr=valObj[key];
    valArr.push(value);
   // console.log("===AddSingleValueInArryByKey valNewArr==",valArr,valObj);
    newArrCopy[indexOfObj]={[key]:[...new Set(valArr)]};
  }
  else
  newArrCopy.push({[key]:[...new Set([value])]});
  return [...new Set(newArrCopy)] ;
}
export  function RemoveSingleValueInArryByKey(inputArray,key,value){
  let newArrCopy=[...new Set(inputArray)];
  let indexOfObj=newArrCopy.findIndex((e)=>e[key]!=undefined);
  
  if(indexOfObj > -1){
    let valObj=newArrCopy[indexOfObj];
    let valArr=valObj[key];
    valArr.splice(FindIndexOfArrayValue(valArr,value),1);
    newArrCopy[indexOfObj]={[key]:[...new Set(valArr)]};
  }
  return [...new Set(newArrCopy)] ;
} 
export  function GetArrayFromObjOfArray(inputArray,key){
  inputArray=[...new Set(inputArray)];
  let findObj=inputArray.find(a=>a[key]!=undefined);
  let retrunedArr=(findObj!=undefined)?findObj[key]:[] ;
  return [... new Set(retrunedArr)] ;
}   
export  function CheckIndexOfArray(inputArray,value){
  inputArray=[...new Set(inputArray)];
  
  return inputArray.indexOf(value) > -1 ;
} 
export function PushObjectByKey(inputArray,object,key){
  return AddSingleValueInArryByKey(inputArray,key,object);
}
export function PopObjectByKey(inputArray,object,key){
  return RemoveSingleValueInArryByKey(inputArray,key,object);
}
export  function AddSingleObjectValueInArryByKey(inputArray,value,key){
  let newArrCopy=[...new Set(inputArray)];
  let indexOfObj=newArrCopy.findIndex((e)=>e[key]!=undefined);
  if(indexOfObj > -1){
    newArrCopy[indexOfObj]={[key]:value};
  }
  else
  newArrCopy.push({[key]:value});
  return [...new Set(newArrCopy)] ;
}

export function SingleValuefromObjectArray(inputArray,key) {
  let newArrCopy=[...new Set(inputArray)];
  console.log('k->',newArrCopy);
  let indexOfObj=newArrCopy.findIndex((e)=>e[key]!=undefined);
  if(indexOfObj > -1){
    let obj=newArrCopy[indexOfObj];
    console.log("k->",obj);
   return obj[key];
  }
 return "";
}
export function PushAKeyInObjectByKey(inputArray,key,searchkey,searchVal,newKey,newVal){
  console.log("PushAKeyInObjectByKey====",key,searchkey,searchVal,newKey,newVal);
  let newArrCopy=[...new Set(inputArray)];
  let indexOfObj=newArrCopy.findIndex((e)=>e[key]!=undefined);
  if(indexOfObj > -1){
    let valObj=newArrCopy[indexOfObj];
    let valArr=valObj[key];
    let ObjIndex=valArr.findIndex((e)=>e[searchkey]==searchVal);
    if(ObjIndex > -1){
      let Obj=valArr[ObjIndex];
      Obj[newKey]=newVal;
      valArr[ObjIndex]=Obj;
      console.log("PushAKeyInObjectByKey Inner====",Obj,valArr);
    }

    
    newArrCopy[indexOfObj]={[key]:[...new Set(valArr)]};
  }
  return [...new Set(newArrCopy)] ;
}
// export function GetUUID() {
//   return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
//       var r = Math.random()*16|0, v = c == 'x' ? r : (r&0x3|0x8);
//       return v.toString(16).toUpperCase();
//   });
// } 
export function GetUUID() {
  return new Date().getTime().toString();
}
export  function UpdateSingleValueByKey(inputArray,key,value,innerKey,innerValue){
  
  let newArrCopy=[...new Set(inputArray)];
  let indexOfObj=newArrCopy.findIndex((e)=>e[key]!=undefined);
  console.log("===AddSingleValueInArryByKey indexOfObj==",newArrCopy,indexOfObj);
  if(indexOfObj > -1){
    let valObj=newArrCopy[indexOfObj];
    let valArr=valObj[key];
    let indexOfVal=FindIndexOfObject(valArr,innerKey,innerValue);
    if(indexOfVal > -1){
      valArr[indexOfVal]=value;
    }
    else
   valArr.push(value);
   // console.log("===AddSingleValueInArryByKey valNewArr==",valArr,valObj);
    newArrCopy[indexOfObj]={[key]:[...new Set(valArr)]};
  }
  else
  newArrCopy.push({[key]:[...new Set([value])]});
  console.log("===AddSingleValueInArryByKey indexOfObj==",newArrCopy,indexOfObj);
  return [...new Set(newArrCopy)] ;
}