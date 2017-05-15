var app = angular.module('Sharkbite', ['ngRoute']);

    //Controller for the Hompage.  Thought of calling in WelcomeController, but Homepage sounds more accurate.  Thought about changing the name of the html file to homepage as well.  I'll split the difference.
    app.controller('HomepageController', ['$rootScope', function ($rootScope) {
        $rootScope.user = '';
    }])
    
   //Controller for getting and posting "bites"(aka "tweets")
    app.controller('BiteController', ['$rootScope', '$scope', '$http', function ($rootScope, $scope, $http) {
        var user = $rootScope.user;

        //To get data and display. Post after?  Seems odd
        $scope.getData = function () {
            $http({
                url: 'http://localhost:3000/api/bites',
                method: 'GET'
            }).then(function (success) {
                $scope.bites = success.data;
            }, function (err) {
                // alert('You encountered an error. Try again.');  Chose to use console.log as just getting data doesn't necessarilly seem like something the user would be overly concerned with.  They'd likely only be concerned at the login or posting stage.
                console.log(err);
            });
        };

        //Posting function.  In reading, could also define a reversal method here which would reverse the array. HTML method much easier.
        $scope.postData = function () {
            var bite = biteLogger();
            $http({
                url: 'http://localhost:3000/api/bites',
                method: 'POST',
                data: bite
            }).then(function (success) {
                $scope.bites.push(bite);
                $('#text-box').val('');   //blank it
            }, function (err) {
                alert('You encountered an error. Try again.');  //This originally was a problem with console.log but it turned out to not be a problem.  The page actually was throwing an error, likely due to server interruptions.
            });
        };

        function biteLogger() {   //combines a date value for logging purposes.
            return {
                user: user,
                text: $('#text-box').val(),
                createdAt: new Date().toDateString()
            };
        };
        $scope.getData(); //have to call the function
    }])
    //Routing: Dave said to put it that the bottom. Everything's defined by that point. Pretty straightforward.
    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider
        .when('/', {
            templateUrl: 'views/welcome.html',
            controller: 'HomepageController'
        }).when('/bites', {
            templateUrl: 'views/bites.html',
            controller: 'BiteController'
        }).otherwise({
            redirectTo: '/'
        });
    }]);