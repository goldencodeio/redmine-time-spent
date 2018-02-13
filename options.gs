var OPTIONS = {};

function initOptions() {
  var _ss = SpreadsheetApp.getActiveSpreadsheet();

  var optionsSheet = _ss.setActiveSheet(getOptionsSheet());

  var data = optionsSheet.getRange(1, 1, optionsSheet.getLastRow(), optionsSheet.getLastColumn()).getValues();
  data.forEach(function(row) {
    var key = row.shift();
    row = row.filter(function(a) {return a});
    OPTIONS[key] = row.length > 1 ? row : row[0];
  });
  
  OPTIONS.datesRange = OPTIONS.datesRange.map(function (date) {
    date.setHours(date.getHours() - 1 * date.getTimezoneOffset() / 60);
    return date;
  });
  
  if (!Array.isArray(OPTIONS.users)) OPTIONS.users = [OPTIONS.users];

  var sheetName = OPTIONS.datesRange.map(formatDate).join(' : ');
  var existingSheet = _ss.getSheetByName(sheetName);
  if (existingSheet) _ss.deleteSheet(existingSheet);
  _ss.insertSheet(sheetName);
}

function getOptionsSheet() {
  var sheets = SpreadsheetApp.getActiveSpreadsheet().getSheets();
  for (var i = 0; i < sheets.length; i++) {
    if (sheets[i].getName().toLowerCase() === 'options')
      return sheets[i];
  }
  return null;
}