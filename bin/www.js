/**
 * 与服务器端相关的配置的文件
 */
const http = require('http')

const PORT = 3000

const serverHandle = require('../app')

const server = http.createServer(serverHandle)

server.listen(PORT, () => {
	console.log('running...')
})