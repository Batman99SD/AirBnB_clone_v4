$(document).ready(function() {
    let selectedAmenities = {};

    $(document).on('change', "input[type='checkbox']", function () {
        if (this.checked) {
            selectedAmenities[$(this).data('id')] = $(this).data('name');
        } else {
            delete selectedAmenities[$(this).data('id')];
        }

        let amenitiesList = Object.values(selectedAmenities);
        if (amenitiesList > 0) {
            $('div.amenities > h4').text(Object.values(selectedAmenities).join(', '));
        } else {
            $('div.amenities > h4').html('&nbsp;');
        }
    });
});
