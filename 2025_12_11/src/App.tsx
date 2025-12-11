import './App.css'
import {BrowserRouter, Link, Route, Routes} from 'react-router'
import Home from './scenes/Home/Home.tsx'
import About from './scenes/About/About.tsx'
import Contact from './scenes/Contact/Contact.tsx'
import PriceList from './scenes/PriceList/PriceList.tsx'

function App() {

  return (
    <BrowserRouter>
        <header>
            <nav>
                <ul>
                    <li>
                        <Link to="/">Home</Link>
                    </li>
                    <li>
                        <Link to="/about">About</Link>
                    </li>
                    <li>
                        <Link to="/contact">Contact</Link>
                    </li>
                    <li>
                        <Link to="/pricelist">Price List</Link>
                    </li>
                </ul>
            </nav>
        </header>
        <Routes>
            <Route path="/" element={<Home/>} />
            <Route path="/about" element={<About/>} />
            <Route path="/contact" element={<Contact/>} />
            <Route path="/pricelist" element={<PriceList/>} />
        </Routes>
        <footer>
            <p>© 2025 My React App</p>
        </footer>
    </BrowserRouter>
  )
}

export default App
