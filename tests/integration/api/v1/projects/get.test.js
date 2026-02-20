test("GET /api/v1/projects should return 200 with projects array", async () => {
    const response = await fetch("http://localhost:3000/api/v1/projects");
    expect(response.status).toBe(200);

    const body = await response.json();
    expect(body).toHaveProperty("projects");
    expect(Array.isArray(body.projects)).toBe(true);
});
