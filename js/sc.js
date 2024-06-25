$(document).ready(function() {
 
  $('#cart-toggle').click(function(e) {
    e.preventDefault();
    $('#cart-content').fadeToggle();
  });


  $('.add-to-cart').click(function(e) {
    e.preventDefault();
    var productName = $(this).data('name');
    var productPrice = parseFloat($(this).data('price'));
    var cartCount = parseInt($('#cart-count').text());
    var totalItems = parseInt($('#total-items').text());
    var totalPrice = parseFloat($('#total-price').text());

    $('#cart-count').text(cartCount + 1);
    $('#total-items').text(totalItems + 1);
    $('#total-price').text((totalPrice + productPrice).toFixed(2));

    var carrito = JSON.parse(localStorage.getItem("carrito")) || [];
    carrito.push({ nombre: productName, precio: productPrice });
    localStorage.setItem("carrito", JSON.stringify(carrito));

    $('#cart-items').append('<li class="cart-item"><span>' + productName + '</span> <span class="text-muted">$' + productPrice.toFixed(2) + '</span> <span class="delete-item ml-2"><i class="fas fa-trash"></i></span></li>');

    actualizarTotalPrecio();
  });

  // Delete item from cart
  $(document).on('click', '.delete-item', function() {
    var productName = $(this).closest('tr').find('td:first').text();
    var carrito = JSON.parse(localStorage.getItem("carrito")) || [];
    var index = carrito.findIndex(function(item) {
      return item.nombre === productName;
    });
    if (index !== -1) {
      carrito.splice(index, 1);
      localStorage.setItem("carrito", JSON.stringify(carrito));
    }

    $(this).closest('tr').remove();

    var cartCount = parseInt($('#cart-count').text());
    var totalItems = parseInt($('#total-items').text());
    var totalPrice = parseFloat($('#total-price').text());

    $('#cart-count').text(cartCount - 1);
    $('#total-items').text(totalItems - 1);
    $('#total-price').text((totalPrice - parseFloat($(this).closest('tr').find('td:nth-child(2)').text())).toFixed(2));


    actualizarTotalPrecio();
  });

 
  var carrito = JSON.parse(localStorage.getItem("carrito")); 
  if (carrito && carrito.length > 0) {
      var tbody = document.getElementById("carrito-body");
      var totalPrecio = 0;

      carrito.forEach(function(producto) {
          var fila = document.createElement("tr");
          fila.innerHTML = `
              <td>${producto.nombre}</td>
              <td>${producto.precio}</td>
              <td style="text-align: center;">
              <div class="delete-item-container">
                  <svg class="delete-item" viewBox="0 0 24 24">
                      <path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z" />
                  </svg>
              </div>
          </td>
          `;
          tbody.appendChild(fila);

          totalPrecio += parseFloat(producto.precio);
      });

      document.getElementById("totalPrecio").textContent = totalPrecio.toFixed(2);
  }
  
  function actualizarTotalPrecio() {
    var totalPrecio = 0;
    $('#carrito-body tr').each(function() {
      totalPrecio += parseFloat($(this).find('td:nth-child(2)').text());
    });
    $('#totalPrecio').text(totalPrecio.toFixed(2));
  }
});

function limpiarCarrito() {
localStorage.removeItem('carrito');
location.reload();
}


function confirmarCompra() {
  var total_p = document.getElementById('totalPrecio').innerText;
  var carritob = localStorage.getItem('carrito');
  var fecha = new Date();

  db.collection("Venta").add({
      Fecha: fecha.toString(),
      Carrito: carritob,
      Total: total_p,
    })
    .then((docRef) => {
      console.log("El documento fue guardado con el id: ", docRef.id);
      console.log("Información Guardada Satisfactoriamente");
      alert("Compra exitosa. ¡Gracias por tu compra!");
      limpiarCarrito(); 
      location.reload();
    })
    .catch((error) => {
      console.error("Error no guardo: ", error);
      Swal.fire({
        title: 'Error!',
        text: 'No se ha podido registrar la venta',
        icon: "warning",
        imageWidth: 400,
        imageHeight: 200,
        imageAlt: 'Custom image',
      });
    });
}




function updateClock() {
  var clockContainer = document.querySelector('.clock-container');
  var currentTime = new Date().toLocaleTimeString();
  clockContainer.textContent = currentTime;
}

// Llamar a la función updateClock cada segundo
setInterval(updateClock, 1000);