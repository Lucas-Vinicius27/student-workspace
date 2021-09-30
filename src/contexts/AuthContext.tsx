import { createContext, ReactNode, useEffect, useState } from "react";
import {
    auth,
    GoogleAuthProvider,
    signInWithPopup,
    database,
    get,
    ref,
    set,
    child
} from "../services/firebase";

type User = {
    id: string;
    name: string;
    avatar: string;
    token: string | undefined;
}

type AuthContextType = {
    user: User | undefined;
    signInWithGoogle: () => Promise<void>;
};

type AuthContextProviderProps = {
    children: ReactNode;
}

export const AuthContext = createContext({} as AuthContextType);

export function AuthContextProvider(props: AuthContextProviderProps) {
    const [user, setUser] = useState<User>();

    const handleUser = (currentUser: User) => {
        setUser(currentUser);

        get(
            child(ref(database), `users/${currentUser.id}`)
        ).then(snapshot => {
            if (!snapshot.exists()) {
                set(ref(database, `users/${currentUser.id}`), {
                    id: currentUser.id,
                    name: currentUser.name,
                    avatar: currentUser.avatar,
                    level: 0,
                    currentXp: 0,
                    challengesCompleted: 0
                });
            }
        }).catch(error => {
            console.log(error);
        });
    };

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(async user => {
            if (user) {
                const { displayName, photoURL, uid } = user;
                const getTokenUser = await auth.currentUser?.getIdTokenResult();
                const token = getTokenUser?.token;

                if (!displayName || !photoURL) {
                    throw new Error("Missing information from Google Account!");
                }

                handleUser({
                    id: uid,
                    name: displayName,
                    avatar: photoURL,
                    token
                });
            }
        });

        return () => unsubscribe();
    }, []);

    async function signInWithGoogle() {
        const provider = new GoogleAuthProvider();

        const result = await signInWithPopup(auth, provider).catch(error => {
            if (error.code === "auth/popup-closed-by-user") {
                alert("Você fechou popup do Google.");
            }
        });

        if (result?.user) {
            const { displayName, photoURL, uid } = result.user;
            const getTokenUser = await auth.currentUser?.getIdTokenResult();
            const token = getTokenUser?.token;

            if (!displayName || !photoURL) {
                throw new Error("Missing information from Google Account!");
            }

            handleUser({
                id: uid,
                name: displayName,
                avatar: photoURL,
                token
            });
        }
    }

    return (
        <AuthContext.Provider value={{ user, signInWithGoogle }}>
            {props.children}
        </AuthContext.Provider>
    );
}
