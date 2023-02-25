import { DataTypes } from 'sequelize'
import sequelize from '../database/db.js'
import { Product } from './Product.js'

export const Store = sequelize.define(
  'Store',
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
    description: {
      type: DataTypes.STRING,
    },
    tags: {
      type: DataTypes.STRING,
    },
  },
  {
    timestamps: true,
  },
)

Store.hasMany(Product, {
  foreignKey: 'storeId',
  sourceKey: 'id',
})

Product.belongsTo(Store, {
  foreignKey: 'storeId',
  targetKey: 'id',
})
