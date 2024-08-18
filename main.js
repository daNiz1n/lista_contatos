function validateName(name) {
    const nameParts = name.trim().split(' ');
    return nameParts.length >= 2;
}

function validatePhone(phone) {
    const phonePattern = /^\d{11}$/;
    return phonePattern.test(phone);
}

function formatPhone(phone) {
    phone = phone.replace(/\D/g, '');
    
    const ddd = phone.substring(0, 2);
    const firstPart = phone.substring(2, 3);
    const middlePart = phone.substring(3, 7);
    const lastPart = phone.substring(7, 11);
    
    return `(${ddd}) ${firstPart}-${middlePart}-${lastPart}`;
}

function isPhoneAlreadyInList(formattedPhone) {
    const rows = document.querySelectorAll("#contactTable tbody tr");
    for (let row of rows) {
        const phoneCell = row.cells[1].textContent;
        if (phoneCell === formattedPhone) {
            return true;
        }
    }
    return false;
}

function addContact() {
    const nameInput = document.getElementById('name');
    const phoneInput = document.getElementById('phone');
    
    const name = nameInput.value.trim();
    let phone = phoneInput.value.trim();

    const nameError = document.getElementById('nameError');
    const phoneError = document.getElementById('phoneError');
    
    nameError.textContent = '';
    phoneError.textContent = '';

    if (!validateName(name)) {
        nameError.textContent = 'Por favor, insira o nome completo.';
        return;
    }
    
    if (!validatePhone(phone)) {
        phoneError.textContent = 'O telefone deve conter exatamente 11 dígitos.';
        return;
    }
    
    phone = formatPhone(phone);
    
    if (isPhoneAlreadyInList(phone)) {
        phoneError.textContent = 'Este número de telefone já foi adicionado.';
        return;
    }
    
    const contactTable = document.getElementById('contactTable').getElementsByTagName('tbody')[0];
    const newRow = contactTable.insertRow();
    
    const nameCell = newRow.insertCell(0);
    const phoneCell = newRow.insertCell(1);
    
    nameCell.textContent = name;
    phoneCell.textContent = phone;
    
    nameInput.value = '';
    phoneInput.value = '';
}