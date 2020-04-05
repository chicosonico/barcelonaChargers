const mymap = L.map('issMap').setView([41.388326, 2.169696], 13);


const attribution =
  '&copy; <a href= "https://www.openstreetmap.org/copyright"> OpenSreetMap </a> contributors';

const tileUrl = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
const tiles = L.tileLayer(tileUrl, { attribution });
tiles.addTo(mymap);

var cvs = document.getElementById("canvas");
    ctx = cvs.getContext("2d");
    sA = (Math.PI / 180) * 45;
    sE = (Math.PI / 180) * 90;
    ca = canvas.width;
    ch = canvas.height;

function init(){     
    
    setInterval(function(){
        
       ctx.clearRect(0, 0, ca, ch);
       ctx.lineWidth = 15;
      
       ctx.beginPath();
       ctx.strokeStyle = "#ffffff";     
       ctx.shadowColor = "#eeeeee";
       ctx.shadowOffsetX = 2;
       ctx.shadowOffsetY = 2;
       ctx.shadowBlur = 5;
       ctx.arc(50, 50, 25, 0, 360, false);
       ctx.stroke();
       ctx.closePath();
        
       sE += 0.05; 
       sA += 0.05;
                
       ctx.beginPath();
       ctx.strokeStyle = "#aaaaaa";
       ctx.arc(50, 50, 25, sA, sE, false);
       ctx.stroke();
       ctx.closePath();   
        
    }, 6);
    
}

init();



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
    var barContent = document.getElementById("progress");
    barContent.style.display = "none";
   
   

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
