/**
 * 基类
 */
class BaseModule {
	constructor(data, message){
		// 默认data是对象类型(包括数组)，message为字符串类型
		if(typeof data === 'string'){
			this.message = data
			data = null
			message = null
		}
		if(data){
			this.data = data
		}
		if(message){
			this.message = message
		}
	}
}
//成功的模型
class SuccessModule extends BaseModule{
	constructor(data, message){
		super(data, message)
		this.errno = 0
	}
}
// 失败的模型
class ErrorModule extends BaseModule{
	constructor(data, message){
		super(data, message)
		this.errno = -1
	}
}
module.exports = {
	SuccessModule,
	ErrorModule
}