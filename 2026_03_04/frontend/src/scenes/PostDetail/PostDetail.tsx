import { useState } from 'react';
import { useParams } from 'react-router';
import { usePost } from '../../hooks/usePost';
import { usePostComments } from '../../hooks/usePostComments';
import { useAddComment } from '../../hooks/useAddComment';
import styles from './PostDetail.module.scss';

export default function PostDetail() {
    const { id } = useParams<{ id: string }>();
    const postId = Number(id);

    const { data: post, isLoading: postLoading, isError: postError } = usePost(postId);
    const { data: comments, isLoading: commentsLoading } = usePostComments(postId);
    const { mutate: submitComment, isPending } = useAddComment(postId);

    const [author, setAuthor] = useState('');
    const [content, setContent] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!author.trim() || !content.trim()) return;
        submitComment(
            { author, content, postId },
            {
                onSuccess: () => {
                    setAuthor('');
                    setContent('');
                },
            }
        );
    };

    if (postLoading) return <h1>Ładowanie wpisu...</h1>;
    if (postError || !post) return <h1>Nie znaleziono wpisu.</h1>;

    return (
        <div className={styles.PostDetail}>
            <article className={styles.PostDetailArticle}>
                <h1>{post.title}</h1>
                <time>{new Date(post.createdAt).toLocaleDateString('pl-PL')}</time>
                <p>{post.content}</p>
            </article>

            <section className={styles.PostDetailComments}>
                <h2>Komentarze</h2>
                {commentsLoading && <p>Ładowanie komentarzy...</p>}
                {comments && comments.length === 0 && <p>Brak komentarzy. Bądź pierwszy!</p>}
                {comments && comments.length > 0 && (
                    <ul>
                        {comments.map(comment => (
                            <li key={comment.id} className={styles.PostDetailComment}>
                                <strong>{comment.author}</strong>
                                <time>{new Date(comment.createdAt).toLocaleDateString('pl-PL')}</time>
                                <p>{comment.content}</p>
                            </li>
                        ))}
                    </ul>
                )}
            </section>

            <section className={styles.PostDetailAddComment}>
                <h2>Dodaj komentarz</h2>
                <form onSubmit={handleSubmit}>
                    <div>
                        <label htmlFor="author">Imię / Nick</label>
                        <input
                            id="author"
                            type="text"
                            value={author}
                            onChange={e => setAuthor(e.target.value)}
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="content">Treść</label>
                        <textarea
                            id="content"
                            value={content}
                            onChange={e => setContent(e.target.value)}
                            rows={4}
                            required
                        />
                    </div>
                    <button type="submit" disabled={isPending}>
                        {isPending ? 'Wysyłanie...' : 'Dodaj komentarz'}
                    </button>
                </form>
            </section>
        </div>
    );
}
