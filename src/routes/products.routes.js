import { Router } from 'express'
import productsController from '../controllers/products.controller.js'
const router = Router()

router.get('/', productsController.getAllProducts)
router.get('/:id', productsController.getProductById)
router.get('/title/:title', productsController.getProductsByTitle)
router.post('/', productsController.createProduct)
router.put('/:id', productsController.editProductById)
router.delete('/:id', productsController.deleteProductById)

export default router
