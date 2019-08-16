/**
 * 只专注于数据
 */
const {BlogModel} = require('../../db/model')
const {execFind, 
	execFindId,
	execDel,
	execUpdate,
	execNew} = require('../tools/appTools')
const getList = (author, keyword) => {
	return execFind(BlogModel,author, keyword)
}

const getDetail = (id) => {
	return execFindId(BlogModel, id)
}

const newBlog = (blogData) => {
	return execNew(BlogModel, blogData)
}

const updateBlog = (id, content, title) => {
	return execUpdate(BlogModel, id, content, title)
}

const delBlog = (id) => {
	return execDel(BlogModel, id)
}
module.exports = {
	getList,
	getDetail,
	newBlog,
	updateBlog,
	delBlog,
}