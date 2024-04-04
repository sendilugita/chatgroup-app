const fs = require('fs')
const path = require('path')
const file = path.join(__dirname,'../../temp/chat.json')

module.exports = (io) => {
	let data = JSON.parse(fs.readFileSync(file, 'utf-8'))
	io.on('connection', (socket) => {
		if(socket.connected) {
			io.emit('all users', data.users)
			io.emit('all chats', data.chats)
			socket.on('new user', (name) => {
				data.users.push(name)
				fs.writeFileSync(path, JSON.stringify(data))
				io.emit('new user', name)
			})
			socket.on('exit user', (name) => {
				let i = data.users.indexOf(name)
				delete data.users[i]
				data.users = data.users.filter(e => e !== null)
				fs.writeFileSync(file, JSON.stringify(data))
				io.emit('exit user', name)
			})
			socket.on('new msg', (obj) => {
				data.chats.push(obj)
				fs.writeFileSync(file, JSON.stringify(data))
				io.emit('new msg', obj)
			})
		} else {}
	})
}