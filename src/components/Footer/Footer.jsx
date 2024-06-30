import styles from "./Footer.module.css";

function Footer({ children }) {
  return (
    <>
      <footer className={styles.footer}>
        {children}
        <p className={styles.copyright}>
          &copy; Copyright {new Date().getFullYear()} by{" "}
          <a
            className={styles.link}
            href="https://github.com/fpS-AUDIO"
            target="_blank"
            rel="noopener noreferrer"
          >
            Alexander Ivanov
          </a>
        </p>
      </footer>
    </>
  );
}

export default Footer;
