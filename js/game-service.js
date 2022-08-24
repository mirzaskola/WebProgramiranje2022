var GameService = {

    init: function(){
        $('#addGameForm').validate({
            submitHandler: function(form) {
              var game = Object.fromEntries((new FormData(form)).entries());
              console.log(game);
              GameService.add(game);
            }
          });
      
        GameService.get_all_games_admin();
    },
    
    get_highest_rated: function(){
        $.get("rest/toprated", function(data){
            var html = "";
            for(let i = 0; i < data.length; i++){
                html += `
                            <div class="col-lg-4 mt-4">
                                <div class="box text-start shadow">
                                    <h4 class="text-center">`+data[i].name+`</h4>
                                    <div class="img-box">
                                        <img src="img/`+data[i].image+`" alt="img" class="img-fluid">
                                        <div class="start">
                                            <div class="star_inner">
                                                <img src="img/star.png" alt="img" class="img-fluid">
                                                <span class="d-inline-block">`+parseInt(data[i].total_rating)+`</span>
                                            </div>
                                        </div>
                                    </div>

                                    <div class="row ">
                                        <div class="col-lg-3">
                                            <div class="item-text">
                                                <p class="mb-0">Gameplay</p>
                                            </div>
                                        </div>
                                        <div class="col-lg-9" >
                                            <div class="item-line" style="width:`+parseInt(data[i].gameplay)+`%;"></div>
                                        </div>
                                    </div>
                                    <div class="row">
                                            <div class="col-lg-3">
                                                <div class="item-text">
                                                    <p class="mb-0">Performance</p>
                                                </div>
                                            </div>
                                            <div class="col-lg-9">
                                                <div class="item-line" style="width:`+parseInt(data[i].preformance)+`%;"></div>
                                            </div>
                                    </div>

                                    <div class="row">
                                    <div class="col-lg-3">
                                        <div class="item-text">
                                            <p class="mb-0">Graphics</p>
                                        </div>
                                    </div>
                                    <div class="col-lg-9">
                                        <div class="item-line" style="width:`+parseInt(data[i].graphics)+`%;"></div>
                                    </div>
                                    </div>

                                    <div class="row">
                                    <div class="col-lg-3">
                                        <div class="item-text">
                                            <p class="mb-0">Audio</p>
                                        </div>
                                    </div>
                                    <div class="col-lg-9">
                                        <div class="item-line"  style="width:`+parseInt(data[i].audio)+`%;"></div>
                                    </div>
                                    </div>

                                    <div class="row">
                                    <div class="col-lg-3">
                                        <div class="item-text">
                                            <p class="mb-0">Satisfaction</p>
                                        </div>
                                    </div>
                                    <div class="col-lg-9">
                                        <div class="item-line" style="width:`+parseInt(data[i].gameplay)+`%;"></div>
                                    </div>
                                    </div>
                                    <br>
                                    <div class=" d-flex justify-content-center">
                                        <button class="btn btn-primary view-game-details" onclick="GameService.get(`+data[i].id+`)">
                                            View details
                                        </button>
                                    </div>
                                </div>
                            </div>
                            `;    
            }
            $("#top-rated").html(html);
        });    
    },

    get: function(id){
        $(".view-game-details").attr('disabled', true);
        
        $.ajax({
            url: 'rest/games/'+id,
            type: "GET",
            success: function(data) {
              $("#game_title").html("");
              $("#game_title").html(`
                <p class=" modal-title fs-4"> Details about ` + data.name + ` </p>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
              `);
            
              $('#editGameForm input[name="id"]').val(data.id);            
              $('#editGameForm input[name="name"]').val(data.name);
              $('#editGameForm input[name="category_id"]').val(data.category_id);
              $('#editGameForm input[name="image"]').val(data.image);
              $('#editGameForm input[name="icon"]').val(data.icon);
              $('#editGameForm textarea[name="description"]').val(data.description);
            

              $("#review-modal").html("");
              $("#review-modal").html(`<p class="fs-4"> Leave a review for ` + data.name + ` </p>`);
            
              $(".view-game-details").attr('disabled', false);
              $('#viewGameDetailsModal').modal("show");
            }
        });
    },
    





/*###### ADMIN PANEL #####*/
    get_all_games_admin: function(){
        $.ajax({
            url: "rest/games",
            type: "GET",
            success: function(data) {
                $("#games-dashboard").html("");
                var gameBodyHtml = "";
                for (let i = 0; i < data.length; i++){                    
                        gameBodyHtml +=`
                                        <tr>
                                            <<td class="text-start">`+data[i].name+`</td>
                                            <td class="text-start">`+data[i].category_id+`</td>
                                            <td class="text-start"><span class="d-inline-block text-truncate" style="max-width: 100px;">`+data[i].description+`</span></td>                                                                     
                                            <td class="text-start" scope="col">
                                                <button class="btn btn-outline-warning btn-sm edit-game-button" onclick="GameService.get_admin(`+data[i].id+`)">
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pencil-fill" viewBox="0 0 16 16">
                                                        <path d="M12.854.146a.5.5 0 0 0-.707 0L10.5 1.793 14.207 5.5l1.647-1.646a.5.5 0 0 0 0-.708l-3-3zm.646 6.061L9.793 2.5 3.293 9H3.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.207l6.5-6.5zm-7.468 7.468A.5.5 0 0 1 6 13.5V13h-.5a.5.5 0 0 1-.5-.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.5-.5V10h-.5a.499.499 0 0 1-.175-.032l-.179.178a.5.5 0 0 0-.11.168l-2 5a.5.5 0 0 0 .65.65l5-2a.5.5 0 0 0 .168-.11l.178-.178z"/>
                                                    </svg>
                                                </button>
                                            
                                                <button class="btn btn-outline-danger btn-sm delete-game-button" onclick="GameService.delete(`+data[i].id+`)">
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash-fill" viewBox="0 0 16 16">
                                                        <path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1H2.5zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zM8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5zm3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0z"/>
                                                    </svg>
                                                </button>
                                            </td>
                                        </tr>
                                        `;                    
                }
                $("#games-dashboard").html(gameBodyHtml);                
            }
        });
    },
    get_admin: function(id){
        $(".edit-game-button").attr('disabled', true);
        
        $.ajax({
            url: 'rest/games/'+id,
            type: "GET",
            success: function(data) {
              $('#editGameForm input[name="id"]').val(data.id);
              $('#editGameForm input[name="name"]').val(data.name);
              $('#editGameForm input[name="category_id"]').val(data.category_id);
              $('#editGameForm input[name="image"]').val(data.image);
              $('#editGameForm input[name="icon"]').val(data.icon);
              $('#editGameForm textarea[name="description"]').val(data.description);
            
              $(".edit-game-button").attr('disabled', false);
              $('#editGameModal').modal("show");
            }
        });
      },
      
      
    update: function(){

        $(".save-changes-button").attr('disabled', true);

        var game = {
              id: $('#editGameForm input[name="id"]').val(),
              name: $('#editGameForm input[name="name"]').val(),
              category_id: $('#editGameForm input[name="category_id"]').val(),
              image: $('#editGameForm input[name="image"]').val(),
              icon: $('#editGameForm input[name="icon"]').val(),
              description: $('#editGameForm textarea[name="description"]').val() 
            };
           
        $.ajax({
            url: 'rest/games/'+$('#editGameForm input[name="id"]').val(),
            type: 'PUT',
            data: JSON.stringify(game),
            dataType: 'json',
            contentType: 'application/json',
            success: function (result) {
                $("#editGameModal").modal("hide");
                $(".save-changes-button").attr('disabled', false);
                $("#game-list").html("");

                GameService.get_all_games_admin();
            }
        });
      },

    add: function(game) {
            $.ajax({
            url: 'rest/games',
            type: 'POST',
            data: JSON.stringify(game),
            contentType: "application/json",
            dataType: "json",
            success: function(result) {
                $("#addNewGameModal").modal('hide');
                $("#games-dashboard").html("");
                GameService.init();
            }
            });
        },

    delete: function(id){
      $(".delete-game-button").attr('disabled', true);
      $.ajax({
          url: 'rest/games/'+id,
          type: 'DELETE',        
          success: function() {
            $(".delete-game-button").attr('disabled', false);
            $("#game-list").html("");

            GameService.get_all_games_admin();
        }
      });
    },

     get_comments: function(id){
        $.get('rest/comments/'+id, function(data){
            var html = "";
            for(let i = 0; i < data.length; i++){
                html += `<div class="d-flex text-muted pt-3">                
                            <p class="text-break pb-3 mb-0 lh-sm border-bottom">
                                <strong class="d-block text-gray-dark">@`+data[i].user_username+`</strong>
                                `+data[i].description+`
                            </p>
                        </div>
                        `;    
            }
            $("#game_comments").html(html);
        });   
    },

    get_all_names: function(){
        $.get("rest/allnames", function(data){
            var datalist_html = "";
            console.log(data);
            for(let i = 0; i < data.length; i++){
                datalist_html += `<option value="`+data[i].name+`">`;
            }
            $("#datalist_game_list").html(datalist_html);
        });   
    },
    
}