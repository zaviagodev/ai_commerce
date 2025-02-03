export interface ScanResultData {
  ticketNumber: string;
  attendeeName: string;
  email: string;
  ticketType: string;
  status: "valid" | "used" | "invalid";
  groupId?: string;
  groupTickets?: {
    ticketNumber: string;
    attendeeName: string;
    ticketType: string;
    status: "valid" | "used" | "invalid";
  }[];
}
