import Image, { StaticImageData } from 'next/image';
import { useContext } from 'react';
import { ChallengesContext } from '../../contexts/ChallengesContext';
import { CountdownContext } from '../../contexts/CountdownContext';
import bodyIcon from '../../../public/icons/body.svg';
import eyeIcon from '../../../public/icons/eye.svg';
import levelUpIcon from '../../../public/icons/level-up.svg';
import styles from './styles.module.scss';

// Ícone e descrição de cada tipo de desafio do challenges.json
const challengeIcons: Record<string, { src: StaticImageData; alt: string }> = {
    body: { src: bodyIcon, alt: 'Desafio para o corpo' },
    eye: { src: eyeIcon, alt: 'Desafio para os olhos' },
};

export function ChallengeBox() {
    const { activeChallenge, resetChallenge, completeChallenge } = useContext(ChallengesContext);
    const { resetCountdown } = useContext(CountdownContext);

    function handleChallengeSucceeded() {
        completeChallenge();
        resetCountdown();
    }

    function handleChallengeFailed() {
        resetChallenge();
        resetCountdown();
    }

    const challengeIcon = activeChallenge && challengeIcons[activeChallenge.type];

    return (
        <div className={styles.challengeBoxContainer}>
            { activeChallenge ? (
                <div className={styles.challengeActive}>
                    <header>Ganhe {activeChallenge.amount}xp</header>

                    <main>
                        {challengeIcon && (
                            <Image src={challengeIcon.src} alt={challengeIcon.alt} />
                        )}
                        <strong>Novo desafio</strong>
                        <p>{activeChallenge.description}</p>
                    </main>

                    <footer>
                        <button
                            type="button"
                            className={styles.failedButton}
                            onClick={handleChallengeFailed}
                        >
                            Falhei
                        </button>
                        <button
                            type="button"
                            className={styles.succeededButton}
                            onClick={handleChallengeSucceeded}
                        >
                            Completei
                        </button>
                    </footer>
                </div>
            ) : (
                <div className={styles.challengeNotActive}>
                    <strong>Finalize um ciclo para receber um desafio</strong>
                    <p>
                        <Image src={levelUpIcon} alt="Level up" />
                        Avance de nível completando desafios
                    </p>
                </div>
            )}
        </div>
    )
}