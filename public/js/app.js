var url = window.location.href;
var swLocation = '/APPrende/sw.js';

if(navigator.serviceWorker){
   if(url.includes('localhost') || url.includes('127.')) {
      navigator.serviceWorker.register('/sw.js');
   }
   else{
      navigator.serviceWorker.register(swLocation);
   }
   
}