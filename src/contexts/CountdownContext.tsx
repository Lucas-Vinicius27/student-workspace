import { useState, useEffect, useContext, createContext, ReactNode } from 'react';
import { ChallengesContext } from '../contexts/ChallengesContext';

interface CountdownContextData {
    minutes: number;
    seconds: number;
    hasFinished: boolean;
    isActive: boolean;
    startCountdown: () => void;
    resetCountdown: () => void;
}

interface CountdownProviderProps {
    children: ReactNode;
}

export const CountdownContext = createContext({} as CountdownContextData);

export function CountdownContextProvider({ children }: CountdownProviderProps) {
    const { startNewChallenge } = useContext(ChallengesContext);

    const [time, setTime] = useState(0.1 * 60);
    const [isActive, setIsActive] = useState(false);
    const [hasFinished, setHasFinished] = useState(false);

    const minutes = Math.floor(time / 60);
    const seconds = time % 60;

    function startCountdown() {
        setIsActive(true);
    }

    function resetCountdown() {
        setIsActive(false);
        setHasFinished(false);
        setTime(0.1 * 60);
    }

    useEffect(() => {
        if (isActive && time > 0) {
            const countdownTimeout = setTimeout(() => {
                const newTime = time - 1;
                setTime(newTime);

                if (newTime === 0) {
                    setHasFinished(true);
                    setIsActive(false);
                    startNewChallenge();
                }
            }, 1000);

            // Cancela o timer pendente ao abandonar o ciclo ou desmontar
            return () => clearTimeout(countdownTimeout);
        }
    }, [isActive, time, startNewChallenge]);

    return (
        <CountdownContext.Provider value={{
            minutes,
            seconds,
            hasFinished,
            isActive,
            startCountdown,
            resetCountdown,
        }}>
            {children}
        </CountdownContext.Provider>
    )
}