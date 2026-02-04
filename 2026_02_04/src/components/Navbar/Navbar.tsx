import styles from './Navbar.module.scss'
import { Link } from 'react-router'
export default function Navbar() {
    return <nav className={styles.Navbar}>
        <ul>
            <li>
                <Link to="/">Strona główna</Link>
            </li>
            <li>
                <Link to="/categories">Kategorie</Link>
            </li>
            <li>
                <Link to='posts'>Wpisy</Link>
            </li>
        </ul>
    </nav>
}
