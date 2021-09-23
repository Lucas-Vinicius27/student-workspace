import { useContext } from 'react';
import { ChallengesContext } from '../../contexts/ChallengesContext';
import level from '../../../public/icons/level.svg';
import styles from './styles.module.scss';

export function Profile() {
    const { level } = useContext(ChallengesContext);

    return(
        <div className={styles.profileContainer}>
            <img src="https://avatars.githubusercontent.com/u/66655145?v=4" alt="Lucas Vinicius" />
            <div>
                <strong>Lucas Vinicius</strong>
                <p>
                    <img src="icons/level.svg" alt="Level" />
                    <span>Level {level}</span>
                </p>
            </div>
        </div>
    );
}