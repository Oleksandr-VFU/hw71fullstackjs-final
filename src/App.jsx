import { BrowserRouter, Route, Routes } from 'react-router'
import Navbar from './components/common/Navbar'
import Home from './components/pages/Home'
import Products from './components/pages/Products'

function App() {

  return (
    <BrowserRouter>
      <Navbar />
      <div className="container">
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/products' element={<Products />} />
        </Routes>
      </div>
    </BrowserRouter>
  )
}

export default App