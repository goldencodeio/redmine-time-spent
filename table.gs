function writeTable() {
  writeHeader();
  writeUserRows();
}

function writeHeader() {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  sheet.getRange(1, 1).setValue('Период:');
  sheet.getRange(1, 2).setValue(formatDate(OPTIONS.datesRange[0]));
  sheet.getRange(1, 3).setValue(formatDate(OPTIONS.datesRange[1]));

  sheet.getRange(2, 2).setValue('Всего затрачено');
  var colI = 3;
  Object.keys(PROJECTS).forEach(function(projectId) {
    sheet.getRange(2, colI++).setValue(PROJECTS[projectId].name);
  });
}

function writeUserRows() {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  var rowI = 3;
  OPTIONS.users.forEach(function(user) {
    sheet.getRange(rowI, 1).setValue(user.firstname + ' ' + user.lastname);
    
    var colI = 2;

    // total time spent
    sheet.getRange(rowI, colI++).setValue(sumTimeEntries(user.time_entries))

    // time spent by project
    Object.keys(PROJECTS).forEach(function(projectId) {
      var val = sumTimeEntries(user.time_entries.filter(function(t) {return t.project.id === parseInt(projectId, 10);}));
      sheet.getRange(rowI, colI++).setValue(val);
    });

    rowI++;
  });
}

function sumTimeEntries(time) {
  return time.reduce(function(a, c) {
    return a + c.hours;
  }, 0);
}
