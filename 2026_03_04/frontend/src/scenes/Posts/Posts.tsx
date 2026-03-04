import styles from './Posts.module.scss'
import { Link, useSearchParams } from "react-router";
import { usePosts } from "../../hooks/usePosts.ts";
import { useCategories } from "../../hooks/useCategories.ts";

export default function Posts() {
    const [searchParams, setSearchParams] = useSearchParams();
    const categoryId = searchParams.get('categoryId') ? Number(searchParams.get('categoryId')) : undefined;

    const { data: posts, isLoading, isError } = usePosts(categoryId);
    const { data: categories } = useCategories();

    const activeCategory = categories?.find(c => c.id === categoryId);

    return <div className={styles.Posts}>
        {isLoading && <h1>Ładowanie...</h1>}
        {isError && <h1>Coś poszło nie tak.</h1>}
        {!isLoading && !isError && posts && (
            <>
                <h1>{activeCategory ? `Wpisy: ${activeCategory.name}` : 'Wszystkie wpisy'}</h1>

                <div className={styles.PostsFilters}>
                    <button
                        className={!categoryId ? styles.PostsFilterActive : ''}
                        onClick={() => setSearchParams({})}
                    >
                        Wszystkie
                    </button>
                    {categories?.map(category => (
                        <button
                            key={category.id}
                            className={categoryId === category.id ? styles.PostsFilterActive : ''}
                            onClick={() => setSearchParams({ categoryId: String(category.id) })}
                        >
                            {category.name}
                        </button>
                    ))}
                </div>

                {posts.length === 0 && <p>Brak wpisów w tej kategorii.</p>}
                {posts.length > 0 && (
                    <ul>
                        {posts.map(post => (
                            <li key={post.id}>
                                <h5>{post.title}</h5>
                                <p>
                                    {post.content ? post.content.substring(0, 50) + '...' : 'Brak treści'}
                                </p>
                                <Link
                                    to={'/wpisy/wpis/' + post.id}
                                    className={styles.PostsPostLink}
                                >
                                    Przejdź do wpisu
                                </Link>
                            </li>
                        ))}
                    </ul>
                )}
            </>
        )}
    </div>
}
