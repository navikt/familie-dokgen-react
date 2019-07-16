import React, { Component } from 'react';
import logo from '../assets/logo.png'
import { Systemtittel } from 'nav-frontend-typografi';
import Panel from 'nav-frontend-paneler';

class Header extends Component {
    
    render(){
        return (
            <div>
                <Panel style={style.headerContainer}>
                    <img src={logo} alt="logo"/>
                    <Systemtittel style={style.title}>Dokumentgenerator</Systemtittel>
                </Panel>
            </div>
        )
    }
}

export default Header;

const style = {
    headerContainer : {
        display: "flex", 
        alignItems: "center",
        borderBottom : "4px solid #E9E7E7",
        margin: "8px"
    }, 
    title : {
        padding: "16px"
    }
}