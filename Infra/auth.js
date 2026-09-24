import { createHash, timingSafeEqual } from "crypto";

// Chave de administrador lida do ambiente. ADMIN_SECRET é o nome legado,
// mantido para não quebrar ambientes que ainda não definiram ADMIN_API_KEY.
function getAdminKey() {
    return process.env.ADMIN_API_KEY || process.env.ADMIN_SECRET || "";
}

function sha256(value) {
    return createHash("sha256").update(value).digest();
}

// Compara em tempo constante. O hash iguala os tamanhos, então o tempo
// não revela nem o conteúdo nem o comprimento da chave.
function safeEqual(a, b) {
    return timingSafeEqual(sha256(a), sha256(b));
}

export function isAdmin(req) {
    const adminKey = getAdminKey();
    if (!adminKey) return false; // sem chave configurada, ninguém é admin

    const header = req.headers.authorization || "";
    const [scheme, token] = header.split(" ");
    if (scheme !== "Bearer" || !token) return false;

    return safeEqual(token, adminKey);
}

// Retorna true se autorizado; caso contrário já responde 401.
export function requireAdmin(req, res) {
    if (isAdmin(req)) return true;
    res.status(401).json({ error: "Não autorizado" });
    return false;
}
