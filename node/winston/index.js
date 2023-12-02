//https://github.com/winstonjs/winston
const winston = require('winston');
//https://www.npmjs.com/package/winston-daily-rotate-file
const DailyRotateFile = require('winston-daily-rotate-file');
 
  var transport = new winston.transports.DailyRotateFile({
    filename: 'combined-%DATE%.log',
    datePattern: 'YYYY-MM-DD-HH',
    zippedArchive: true,
    maxSize: '20m',
    maxFiles: '14d'
  });


transport.on('rotate', function(oldFilename, newFilename) {
    // do something fun
  });


const logger = winston.createLogger({
    level: 'info',
    format: winston.format.json(),
    defaultMeta: { service: 'user-service' },
    transports: [ 
      new winston.transports.File({ filename: 'error.log', level: 'error' }),
      new winston.transports.File({ filename: 'info.log', level: 'info' }),
    //  new winston.transports.File({ filename: 'combined.log' }),
      transport
    ],
  });

  
 logger.add(new winston.transports.Console({
    format: winston.format.simple(),
  }));



  logger.log({
    level: 'info',
    message: 'Info message!'
  });
  
 logger.error('Error message');
  
