import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getAdmin, type Admin } from '../../../api/admin/Api';

const AdminShowPage: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const [admin, setAdmin] = useState<Admin | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchAdmin = async () => {
            if (!id) return;
            try {
                const data = await getAdmin(parseInt(id, 10));
                setAdmin(data);
            } catch (err) {
                setError(err instanceof Error ? err.message : 'An unknown error occurred.');
            } finally {
                setLoading(false);
            }
        };

        fetchAdmin();
    }, [id]);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    if (!admin) {
        return <div>Admin not found.</div>;
    }

    return (
        <div>
            <h2>Admin Details</h2>
            <p>
                <strong>ID:</strong> {admin.id}
            </p>
            <p>
                <strong>Email:</strong> {admin.email}
            </p>
            <Link to="/admins">Back to List</Link>
        </div>
    );
};

export default AdminShowPage;
