/**
 * 与业务逻辑相关的文件
 */
const querystring = require('querystring')

const handleUserRouter = require('./src/routes/user')
const handleBlogRouter = require('./src/routes/blog')
const { getPostData } = require('./src/tools/appTools')
const serverHandle = (req, res) => {
	// 设置数据格式为 json
	res.setHeader('Content-type', 'application/json')
	const resData = {
		env: process.env.NODE_ENV
	}
	// 解析路径
	const url = req.url
	const path = url.split('?')[0]

	// 解析query
	req.query = querystring.parse(url.split('?')[1])

	getPostData(req).then(postData => {
		req.body = postData

		// 处理blog相关的路由
		const blogData = handleBlogRouter(req, res)
		if (blogData) {
			// 是一个promise对象
			res.end(JSON.stringify(blogData))
			return
		}
		// 处理user相关的路由
		const userData = handleUserRouter(req, res)
		if (userData) {
			userData.then(results => {
				res.end(JSON.stringify(results))
			}).catch(err => {
				console.log(err)
			})
			return
		}
		//未命中
		res.writeHead(404, { 'Content-type': 'text/plain' })
		res.end('404 Not Found')
	})
}
module.exports = serverHandle