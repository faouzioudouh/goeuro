(function () {

    angular.module('goeuro')
    .config( config );

    config.$inject = ['$routeProvider','$locationProvider',];

    function config( $routeProvider, $locationProvider ){

        $routeProvider
        .when('/', {
          templateUrl: '../views/github/github.view.html',
          controller: 'GithubController',
          controllerAs: 'vm',
        });

        if (window.history && window.history.pushState) {
            $locationProvider.html5Mode(true);
        }

    }

})();