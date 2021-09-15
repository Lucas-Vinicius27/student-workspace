import { ButtonHTMLAttributes } from 'react';
import styles from './styles.module.scss';

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
    estiloButton?: string;
};

export function Button({ estiloButton, ...props }: ButtonProps) {
    const google = estiloButton === 'google' && styles.google;
    const apple = estiloButton === 'apple' && styles.apple;

    let estilo = '';

    if (google) {
        estilo = google;
    }

    if (apple) {
        estilo = apple;
    }

    return (
        <button
            className={`${styles.button} ${estilo}`}
            {...props}
        />
    );
}
