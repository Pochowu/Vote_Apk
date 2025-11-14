// src/components/AdminList/AdminList.tsx
import React from 'react';
import { Link } from 'react-router-dom';
import type { Admin } from '../../api/admin/Api';

interface AdminListProps {
  admins: Admin[];
  onDelete: (id: number) => void;
}

const AdminList: React.FC<AdminListProps> = ({ admins, onDelete }) => {
  if (admins.length === 0) {
    return <p>No administrators found.</p>;
  }

  return (
    <div>
      <h2>Administrators</h2>
      <Link to="/admins/create">
        Create New Admin
      </Link>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Email</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {admins.map((admin) => (
            <tr key={admin.id}>
              <td>{admin.id}</td>
              <td>{admin.email}</td>
              <td>
                <Link to={`/admins/${admin.id}`}>
                  View
                </Link>
                {' | '}
                <Link to={`/admins/${admin.id}/edit`}>
                  Edit
                </Link>
                {' | '}
                <button onClick={() => onDelete(admin.id)}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminList;
