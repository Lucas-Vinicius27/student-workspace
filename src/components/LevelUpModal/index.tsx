import Image from 'next/image';
import { useContext } from 'react';
import { ChallengesContext } from '../../contexts/ChallengesContext'
import closeIcon from '../../../public/icons/close.svg';
import styles from './styles.module.scss';

export function LevelUpModal() {
    const { level, closeLevelUpModal } = useContext(ChallengesContext);

    return (
        <div className={styles.overlay}>
        <div className={styles.container}>
            <header>{level}</header>
            <strong>Parabéns</strong>
            <p>Você alcançou um novo nível.</p>
            <button type="button" onClick={closeLevelUpModal}>
                <Image src={closeIcon} alt="Fechar modal" />
            </button>
        </div>
    </div>
    ) 
}