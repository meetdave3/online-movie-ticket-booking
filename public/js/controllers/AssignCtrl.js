sampleApp.controller('AssignController', function($scope, $http, $log){

	$scope.tagline = 'Now ya can create shows by assigning movies to show times, Its SHOW TIME!';

	var refresh = function() {
			$http.get('/city/getCity').success(function(response) {
					console.log('READ IS SUCCESSFUL');
					$scope.cityList = response;
					$scope.city = "";
			});
	};

	refresh();

	$scope.selectCity = function(assign){
		var cityValue = $scope.assign.city;
		console.log(cityValue);
		$http.get('/theatre/getTheatre').success(function(response) {
				console.log('READ IS SUCCESSFUL');
				$scope.theatreList = response;
				var returnValue = $scope.theatreList;
				console.log($scope.theatreList);

				returnValue = returnValue.filter(function(o){
				    return (o.cityName === cityValue);
				});

				console.log(returnValue);
				//$scope.theatre = "";
		});
	}

});
