import io from 'socket.io-client'
import { setNodes } from 'ducks/real-time'
import { store } from 'ducks'

const link = 'http://' + window.location.hostname + ':3000/'
// const link = 'http://vmngrobot.local:3000/'

export const socket = io(link)

socket.on('connect', function() {
  console.log('connect')
})

socket.on('action', data => {
  store.dispatch(setNodes(data))
})

socket.on('disconnect', function() {
  console.log('disconnect')
})
