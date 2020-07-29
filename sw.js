self.addEventListener('fetch', event =>{
    const resp=fetch(event.request)
                .then(resp=>resp.ok ? resp : fetch('img/kid.jpg'));
            
    event.respondWith(resp );
});