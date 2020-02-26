const FORM_VALIDATOR = require("./FormValidator");

const ORIGIN_POINT = new google.maps.LatLng(50.464379, 30.519131);

const $map = document.getElementById("google-map");
let map;
let geocoder = new google.maps.Geocoder();
let directionService = new google.maps.DirectionsService();
let directionsRenderer = new google.maps.DirectionsRenderer();
let destinationMarker;

function initializeMap() {
    let mapProp = {
        center: ORIGIN_POINT,
        zoom: 11
    };
    map = new google.maps.Map($map, mapProp);
    drawOriginMarker();
    google.maps.event.addListener(map, "click", getAddressOfClick);
}

function resetMap() {
    if (destinationMarker) {
        destinationMarker.setMap(null);
        directionsRenderer.setMap(null);
    }
}

function drawOriginMarker() {
    let marker = new google.maps.Marker({
        position: ORIGIN_POINT,
        map: map,
        icon: "assets/images/home-icon.png"
    });
}

function getAddressOfClick(click) {
    resetMap();
    var destinationPoint = click.latLng;
    geocodeLatLng(destinationPoint, function(err, address) {
        if (!err) {
            $("#address-input").val(address);
            drawDestinationMarker(destinationPoint);
            findRoute(destinationPoint, FORM_VALIDATOR.validateAddress);
        } else FORM_VALIDATOR.validateAddress(err);
    });
}

function geocodeLatLng(latlng, callback) {
    var geocoder = new google.maps.Geocoder();
    geocoder.geocode({ location: latlng }, function(results, status) {
        if (status === google.maps.GeocoderStatus.OK && results[1]) {
            var adress = results[1].formatted_address;
            callback(null, adress);
        } else {
            callback("Вкажіть коректну адресу.");
        }
    });
}

function geocodeAddress(address, callback) {
    resetMap();
    geocoder.geocode({ address: address }, function(results, status) {
        if (status === google.maps.GeocoderStatus.OK && results[0]) {
            let destinationPoint = results[0].geometry.location;
            drawDestinationMarker(destinationPoint);
            findRoute(destinationPoint, callback);
        } else callback("Вкажіть коректну адресу.");
    });
}

function drawDestinationMarker(destinationPoint) {
    destinationMarker = new google.maps.Marker({
        position: destinationPoint,
        map: map,
        icon: "assets/images/map-icon.png"
    });
}

function findRoute(destinationPoint, callback) {
    let route = {
        origin: ORIGIN_POINT,
        destination: destinationPoint,
        travelMode: google.maps.TravelMode["DRIVING"]
    };
    directionService.route(route, function(response, status) {
        if (status == google.maps.DirectionsStatus.OK) {
            let leg = response.routes[0].legs[0];
            drawRoute(response);
            callback(null, leg.duration.text);
        } else callback("Не змогли знайти шлях... Вкажіть іншу адресу.");
    });
}

function drawRoute(route) {
    directionsRenderer.setMap(map);
    directionsRenderer.setOptions({ suppressMarkers: true });
    directionsRenderer.setDirections(route);
}

exports.initializeMap = initializeMap;
exports.processAddress = geocodeAddress;
