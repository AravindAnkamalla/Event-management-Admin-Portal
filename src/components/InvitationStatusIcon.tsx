import React from "react";
import { MailCheck, MailWarning, MailX } from "lucide-react";

interface Props {
  status: string;
}

const InvitationStatusIcon: React.FC<Props> = ({ status }) => {
  console.log("InvitationStatusIcon rendered with status:", status);
  switch (status) {
    case "READY":
      return (
        <span title="Ready to Invite" className="text-yellow-500">
          <MailWarning size={18} />
        </span>
      );
    case "SENT":
      return (
        <span title="Invitation Sent" className="text-blue-500">
          <MailCheck size={18} />
        </span>
      );
    case "FAILED":
      return (
        <span title="Invitation Failed" className="text-red-500">
          <MailX size={18} />
        </span>
      );
    default:
      return (
        <span title="Unknown Status" className="text-gray-400">
          <MailWarning size={18} />
        </span>
      );
  }
};

export default InvitationStatusIcon;
