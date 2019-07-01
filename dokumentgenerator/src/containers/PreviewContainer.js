import React, { Component } from 'react';
import Knapp from 'nav-frontend-knapper'

export default class PreviewContainer extends Component {

    render(){
        return (
            <div style={style.previewContainer}>
                <div style={style.actPreviewContainer}> 
                    <br/><p>Her skal forhåndsvisningen komme </p>
                </div>
                <div style={style.buttonContainer}>
                    <Knapp style={style.buttons} type="standard">Lagre endringer</Knapp>
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
        justifyContent : "space-evenly"
    },
    buttons : {
        width: "250px"
    }
}