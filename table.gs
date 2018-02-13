function writeTable() {
  writeHeader();
  writeRows();
}

function writeHeader() {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  sheet.getRange(1, 1).setValue('Проект');
  sheet.getRange(1, 2).setValue('Всего затрачено');
}

function writeRows() {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  var rowI = 2;
  Object.keys(PROJECTS).forEach(function(projectId) {
    sheet.getRange(rowI, 1).setValue(PROJECTS[projectId].name);
    sheet.getRange(rowI, 2).setValue(sumTimeEntries(PROJECTS[projectId].time_entries));
    rowI++;
  });
}

function sumTimeEntries(time) {
  return time.reduce(function(a, c) {
    return a + c.hours;
  }, 0);
}
