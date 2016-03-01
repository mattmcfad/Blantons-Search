import * as CounterActions from '../../actions/counter';

export function CounterComponent(): ng.IDirective {
  return {
    restrict: 'E',
    controllerAs: 'ctrl',
    controller: CounterController,
    template: require('./counter.html'),
    scope: {}
  };
}

class CounterController {

  static $inject = [
    '$ngRedux',
    '$scope'
  ];

  constructor($ngRedux, $scope: ng.IScope) {
    const unsubscribe = $ngRedux.connect(
      this.mapStateToThis, CounterActions)(this);
    $scope.$on('$destroy', unsubscribe);
  }

  // Which part of the Redux global state does our component want to receive?
  mapStateToThis(state) {
    return {
      value: state.counter
    };
  }
}
