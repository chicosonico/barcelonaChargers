const  mymap = L.map('issMap').setView([41.388326, 2.169696], 12);
const marker = L.marker([0, 0]).addTo(mymap);

const attribution =
'&copy; <a href= "https://www.openstreetmap.org/copyright"> OpenSreetMap </a> contributors';

const tileUrl = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
const tiles = L.tileLayer(tileUrl, {attribution});
tiles.addTo(mymap);


fetch('https://api.bsmsa.eu/ext/api/bsm/chargepoints/chargepoints_states')
  .then(function(response) {
    return response.json();
  })
  .then(function(myJson) {
    console.log(myJson);
    myJson.forEach(logArrayElements);
  });
  

     function logArrayElements(element, index, array) {
        const {Station_name, Station_address, Station_lat, Station_lng} = element;
        console.log(Station_name);
        console.log(Station_address);
        console.log(Station_lat);
        console.log(Station_lng); 
    }
  

