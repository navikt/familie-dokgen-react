import React, { Component } from 'react';
import Tabs from 'nav-frontend-tabs';
import Editor from '../components/Editor'


export default class EditContainer extends Component {

    constructor(){
        super()

        this.state = {
            tab : 0
        }
    }

    handleSelect(event, index) {
        this.setState({
            tab : index
        })
    }

    render(){
        return (
            <div style={this.props.style.subContainer}>
                <div style={this.props.style.subsubContainer}> 
                <Tabs 
                        tabs={[
                            {"label": "Markdown"}
                        ]}
                        onChange={ (event, index) => {this.handleSelect(event, index)}} 
                        style={{border: "1px solid #C6C2BF"}}
                    />
                    <Editor/>
                </div>
            </div>
        )
    }
}
