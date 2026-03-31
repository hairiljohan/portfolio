import { Cpu, Server, BrainCog } from "lucide-react";
import { Hobby } from "../types";

export const HOBBIES: Hobby[] = [
  {
    name: "Homelabbing",
    description:
      "Building and experimenting with Raspberry Pi and Arduino projects to create custom hardware solutions and explore IoT systems",
    icon: Cpu,
  },
  {
    name: "Self-hosting",
    description:
      "Running privacy-focused infrastructure with Docker containers - Pi-hole for ad-blocking, Unbound for DNS security, OpenWebUI for AI interfaces, and Searxng for private search",
    icon: Server,
  },
  {
    name: "Local AI Models",
    description:
      "Experimenting with offline LLM deployments using LM Studio, Ollama, and ComfyUI to build AI-powered applications without cloud dependency",
    icon: BrainCog,
  },
];
