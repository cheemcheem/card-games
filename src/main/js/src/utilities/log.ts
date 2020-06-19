export enum LogLevel {
  ERROR,
  WARN,
  INFO,
  DEBUG
}

const nodeEnvLogLevels = new Map<string,LogLevel>([
    ["development", LogLevel.DEBUG],
    ["production", LogLevel.ERROR],
    ["test", LogLevel.INFO]
])

let displayLogLevel = nodeEnvLogLevels.get(process.env.NODE_ENV) ?? LogLevel.ERROR;
if (nodeEnvLogLevels.get(process.env.NODE_ENV) === undefined) {
  console.warn(`Setting default log level to ${LogLevel[displayLogLevel]}.`);
}

export const log = <U extends any>(x: U, logLevel: LogLevel = LogLevel.DEBUG) => {
  if (logLevel > displayLogLevel) {
    return x;
  }

  switch (logLevel) {
    case LogLevel.DEBUG: {
      console.debug(x);
      break;
    }
    case LogLevel.ERROR: {
      console.error(x);
      break;
    }
    case LogLevel.WARN: {
      console.warn(x);
      break;
    }
    case LogLevel.INFO: {
      console.log(x);
      break;
    }
  }
  return x
};

log(`Log level ${LogLevel[displayLogLevel]}.`);
