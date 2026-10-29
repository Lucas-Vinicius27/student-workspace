import type { NextApiRequest, NextApiResponse } from 'next'
import { child, database, ref, get } from "../../services/firebase";

type Data = {
    msg?: string;
    level?: number;
    currentXp?: number;
    challengesCompleted?: number;
}

// Caracteres proibidos em chaves do Realtime Database (e "/" mudaria o caminho)
const INVALID_KEY_CHARS = /[.#$[\]/]/;

// Campos que ainda não existem no banco (usuário novo) contam como 0
function toNumber(value: unknown) {
    const number = Number(value);
    return Number.isFinite(number) ? number : 0;
}

export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
    const { id } = req.query;

    if (typeof id !== "string" || id === "" || INVALID_KEY_CHARS.test(id)) {
        return res.status(400).json({ msg: "Informações faltando!" });
    }

    try {
        const snapshot = await get(child(ref(database), `users/${id}`));
        const user = snapshot.val() ?? {};

        return res.status(200).json({
            level: toNumber(user.level),
            currentXp: toNumber(user.currentXp),
            challengesCompleted: toNumber(user.challengesCompleted)
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ msg: "Erro ao buscar os dados do usuário." });
    }
}
