import React, { useState } from 'react';
import { Paper, Typography, Box, TextField, Button, Stack } from '@mui/material';
import { Link } from 'react-router-dom';
import { useTheme, alpha } from '@mui/material/styles';
import AssessmentIcon from '@mui/icons-material/Assessment';
import SendIcon from '@mui/icons-material/Send';
import axios from '../../../axios';

const AISection = ({ entries, setEntries, onUpdateEntries }) => {
  const [chatMessages, setChatMessages] = useState([]);
  const [chatInput, setChatInput] = useState('');
  const [isChatLoading, setIsChatLoading] = useState(false);
  const [sessionId, setSessionId] = useState(null);
  const [showAnalyzeButton, setShowAnalyzeButton] = useState(entries.length > 0);
  const theme = useTheme();

  const calculateProgressHash = (entries) => {
    const hashInput = entries.map(entry => 
      `${entry.date}-${entry.pushUps}-${entry.pullUps}-${entry.dips}`
    ).join('|');
    return hashInput;
  };

  const analyzeProgress = async () => {
    if (entries.length === 0) return;

    setIsChatLoading(true);
    try {
      const recentEntries = entries.slice(-3);
      const latestEntry = entries[entries.length - 1];
      const firstEntry = entries[0];
      const progressHash = calculateProgressHash(entries);
      
      const progressContext = `You are an expert calisthenics coach. Analyze this specific training data (ID: ${progressHash}).
Stats:
• Push-ups: ${latestEntry.pushUps} (started: ${firstEntry.pushUps})
• Pull-ups: ${latestEntry.pullUps} (started: ${firstEntry.pullUps})
• Dips: ${latestEntry.dips} (started: ${firstEntry.dips})
Days trained: ${Math.round((new Date(latestEntry.date) - new Date(firstEntry.date)) / (1000 * 60 * 60 * 24))}

Recent logs:
${recentEntries.map(entry => 
  `[${new Date(entry.date).toLocaleDateString()}] Push-ups: ${entry.pushUps}, Pull-ups: ${entry.pullUps}, Dips: ${entry.dips}`
).join('\n')}

Provide deterministic coaching advice using this exact format:
💪 MAIN FOCUS
[Single priority based on numbers]
📈 PROGRESS ANALYSIS
• [Strongest exercise stats]
• [Weakest exercise stats]
• [Overall trend observation]
🎯 ACTION STEPS
• [Specific form cue]
• [Next target numbers]
• [Recovery tip]

Keep response concise and data-driven. Use exact numbers.`;

      const response = await axios.post('/chat', {
        message: progressContext,
        sessionId: sessionId,
        progressHash
      });

      const formattedReply = response.data.reply
        .replace(/💪|📈|🎯/g, match => `\n${match}`)
        .replace(/\n\n+/g, '\n');

      setChatMessages(prev => [...prev, {
        text: formattedReply,
        fromUser: false,
        timestamp: new Date().toISOString(),
        progressHash
      }]);

    } catch (error) {
      console.error('Error analyzing progress:', error);
      setChatMessages(prev => [...prev, {
        text: 'Sorry, there was an error analyzing your progress. Please try again.',
        fromUser: false,
        timestamp: new Date().toISOString()
      }]);
    } finally {
      setIsChatLoading(false);
    }
  };

  const handleChatSend = async () => {
    if (!chatInput.trim()) return;

    const newMessage = { text: chatInput, fromUser: true };
    setChatMessages(prev => [...prev, newMessage]);
    setChatInput('');
    setIsChatLoading(true);

    try {
      const response = await axios.post('/chat', {
        message: chatInput,
        sessionId: sessionId
      });
      setChatMessages(prev => [...prev, { text: response.data.reply, fromUser: false }]);
    } catch (error) {
      console.error('Error sending message:', error);
      setChatMessages(prev => [...prev, {
        text: 'Sorry, an error occurred. Please try again.',
        fromUser: false
      }]);
    } finally {
      setIsChatLoading(false);
    }
  };

  return (
    <Paper 
      elevation={theme.palette.mode === 'dark' ? 2 : 3}
      sx={{ 
        p: 2,
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        background: theme.palette.background.gradient,
        transition: 'all 0.3s ease',
        borderRadius: '8px'
      }}
    >
      <Box sx={{ mb: 1, display: 'flex', flexDirection: 'column', gap: 1 }}>
        <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
          AI Workout Assistant
        </Typography>
        <Stack direction="row" spacing={1}>
          {showAnalyzeButton && (
            <Button
              variant="contained"
              onClick={analyzeProgress}
              disabled={isChatLoading}
              startIcon={<AssessmentIcon />}
              size="small"
              fullWidth
              sx={{
                textTransform: 'none',
                borderRadius: '8px',
                fontWeight: 500,
                transition: 'all 0.2s ease-in-out',
                boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
                '&:hover': {
                  transform: 'translateY(-1px)',
                  boxShadow: '0 4px 8px rgba(0,0,0,0.15)',
                }
              }}
            >
              Analyze
            </Button>
          )}
        </Stack>
      </Box>

      <Box sx={{ 
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
        bgcolor: alpha('#f8f9fa', 0.5),
        borderRadius: '8px',
        mb: 1
      }}>
        <Box sx={{
          flex: 1,
          overflowY: 'auto',
          p: 2,
          display: 'flex',
          flexDirection: 'column',
          gap: 1.5,
        }}>
          {chatMessages.length === 0 ? (
            <Box sx={{ 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center',
              height: '100%',
              color: 'text.secondary',
              textAlign: 'center',
              p: 2
            }}>
              <Typography>
                Add your workout data and click "Analyze Progress" to get personalized advice
              </Typography>
            </Box>
          ) : (
            chatMessages.map((msg, idx) => (
              <Box
                key={idx}
                sx={{
                  bgcolor: msg.fromUser ? 'primary.main' : 'background.paper',
                  color: msg.fromUser ? 'white' : 'text.primary',
                  p: 2,
                  borderRadius: '8px',
                  maxWidth: '100%',
                  ml: msg.fromUser ? 'auto' : 0,
                  boxShadow: msg.fromUser 
                    ? '0 2px 4px rgba(0,123,255,0.15)'
                    : '0 2px 4px rgba(0,0,0,0.05)',
                  wordBreak: 'break-word',
                  '& strong': {
                    color: theme.palette.primary.main,
                    fontWeight: 600
                  },
                  '& ul': {
                    margin: '8px 0',
                    paddingLeft: '20px'
                  },
                  '& li': {
                    margin: '4px 0'
                  },
                  position: 'relative'
                }}
              >
                {!msg.fromUser && (
                  <Typography
                    variant="caption"
                    sx={{
                      position: 'absolute',
                      top: 8,
                      right: 8,
                      color: 'text.secondary',
                      fontSize: '0.75rem'
                    }}
                  >
                    {new Date(msg.timestamp).toLocaleTimeString()}
                  </Typography>
                )}
                {msg.fromUser ? (
                  <Typography variant="body2" sx={{ lineHeight: 1.6 }}>
                    {msg.text}
                  </Typography>
                ) : (
                  <Box sx={{ mt: 1 }}>
                    {msg.text.split('\n').map((paragraph, i) => {
                      const isEmoji = ['💪', '📈', '🎯'].some(emoji => 
                        paragraph.trim().startsWith(emoji)
                      );
                      const isHeader = paragraph.includes('MAIN FOCUS:') || 
                                      paragraph.includes('PROGRESS ANALYSIS:') || 
                                      paragraph.includes('ACTION STEPS:');
                      const isBulletPoint = paragraph.trim().startsWith('•');
                      const isNumberedPoint = /^\d\./.test(paragraph.trim());

                      return (
                        <React.Fragment key={i}>
                          {isEmoji && <Box sx={{ height: 24 }} />}
                          <Typography 
                            variant={isEmoji ? 'subtitle1' : 'body2'}
                            sx={{ 
                              mb: isEmoji ? 1 : 0.5,
                              mt: isEmoji && i > 0 ? 1 : 0,
                              lineHeight: 1.4,
                              fontWeight: isHeader ? 600 : 400,
                              color: isEmoji ? 'primary.main' : 'text.primary',
                              ...(isBulletPoint && {
                                pl: 2,
                                position: 'relative',
                                '&::before': {
                                  content: '"•"',
                                  position: 'absolute',
                                  left: 6,
                                  color: 'text.secondary'
                                }
                              }),
                              ...(isNumberedPoint && {
                                pl: 2,
                                position: 'relative',
                                '&::before': {
                                  content: `"${paragraph.split('.')[0]}."`,
                                  position: 'absolute',
                                  left: 6,
                                  color: 'primary.main',
                                  fontWeight: 600
                                }
                              })
                            }}
                          >
                            {isBulletPoint ? paragraph.substring(2) :
                            isNumberedPoint ? paragraph.substring(paragraph.indexOf('.') + 2) :
                            paragraph}
                          </Typography>
                          {isEmoji && paragraph.trim() && <Box sx={{ height: 8 }} />}
                        </React.Fragment>
                      );
                    })}
                  </Box>
                )}
              </Box>
            ))
          )}
        </Box>
      </Box>

      <Box sx={{ 
        display: 'flex',
        gap: 1,
        borderTop: `1px solid ${alpha('#000', 0.1)}`,
        pt: 1,
        mt: 'auto'
      }}>
        <TextField
          fullWidth
          size="small"
          value={chatInput}
          onChange={(e) => setChatInput(e.target.value)}
          placeholder="Ask for workout advice..."
          onKeyPress={(e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
              e.preventDefault();
              handleChatSend();
            }
          }}
          sx={{ 
            '& .MuiOutlinedInput-root': { 
              borderRadius: '8px',
              backgroundColor: 'background.paper'
            }
          }}
        />
        <Button
          variant="contained"
          onClick={handleChatSend}
          disabled={isChatLoading}
          sx={{
            textTransform: 'none',
            borderRadius: '8px',
            fontWeight: 500,
            transition: 'all 0.2s ease-in-out',
            boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
            minWidth: '40px',
            width: '40px',
            height: '40px',
            p: 0,
            background: 'linear-gradient(45deg, #43a047 30%, #2e7d32 90%)',
            '&:hover': {
              background: 'linear-gradient(45deg, #2e7d32 30%, #1b5e20 90%)',
            }
          }}
        >
          <SendIcon fontSize="small" />
        </Button>
      </Box>
    </Paper>
  );
};

export default AISection;