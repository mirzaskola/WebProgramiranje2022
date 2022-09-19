var GameService = {

    init: function () {
        $('#addGameForm').validate({
            submitHandler: function (form) {
                var game = Object.fromEntries((new FormData(form)).entries());
                console.log(game);
                GameService.add(game);
            }
        });
        $('#search-form').validate({
            submitHandler: function (form) {
                var name = Object.fromEntries((new FormData(form)).entries());
                console.log(name);
                GameService.get_game_by_name(name);
            }
        });
        $('#reviewGameForm').validate({
            submitHandler: function (form) {
                var review = Object.fromEntries((new FormData(form)).entries());
                console.log(review);
                GameService.leave_review(review);
            }
        });
        // $('#editReviewGameForm').validate({
        //     submitHandler: function (form) {
        //         var review = Object.fromEntries((new FormData(form)).entries());
        //         console.log(review);
        //         GameService.update_review_for_my_profile(review);
        //     }
        // });
        $('#editGameForm').validate({
            submitHandler: function (form) {
                var game = Object.fromEntries((new FormData(form)).entries());
                console.log(game);
                GameService.update(game);
            }
        });

        GameService.get_all_games_admin();
    },

    get_highest_rated: function () {
        $.ajax({
            url: "rest/toprated",
            type: "GET",
            success: function (data) {
                $("#top-rated").html("");
                var html = "";
                for (let i = 0; i < data.length; i++) {
                    html += `
                        <div class="col-lg-4 mt-4">
                        <div class="box text-start shadow">
                            <h4 class="text-center">`+ data[i].name + `</h4>
                            <div class="img-box">
                                <img src="img/`+ data[i].image + `" alt="img" class="img-fluid">
                                <div class="start">
                                    <div class="star_inner">
                                        <img src="img/star.png" alt="img" class="img-fluid">
                                        <span class="d-inline-block">`+ parseInt(data[i].total_rating) + `%</span>
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
                                    <div class="item-line Lw" style="--rating:`+ parseInt(data[i].gameplay) + `%;"></div>
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-lg-3">
                                    <div class="item-text">
                                        <p class="mb-0">Performance</p>
                                    </div>
                                </div>
                                <div class="col-lg-9">
                                    <div class="item-line Lw" style="--rating:`+ parseInt(data[i].performance) + `%;"></div>
                                </div>
                            </div>

                            <div class="row">
                            <div class="col-lg-3">
                                <div class="item-text">
                                    <p class="mb-0">Graphics</p>
                                </div>
                            </div>
                            <div class="col-lg-9">
                                <div class="item-line Lw" style="--rating:`+ parseInt(data[i].graphics) + `%;"></div>
                            </div>
                            </div>

                            <div class="row">
                            <div class="col-lg-3">
                                <div class="item-text">
                                    <p class="mb-0">Audio</p>
                                </div>
                            </div>
                            <div class="col-lg-9">
                                <div class="item-line Lw" style="--rating:`+ parseInt(data[i].audio) + `%;"></div>
                            </div>
                            </div>

                            <div class="row">
                            <div class="col-lg-3">
                                <div class="item-text">
                                    <p class="mb-0">Satisfaction</p>
                                </div>
                            </div>
                            <div class="col-lg-9">
                                <div class="item-line Lw" style="--rating:`+ parseInt(data[i].satisfaction) + `%;"></div>
                            </div>
                            </div>
                            <br>
                            <div class="d-flex justify-content-center">
                                <button class="btn btn-primary view-game-details" onclick="GameService.get(`+ data[i].id + `)">
                                    View details
                                </button>
                            </div>
                        </div>
                    </div>
                        `;

                }
                $("#top-rated").html(html);
            }
        });
    },

    redirect_to_login: function () {
        var token = localStorage.getItem("token");
        if (token == null || token == undefined) {
            window.location.replace("login.html");
        }
        else {
            $("#ModalReview").modal("show");
        }
    },

    get: function (id) {
        $(".view-game-details").attr('disabled', true);

        $.ajax({
            url: 'rest/games/'+id,
            type: "GET",
            success: function (data) {
                $("#game_title").html("");
                $("#game_title").html(`
                <h4 class=" modal-title fs-4"> Details about ` + data.name + ` </h4>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
              `);

                $('#viewGameDetailsForm input[name="id"]').val(data.id);
                $('#viewGameDetailsForm input[name="name"]').val(data.name);
                $('#viewGameDetailsForm input[name="category_name"]').val(data.category_name);
                $('#viewGameDetailsForm textarea[name="description"]').val(data.description);


                $("#review-modal").html("");
                $("#review-modal").html(`<p class="fs-4"> Leave a review for ` + data.name + ` </p>`);
                $('#reviewGameForm input[name="game_id"]').val(data.id);
                GameService.get_reviews_for_game(id);
                $(".view-game-details").attr('disabled', false);
                $('#viewGameDetailsModal').modal("show");
                
            }
        });
    },
    get_all_games_client: function () {
        $.ajax({
            url: "rest/games",
            type: "GET",
            success: function (data) {
                $("#game-list").html("");
                var html = "";
                for (let i = 0; i < data.length; i++) {
                    html += `
                    <!-- single item start -->
                    <div class="col-sm-12 col-md-12 col-lg-6 col-xl-3 mb-3">
                        <div class="box text-start shadow">
                            <h4 class="text-center">`+ data[i].name + `</h4>
                            <div class="text-center">
                                <img src="img/`+ data[i].image + `" alt="img" class="img-fluid rounded"> 
                            </div>
                            <br>
                            <div class="row justify-content-center">                                        
                                <div class="col-md">
                                    <div class="text-center">
                                        <p class="text-sm-center">
                                        </p>
                                    </div>                                            
                                </div>
                                
                            </div>
                            
                            <div class="row">
                                <div class="col">
                                    <!-- Button trigger modal -->
                                    <div class="d-flex justify-content-center">
                                        <button class="btn btn-primary view-game-details" onclick="GameService.get(`+ data[i].id + `)">
                                            View details
                                        </button>
                                    </div>
                                </div>
                            </div>
                            
                        </div>
                    </div>
                    <!-- single item end -->
                        `;

                }
                $("#game-list").html(html);
            }
        });
    },
    get_game_by_name: function (name) {
        $.ajax({
            url: 'rest/games-search',
            type: 'POST',
            data: JSON.stringify(name),
            dataType: 'json',
            contentType: 'application/json',
            success: function (data) {
                $("#game-list").html("");
                var html = "";
                if (data.length < 1) {
                    html += `<h2 class="text-center">Game not found</h2>`;
                }
                for (let i = 0; i < data.length; i++) {
                    html += `
                    <!-- single item start -->
                    <div class="col-sm-12 col-md-12 col-lg-6 col-xl-3 mb-3">
                        <div class="box text-start shadow">
                            <h4 class="text-center">`+ data[i].name + `</h4>
                            <div class="text-center">
                                <img src="img/`+ data[i].image + `" alt="img" class="img-fluid rounded"> 
                            </div>
                            <br>
                            <div class="row justify-content-center">                                        
                                <div class="col-md">
                                    <div class="text-center">
                                        <p class="text-sm-center">
                                            
                                        </p>
                                    </div>                                            
                                </div>
                                
                            </div>
                            
                            <div class="row">
                                <div class="col">
                                    <div class="d-flex justify-content-center">
                                        <button class="btn btn-primary view-game-details" onclick="GameService.get(`+ data[i].id + `)">
                                            View details
                                        </button>
                                    </div>
                                </div>
                            </div>
                            
                        </div>
                    </div>
                    <!-- single item end -->
                        `;

                }
                $("#game-list").html(html);
                
            }
        });
    },
    parse_date: function(date){
        var year = date.substring(2, 4);
        var month = date.substring(5, 7);
        var day = date.substring(8, 10);
        var hour = date.substring(11, 13);
        var minute = date.substring(14, 16);
        // 0-4 5-7 8-10 12-14 16-18
        // 2022-09-13 22:00:39
        let datum = `${day}/${month}/${year}` ;
        let time = `${hour}:${minute}`;
        return `${datum} ${time}`;
    },
    leave_review: function (review) {
        review.created = ``;
        let currentDate = new Date();
        let day = currentDate.getDate();
        let month = currentDate.getMonth() + 1;
        let year = currentDate.getFullYear();
        let time = currentDate.getHours() + ":" + currentDate.getMinutes() + ":" + currentDate.getSeconds();
        review.created = `${year}-${month}-${day} ${time}`;

        $.ajax({
            url: 'rest/review',
            type: 'POST',
            beforeSend: function (xhr) {
                xhr.setRequestHeader('Authorization', localStorage.getItem('token'));
            },
            data: JSON.stringify(review),
            dataType: 'json',
            contentType: 'application/json',
            success: function () {
                // $("#review-modal").modal("hide");
                // $(".save-changes-button").attr('disabled', false);
                // $("#game-list").html("");
                // window.location.reload();
                GameService.get_highest_rated();
                GameService.get_all_games_client();
                document.getElementById("reviewGameForm").reset()
            }
        });
    },
    get_reviews_for_game: function(id){
        $.ajax({
            url: 'rest/reviews/'+id,
            type: 'GET',
            success: function (data) {
                $("#review-list").html("");
                var html = `<h5 class="border-bottom pb-2 mb-0">Reviews</h5> `;
                if (data.length < 1) {
                    html = ``;
                    html += `<h2 class="text-center">No reviews for this title</h2>`;
                }
                for (let i = 0; i < data.length; i++) {
                    html += `
                        <!-- single review start -->
                        <div class="d-flex text-muted pt-3">
                            <svg class="bd-placeholder-img flex-shrink-0 me-2 rounded" width="32" height="32" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Placeholder: 32x32" preserveAspectRatio="xMidYMid slice" focusable="false"><title>Placeholder</title><rect width="100%" height="100%" fill="#007bff"></rect><text x="50%" y="50%" fill="#007bff" dy=".3em">32x32</text></svg>
                    
                            <p class="pb-3 mb-0 small lh-sm border-bottom">
                                <span class="d-block"><strong class="text-gray-dark">@`+ data[i].username +`</strong> `+ parseInt(data[i].total_rating_by_post) +`/100 <span><i>Posted on: `+ GameService.parse_date(data[i].created) +`</i></span></span>
                                
                                `+ data[i].comment +`
                            </p>
                        </div>
                        <!-- single review end -->
                        `;

                }
                $("#review-list").html(html);
            }
        });
    },
    get_reviews_for_my_profile: function(){
        $.ajax({
            url: 'rest/mojirivjui',
            type: 'GET',
            beforeSend: function (xhr) {
                xhr.setRequestHeader('Authorization', localStorage.getItem('token'));
            },
            success: function (data) {
                $("#my-reviews").html("");
                var html = ``;
                if (data.length < 1) {
                    html = ``;
                    html += `<h2 class="text-center">No reviews for this title</h2>`;
                }
                for (let i = 0; i < data.length; i++) {    
                    html += `
                        <!-- single review start -->
                        <tr>
                            <td class="text-start">
                                <div class="d-flex text-muted pt-3">
                                <svg class="bd-placeholder-img flex-shrink-0 me-2 rounded" width="32" height="32" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Placeholder: 32x32" preserveAspectRatio="xMidYMid slice" focusable="false"><title>Placeholder</title><rect width="100%" height="100%" fill="#007bff"></rect><text x="50%" y="50%" fill="#007bff" dy=".3em">32x32</text></svg>
                        
                                <p class="pb-3 mb-0 small lh-sm border-bottom">
                                    <span class="d-block text-truncate"><strong class="text-gray-dark">@`+ data[i].username +`</strong> `+ parseInt(data[i].total_rating_by_post) +`/100 <span><i>Posted on: `+ GameService.parse_date(data[i].created) +` </i></span></span>
                                    
                                    `+ data[i].comment +`
                                </p>
                                </div>
                            </td>
                            <td class="text-start">`+ data[i].name +`</td>
                            <td class="text-start">
                            <button class="btn btn-outline-warning btn-sm edit-review-button" onclick="GameService.get_one_review_for_my_profile(`+ data[i].review_id + `)">
                                     <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pencil-fill" viewBox="0 0 16 16">
                                        <path d="M12.854.146a.5.5 0 0 0-.707 0L10.5 1.793 14.207 5.5l1.647-1.646a.5.5 0 0 0 0-.708l-3-3zm.646 6.061L9.793 2.5 3.293 9H3.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.207l6.5-6.5zm-7.468 7.468A.5.5 0 0 1 6 13.5V13h-.5a.5.5 0 0 1-.5-.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.5-.5V10h-.5a.499.499 0 0 1-.175-.032l-.179.178a.5.5 0 0 0-.11.168l-2 5a.5.5 0 0 0 .65.65l5-2a.5.5 0 0 0 .168-.11l.178-.178z"/>
                                     </svg>
                            </button>
                                            
                             <button class="btn btn-outline-danger btn-sm delete-review-button" onclick="GameService.delete_review_for_my_profile(`+ data[i].review_id + `)">
                                 <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash-fill" viewBox="0 0 16 16">
                                    <path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1H2.5zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zM8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5zm3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0z"/>
                                 </svg>
                             </button>
                             </td>
                        
                        <tr>
                        <!-- single review end -->
                        `;

                }
                $("#my-reviews").html(html);
            }
        });
    },
    get_one_review_for_my_profile: function(id){
        $(".edit-review-button").attr('disabled', true);
        $.ajax({
            url: 'rest/mojirivjui/'+id,
            type: "GET",
            beforeSend: function (xhr) {
                xhr.setRequestHeader('Authorization', localStorage.getItem('token'));
            },
            success: function (data) {
                $("#game_title").html("");
                $("#game_title").html(`
                <p class=" modal-title fs-4"> Details about ` + data.name + ` </p>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
              `);
                $('#editReviewGameForm input[name="id"]').val(data.id);
                $('#editReviewGameForm input[name="game_id"]').val(data.game_id);
                $('#editReviewGameForm input[name="gameplay_rating"]').val(data.gameplay_rating);
                $('#editReviewGameForm input[name="performance_rating"]').val(data.performance_rating);
                $('#editReviewGameForm input[name="audio_rating"]').val(data.audio_rating);
                $('#editReviewGameForm input[name="satisfaction_rating"]').val(data.satisfaction_rating);
                $('#editReviewGameForm textarea[name="comment"]').val(data.comment);


                $("#review-modal").html("");
                $("#review-modal").html(`<p class="fs-4"> Leave a review for ` + data.name + ` </p>`);
                
                $("#ModalReview").modal('show');
                $("#viewYourReviewsModal").modal('hide');
                $(".edit-review-button").attr('disabled', false);

                GameService.get_reviews_for_my_profile();
            }
        });
    },
    update_review_for_my_profile: function(){
        $(".save-changes-button").attr('disabled', true);

        var review = {
              id: $('#editReviewGameForm input[name="id"]').val(),
              game_id: $('#editReviewGameForm input[name="game_id"]').val(),
              gameplay_rating: $('#editReviewGameForm input[name="gameplay_rating"]').val(),
              performance_rating: $('#editReviewGameForm input[name="performance_rating"]').val(),
              audio_rating: $('#editReviewGameForm input[name="audio_rating"]').val(),
              satisfaction_rating: $('#editReviewGameForm input[name="satisfaction_rating"]').val(), 
              comment: $('#editReviewGameForm textarea[name="comment"]').val() 
            };

        $.ajax({
            url: 'rest/mojirivjui/'+$('#editReviewGameForm input[name="id"]').val(),
            type: 'PUT',
            beforeSend: function (xhr) {
                xhr.setRequestHeader('Authorization', localStorage.getItem('token'));
            },
            data: JSON.stringify(review),
            dataType: 'json',
            contentType: 'application/json',
            success: function (result) {
                $("#ModalReview").modal("hide");
                $(".save-changes-button").attr('disabled', false);
                GameService.get_reviews_for_my_profile();
            }
        });
    },
    delete_review_for_my_profile: function (id) {
        $(".delete-review-button").attr('disabled', true);
        $.ajax({
            url: 'rest/deletemojirivjui/' + id,
            type: 'DELETE',
            beforeSend: function (xhr) {
                xhr.setRequestHeader('Authorization', localStorage.getItem('token'));
            },
            success: function () {
                $(".delete-review-button").attr('disabled', false);
                GameService.get_reviews_for_my_profile();
            }
        });
    },

    /*###### ADMIN PANEL #####*/
    get_all_games_admin: function () {
        $.ajax({
            url: "rest/games",
            type: "GET",
            beforeSend: function (xhr) {
                xhr.setRequestHeader('Authorization', localStorage.getItem('token'));
            },
            success: function (data) {
                $("#games-dashboard").html("");
                var gameBodyHtml = "";
                for (let i = 0; i < data.length; i++) {
                    gameBodyHtml += `
                                        <tr>
                                            <<td class="text-start">`+ data[i].name + `</td>
                                            <td class="text-start">`+ data[i].category_id + `</td>
                                            <td class="text-start"><span class="d-inline-block text-truncate" style="max-width: 100px;">`+ data[i].description + `</span></td>                                                                     
                                            <td class="text-start" scope="col">
                                                <button class="btn btn-outline-warning btn-sm edit-game-button" onclick="GameService.get_admin(`+ data[i].id + `)">
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pencil-fill" viewBox="0 0 16 16">
                                                        <path d="M12.854.146a.5.5 0 0 0-.707 0L10.5 1.793 14.207 5.5l1.647-1.646a.5.5 0 0 0 0-.708l-3-3zm.646 6.061L9.793 2.5 3.293 9H3.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.207l6.5-6.5zm-7.468 7.468A.5.5 0 0 1 6 13.5V13h-.5a.5.5 0 0 1-.5-.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.5-.5V10h-.5a.499.499 0 0 1-.175-.032l-.179.178a.5.5 0 0 0-.11.168l-2 5a.5.5 0 0 0 .65.65l5-2a.5.5 0 0 0 .168-.11l.178-.178z"/>
                                                    </svg>
                                                </button>
                                            
                                                <button class="btn btn-outline-danger btn-sm delete-game-button" onclick="GameService.delete(`+ data[i].id + `)">
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
    get_admin: function (id) {
        $(".edit-game-button").attr('disabled', true);

        $.ajax({
            url: 'rest/games/' + id,
            type: "GET",
            beforeSend: function (xhr) {
                xhr.setRequestHeader('Authorization', localStorage.getItem('token'));
            },
            success: function (data) {
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


    update: function (entity) {

        $(".save-changes-button").attr('disabled', true);

        // var game = {
        //       id: $('#editGameForm input[name="id"]').val(),
        //       name: $('#editGameForm input[name="name"]').val(),
        //       category_id: $('#editGameForm input[name="category_id"]').val(),
        //       image: $('#editGameForm input[name="image"]').val(),
        //       icon: $('#editGameForm input[name="icon"]').val(),
        //       description: $('#editGameForm textarea[name="description"]').val() 
        //     };

        $.ajax({
            url: 'rest/games/' + $('#editGameForm input[name="id"]').val(),
            type: 'PUT',
            data: JSON.stringify(entity),
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

    add: function (game) {
        $.ajax({
            url: 'rest/games',
            type: 'POST',
            beforeSend: function (xhr) {
                xhr.setRequestHeader('Authorization', localStorage.getItem('token'));
            },
            data: JSON.stringify(game),
            contentType: "application/json",
            dataType: "json",
            success: function (result) {
                $("#addNewGameModal").modal('hide');
                $("#games-dashboard").html("");
                GameService.init();
            }
        });
    },

    delete: function (id) {
        $(".delete-game-button").attr('disabled', true);
        $.ajax({
            url: 'rest/deletegames/' + id,
            type: 'DELETE',
            beforeSend: function (xhr) {
                xhr.setRequestHeader('Authorization', localStorage.getItem('token'));
            },
            success: function () {
                $(".delete-game-button").attr('disabled', false);
                $("#game-list").html("");
                $("#games-dashboard").html("");

                GameService.get_all_games_admin();
            }
        });
    },

    get_all_reviews_admin: function(){
        $.ajax({
            url: 'rest/reviews',
            type: 'GET',
            beforeSend: function (xhr) {
                xhr.setRequestHeader('Authorization', localStorage.getItem('token'));
            },
            success: function (data) {
                $("#all-reviews").html("");
                var html = ``;
                if (data.length < 1) {
                    html = ``;
                    html += `<h2 class="text-center">No reviews</h2>`;
                }
                for (let i = 0; i < data.length; i++) {
                    html += `
                        <!-- single review start -->
                        <tr>
                            <td class="text-start">
                                <div class="d-flex text-muted pt-3">
                                <svg class="bd-placeholder-img flex-shrink-0 me-2 rounded" width="32" height="32" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Placeholder: 32x32" preserveAspectRatio="xMidYMid slice" focusable="false"><title>Placeholder</title><rect width="100%" height="100%" fill="#007bff"></rect><text x="50%" y="50%" fill="#007bff" dy=".3em">32x32</text></svg>
                        
                                <p class="pb-3 mb-0 small lh-sm border-bottom">
                                    <span class="d-block text-truncate"><strong class="text-gray-dark">@`+ data[i].username +`</strong> `+ parseInt(data[i].total_rating_by_post) +`/100 <span><i>Posted on: `+ GameService.parse_date(data[i].created)+` </i></span></span>
                                    
                                    `+ data[i].comment +`
                                </p>
                                </div>
                            </td>
                            <td class="text-start">`+ data[i].name +`</td>
                            <td class="text-start">
                            
                                            
                             <button class="btn btn-outline-danger btn-sm delete-review-button" onclick="GameService.delete_review_admin(`+ data[i].review_id + `)">
                                 <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash-fill" viewBox="0 0 16 16">
                                    <path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1H2.5zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zM8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5zm3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0z"/>
                                 </svg>
                             </button>
                             </td>
                        
                        <tr>
                        <!-- single review end -->
                        `;

                }
                $("#all-reviews").html(html);
            }
        });
    },   
    delete_review_admin: function (id) {
        $(".delete-review-button").attr('disabled', true);
        $.ajax({
            url: 'rest/deletereview/' + id,
            type: 'DELETE',
            beforeSend: function (xhr) {
                xhr.setRequestHeader('Authorization', localStorage.getItem('token'));
            },
            success: function () {
                $(".delete-review-button").attr('disabled', false);
                GameService.get_all_reviews_admin();
            }
        });
    }, 
    get_recent_user_activities: function(){
        $.ajax({
            url: 'rest/recentactivities',
            type: 'GET',
            beforeSend: function (xhr) {
                xhr.setRequestHeader('Authorization', localStorage.getItem('token'));
            },
            success: function (data) {
                $("#recent-user-activities").html("");
                var html = ``;
                if (data.length < 1) {
                    html = ``;
                    html += `<h2 class="text-center">No reviews</h2>`;
                }
                for (let i = 0; i < data.length; i++) {
                    html += `
                        <!-- single review start -->

                                <div class="d-flex text-muted pt-3">
                                <svg class="bd-placeholder-img flex-shrink-0 me-2 rounded" width="32" height="32" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Placeholder: 32x32" preserveAspectRatio="xMidYMid slice" focusable="false"><title>Placeholder</title><rect width="100%" height="100%" fill="#007bff"></rect><text x="50%" y="50%" fill="#007bff" dy=".3em">32x32</text></svg>
                        
                                <p class="pb-3 mb-0 small lh-sm border-bottom">
                                    <span class="d-block text-truncate"><strong class="text-gray-dark">@`+ data[i].username +`</strong> `+ parseInt(data[i].total_rating_by_post) +`/100 <span><i>Posted on: `+ data[i].created +` </i></span></span>
                                    
                                    `+ data[i].comment +`
                                </p>
                                </div>
 
                        <!-- single review end -->
                        `;

                }
                $("#recent-user-activities").html(html);
            }
        });
    },    
    // outdated
    get_comments: function (id) {
        $.get('rest/comments/' + id, function (data) {
            var html = "";
            for (let i = 0; i < data.length; i++) {
                html += `<div class="d-flex text-muted pt-3">                
                            <p class="text-break pb-3 mb-0 lh-sm border-bottom">
                                <strong class="d-block text-gray-dark">@`+ data[i].user_username + `</strong>
                                `+ data[i].description + `
                            </p>
                        </div>
                        `;
            }
            $("#game_comments").html(html);
        });
    },

    get_all_names: function () {
        $.get("rest/allnames", function (data) {
            var datalist_html = "";
            console.log(data);
            for (let i = 0; i < data.length; i++) {
                datalist_html += `<option value="` + data[i].name + `">`;
            }
            $("#datalist_game_list").html(datalist_html);
        });
    },

}