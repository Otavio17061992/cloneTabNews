test("POST /api/v1/comments should return 201 with the created comment", async () => {
    // Primeiro cria um post para associar o comentário
    const postRes = await fetch("http://localhost:3000/api/v1/posts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            title: "Post de Teste",
            content: "Conteúdo de teste para o post",
            category: "Backend",
            author_name: "Teste",
        }),
    });
    expect(postRes.status).toBe(201);
    const postBody = await postRes.json();
    const postId = postBody.post.id;

    // Agora cria um comentário
    const response = await fetch("http://localhost:3000/api/v1/comments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            post_id: postId,
            author_name: "João Testador",
            author_email: "joao@test.com",
            content: "Comentário de teste muito bacana!",
        }),
    });

    expect(response.status).toBe(201);

    const comment = await response.json();
    expect(comment).toHaveProperty("id");
    expect(comment.author_name).toBe("João Testador");
    expect(comment.content).toBe("Comentário de teste muito bacana!");
    expect(comment.post_id).toBe(postId);
});

test("GET /api/v1/comments?post_id=X should return 200 with comments array", async () => {
    // Busca o primeiro post
    const postsRes = await fetch("http://localhost:3000/api/v1/posts");
    const postsBody = await postsRes.json();
    const postId = postsBody.posts[0]?.id || 1;

    const response = await fetch(`http://localhost:3000/api/v1/comments?post_id=${postId}`);
    expect(response.status).toBe(200);

    const body = await response.json();
    expect(body).toHaveProperty("comments");
    expect(Array.isArray(body.comments)).toBe(true);
});
