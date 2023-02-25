import { Sequelize } from 'sequelize'

const sequelize = new Sequelize(
  process.env.DATABASE,
  process.env.USERNAME,
  process.env.PASSWORD,
  {
    host: process.env.HOST,
    dialect: 'mysql',
  },
)

export default sequelize
