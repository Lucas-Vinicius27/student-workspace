import Image from 'next/image';
import level from '../../../public/icons/level.svg';
import styles from './styles.module.scss';

export function Profile() {
    return(
        <div className={styles.profileContainer}>
            <img src="https://avatars.githubusercontent.com/u/66655145?v=4" alt="Lucas Vinicius" />
            <div>
                <strong>Lucas Vinicius</strong>
                <p>
                    <Image src={level} alt="Level" />
                    <span>Level 1</span>
                </p>
            </div>
        </div>
    );
}