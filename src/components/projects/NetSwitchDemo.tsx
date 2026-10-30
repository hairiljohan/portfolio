import { useState } from "react";
import { ArrowRight, Globe2, Home, Laptop, Network, ShieldCheck, WifiOff } from "lucide-react";
import styles from "./NetSwitchDemo.module.css";

const networks = [
  { id: "home", label: "Home", icon: Home },
  { id: "away", label: "Away", icon: Globe2 },
  { id: "trusted", label: "Trusted network", icon: ShieldCheck },
  { id: "unknown", label: "Unidentified Wi-Fi", icon: WifiOff },
] as const;
type NetworkId = (typeof networks)[number]["id"];

export default function NetSwitchDemo() {
  const [network, setNetwork] = useState<NetworkId>("home");
  const [manageTailscale, setManageTailscale] = useState(false);
  const [appRunning, setAppRunning] = useState(false);
  const isHome = network === "home";
  const unknown = network === "unknown";
  const dns = appRunning ? "Public DNS" : unknown ? "DNS unchanged" : isHome ? "Home DNS" : "Public DNS";
  const tailscale = !manageTailscale ? "Not managed" : unknown ? "Unchanged" : network === "away" ? "Connected" : "Disconnected";
  const explanation = appRunning
    ? "The app override takes priority: Public DNS is used by all apps on the active connection. Tailscale still follows the network rule."
    : unknown
      ? "With Unknown Wi-Fi set to No Change, DNS stays as it is. Tailscale automation also leaves the connection unchanged."
      : isHome
        ? "A saved home Wi-Fi name or Ethernet router selects Home DNS. Home networks are also trusted for Tailscale."
        : network === "trusted"
          ? "An additional trusted network keeps Tailscale disconnected when managed. It does not select Home DNS."
          : "On an identified network away from home, this example uses Public DNS. Tailscale connects when management is enabled.";

  return (
    <section id="netswitch-demo" className={styles.demo} aria-labelledby="netswitch-demo-title">
      <div className={styles.heading}>
        <h2 id="netswitch-demo-title">A different network. The right settings.</h2>
        <p>Try a scenario to see how the rules work. This illustration does not change your network settings.</p>
      </div>
      <fieldset className={styles.scenarios}>
        <legend>Where is your Mac?</legend>
        <div className={styles.options}>
          {networks.map(({ id, label, icon: Icon }) => (
            <label key={id} className={styles.option}>
              <input type="radio" name="netswitch-network" value={id} checked={network === id} onChange={() => setNetwork(id)} />
              <Icon size={18} aria-hidden="true" />
              <span>{label}</span>
            </label>
          ))}
        </div>
      </fieldset>
      <div className={styles.toggles}>
        <label><input type="checkbox" checked={manageTailscale} onChange={(event) => setManageTailscale(event.target.checked)} /> Manage Tailscale</label>
        <label><input type="checkbox" checked={appRunning} onChange={(event) => setAppRunning(event.target.checked)} /> Whitelisted app running</label>
      </div>
      <div role="status" aria-live="polite" aria-atomic="true" className={styles.result}>
        <div key={`${network}-${manageTailscale}-${appRunning}`} className={styles.flow} data-network-flow>
          <div className={styles.source}>
            <Laptop size={32} strokeWidth={1.5} aria-hidden="true" />
            <strong>Your Mac</strong>
            <span>{networks.find((item) => item.id === network)?.label}</span>
          </div>
          <ArrowRight className={styles.arrow} aria-hidden="true" />
          <div className={styles.agent}>
            <Network size={30} strokeWidth={1.5} aria-hidden="true" />
            <strong>NetSwitch</strong>
            <span>{appRunning ? "App override" : "Network policy"}</span>
          </div>
          <ArrowRight className={styles.arrow} aria-hidden="true" />
          <dl className={styles.outputs}>
            <div><dt>DNS profile</dt><dd>{dns}</dd></div>
            <div><dt>Tailscale</dt><dd>{tailscale}</dd></div>
          </dl>
        </div>
        <p className={styles.explanation}>{explanation}</p>
      </div>
      <p className={styles.note}>Example policy: Public DNS away from home; no DNS change on unidentified Wi-Fi. Both are configurable. Tailscale results assume it is installed and ready.</p>
    </section>
  );
}
