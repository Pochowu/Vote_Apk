import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getAdmin, updateAdmin, type NewAdmin } from '../../../api/admin/Api';

const AdminEditPage: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const [admin, setAdmin] = useState<NewAdmin>({ email: '', password: '' });
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState<string | null>(null);

    useEffect(() => {
        const fetchAdmin = async () => {
            if (!id) return;
            try {
                const data = await getAdmin(parseInt(id, 10));
                setAdmin({ email: data.email, password: '' }); // ne pas préremplir le mot de passe
            } catch (err) {
                setError(err instanceof Error ? err.message : 'An unknown error occurred.');
            } finally {
                setLoading(false);
            }
        };

        fetchAdmin();
    }, [id]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setAdmin({ ...admin, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!id) return;

        setError(null);
        setSuccess(null);

        const adminToUpdate: Partial<NewAdmin> = { email: admin.email };
        if (admin.password) {
            adminToUpdate.password = admin.password;
        }

        try {
            const result = await updateAdmin(parseInt(id, 10), adminToUpdate);
            setSuccess(result.message || 'Admin updated successfully!');
            setTimeout(() => navigate('/admins'), 2000); // Redirect after 2 seconds
        } catch (err) {
            setError(err instanceof Error ? err.message : 'An unknown error occurred.');
        }
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error && !success) { // Do not show initial loading error if update is successful
        return <div>Error: {error}</div>;
    }

    return (
        <div>
            <h2>Edit Admin</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="email">Email:</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={admin.email}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="password">New Password (optional):</label>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        value={admin.password}
                        onChange={handleChange}
                    />
                </div>
                <button type="submit">Update Admin</button>
            </form>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            {success && <p style={{ color: 'green' }}>{success}</p>}
        </div>
    );
};

export default AdminEditPage;
