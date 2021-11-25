import type { NextApiRequest, NextApiResponse } from 'next'
import { child, database, ref, get } from "../../services/firebase";


export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const id = req.query?.id;

    if (id === undefined) {
        return res.status(400).json({ msg: "Informações faltando!" });
    }

    let level;
    let currentXp;
    let challengesCompleted;

    await get(
        child(ref(database), `users/${id}`)
    ).then(snapshot => {
        level = snapshot.val().level;
        currentXp = snapshot.val().currentXp;
        challengesCompleted = snapshot.val().challengesCompleted;
    }).catch(error => {
        console.log(error);
    });

    return res.status(200).json({
        level,
        currentXp,
        challengesCompleted
    });
}
