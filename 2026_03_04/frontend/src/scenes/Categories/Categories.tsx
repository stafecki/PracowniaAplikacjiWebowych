import styles from './Categories.module.scss';
import { Link } from 'react-router';
import { useCategories } from '../../hooks/useCategories';

export default function Categories() {
    const { data: categories, isLoading, isError } = useCategories();

    return <div className={styles.Categories}>
        <h1>Kategorie</h1>
        <p>Przeglądaj wpisy według kategorii</p>
        {isLoading && <p>Ładowanie kategorii...</p>}
        {isError && <p>Nie udało się załadować kategorii.</p>}
        {categories && (
            <ul>
                <li>
                    <Link to="/posts">Wszystkie wpisy</Link>
                </li>
                {categories.map(category => (
                    <li key={category.id}>
                        <Link to={`/posts?categoryId=${category.id}`}>
                            {category.name}
                        </Link>
                    </li>
                ))}
            </ul>
        )}
    </div>
}
