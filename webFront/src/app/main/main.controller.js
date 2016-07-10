(function() {
  'use strict';

  angular
    .module('webFront')
    .controller('MainController', MainController);

  /** @ngInject */
  function MainController( StockService ) {
    var main = this;
    main.daterangepicker = null;
    main.stock = '';
    main.finsStocks = [];


    main.findStocks = function(){
      console.log(main.daterangepicker);
      console.log(main.stock);

      var beginDate = main.daterangepicker.start;
      var endDate = main.daterangepicker.end;
      var stock = main.stock;

      var params = { beginDate: beginDate, endDate: endDate, stock: stock }
      StockService.get( params, function( data ){
        main.finsStocks = data;
        console.log( main.finsStocks );
      });
    };


    main.change = function(){
      if( main.stock && main.daterangepicker )
        main.findStocks();
    };


    //vm.awesomeThings = [];
    //vm.classAnimation = '';
    //vm.creationDate = 1467623932763;
    //vm.showToastr = showToastr;

    //activate();
    //
    //function activate() {
    //  getWebDevTec();
    //  $timeout(function() {
    //    vm.classAnimation = 'rubberBand';
    //  }, 4000);
    //}
    //
    //function showToastr() {
    //  toastr.info('Fork <a href="https://github.com/Swiip/generator-gulp-angular" target="_blank"><b>generator-gulp-angular</b></a>');
    //  vm.classAnimation = '';
    //}
    //
    //function getWebDevTec() {
    //  vm.awesomeThings = webDevTec.getTec();
    //
    //  angular.forEach(vm.awesomeThings, function(awesomeThing) {
    //    awesomeThing.rank = Math.random();
    //  });
    //}
  }
})();
