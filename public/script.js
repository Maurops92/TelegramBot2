// Obtener API ID y API Hash
let apiId, apiHash, phoneCode;

// Verificar si se ingresaron tanto API ID como API Hash antes de solicitar el phoneCode
document.getElementById('submitButton').addEventListener('click', async () => {
  apiId = document.getElementById('apiIdInput').value;
  apiHash = document.getElementById('apiHashInput').value;

  if (apiId && apiHash) {
    // Mostrar la sección del phoneCode
    document.getElementById('phoneCodeSection').style.display = 'block';
  } else {
    alert('Por favor, ingrese tanto el API ID como el API Hash antes de enviar.');
  }
});

// Agregar un evento de clic al botón de generar StringSession
document.getElementById('generateSessionButton').addEventListener('click', async () => {
  // Obtener el phoneCode
  phoneCode = document.getElementById('phoneCodeInput').value;

  // Verificar si se ingresó el phoneCode antes de generar el stringSession
  if (phoneCode) {
    const response = await fetch('/generate-string-session', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ apiId, apiHash, phoneCode }),
    });

    const result = await response.json();
    document.getElementById('result').innerText = `String Session: ${result.stringSession}`;
  } else {
    alert('Por favor, ingrese el phoneCode antes de generar el StringSession.');
  }
});
