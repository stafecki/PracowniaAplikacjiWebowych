import './index.scss'
import { BrowserRouter, Route, Routes } from 'react-router'
import HomePage from './scenes/HomePage/HomePage'
import Navbar from './components/Navbar/Navbar'
import Categories from './scenes/Categories/Categories'
import Posts from './scenes/Posts/Posts'
import Footer from './components/Footer/Footer'

function App() {

  return (
    <BrowserRouter>
        <Navbar />
        <main className="content">
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/categories" element={<Categories />} />
                <Route path="/posts" element={<Posts />} />
            </Routes>
        </main>
        <Footer />
    </BrowserRouter>
  )
}

export default App
