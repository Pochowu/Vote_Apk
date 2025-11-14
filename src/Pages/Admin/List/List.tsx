import React, { useState, useEffect } from 'react';
import { deleteAdmin, getAdmins, type Admin } from '../../../api/admin/Api';
import AdminList from '../../../components/AdminList/AdminList';

const AdminListPage: React.FC = () => {
    const [admins, setAdmins] = useState<Admin[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchAdmins = async () => {
            try {
                const data = await getAdmins();
                setAdmins(data);
            } catch (err) {
                setError(err instanceof Error ? err.message : 'An unknown error occurred.');
            } finally {
                setLoading(false);
            }
        };

        fetchAdmins();
    }, []);

    const handleDelete = async (id: number) => {
        if (window.confirm('Are you sure you want to delete this admin?')) {
            try {
                await deleteAdmin(id);
                setAdmins(admins.filter(admin => admin.id !== id));
            } catch (err) {
                setError(err instanceof Error ? err.message : 'Failed to delete admin.');
            }
        }
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <div>
            <AdminList admins={admins} onDelete={handleDelete} />
        </div>
    );
};

export default AdminListPage;