import React, {Component} from 'react';
import logo from '../assets/logo.png';
import Colors from '../assets/Colors';
import {Systemtittel} from 'nav-frontend-typografi';
import Panel from 'nav-frontend-paneler';

class Header extends Component {

  render() {
    return (
        <header>
          <Panel style={style.headerPanel}>
            <div style={style.headerFlex}>
              <img src={logo} alt="logo"/>
              <Systemtittel style={style.title}>Dokumentgenerator</Systemtittel>
            </div>
          </Panel>
        </header>
    );
  }
}

export default Header;

const style = {
  headerPanel: {
    borderBottom: '4px solid' + Colors.baseColors.navLysGra,
    marginBottom: '8px',
  },
  headerFlex: {
    marginLeft: '16px',
    display: 'flex',
    alignItems: 'center',
  },
  title: {
    padding: '16px',
  },
};
