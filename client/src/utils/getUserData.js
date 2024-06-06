
const getUserData=()=>{
    const userData=localStorage.getItem('userData');
    if(userData){
      const data=JSON.parse(userData);
      console.log(data)
      return {user:data.user,token:data.token,expiresIn:data.expiresIn};
    }else{
      return null;
    }
}

export default getUserData;