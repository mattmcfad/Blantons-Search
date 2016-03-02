import './styles/styles.css';

import * as angular from 'angular';
import rootReducer from './reducers';
import { CounterComponent, MainComponent } from './components';

const createLogger = require('redux-logger');
const ngRedux = require('ng-redux');
const thunk = require('redux-thunk');

declare var __DEV__: any;

angular.module('counter', ['ngRedux'])
  .config([
    '$ngReduxProvider',
    ($ngReduxProvider) => {
      const logger = createLogger();
      let middleware = [thunk];

      if (__DEV__) {
        middleware.push(logger);
      }

      $ngReduxProvider.createStoreWith(rootReducer, middleware);
    }
  ])
  .directive(MainComponent.selector, MainComponent.directiveFactory)
  .directive('ngrCounter', CounterComponent);

angular.element(document).ready(
  () => angular.bootstrap(document, ['counter']));
