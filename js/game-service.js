var GameService = {
    // "Konstruktor" stranice
    init: function(){
      $("#addGameForm").validate({
        submitHandler: function(form){
          var podaci = Object.fromEntries((new FormData(form)).entries());
          GameService.add(podaci);
        }  
      });
      GameService.get_all();
    },
    // Kod Kece je list
    get_all: function(){
      $.get("rest/games", function(data){
          var html = "";
          for(let i = 0; i < data.length; i++){
              html += `<!-- single item start -->
                          <div class="col-lg-4 mt-4">
                              <div class="box text-start shadow">
                                  <h4 class="text-center">`+ data[i].name +`</h4>
                                  <div class="img-box">
                                      <img src="img/video-6.jpg" alt="img" class="img-fluid">
                                      <div class="start">
                                          <div class="star_inner">
                                              <img src="img/star.png" alt="img" class="img-fluid">
                                              <span class="d-inline-block">82%</span>
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
                                          <div class="item-line Lw-90"></div>
                                      </div>
                                  </div>
                                  <div class="row">
                                      <div class="col-lg-3">
                                          <div class="item-text">
                                              <p class="mb-0">Performance</p>
                                          </div>
                                      </div>
                                      <div class="col-lg-9">
                                          <div class="item-line Lw-80"></div>
                                      </div>
                                  </div>
                                  <div class="row">
                                      <div class="col-lg-3">
                                          <div class="item-text">
                                              <p class="mb-0">Graphics</p>
                                          </div>
                                      </div>
                                      <div class="col-lg-9">
                                          <div class="item-line Lw-60"></div>
                                      </div>
                                  </div>
                                  <div class="row">
                                      <div class="col-lg-3">
                                          <div class="item-text">
                                              <p class="mb-0">Audio</p>
                                          </div>
                                      </div>
                                      <div class="col-lg-9">
                                          <div class="item-line Lw-100"></div>
                                      </div>
                                  </div>
                                  <div class="row">
                                      <div class="col-lg-3">
                                          <div class="item-text">
                                              <p class="mb-0">Satisfaction</p>
                                          </div>
                                      </div>
                                      <div class="col-lg-9">
                                          <div class="item-line Lw-90"></div>
                                      </div>
                                  </div>
                                  <br>
                                      <!-- Button trigger modal -->
                                      <button type="button" class="btn btn-primary view-button" onclick=GameService.get(`+data[i].id+`)>
                                      View details
                                      </button>
                                      
                                  
                              </div>
                          </div>
                          <!-- single item end -->
                          `;    
          }
          // .html funkcija je za injectanje htmla u odredjeni dio stranice   
          $("#game-list").html(html);
          console.log(data);
          // alert("Ucitano!");
      });
    },

    get: function(id){
      $(".view-button").attr('disabled', true);
      // ajax GET request za usere
      $.get('rest/games/'+id, function(data){
          // jquery selektori
          $("#id").val(data.id);
          $("#name").val(data.name);
          $("#category_id").val(data.category_id);
          $("#description").val(data.description);
        //   $("#password").val(data.user_password);
          $("#ModalEditGame").modal("show");
          $(".view-button").attr('disabled', false);
      });
    },

    add: function(podaci){
        // ajax POST request za usere
      $.ajax({
          url: 'rest/games',
          type: 'POST',
          data: JSON.stringify(podaci),
          dataType: 'json',
          contentType: 'application/json',
          success: function (result) {
              $("#ModalAddUser").modal("hide");
              $(".save-changes-button").attr('disabled', false);
              $("#game-list").html('<div class="spinner-border" role="status"><span class="sr-only"></span></div>');
              GameService.get_all();
              }
      });
    },

    update: function(){
      $(".save-changes-button").attr('disabled', true);
      var podaci = {};
      podaci.name = $("#name").val();    
      podaci.category_id = $("#category_id").val();    
      podaci.description = $("#description").val(); 
      // ajax PUT request za usere   
      $.ajax({
          url: 'rest/games/'+$("#id").val(),
          type: 'PUT',
          data: JSON.stringify(podaci),
          dataType: 'json',
          contentType: 'application/json',
          success: function (result) {
              $("#ModalEditGame").modal("hide");
              $(".save-changes-button").attr('disabled', false);
              $("#game-list").html('<div class="spinner-border" role="status"><span class="sr-only"></span></div>');
              GameService.get_all();
              }
      });
    },

    delete: function(id){
    // ajax DELETE request za usere
      $(".view-button").attr('disabled', true);
      id = $("#id").val();
      $.ajax({
          url: 'rest/games/'+id,
          type: 'DELETE',
          // data: JSON.stringify(podaci),
          // dataType: 'json',
          // contentType: 'application/json',
          success: function (result) {
              $("#game-list").html('<div class="spinner-border" role="status"><span class="sr-only"></span></div>');
              $("#ModalEditGame").modal("hide");
              GameService.get_all();
              }
      });
    }
  }

  // STARE FUNKCIJE
  
    // getItems() - get all items and list them using HTML 
    // showEditModal(id) - get item by id and fill in data within modal which is opened
    // updateItem() - update item data within database
    // showAddNewItemModal() - open add new modal with fields related to your object 
    // addNewItem() - save item to database
    // deleteItem(id) - delete item from database    
    
    
    // 
    // function getItems(){
    //     $.get("rest/users", function(data){
    //         var html = "";
    //         for(let i = 0; i < data.length; i++){
    //             html += `<!-- single item start -->
    //                         <div class="col-lg-4 mt-4">
    //                             <div class="box text-start shadow">
    //                                 <h4 class="text-center">`+ data[i].user_name +`</h4>
    //                                 <div class="img-box">
    //                                     <img src="img/video-6.jpg" alt="img" class="img-fluid">
    //                                     <div class="start">
    //                                         <div class="star_inner">
    //                                             <img src="img/star.png" alt="img" class="img-fluid">
    //                                             <span class="d-inline-block">82%</span>
    //                                         </div>
    //                                     </div>
    //                                 </div>
    //                                 <div class="row ">
    //                                     <div class="col-lg-3">
    //                                         <div class="item-text">
    //                                             <p class="mb-0">Gameplay</p>
    //                                         </div>
    //                                     </div>
    //                                     <div class="col-lg-9" >
    //                                         <div class="item-line Lw-90"></div>
    //                                     </div>
    //                                 </div>
    //                                 <div class="row">
    //                                     <div class="col-lg-3">
    //                                         <div class="item-text">
    //                                             <p class="mb-0">Performance</p>
    //                                         </div>
    //                                     </div>
    //                                     <div class="col-lg-9">
    //                                         <div class="item-line Lw-80"></div>
    //                                     </div>
    //                                 </div>
    //                                 <div class="row">
    //                                     <div class="col-lg-3">
    //                                         <div class="item-text">
    //                                             <p class="mb-0">Graphics</p>
    //                                         </div>
    //                                     </div>
    //                                     <div class="col-lg-9">
    //                                         <div class="item-line Lw-60"></div>
    //                                     </div>
    //                                 </div>
    //                                 <div class="row">
    //                                     <div class="col-lg-3">
    //                                         <div class="item-text">
    //                                             <p class="mb-0">Audio</p>
    //                                         </div>
    //                                     </div>
    //                                     <div class="col-lg-9">
    //                                         <div class="item-line Lw-100"></div>
    //                                     </div>
    //                                 </div>
    //                                 <div class="row">
    //                                     <div class="col-lg-3">
    //                                         <div class="item-text">
    //                                             <p class="mb-0">Satisfaction</p>
    //                                         </div>
    //                                     </div>
    //                                     <div class="col-lg-9">
    //                                         <div class="item-line Lw-90"></div>
    //                                     </div>
    //                                 </div>
    //                                 <br>
    //                                     <!-- Button trigger modal -->
    //                                     <button type="button" class="btn btn-primary view-button" onclick=showEditModal(`+data[i].id+`)>
    //                                     View details
    //                                     </button>
                                        
                                    
    //                             </div>
    //                         </div>
    //                         <!-- single item end -->
    //                         `;    
    //         }
    //         $("#game-list").html(html);
    //         console.log(data);
    //         // alert("Ucitano!");
    //     });
    // }   
    // function showEditModal(id){
    //     $(".view-button").attr('disabled', true);
    //     // ajax GET request za usere
    //     $.get('rest/users/'+id, function(data){
    //         // jquery selektori
    //         $("#id").val(data.id);
    //         $("#username").val(data.user_name);
    //         $("#email").val(data.user_mail);
    //         $("#password").val(data.user_password);
    //         $("#ModalEditUser").modal("show");
    //         $(".view-button").attr('disabled', false);
    //     });
    // }
    // function updateItem() {
    //     $(".save-changes-button").attr('disabled', true);
    //     var podaci = {};
    //     podaci.user_name = $("#username").val();    
    //     podaci.user_mail = $("#email").val();    
    //     podaci.user_password = $("#password").val(); 
    //     // ajax PUT request za usere   
    //     $.ajax({
    //         url: 'rest/users/'+$("#id").val(),
    //         type: 'PUT',
    //         data: JSON.stringify(podaci),
    //         dataType: 'json',
    //         contentType: 'application/json',
    //         success: function (result) {
    //             $("#ModalEditUser").modal("hide");
    //             $(".save-changes-button").attr('disabled', false);
    //             $("#game-list").html('<div class="spinner-border" role="status"><span class="sr-only"></span></div>');
    //             UserService.get_all();
    //             }
    //     });
    // }
    // function showAddNewItemModal(){
    //     $("#ModalAddUser").modal("show");
    // }
    // function addNewItem(){
    //     $(".save-changes-button").attr('disabled', true);
    //     var podaci = {};
    //     podaci.user_name = $("#addusername").val();    
    //     podaci.user_mail = $("#addemail").val();    
    //     podaci.user_password = $("#addpassword").val(); 
    //     // ajax POST request za usere   
    //     $.ajax({
    //         url: 'rest/users',
    //         type: 'POST',
    //         data: JSON.stringify(podaci),
    //         dataType: 'json',
    //         contentType: 'application/json',
    //         success: function (result) {
    //             $("#ModalAddUser").modal("hide");
    //             $(".save-changes-button").attr('disabled', false);
    //             $("#game-list").html('<div class="spinner-border" role="status"><span class="sr-only"></span></div>');
    //             getItems();
    //             }
    //     });
    // }
    // function deleteItem(id){
    //     $(".view-button").attr('disabled', true);
    //     id = $("#id").val();
    //     $.ajax({
    //         url: 'rest/users/'+id,
    //         type: 'DELETE',
    //         // data: JSON.stringify(podaci),
    //         // dataType: 'json',
    //         // contentType: 'application/json',
    //         success: function (result) {
    //             $("#game-list").html('<div class="spinner-border" role="status"><span class="sr-only"></span></div>');
    //             $("#ModalEditUser").modal("hide");
    //             UserService.get_all();
    //             }
    //     });
    // }