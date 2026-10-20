import { ArrowDown, ArrowUpRight } from "lucide-react";
import styles from "./Home.module.css";
export default function Hero() {
  return (
    <section
      id="hero"
      className={`container ${styles.hero}`}
      aria-labelledby="introduction"
    >
      <h1 id="introduction">
        Hairil Johan<span>.</span>
      </h1>
      <p className={styles.headline}>
        Keeping complex aircraft systems
        <br className={styles.desktopBreak} /> and everyday tech running
        reliably.
      </p>
      <p className={styles.role}>Aircraft Systems Engineering undergraduate.</p>
      <div className={styles.actions}>
        <a className="action-link" href="#showcase">
          View projects
          <ArrowDown aria-hidden="true" />
        </a>
        <a className="text-link" href="#contact">
          Get in touch
          <ArrowUpRight aria-hidden="true" />
        </a>
      </div>
    </section>
  );
}
