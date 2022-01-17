const colors = require('colors');

exports.logAndThrowError = (message, e) => {
  console.log(colors.red(`\n>>> !!! ${message} !!! <<<\n\n`));

  throw e || 'Unknown error';
}
