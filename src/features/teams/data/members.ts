import { Member } from "@/types/member";

export const TEAM_MEMBERS: Member[] = [
  {
    id: "1",
    name: "John Doe",
    email: "john@example.com",
    role: "Owner",
    status: "active",
    avatar:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=32&h=32&q=90&fit=crop",
    lastActive: new Date(Date.now() - 1000 * 60 * 5),
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 30),
    updatedAt: new Date(Date.now() - 1000 * 60 * 30),
  },
  {
    id: "2",
    name: "Jane Smith",
    email: "jane@example.com",
    role: "Admin",
    status: "active",
    avatar:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=32&h=32&q=90&fit=crop",
    lastActive: new Date(Date.now() - 1000 * 60 * 15),
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 20),
    updatedAt: new Date(Date.now() - 1000 * 60 * 60),
  },
  {
    id: "3",
    name: "Mike Johnson",
    email: "mike@example.com",
    role: "Staff",
    status: "pending",
    avatar:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=32&h=32&q=90&fit=crop",
    lastActive: new Date(Date.now() - 1000 * 60 * 60),
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 10),
    updatedAt: new Date(Date.now() - 1000 * 60 * 60 * 2),
  },
  {
    id: "4",
    name: "Sarah Williams",
    email: "sarah@example.com",
    role: "Staff",
    status: "inactive",
    avatar:
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=32&h=32&q=90&fit=crop",
    lastActive: new Date(Date.now() - 1000 * 60 * 60 * 24),
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 5),
    updatedAt: new Date(Date.now() - 1000 * 60 * 60 * 24),
  },
];
