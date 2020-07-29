self.addEventListener('fetch', event =>{
    const resp=fetch(event.request)
                .then(res=>res); //estamos haciendo cualquier cosa que haga una peticion a traves del sw
                   
    event.respondWith(resp );
});