
/**
 * Google Apps Script — RSVP to Sheets
 * Follow README steps to deploy as Web App and paste the /exec URL into config.js
 */
const SHEET_NAME = 'RSVP';
function doPost(e){ const sheet=getSheet_(); const p=e.parameter||{}; sheet.appendRow([new Date(),p.fullname||'',p.email||'',p.phone||'',p.attending||'',p.guests||'',p.meal||'',p.allergies||'',p.song||'',p.message||'',p.source||'']); return ContentService.createTextOutput(JSON.stringify({ok:true})).setMimeType(ContentService.MimeType.JSON).setHeader('Access-Control-Allow-Origin','*'); }
function getSheet_(){ const ss=SpreadsheetApp.getActiveSpreadsheet(); const sh=ss.getSheetByName(SHEET_NAME)||ss.insertSheet(SHEET_NAME); if(sh.getLastRow()===0){ sh.appendRow(['Timestamp','Full Name','Email','Phone','Attending','Seats','Meal','Allergies','Song','Message','Source']); } return sh; }
