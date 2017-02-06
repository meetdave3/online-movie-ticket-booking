sampleApp.controller('showtimeController', function($scope, $http, $log){

  $scope.tagline = "You can add show timings to all theatres on this page";

  var loadTheatres = function() {
    $http.get('/theatre/getTheatre').success(function(response){
      console.log('Inside Load Threatres');
      $scope.theatreList = response;
      console.log($scope.theatreList);
      $scope.threatre = "";
    });
  };

  loadTheatres();

  var refresh = function() {
    $http.get('/showtime/getTimings').success(function(response){
      console.log("READ IS SUCCESSFUL");
      $scope.showtimeList = response;
      console.log($scope.showtimeList);
      console.log("SHOWED TIME LIST INSIDE SHOWTIME CONTROLLER");
      $scope.showtime = "";
    });
  };

  refresh();

  $scope.addTimings = function(show){
    var showObj = {
      STiming: show.showTimings,
      STheatre: show.theatreName
    };

    console.log(showObj);

    $http({
      method: 'POST',
      url: 'showtime/addTimings',
      headers: {'Content-Type': 'application/json'},
      data: angular.fromJson(showObj)
    })
    .then(function(response){
      console.log(response);
      console.log("TIMINGS ARE ADDED TO THEATRE SELECTED");
      refresh();
    })
  };

  $scope.removeShowtime = function(show) {
    console.log(showtime.id);
    $http.delete('/showtime/deleteShowtime/' + showtime._id).success(function(response){
      console.log(response);
      console.log("DELETED SHOWTIME SUCCESSFLLY");
      refresh();
    });
  };

  $scope.editShowtime = function(show) {
    $http.get('/showtime/getTimings' + showtime._id).success(function(response){
      $scope.showtime = response[0];
    });
  };

  $scope.updateShowtime = function(theatre) {
    console.log("REACHED SHOWTIME UPDATE");
    console.log($scope.showtime._id);
    $http.put('/showtime/updateShowtime/' + $scope.showtime._id, $scope.showtime).success(function(response){
      console.log(response);
      console.log("Showtimes Updated Successfully");
      refresh();
    });
  };

});
