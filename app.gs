function main() {
  initOptions();
  processKPIs();
  writeTable();
}

function onOpen() {
  var spreadsheet = SpreadsheetApp.getActive();
  spreadsheet.addMenu('GoldenCode KPI', [
    {name: 'Рассчитать KPI', functionName: 'main'}
  ]);
}