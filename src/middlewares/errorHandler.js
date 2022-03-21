const errorDictionary = {
	'CastError': {
		status: 400,
		message: 'Invalid data'
	},
	'ValidationError': {
		status: 400,
		message: 'Invalid data'
	},
	'Unauthorized': {
		status: 401,
		message: 'Unauthorized'
	},
	'JsonWebTokenError': {
		status: 401,
		message: 'Invalid token'
	},
	'TokenExpiredError': {
		status: 401,
		message: 'Invalid token'
	}
}

const errorHandler = (error, request, response) => {
	console.error(error)
	const errorName = error.name === 'Error' ? error.message : error.name
	console.log(errorName)
	let errorElement = errorDictionary[errorName]
	if (!errorElement) {
		errorElement = {
			status: 500,
			message: 'Internal server error'
		}
	}
	response.status(errorElement.status).json({
		error: errorElement.message
	})
}

export default errorHandler