var CategoryService = {
    init: function(){
        $('#addCategoryForm').validate({
            submitHandler: function (form) {
                var entity = Object.fromEntries((new FormData(form)).entries());
                console.log(entity);
                CategoryService.add(entity);
            }
        });
        $('#editCategoryForm').validate({
            submitHandler: function (form) {
                var entity = Object.fromEntries((new FormData(form)).entries());
                console.log(entity);
                CategoryService.update(entity);
            }
        });
    },

    /*###### ADMIN PANEL #####*/
    get_all_categories_admin: function () {
        $.ajax({
            url: "rest/categories",
            type: "GET",
            beforeSend: function (xhr) {
                xhr.setRequestHeader('Authorization', localStorage.getItem('token'));
            },
            success: function (data) {
                $("#category-dashboard").html("");
                var categoryBodyHtml = "";
                for (let i = 0; i < data.length; i++) {
                    categoryBodyHtml += `
                                        <tr>
                                            <<td class="text-start">`+ data[i].id + `</td>
                                            <td class="text-start">`+ data[i].name + `</td>                                                                     
                                            <td class="text-start" scope="col">
                                                <button class="btn btn-outline-warning btn-sm edit-category-button" onclick="CategoryService.get_admin(`+ data[i].id + `)">
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pencil-fill" viewBox="0 0 16 16">
                                                        <path d="M12.854.146a.5.5 0 0 0-.707 0L10.5 1.793 14.207 5.5l1.647-1.646a.5.5 0 0 0 0-.708l-3-3zm.646 6.061L9.793 2.5 3.293 9H3.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.207l6.5-6.5zm-7.468 7.468A.5.5 0 0 1 6 13.5V13h-.5a.5.5 0 0 1-.5-.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.5-.5V10h-.5a.499.499 0 0 1-.175-.032l-.179.178a.5.5 0 0 0-.11.168l-2 5a.5.5 0 0 0 .65.65l5-2a.5.5 0 0 0 .168-.11l.178-.178z"/>
                                                    </svg>
                                                </button>
                                            
                                                <button class="btn btn-outline-danger btn-sm delete-category-button" onclick="CategoryService.delete(`+ data[i].id + `)">
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash-fill" viewBox="0 0 16 16">
                                                        <path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1H2.5zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zM8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5zm3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0z"/>
                                                    </svg>
                                                </button>
                                            </td>
                                        </tr>
                                        `;
                }
                $("#category-dashboard").html(categoryBodyHtml);
            }
        });
    },
    get_admin: function (id) {
        $(".edit-game-button").attr('disabled', true);

        $.ajax({
            url: 'rest/categories/' + id,
            type: "GET",
            beforeSend: function (xhr) {
                xhr.setRequestHeader('Authorization', localStorage.getItem('token'));
            },
            success: function (data) {
                $('#editCategoryForm input[name="id"]').val(data.id);
                $('#editCategoryForm input[name="name"]').val(data.name);

                $(".edit-game-button").attr('disabled', false);
                $('#editCategoryModal').modal("show");
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
            url: 'rest/categories/' + $('#editCategoryForm input[name="id"]').val(),
            type: 'PUT',
            beforeSend: function (xhr) {
                xhr.setRequestHeader('Authorization', localStorage.getItem('token'));
            },
            data: JSON.stringify(entity),
            dataType: 'json',
            contentType: 'application/json',
            success: function (result) {
                $("#editCategoryModal").modal("hide");
                $(".save-changes-button").attr('disabled', false);
                $("#category-dashboard").html("");

                CategoryService.get_all_categories_admin();
            }
        });
    },

    add: function (entity) {
        $.ajax({
            url: 'rest/categories',
            type: 'POST',
            beforeSend: function (xhr) {
                xhr.setRequestHeader('Authorization', localStorage.getItem('token'));
            },
            data: JSON.stringify(entity),
            contentType: "application/json",
            dataType: "json",
            success: function (result) {
                $("#addNewCategoryModal").modal('hide');
                $("#category-dashboard").html("");
                CategoryService.get_all_categories_admin();
                CategoryService.init();
            }
        });
    },

    delete: function (id) {
        $(".delete-category-button").attr('disabled', true);
        $.ajax({
            url: 'rest/categories/' + id,
            type: 'DELETE',
            beforeSend: function (xhr) {
                xhr.setRequestHeader('Authorization', localStorage.getItem('token'));
            },
            success: function () {
                $(".delete-game-button").attr('disabled', false);
                $("#category-dashboard").html("");

                CategoryService.get_all_categories_admin();
            }
        });
    },
}