app.directive('task', ['TodoAPIService', function(TodoAPIService){

  return {
    restrict: 'E',
    scope: {
      task: '=',
      reload : '&'
    },
    template: `
    <div class='task' >
      <h3>{{task.description}}</h3>
      <h4>Owner: {{task.uid}}</h4>
      <h4 data-id='{{task.id}}' class='action' ng-click="task.clickHandler()">
        {{task.btnText}}<span class='fa fa-play-circle'></span>
      </h4>
    </div>
    `,
    link: function(scope, element, attrs){
      //console.log(scope.ctrlReload);
      if (scope.task.status == 'new'){
        scope.task.clickHandler = ()=>TodoAPIService.updateTask(scope.task.id, 'started').success(scope.reload());
        scope.task.btnText = 'Start';
      }
      else if (scope.task.status == 'started'){
        scope.task.clickHandler = ()=>TodoAPIService.updateTask(scope.task.id, 'completed').success(scope.reload());
        scope.task.btnText = 'Complete';
      }
      else {
        scope.task.clickHandler = ()=>TodoAPIService.deleteTask(scope.task.id).success(scope.reload());
        scope.task.btnText = 'Delete';
      }


    }
  }
}]);












/*

<div class='task' data-id='${e.id}'>
  <h3>${e.description}</h3>
  <h4>Owner: ${e.uid}</h4>
  <h4 data-id='${e.id}' class='action' newstatus='${newStatus}'>
    ${buttonCaption}<span class='fa fa-play-circle'></span>
  </h4>
</div>
*/
