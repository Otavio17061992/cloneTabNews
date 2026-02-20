test("Post approval workflow and visibility", async () => {
    // 1. Cria um post (nasce pendente)
    const postRes = await fetch("http://localhost:3000/api/v1/posts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            title: "Post Pendente de Teste",
            content: "Conteúdo confidencial",
            category: "Geral",
            author_name: "Testador Admin",
        }),
    });
    expect(postRes.status).toBe(201);
    const createdData = await postRes.json();
    const postId = createdData.post.id;

    // Verifica se nasce não aprovado
    expect(createdData.post.approved).toBe(false);

    // 2. Tenta listar posts normais e verifica se ele NÃO aparece
    const listRes = await fetch("http://localhost:3000/api/v1/posts");
    const listData = await listRes.json();
    const foundInList = listData.posts.find(p => p.id === postId);
    expect(foundInList).toBeUndefined();

    // 3. Tenta listar posts pendentes SEM senha (deve falhar)
    const pendingNoAuth = await fetch("http://localhost:3000/api/v1/posts?status=pending");
    expect(pendingNoAuth.status).toBe(401);

    // 4. Lista posts pendentes COM senha correta (deve aparecer lá)
    const pendingAuth = await fetch("http://localhost:3000/api/v1/posts?status=pending&admin_secret=12345");
    expect(pendingAuth.status).toBe(200);
    const pendingData = await pendingAuth.json();
    const foundInPending = pendingData.posts.find(p => p.id === postId);
    expect(foundInPending).toBeDefined();

    // 5. Aprova o post usando a senha
    const approveRes = await fetch(`http://localhost:3000/api/v1/posts/${postId}/approve`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ admin_secret: "12345" }),
    });
    expect(approveRes.status).toBe(200);

    // 6. Confirma que agora ele aparece na listagem pública normal
    const listAgainRes = await fetch("http://localhost:3000/api/v1/posts");
    const listAgainData = await listAgainRes.json();
    const foundNow = listAgainData.posts.find(p => p.id === postId);
    expect(foundNow).toBeDefined();
    expect(foundNow.title).toBe("Post Pendente de Teste");
});
