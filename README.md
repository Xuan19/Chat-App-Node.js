# chat-app-node.js

### Live demo : https://xuanwang-chat-app-node.herokuapp.com/

#### Hosting Server: Heroku
### Stack: 
- socket.io,
- express

## Features
###### Server side
Using both express and socket when creating node server, which need to create a server ouside of the express library by using the HTTP core module *const app = express()
const server = http.createServer(app)*, because the function socketio returned by requring the library socket.io expects to be called by a raw http server. the value returned by socketio(server) is common named io -> *io = socketio(server)*, then we can serve *io.on('event name', callback())* as an event lisener, passing the 'connection' event means the connection is going to fire whenever the server get a new connection, *io.on('connection', (socket) => {console.log('New WebSocket connection') socket.emit('event name')}) , the socket is an object that constains information about the connection, socket.emit('event name', data) is for sending some data back to the newly connected client

###### Client side
Load the client side of socket library: *<script src="/socket.io/socket.io.js"></script>* (this script doesn't exist in the public directory, it is served up because the server is configured with socket IO), which give access of *io()* in the client side javasricpt in order to connect to the server, and the value received by calling io() could be named socket, then use socket.on('event name', callback(data)) to receive the data sent from socket.emit() on server.
 
###### Notes
- *socket.on* works as an event lisener and will be fired by socket.emit of the other side, just make sure that event's name be coherent. 
- The connection on the client side *io()* gives the first move.  
- *soket.emit()* is for the specific connection, while io.emit() is for evevery single connection, sending data to every connected client. 
- *socket.broadcast.emit()* will send data to every connected client except this particular socket
- use that geolocation API to fetch the user's locationo: *navigator.geolocation.getCurrentPosition(callback(position))*
- use acknowledgement to inform if the other side has processed the event. If the client is omitting the event, that means the server is receiving it and the server could send   an acknowledgement back. Add a third argument to *soket.emit('event name', data, callback)*, the callback will run when the event is acknowledged. Add a callback2 function as the seconde argument to the callback in the *socket.on('event name', callback(data, callback2('message')))*. Acknowledgement could be used for validation like filtering the profane language (npm module -> bad-words)



## Important concepts
**Websockets**is a communication protocol which provides a full-duplex and low-latency channel between the server and the browser.There is a persistent connection between the client and server. Unlike HTTP requests, it is always the client'job to initalte the request to the server.

**Socket.IO** is a library that enables real-time, bidirectional and event-based communication between the browser and the server. It consists of: ***a Node.js server*** and ***a Javascript client library*** for the browser (which can be also run from Node.js).

### Difference between Websockets and Socket.IO
Socket.IO client is like a "slight" wrapper around the WebSocket API,provides additional features over a plain WebSocket object. **Socket.IO is NOT a WebSocket implementation**.Although Socket.IO indeed uses WebSocket as a transport when possible, it adds additional metadata to each packet. That is why a WebSocket client will not be able to successfully connect to a Socket.IO server, and a Socket.IO client will not be able to connect to a plain WebSocket server either.**Socket.IO is not meant to be used in a background service, for mobile applications.** The Socket.IO library keeps an open TCP connection to the server, which may result in a high battery drain for your users. Please use a dedicated messaging platform like FCM for this use case.

- using Socket.IO is significantly easier than using WebSocket which doesn't seem to be the case.
- The second misconception is that WebSocket is not widely supported in the browsers.
- Socket.IO downgrades the connection as a fallback on older browsers. It actually assumes that the browser is old and starts an AJAX connection to the server, that gets later upgraded on browsers supporting WebSocket, after some traffic is exchanged. See below for details
