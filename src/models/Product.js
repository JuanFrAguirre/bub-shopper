import { DataTypes } from 'sequelize'
import sequelize from '../database/db.js'

export const Product = sequelize.define(
  'Product',
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    price: {
      type: DataTypes.FLOAT,
      defaultValue: 0,
    },
    presentation: {
      type: DataTypes.STRING,
    },
  },
  { timestamps: true },
)
