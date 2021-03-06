$(function () {
    var $getCategory = $('#getCategory');

    $.ajax({
        type: 'GET',
        url: 'http://localhost:8080/category',
        success: function (getCategory) {
            $.each(getCategory, function (i, categoryRow) {
                $getCategory.append(`<tr>
        <td id="val"> ${categoryRow.nom}</td>
        <td class="text-center py-0 align-middle">
            <div class="btn-group btn-group-sm">
                <a type="button" onclick="updateCategory('${categoryRow._id}')" class="btn btn-primary">Edite</a>
                <a type="button" onclick="deleteCategory('${categoryRow._id}')" class="btn btn-danger text-white">Delete</a>
            </div>
        </td></tr>`)
            });
        }
    });

})

// add new category 
$("#addCateg").click(function () {
    $("#formCateg").slideToggle("slow");
});

$('#add_categrie').on('click', function (e) {
    var $categoryName = $('#categorie_name');
    if ($categoryName.val() == "") {
        $categoryName.addClass('is-invalid');
        e.preventDefault();
    } else {
        $.post({
            method: 'POST',
            url: 'http://localhost:8080/category/add',
            data: {
                nom: $categoryName.val()
            },
            success: function () {
                location.reload();
            },
            timeout: 1000
        })
    }
});

// delete category
function deleteCategory(_id) {
    if (confirm('Are you sure ?')) {
    $.ajax({
        method: 'DELETE',
        url: 'http://localhost:8080/category/delete/' + _id,
        success: function () {

            location.reload();
        },
        timeout: 1000
    })
} }

// update category 
function updateCategory(_id) {
    var $nom = $('#categorie_name');
    $.ajax({
        method: 'PUT',
        url: 'http://localhost:8080/category/update/' + _id,
        data: {
            nom: $nom.val()
        },
        success: function (data) {

            location.reload();
        }
    })
}
