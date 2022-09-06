var OfferService = {   
    init: function(){
        $('#addOfferForm').validate({
            submitHandler: function(form) {
              var offer = Object.fromEntries((new FormData(form)).entries());
             
              OfferService.add(offer);
            }
        });
        $('#editOfferForm').validate({
            submitHandler: function(form) {
              var offer = Object.fromEntries((new FormData(form)).entries());
    
              OfferService.update(offer);
            }
        });
        
        OfferService.get_all_offers_admin();
    },

    get_all_offers_client: function(){
        $.ajax({
            url: "rest/offers",
            type: "GET",
            success: function(data) {
                $("#offerBody").html("");
                var offerBodyHtml = "";
                for (let i = 0; i < data.length; i++) {
                    if(data[i].is_active === 1){
                        offerBodyHtml +=`
                            <div class="col-sm-6 col-md-6 col-lg-4 col-xl-4 mb-2">
                                <div class="item">
                                    <h4>`+data[i].game_name+`</h4>
                                    <p>For our members only `+data[i].price+`</p>
                                    <a href="">Buy on `+data[i].link+`</a>
                                </div>
                            </div>
                        `;
                    }
                }
                $("#offerHeader").html('<h2>Special Offers From Our Partners</h2>');
                $("#offerBody").html(offerBodyHtml);

                if(data.length === 0){
                    $("#offerHeader").html('<h2>Currently there are no special offers from our partners</h2>');
                }
            }
        });
    },

    /*### ADMIN PANEL ###*/ 

    get_all_offers_admin: function(){
        $.ajax({
            url: "rest/offers",
            type: "GET",
            beforeSend: function(xhr){
                xhr.setRequestHeader('Authorization', localStorage.getItem('token'));
            },
            success: function(data) {
                $("#offers-dashboard").html("");
                var offerBodyHtml = "";
                for (let i = 0; i < data.length; i++) {
                        offerBodyHtml +=`
                                        <tr>
                                            <td class="text-start">`+data[i].game_name+`</td>
                                            <td class="text-start">`+data[i].partner_name+`</td>
                                            <td class="text-start">`+data[i].link+`</td>
                                            <td class="text-start">`+data[i].price+`</td>                         
                                            <td class="text-start">`+data[i].is_active+`</td>
                                            <td class="text-start" scope="col">
                                                <button class="btn btn-outline-warning btn-sm edit-game-button" onclick="OfferService.get_admin(`+data[i].id+`)">
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pencil-fill" viewBox="0 0 16 16">
                                                        <path d="M12.854.146a.5.5 0 0 0-.707 0L10.5 1.793 14.207 5.5l1.647-1.646a.5.5 0 0 0 0-.708l-3-3zm.646 6.061L9.793 2.5 3.293 9H3.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.207l6.5-6.5zm-7.468 7.468A.5.5 0 0 1 6 13.5V13h-.5a.5.5 0 0 1-.5-.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.5-.5V10h-.5a.499.499 0 0 1-.175-.032l-.179.178a.5.5 0 0 0-.11.168l-2 5a.5.5 0 0 0 .65.65l5-2a.5.5 0 0 0 .168-.11l.178-.178z"/>
                                                    </svg>
                                                </button>
                                            
                                                <button class="btn btn-outline-danger btn-sm delete-game-button" onclick="OfferService.delete(`+data[i].id+`)">
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash-fill" viewBox="0 0 16 16">
                                                        <path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1H2.5zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zM8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5zm3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0z"/>
                                                    </svg>
                                                </button>
                                            </td>
                                        </tr>
                                        `;                    
                }
                $("#offers-dashboard").html(offerBodyHtml);                
            }
        });
    },

    get_admin: function(id){
        $(".edit-offer-button").attr('disabled', true);
        
        $.ajax({
            url: 'rest/offers/'+id,
            type: "GET",
            beforeSend: function(xhr){
                xhr.setRequestHeader('Authorization', localStorage.getItem('token'));
            },
            success: function(data) {
              $('#editOfferForm input[name="id"]').val(data.id);
              $('#editOfferForm input[name="link"]').val(data.link);

              $('#editOfferForm input[name="game_name"]').val(data.game_name);
              $('#editOfferForm input[name="partner_name"]').val(data.partner_name);
              $('#editOfferForm input[name="price"]').val(data.price);
              $('#editOfferForm input[name="is_active"]').val(data.is_active);              
            
              $(".edit-offer-button").attr('disabled', false);
              $('#editOfferModal').modal("show");
            }
        });
      },

    get_offer_by_id: function(data){},
    
    add: function(offer){
        $.ajax({
            url: 'rest/offers',
            type: 'POST',
            beforeSend: function(xhr){
                xhr.setRequestHeader('Authorization', localStorage.getItem('token'));
            },
            data: JSON.stringify(offer),
            contentType: "application/json",
            dataType: "json",
            success: function(result) {
              $("#addNewOfferModal").modal('hide');
              $("#offers-dashboard").html('');
              OfferService.init();
            }
          });
    },

    update: function(offer){
        $('.save-offer-button').attr('disabled', true);
        
        // var offer = {
        //     id: $('#editOfferForm input[name="id"]').val(),
        //     link: $('#editOfferForm input[name="link"]').val(),
        //     game_name: $('#editOfferForm input[name="game_name"]').val(),
        //     partner_name: $('#editOfferForm input[name="partner_name"]').val(),
        //     price: $('#editOfferForm input[name="price"]').val(),
        //     is_active: $('#editOfferForm input[name="is_active"]').val(),
        //   };        

        $.ajax({
        url: 'rest/offers/' + $('#editOfferForm input[name="id"]').val(),
        type: 'PUT',
        beforeSend: function(xhr){
            xhr.setRequestHeader('Authorization', localStorage.getItem('token'));
        },
        data: JSON.stringify(offer),
        contentType: "application/json",
        dataType: "json",
        success: function(result) {
            $("#editOfferModal").modal("hide");
            $(".save-offer-button").attr('disabled', false);
            $("#offer-list").html("");

            OfferService.get_all_offers_admin();
        }
        });
    },

    delete: function(id){
        $('.delete-offer-button').attr('disabled', true);
        $.ajax({
        url: 'rest/offers/'+id,
        type: 'DELETE',
        beforeSend: function(xhr){
            xhr.setRequestHeader('Authorization', localStorage.getItem('token'));
        },
        success: function() {
            $('.delete-offer-button').attr('disabled', false);
            $("#offer-list").html("");

            OfferService.get_all_offers_admin();
        }
        });
    },
    
}




