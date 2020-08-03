const CACHE_STATIC_NAME = 'static-v2';
const CACHE_DYNAMIC_NAME = 'dynamic-v1';
const CACHE_INMUTABLE_NAME = 'inmutable-v1';

const CACHE_STATIC_FILE =[
                            // '/',
                            'index.html',
                            'img/favicon.ico',
                            'css/style.css',
                            'img/kid.png',
                            'img/fondoApp.jpg',
                            'pages/curso.html',
                            'pages/estudiante.html',
                            'pages/materias.html',
                            'img/icons/icon-72x72.png',
                            'img/icons/icon-96x96.png',
                            'img/icons/icon-128x128.png',
                            'img/icons/icon-152x152.png',
                            'img/icons/icon-512x512.png',
                            'js/app.js',
                            'pages/calendario.html',
                            'pages/calificaciones.html',
                            'pages/perfil1.html',
                            'pages/tarea.html',
                            'manifest.json',
                            'pages/404.html',
                            '/js/libs/plugins/mdtoast.min.css',
                            '/js/libs/plugins/mdtoast.min.js'
                        ];
const CACHE_DYNAMIC_FILE = [
                                'https://stackpath.bootstrapcdn.com/bootstrap/4.5.0/css/bootstrap.min.css',
                                'https://code.jquery.com/jquery-3.5.1.slim.min.js',
                                'https://cdn.jsdelivr.net/npm/popper.js@1.16.0/dist/umd/popper.min.js',
                                'https://stackpath.bootstrapcdn.com/bootstrap/4.5.0/js/bootstrap.min.js',
                                'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.12.0-2/js/all.min.js',
                                'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.12.0-2/css/all.min.css'
                            ];

self.addEventListener('install', event =>{
    //Aqui se almacenan los datos en las caches estaticas e inmutables
    const cacheStatic = caches.open(CACHE_STATIC_NAME)
                            .then(cache =>{
                                return cache.addAll(CACHE_STATIC_FILE); 
                            });
    const cacheInmutable = caches.open(CACHE_INMUTABLE_NAME)
                            .then(cache =>{
                                return cache.addAll(CACHE_DYNAMIC_FILE);
                            });                            
    event.waitUntil(Promise.all([cacheStatic]));
});
                        
self.addEventListener('activate', event =>{
    //Para borrar cache vieja
    const deleteRes =caches.keys()
    .then(keys=>{
        keys.forEach(key=>{
            if(key!==CACHE_STATIC_NAME&&key.includes('static')){
                return caches.delete(key);
            }else if(key!==CACHE_STATIC_NAME&&key.includes('dynamic')){
                return caches.delete(key);
            }
        });
    });

    event.waitUntil(deleteRes);
});

self.addEventListener('fetch',event=>{
    //Aqui se aplican las estrategias del cache
    const resCache=caches.match(event.request)
    .then(res =>{
        if(res) return res;
        //No existe, tengo que ir a la web
        console.log('No existe', event.request.url);
        return fetch(event.request)
                .then(newRes =>{
                    caches.open(CACHE_DYNAMIC_NAME)
                    .then(cache =>{
                        // cache.add(newRes);
                        cache.put(event.request,newRes);
                    });
                    //Debemos clonarlo para usarlo varias veces
                    return newRes.clone();
                }).catch(error=>{
                    if(event.request.headers.get('accept').includes('text/html')){
                       return caches.match('/pages/404.html'); 
                    }
                });
    });
    event.respondWith(resCache);
});
//ESTA PARTE AUN NO ESTA FUNCIONANDO
//SYNC: Cuando recuperamos la conexion a internet
self.addEventListener('sync',event=>{
    console.log('Recuperamos conexion');
    console.log(event);
    console.log(event.tag); 
});
                    //PUSH: Manejar las push notifications

self.addEventListener('push',event=>{
    console.log('Notificancion recibida');
});