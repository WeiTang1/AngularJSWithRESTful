var app = angular.module("app",['xeditable','ngRoute']);
app.config(function($routeProvider,$locationProvider){
    $locationProvider.hashPrefix = '';
    $routeProvider
        .when("/Talk",{
            templateUrl: "talk.html"
        })
        .when('/AddTalk',{
            templateUrl: "addtalk.html"
        });
});
app.directive("myDir",function(){
    return{
        scope:{},
        restrict:"A",
        template:
        "<div>" + "<input type ='text' ng-model = 'txt'/>"+"</div>"+'{{txt}}'
    }
});
// app.run(function(editableOptions,$http) {
//     editableOptions.theme = 'bs3'; // bootstrap3 theme. Can be also 'bs2', 'default'
// });
app.controller("talkCntrl",function($scope,$http,$filter){

    $http.get("http://localhost:8080/RESTful/rest/talk/GetTalks").then(function(data){
        console.log("I am here in talkcontrol http get");
        console.log(data);
        console.log(data.data);
        console.log(data.data.talk);
        if (angular.isArray(data.data.talk))
        $scope.talks = data.data.talk;
        else{
            $scope.talks = [data.data.talk];
        }
        $scope.count = 0;

        angular.forEach(data.data.talk, function(object) {
            $scope.count += object.duration*1;
        })});

    $scope.removeTalk = function(index) {
        $scope.talks.splice(index, 1);
    };

    $scope.addTalk = function(){
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
        return $http(
            {
                method:'POST',
                url:'http://localhost:8080/RESTful/rest/talk/Update',
                headers:{'Content-Type': 'application/x-www-form-urlencoded'},
                transformRequest: function(obj) {
                    var str = [];
                    for(var p in obj)
                        str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
                    return str.join("&");
                },
                data:data
            })
    };
    $scope.deleteTalk = function(id,index){
        $http.delete("http://localhost:8080/RESTful/rest/talk/"+id).then(function(){
            $scope.talks.splice(index, 1);}
        );
    };
    $scope.submit = function(form){

    }

});