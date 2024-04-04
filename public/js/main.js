const ls = localStorage
const username = document.getElementById('username')
const alluser = document.getElementById('users')
const ctx = document.getElementById('ctx')

const socket = io()

socket.on('all users', (users) => {
	let items = ''
	for(i in users) {
		items += `<div id="${users[i]}" class="text-success">${users[i]}</div>`
	}
	alluser.innerHTML = items
})
socket.on('all chats', (chats) => {
	let items = ''
	for(i in chats) {
		items += `<div>${chats[i].from}&nbsp;:&nbsp;<span class="text-secondary">${chats[i].msg}</span></div>`
	}
	ctx.innerHTML = items
})
socket.on('new user', (name) => {
	ctx.innerHTML += `<div class="text-secondary text-center" style="font-size:12px;">${name} has joined !!</div>`
	username.innerHTML = ls.getItem('name')
	alluser.innerHTML += `<div id="${name}" class="text-success">${name}</div>`
})
socket.on('exit user', (name) => {
	ctx.innerHTML += `<div class="text-secondary text-center" style="font-size:12px;">${name} has left chat~</div>`
	username.innerHTML = ''
	document.getElementById(`${name}`).remove()
})
socket.on('new msg', (obj) => {
	ctx.innerHTML += `<div>${obj.from}&nbsp;:&nbsp;<span class="text-secondary">${obj.msg}</span></div>`
})

function doJoin(e) {
	if(ls.getItem('name')) {
		return e.preventDefault()
	}
	let name = window.prompt('username')
	if(name) {
		ls.setItem('name', name)
		return socket.emit('new user', ls.getItem('name'))
	}
}

function doExit(e) {
	if(ls.getItem('name')) {
		socket.emit('exit user', ls.getItem('name'))
		return ls.removeItem('name')
	}
	e.preventDefault()
}