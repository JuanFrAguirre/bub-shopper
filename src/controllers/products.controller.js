import { Op } from 'sequelize'
import { Product } from '../models/Product.js'
import { Store } from '../models/Store.js'

const productsController = {
  getAllProducts: async function (req, res) {
    try {
      const products = await Product.findAll()
      res.json(products)
    } catch (err) {
      res.json(err)
    }
  },
  getProductsByTitle: async function (req, res) {
    const { title } = req.params
    try {
      const products = await Product.findAll({
        where: {
          title: { [Op.substring]: title },
        },
      })
      res.json(products)
    } catch (err) {
      res.json(err)
    }
  },
  getProductById: async function (req, res) {
    try {
      const product = await Product.findByPk(req.params.id)
      if (product === null) return res.sendStatus(404)
      res.json(product)
    } catch (err) {
      res.json(err)
    }
  },
  getProductsByStore: async function (req, res) {
    const { storeId } = req.params
    try {
      const store = await Store.findByPk(storeId)
      if (store === null)
        return res.status(404).json({ error: 'Store not found' })
      const products = await Product.findAll({ where: { storeId } })
      res.json(products)
    } catch (err) {
      res.json(err)
    }
  },
  createProduct: async function (req, res) {
    const { title, price, storeId } = req.body
    const { body } = req
    if (!title || !price || !storeId)
      return res.status(500).json({ error: 'Incorrect or missing parameters' })

    try {
      const store = await Store.findByPk(storeId)
      if (store === null)
        return res.status(404).json({ error: 'Store not found' })
      const fields = { title, price, storeId }
      fields.subTitle = body.subTitle
      fields.description = body.description
      fields.presentation = body.presentation
      const newProduct = await Product.create({ ...fields })
      res.status(201).json(newProduct)
    } catch (error) {
      res.json(error)
    }
  },
  editProductById: async function (req, res) {
    const { id } = req.params
    const { title, subtitle, description, price, presentation, storeId } =
      req.body
    if (
      !title &&
      !subtitle &&
      !description &&
      !price &&
      !presentation &&
      !storeId
    )
      return res.status(500).json('Incorrect or missing parameters')
    try {
      const product = await Product.findByPk(id)
      if (product === null) return res.json('Product not found')
      product.set(req.body)
      await product.save()
      res.json(product)
    } catch (err) {
      res.json(err)
    }
  },
  deleteProductById: async function (req, res) {
    const { id } = req.params
    try {
      await Product.destroy({ where: { id } })
      res.sendStatus(204)
    } catch (err) {
      res.json(err)
    }
  },
}

export default productsController