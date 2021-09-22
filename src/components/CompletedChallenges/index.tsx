import styles from './styles.module.scss';

export function CompletedChallenge() {
    return(
        <div className={styles.completedchallengeContainer}>
            <span>Desafios completos</span>
            <span>5</span>
        </div>
    );
}