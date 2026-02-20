const store = new Map(); // { ip → { count, resetAt } }

const WINDOW_MS = 60 * 1000; // janela de 1 minuto
const MAX_REQUESTS = 3;       // máximo 3 comentários por minuto por IP

export function rateLimit(ip) {
    const now = Date.now();
    const record = store.get(ip);

    if (!record || now > record.resetAt) {
        // nova janela
        store.set(ip, { count: 1, resetAt: now + WINDOW_MS });
        return { allowed: true, remaining: MAX_REQUESTS - 1 };
    }

    if (record.count >= MAX_REQUESTS) {
        const retryAfter = Math.ceil((record.resetAt - now) / 1000);
        return { allowed: false, retryAfter };
    }

    record.count += 1;
    return { allowed: true, remaining: MAX_REQUESTS - record.count };
}

// Limpa entradas expiradas a cada 5 minutos para não vazar memória
setInterval(() => {
    const now = Date.now();
    for (const [ip, record] of store.entries()) {
        if (now > record.resetAt) store.delete(ip);
    }
}, 5 * 60 * 1000);
