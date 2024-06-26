import {KindHandlersEventEmitter, ResourceKindHandlers} from '@src/kindhandlers';

import {ResourceKindHandler} from '@shared/models/resourceKindHandler';

import {addKindHandler, addMultipleKindHandlers} from './reducers/main';
import store from './store';

// load the initial kind handlers before the crds handlers are registered
store.dispatch(addMultipleKindHandlers(ResourceKindHandlers.map(k => k.kind)));

KindHandlersEventEmitter.on('register', (kindHandler: ResourceKindHandler) => {
  store.dispatch(addKindHandler(kindHandler.kind));
});
