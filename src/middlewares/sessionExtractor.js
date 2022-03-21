import Session from '../models/session.js'
import jwt from 'jsonwebtoken'

const { JWT_SECRET } = process.env

const authenticateSession = async (SessionId, UserId) => {
	try {
		const session = await Session.findOne({
			where: { id: SessionId, UserId }
		})
		if (!session) throw new Error()
		return true
	} catch {
		return false
	}
}

const sessionExtractor = async (request, response, next) => {
	try {
		const unauthorizedError = new Error('Unauthorized')
		const header = request.get('authorization')
		if (!header || !header.startsWith('Bearer')) throw unauthorizedError
		const token = header.slice(7)
		const { SessionId, UserId } = jwt.verify(token, JWT_SECRET)
		if (!token || !SessionId || !UserId) throw unauthorizedError
		const isValid = await authenticateSession(SessionId, UserId)
		if (!isValid) throw unauthorizedError
		next()
	} catch (error) {
		next(error)
	}
}

export default sessionExtractor