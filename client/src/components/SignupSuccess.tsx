import React from 'react'
import SignupSuccessImage from "../assets/signup-success-image.jpg";
import Button from './common/Button';
import { Type } from './common/types';
import { Link } from 'react-router-dom';

type Props = {}

const SignupSuccess = (props: Props) => {
  return (
    <div style={{display: 'flex', flexFlow: 'column', gap: '24px', alignItems: 'center', justifyContent: 'center', padding: "16px 80px",}}>
        <div style={{display: 'flex'}}>
            <h1>Uncover Deals, Unleash Excitement:{" "}</h1>
            <h1 style={{color: 'dodgerblue'}}>Dive into Our Auctions Today!</h1>
        </div>
        <div style={{display: 'flex'}}>
            <img src={SignupSuccessImage} alt="signinimage" height={400} />
        </div>
        <div style={{display: 'flex'}}>
            <Link to='/login'><Button type={Type.primary}>Login now</Button></Link>
        </div>
    </div>
  )
}

export default SignupSuccess