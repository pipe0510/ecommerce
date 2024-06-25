
var uid =sessionStorage.getItem("uid");


if(uid==""){
    document.location.href="login.html";
}else{
    var user= db.collection("usuarios").doc(uid);

user.get().then((doc) => {
    if (doc.exists) {
        console.log("Document data:", doc.data());
        //document.getElementById("usuario").innerHTML=``
    } else {
        // doc.data() will be undefined in this case
        console.log("No such document!");
    }
}).catch((error) => {
    console.log("Error getting document:", error);
});
}