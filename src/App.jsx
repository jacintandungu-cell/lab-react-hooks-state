import React, { useState } from 'react'
import ProductList, { sampleProducts } from './components/ProductList'
import DarkModeToggle from './components/DarkModeToggle'
import Cart from './components/Cart'

const App = () => {
  const [darkMode, setDarkMode] = useState(false)
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [cartItems, setCartItems] = useState([])

  const handleToggleDarkMode = () => {
    setDarkMode((current) => !current)
  }

  const handleCategoryChange = (event) => {
    setSelectedCategory(event.target.value)
  }

  const handleAddToCart = (product) => {
    setCartItems((currentItems) => {
      if (currentItems.some((item) => item.id === product.id)) {
        return currentItems
      }
      return [...currentItems, product]
    })
  }

  const visibleProducts = sampleProducts.filter((product) => {
    if (selectedCategory === 'all') return true
    return product.category === selectedCategory
  })

  return (
    <div
      style={{
        minHeight: '100vh',
        backgroundColor: darkMode ? '#111' : '#ffffff',
        color: darkMode ? '#f4f4f4' : '#111111',
        padding: '2rem'
      }}
    >
      <h1>🛒 Shopping App</h1>
      <p>
        Welcome! Your task is to implement filtering, cart management, and dark
        mode.
      </p>

      <DarkModeToggle darkMode={darkMode} toggleDarkMode={handleToggleDarkMode} />

      <div style={{ margin: '1.5rem 0' }}>
        <label htmlFor="category-filter">Filter by Category: </label>
        <select
          id="category-filter"
          aria-label="Filter by Category"
          value={selectedCategory}
          onChange={handleCategoryChange}
        >
          <option value="all">All</option>
          <option value="Fruits">Fruits</option>
          <option value="Dairy">Dairy</option>
        </select>
      </div>

      <ProductList products={visibleProducts} onAddToCart={handleAddToCart} />

      <Cart items={cartItems} />
    </div>
  )
}

export default App
