const url = "http://localhost:3000/api/v1/projects";

const newProject = {
  title: "Projeto de Teste Auth",
  description: "Criado pelo teste de autenticação",
  tech_stack: ["C#"],
};

function postProject(headers = {}) {
  return fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json", ...headers },
    body: JSON.stringify(newProject),
  });
}

test("POST /api/v1/projects without key should return 401", async () => {
  const response = await postProject();
  expect(response.status).toBe(401);
});

test("POST /api/v1/projects with wrong key should return 401", async () => {
  const response = await postProject({ Authorization: "Bearer chave-errada" });
  expect(response.status).toBe(401);
});

test("POST /api/v1/projects with malformed header should return 401", async () => {
  const response = await postProject({
    Authorization: process.env.ADMIN_API_KEY,
  });
  expect(response.status).toBe(401);
});

test("POST /api/v1/projects with correct key should return 201", async () => {
  const response = await postProject({
    Authorization: `Bearer ${process.env.ADMIN_API_KEY}`,
  });
  expect(response.status).toBe(201);

  const body = await response.json();
  expect(body.project.title).toBe(newProject.title);
});
