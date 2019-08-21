import React, { Component } from 'react';
import Tabs from 'nav-frontend-tabs';
import Editor from '../components/Editor'
import Colors from '../assets/Colors'
import { MARKDOWN } from "./Constants";

export default class EditContainer extends Component {

    constructor(){
        super();

        this.state = {
            tab : 0
        }
    }

    handleSelect(event, index) {
        this.setState({
            tab : index
        });
    }

    render(){
        return (
            <div style={this.props.style}>
                <Tabs
                    tabs={[
                        {"label": MARKDOWN}
                    ]}
                    onChange={ (event, index) => {this.handleSelect(event, index)}}
                    style={{border: "1px solid" + Colors.baseColors.navGra20}}
                />
                <Editor/>
            </div>
        )
    }
}
