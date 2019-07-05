import React, { Component } from 'react';
import Knapp from 'nav-frontend-knapper'
import Tabs from 'nav-frontend-tabs';
import Preview from "../components/Preview";

export default class PreviewContainer extends Component {

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
                            {"label": "Web"},
                            {"label": "Nettbrett"},
                            {"label": "Mobil"},
                            {"label" : "PDF"}
                        ]}
                        onChange={(event, index) => this.handleSelect(event, index)} 
                    />
                   <Preview/>
                </div>
                <div style={style.buttonContainer}>
                    <Knapp style={style.buttons} type="standard">Last ned</Knapp>
                </div>
            </div>
        )
    }
}

const style = {
    buttonContainer : {
        display: "flex",
        justifyContent : "center"
    },
    buttons : {
        width: "30%",
        margin: "1%"
    },
}