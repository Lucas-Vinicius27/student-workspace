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
    return (
        <aside className={styles.container}>
            <Image src={logoSmall} alt="Logo do sistema" />
            <nav>
                <ul>
                    <li>
                        <Link href="/home" passHref>
                            <a>
                                {window.location.pathname === "/home" ? (
                                    <Image src={houseBlue} alt="Dashboard" />
                                ) : (
                                    <Image src={houseGray} alt="Dashboard" />
                                )}
                            </a>
                        </Link>
                    </li>
                    <li>
                        <Link href="/ranking" passHref>
                            <a>
                                {window.location.pathname === "/ranking" ? (
                                    <Image src={rankingBlue} alt="Ranking" />
                                ) : (
                                    <Image src={rankingGray} alt="Ranking" />
                                )}
                            </a>
                        </Link>
                    </li>
                    <li>
                        <Link href="/user" passHref>
                            <a>
                                {window.location.pathname === "/user" ? (
                                    <Image src={userBlue} alt="Usuário" />
                                ) : (
                                    <Image src={userGray} alt="Usuário" />
                                )}
                            </a>
                        </Link>
                    </li>
                </ul>
            </nav>
        </aside>
    );
}