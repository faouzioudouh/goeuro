(function () {

    angular
    .module('goeuro')
    .directive('loadingSpinner', repository);

    function repository() {

        var directive = {
            template: '<div class="loading" ng-if="loading"><div class="double-bounce1"></div><div class="double-bounce2"></div></div>',
            restrict: 'EA',
            scope: { showIf:'=' },
            link: link
        };
        return directive;

        function link( scope ){
            scope.$watch('showIf', function( newValue ){
                scope.loading = newValue;
            })
        }
    }

})();