import styles from './styles.module.scss';

export function ChallengeBox() {
    const hasActiveChallenge = true;

    return (
        <div className={styles.challengeBoxContainer}>
            { hasActiveChallenge ? (
                <div className={styles.challengeActive}>
                    <header>Ganhe 400 xp</header>

                    <main>
                        <img src="icons/body.svg" alt="" />
                        <strong>Novo desafio</strong>
                        <p>Corrija a postura</p>
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