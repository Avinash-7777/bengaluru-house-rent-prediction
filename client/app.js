console.log("App JS Loaded");

function getBathValue() {
    var uiBathrooms = document.getElementsByName("uiBathrooms");
    for (var i = 0; i < uiBathrooms.length; i++) {
        if (uiBathrooms[i].checked) {
            return parseInt(uiBathrooms[i].value);
        }
    }
    return -1;
}

function getBHKValue() {
    var uiBHK = document.getElementsByName("uiBHK");
    for (var i = 0; i < uiBHK.length; i++) {
        if (uiBHK[i].checked) {
            return parseInt(uiBHK[i].value);
        }
    }
    return -1;
}

function onClickedEstimatePrice() {
    var sqft = document.getElementById("uiSqft").value;
    var bhk = getBHKValue();
    var bathrooms = getBathValue();
    var location = document.getElementById("uiLocations").value;
    var estPrice = document.getElementById("uiEstimatedPrice");

    var url = "http://127.0.0.1:5000/predict_home_price";
    $.post(url, {
        total_sqft: parseFloat(sqft),
        bhk: bhk,
        bath: bathrooms,
        location: location
    }, function (data, status) {
        estPrice.innerHTML = "<h2>" + data.estimated_price.toString() + " Lakh</h2>";
    });
}

function onPageLoad() {
    var url = "http://127.0.0.1:5000/get_location_names";
    $.get(url, function (data, status) {
        if (data) {
            var locations = data.locations;
            $('#uiLocations').empty();
            $('#uiLocations').append('<option value="" disabled selected>Choose a Location</option>');
            for (var i = 0; i < locations.length; i++) {
                var opt = new Option(locations[i], locations[i]);
                $('#uiLocations').append(opt);
            }
        }
    });
}

window.onload = onPageLoad;
