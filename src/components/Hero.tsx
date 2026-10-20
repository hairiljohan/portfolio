import { ArrowDown, ArrowUpRight } from "lucide-react";
import styles from "./Home.module.css";
import { TextReveal } from "./beui/text-reveal";
export default function Hero() {
  return (
    <section
      id="hero"
      className={`container ${styles.hero}`}
      aria-labelledby="introduction"
    >
      <h1 id="introduction">
        <TextReveal text="Hairil Johan" stagger={0.04} blur={2} yOffset={6}>
          <span className={styles.period}>.</span>
        </TextReveal>
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
