function bhk_value(){
    var bhk = document.getElementsByName('bhk');
    for(var i in bhk){
        if(bhk[i].checked){
            return parseInt(i)+1;
        }
    }
    return -1;
}

function bath_value(){
    var bath = document.getElementsByName('bath');
    for(var i in bath){
        if(bath[i].checked){
            return parseInt(i)+1;
        }
    }
    return -1;
}

function estimate_price() {
    bhk_val = bhk_value();
    bath_val = bath_value();
    area_val = document.getElementById('sqft');
    loc_val = document.getElementsByName('location')[0].value;

    var price = document.getElementById('price');

    var url = "http://127.0.0.1:5000/predict_home_price";

    $.post(url, {
        total_sqft: parseFloat(area_val.value),
        location: loc_val,
        bhk: bhk_val,
        bath: bath_val
    },
    function(data, status){
        console.log(data.estimated_price);
        price.innerHTML = data.estimated_price.toString() + " Lakh";
        console.log(status);
    });
}

function onPageLoad() {
    console.log("Document Loaded");
    var url = "http://127.0.0.1:5000/get_location_names";
    $.get(url, function(data, status) {
        console.log("Got response for get_location_names request");
        if(data){
            var locations = data.locations;
            var loc = document.getElementById('loc');
            $('#loc').empty();
            for(var idx in locations) {
                var option = new Option(locations[idx]);
                $('#loc').append(option);
            }
        }
    });
}

window.onload = onPageLoad;