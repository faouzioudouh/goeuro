(function () {
    
    angular.module('goeuro')
    .factory('Github', Github);

    Github.$inject = ['$scope', '$http', '$q','GITHUB_API_URL'];

    function Github( $scope, $http, $q, GITHUB_API_URL ){

        var service = {
            getRepositories: getRepositories
        }

        return service;

        /**
         * Get Repositories by name.
         */
        function getRepositories( username ) {
            
            var defer = $q.defer();
            var url = GITHUB_API_URL + 'users/'+ username + '/repos';

            $http.get( url )
                .success( _handleSuccess )
                .error( _handleError );

            return defer.promise;

        }

        /**
         * Handle error
         * @private
         */
        function _handleError( error ) {
            defer.reject(error);
        }

        /**
         * Handle success.
         * @private
         */
        function _handleSuccess( data ) {
            defer.resolve( data );
        }
    }
})