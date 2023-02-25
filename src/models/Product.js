import { DataTypes } from 'sequelize'
import sequelize from '../database/db.js'
import { Store } from './Store.js'

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
    subTitle: {
      type: DataTypes.STRING,
    },
    description: {
      type: DataTypes.STRING,
    },
    price: {
      type: DataTypes.FLOAT,
      defaultValue: 0,
      allowNull: false,
    },
    presentation: {
      type: DataTypes.STRING,
    },
  },
  { timestamps: true },
)
