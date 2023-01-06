import { useState, useContext } from "react";
import { GlobalContext } from '../context/Context';

import { Button, TextField } from '@mui/material';
import { Routes, Route, Link, Navigate } from "react-router-dom";

import './login.css'
import axios from "axios";


function ForgetPassword() {
    let { state, dispatch } = useContext(GlobalContext);

    const [result, setResult] = useState("");

    const [email, setEmail] = useState("");
    const [otp, setOtp] = useState("");
    const [newPassword, setNewPassword] = useState("");

    const [isOtpSent, setIsOtpSent] = useState(false);


    const sendOtp = async (e) => {
        e.preventDefault();

        try {
            let response = await axios.post(`${state.baseUrl}/forget-password`, {
                email: email,
            }, {
                withCredentials: true
            })

            console.log(response.data.message);
            setResult(response.data.message)
            setIsOtpSent(true)

        } catch (e) {
            console.log("e: ", e);
        }

        // e.reset();
    }


    return (
        <>
            <h4>This is ForgetPassword page</h4>

            <form onSubmit={sendOtp} className="loginForm">


                <TextField
                    className="TextField"
                    id="email"
                    label="Email"
                    variant="outlined"
                    type="email"
                    name="username"
                    placeholder="email"
                    autoComplete="username"
                    onChange={(e) => { setEmail(e.target.value) }}
                />

                {(isOtpSent) ? <>

                    < br />
                    <TextField
                        className="TextField"
                        id="otp"
                        label="OTP"
                        variant="outlined"
                        type="text"
                        name="otp"
                        placeholder="enter otp"
                        autoComplete="one-time-code"
                        onChange={(e) => { setOtp(e.target.value) }}
                    />

                    <br />
                    <TextField
                        className="TextField"
                        id="newPassword"
                        label="New Password"
                        variant="outlined"
                        type="password"
                        name="newPassword"
                        placeholder="enter a new password"
                        autoComplete="new-password"
                        onChange={(e) => { setNewPassword(e.target.value) }}
                    />
                </>
                    : null}

                <br />
                <Button variant="outlined" type="submit">Send OTP email</Button>

            </form>

            <p>{result}</p>
        </>
    )
}

export default ForgetPassword;
