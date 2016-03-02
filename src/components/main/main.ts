export class MainComponent {

  static selector = 'ngcMain';

  static directiveFactory: ng.IDirectiveFactory = () => {
    return {
      transclude: true,
      restrict: 'E',
      scope: {},
      controllerAs: 'ctrl',
      bindToController: true,
      controller: MainComponent,
      template: require('./main.html'),
    };
  };

  static $inject = [
    '$scope'
  ];

  constructor($scope: angular.IScope) {}

}
