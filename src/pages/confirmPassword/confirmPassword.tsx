import React, { useState } from 'react';
import './confirmPassword.css';

const ConfirmPassword = () => {
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (password === confirmPassword) {
            // Passwords match, do something
        } else {
            // Passwords do not match, display error message
        }
    };

    return (
        <div className="confirm-password">
            <div className="confirm-password-container">
                <div className="confirm-password-slogan">Secure Your Account</div>
                <div className="confirm-password-box">
                    <form onSubmit={handleSubmit}>
                        <label>
                            Password:
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </label>
                        <label>
                            Confirm Password:
                            <input
                                type="password"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                            />
                        </label>
                        <button type="submit">Submit</button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default ConfirmPassword;
