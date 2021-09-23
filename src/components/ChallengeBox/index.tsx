import { useContext } from 'react';
import { ChallengesContext } from '../../contexts/ChallengesContext';
import styles from './styles.module.scss';

export function ChallengeBox() {
    const { activeChallenge } = useContext(ChallengesContext);

    return (
        <div className={styles.challengeBoxContainer}>
            { activeChallenge ? (
                <div className={styles.challengeActive}>
                    <header>{activeChallenge.amount}</header>

                    <main>
                        <img src={`icons/${activeChallenge.type}.svg`} />
                        <strong>Novo desafio</strong>
                        <p>{activeChallenge.description}</p>
                    </main>

                    <footer>
                        <button
                            type="button"
                            className={styles.failedButton}
                        >
                            Falhei
                        </button>
                        <button
                            type="button"
                            className={styles.succeededButton}
                        >
                            Completei
                        </button>
                    </footer>
                </div>
            ) : (
                <div className={styles.challengeNotActive}>
                <strong>Finalize um ciclo para receber um desáfio</strong>
                <p>
                    <img src="icons/level-up.svg" alt="Level up" />
                    Avance de level completando desáfios
                </p>
            </div>
            ) }
        </div>
    )
}