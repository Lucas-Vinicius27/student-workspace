import { useRouter } from 'next/dist/client/router';
import Image from 'next/image';
import Link from 'next/link';
import houseBlue from '../../../public/icons/house-blue.svg';
import houseGray from '../../../public/icons/house-gray.svg';
import rankingBlue from '../../../public/icons/ranking-blue.svg';
import rankingGray from '../../../public/icons/ranking-gray.svg';
import userBlue from '../../../public/icons/user-blue.svg';
import userGray from '../../../public/icons/user-gray.svg';
import logoSmall from '../../../public/logo-small.svg';
import styles from './styles.module.scss';

export function Navigation() {
    const router = useRouter();

    return (
        <aside className={styles.container}>
            <div className={styles.logo}>
                <Image src={logoSmall} alt="Logo do sistema" />
            </div>
            <nav>
                <ul>
                    <li>
                        <div className={styles.containerLi}>
                            <div className={
                                router.pathname === "/home" ? styles.active : ""
                            }></div>
                            <Link href="/home" passHref>
                                <a>
                                    {router.pathname === "/home" ? (
                                        <Image src={houseBlue} alt="Dashboard" />
                                    ) : (
                                        <Image src={houseGray} alt="Dashboard" />
                                    )}
                                </a>
                            </Link>
                        </div>
                    </li>
                    <li>
                        <div className={styles.containerLi}>
                            <div className={
                                router.pathname === "/ranking" ? styles.active : ""
                            }></div>
                            <Link href="/ranking" passHref>
                                <a>
                                    {router.pathname === "/ranking" ? (
                                        <Image src={rankingBlue} alt="Ranking" />
                                    ) : (
                                        <Image src={rankingGray} alt="Ranking" />
                                    )}
                                </a>
                            </Link>
                        </div>
                    </li>
                    <li>
                        <div className={styles.containerLi}>
                            <div className={
                                router.pathname === "/user" ? styles.active : ""
                            }></div>
                            <Link href="/user" passHref>
                                <a>
                                    {router.pathname === "/user" ? (
                                        <Image src={userBlue} alt="Usuário" />
                                    ) : (
                                        <Image src={userGray} alt="Usuário" />
                                    )}
                                </a>
                            </Link>
                        </div>
                    </li>
                </ul>
            </nav>
        </aside>
    );
}