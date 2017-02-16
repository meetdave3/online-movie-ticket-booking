sampleApp.controller('BookController', function($scope, $http,$log)
{

    $scope.tagline = 'All bookings on this page';

    var refresh = function() {
        $http.get('/book/getBooking').success(function(response) {
            console.log('READ IS SUCCESSFUL');
            $scope.bookList = response;
            console.log($scope.bookList);
            $scope.booking = "";
        });
    };

    refresh();

    $scope.deleteBooking = function(booking) {
        console.log($scope.booking);
        $http.delete('/book/deleteBooking/' + booking._id).success(function(response) {
            console.log(response);
            console.log('DELETED SUCCESSFULLY');
            refresh();
        });
    };

});
