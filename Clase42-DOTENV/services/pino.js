//----------------------------------------------------------------------
// LOGGERS
//----------------------------------------------------------------------
import pino from "pino";
const pinoInfo = pino();
const pinoWarn = pino("./services/logs/warn.log");
const pinoError = pino("./services/logs/error.log");

//const loggerInfo = pinoInfo.info("info");
// const loggerWarn = pinoWarn.warn("warn");
// const loggerError = pinoError.error("error");

export { pinoInfo, pinoWarn, pinoError };
