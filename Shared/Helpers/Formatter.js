export  function NameSeparater(name){
    let nameArray=[];
    name=name.split(' ');
    name.map((v)=>{
        nameArray.push(v.charAt(0).toUpperCase()) ;
    });
   return nameArray.join(' ');
}
export function Encrypt(value) 
{
  var result="";
  for(var i=0;i<value.length;i++)
  {
    if(i<value.length-1)
    {
        result+=value.charCodeAt(i)+10;
        result+="-";
    }
    else
    {
        result+=value.charCodeAt(i)+10;
    }
  }
  return result;
}

export function Decrypt(value)
{
  var result="";
  var array = value.split("-");

  for(var i=0;i<array.length;i++)
  {
    result+=String.fromCharCode(array[i]-10);
  }
  return result;
} 
export function utf8ToHex(str) {
  return Array.from(str).map(c => 
    c.charCodeAt(0) < 128 ? c.charCodeAt(0).toString(16) : 
    window.encodeURIComponent(c).replace(/\%/g,'').toLowerCase()
  ).join('');
}
export function hexToUtf8(hex) {
  return window.decodeURIComponent('%' + hex.match(/.{1,2}/g).join('%'));
}
export function userNameFinder(arr,obj) {
  let fullname="";
  arr.forEach(g=>{
    let findSub=g.participents.findIndex(p => p.username==obj.username );
    if(findSub==-1){
      fullname=g.grouptitle;
      if(g.auto_created=='1')
      fullname=g.participents[0].full_name;
    }
  });

  return fullname;
}
export function isValidURL(string) {
  var res = string.match(/(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g);
  return (res !== null)
};
export function isValidImageUrl(url) {
  return ["png","jpg","jpeg","gif","svg"].findIndex(v=>url.indexOf(v)>-1) > -1
};
