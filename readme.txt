Desafio Logs y Profiling
-------------------------
1. En ecommerceCoderhouse ejecutar "npm install"
2. En ecommerceCoderhouse/server ejecutar "npm install"
3. Probar logueo en los archivos y consola:
Ejemplo de error: 
http://localhost:8080/api/randoms?cant=x
Ejemplo de warning:
http://localhost:8080/api/randomsxxxxx
Ejemplo de info: 
http://localhost:8080/api/randoms?cant=10

4. Si no se tiene instalado Artillery de forma global: sudo npm install -g artillery
5.Abrir dos terminales y ejecutar en cada una:
node --prof server.js
artillery quick -c 50 -n 20 "http://localhost:8080/info" > artillery-nodebug.log
6. Detener el servidor una vez termine artillery
En  artillery-nodebug.log, summary report se ven las 50 conexiones y 20 requests (1000 requests) con un tiempo maximo de 11 ms
max: ......................................................................... 11
7. Renombrar el archivo de profiling encriptado a info-v8.log y ejecutar para desencriptarlo:
node --prof-process info-v8.log > info-v8.txt
En info-v8.txt, summary, se ve una duracion de 91 ticks
91    6.4%          Shared libraries
8. Si no se tiene instalado 0x de forma global: sudo npm install -g 0x
9. Modificar package.json reemplazando:
 "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "start": "node server.js"
  },
por:
 "scripts": {
    "test": "node benchmarks.js",
    "start": "0x server.js"
  },
7. El archivo benchmarks.js ya está configurado adecuadamente 100 conexiones de 20 segundos
8. Abrir dos consolas:
En una ejecutar: npm start
En la otra consola: npm test
9. Parar el servidor (npm start)
Por alguna razon no me crea el archivo html con el grafico para analizar los bloqueos.





================
1. En ecommerceCoderhouse ejecutar "npm install"
2. En ecommerceCoderhouse/server ejecutar "npm install"
3. Configura nginx de forma similar al nginx.conf que se brinda aqui (upstreams, location, y el puerto listen del server nginx 7979)
3. En ecommerceCoderhouse ejecutar

pm2 start server/server.js --name="cluster"  --watch -i max -- --PORT=8081
pm2 start server/server.js --name="fork1"  --watch -- --PORT=8082
pm2 start server/server.js --name="fork2"  --watch -- --PORT=8083
pm2 start server/server.js --name="fork3"  --watch -- --PORT=8084
pm2 start server/server.js --name="fork4" --watch -- --PORT=8085
Realizar las pruebas: http://localhost:7979/info tres veces y ver que los pids asignados corresponden al modo cluster
Realizar las pruebas: http://localhost:7979/api/randoms cinco veces y ver que los pids asignados corresponden al modo fork en modo round robin (rotacion circular)
pm2 stop all
pm2 delete all
