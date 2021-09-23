import { createContext, useState, ReactNode } from "react";
import challenges from '../../challenges.json';

interface Challenge {
    type: string;
    description: string;
    amount: number;
}

interface ChallengesContextData {
    level: number;
    currentXp: number;
    challengesCompleted: number;
    activeChallenge: Challenge | undefined;
    levelUp: () => void;
    startNewChallenge: () => void;
}

interface ChallengesProviderProps {
    children: ReactNode;
}

export const ChallengesContext = createContext({} as ChallengesContextData);

export function ChallengesContextProvider({ children }: ChallengesProviderProps) {
    const [level, setLevel] = useState(1);
    const [currentXp, setCurrentXp] = useState(0);
    const [challengesCompleted, setChallengesCompleted] = useState(0);

    const [activeChallenge, setActiveChallenge] = useState<Challenge>();

    function levelUp() {
        setLevel(level + 1);
    }

    function startNewChallenge() {
        const randomChallengeIndex = Math.floor(Math.random() * challenges.length);
        const challenge = challenges[randomChallengeIndex];

        setActiveChallenge(challenge);
    }

    return (
        <ChallengesContext.Provider value={{
            level,
            currentXp,
            challengesCompleted,
            levelUp,
            startNewChallenge,
            activeChallenge,
        }}>
            {children}
        </ChallengesContext.Provider>
    )
}