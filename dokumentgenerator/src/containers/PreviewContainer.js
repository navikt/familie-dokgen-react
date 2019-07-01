import React, { Component } from 'react';
import Knapp from 'nav-frontend-knapper'
import Tabs from 'nav-frontend-tabs';

export default class PreviewContainer extends Component {

    constructor(){
        super()

        this.state = {
            tab : ""
        }
    }

    handleSelect(index) {
        //???????
        console.log(index)
    }

    render(){
        console.log(this.state.tab)
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
                        onChange={(tabs) => this.handleSelect(tabs.value)} 
                    />
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
    },
}