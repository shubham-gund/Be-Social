import React from 'react';
import { User } from '../../types';

interface UserListProps {
  users: User[] | undefined;
  onSelectUser: (user: User) => void;
}

const UserList: React.FC<UserListProps> = ({ users, onSelectUser }) => {
  if (!users || users.length === 0) {
    return <div className="w-1/4 bg-neutral p-4">No users available</div>;
  }

  return (
    <div className="w-1/4 bg-neutral p-4">
      <h2 className="text-xl font-bold mb-4">Users</h2>
      <ul>
        {users.map((user) => (
          <li
            key={user._id}
            className="cursor-pointer hover:bg-base-200 p-2 rounded-xl"
            onClick={() => onSelectUser(user)}
          >
            {user.username}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UserList;

