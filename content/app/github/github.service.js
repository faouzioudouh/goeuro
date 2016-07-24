(function () {
    
    angular.module('goeuro')
    .factory('Github', Github);

    Github.$inject = ['$http', '$q','GITHUB_API_URL'];

    function Github( $http, $q, GITHUB_API_URL ){

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
                .error( function ( error, status ) {
                    defer.reject({error:error, status: status});            
                })
                .success( function ( data ) {

                    if( undefined !== data && data.length > 0 ){
                        defer.resolve( data );                    
                    }else{
                        defer.reject({status: 'no_repositories'});                                
                    }

                });

            return defer.promise;

        }

    }
})();