/* eslint-disable */
// scripts/verify-calculator-browser-form.js
const http = require('http');

async function testCalculatorFormSubmission() {
  console.log('--- TESTING CALCULATOR FORM SUBMISSION ---');
  
  const boundary = '--------------------------' + Date.now().toString(16);
  
  const fields = [
    { name: 'name', value: 'Lead Calculator Test' },
    { name: 'phone', value: '0799112233' },
    { name: 'email', value: 'test@example.com' },
    { name: 'service', value: 'Asigurare Locuință' },
    { name: 'message', value: 'Test formular calculator' },
    { name: 'source', value: 'Financial Impact Calculator' },
    { name: 'metadata', value: JSON.stringify({
        tab: 'fire',
        tabLabel: 'Incendiu Casă',
        valoareCalculata: '150.000 EUR',
        pierderePotentiala: '150.000 EUR',
        costAsigurareEstimatAn: '225 EUR'
      }) 
    }
  ];

  let body = '';
  for (const field of fields) {
    body += `--${boundary}\r\n`;
    body += `Content-Disposition: form-data; name="${field.name}"\r\n\r\n`;
    body += `${field.value}\r\n`;
  }
  body += `--${boundary}--\r\n`;

  const req = http.request({
    hostname: 'localhost',
    port: 3000,
    path: '/api/lead',
    method: 'POST',
    headers: {
      'Content-Type': `multipart/form-data; boundary=${boundary}`,
      'Content-Length': Buffer.byteLength(body)
    }
  }, (res) => {
    let responseData = '';
    res.on('data', (chunk) => { responseData += chunk; });
    res.on('end', () => {
      console.log('HTTP Status Code:', res.statusCode);
      console.log('Response Body:', responseData);
      try {
        const json = JSON.parse(responseData);
        if (res.statusCode === 200 && json.success === true) {
          console.log('✅ TEST RESULT: SUCCESS! Form submission succeeded with success: true');
          process.exit(0);
        } else {
          console.error('❌ TEST RESULT: FAILED! Server returned error:', json);
          process.exit(1);
        }
      } catch (err) {
        console.error('❌ TEST RESULT: FAILED! Invalid JSON:', responseData);
        process.exit(1);
      }
    });
  });

  req.on('error', (e) => {
    console.error('❌ TEST RESULT: FAILED! HTTP Request Error:', e.message);
    process.exit(1);
  });

  req.write(body);
  req.end();
}

testCalculatorFormSubmission();
