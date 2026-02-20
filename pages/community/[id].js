import Link from "next/link";
import { ArrowLeft, Calendar, Tag, User } from "lucide-react";
import CommentSection from "../../components/CommentSection";
import styles from "./[id].module.css";

export default function PostPage({ post, comments = [] }) {
    if (!post) {
        return (
            <div className="container" style={{ padding: "5rem 2rem", textAlign: "center" }}>
                <h1>Post não encontrado</h1>
                <Link href="/community" className="btn btn-outline" style={{ marginTop: "1rem" }}>
                    ← Voltar à comunidade
                </Link>
            </div>
        );
    }

    return (
        <>
            <div className={styles.pageHeader}>
                <div className="glow-orb glow-orb-1" />
                <div className="container">
                    <Link href="/community" className={styles.back}>
                        <ArrowLeft size={16} /> Comunidade
                    </Link>
                    <div className={styles.meta}>
                        <span className="badge badge-category">
                            <Tag size={10} /> {post.category}
                        </span>
                        <span className={styles.date}>
                            <Calendar size={13} />
                            {new Date(post.created_at).toLocaleDateString("pt-BR", { year: "numeric", month: "long", day: "numeric" })}
                        </span>
                    </div>
                    <h1 style={{ marginTop: "0.75rem" }}>{post.title}</h1>
                    <div className={styles.author}>
                        <div className={styles.authorAvatar}>{post.author_name?.charAt(0).toUpperCase()}</div>
                        <span>{post.author_name}</span>
                    </div>
                </div>
            </div>

            <section className="section">
                <div className="container">
                    <div className={styles.layout}>
                        <article className={styles.article}>
                            <div className={styles.content}>
                                {post.image_url && (
                                    <img src={post.image_url} alt={post.title} className={styles.coverImage} />
                                )}
                                <div className={styles.text}>{post.content}</div>
                            </div>

                            <div className={styles.divider} />

                            <CommentSection postId={post.id} initialComments={comments} />
                        </article>
                    </div>
                </div>
            </section>
        </>
    );
}

export async function getServerSideProps({ params }) {
    try {
        const base = process.env.NEXT_PUBLIC_BASE_URL || (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : "http://localhost:3000");
        const [postRes, commentsRes] = await Promise.all([
            fetch(`${base}/api/v1/posts/${params.id}`),
            fetch(`${base}/api/v1/comments?post_id=${params.id}`),
        ]);
        const postData = postRes.ok ? await postRes.json() : null;
        const commentsData = commentsRes.ok ? await commentsRes.json() : { comments: [] };
        return {
            props: {
                post: postData?.post || null,
                comments: commentsData?.comments || [],
                title: postData?.post?.title,
            },
        };
    } catch {
        return { props: { post: null, comments: [] } };
    }
}
