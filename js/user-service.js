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
          localStorage.setItem("token", result.token);
          if(typeof(localStorage.getItem("token")) === null || typeof(localStorage.getItem("token")) === 'undefined'){
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
  }