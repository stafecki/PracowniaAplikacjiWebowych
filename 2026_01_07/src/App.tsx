import './App.scss'
import { BrowserRouter, Route, Routes } from 'react-router'
import HomePage from './components/HomePage/HomePage'
import Navbar from './components/Navbar/Navbar'
import Categories from './components/Categories/Categories'
import Posts from './components/Posts/Posts'

function App() {

  return (
    <BrowserRouter>
        <Navbar />
        <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/categories" element={<Categories />} />
            <Route path="/posts" element={<Posts />} />
        </Routes>
    </BrowserRouter>
  )
}

export default App
