var url = window.location.href;
var swLocation = '/APPrende/public/sw.js';

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
      
   }else{
      
   }
}
window.addEventListener('online',isOnline);
window.addEventListener('offline',isOnline);
isOnline();
