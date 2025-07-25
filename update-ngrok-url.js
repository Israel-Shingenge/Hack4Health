// Quick script to update ngrok URL
// Run this after getting your new ngrok URL

const fs = require('fs');
const path = require('path');

// Get the new ngrok URL from command line argument
const newNgrokUrl = process.argv[2];

if (!newNgrokUrl) {
  console.log('Usage: node update-ngrok-url.js https://your-new-ngrok-url.ngrok-free.app');
  process.exit(1);
}

// Remove trailing slash if present
const cleanUrl = newNgrokUrl.replace(/\/$/, '');

// Update .env file
const envPath = path.join(__dirname, '.env');
let envContent = fs.readFileSync(envPath, 'utf8');
envContent = envContent.replace(
  /REACT_APP_H4H_POST_API=https:\/\/[^\/]+\.ngrok-free\.app/,
  `REACT_APP_H4H_POST_API=${cleanUrl}`
);
fs.writeFileSync(envPath, envContent);

// Update api.js file
const apiPath = path.join(__dirname, 'src', 'utils', 'api.js');
let apiContent = fs.readFileSync(apiPath, 'utf8');
apiContent = apiContent.replace(
  /export const API_BASE_URL = process\.env\.REACT_APP_H4H_POST_API \|\| 'https:\/\/[^\/]+\.ngrok-free\.app\/api';/,
  `export const API_BASE_URL = process.env.REACT_APP_H4H_POST_API || '${cleanUrl}/api';`
);
fs.writeFileSync(apiPath, apiContent);

console.log(`✅ Updated ngrok URL to: ${cleanUrl}`);
console.log('✅ Updated .env file');
console.log('✅ Updated api.js file');
console.log('\n🔄 Please restart your React development server for changes to take effect');
