/**
 * 与博客内容相关的路由方法
 */
const {getList,
	   getDetail,
	   newBlog,
	   updateBlog,
	   delBlog
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
		const listData = getList(author, keyword)
		return new SuccessModule(listData)
	}

	// 获取博客详情
	if(method === 'GET' && path === '/api/blog/detail'){
		const detailData = getDetail(id)
		return new SuccessModule(detailData)
	}

	// 更新博客
	if(method === 'POST' && path === '/api/blog/new'){
		const content = req.body
		const newData = newBlog(content)
		return new SuccessModule(newData)
	}

	// 获取博客更新
	if(method === 'POST' && path === '/api/blog/update'){
		const content = req.body
		const result = updateBlog(id, content)
		return resultCheck(result)
	}
	// 获取博客删除
	if(method === 'POST' && path === '/api/blog/del'){
		const result = delBlog(id)
		return resultCheck(result)
	}
}

module.exports = handleBlogRouter