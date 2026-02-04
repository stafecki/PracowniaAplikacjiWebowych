import styles from './Categories.module.scss';
export default function Categories(){
    return <div className={styles.Categories}>
        <h1>Kategorie</h1>
        <p>Przeglądaj wpisy według kategorii</p>
        <ul>
            <li>
                <a href="#">
                    Technologia
                </a>
            </li>
            <li>
                <a href="#">
                    Zdrowie
                </a>
            </li>
            <li>
                <a href="#">
                    Podróże
                </a>
            </li>
            <li>
                <a href="#">
                    Kultura
                </a>
            </li>
            <li>
                <a href="#">
                    Edukacja
                </a>
            </li>
        </ul>

    </div>
}
