/**
 * 工具类型函数
 */

const {SuccessModule, ErrorModule} = require('../module/resModule')
const getPostData = (req) => {
	// 读取POST传入的数据是异步的方式
	const promise = new Promise((resolve, reject) => {
		if(req.method !== 'POST' || req.headers['content-type']!=='application/json'){
			resolve({})
			return
		}
		let postData = ''
		req.on('data', chunk => {
			// 二进制方式，因此要转换为 toString
			postData += chunk.toString()
		})
		req.on('end', () => {
			if(!postData){
				resolve({})
				return
			}
			resolve(
				JSON.parse(postData)
			)
		})
		
	})
	return promise
}

const resultCheck = (result) =>{
	if(result){
		return new SuccessModule()
	}else{
		return new ErrorModule()
	}
}

const execFindOne = (Model, username, password) =>{
	let p = new Promise((resolve, reject) => {
		//执行一些异步操作
		var result = ''
		Model.findOne({username, password}, (err, userInfo) => {
			console.log(username+'+++'+password+'[['+userInfo)
			if(err){
				result = false
				return reject(result)
			}else{
					result = true
				return resolve(result)
			}
			
		})
	})
	return p
}
module.exports = {
	getPostData,
	resultCheck,
	execFindOne
}