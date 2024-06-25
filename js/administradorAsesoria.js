document.getElementById('exportBtn').addEventListener('click', function() {
    // Lógica para exportar usuarios a PDF
    const checkedRows = document.querySelectorAll('#asetable tbody input[type="checkbox"]:checked');
    const doc = new jsPDF();
    doc.text("Asesorias pendientes Seleccionadas", 10, 10);
    let y = 20;
    checkedRows.forEach(row => {
        const AseData = row.closest('tr').querySelectorAll('td');
        const fullName = AseData[1].textContent;
        const apellido = AseData[2].textContent;
        const Email = AseData[3].textContent;
        const Telefono = AseData[4].textContent;
        const Mensaje = AseData[5].textContent;
        const Finalizado = AseData[6].textContent;
        doc.text(`${fullName}: ${apellido}: ${Email}: ${Telefono}: ${Mensaje}: ${Finalizado}`, 10, y);
        y += 10;
    });
    doc.save('Asesorias_pendientes.pdf');
});