app.directive('addTask', ['TodoAPIService', function(TodoAPIService){

  return {
    restrict: 'E',
    scope: {
      reload: '&'
    },
    template: `
      <form>
        <div class="form-group">
          <label for="desc">Description</label>
          <input class="form-control" type="text" ng-model="newTaskName" />
        </div>
        <div class="form-group">
          <label for="uid">User ID</label>
          <input class="form-control" type="text" ng-model="newTaskUid" />
        </div>
        <a class="btn btn-primary" ng-click="handleClick()">Create Task</a>
      </form>
    `,
    link: function(scope, element, attrs){
      scope.newTaskName = "";
      scope.newTaskUid = "";
      scope.formIsValid = function(){
        return Number.isInteger(scope.newTaskUid) && scope.newTaskName.length > 1;
      };
      scope.handleClick = function(){
        if (!scope.formIsValid){
          alert("Please use valid values");
        }
        else{
          console.log('this is firing');
          TodoAPIService.addTask(scope.newTaskName, scope.newTaskUid).success(scope.reload()).then( () => {
            scope.newTaskName = "";
            scope.newTaskUid = "";
          });
        }
      };
    }
  };
}]);
