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
