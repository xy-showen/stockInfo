(function() {
  'use strict';

  angular
    .module('webFront')
    .directive('daterangepicker', daterangepicker);

  /** @ngInject */
  function daterangepicker() {
    var directive = {
      restrict: 'E',
      templateUrl: 'app/components/daterangepicker/daterangepicker.html',
      controller: DaterangepickerController,
      controllerAs: 'vm',
      bindToController: true,
      link:Link,
      require: "ngModel"
    };

    return directive;

    /** @ngInject */
    function DaterangepickerController() {
      var vm = this;
    }

    function Link( scope, element, attrs, ngModel ){
      scope.start = moment().subtract(29, 'days').format( 'YYYY-MM-DD' );
      scope.end = moment().format( 'YYYY-MM-DD' );
      ngModel.$setViewValue( { start: scope.start, end: scope.end } );

      $(element).daterangepicker({
        locale: {
          format: 'YYYY-MM-DD',
          customRangeLabel: '自定义'
        },
        dateLimit: {
          days: 500
        },
        startDate: moment().subtract(29, 'days'),
        endDate: moment(),
        maxDate: moment(),
        ranges: {
          '今日': [moment(), moment()],
          '昨天': [moment().subtract(1, 'days'), moment().subtract(1, 'days')],
          '最近7天': [moment().subtract(6, 'days'), moment()],
          '最近30天': [moment().subtract(29, 'days'), moment()]
          //'本月': [moment().startOf('month'), moment().endOf('month')],
          //'上个月': [moment().subtract(1, 'month').startOf('month'), moment().subtract(1, 'month').endOf('month')]
        }
      }, function( start, end ){
        scope.start = start.format('YYYY-MM-DD');
        scope.end = end.format('YYYY-MM-DD');
        ngModel.$setViewValue( { start: start.format('YYYY-MM-DD'), end: end.format('YYYY-MM-DD') } );
      });
    }


  }

})();
