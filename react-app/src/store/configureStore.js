import {createStore, applyMiddleware, compose} from 'redux';
import rootReducer from '../reducers/rootReducer';
import thunk from 'redux-thunk';

export default function configureStore() {
  const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  const middleware = applyMiddleware(thunk);
  const store = createStore(
    rootReducer,
    compose(middleware, window.devToolsExtension ? window.devToolsExtension() : f => f)
  );
  return store;
  // return createStore(
  //   rootReducer,
  //   window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
  //   composeEnhancers(applyMiddleware(thunk))
  // );
}
