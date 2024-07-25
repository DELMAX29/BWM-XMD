const fs = require('fs-extra');
const { Sequelize } = require('sequelize');
if (fs.existsSync('set.env'))
    require('dotenv').config({ path: __dirname + '/set.env' });
const path = require("path");
const databasePath = path.join(__dirname, './database.db');
const DATABASE_URL = process.env.DATABASE_URL === undefined
    ? databasePath
    : process.env.DATABASE_URL;
module.exports = { session: process.env.SESSION_ID || 'eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiZUFIcmRoN1lTV2dTQnF0cG1WV1BJYTBDcHJya2Z1WGcwQnhPaFBmNGlFYz0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoia1VzOEo2bm5nYnRnTG45VUt1R3pTakZ1YXlVbVZyVHVJMUFCc0hHR1l6Yz0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJXTWM4Z1VwWDgvUXJWb29kNG1ybk5HVGhJR3RzbWMwVXl4R0RWdGdRQmxnPSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJkNm1yMGF3Z3RkNC9SeFN1VWxoeThaRS9YRERkN1VOeDNZSUNONm5pakFzPSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IitPZlhUNERYQlBGSU5jVWZVcXdaM2dLcU1jMUYwSk9rTTREOUNheUxVR289In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkhUa1BjY3lqZjl0R3VvUE10ZDQyeXMrekdpenB2YzI3dWpPQVZHZ25ESFE9In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiQ0ZtZnJOazhxNEN3TFBXSFV2Q1JaNWVUd3hSUXhFVFMxOFc4SngreDVsMD0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiQlY5WEVvVlhqRmNoL1Nvb2ltS2tUN0pwUGlpbXNTZmRQRk5MNWtjZXdTTT0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IjI5dDNSTG9kK2VxL0NacHg0MkdlcWFOUHcxK0pwVTBhSWNWdDVTL0pkbUpiM1c0SWJXZ0ZDQTRVMERwRDVGTG1qeUUwL2NraS9MeE9pV3g2VWxzQmp3PT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6MjQyLCJhZHZTZWNyZXRLZXkiOiJrSFZUejcyOFA2eUx2SkdIZ0NkUUVpV21HR2VWTXJXRzkrRjJRbHltRkU0PSIsInByb2Nlc3NlZEhpc3RvcnlNZXNzYWdlcyI6W10sIm5leHRQcmVLZXlJZCI6MzEsImZpcnN0VW51cGxvYWRlZFByZUtleUlkIjozMSwiYWNjb3VudFN5bmNDb3VudGVyIjowLCJhY2NvdW50U2V0dGluZ3MiOnsidW5hcmNoaXZlQ2hhdHMiOmZhbHNlfSwiZGV2aWNlSWQiOiIzUWpETGh2VVJnT1hXYWRGRTliVy1BIiwicGhvbmVJZCI6ImJlN2E4NmFkLTQ5NjUtNDc1MC1iN2EzLTU4YTc3ZGY2OTRkNSIsImlkZW50aXR5SWQiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiI5dmMwbzFUTkVhU2c3L0VTUUNzZDlNRE5Ydk09In0sInJlZ2lzdGVyZWQiOnRydWUsImJhY2t1cFRva2VuIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiS0dyWkNEc0YxazA0VUFhUDYzT2J5M0lGakRFPSJ9LCJyZWdpc3RyYXRpb24iOnt9LCJwYWlyaW5nQ29kZSI6IlZBRERYOFA0IiwibWUiOnsiaWQiOiIyNjM3MTc2NzIwNjg6MTZAcy53aGF0c2FwcC5uZXQiLCJuYW1lIjoi8J2XuPCdn67wnZ+18J2XvfCdl7/wnZe88J2XuvCdl67wnZiFIn0sImFjY291bnQiOnsiZGV0YWlscyI6IkNNWE5zL1lDRUxxUWk3VUdHQWNnQUNnQSIsImFjY291bnRTaWduYXR1cmVLZXkiOiJ3YWIwaUFqRGZlZ1dCZ2JLNVpkS2NHVWpVY28vaEcyWm9rYkJtampHeURZPSIsImFjY291bnRTaWduYXR1cmUiOiJLNjRZOFFwaksyVW53Q2dRVjVyeVVqVDlFbkhxNmxRc0F1WU90c1ZjYUhsMzVYTXUvWlpFalpkcllkbllIWnRHRWJRcWsvOUw5RlZZdStaY2JUU05Ddz09IiwiZGV2aWNlU2lnbmF0dXJlIjoiZkh1T2o2NldTeFhZWDE5RUlJdk9UbFVEeTZEcXJRRW5sWG1jU3QvOEhkdUFCL0VoRU9YTnVIQmdGSW9vQlZuNGZFVk1MLzk5TWNCYS8ySWZFck1yaVE9PSJ9LCJzaWduYWxJZGVudGl0aWVzIjpbeyJpZGVudGlmaWVyIjp7Im5hbWUiOiIyNjM3MTc2NzIwNjg6MTZAcy53aGF0c2FwcC5uZXQiLCJkZXZpY2VJZCI6MH0sImlkZW50aWZpZXJLZXkiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJCY0dtOUlnSXczM29GZ1lHeXVXWFNuQmxJMUhLUDRSdG1hSkd3Wm80eHNnMiJ9fV0sInBsYXRmb3JtIjoic21iYSIsImxhc3RBY2NvdW50U3luY1RpbWVzdGFtcCI6MTcyMTk0NDE0MH0=',
    PREFIXE: process.env.PREFIX || ".",
    OWNER_NAME: process.env.OWNER_NAME || "k29promax",
    NUMERO_OWNER : process.env.NUMERO_OWNER || " Ibrahim Adams",              
    AUTO_READ_STATUS: process.env.AUTO_READ_STATUS || "yes",
    AUTO_DOWNLOAD_STATUS: process.env.AUTO_DOWNLOAD_STATUS || 'no',
    BOT : process.env.BOT_NAME || 'BMW_MD',
    URL : process.env.BOT_MENU_LINKS || 'https://telegra.ph/file/17c83719a1b40e02971e4.jpg',
    MODE: process.env.PUBLIC_MODE || "yes",
    PM_PERMIT: process.env.PM_PERMIT || 'yes',
    HEROKU_APP_NAME : process.env.HEROKU_APP_NAME,
    HEROKU_APY_KEY : process.env.HEROKU_APY_KEY ,
    WARN_COUNT : process.env.WARN_COUNT || '3' ,
    ETAT : process.env.PRESENCE || '',
    CHATBOT : process.env.PM_CHATBOT || 'no',
    DP : process.env.STARTING_BOT_MESSAGE || "yes",
    ADM : process.env.ANTI_DELETE_MESSAGE || 'no',
    DATABASE_URL,
    DATABASE: DATABASE_URL === databasePath
        ? "postgresql://postgres:bKlIqoOUWFIHOAhKxRWQtGfKfhGKgmRX@viaduct.proxy.rlwy.net:47738/railway" : "postgresql://postgres:bKlIqoOUWFIHOAhKxRWQtGfKfhGKgmRX@viaduct.proxy.rlwy.net:47738/railway",
   
};
let fichier = require.resolve(__filename);
fs.watchFile(fichier, () => {
    fs.unwatchFile(fichier);
    console.log(`mise à jour ${__filename}`);
    delete require.cache[fichier];
    require(fichier);
});
