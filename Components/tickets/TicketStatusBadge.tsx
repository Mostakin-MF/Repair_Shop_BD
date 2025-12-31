import { Badge } from '../ui/Badge';
import { TICKET_STATUS } from '@/lib/utils/constants';

interface TicketStatusBadgeProps {
  status: string;
}

export default function TicketStatusBadge({ status }: TicketStatusBadgeProps) {
  const variant = status === TICKET_STATUS.COMPLETED ? 'success' : 'warning';
  const label = status === TICKET_STATUS.COMPLETED ? 'সম্পন্ন' : 'খোলা';

  return (
    <Badge variant={variant}>
      {label}
    </Badge>
  );
}
