var UserService = {
    init: function(){
      
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
      
      $('#addUserForm').validate({
        submitHandler: function(form) {
          var entity = Object.fromEntries((new FormData(form)).entries());
          UserService.add(entity);
        }
      });
      
      $('#editUserForm').validate({
        submitHandler: function(form) {
          var entity = Object.fromEntries((new FormData(form)).entries());
          UserService.update(entity);
        }
      });
      $('#editProfileForm').validate({
        submitHandler: function(form) {
          var entity = Object.fromEntries((new FormData(form)).entries());
          UserService.update_my_profile(entity);
        }
      });
      $('#changePasswordForm').validate({
        rules: {
          newpassword: "required",
          password: {
            equalTo: "#newpassword"
          }
        },
        submitHandler: function(form) {
          var entity = Object.fromEntries((new FormData(form)).entries());
          UserService.update_password_my_profile(entity);
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
    check_user_role: function(current_url){
      $.ajax({
        url: 'rest/checkuser',
        type: 'GET',
        beforeSend: function(xhr){
          xhr.setRequestHeader('Authorization', localStorage.getItem('token'));
        },
        success: function(result) {
          // User is registered or admin and goes to my profile
          if((result == "admin" || result == "user") && current_url.includes("profile")){
            window.location.replace("my-profile.html");
          }
          // User is unregistered and wants to visit my profile
          if((result == "guest") && current_url.includes("profile")){
            window.location.replace("login.html");
          }
          // User is admin and accesses admin panel
          if(result == "admin" && current_url.includes("admin")){
            window.location.replace("admin-panel.html");
          }
          // User is registered or unregistered and wants to access admin panel
          if(result == "guest" && current_url.includes("admin")){
            window.location.replace("login.html");
          }
          if(result == "user" && current_url.includes("admin")){
            window.location.replace("index.html");
          }
          // User is registered or admin and wants to leave a review

          // User is unregistered and wants to leave a review
        },
        error: function(XMLHttpRequest, textStatus, errorThrown) {
          window.location.replace("login.html");
        }
      });
    },
    // validate_user: function(result){
    //   $.ajax({
    //     url: 'rest/validateuser',
    //     type: 'GET',
    //     beforeSend: function(xhr){
    //       xhr.setRequestHeader('Authorization', localStorage.getItem('token'));
    //     },
    //     success: function(result) {
    //       if(result == true){
    //         UserService.init();
    //       }
    //       else{
    //         window.location.replace("login.html");
    //       }
    //     },
    //     error: function(XMLHttpRequest, textStatus, errorThrown) {
    //       toastr.error(XMLHttpRequest.responseJSON.message);
    //     }
    //   });
    // },
    logout: function(){
      localStorage.clear();
      window.location.replace("login.html");
    },

    get_my_profile_info: function(id){
      $(".edit-user-button").attr('disabled', true);
      
      $.ajax({
          url: 'rest/myprofile',
          type: "GET",
          beforeSend: function(xhr){
              xhr.setRequestHeader('Authorization', localStorage.getItem('token'));
          },
          success: function(data) {

            var profileContent = "";
            profileContent += `<div class="row gutters-sm">
                                <div class="col-md-4 mb-3">
                                  <div class="card">
                                    <div class="card-body" style="background-color: #0A0A0A;">
                                      <div class="d-flex flex-column align-items-center text-center">
                                        <img src="https://bootdey.com/img/Content/avatar/avatar7.png" alt="Admin" class="rounded-circle" width="150">
                                        <div class="mt-3">
                                          <h4>@`+ data.username +`</h4>
                                          <!-- <p class="text-secondary mb-1">Full Stack Developer</p>
                                          <p class="text-muted font-size-sm">Bay Area, San Francisco, CA</p> -->
                                          <!-- <button class="btn btn-primary">Follow</button>
                                          <button class="btn btn-outline-primary">Message</button> -->
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                  <!-- <div class="card mt-3" >
                                    <ul class="list-group list-group-flush">
                                      <li class="list-group-item d-flex justify-content-between align-items-center flex-wrap" style="background-color: black;">
                                        <h6 class="mb-0"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-globe mr-2 icon-inline"><circle cx="12" cy="12" r="10"></circle><line x1="2" y1="12" x2="22" y2="12"></line><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path></svg>Website</h6>
                                        <span class="text-secondary">https://bootdey.com</span>
                                      </li>
                                      <li class="list-group-item d-flex justify-content-between align-items-center flex-wrap">
                                        <h6 class="mb-0"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-github mr-2 icon-inline"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path></svg>Github</h6>
                                        <span class="text-secondary">bootdey</span>
                                      </li>
                                      <li class="list-group-item d-flex justify-content-between align-items-center flex-wrap">
                                        <h6 class="mb-0"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-twitter mr-2 icon-inline text-info"><path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"></path></svg>Twitter</h6>
                                        <span class="text-secondary">@bootdey</span>
                                      </li>
                                      <li class="list-group-item d-flex justify-content-between align-items-center flex-wrap">
                                        <h6 class="mb-0"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-instagram mr-2 icon-inline text-danger"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>Instagram</h6>
                                        <span class="text-secondary">bootdey</span>
                                      </li>
                                      <li class="list-group-item d-flex justify-content-between align-items-center flex-wrap">
                                        <h6 class="mb-0"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-facebook mr-2 icon-inline text-primary"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg>Facebook</h6>
                                        <span class="text-secondary">bootdey</span>
                                      </li>
                                    </ul>
                                  </div> -->
                                </div>
                                <div class="col-md-8">
                                  <div class="card mb-3">
                                    <div class="card-body" style="background-color: #0A0A0A;">
                                      <div class="row">
                                        <div class="col-sm-3">
                                          <h6 class="mb-0">Username</h6>
                                        </div>
                                        <div class="col-sm-9 text-secondary">
                                          `+ data.username +`
                                        </div>
                                      </div>
                                      <hr>
                                      <div class="row">
                                        <div class="col-sm-3">
                                          <h6 class="mb-0">Email</h6>
                                        </div>
                                        <div class="col-sm-9 text-secondary">
                                          `+ data.email +`
                                        </div>
                                      </div>
                                      <hr>
                                      <div class="row">
                                        <div class="col-sm-3">
                                          <h6 class="mb-0">Password</h6>
                                        </div>
                                        <div class="col-sm-9 text-secondary">
                                          <strong><a data-bs-toggle="modal" data-bs-target="#changePasswordModal" role=button>Change password<a></strong>
                                        </div>
                                      </div>
                                      <hr>
                                      
                                      <div class="row">
                                        <div class="col-sm-12">
                                          <a class="btn btn-primary edit-user-button" data-bs-toggle="modal" data-bs-target="#editProfileModal" href="">Edit profile</a>
                                          <a class="btn btn-light" data-bs-toggle="modal" data-bs-target="#viewYourReviewsModal" href="">View your reviews</a>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>`;

            $('#editProfileForm input[name="id"]').val(data.id);
            $('#editProfileForm input[name="user_role"]').val(data.user_role);
            $('#editProfileForm input[name="username"]').val(data.username);
            $('#editProfileForm input[name="email"]').val(data.email);
            $('#changePasswordForm input[name="id"]').val(data.id);

    
            $(".edit-user-button").attr('disabled', false);
            $("#profile-content").html(profileContent);
          }
      });
    },
    update_my_profile: function(entity){
      $(".save-changes-button").attr('disabled', true);

      $.ajax({
        url: 'rest/myprofile/'+$('#editProfileForm input[name="id"]').val(),
        type: 'PUT',
        beforeSend: function(xhr){
          xhr.setRequestHeader('Authorization', localStorage.getItem('token'));
        },
        data: JSON.stringify(entity),
        dataType: 'json',
        contentType: 'application/json',
        success: function (result) {
            $("#editProfileModal").modal("hide");
            $(".save-changes-button").attr('disabled', false);
            $("#profile-content").html("");

            UserService.get_my_profile_info();
        }
      });
    },
    update_password_my_profile: function(entity){
      $(".save-changes-button").attr('disabled', true);

      $.ajax({
        url: 'rest/changepassword/'+$('#changePasswordForm input[name="id"]').val(),
        type: 'PUT',
        beforeSend: function(xhr){
          xhr.setRequestHeader('Authorization', localStorage.getItem('token'));
        },
        data: JSON.stringify(entity),
        dataType: 'json',
        contentType: 'application/json',
        success: function (result) {
            $("#changePasswordModal").modal("hide");
            $(".save-changes-button").attr('disabled', false);
            $("#profile-content").html("");

            UserService.get_my_profile_info();
        }
      });
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
                      <!-- <td class="text-start">`+data[i].password+`</td> -->                        
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
          // $('#editUserForm input[name="password"]').val(data.password);
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
