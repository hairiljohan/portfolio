import Header from "./components/layout/Header";
import Footer from "./components/layout/Footer";
import Hero from "./components/Hero";
import ProjectPreview from "./components/projects/ProjectPreview";
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
      if (window.location.hash && window.scrollY === 0) {
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
          <h2 id="about-title">A little about me.</h2>
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
          <h2 id="skills-title">Engineering, in practice.</h2>
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
          <h2 id="interests-title">Curiosity carries on.</h2>
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
            <h2 id="work-title">Selected projects</h2>
            <p>Experiments, useful tools, and things I’m learning.</p>
          </div>
          {PROJECTS.map((project, index) => (
            <ProjectPreview key={project.id} project={project} index={index} />
          ))}
        </section>
        <section
          id="contact"
          className={styles.contact}
          aria-labelledby="contact-title"
        >
          <div className="container">
            <h2 id="contact-title">Let’s connect.</h2>
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
