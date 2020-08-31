import { memoryHistory } from 'react-router-dom';
import configureStore from 'configureStore';
import StoreAccessor from 'containers/BackendApiConnector/StoreAccessor';

export default function ConfigureTestStore() {
  const confuguredStore = configureStore({}, memoryHistory);

  StoreAccessor.store = confuguredStore.store;

  this.store = confuguredStore.store;
  this.presistor = confuguredStore.presistor;
}
