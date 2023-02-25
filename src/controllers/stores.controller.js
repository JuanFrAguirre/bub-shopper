import { Store } from '../models/Store.js'

const storesController = {
  getAllStores: async function (req, res) {
    try {
      const stores = await Store.findAll()
      res.json(stores)
    } catch (err) {
      res.json(err)
    }
  },
  getStoreById: async function (req, res) {
    try {
      const store = await Store.findByPk(req.params.id)
      if (store === null) return res.sendStatus(404)
      res.json(store)
    } catch (err) {
      res.json(err)
    }
  },
  getStoreByTag: async function (req, res) {
    const { tag } = req.params
    try {
      const stores = await Store.findAll()
      const result = stores.filter((store) => {
        return store.tags.includes(String(tag).toLowerCase())
      })
      result.length > 0 ? res.json(result) : res.sendStatus(404)
    } catch (err) {
      res.json(err)
    }
  },
  createStore: async function (req, res) {
    const { title, tags } = req.body
    if (!title || !tags)
      return res.status(500).json({ error: 'Incorrect or missing parameters' })
    try {
      const newStore = await Store.create({ title, tags })
      res.status(201).json(newStore)
    } catch (error) {
      res.json(error)
    }
  },
  editStoreById: async function (req, res) {
    const { id } = req.params
    try {
      const store = await Store.findByPk(id)
      if (store === null) return res.json('Store not found')

      Object.keys(req.body).forEach((key) => (store[key] = req.body[key]))
      await store.save()
      res.json(store)
    } catch (err) {
      res.json(err)
    }
  },
  deleteStoreById: async function (req, res) {
    const { id } = req.params
    try {
      await Store.destroy({ where: { id } })
      res.sendStatus(204)
    } catch (err) {
      res.json(err)
    }
  },
}

export default storesController
