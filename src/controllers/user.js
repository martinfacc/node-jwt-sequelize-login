import User from '../models/user.js'
import Session from '../models/session.js'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

const hashPassword = async (password) => {
	const salt = await bcrypt.genSalt(10)
	return await bcrypt.hash(password, salt)
}

export const signup = async (request, response, next) => {
	try {
		const { firstname, lastname, email, password } = request.body
		const hashedPassword = await hashPassword(password)
		const registeredUser = await User.create({
			firstname,
			lastname,
			email,
			password: hashedPassword
		})
		const UserId = registeredUser.id
		const session = await Session.create({ UserId })
		const token = jwt.sign({
			SessionId: session.id,
			createdAt: session.createdAt,
			UserId
		}, process.env.JWT_SECRET)
		response.status(200).json({ firstname, lastname, email, token })
	} catch (error) {
		next(error)
	}
}

export const login = async (request, response, next) => {
	try {
		const { email, password } = request.body
		const findedUser = await User.findOne({
			where: { email }
		})
		const isPasswordValid = await bcrypt.compare(password, findedUser?.password)
		if (!isPasswordValid) throw Error('Email or password incorrect')
		const UserId = findedUser.id
		const session = await Session.create({ UserId })
		const token = jwt.sign({
			SessionId: session.id,
			createdAt: session.createdAt,
			UserId
		}, process.env.JWT_SECRET)
		response.status(200).json({
			firstname: findedUser.firstname,
			lastname: findedUser.lastname,
			email: findedUser.email,
			token
		})
	} catch (error) {
		next(error)
	}
}

export const logout = async (request, response, next) => {
	try {
		const header = request.get('authorization')
		const token = header.slice(7)
		const { SessionId } = jwt.verify(token, process.env.JWT_SECRET)
		await Session.destroy({
			where: { id: SessionId }
		})
		response.status(200).end()
	} catch (error) {
		next(error)
	}
}
