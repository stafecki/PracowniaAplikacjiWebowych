import styles from './Posts.module.scss'
import {Link} from "react-router";
import {usePosts} from "../../hooks/usePosts.ts";

export default function Posts(){
    const {data: posts, isLoading, isError} = usePosts()
    return <div className={styles.Posts}>
        {isLoading && (
            <h1>Ładowanie...</h1>
        )}
        {isError && (
            <h1>Coś poszło nie tak.</h1>
        )}
        {!isLoading && !isError && posts && (
            <>
                <h1>Wpisy</h1>
                {posts.length > 0 && (
                    <ul>
                        {posts.map(post => (
                            <li key={post.id}>
                                <h5>
                                    {post.title}
                                </h5>
                                <p>
                                    {post.body.substring(0, 50)}...
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
