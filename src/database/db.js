import { Sequelize } from 'sequelize'

const sequelize = new Sequelize(process.env.MYSQL_URL)

export default sequelize
