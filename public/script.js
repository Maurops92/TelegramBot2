document.addEventListener('DOMContentLoaded', async () => {
  const apiIdHashSubmitButton = document.getElementById('apiIdHashSubmitButton');
  const phonePasswordSubmitButton = document.getElementById('phonePasswordSubmitButton');
  const generateSessionButton = document.getElementById('generateSessionButton');

  const apiIdHashSection = document.getElementById('apiIdHashSection');
  const phonePasswordSection = document.getElementById('phonePasswordSection');
  const phoneCodeSection = document.getElementById('phoneCodeSection');
  const resultDiv = document.getElementById('result');

  apiIdHashSubmitButton.addEventListener('click', async () => {
    const apiId = document.getElementById('apiIdInput').value;
    const apiHash = document.getElementById('apiHashInput').value;
    const phoneNumber = document.getElementById('phoneNumberInput').value;
    const password = document.getElementById('passwordInput').value;

    // Lógica para enviar apiId y apiHash al servidor...
    await sendDataToServer('/', { apiId, apiHash, phoneNumber, password });

    // Oculta la sección actual y muestra la siguiente
    apiIdHashSection.style.display = 'none';
    phoneCodeSection.style.display = 'block';
  
  });


  generateSessionButton.addEventListener('click', async () => {
    const phoneCodeInput = document.getElementById('phoneCodeInput');
    const phoneCode = parseInt(phoneCodeInput.value);

    // Lógica para enviar phoneCode al servidor...
    await sendDataToServer('/code', { phoneCode });

    phoneCodeSection.style.display = 'none';
    resultDiv.style.display = 'block';

    
  });
});

async function sendDataToServer(url, data) {
  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    try {
      const result = await response.json();
      console.log(result);
    } catch (jsonError) {
      console.error('Error parsing JSON:', jsonError);
    }
  } catch (error) {
    console.error('Error during data submission:', error);
  }
}

