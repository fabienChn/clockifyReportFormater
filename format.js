const { parseCsvFile, buildCsvFile } = require('./csvManager');

require('dotenv').config();

const parsedFileToReadableData = (parsedFile) => {
  const data = parsedFile[0].data;

  data.shift();

  const readableData = data.reverse().map(row => {
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
  const tableHeader = [
    [
      'Date', 
      'Start Time (hh:mm)', 
      'End Time (hh:mm)', 
      'Time worked (hh:mm)', 
      'Activity Description'
    ]
  ];

  const formatedContent = data.map(row => ([
    row.date,
    row.start_time,
    row.end_time,
    row.time_worked,
    row.activity_description,
  ]));

  const headBlock = [
    [
      'Project duration (hh:mm)',
      null,
      process.env.PROJECT_DURATION,
      null,
      'Client:',
      process.env.CLIENT_NAME,
    ],
    [
      'Hours worked',
      null,
      '4:00:00',
      null,
      'Freelancer:',
      process.env.FREELANCER_NAME,
    ],
    [
      'Remaining hours:',
      null,
      '386:00:00',
    ],
    [null],
    [null],
  ];

  return headBlock.concat(tableHeader.concat(formatedContent));
};

const format = async () => {
  const parsedFile = parseCsvFile(process.env.INPUT_EXCEL_FILE_PATH);

  const data = parsedFileToReadableData(parsedFile);

  const formatedData = formatDataForNewCsvFile(data);
  
  try {
    buildCsvFile(formatedData, 'Fabien_Cohen_time_tracking');
  } catch (e) {
    console.log(e);
  }
};

format();
