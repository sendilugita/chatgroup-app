const 
	express = require('express'),
	app = express(),
	port = 8000,
	http = require('http'),
	path = require('path'),
	{ Server } = require('socket.io')
	
app.use(express.static(path.join(__dirname,'../public')))
	
app.get('/', (req,res) => {
	res.sendFile(path.join(__dirname,'/views/home.html'))
})

const server = http.createServer(app)
const io = new Server(server, {
	connectionStateRecovery: {},
	pingTimeout: 60000
})
require('./handlers/socket')(io)

server.listen(port, () => {
	console.log('listen...')
})
server.timeout = 3000