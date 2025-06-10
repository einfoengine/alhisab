'use client';

import React from 'react';
import { useParams } from 'next/navigation';
import { Card, CardContent, Typography, Box, Chip, Button, TextField, IconButton, Paper } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import EditIcon from '@mui/icons-material/Edit';
import SendIcon from '@mui/icons-material/Send';
import CloseIcon from '@mui/icons-material/Close';
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
  const [showReplyForm, setShowReplyForm] = React.useState(false);
  const [replyContent, setReplyContent] = React.useState('');

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

  const handleReply = () => {
    setShowReplyForm(true);
  };

  const handleCloseReplyForm = () => {
    setShowReplyForm(false);
    setReplyContent('');
  };

  const handleSendReply = async () => {
    try {
      // Here you would typically make an API call to send the reply
      console.log('Sending reply:', {
        to: message?.sender,
        subject: `Re: ${message?.subject}`,
        content: replyContent,
      });
      
      // Close the form and show success message
      handleCloseReplyForm();
      // You might want to show a success notification here
    } catch (error) {
      console.error('Error sending reply:', error);
      // You might want to show an error notification here
    }
  };

  if (!message) {
    return <Typography>Message not found</Typography>;
  }

  return (
    <Box sx={{ p: 3 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
        <Link href="/messages" passHref>
          <Button startIcon={<ArrowBackIcon />}>
            Back to Messages
          </Button>
        </Link>
        <IconButton 
          color="primary" 
          onClick={handleReply}
          sx={{ 
            backgroundColor: 'primary.main',
            color: 'white',
            '&:hover': {
              backgroundColor: 'primary.dark',
            }
          }}
        >
          <EditIcon />
        </IconButton>
      </Box>
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

      {/* Inline Reply Form */}
      {showReplyForm && (
        <Paper 
          elevation={3} 
          sx={{ 
            mt: 3, 
            p: 2,
            backgroundColor: '#f8f9fa',
            border: '1px solid #e9ecef'
          }}
        >
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
            <Typography variant="subtitle1" fontWeight="bold">
              Reply to Message
            </Typography>
            <IconButton 
              size="small" 
              onClick={handleCloseReplyForm}
              sx={{ color: 'text.secondary' }}
            >
              <CloseIcon />
            </IconButton>
          </Box>
          <Box sx={{ mb: 2 }}>
            <Typography variant="subtitle2" color="text.secondary" gutterBottom>
              To: {message.sender}
            </Typography>
            <Typography variant="subtitle2" color="text.secondary" gutterBottom>
              Subject: Re: {message.subject}
            </Typography>
          </Box>
          <TextField
            fullWidth
            multiline
            rows={4}
            variant="outlined"
            placeholder="Type your reply here..."
            value={replyContent}
            onChange={(e) => setReplyContent(e.target.value)}
            sx={{ 
              mb: 2,
              backgroundColor: 'white',
              '& .MuiOutlinedInput-root': {
                '& fieldset': {
                  borderColor: '#dee2e6',
                },
                '&:hover fieldset': {
                  borderColor: '#adb5bd',
                },
              },
            }}
          />
          <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
            <Button
              variant="contained"
              color="primary"
              endIcon={<SendIcon />}
              onClick={handleSendReply}
              disabled={!replyContent.trim()}
              sx={{ 
                borderRadius: '20px',
                textTransform: 'none',
                px: 3
              }}
            >
              Send Reply
            </Button>
          </Box>
        </Paper>
      )}
    </Box>
  );
};

export default MessageDetailsPage; 