import { Router } from 'express'
import storesController from '../controllers/stores.controller.js'
const router = Router()

router.get('/', storesController.getAllStores)
router.get('/tag/:tag', storesController.getStoreByTag)
router.get('/:id', storesController.getStoreById)
router.post('/', storesController.createStore)
router.put('/:id', storesController.editStoreById)
router.delete('/:id', storesController.deleteStoreById)

export default router
