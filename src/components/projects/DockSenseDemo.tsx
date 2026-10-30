import { useState } from "react";
import { ArrowRight, Cable, Keyboard, Laptop } from "lucide-react";
import styles from "./DockSenseDemo.module.css";

export default function DockSenseDemo() {
  const [docked, setDocked] = useState(false);
  const [brightness, setBrightness] = useState(35);
  const [turnOff, setTurnOff] = useState(true);
  const level = docked && turnOff ? 0 : brightness;
  return (
    <section className={styles.demo} aria-labelledby="docksense-demo-title" id="docksense-demo">
      <div className={styles.heading}>
        <h2 id="docksense-demo-title">Leave the desk. Keep your settings.</h2>
        <p>Try the keyboard backlight flow. This illustration assumes brightness memory is enabled and the lid is open, with no idle dimming.</p>
      </div>
      <fieldset className={styles.controls}>
        <legend>Dock connection</legend>
        <div className={styles.options}>
          <label><input type="radio" name="dock-state" checked={!docked} onChange={() => setDocked(false)} /> Undocked</label>
          <label><input type="radio" name="dock-state" checked={docked} onChange={() => setDocked(true)} /> Docked</label>
        </div>
      </fieldset>
      <label className={styles.toggle}><input type="checkbox" checked={turnOff} onChange={(event) => setTurnOff(event.target.checked)} /> Turn off when docked</label>
      <label className={styles.brightness}>
        <span>Saved undocked brightness <strong>{brightness}%</strong></span>
        <input type="range" min="0" max="100" value={brightness} disabled={docked} onChange={(event) => setBrightness(Number(event.target.value))} />
      </label>
      <p className={styles.hint}>Set a brightness while undocked, then connect and disconnect the dock.</p>
      <div role="status" aria-live="polite" className={styles.result}>
        <div className={styles.flow}>
          <div><Cable size={30} strokeWidth={1.5} aria-hidden="true" /><strong>{docked ? "USB signature found" : "USB signature absent"}</strong><span>{docked ? "Dock connected" : "Mac on its own"}</span></div>
          <ArrowRight className={styles.arrow} aria-hidden="true" />
          <div><Laptop size={30} strokeWidth={1.5} aria-hidden="true" /><strong>DockSense</strong><span>Detects {docked ? "docked" : "undocked"} state</span></div>
          <ArrowRight className={styles.arrow} aria-hidden="true" />
          <div><Keyboard size={30} strokeWidth={1.5} aria-hidden="true" /><strong>Backlight {level}%</strong><span>{docked && turnOff ? `${brightness}% remembered` : "Your chosen brightness"}</span></div>
        </div>
        <div className={styles.meter} aria-hidden="true"><div style={{ width: `${level}%` }} /></div>
        <p>{docked && turnOff ? "The keyboard backlight is off at the desk. Disconnect to restore the saved level once." : docked ? "Turning the backlight off is optional. This example keeps the current brightness while docked." : "The saved brightness is available away from the desk. DockSense restores it once, then leaves manual adjustments alone."}</p>
      </div>
      <p className={styles.note}>Illustration only—no device settings are changed. Dock and menu-bar visibility updates are handled separately by the app’s auto-hide scope.</p>
    </section>
  );
}
