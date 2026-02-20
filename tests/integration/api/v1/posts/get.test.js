test("GET /api/v1/posts should return 200 with posts array and pagination", async () => {
    const response = await fetch("http://localhost:3000/api/v1/posts");
    expect(response.status).toBe(200);

    const body = await response.json();
    expect(body).toHaveProperty("posts");
    expect(Array.isArray(body.posts)).toBe(true);
    expect(body).toHaveProperty("pagination");
    expect(body.pagination).toHaveProperty("total");
    expect(body.pagination).toHaveProperty("pages");
});
