const { logAndThrowError } = require('./logAndThrowError');

exports.getFileNameFromCommandArgv = () => {
  const arguments = process.argv;

  if (! arguments[2]) {
    logAndThrowError('The command is missing a mandatory argument. The path to the file to parse.');
  }

  return arguments[2];
}
