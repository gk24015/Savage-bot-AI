const express = require('express');
const app = express();
const apiai = require('apiai')('8acec332434947989510c58d31621d44');
const server = app.listen(process.env.PORT ||5000);
const io = require('socket.io')(server);
io.on('connection', function(socket){
  console.log('a user connected');
});



app.use(express.static(__dirname + '/views')); // html
app.use(express.static(__dirname + '/public')); // js, css, images
io.on('connection', function(socket) {
    socket.on('chat message', (text) => {
  
      // Get a reply from API.AI
  
      let apiaiReq = apiai.textRequest(text, {
        sessionId: "f6a501bfd9f340648076509e0bfc2e5d"
      });
  
      apiaiReq.on('response', (response) => {
        let aiText = response.result.fulfillment.speech;
        socket.emit('bot reply', aiText); // Send the result back to the browser!
      });
  
      apiaiReq.on('error', (error) => {
        console.log(error);
      });
  
      apiaiReq.end();
  
    });
  });
  
    

app.get('/', (req, res) => {
  res.sendFile('index.html');
});
