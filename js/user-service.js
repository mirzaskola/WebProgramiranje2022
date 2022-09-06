var UserService = {
    init: function(){
      var token = localStorage.getItem("token");
      if (token){
        window.location.replace("index.html");
      }
      $('#login-form').validate({
        submitHandler: function(form) {
          var entity = Object.fromEntries((new FormData(form)).entries());
          UserService.login(entity);
        }
      });
      $('#signup-form').validate({
        submitHandler: function(form) {
          var entity = Object.fromEntries((new FormData(form)).entries());
          UserService.signup(entity);
        }
      });
    },
    login: function(entity){
      $.ajax({
        url: 'rest/login',
        type: 'POST',
        data: JSON.stringify(entity),
        contentType: "application/json",
        dataType: "json",
        success: function(result) {
          console.log(result);
          localStorage.setItem("token", result.message);
          if(localStorage.getItem("token") === null || localStorage.token === 'undefined'){
            console.log("NE VALJA");
            window.location.replace("login.html");
          }
          else{
            window.location.replace("index.html");
          }
        },
        error: function(XMLHttpRequest, textStatus, errorThrown) {
          toastr.error(XMLHttpRequest.responseJSON.message);
        }
      });
    },
    signup: function(entity){
      $.ajax({
        url: 'rest/signup',
        type: 'POST',
        data: JSON.stringify(entity),
        contentType: "application/json",
        dataType: "json",
        success: function(result) {
          window.location.replace("login.html");
        },
        error: function(XMLHttpRequest, textStatus, errorThrown) {
          toastr.error(XMLHttpRequest.responseJSON.message);
        }
      });
    },
    check_user_role: function(){
      $.ajax({
        url: 'rest/admin',
        type: 'GET',
        beforeSend: function(xhr){
          xhr.setRequestHeader('Authorization', localStorage.getItem('token'));
        },
        success: function(result) {
          if(result == true){
            window.location.replace("admin-panel.html");
          }
          else{
            window.location.replace("403-page.html");
          }
        },
        error: function(XMLHttpRequest, textStatus, errorThrown) {
          toastr.error(XMLHttpRequest.responseJSON.message);
        }
      });
    },

    logout: function(){
      localStorage.clear();
      window.location.replace("login.html");
    },

    /*###### ADMIN PANEL #####*/
    get_all_users_admin: function(){
      $.ajax({
          url: "rest/users",
          type: "GET",
          beforeSend: function(xhr){
              xhr.setRequestHeader('Authorization', localStorage.getItem('token'));
          },
          success: function(data) {
              $("#user-dashboard").html("");
              var gameBodyHtml = "";
              for (let i = 0; i < data.length; i++){                    
                      gameBodyHtml +=`
                      <tr>
                      <td class="text-start">`+data[i].id+`</td>
                      <td class="text-start">`+data[i].username+`</td>
                      <td class="text-start">`+data[i].email+`</td>                         
                      <td class="text-start">`+data[i].password+`</td>                         
                      <td class="text-start">`+data[i].user_role+`</td>                         
                      <td class="text-start" scope="row">
                          <button class="btn btn-outline-warning btn-sm edit-user-button" onClick="UserService.get_admin(`+data[i].id+`)">
                              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pencil-fill" viewBox="0 0 16 16">
                                  <path d="M12.854.146a.5.5 0 0 0-.707 0L10.5 1.793 14.207 5.5l1.647-1.646a.5.5 0 0 0 0-.708l-3-3zm.646 6.061L9.793 2.5 3.293 9H3.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.207l6.5-6.5zm-7.468 7.468A.5.5 0 0 1 6 13.5V13h-.5a.5.5 0 0 1-.5-.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.5-.5V10h-.5a.499.499 0 0 1-.175-.032l-.179.178a.5.5 0 0 0-.11.168l-2 5a.5.5 0 0 0 .65.65l5-2a.5.5 0 0 0 .168-.11l.178-.178z"/>
                              </svg>
                          </button>
                      
                          <button class="btn btn-outline-danger btn-sm delete-user-button" onclick="UserService.delete(`+data[i].id+`)">
                              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash-fill" viewBox="0 0 16 16">
                                  <path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1H2.5zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zM8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5zm3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0z"/>
                              </svg>
                          </button>
                      </td> 
                  </tr>
                  `;                     
              }
              $("#user-dashboard").html(gameBodyHtml);                
          }
      });
  },
  add: function(entity) {
    $.ajax({
    url: 'rest/users',
    type: 'POST',
    beforeSend: function(xhr){
        xhr.setRequestHeader('Authorization', localStorage.getItem('token'));
    },
    data: JSON.stringify(entity),
    contentType: "application/json",
    dataType: "json",
    success: function(result) {
        $("#addNewUserModal").modal('hide');
        $("#user-dashboard").html("");
        UserService.get_all_users_admin();
    }
    });
  },
  get_admin: function(id){
    $(".edit-user-button").attr('disabled', true);
    
    $.ajax({
        url: 'rest/users/'+id,
        type: "GET",
        beforeSend: function(xhr){
            xhr.setRequestHeader('Authorization', localStorage.getItem('token'));
        },
        success: function(data) {
          $('#editUserForm input[name="id"]').val(data.id);
          $('#editUserForm input[name="username"]').val(data.username);
          $('#editUserForm input[name="email"]').val(data.email);
          $('#editUserForm input[name="password"]').val(data.password);
          $('#editUserForm input[name="user_role"]').val(data.user_role);
  
          $(".edit-user-button").attr('disabled', false);
          $('#editUserModal').modal("show");
        }
    });
  },
  
  update: function(entity){

    $(".save-changes-button").attr('disabled', true);

    // var user = {
    //       id: $('#editUserForm input[name="id"]').val(),
    //       username: $('#editUserForm input[name="username"]').val(),
    //       email: $('#editUserForm input[name="email"]').val(),
    //       password: $('#editUserForm input[name="password"]').val(),
    //       user_role: $('#editUserForm input[name="user_role"]').val(),
    //     };
       
    $.ajax({
        url: 'rest/users/'+$('#editUserForm input[name="id"]').val(),
        type: 'PUT',
        beforeSend: function(xhr){
          xhr.setRequestHeader('Authorization', localStorage.getItem('token'));
        },
        data: JSON.stringify(entity),
        dataType: 'json',
        contentType: 'application/json',
        success: function (result) {
            $("#editUserModal").modal("hide");
            $(".save-changes-button").attr('disabled', false);
            $("#user-dashboard").html("");

            UserService.get_all_users_admin();
        }
    });
  },
  delete: function(id){
    $(".delete-user-button").attr('disabled', true);
    $.ajax({
        url: 'rest/deleteusers/'+id,
        type: 'DELETE', 
        beforeSend: function(xhr){
          xhr.setRequestHeader('Authorization', localStorage.getItem('token'));
        },       
        success: function() {
          $(".delete-user-button").attr('disabled', false);
          $("#game-list").html("");

          UserService.get_all_users_admin();
      }
    });
  },
  }
