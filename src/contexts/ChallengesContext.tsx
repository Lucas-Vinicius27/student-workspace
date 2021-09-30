import { createContext, ReactNode, useEffect, useState } from "react";
import challenges from '../../challenges.json';
import { LevelUpModal } from '../components/LevelUpModal';
import { useAuth } from "../hooks/useAuth";
import { database, ref, update } from "../services/firebase";

interface Challenge {
    type: string;
    description: string;
    amount: number;
}

interface ChallengesContextData {
    level: number;
    currentXp: number;
    xpToNextLevel: number;
    challengesCompleted: number;
    activeChallenge: Challenge | undefined;
    levelUp: () => void;
    startNewChallenge: () => void;
    resetChallenge: () => void;
    completeChallenge: () => void;
    closeLevelUpModal: () => void;
}

interface ChallengesProviderProps {
    children: ReactNode;
    level: number;
    currentXp: number;
    challengesCompleted: number;
}

export const ChallengesContext = createContext({} as ChallengesContextData);

export function ChallengesContextProvider({ children, ...rest }: ChallengesProviderProps) {
    const { user } = useAuth();
    const [level, setLevel] = useState(rest.level);
    const [currentXp, setCurrentXp] = useState(rest.currentXp);
    const [challengesCompleted, setChallengesCompleted] = useState(rest.challengesCompleted);

    const [activeChallenge, setActiveChallenge] = useState<Challenge>();
    const [isLevelUpModalOpen, setIsLevelUpModalOpen] = useState(false);

    const xpToNextLevel = Math.pow((level + 1) * 6, 2);

    useEffect(() => {
        Notification.requestPermission();
    }, [])

    useEffect(() => {
        update(ref(database, `users/${user?.id}`), {
            currentXp,
            level,
            challengesCompleted
        });
    }, [level, currentXp, challengesCompleted, user?.id])

    function levelUp() {
        setLevel(level + 1);
        setIsLevelUpModalOpen(true);
    }

    function closeLevelUpModal() {
        setIsLevelUpModalOpen(false);
    }

    function startNewChallenge() {
        const randomChallengeIndex = Math.floor(Math.random() * challenges.length);
        const challenge = challenges[randomChallengeIndex];

        setActiveChallenge(challenge);

        new Audio('/notification.mp3').play();

        if (Notification.permission === 'granted') {
            new Notification('Novo desafio', {
                body: `Valendo ${challenge.amount}xp!`
            })
        }
    }

    function resetChallenge() {
        setActiveChallenge(undefined);
    }

    function completeChallenge() {
        if (!activeChallenge) {
            return;
        }

        const { amount } = activeChallenge;

        let finalXp = currentXp + amount;

        if (finalXp >= xpToNextLevel) {
            finalXp = finalXp - xpToNextLevel;
            levelUp();
        }

        setCurrentXp(finalXp);
        setActiveChallenge(undefined);
        setChallengesCompleted(challengesCompleted + 1);
    }

    return (
        <ChallengesContext.Provider value={{
            level,
            currentXp,
            xpToNextLevel,
            challengesCompleted,
            levelUp,
            startNewChallenge,
            activeChallenge,
            resetChallenge,
            completeChallenge,
            closeLevelUpModal,
        }}>
            {children}
            {isLevelUpModalOpen && <LevelUpModal />}
        </ChallengesContext.Provider>
    )
}