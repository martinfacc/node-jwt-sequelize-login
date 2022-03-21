import { Model, DataTypes } from 'sequelize'
import { sequelize } from '../db.js'

class User extends Model { }
User.init({
	id: {
		type: DataTypes.INTEGER.UNSIGNED,
		autoIncrement: true,
		primaryKey: true
	},
	firstname: DataTypes.STRING,
	lastname: DataTypes.STRING,
	email: DataTypes.STRING,
	password: DataTypes.STRING
}, {
	sequelize,
	modelName: 'User'
})

export default User
