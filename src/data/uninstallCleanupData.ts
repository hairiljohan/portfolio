export type InfoCard = {
  title: string;
  description: string | string[];
  label?: string;
};

export const handleCards: InfoCard[] = [
  {
    title: "Leftover files",
    description:
      "Searches for files and folders whose names still contain the app name long after it has been dragged to the trash.",
  },
  {
    title: "Safe checks",
    description:
      "Keeps the human in the loop: results are meant to be reviewed with ChatGPT or manually before anything is deleted.",
  },
  {
    title: "Finishing pass",
    description:
      "Helps me leave fewer traces behind so that repeated installs and uninstalls do not slowly clutter the system.",
  },
];

export const footerCards: InfoCard[] = [
  {
    label: "Stack",
    title: "macOS Script Editor · shell · ChatGPT",
    description:
      "Script Editor gives me a small native prompt, the shell does the heavy lifting with a single reusable command.",
  },
  {
    label: "Status",
    title: "Personal utility",
    description:
      "This is a personal tool I use on my own Mac when I am uninstalling apps. It is not polished for public release, but it already makes cleanup feel calmer and more deliberate.",
  },
];
