import { Op } from 'sequelize'
import { Product } from '../models/Product.js'

const productsController = {
  getAllProducts: async function (_req, res) {
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
      if (!product) return res.sendStatus(404)
      res.json(product)
    } catch (err) {
      res.json(err)
    }
  },
  createProduct: async function (req, res) {
    const { title, price, presentation } = req.body
    if (!title) return res.status(500).json({ error: 'Missing title' })
    try {
      const fields = { title }
      if (price) fields.price = price
      if (presentation) fields.presentation = presentation
      const newProduct = await Product.create(fields)
      res.status(201).json(newProduct)
    } catch (error) {
      res.json(error)
    }
  },
  editProductById: async function (req, res) {
    const { id } = req.params
    const { title, price, presentation } = req.body
    if (!title && !price && !presentation)
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
