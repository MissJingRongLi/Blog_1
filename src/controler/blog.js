/**
 * 只专注于数据
 */
const {BlogModel} = require('../../db/model')
const getList = (author, keyword) => {
	return [
		{
			id : '1',
			name : 'zhangsan',
			content : '内容1',
			author : 'zhangsan'
		},
		{
			id : '2',
			name : 'zhangsan2',
			content : '内容2',
			author : 'zhangsan2'
		}
	]
}

const getDetail = (id) => {
	return [
		{
			id : '1',
			name : 'zhangsan',
			content : '内容1',
			author : 'zhangsan'
		},
	]
}

const newBlog = (blogData) => {
	return {
		id : 3
	}
}

const updateBlog = (id, blogData) => {
	return true
}

const delBlog = (id) => {
	return false
}
module.exports = {
	getList,
	getDetail,
	newBlog,
	updateBlog,
	delBlog
}