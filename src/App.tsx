import React, { useEffect, useState, lazy, Suspense } from "react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import { useSafeTimers } from "./hooks/useSafeTimers";

// Lazy load components below the fold for better initial load performance
const Skills = lazy(() => import("./components/Skills"));
const Hobbies = lazy(() => import("./components/Hobbies"));
const Showcase = lazy(() => import("./components/Showcase"));
const Contact = lazy(() => import("./components/Contact"));

const App: React.FC = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const { setSafeTimeout, clearSafeTimeout } = useSafeTimers();

  useEffect(() => {
    // Trigger a lightweight fade-in on first paint
    const timeout = setSafeTimeout(() => setIsLoaded(true), 0);
    let retryTimeout: number | undefined;

    const scrollToHash = (retriesLeft = 20) => {
      const hash = window.location.hash.replace("#", "");
      if (!hash) return;

      const el = document.getElementById(hash);
      if (el) {
        // Temporarily disable smooth scrolling so back navigation feels instant
        const html = document.documentElement;
        const prevBehavior = html.style.scrollBehavior;
        html.style.scrollBehavior = "auto";
        const y = el.getBoundingClientRect().top + window.scrollY;
        window.scrollTo({ top: y, behavior: "auto" });
        requestAnimationFrame(() => {
          html.style.scrollBehavior = prevBehavior;
        });
        return;
      }

      if (retriesLeft > 0) {
        retryTimeout = setSafeTimeout(() => scrollToHash(retriesLeft - 1), 120);
      }
    };

    const handleHashChange = () => {
      clearSafeTimeout(retryTimeout);
      scrollToHash();
    };

    // Handle initial load and hash changes (e.g., coming back from launch-console)
    handleHashChange();
    window.addEventListener("hashchange", handleHashChange);

    return () => {
      clearSafeTimeout(timeout);
      clearSafeTimeout(retryTimeout);
      window.removeEventListener("hashchange", handleHashChange);
    };
  }, [clearSafeTimeout, setSafeTimeout]);

  return (
    <div
      className={`min-h-screen transition-opacity duration-700 ease-out ${
        isLoaded ? "opacity-100" : "opacity-0"
      }`}
    >
      <Navbar />
      <main>
        <Hero />
        <About />
        <Suspense fallback={<div className="min-h-screen" />}>
          <Skills />
          <Hobbies />
          <Showcase />
          <Contact />
        </Suspense>
      </main>
    </div>
  );
};

export default App;
