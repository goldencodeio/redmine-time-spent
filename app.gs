function main() {
  initOptions();
  initProjects();
  //processKPIs();
  countTotal();
  writeTable();
}

function onOpen() {
  var spreadsheet = SpreadsheetApp.getActive();
  spreadsheet.addMenu('GoldenCode KPI', [
    {name: 'Рассчитать KPI', functionName: 'main'}
  ]);
}