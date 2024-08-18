function validateName(name) {
    const nameParts = name.trim().split(' ');
    return nameParts.length >= 2;
}

function validatePhone(phone) {
    const phonePattern = /^\d{11}$/;
    return phonePattern.test(phone);
}

function formatPhone(phone) {
    // Remove qualquer caractere que não seja número (apesar de o campo já aceitar apenas dígitos)
    phone = phone.replace(/\D/g, '');
    
    // Formata o número no padrão (XX) 9-XXXX-XXXX
    const ddd = phone.substring(0, 2);
    const firstPart = phone.substring(2, 3);
    const middlePart = phone.substring(3, 7);
    const lastPart = phone.substring(7, 11);
    
    return `(${ddd}) ${firstPart}-${middlePart}-${lastPart}`;
}

function addContact() {
    const nameInput = document.getElementById('name');
    const phoneInput = document.getElementById('phone');
    
    const name = nameInput.value.trim();
    let phone = phoneInput.value.trim();

    const nameError = document.getElementById('nameError');
    const phoneError = document.getElementById('phoneError');
    
    // Limpa as mensagens de erro
    nameError.textContent = '';
    phoneError.textContent = '';

    // Valida o nome completo
    if (!validateName(name)) {
        nameError.textContent = 'Por favor, insira o nome completo.';
        return;
    }
    
    // Valida o número e formata o telefone
    if (!validatePhone(phone)) {
        phoneError.textContent = 'O telefone deve conter exatamente 11 dígitos.';
        return;
    }
    
    phone = formatPhone(phone);
    
    // Adiciona o contato na tabela
    const contactTable = document.getElementById('contactTable').getElementsByTagName('tbody')[0];
    const newRow = contactTable.insertRow();
    
    const nameCell = newRow.insertCell(0);
    const phoneCell = newRow.insertCell(1);
    
    nameCell.textContent = name;
    phoneCell.textContent = phone;
    
    // Limpa os campos de entrada
    nameInput.value = '';
    phoneInput.value = '';
}