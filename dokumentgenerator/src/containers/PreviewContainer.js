import React, { Component } from 'react';
import Knapp from 'nav-frontend-knapper'
import Tabs from 'nav-frontend-tabs';

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
            <div style={style.previewContainer}>
                <div style={style.actPreviewContainer}> 
                    <Tabs 
                        tabs={[
                            {"label": "Web"},
                            {"label": "Nettbrett"},
                            {"label": "Mobil"},
                            {"label" : "PDF"}
                        ]}
                        onChange={(event, index) => this.handleSelect(event, index)} 
                    />
                    <br/><p>Her skal forhåndsvisningen komme </p>
                </div>
                <div style={style.buttonContainer}>
                    <Knapp style={style.buttons} type="standard">Last ned</Knapp>
                </div>
            </div>
        )
    }
}

const style = {
    previewContainer : { 
        height: "100%"
    },
    actPreviewContainer : {
        height: "75%",
        width: "80%",
        margin: "auto",
        marginBottom: "2%",
        backgroundColor: "#F5F5F5"
    },
    buttonContainer : {
        display: "flex",
        justifyContent : "center"
    },
    buttons : {
        width: "30%",
        margin: "1%"
    },
}