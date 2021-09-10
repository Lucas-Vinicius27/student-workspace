import Image from 'next/image';
import Link from 'next/link';
import logoSmall from '../../../public/logo-small.svg';
import house from '../../../public/icons/house.svg';
import user from '../../../public/icons/user.svg';
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
                                <Image src={house} alt="Dashboard" />
                            </a>
                        </Link>
                    </li>
                    <li>
                        <Image src={user} alt="Usuário" />
                    </li>
                </ul>
            </nav>
        </aside>
    );
}