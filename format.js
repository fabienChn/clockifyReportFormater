const { getFileNameFromCommandArgv } = require('./getFileNameFromCommandArgv');
const { parseCsvFile, buildCsvFile } = require('./csvManager');

require('dotenv').config();

const parsedFileToReadableData = (parsedFile) => {
  const data = parsedFile[0].data;

  data.shift();

  const readableData = data.map(row => {
    const filteredRow = row.filter((_, index) => (
      [2, 8, 9, 11, 12].indexOf(index) > -1
    ));

    return {
      activity_description: filteredRow[0],
      date: filteredRow[1],
      start_time: filteredRow[2],
      end_time: filteredRow[3],
      time_worked: filteredRow[4],
    };
  });

  return readableData;
};

const formatDataForNewCsvFile = (data) => {
  const newCsvData = [];

  newCsvData[0] = [
    'Date', 
    'Start Time (hh:mm)', 
    'End Time (hh:mm)', 
    'Break duration (hh:mm)', 
    'Time worked (hh:mm)', 
    'Activity Description'
  ];

  const formatedContent = data.map(row => ([
    row.date,
    row.start_time,
    row.end_time,
    null,
    row.time_worked,
    row.activity_description,
  ]));

  const headBlock = [
    [
      'Project duration (hh:mm)',
      null,
      '390:OO',
      null,
      'Client',
      'GoLeasy GmbH',
    ],
    [
      'Hours worked',
      null,
      '4:00:00',
      null,
      'Freelancer:',
      'Fabien Cohen',
    ],
    [
      'Remaining hours:',
      null,
      '386:00:00',
    ]
  ];

  return newCsvData.concat(formatedContent);
};

const boot = async () => {
  const fileName = getFileNameFromCommandArgv();

  const parsedFile = parseCsvFile(fileName);

  const data = parsedFileToReadableData(parsedFile);

  const formatedData = formatDataForNewCsvFile(data);
  
  try {
    buildCsvFile(formatedData, 'Fabien_Cohen_time_tracking');
  } catch (e) {
    console.log(e);
  }
};

boot();
