sampleApp.controller('theatreController', function($scope, $http,$log) 
{

    $scope.tagline = 'Fill the theatre Details Here';

var loadCities = function() {
        $http.get('/city/getCity').success(function(response) {
            console.log('READ IS SUCCESSFUL');
            $scope.cityList = response;
            $scope.city = "";
        });
    };

loadCities()

var refresh = function() {
        $http.get('/theatre/getTheatre').success(function(response) {
            console.log('READ IS SUCCESSFUL');
            $scope.theatreList = response;
            $scope.theatre = "";
        });
    };




refresh();

    $scope.addTheatre = function(theatre) 
    {

        var  theatreObj ={
            TName:theatre.theatreName,                //creating one object to store all data in one
            TSheet:theatre.theatreSheet,
            TPrice:theatre.theatrePrice,
            TCity:theatre.city
        };
       // var theatreName ={};
       // var theatreSheet={};
        //var ticketPrice={};
        //var theatreCity={};
        //theatreName["tname"] = theatre.theatreName;
        //theatreSheet["tsheet"] = theatre.theatreSheet;
       // ticketPrice["paisa"] = theatre.theatrePrice;
        //theatreCity["tcity"] = theatre.city;
         //theatreObj= [[theatreName],[theatreSheet],[ticketPrice],[theatreCity]]
         //theatreObj['theatre'] = theatre.theatreName;

    
            $http({
                    method: 'POST',
                    url: '/theatre/addTheatre',
                     headers: {'Content-Type': 'application/json'},    
                    data: angular.fromJson(theatreObj)
                })
                .then(function(response) {
                    console.log(response);
                    console.log("CREATE IS SUCCESSFUL");
                    
                    refresh();
                });
  
};


    $scope.removeTheatre = function(theatre) {
        //console.log(id);
        $http.delete('/theatre/deleteTheatre/' + theatre._id).success(function(response) {
            console.log(response);
            console.log('DELETED SUCCESSFULLY');
            refresh();
        });
    };

    $scope.editTheatre = function(theatre) {
        $http.get('/theatre/getTheatre/' + theatre._id).success(function(response) {
            $scope.theatre = response[0];
        });
    };

    $scope.updateTheatre = function(theatre) {
        console.log("REACHED UPDATE");
        console.log($scope.theatre._id);
        $http.put('/theatre/updateTheatre/' + $scope.theatre._id, $scope.theatre).success(function(response) {
            console.log(response);
            console.log("Theatre Updated successfully");
            refresh();
        });
    };

}
);
