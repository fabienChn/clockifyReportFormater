const xlsx = require('node-xlsx');
const fs = require('fs');

const { logAndThrowError } = require('./logAndThrowError');

exports.parseCsvFile = (fileName) => {
  try {
    const file = fs.readFileSync(fileName);

    return xlsx.parse(file);
  } catch (e) {
    logAndThrowError('Parsing Failed', e);
  }
};

exports.buildCsvFile = (formatedData, newFileName) => {
  const buffer = xlsx.build([
    { name: newFileName, data: formatedData },
  ]);

  const newFileFullPath = `/Users/fabiencohen/Desktop/${newFileName}.xlsx`;

  fs.writeFile(newFileFullPath, buffer, (e) => {
    logAndThrowError('Impossible to write file', e);
  });
};
