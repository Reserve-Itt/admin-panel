import React, { useState } from 'react';
import './forgotpassword.css';

const ForgotPassword = () => {
    const [email, setEmail] = useState('');

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log('Email submitted:', email);
        // Add code to submit email and send password reset link
    };

    return (
        <div className="forgot-password-container">
            <div className="forgot-password-box">
                <h2>Forgot Password</h2>
                <p>Enter your email to reset your password</p>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <input
                            type="email"
                            placeholder="Enter your email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    <div className="form-group">
                        <button className="btn btn-primary" type="submit">
                            Reset Password
                        </button>
                    </div>
                </form>
                <div className="form-group">
                    <p className="forgot-password-text">
                        Remembered your password? <a href="/">Sign In</a>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default ForgotPassword;
