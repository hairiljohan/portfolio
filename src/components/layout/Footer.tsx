import styles from "./Footer.module.css";
export default function Footer() {
  return (
    <footer className={`container ${styles.footer}`}>
      <span>© {new Date().getFullYear()} Hairil Johan</span>
      <a href="#hero">Back to top ↑</a>
    </footer>
  );
}
