import axios from 'axios'

const link = 'http://' + window.location.hostname + ':3000/'
// const link = 'http://vmngrobot.local:3000/'

export default axios.create({
  baseURL: link,
})
