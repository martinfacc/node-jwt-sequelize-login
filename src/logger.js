const logger = (request, response, next) => {
	console.log('---')
	console.log('📝  Request received')
	console.log('📝  Method: ' + request.method)
	console.log('📝  Path: ' + request.path)
	console.log('📝  Body: ' + JSON.stringify(request.body))
	console.log('📝  Params: ' + JSON.stringify(request.params))
	next()
}

export default logger