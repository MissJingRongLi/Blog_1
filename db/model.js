/*
包含 n 个能操作 mongodb 数据库集合的 model 的模块
*/
/*1. 连接数据库*/
// 1.1. 引入 mongoose
const mongoose = require('mongoose')
// 1.2. 连接指定数据库 (URL 只有数据库是变化的 )
mongoose.connect('mongodb://localhost/blog_1', { useNewUrlParser: true })
// 1.3. 获取连接对象
const conn = mongoose.connection
// 1.4. 绑定连接完成的监听 ( 用来提示连接成功
conn.on('connected', function () {
    console.log('db connect success!')
})

/*2. 定义出对应特定集合的 Model 并向外暴露*/
// 2.1. 字义 Schema( 描述文档结构 )
const userSchema = mongoose.Schema({
    username: { type: String, required: true }, // 用户名
    password: { type: String, required: true }, // 密码
})
// 2.2. 定义 Model( 与集合对应 , 可以操作集合 )
const UserModel = mongoose.model('user', userSchema)

/*3. 定义出对应特定集合的 Model 并向外暴露*/
// 3.1. 字义 Schema( 描述文档结构 )
const blogSchema = mongoose.Schema({
	author: { type: String, required: true },
	title: { type: String, required: true },
	content: { type: String, required: true },
	id: { type: Number, required: true },
})
// 3.2. 定义 Model( 与集合对应 , 可以操作集合 )
// 会在数据库集合test中生成 chatmsgs 这样一个文档
const BlogModel = mongoose.model('blog', blogSchema)

module.exports = {
	UserModel,
	BlogModel
}