import Image from 'next/image';
import { useContext } from 'react';
import { ChallengesContext } from '../../contexts/ChallengesContext';
import { useAuth } from "../../hooks/useAuth";
import challenges from '../../../challenges.json';
import levelIcon from '../../../public/icons/level.svg';
import styles from './styles.module.scss';

export function Profile() {
    const { level } = useContext(ChallengesContext);
    const { user } = useAuth();

    return(
        <div className={styles.profileContainer}>
            {user?.avatar ? (
                <Image
                    className={styles.avatar}
                    src={user.avatar}
                    alt={user.name}
                    width={88}
                    height={88}
                />
            ) : (
                // Reserva o espaço do avatar enquanto o usuário carrega
                <span className={styles.avatar} />
            )}
            <div>
                <strong>{user?.name}</strong>
                <p>
                    <Image src={levelIcon} alt="Level" />
                    <span>Nível {level} - Desafios por Nível {challenges.length}</span>
                </p>
            </div>
        </div>
    );
}
