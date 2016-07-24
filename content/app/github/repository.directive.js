(function () {

    angular
    .module('goeuro')
    .directive('listingRepositories', repository);

    function repository() {

        var directive = {
            templateUrl: '../views/github/repositories.view.html',
            restrict: 'EA'
        };
        return directive;
    }

})();