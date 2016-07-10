(function() {
  'use strict';

  angular
    .module('webFront')
    .directive('acmeNavbar', acmeNavbar);

  /** @ngInject */
  function acmeNavbar() {
    var directive = {
      restrict: 'E',
      templateUrl: 'app/components/navbar/navbar.html',
      scope: {
          creationDate: '='
      },
      controller: NavbarController,
      controllerAs: 'vm',
      bindToController: true
    };

    return directive;

    /** @ngInject */
    function NavbarController(moment, $location) {
      var vm = this;
      vm.title = '龙虎榜数据统计'

      // "vm.creationDate" is available by directive option "bindToController: true"
      vm.relativeDate = moment(vm.creationDate).fromNow();
      vm.currentName = 'stock';
      $location.path( '/stock' );

      vm.click = function( name ){
        vm.currentName = name;
        $location.path( '/' + name );
      };
    }
  }

})();
