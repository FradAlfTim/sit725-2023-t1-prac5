// add cards to web
const addCards = (items) => {
    items.forEach(item => {
        let itemToAppend = '<div class="col s4 center-align">' +
            '<div class="card medium"><div class="card-image waves-effect waves-block waves-light"><img class="activator" src="' + item.image + '">' +
            '</div><div class="card-content">' +
            '<span class="card-title activator grey-text text-darken-4">' + item.title + '<i class="material-icons right">more_vert</i></span><p><a href="#">' + item.link + 
            '</a></p></div>' + '<div class="card-reveal">' +
            '<span class="card-title grey-text text-darken-4">' + item.title + '<i class="material-icons right">close</i></span>' +
            '<p class="card-text"><span style="color: black;">' + item.desciption + '</span></p>' +
            '</div></div></div>';
        $("#card-section").append(itemToAppend);
    });
}

// get form data from web and add data to db
const submitForm = () => {
    let formData = {};
    formData.title = $('#title').val();
    formData.image = $('#image').val();
    formData.link = $('#link').val();
    formData.desciption = $('#desciption').val();

    console.log("Form Data Submitted: ", formData);
    addDuck(formData);
}

// sending request to '/api/ducks'
const getDucks = () => {
    $.get('/api/ducks',(response) => {
        if(response.statusCode === 200){
            addCards(response.data);
        }
    });
}

const addDuck = (duck) => {
    $.ajax({
        url: 'api/ducks',
        type: 'POST',
        data: duck,
        success: (result) => {
            alert(result.message);
            location.reload();
        }
    });
}

$(document).ready(function () {
    $('.materialboxed').materialbox();
    $('#formSubmit').click(() => {
        submitForm();
    });

    getDucks();
    
    $('.modal').modal()
});
