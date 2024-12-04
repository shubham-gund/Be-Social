import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { Message } from '../types';

const fetchMessages = async (userId: string): Promise<Message[]> => {
  const response = await axios.get(`https://socialmedia-backend-production-5eb9.up.railway.app/api/messages/${userId}`, {
    headers: {
      Authorization: `${localStorage.getItem('token')}`,
    },
  });
  return response.data;
};

const sendMessage = async ({ receiverId, text }: { receiverId: string; text: string }): Promise<Message> => {
  const response = await axios.post(`https://socialmedia-backend-production-5eb9.up.railway.app/api/messages/send/${receiverId}`, { text }, {
    headers: {
      Authorization: `${localStorage.getItem('token')}`,
    },
  });
  return response.data;
};

export const useMessages = (userId: string) => {
  return useQuery<Message[], Error>({
    queryKey: ['messages', userId],
    queryFn: () => fetchMessages(userId),
    enabled: !!userId,
  });
};

export const useSendMessage = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: sendMessage,
    onSuccess: (newMessage) => {
      queryClient.setQueryData<Message[]>(['messages', newMessage.receiverId], (oldMessages) => {
        return oldMessages ? [...oldMessages, newMessage] : [newMessage];
      });
    },
  });
};

