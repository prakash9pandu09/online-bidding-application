import { useState } from 'react';
import AppTitle from './AppTitle'
import NavItems from './NavItems'
import { useAppSelector, useSetHeaderBgColor } from './common/hooks';

const Header = () => {
    const {isLoggedIn} = useAppSelector(state => state.user);
    const headerColor = useSetHeaderBgColor();
  return (
    <header style={{display: 'flex', padding: '16px 80px', alignItems: 'center', justifyContent: 'space-between', backgroundColor: headerColor, position: 'sticky', top: '0', zIndex: '2', boxShadow: "rgba(149, 157, 165, 0.2) 0px 8px 24px"}}>
        <AppTitle title={"Genix Auctions"} titleColor='#1b1b1b' />
        {headerColor != 'white' && <NavItems />}
    </header>
  )
}

export default Header