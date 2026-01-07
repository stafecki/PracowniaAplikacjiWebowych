import styles from './Posts.module.scss'
export default function Posts(){
    return <div className={styles.Posts}>
        <h1>
            Wpisy blogowe
        </h1>
        <ul>
            <li>
                <p>Post 1</p>
            </li>
            <li>
                <p>Post 2</p>
            </li>
            <li>
                <p>Post 3</p>
            </li>
            <li>
                <p>Post 4</p>
            </li>
            <li>
                <p>Post 5</p>
            </li>
        </ul>
    </div>
}
