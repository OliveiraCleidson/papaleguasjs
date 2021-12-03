"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
const builders_1 = require("./builders");
const factories_1 = require("./factories");
const contextFactory_1 = require("./factories/contextFactory");
const dataContainerFactory_1 = require("./factories/dataContainerFactory");
const loggerFactory_1 = require("./factories/loggerFactory");
const simpleCrudStrategy_1 = require("./strategies/simpleCrudStrategy");
const logger = loggerFactory_1.LoggerFactory.createWinstonLogger();
console.log('Starting');
logger.log({ message: 'Starting', level: 'info' });
async function bootstrap() {
    const connection = await factories_1.ConnectionFactory.createSqlServerConnection();
    const dataContainer = dataContainerFactory_1.DataContainerFactory.createDataContainer();
    const appContext = contextFactory_1.ContextFactory.createAppContext(dataContainer, logger.child({ service: 'AppContext' }));
    const tableAction = factories_1.ActionsFactory.createGetTablesAction(connection);
    const strategyBuilder = new builders_1.StrategyBuilder('simpleCrudStrategy', ['dbName']);
    strategyBuilder.addAction(tableAction);
    const simpleCrudStrategy = (0, simpleCrudStrategy_1.simpleCrudStrategyFactory)(strategyBuilder);
    appContext._strategy = simpleCrudStrategy;
    console.log('CLI Started');
    await appContext.execute();
    logger.log({ message: 'CLI Started', level: 'info' });
    await connection.close();
    console.log('Connection closed');
    console.log('Finished');
}
bootstrap().catch(e => {
    logger.log({ message: e.message, level: 'error' });
});
//# sourceMappingURL=main.js.map