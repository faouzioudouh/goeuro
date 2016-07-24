(function () {
    
    angular.module('goeuro')
    .controller('GithubController', GithubCtrl);

    GithubCtrl.$inject = ['$scope', 'Github','$timeout'];

    function GithubCtrl($scope, Github, $timeout) {
        
        /* jshint validthis: true */
        var vm = this;

        vm.loading = false ;        
        vm.error = {show:false, message:""};
        vm.username = "";
        vm.repositories = [];
        vm.getRepositories = getRepositories;

        /*
         *Watchers  
         */
        $scope.$watch('vm.username', function( newVal ){

            vm.repositories = [];                            
            toggleError("");                                                        
                        
            if( newVal !== undefined && newVal.length > 0 ){
                getRepositories();
            }else{
                toggleError("Find people repositories on Github.");                                                        
            }

        });


        /**
         * Get Repositories.
         */
        function getRepositories(){
            vm.loading = true;
            var username = vm.username;

            Github.getRepositories( username )
                .catch( handleError )
                .then( handleSuccessRepos );

        }

        /**
         * Handle Error events
         */
        function handleError( error ){
                
                vm.loading = false;
                vm.repositories = [];                
                
                switch( error.status ){

                    case 404:
                        toggleError("The Github user does not exist.");                    
                        break;
                    case 403:
                        toggleError("API rate limit exceeded.");                                                            
                        break;
                    
                    case'no_repositories':
                        toggleError("Github user @"+ vm.username +" has no repos.");                                                                                
                        break;

                    case 500:
                        toggleError("Github API does not respond : "+error.error.message);                                                                               
                        break;

                    case -1:
                        toggleError("Please, check your connection and try again.");                                        
                        break;
                }

        }

        /**
         * Handle Success repositories.
         */
        function handleSuccessRepos( repos ){
            
            vm.loading = false;
            vm.error.show = false;            
            vm.repositories = repos;

        }

        /**
         * Toggle errors.
         */
        function toggleError( message ){
    
            $timeout(function(){
                vm.error.message = message;
                vm.error.show = message !== undefined && message.length > 0;
            });

        }

    }

})();