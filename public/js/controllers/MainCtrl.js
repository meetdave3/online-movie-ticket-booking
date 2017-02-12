sampleApp.controller('MainController', function($scope, $http, $log) {

	$scope.tagline = 'NOW SHOWING';

	var refresh = function() {
			$http.get('/assign/getAssign').success(function(response) {
					console.log('READ IS SUCCESSFUL');
					$scope.movieList = true;
					$scope.bookingWindow = false;
					$scope.assignList = response;
					$scope.assign = "";
					console.log($scope.assignList);
			});
	};

	refresh();

	$scope.goBack = function() {
		$scope.movieList = true;
		$scope.bookingWindow = false;
		refresh();
	}

	$scope.bookTickets = function(assign){
		var id = assign._id;
		$scope.id = id;
		$scope.movieList = false;
		$scope.bookingWindow = true;
		console.log(id);
	}

});
