import { Codepen, Wind, FunctionSquare } from "lucide-react";
import { Skill } from "../types";

export const SKILLS: Skill[] = [
  {
    title: "SolidWorks",
    description:
      "Certified SolidWorks Associate with proficiency in parametric 3D modeling, assembly design, and technical drawing creation for mechanical and aerospace components.",
    icon: Codepen,
    color: "bg-red-500",
  },
  {
    title: "CFD Analysis",
    description:
      "Conducted aerodynamic studies using Ansys Fluent to investigate airfoil performance characteristics, analysing lift and drag coefficients through 2D and 3D computational fluid dynamics simulations.",
    icon: Wind,
    color: "bg-blue-500",
  },
  {
    title: "MATLAB & Simulink",
    description:
      "Applied MATLAB for fluid dynamics analysis of laminar and turbulent flow regimes, and developed AC motor control simulations in Simulink for electromechanical systems modelling.",
    icon: FunctionSquare,
    color: "bg-orange-500",
  },
];
