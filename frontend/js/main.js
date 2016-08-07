var app = angular.module('TodoApp', [])
  .factory('TodoAPIService', ['$http', function($http){
    const host = "http://www.fvi-grad.com:9991";
    const getTasks = function(){
      return $http.get(host+"/tasks");
    };
    const updateTask = function(id,newStatus){
      return $http.put(host+"/tasks/"+id+"/"+newStatus);
    };
    const deleteTask = function(id){
      return $http.delete(host+"/tasks/"+id);
    };
    const addTask = function(desc, uid){
      return $http.post(host+'/tasks/'+desc+'/'+uid+'/new');
    };
    return {getTasks, updateTask, deleteTask, addTask};
  }])
  .controller('MainCtrl', ['TodoAPIService', '$scope', function(TodoAPIService, $scope){
    $scope.newTasks = [];
    $scope.reload = function(){
      TodoAPIService.getTasks().success( (res) =>  {
        $scope.newTasks=res.filter( e=> e.status==='new');
        $scope.startedTasks=res.filter( e=> e.status==='started');
        $scope.completedTasks=res.filter( e=> e.status==='completed');
      });
    };
    $scope.reload();

  }]);
