import { useContext } from 'react';
import { ChallengesContext } from '../../contexts/ChallengesContext';
import styles from './styles.module.scss';

export function CompletedChallenge() {
    const { challengesCompleted } = useContext(ChallengesContext);

    return(
        <div className={styles.completedchallengeContainer}>
            <span>Desafios completos</span>
            <span>{challengesCompleted}</span>
        </div>
    );
}