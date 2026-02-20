test("Comment approval workflow", async () => {
    const postRes = await fetch("http://localhost:3000/api/v1/posts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            title: "Post de Teste para Comentários",
            content: "Conteúdo de teste",
            category: "Backend",
            author_name: "Teste",
        }),
    });
    expect(postRes.status).toBe(201);
    const postBody = await postRes.json();
    const postId = postBody.post.id;

    await fetch(`http://localhost:3000/api/v1/posts/${postId}/approve`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ admin_secret: "12345" }),
    });

    const response = await fetch("http://localhost:3000/api/v1/comments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            post_id: postId,
            author_name: "João Testador",
            author_email: "joao@test.com",
            content: "Comentário que precisa de aprovação!",
        }),
    });
    expect(response.status).toBe(201);
    const comment = await response.json();
    const commentId = comment.id;
    expect(comment.approved).toBe(false);

    const getBeforeApproval = await fetch(`http://localhost:3000/api/v1/comments?post_id=${postId}`);
    const beforeBody = await getBeforeApproval.json();
    const foundBefore = beforeBody.comments.find(c => c.id === commentId);
    expect(foundBefore).toBeUndefined();

    const approveRes = await fetch(`http://localhost:3000/api/v1/comments/${commentId}/approve`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ admin_secret: "12345" }),
    });
    expect(approveRes.status).toBe(200);

    const getAfterApproval = await fetch(`http://localhost:3000/api/v1/comments?post_id=${postId}`);
    const afterBody = await getAfterApproval.json();
    const foundAfter = afterBody.comments.find(c => c.id === commentId);
    expect(foundAfter).toBeDefined();
    expect(foundAfter.content).toBe("Comentário que precisa de aprovação!");
});

test("Comment approval security and edge cases", async () => {
    const nonexistentRes = await fetch("http://localhost:3000/api/v1/comments/999999/approve", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ admin_secret: "12345" }),
    });
    expect(nonexistentRes.status).toBe(404);

    const postRes = await fetch("http://localhost:3000/api/v1/posts");
    const postsBody = await postRes.json();
    const postId = postsBody.posts[0]?.id || 1;

    const commentRes = await fetch("http://localhost:3000/api/v1/comments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            post_id: postId,
            author_name: "Hacker",
            author_email: "hacker@test.com",
            content: "Tentativa de aprovação falsa",
        }),
    });
    const comment = await commentRes.json();
    const commentId = comment.id;

    const wrongSecretRes = await fetch(`http://localhost:3000/api/v1/comments/${commentId}/approve`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ admin_secret: "wrong_password" }),
    });
    expect(wrongSecretRes.status).toBe(401);

    const wrongBody = await wrongSecretRes.json();
    expect(wrongBody.error).toBe("Unauthorized: Invalid admin secret");
});

test("Post comment count only considers approved comments", async () => {
    const postRes = await fetch("http://localhost:3000/api/v1/posts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            title: "Post de Teste Contagem",
            content: "Conteúdo",
            category: "Geral",
            author_name: "Teste",
        }),
    });
    const newPost = await postRes.json();
    expect(postRes.status).toBe(201);
    const postId = newPost.post.id;

    await fetch(`http://localhost:3000/api/v1/posts/${postId}/approve`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ admin_secret: "12345" }),
    });

    await fetch("http://localhost:3000/api/v1/comments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            post_id: postId,
            author_name: "Contador",
            author_email: "count@test.com",
            content: "Um",
        }),
    });

    // Busca o post específico e garante que a contagem é 0
    const getPosts1 = await fetch("http://localhost:3000/api/v1/posts");
    expect(getPosts1.status).toBe(200);
    const body1 = await getPosts1.json();
    const postBefore = body1.posts.find(p => p.id === postId);
    expect(postBefore).toBeDefined();
    expect(postBefore.comment_count).toBe(0);

    // Cria e aprova um segundo comentário
    const commentRes2 = await fetch("http://localhost:3000/api/v1/comments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            post_id: postId,
            author_name: "Contador 2",
            author_email: "count2@test.com",
            content: "Dois",
        }),
    });
    const comment2 = await commentRes2.json();
    const commentId2 = comment2.id;

    // Aprova o comentário 2
    await fetch(`http://localhost:3000/api/v1/comments/${commentId2}/approve`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ admin_secret: "12345" }),
    });

    // Busca o post novamente e garante que a contagem é 1 (ignorou o primeiro, contou o aprovado)
    const getPosts2 = await fetch("http://localhost:3000/api/v1/posts");
    const body2 = await getPosts2.json();
    const postAfter = body2.posts.find(p => p.id === postId);
    expect(postAfter.comment_count).toBe(1);
});
