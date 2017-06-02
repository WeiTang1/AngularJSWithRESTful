var app = angular.module("app",['xeditable','ngRoute']);
app.config(function($routeProvider,$locationProvider){
    $locationProvider.hashPrefix = '';
    $routeProvider
        .when("/Talk",{
            templateUrl: "talk.html"
        })
        .when('/AddTalk',{
            template:'<h2>addtalk</h2>'
        });
});
// app.run(function(editableOptions,$http) {
//     editableOptions.theme = 'bs3'; // bootstrap3 theme. Can be also 'bs2', 'default'
// });
app.controller("talkCntrl",function($scope,$http,$filter){
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

        $scope.removeTalk = function(index) {
          $scope.talks.splice(index, 1);
        };

        $scope.addTalk = function(){
            console.log("i am in addTalk");
            $scope.inserted = {
                duration: null,
                id:null,
                name:"",
                speaker:"",
                venue:""

            };
            $scope.talks.push($scope.inserted);
        };

        $scope.saveTalk = function(data){
            console.log(data);
            $http(
                {
                    method:'POST',
                    url:'http://localhost:8080/RESTful/rest/talk/Update',
                    params:{
                        id:data.id,
                        name:data.name,
                        speaker:data.speaker,
                        venue:data.venue,
                        duration:data.duration
                    }
                }

            ).then(function(data){
                alert("ok");

            });
            console.log($http);
        };
});