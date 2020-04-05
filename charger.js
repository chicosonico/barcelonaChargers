const mymap = L.map('issMap').setView([41.388326, 2.169696], 13);


const attribution =
  '&copy; <a href= "https://www.openstreetmap.org/copyright"> OpenSreetMap </a> contributors';

const tileUrl = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
const tiles = L.tileLayer(tileUrl, { attribution });
tiles.addTo(mymap);



 fetch('https://api.bsmsa.eu/ext/api/bsm/chargepoints/chargepoints_states')
  .then(function (response) {
    return response.json();
    
    
  })
  .then(function (myJson) {
    console.log(myJson);
    var hash = {};
   array = myJson.filter(function(current) {
  var exists = !hash[current.Station_id] || false;
  hash[current.Station_id] = true;
  return exists;
});

      console.log(JSON.stringify(array));
    
    for (i=1; i< array.length; i++){
      const { Station_name, Station_address, Station_lat, Station_lng } = array[i];
      var content = "<p><b>" + Station_name + "</b></p>" + "<p>" + Station_address + "</p>";
      marker = L.marker([Station_lat, Station_lng], { icon: greenIcon }).bindPopup(content).addTo(mymap).openPopup();
    }

    var barContent = document.getElementById("barView");
    barContent.style.visibility = "hidden";
   
  

  })
  .catch(error => {
    console.log('error!');
    console.log(error);
  });




// function logArrayElements(element) {
//   const { Station_name, Station_address, Station_lat, Station_lng } = element;
//   console.log(Station_name);
//   console.log(Station_address);
//   console.log(Station_lat);
//   console.log(Station_lng); 

//   return Station_name, Station_address, Station_lat, Station_lng;

  




var greenIcon = new L.Icon({
  iconUrl: 'https://cdn.rawgit.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-green.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});
