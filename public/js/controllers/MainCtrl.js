sampleApp.controller('MainController', function($scope, $http, $log) {

	$scope.tagline = 'NOW SHOWING';

	var refresh = function() {
			$http.get('/assign/getAssign').success(function(response) {
					console.log('READ IS SUCCESSFUL');
					$scope.movieList = true;
					$scope.carousel = true;
					$scope.bookingWindow = false;
					$scope.headerBox = true;
					$scope.orderSuccess = false;
					$scope.assignList = response;
					$scope.assign = "";
					console.log($scope.assignList);
			});
	};

	refresh();

	$scope.goBack = function() {
		$scope.movieList = true;
		$scope.headerBox = true;
		$scope.carousel = true;
		$scope.orderSuccess = false;
		$scope.bookingWindow = false;
		$scope.booking.userSeats = null;
		$scope.totalAmount = null;
		refresh();
	}

	$scope.bookTickets = function(assign){
		var id = assign._id;
		console.log(id);
		$http.get('/assign/getAssign').success(function(response) {
				console.log('READ IS SUCCESSFUL');
				$scope.assignList = response;
		});

		console.log($scope.assignList);
		assignList1 = $scope.assignList;

		$scope.assignList1 = assignList1.filter(function(o){
			return (o._id === id)
		});

		console.log($scope.assignList1);

		$scope.assign.userSeats;

		$scope.id = id;
		$scope.carousel = false;
		$scope.movieList = false;
		$scope.headerBox = false;
		$scope.orderSuccess = false;
		$scope.bookingWindow = true;
	}

	$scope.calculateTotal = function(booking){
		console.log($scope.booking.userSeats);

		var ticketPrice = $scope.assignList1[0].ticketPrice;
		var totalAmount = ticketPrice * $scope.booking.userSeats;

		$scope.totalAmount = totalAmount;
		console.log(totalAmount);
	}

	$scope.bookNow = function(booking) {
		console.log($scope.assignList1);
		var oldRemSeats = $scope.assignList1[0].remSeats;
		var remSeats1 = oldRemSeats - $scope.booking.userSeats;
		$scope.remSeats1 = remSeats1;

		var bookingObj = {
			remSeats: remSeats1
		}

		console.log($scope.id);

		$http({
      method: 'PUT',
      url: 'assign/updateAssign/' + $scope.id,
      headers: {'Content-Type': 'application/json'},
      data: angular.fromJson(bookingObj)
    })
    .then(function(response){
      console.log(response);
      console.log("REM SEATS UPDATED");
    })

		var orderId = Math.floor(Math.random()*90000) + 10000;
	  $scope.orderId = orderId;

		$scope.carousel = false;
		$scope.movieList = false;
		$scope.headerBox = false;
		$scope.orderSuccess = false;
		$scope.bookingWindow = false;
		$scope.orderSuccess = true;

		var bookingDetailsObj = {
			USeats: $scope.booking.userSeats,
			OId: orderId
		}

		$scope.bookingDetailsObj = bookingDetailsObj;

		$http({
			method: 'PUT',
			url: 'assign/addBooking/' + $scope.id,
			headers: {'Content-Type': 'application/json'},
			data: angular.fromJson(bookingDetailsObj)
		})
		.then(function(response){
			console.log(response);
			console.log("INSIDE MAIN CTRL, Booking Details added successfully");
		})

	}

});
