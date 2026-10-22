import { InViewTitle } from "./components/arc/in-view-title/in-view-title";
import Header from "./components/layout/Header";
import Footer from "./components/layout/Footer";
import Hero from "./components/Hero";
import ProjectPreview from "./components/projects/ProjectPreview";
import ProjectCarousel from "./components/projects/ProjectCarousel";
import { PROJECTS } from "./data/projects";
import { SKILLS } from "./data/skills";
import { HOBBIES } from "./data/hobbies";
import { ArrowUpRight } from "lucide-react";
import { useEffect } from "react";
import styles from "./components/Home.module.css";
export default function App() {
  useEffect(() => {
    // WebKit can restore a hash URL before React has mounted its target.
    // Preserve a restored scroll position, but recover a missed anchor at the top.
    const frame = requestAnimationFrame(() => {
      const navigation = performance.getEntriesByType(
        "navigation",
      )[0] as PerformanceNavigationTiming | undefined;
      if (!window.location.hash && navigation?.type !== "back_forward") {
        // A fresh visit or reload introduces the page from the hero.
        // History traversal still retains the browser's saved position.
        window.scrollTo({ top: 0, left: 0, behavior: "instant" });
      } else if (window.location.hash && window.scrollY === 0) {
        document
          .getElementById(window.location.hash.slice(1))
          ?.scrollIntoView({ behavior: "instant" });
      }
    });
    return () => cancelAnimationFrame(frame);
  }, []);

  return (
    <>
      <Header home />
      <main id="main">
        <Hero />
        <section
          id="about"
          className={`container section ${styles.about}`}
          aria-labelledby="about-title"
        >
          <InViewTitle id="about-title" text="A little about me." />
          <div>
            <p className={styles.lead}>
              I am an Aircraft Systems Engineering undergraduate interested in
              how complex systems behave, from aircraft components to the
              infrastructure that keeps everyday technology running.
            </p>
            <p>
              In school I work with tools like SolidWorks, Ansys Fluent, MATLAB
              and Simulink to study aerodynamics and electromechanical systems.
              At home I run a small homelab, self-host services, and experiment
              with local AI models to learn more about privacy-focused, offline
              tooling.
            </p>
            <p>
              I believe in building reliable systems, whether they’re flying at
              30,000 feet or running quietly in a home server rack.
            </p>
          </div>
        </section>
        <section
          id="skills"
          className={`container section ${styles.skills}`}
          aria-labelledby="skills-title"
        >
          <InViewTitle id="skills-title" text="Engineering, in practice." />
          <p className={styles.sectionIntro}>
            The tools I use to explore, model, and understand how things work.
          </p>
          <div className={styles.list}>
            {SKILLS.map((skill) => (
              <article key={skill.title}>
                <h3>{skill.title}</h3>
                <p>{skill.description}</p>
              </article>
            ))}
          </div>
        </section>
        <section
          id="hobbies"
          className={`container section ${styles.interests}`}
          aria-labelledby="interests-title"
        >
          <InViewTitle id="interests-title" text="Curiosity carries on." />
          <p className={styles.sectionIntro}>
            Outside the classroom, I learn by building and experimenting.
          </p>
          <div className={styles.interestGrid}>
            {HOBBIES.map((hobby) => (
              <article key={hobby.name}>
                <h3>{hobby.name}</h3>
                <p>{hobby.description}</p>
              </article>
            ))}
          </div>
        </section>
        <section
          id="showcase"
          className="container"
          aria-labelledby="work-title"
        >
          <div className={styles.workHeading}>
            <InViewTitle id="work-title" text="Selected projects" />
            <p>Experiments, useful tools, and things I’m learning.</p>
          </div>
          <ProjectPreview project={PROJECTS[0]} index={0} />
          <ProjectCarousel projects={PROJECTS.slice(1)} />
        </section>
        <section
          id="contact"
          className={styles.contact}
          aria-labelledby="contact-title"
        >
          <div className="container">
            <InViewTitle id="contact-title" text="Let’s connect." />
            <p>
              Whether it is a quick hello or an idea you have, I am always up
              for a conversation.
            </p>
            <div className={styles.contactLinks}>
              <a
                className="action-link"
                href="https://www.linkedin.com/in/hairil-johan"
                target="_blank"
                rel="noopener noreferrer"
              >
                LinkedIn
                <ArrowUpRight aria-hidden="true" />
              </a>
              <a
                className="text-link"
                href="https://github.com/hairiljohan"
                target="_blank"
                rel="noopener noreferrer"
              >
                GitHub
                <ArrowUpRight aria-hidden="true" />
              </a>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
