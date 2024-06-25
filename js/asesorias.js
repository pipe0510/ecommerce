

var db = firebase.firestore();

//funcion asesoria ciberseguridad

function Registrar_asesoria_c() {

	var db = firebase.firestore();

	var nombre = document.getElementById('inputNombres_C').value;
	var apellido= document.getElementById('inputApellidos_C').value;
	var telefono= document.getElementById('inputTelefono_C').value;
	var correo = document.getElementById('inputEmail_C').value;
	var mensaje = document.getElementById('inputMensaje_C').value;
    var check = document.getElementById('checkDatos_C').checked;
    //var t_c="ciberseguridad";
	
    if(check != true ){
        Swal.fire({
            title: 'Error!',
            text: 'Para realizar el registro de la asesoria, es necesario que acepte nuestra politica de tratamiento de datos',
            icon: "warning",
            imageWidth: 400,
            imageHeight: 200,
            imageAlt: 'Custom image',
        })
        console.log(check);
        document.getElementById('checkDatos_C').checked =false ;
    }else{
        Swal.fire({
            title: 'Listo!',
       text: 'Asesoría registrada satisfactoriamente, en breve nos comunicaremos con usted en el menor tiempo posible',
       icon: 'success',
       imageWidth: 400,
       imageHeight: 200,
       imageAlt: 'Custom image',
       })

       //console.log(nombre , apellido , telefono , correo , mensaje , check ,);

	db.collection("asesoria_ciberseguridad").add({

		Nombres: nombre,
		Apellidos: apellido,
		Telefono: telefono,
		Email: correo,
		Mensaje: mensaje,
		Autorizacion: check
	})
		.then((docRef) => {
			console.log("El documento fue guardado con el id: ", docRef.id);

			console.log("Información Guardada Satisfactoriamente");
			Swal.fire({
				 title: 'Listo!',
            text: 'Asesoría registrada satisfactoriamente, en breve nos comunicaremos con usted en el menor tiempo posible',
            icon: 'success',
            imageWidth: 400,
            imageHeight: 200,
            imageAlt: 'Custom image',
			})

		})
		.catch((error) => {
			console.error("Error no guardo: ", error);
			Swal.fire({
				title: 'Error!',
				text: 'No se ha podido registrar la Asesoría, porfavor intente nuevamente',
				icon: "warning",
				imageWidth: 400,
				imageHeight: 200,
				imageAlt: 'Custom image',
			})
		});

	
	document.getElementById('inputNombres_C').value = "";
	document.getElementById('inputApellidos_C').value = "";
	document.getElementById('inputEmail_C').value = "";
	document.getElementById('inputTelefono_C').value = "";
	document.getElementById('inputMensaje_C').value = "";
	document.getElementById('checkDatos_C').checked =false ;

    }
}


//creamos la funcion que nos permitira llammar a las asesorias

function leerasesoria() {
    
	
	//insatanciamos la base de datos es el registro de asesoria ciber seguridad
	db.collection("asesoria_ciberseguridad")
	// realizamos la respectiva condicion para que la base de datos imprima solo las asesoria que no han sido finalizadas
    .where("Finalizado", "==", false)
    .onSnapshot((querySnapshot) => {
	//limpiamos la etiqueta donde impriremos los registros
	document.getElementById("leerasesoria").innerHTML = '';		
		
    querySnapshot.forEach((doc) => {
        console.log(`${doc.id} => ${doc.data()}`);
        document.getElementById('leerasesoria').innerHTML += `
		       	 <tr>
                    <td><input type="checkbox"></td>
		       	 	<td>${doc.data().Nombres}</td>
						<td>${doc.data().Apellidos}</td>
                        <td>${doc.data().Email}</td>
                        <td>${doc.data().Telefono}</td>
						 <td>${doc.data().Mensaje}</td>
                        <td>${doc.data().Finalizado}</td>
						<td><button onclick="finalizar('${doc.id}')"class="btn btn-primary">finalizar</button></td>
					</tr> 
		        `;  
      
    });
});

}
// llamamos la funcion 
leerasesoria();

//creamos la funcion de finalizar asesoria

function finalizar(id){
	

	//cramos una variable donde instanciemos l base de daros
    var asesoriaref = db.collection("asesoria_ciberseguridad").doc(id);

	//realizamos el resectivo update de el registro
	return asesoriaref.update({
		Finalizado: true 
    })
    .then(() => {
        console.log("El registro se guardo");
        Swal.fire({
            title: 'Listo!',
            text: 'Asesoria finalizada satisfactoriamente',
            icon: 'success',
            imageWidth: 400,
            imageHeight: 200,
            imageAlt: 'Custom image',
        })
    })
    .catch((error) => {
        // The document probably doesn't exist.
        console.error("Error editando el documento: ", error);
        Swal.fire({
            title: 'Error!',
            text: 'No se ha podido guardar los cambios',
            icon: "warning",
            imageWidth: 400,
            imageHeight: 200,
            imageAlt: 'Custom image',
        })
    });
}
function limpiar(){
    var nombre = document.getElementById('bnombre').value= "";
	var apellido= document.getElementById('bapellido').value ="";
}

function b(){
    var nombre1 = document.getElementById('bnombre').value;
	var apellido2= document.getElementById('bapellido').value;
}

function leerasesoria2() {
    var nombre1 = document.getElementById('bnombre').value;
	var apellido2= document.getElementById('bapellido').value;
	
	//insatanciamos la base de datos es el registro de asesoria ciber seguridad
	db.collection("asesoria_ciberseguridad")
	// realizamos la respectiva condicion para que la base de datos imprima solo las asesoria que no han sido finalizadas
    .where("Nombres", "==",nombre1,"Apellidos","==",apellido2 )
    .onSnapshot((querySnapshot) => {
	//limpiamos la etiqueta donde impriremos los registros
	document.getElementById("leerasesoria2").innerHTML = '';		
		
    querySnapshot.forEach((doc) => {
        console.log(`${doc.id} => ${doc.data()}`);
        document.getElementById('leerasesoria2').innerHTML += `
		       	 <tr>
		       	 	<td>${doc.data().Nombres}</td>
						<td>${doc.data().Apellidos}</td>
                        <td>${doc.data().Email}</td>
                        <td>${doc.data().Telefono}</td>
						 <td>${doc.data().Mensaje}</td>
                        <td>${doc.data().Finalizado}</td>
						<td><button onclick="finalizar('${doc.id}')"class="btn btn-secondary">finalizar</button></td>
					</tr> 
		        `;  
      
    });
});

}
// llamamos la funcion 
leerasesoria2();