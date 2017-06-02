var app = angular.module("app",[ ]);
app.controller("talkCntrl",function($scope,$http){
    $http.get("http://localhost:8080/RESTful/rest/talk/GetTalks").then(function(
       data
    ){
        console.log(data.data);
        $scope.talks = data.data.talk;
        $scope.count = 0;

        angular.forEach(data.data.talk, function(object) {
            console.log(object.duration);
            $scope.count += object.duration*1;
        })});
});