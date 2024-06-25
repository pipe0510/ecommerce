document.getElementById('searchBtn').addEventListener('click', function() {
    const nameValue = document.getElementById('nameInput').value.toLowerCase();
    const profileValue = document.getElementById('profileInput').value.toLowerCase();
    const rows = document.querySelectorAll('#userTable tbody tr');

    rows.forEach(row => {
        const fullName = row.cells[2].textContent.toLowerCase();
        const profile = row.cells[3].textContent.toLowerCase();

        const nameMatch = fullName.includes(nameValue);
        const profileMatch = profile.includes(profileValue);

        row.style.display = (nameMatch && profileMatch) ? 'table-row' : 'none';
    });
});

document.getElementById('exportBtn').addEventListener('click', function() {
    // Lógica para exportar usuarios a PDF
    const checkedRows = document.querySelectorAll('#userTable tbody input[type="checkbox"]:checked');
    const doc = new jsPDF();
    doc.text("Usuarios Seleccionados", 10, 10);
    let y = 20;
    checkedRows.forEach(row => {
        const userData = row.closest('tr').querySelectorAll('td');
        const fullName = userData[2].textContent;
        const profile = userData[3].textContent;
        doc.text(`${fullName}: ${profile}`, 10, y);
        y += 10;
    });
    doc.save('usuarios_seleccionados.pdf');
});

document.getElementById('saveBtn').addEventListener('click', function() {
    // Lógica para guardar los usuarios
    alert('Guardado exitoso');
});

const deleteButtons = document.querySelectorAll('.delete-user');
deleteButtons.forEach(button => {
    button.addEventListener('click', function() {
        const row = this.closest('tr');
        row.remove();
    });
});