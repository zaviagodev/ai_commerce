import { Crown, Shield, Users2 } from "lucide-react";

export const ROLES = {
  Owner: { color: "yellow", icon: Crown },
  Admin: { color: "blue", icon: Shield },
  Staff: { color: "gray", icon: Users2 },
} as const;
