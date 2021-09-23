import { useContext } from 'react';
import { ChallengesContext } from '../../contexts/ChallengesContext';
import { useAuth } from "../../hooks/useAuth";
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
                    <span>Level {level}</span>
                </p>
            </div>
        </div>
    );
}