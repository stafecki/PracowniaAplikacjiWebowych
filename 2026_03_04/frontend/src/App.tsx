import './index.scss'
import {Route, Routes } from 'react-router'
import HomePage from './scenes/HomePage/HomePage'
import Navbar from './components/Navbar/Navbar'
import Categories from './scenes/Categories/Categories'
import Posts from './scenes/Posts/Posts'
import PostDetail from './scenes/PostDetail/PostDetail'
import Footer from './components/Footer/Footer'

function App() {

  return (
    <>
        <Navbar />
        <main className="content">
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/categories" element={<Categories />} />
                <Route path="/posts" element={<Posts />} />
                <Route path="/wpisy/wpis/:id" element={<PostDetail />} />
            </Routes>
        </main>
        <Footer />
    </>
  )
}

export default App
