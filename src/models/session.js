import { Model, DataTypes } from 'sequelize'
import { sequelize } from '../db.js'
import User from './user.js'

class Session extends Model { }
Session.init({
	id: {
		type: DataTypes.INTEGER.UNSIGNED,
		autoIncrement: true,
		primaryKey: true
	}
}, {
	sequelize,
	modelName: 'Session'
})

User.hasMany(Session)
Session.belongsTo(User)

export default Session
