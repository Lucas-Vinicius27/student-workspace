import { useRouter } from 'next/dist/client/router';
import Cookies from "js-cookie";
import Image from 'next/image';
import Link from 'next/link';
import { signOut } from 'firebase/auth';
import { auth } from '../../services/firebase';
import houseBlue from '../../../public/icons/house-blue.svg';
import houseGray from '../../../public/icons/house-gray.svg';
import rankingBlue from '../../../public/icons/ranking-blue.svg';
import rankingGray from '../../../public/icons/ranking-gray.svg';
import logoutSVG from '../../../public/icons/logout.svg';
import logoSmall from '../../../public/logo-small.svg';
import styles from './styles.module.scss';

export function Navigation() {
    const router = useRouter();

    async function logout() {
        await signOut(auth).then(() => {
            Cookies.remove("sessao");
            alert("Até logo! \u{1F44B}\u{1F601}");
            router.push("/");
        }).catch(error => {
            console.log(error);
        });
    };

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
                    {/* <li>
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
                    </li> */}
                    <li>
                        <div className={styles.containerLi}>
                            <Image src={logoutSVG} alt="Logout" onClick={logout} />
                        </div>
                    </li>
                </ul>
            </nav>
        </aside>
    );
}