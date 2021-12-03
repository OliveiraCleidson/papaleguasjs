import { DataContainer } from '@/@types';
import { APP_CONFIG } from '@/config/appConfig';

export class DataContainerFactory {
  static createDataContainer(): DataContainer {
    const dataContainer: DataContainer = {};
    dataContainer.dbName = APP_CONFIG.database.name;

    return dataContainer;
  }
}
