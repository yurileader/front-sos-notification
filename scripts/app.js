const baseUrl = 'https://sos-yurileader-app-9b7ed08fae12.herokuapp.com/alertas'; 

function showSuccessAlert(message) {
    const successMessage = document.getElementById('successMessage');
    successMessage.textContent = message;
    const successAlert = document.getElementById('successAlert');
    successAlert.style.display = 'flex'; 

    setTimeout(function() {
        successAlert.style.display = 'none';
    }, 1000);
}

function showWarningAlert(message) {
    const warningMessage = document.getElementById('warningMessage');
    warningMessage.textContent = message;
    const warningAlert = document.getElementById('warningAlert');
    warningAlert.style.display = 'flex';

    setTimeout(function() {
        warningAlert.style.display = 'none';
    }, 1000);
}

document.getElementById('closeWarningAlert').addEventListener('click', function() {
    const warningAlert = document.getElementById('warningAlert');
    warningAlert.style.display = 'none';
});

//CONFIRMACAO DO NUMERO 
document.getElementById('registrationForm').addEventListener('submit', async function(event) {
    event.preventDefault();

    const nome = document.getElementById('name').value;
    const telefone = document.getElementById('phone').value;

    try {
        const response = await fetch(`${baseUrl}/confirmacao`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ nome, telefone })
        });

        if (response.ok) {
            document.getElementById('registrationPage').style.display = 'none';
            document.getElementById('confirmationPage').style.display = 'block';
            document.getElementById('numero').textContent = telefone;
        } else {
            showWarningAlert('Erro ao enviar os dados. Tente novamente.');
        }
    } catch (error) {
        showWarningAlert('Erro de conexão. Verifique sua internet.');
    }
});

//POS CONFIRMACAO, CADASTRO DO USUARIO
document.getElementById('confirmationForm').addEventListener('submit', async function(event) {
    event.preventDefault();

    const nome = document.getElementById('name').value;
    const telefone = document.getElementById('phone').value;

    const numeroConfirmacao = document.getElementById('code').value;

    try {
        const response = await fetch(`${baseUrl}/usuario`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ nome, telefone, numeroConfirmacao })
        });

        if (response.ok) {
            showSuccessAlert('✔️ Confirmação realizada com sucesso!');
            document.getElementById('confirmationPage').style.display = 'none';
            setTimeout(function() {
                location.reload(true);
            }, 1500);
            
        } else {
            showWarningAlert('Código inválido ou erro no processamento.');
        }
    } catch (error) {
        showWarningAlert('Erro de conexão. Verifique sua internet.');
    }
});

//VOLTA PARA A PAGINA INICIAL
document.getElementById('backToRegistration').addEventListener('click', function() {
    document.getElementById('successPage').style.display = 'none';
    document.getElementById('deactivatePage').style.display = 'none';
    document.getElementById('registrationPage').style.display = 'block';
});

document.getElementById('showDeactivateForm').addEventListener('click', function() {
    document.getElementById('registrationPage').style.display = 'none';
    document.getElementById('deactivatePage').style.display = 'block';
});

document.getElementById('deactivateForm').addEventListener('submit', async function(event) {
    event.preventDefault();

    const telefone = document.getElementById('deactivatePhone').value;

    try {
        const response = await fetch(`${baseUrl}/desativar`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ telefone })
        });

        if (response.ok) {
            showSuccessAlert('Alertas desativados com sucesso!');
            document.getElementById('deactivatePage').style.display = 'none';
            document.getElementById('registrationPage').style.display = 'block';
            setTimeout(function() {
                location.reload(true);
            }, 1500);
        } else {
            showWarningAlert('Erro ao desativar os alertas. Tente novamente.');
        }
    } catch (error) {
        showWarningAlert('Erro de conexão. Verifique sua internet.');
    }
});

