import React, { useState } from 'react';
import { apiPost } from '../api';
import { useNavigate } from 'react-router-dom';

export default function LoginForm({ onLogin }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
    const nav = useNavigate();

    const submit = async (e) => {
        e.preventDefault();
        setError(null);

        try {
            const res = await apiPost('login.php', { email, password });
            if (res && res.success) {
                onLogin?.(res.user);
                localStorage.setItem('user', JSON.stringify(res.user));
                nav('/profile'); // or '/' if you want
            } else {
                setError(res.error || 'Login failed');
            }
        } catch (err) {
            console.error(err);
            setError('Failed to connect to server');
        }
    };

    return (
        <div style={{ maxWidth: '400px' }}>
            <h2>Login</h2>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <form onSubmit={submit}>
                <div>
                    <label>Email:</label>
                    <input value={email} onChange={e => setEmail(e.target.value)} type="email" required />
                </div>
                <div>
                    <label>Password:</label>
                    <input value={password} onChange={e => setPassword(e.target.value)} type="password" required />
                </div>
                <div style={{ marginTop: '10px' }}>
                    <button type="submit">Login</button>
                </div>
            </form>
        </div>
    );
}
