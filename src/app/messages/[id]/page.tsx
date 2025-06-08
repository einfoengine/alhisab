import React from 'react';
import { useParams } from 'next/navigation';
import { Card, CardContent, Typography, Box, Chip, Button } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import Link from 'next/link';

interface Message {
  id: string;
  subject: string;
  sender: string;
  recipient: string;
  date: string;
  status: 'read' | 'unread';
  priority: 'high' | 'medium' | 'low';
  content: string;
}

const MessageDetailsPage: React.FC = () => {
  const params = useParams();
  const messageId = params.id as string;
  const [message, setMessage] = React.useState<Message | null>(null);

  React.useEffect(() => {
    const fetchMessage = async () => {
      try {
        const response = await fetch('/data/messages.json');
        const data = await response.json();
        const foundMessage = data.messages.find((msg: Message) => msg.id === messageId);
        setMessage(foundMessage || null);
      } catch (error) {
        console.error('Error fetching message:', error);
      }
    };

    fetchMessage();
  }, [messageId]);

  if (!message) {
    return <Typography>Message not found</Typography>;
  }

  return (
    <Box sx={{ p: 3 }}>
      <Link href="/messages" passHref>
        <Button startIcon={<ArrowBackIcon />} sx={{ mb: 2 }}>
          Back to Messages
        </Button>
      </Link>
      <Card>
        <CardContent>
          <Typography variant="h5" gutterBottom>
            {message.subject}
          </Typography>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
            <Typography variant="body2" color="text.secondary">
              From: {message.sender}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              To: {message.recipient}
            </Typography>
          </Box>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
            <Typography variant="body2" color="text.secondary">
              Date: {message.date}
            </Typography>
            <Chip label={message.status} color={message.status === 'read' ? 'success' : 'warning'} />
          </Box>
          <Typography variant="body2" color="text.secondary" gutterBottom>
            Priority: <Chip label={message.priority} color={message.priority === 'high' ? 'error' : message.priority === 'medium' ? 'warning' : 'info'} />
          </Typography>
          <Typography variant="body1" sx={{ mt: 2 }}>
            {message.content}
          </Typography>
        </CardContent>
      </Card>
    </Box>
  );
};

export default MessageDetailsPage; 