// importScripts('libs/plugins/mdtoast.min.js');


var url = window.location.href;
var swLocation = '/APPrende/public/sw.js';

console.log(url);
if(navigator.serviceWorker){
   if(url.includes('localhost') || url.includes('127.')) {
      navigator.serviceWorker.register('/sw.js');
   }
   else{
      navigator.serviceWorker.register(swLocation);
   }   
}

function isOnline(){
   if(navigator.onLine){
      mdtoast('Online',{
         interaction:true,
         interactionTimeout:1500,
         actionText: 'OK'
      });
   }else{
      
      mdtoast('Sin conexion a internet',{
         interaction:true,
         actionText: 'OK'
      });
   }
}
window.addEventListener('online',isOnline);
window.addEventListener('offline',isOnline);
isOnline();
