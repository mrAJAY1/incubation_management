
export function logout(){

     window.confirm('are you sure ?')
     fetch('http://localhost:8080/logout',{
        method:'GET',
        credentials:'include',
        headers:{
            Accept:'application/json',
            'Content-Type':'application/json'
        }
     }).then(res=>{
        localStorage.removeItem('id')
      window.location.href='/login'
     })
}