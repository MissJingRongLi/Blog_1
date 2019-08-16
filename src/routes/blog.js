/**
 * 与博客内容相关的路由方法
 */
const {getList,
	   getDetail,
	   newBlog,
	   updateBlog,
	   delBlog,
	   execUpdate
	} = require('../controler/blog')
const {SuccessModule, ErrorModule} = require('../module/resModule')
const {resultCheck} = require('../tools/appTools')
const handleBlogRouter = (req, res) => {
	const method = req.method
	const url = req.url
	// get请求
	const path = url.split('?')[0]
	const id = req.query.id

	// 获取博客列表
	if(method === 'GET' && path === '/api/blog/list'){
		const author = req.query.author || ''
		const keyword = req.query.keyword || ''
		const listData = getList(author, keyword).then(data => {
			if(data){
				return new SuccessModule(data)
			}else{
				return new ErrorModule()
			}
		})
		return listData
		
	}

	// 获取博客详情
	if(method === 'GET' && path === '/api/blog/detail'){
		const detailData = getDetail(id).then(data => {
			if(data){
				return new SuccessModule(data)
			}else{
				return new ErrorModule()
			}
		})
		return detailData
	}

	// 新建博客
	if(method === 'POST' && path === '/api/blog/new'){
		const blogData = req.body
		return newBlog(blogData).then(data => {return resultCheck(data)})
	}

	// 更新博客
	if(method === 'POST' && path === '/api/blog/update'){
		const content = req.body.content
		const title = req.body.title
		return updateBlog(id, content, title).then(data => {return resultCheck(data)})
	}
	// 获取博客删除
	if(method === 'POST' && path === '/api/blog/del'){
		return delBlog(id).then(data => {return resultCheck(data)})
	}
}

module.exports = handleBlogRouter