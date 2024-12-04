import React, { useState } from 'react';
import { useUsers } from '../../hooks/useUsers';
import { useMessages } from '../../hooks/useMessages';
import UserList from '../../components/chatui/ChatList';
import ChatWindow from '../../components/chatui/ChatWindow';
import { User } from '../../types';

const MessagePage: React.FC = () => {
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const { data: users, isLoading: isLoadingUsers, error: usersError } = useUsers();
  const { data: messages } = useMessages(selectedUser?._id ?? '');

  if (isLoadingUsers) return <div>Loading users...</div>;
  if (usersError) return <div>Error loading users: {usersError.message}</div>;

  return (
    <div className="flex h-screen w-full">
      <UserList users={users} onSelectUser={setSelectedUser} />
      <ChatWindow
        selectedUser={selectedUser}
        messages={messages ?? []}
      />
    </div>
  );
};

export default MessagePage;

