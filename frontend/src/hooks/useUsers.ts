import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { UserType } from '../types';

const fetchUsers = async (): Promise<UserType[]> => {
  const response = await axios.get('https://socialmedia-backend-production-5eb9.up.railway.app/api/messages/users', {
    headers: {
      Authorization: `${localStorage.getItem('token')}`, // Assuming you store the token in localStorage
    },
  });
  return response.data;
};

export const useUsers = () => {
  return useQuery<UserType[], Error>({
    queryKey: ['users'],
    queryFn: fetchUsers,
  });
};

