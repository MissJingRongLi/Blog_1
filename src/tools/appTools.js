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
		Model.findOne({username, password}, (err, userInfo) => {
			if(err){
				return reject(false)
			}else{
					if(userInfo){
						return resolve(true)
					}
					return resolve(false)
				
			}
			
		})
	})
	return p
}
// 查询blog列表
const execFind = (Model, author, keyword) => {
	let p = new Promise((resolve, reject) => {
		Model.find({author:{$regex:author, $options: 'i'}, content:{$regex:keyword, $options: 'i'}}, (err, blogInfo)=>{
			if(err){
				return reject(false)
			}else{
				return resolve(blogInfo)
			}
		})
	})
	return p
}
//查询详情
const execFindId = (Model, id) => {
	let p = new Promise((reslove, reject) => {
		Model.findOne({id}, (err, data) => {
			if(err){
				return reject(err)
			}else{
				return reslove(data)
			}
		})
	})
	return p
}

// 删除
const execDel = (Model, id) => {
	let p = new Promise((reslove, reject) => {
		Model.remove({id}, (err, result)=>{
			console.log(result)
			if(err){
				return reject(err)
			}
			return reslove(result.ok === 1)
		})
	})
	return p
}

//更新
const execUpdate = (Model, id, content,title) => {
	let p = new Promise((reslove, reject) => {
		Model.update({id}, {content, title}, (err, result) => {
			if(err){
				return reject(err)
			}
			return reslove(true)
		})
	})
	return p
}

//新建
const execNew = (Model, blogData) => {
	const {id, title, content, author} = blogData
	let p = new Promise((reslove, reject) => {
		Model.create({id, title, content, author}, (err, data) => {
			if(err){
				return reject(err)
			}
			return reslove(data)
		})
	})
	return p
}
module.exports = {
	getPostData,
	resultCheck,
	execFindOne,
	execFind,
	execFindId,
	execDel,
	execUpdate,
	execNew
}