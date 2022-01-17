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

exports.buildCsvFile = (formatedData) => {
  const buffer = xlsx.build([
    { name: process.env.FILE_NAME, data: formatedData },
  ]);

  const newFileFullPath = `${process.env.OUTPUT_DIRECTORY_PATH}${process.env.FILE_NAME}.xlsx`;

  fs.writeFile(newFileFullPath, buffer, (e) => {
    logAndThrowError('Impossible to write file', e);
  });
};
