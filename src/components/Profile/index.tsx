import styles from './styles.module.scss';

export function Profile() {
    return(
        <div className={styles.profileContainer}>
            <img src="https://avatars.githubusercontent.com/u/66655145?v=4" alt="Lucas Vinicius" />
            <div>
                <strong>Lucas Vinicius</strong>
                <p>
                    <img src="icons/level.svg" alt="Level" />
                    Level 1
                </p>
            </div>
        </div>
    );
}