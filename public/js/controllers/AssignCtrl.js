sampleApp.controller('AssignController', function($scope, $http, $log){

	$scope.tagline = 'Now ya can create shows by assigning movies to show times, Its SHOW TIME!';

	var refresh1 = function() {
			$http.get('/city/getCity').success(function(response) {
					console.log('READ IS SUCCESSFUL');
					$scope.cityList = response;
					$scope.city = "";
			});
	};

	refresh1();

	var refresh = function() {
			$http.get('/assign/getAssign').success(function(response) {
					console.log('READ IS SUCCESSFUL');
					$scope.assignList = response;
					$scope.assign = "";
					console.log($scope.assignList);
			});
	};

	refresh();

	$scope.selectCity = function(assign){
		var cityValue = $scope.assign.cityName;
		console.log(cityValue);
		$http.get('/theatre/getTheatre').success(function(response) {
				console.log('READ IS SUCCESSFUL');
				$scope.theatreList = response;
				var returnValue = $scope.theatreList;
				console.log($scope.theatreList);

				var returnValue1 = returnValue.filter(function(o){
				    return (o.cityName === cityValue);
				});
				$scope.returnValue1 = returnValue1;
				console.log(returnValue1);
				//$scope.theatre = "";
		});
	}

	$scope.selectTheatre = function(assign){
		var theatreNameValue = $scope.assign.theatreName;
		console.log(theatreNameValue);
		$http.get('/showTime/getTimings').success(function(response){
			console.log('TIMINGS READ SUCCESSFUL');
			$scope.showtimeList = response;
			var returnTimings = $scope.showtimeList;
			console.log(returnTimings);

			returnTimings = returnTimings.filter(function(o){
					return (o.theatreName === theatreNameValue);
			});
			$scope.returnTimings = returnTimings;
			console.log(returnTimings);
		});
	}

	$scope.selectshowTime = function(assign) {
		$http.get('/movie/getMovie').success(function(response) {
				console.log('READ IS SUCCESSFUL');
				$scope.moviList = response;
				$scope.movi = "";
				console.log($scope.moviList);
		});
	}

	$scope.addAssign = function(assign) {
		var assignObj = {
			CName: assign.cityName,
			TName: assign.theatreName,
			STime: assign.showTime,
			MTitle: assign.movieTitle
		}
		console.log(assignObj);

		$http({
      method: 'POST',
      url: 'assign/addAssign',
      headers: {'Content-Type': 'application/json'},
      data: angular.fromJson(assignObj)
    })
    .then(function(response){
      console.log(response);
      console.log("TIMINGS ARE ADDED TO THEATRE SELECTED");
      refresh();
    })
	}

	$scope.removeAssign = function(assign) {
			$http.delete('/assign/deleteAssign/' + assign._id).success(function(response) {
					console.log(response);
					console.log('DELETED SUCCESSFULLY');
					refresh();
			});
	};

	$scope.updateAssign = function() {
			console.log("REACHED UPDATE");
			console.log($scope.assign._id);
			$http.put('/assign/updateAssign/' + $scope.assign._id, $scope.assign).success(function(response) {
					console.log(response);
					refresh();
			});
	};

	$scope.editAssign = function(assign) {
			$http.get('/assign/getAssign/' + assign._id).success(function(response) {
					$scope.assign = response[0];
			});
	};


});
