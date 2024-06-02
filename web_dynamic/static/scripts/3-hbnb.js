$(document).ready(function() {
    let selectedAmenities = {};

    $(document).on('change', "input[type='checkbox']", function () {
        if (this.checked) {
            selectedAmenities[$(this).data('id')] = $(this).data('name');
        } else {
            delete selectedAmenities[$(this).data('id')];
        }

        let amenitiesList = Object.values(selectedAmenities);
        if (amenitiesList.length > 0) {
            $('div.amenities > h4').text(amenitiesList.join(', '));
        } else {
            $('div.amenities > h4').html('&nbsp;');
        }
    });

    $.get('http://0.0.0.0:5001/api/v1/status/', function (data, textStatus) {
        if (textStatus === 'success') {
            if (data.status === 'OK') {
                $('#api_status').addClass('available');
            } else {
                $('#api_status').removeClass('available');
            }
        }
    });

    $.ajax({
        type: 'POST',
        url: 'http://0.0.0.0:5001/api/v1/places_search/',
        contentType: 'application/json',
        data: '{}',
        success: function (data) {
            for (let i = 0; i < data.length; i++) {
                $('.places').append(
                    '<article>' +
                    '<div class="title">' +
                    '<h2>' + data[i].name + '</h2>' +
                    '<div class="price_by_night">' + data[i].price_by_night + '</div>' +
                    '</div>' +
                    '<div class="information">' +
                    '<div class="max_guest">' + data[i].max_guest + ' Guest(s)</div>' +
                    '<div class="number_rooms">' + data[i].number_rooms + ' Bedroom(s)</div>' +
                    '<div class="number_bathrooms">' + data[i].number_bathrooms + ' Bathroom(s)</div>' +
                    '</div>' +
                    '<div class="description">' + data[i].description + '</div>' +
                    '</article>'
                );
            }
        }
    });
});
