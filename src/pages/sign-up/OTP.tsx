import React, { useState } from "react";
import "./otp.css";
import OtpInput from "react-otp-input";

const Otp = () => {
    const [otp, setOtp] = useState("");
    const [showResend, setShowResend] = useState(false);

    const handleOtpChange = (value: string) => {
        setOtp(value);
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log("Submitting OTP:", otp);
    };

    const handleResend = () => {
        console.log("Resending OTP");
        setShowResend(false); // simulate OTP being resent
    };

    return (
        <div className="otp-container">
            <div className="otp-box">
                <h1 className="otp-title">Verify Your Email Code</h1>
                <form onSubmit={handleSubmit}>
                    <h2 className="otp-header">Please enter the OTP code</h2>
                    <OtpInput
                        className="react-otp-input-container"
                        value={otp}
                        onChange={handleOtpChange}
                        numInputs={6}
                        separator={<span>&nbsp;&bull;&nbsp;</span>}
                        isInputNum={true}
                        shouldAutoFocus={true}
                        isInputSecure={false}
                    />
                    {showResend ? (
                        <p className="otp-instructions">
                            Didn't receive OTP?{" "}
                            <button className="otp-link" onClick={handleResend}>
                                Resend OTP
                            </button>
                        </p>
                    ) : (
                        <p className="otp-instructions">
                            OTP has been sent to your email. Please check your inbox and enter
                            the code.
                        </p>
                    )}
                    <button type="submit" className="otp-button">
                        Verify
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Otp;
