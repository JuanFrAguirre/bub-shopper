import app from './app.js'
import sequelize from './database/db.js'
import storesRouter from './routes/stores.routes.js'
import productsRouter from './routes/products.routes.js'
const PORT = process.env.PORT

app.get('/', (req, res) => res.json('ok!'))
app.use('/stores', storesRouter)
app.use('/products', productsRouter)

async function main() {
  app.listen(PORT, () =>
    console.log(`---\n\nServer running on port ${PORT}\n\n---`),
  )
  try {
    await sequelize.sync()
  } catch (error) {
    console.error('Unable to connect to the database:', error)
  }
}
main()
