import { createContext, ReactNode, useEffect, useState } from "react";
import { auth, GoogleAuthProvider, signInWithPopup } from "../services/firebase";

type User = {
    id: string;
    name: string;
    avatar: string;
    token: string;
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

    const handleUser = async (currentUser: User) => {
        setUser(currentUser);
    };

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(async user => {
            if (user) {
                const { displayName, photoURL, uid, getIdToken } = user;
                const token = await getIdToken();

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
            const { displayName, photoURL, uid, getIdToken } = result.user;
            const token = await getIdToken();

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
