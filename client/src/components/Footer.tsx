import React from 'react'
import AppTitle from './AppTitle'
import { Facebook, Github, Instagram, Twitter } from 'iconoir-react'

type Props = {}

const Footer = (props: Props) => {
  return (
    <footer style={{backgroundColor: '#131024', color: 'white', padding: '20px 60px', margin: '0 80px', display: 'flex', flexFlow: 'column', justifyContent: 'space-between', gap: '12px'}}>
        <div style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: '100px'}}>
            <AppTitle title={"Genix Auctions"} titleColor='white'/>
            <div style={{display: 'flex', flexFlow: 'column', paddingTop: '40px'}}>
                <span>Products</span>
                <span>About us</span>
                <span>Contact</span>
            </div>
            <div>Auctions</div>
            <div>Bidding</div>
            <div style={{display: 'flex', gap: '8px'}}>
                <Twitter />
                <Facebook />
                <Instagram />
                <Github />
            </div>
        </div>
        <div style={{height: '1px', background: '#2a2b3c'}}></div>
        <div style={{display: 'flex', justifyContent: 'center'}}>@Copyright 2024, All rights reserved by Genix</div>
    </footer>
  )
}

export default Footer