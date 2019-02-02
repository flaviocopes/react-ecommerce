import React, { useState, useEffect } from 'react'
import './App.css'
import { BrowserRouter as Router, Link, Route } from 'react-router-dom'
import AddProduct from './components/AddProduct.js'
import ProductsList from './components/ProductsList.js'
import SingleProduct from './components/SingleProduct.js'
import Cart from './components/Cart.js'

const App = () => {
  const [products, setProducts] = useState([])
  const [cart, setCart] = useState([])

  useEffect(() => {
    setProducts(JSON.parse(localStorage.getItem('products')) || [])
    setCart(JSON.parse(localStorage.getItem('cart')) || [])
  }, [])

  const addProduct = product => {
    const updatedProducts = [...products, product]
    setProducts(updatedProducts)
    localStorage.setItem('products', JSON.stringify(updatedProducts))
  }

  const deleteProduct = index => {
    let updatedProducts = [...products]
    updatedProducts = updatedProducts
      .slice(0, index)
      .concat(updatedProducts.slice(index + 1, updatedProducts.length))
    setProducts(updatedProducts)
    localStorage.setItem('products', JSON.stringify(updatedProducts))
  }

  const addToCart = ({ product, quantity }) => {
    const index = cart.findIndex(
      itemInCart => itemInCart.product.slug === product.slug
    )

    let newCart = []

    if (index === -1) {
      //not existing
      newCart = [...cart, { product, quantity }]
    } else {
      quantity += cart[index].quantity
      newCart = cart
        .filter(item => item.product.slug !== product.slug)
        .concat({ product, quantity })
    }
    setCart(newCart)
    localStorage.setItem('cart', JSON.stringify(newCart))
  }

  return (
    <Router>
      <div id='app'>
        <aside>
          <Link to={`/`}>Products</Link>
          <Link to={`/add-product`}>Add product</Link>
        </aside>

        <main>
          <Cart cart={cart} />
          <Route
            exact
            path='/'
            render={({ history }) => (
              <ProductsList
                products={products}
                deleteProduct={deleteProduct}
                history={history}
              />
            )}
          />
          <Route
            path='/add-product'
            render={({ history }) => (
              <AddProduct addProduct={addProduct} history={history} />
            )}
          />
          <Route
            path='/product/:slug'
            render={({ match }) => (
              <SingleProduct
                product={products.find(p => p.slug === match.params.slug)}
                addToCart={addToCart}
              />
            )}
          />
        </main>
      </div>
    </Router>
  )
}

export default App
