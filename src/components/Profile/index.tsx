import { useContext } from 'react';
import { ChallengesContext } from '../../contexts/ChallengesContext';
import { useAuth } from "../../hooks/useAuth";
import challenges from '../../../challenges.json';
import styles from './styles.module.scss';

export function Profile() {
    const { level } = useContext(ChallengesContext);
    const { user } = useAuth();

    return(
        <div className={styles.profileContainer}>
            <img src={user?.avatar} alt={user?.name} />
            <div>
                <strong>{user?.name}</strong>
                <p>
                    <img src="icons/level.svg" alt="Level" />
                    <span>Nível {level} - Desafios por Nível {challenges.length}</span>
                </p>
            </div>
        </div>
    );
}