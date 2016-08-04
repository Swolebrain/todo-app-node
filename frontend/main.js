
$(function(){
    let host = "http://localhost:9999";
    loadAll();

    /* EVENT HANDLER FOR TASK BUTTON */
    $('#board').on('click', '.action', function(){
      console.log($(this));
      let btnHost = host+'/tasks/'+$(this).data('id')+'/'+$(this).attr('newstatus'),
          method = 'PUT';
      if ($(this).attr('newstatus') === 'delete'){
        btnHost = host+'/tasks/'+$(this).data('id');
        method = 'DELETE';
      }
      console.log(btnHost);
      $.ajax({
        url: btnHost,
        method: method,
        success: function(res,txt,xhr){
          if (typeof(res) == 'string') alert(res);
          else loadAll();
        }
      })
    });
    /* EVENT HANDLER FOR ADD TASK BUTTON */
    $("#create").on("click", function(e){
      e.preventDefault();
      let url = $("form").serializeArray()
        .reduce((p,c) => p+c.value+'/', host+`/tasks/`);
      let success = function(res,txt,xhr){ loadAll(); $('input[type="text"]').val("") };
      $.post({url, success});
    })

    function loadAll(){
      $("#new, #started, #completed").html("");
      $.ajax({
        url: host+"/tasks",
        success: function(res, txt, xhr){
          res.map(e=>{
            let newStatus, buttonCaption;
            if (e.status=='new'){
              newStatus = 'started';
              buttonCaption = 'Start';
            }
            if (e.status=='started') {
              newStatus = 'completed';
              buttonCaption = 'Complete';
            }
            if (e.status=='completed'){
              newStatus='delete';
              buttonCaption = 'Delete';
            }
            $('#'+e.status).append(`
              <div class='task' data-id='${e.id}'>
                <h3>${e.description}</h3>
                <h4>Owner: ${e.uid}</h4>
                <h4 data-id='${e.id}' class='action' newstatus='${newStatus}'>
                  ${buttonCaption}<span class='fa fa-play-circle'></span>
                </h4>
              </div>
              `);
          });
        }
      });
    }
});
