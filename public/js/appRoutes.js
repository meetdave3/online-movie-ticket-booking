angular.module('appRoutes', []).config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {

	$routeProvider

		// home page
		.when('/', {
			templateUrl: 'views/home.html',
			controller: 'MainController'
		})

		.when('/booking', {
			templateUrl: 'views/booking.html',
			controller: 'BookingController'
		})

		.when('/movies', {
			templateUrl: 'views/movies.html',
			controller: 'MoviesController'	
		})
		.when('/city', {
			templateUrl: 'views/city.html',
			controller: 'cityController'	
		})
        .when('/theatre', {
			templateUrl: 'views/theatre.html',
			controller: 'theatreController'	
		});

		

	$locationProvider.html5Mode(true);

}]);