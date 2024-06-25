document.getElementById('searchBtn').addEventListener('click', function() {
    const searchValue = document.getElementById('searchInput').value.trim().toLowerCase();
    const minPrice = parseFloat(document.getElementById('minPriceInput').value.trim());
    const maxPrice = parseFloat(document.getElementById('maxPriceInput').value.trim());

    const filteredProducts = [];

    productosMovil.forEach(producto => {
        if (matchesSearchCriteria(producto, searchValue, minPrice, maxPrice)) {
            filteredProducts.push(producto);
        }
    });

    productosHogar.forEach(producto => {
        if (matchesSearchCriteria(producto, searchValue, minPrice, maxPrice)) {
            filteredProducts.push(producto);
        }
    });

    displayFilteredProducts(filteredProducts);
});

function matchesSearchCriteria(producto, searchValue, minPrice, maxPrice) {
    const productName = producto.nombre.toLowerCase();
    const productPrice = producto.precio;

    const nameMatch = productName.includes(searchValue);
    let priceMatch = true;

    if (!isNaN(minPrice) && !isNaN(maxPrice)) {
        priceMatch = productPrice >= minPrice && productPrice <= maxPrice;
    } else if (!isNaN(minPrice)) {
        priceMatch = productPrice >= minPrice;
    } else if (!isNaN(maxPrice)) {
        priceMatch = productPrice <= maxPrice;
    }

    return nameMatch && priceMatch;
}

function displayFilteredProducts(filteredProducts) {
    const tbody = document.querySelector("#productTable tbody");
    tbody.innerHTML = "";

    filteredProducts.forEach(producto => {
        const row = "<tr>" +
            "<td><input type='checkbox'></td>" +
            "<td><i class='fas fa-trash-alt delete-product'></i></td>" +
            "<td>" + producto.nombre + "</td>" +
            "<td>" + producto.descripcion + "</td>" +
            "<td>$" + producto.precio + "</td>" +
            "</tr>";
        tbody.innerHTML += row;
    });
}


        document.getElementById('saveBtn').addEventListener('click', function() {
            // Lógica para guardar los productos
            alert('Guardado exitoso');
        });

        var productosMovil = [
            {
                nombre: "Plan Estandar Movil",
                descripcion: "5GB de datos móviles, 100 minutos de llamadas, WhatsApp sin consumir datos, Facebook e Instagram sin consumir datos",
                precio: 30000
            },
            {
                nombre: "Plan Intermedio Movil",
                descripcion: "10GB de datos móviles, 200 minutos de llamadas, WhatsApp y Facebook sin consumir datos, Instagram y Twitter sin consumir datos",
                precio: 50000
            },
            {
                nombre: "Plan Premium Movil",
                descripcion: "20GB de datos móviles, Llamadas ilimitadas, WhatsApp y Facebook, Instagram y Twitter sin consumir datos",
                precio: 80000
            }
        ];

        var productosHogar = [
            {
                nombre: "Plan Estandar Hogar",
                descripcion: "100 canales HD, 50 Mbps de velocidad de navegación, Llamadas ilimitadas locales",
                precio: 50000
            },
            {
                nombre: "Plan Intermedio Hogar",
                descripcion: "200 canales HD, 100 Mbps de velocidad de navegación, Llamadas ilimitadas nacionales",
                precio: 80000
            },
            {
                nombre: "Plan Premium Hogar",
                descripcion: "300 canales HD, 200 Mbps de velocidad de navegación, Llamadas ilimitadas internacionales",
                precio: 120000
            }
        ];



        function cargarProductos() {
            var tbody = document.querySelector("#productTable tbody");
            tbody.innerHTML = ""; // Limpiar contenido existente
        
   
            productosMovil.forEach(function(producto) {
                var row = "<tr class='mobile-product " + getPriceClass(producto.precio) + "'>" +
                    "<td><input type='checkbox'></td>" +
                    "<td><i class='fas fa-trash-alt delete-product'></i></td>" +
                    "<td>" + producto.nombre + "</td>" +
                    "<td>" + producto.descripcion + "</td>" +
                    "<td>$" + producto.precio + "</td>" +
                    "</tr>";
                tbody.innerHTML += row;
            });
        
    
            productosHogar.forEach(function(producto) {
                var row = "<tr class='home-product " + getPriceClass(producto.precio) + "'>" +
                    "<td><input type='checkbox'></td>" +
                    "<td><i class='fas fa-trash-alt delete-product'></i></td>" +
                    "<td>" + producto.nombre + "</td>" +
                    "<td>" + producto.descripcion + "</td>" +
                    "<td>$" + producto.precio + "</td>" +
                    "</tr>";
                tbody.innerHTML += row;
            });

            document.getElementById('exportBtn').addEventListener('click', function() {
            });

            document.getElementById('saveBtn').addEventListener('click', function() {
            });
        }

        
        function getPriceClass(price) {
            if (price < 50000) {
                return "price-low";
            } else if (price >= 50000 && price < 100000) {
                return "price-medium";
            } else {
                return "price-high";
            }
        }

        
        
        document.addEventListener("DOMContentLoaded", function() {
            cargarProductos();
        });



        //limpiar
        document.getElementById('clearBtn').addEventListener('click', function() {
            document.getElementById('searchInput').value = '';
            document.getElementById('minPriceInput').value = '';
            document.getElementById('maxPriceInput').value = '';
        
    
            cargarProductos();
        });
        

      // imprimir pdf

      document.getElementById('exportBtn').addEventListener('click', function() {
        const doc = new jsPDF();
        const table = document.getElementById('productTable');
        const rows = table.querySelectorAll('tr');
    
        // Título
        doc.setFontSize(20);
        var texto = 'Productos Seleccionados';
        var textoWidth = doc.getStringUnitWidth(texto) * doc.internal.getFontSize() / doc.internal.scaleFactor;
        var posicionX = (doc.internal.pageSize.width - textoWidth) / 2;
        doc.text(texto, posicionX, 10);
    
        // Márgenes
        doc.setLineWidth(0.5);
        doc.setDrawColor(0);
        doc.rect(10, 15, 190, 0);
    
        // Contenido
        let pdfRowIndex = 0;
        let startY = 0; 
        const maxRowsPerPage = 40; 
    
        const drawRows = (startY, rows) => {
            rows.forEach((row, index) => {
                if (pdfRowIndex >= maxRowsPerPage) {
                    doc.addPage(); 
                    startY = 10; 
                    pdfRowIndex = 0;
                }
    
                const cols = row.querySelectorAll('td');
                const rowData = [];
    
                cols.forEach(col => {
                    rowData.push(col.innerText.replace(/,/g, '\n')); 
                });
    
                const rowText = rowData.join('-');
                doc.text(10, startY + (pdfRowIndex * 25), rowText);
                pdfRowIndex++;
                startY += 10; 
            });
 
            startY += 10;
        };
    
        drawRows(startY, rows);
        doc.save('productos.pdf');
    });
    