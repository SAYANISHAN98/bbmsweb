const { exec } = require('child_process');
const path = require('path');

// Define the path to your React project directory
const reactProjectDir = path.join(__dirname, 'react-app');

// Navigate to the React project directory and start the project
exec(`cd ${reactProjectDir} && npm install && npm start`, (error, stdout, stderr) => {
  if (error) {
    console.error(`Error: ${error.message}`);
    return;
  }
  if (stderr) {
    console.error(`Stderr: ${stderr}`);
    return;
  }
  console.log(`Stdout: ${stdout}`);
});
