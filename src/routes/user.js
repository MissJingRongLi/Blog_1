/**
 * 与用户相关的路由文件
 */
const {login} = require('../controler/user')
const{resultCheck} = require('../tools/appTools')
const handleUserRouter = (req, res) => {
	const method = req.method
	const url = req.url
	// get请求
	const path = url.split('?')[0]

	//登录
	if(method === 'POST' && path === '/api/user/login'){
		const {username, password} = req.body
		return login(username, password).then(data => {return resultCheck(data)})
	}
}
module.exports = handleUserRouter