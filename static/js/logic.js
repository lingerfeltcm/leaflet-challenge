//Storing API URL
let url = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_month.geojson";

//Request for data
d3.json(url).then(function(earthquakeData){
    console.log(earthquakeData);
    createFeatures(earthquakeData.features);
});
function markerSize(magnitude) {
    if (magnitude <= 1) return 5;
    else if (magnitude > 1 & magnitude <= 2) return 10;
    else if (magnitude > 2 & magnitude <= 3) return 15;
    else if (magnitude > 3 & magnitude <= 4) return 20;
    else if (magnitude > 4 & magnitude <= 5) return 25;
    else if (magnitude > 5 & magnitude <= 6) return 30;
    else if (magnitude > 6 & magnitude <= 7) return 35;
    else if (magnitude > 7 & magnitude <= 8) return 40;
    else return 45;
};
//creating function to determine earthquake depth
function color(depth){
    if (depth <= 50) return "darkred";
    else if (depth <= 100) return "red";
    else if (depth <= 150) return "orange";
    else if (depth <= 200) return "yellow";
    else if (depth <= 250) return "darkgreen";
    else return "lightgreen";
};
// Creating Features for the Map
function createFeatures(earthquakeData){
    //Creating Pop-ups with Discriptions and Data
    function onEachFeature(feature, layer) {
        layer.bindPopup('<h3>Earthquake Location: ${feature.properties.place}</h3><hr><p>Earthquake Date: ${new Date(feature.properties.time)}</p><p>Earthquake Magnitude: ${feature.properties.mag}</p><p>Earthquake Depth(km): ${feature.geometry.coordinates[2]}</p></hr>');
    };
    
    let earthquakes=L.geoJSON(earthquakeData, {
        onEachFeature: onEachFeature,
        pointToLayer: function(feature, latlng) {

            var earthquakeMarkers = {
                radius: markerSize(feature.properties.mag),
                fillColor: color(feature.geometry.coordinates[2]),
                weight: 1,
                opacity: 1,
                fillOpacity: 0.7
            };
            return L.circle(latlng, earthquakeMarkers)
        }
    });

    //send info to create maps
    createMap(earthquakes);
};
//creating map
function createMap(earthquakes) {
    let streetMap = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png');
    let topography = L.tileLayer('https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png');
    let earthquake = L.layerGroup(earthquakes);
    let baseMap = {"Street Map": streetMap, "Topographic Map": topography};
    let overlay = {Earthquakes: earthquakes};
    let myMap = L.map("map", {center: [-104.858,36.912], zoom: 2.0, layers: [streetMap, earthquakes]});
    let mapLegend = L.control({position:"bottomleft"});
        mapLegend.onAdd = function() {let div = L.DomUtil.create("div", "info legend")
        let depth = [50, 100, 150, 200, 250]};
        let labels = [];
        div.innerHTML += "<h3 style = 'text-align: center'> Depth</h3>"
        for(var i = 0; i < depth.length; i++) {
            div. innerHTML += '<i style = "background color:' + markerColour(depth[i]+1) + '>&nbsp&nbsp&nbsp&nbsp</i> ' + depth[i] + (depth[i + 1] ? '&ndash;' + depth[i + 1] + '<br>' : '+');
        }
        return div;
    mapLegend.addTo(myMap);
    L.control.layers(basemaps, overlay, {collapsed: false}).addTo(myMap);
}
