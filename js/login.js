var form = document.querySelector('#form');
var email, clave;
sessionStorage.setItem("uid","")


form.addEventListener("submit", (ev)=>{
    ev.preventDefault();

    email = form.querySelector("#email").value;
    clave = form.querySelector("#clave").value;
   

    login(email,clave)
   console.log(email+"..."+clave)
   
    form.querySelector("#email").value="";
    form.querySelector("#clave").value="";
   
    
    //console.log(nombre);
});

function login(email,clave){
    firebase.auth().signInWithEmailAndPassword(email, clave)
  .then((userCredential) => {
    // Signed in
    var user = userCredential.user;
    //console.log(user)
    //console.log(user.$.W)
    var uid=user.$.W;
    
    
    sessionStorage.setItem("uid",uid);

    
    
    document.location.href="AdminProductos.html"
   
  })
  .catch((error) => {
    var errorCode = error.code;
    var errorMessage = error.message;
  });
}
