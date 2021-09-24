import { createContext, useState, ReactNode, useEffect } from "react";
import Cookies from 'js-cookie';
import { LevelUpModal } from '../components/LevelUpModal';
import challenges from '../../challenges.json';

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
    const [level, setLevel] = useState(rest.level ?? 1);
    const [currentXp, setCurrentXp] = useState(rest.currentXp ?? 0);
    const [challengesCompleted, setChallengesCompleted] = useState(rest.challengesCompleted ?? 0);

    const [activeChallenge, setActiveChallenge] = useState<Challenge>();
    const [isLevelUpModalOpen, setIsLevelUpModalOpen] = useState(false);

    const xpToNextLevel = Math.pow((level + 1) * 4, 2);

    useEffect(() => {
        Notification.requestPermission();
    }, [])

    useEffect(() => {
        Cookies.set('level', String(level));
        Cookies.set('currentXp', String(currentXp));
        Cookies.set('challengesCompleted', String(challengesCompleted));
    }, [level, currentXp, challengesCompleted])
    
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