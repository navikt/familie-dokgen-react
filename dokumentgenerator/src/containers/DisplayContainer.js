import React, { Component } from 'react';
import EditContainer from './EditContainer';
import PreviewContainer from './PreviewContainer';
import SelectTemplate from '../components/SelectTemplate';


export default class DisplayContainer extends Component {

    render(){
        return (
            <div style={style.displayContainer}>
                <h1>Dokumentgenerator</h1>
                <SelectTemplate/>
                <div style={style.displayFlex}>
                    <div style={style.borderView}>
                        <h2>Redigering</h2>
                        <EditContainer/>
                    </div>
                    <div style={style.borderView}>
                        <h2>Forhåndsvisning</h2>
                        <PreviewContainer/>
                    </div>
                </div>
            </div>
        )
    }
}

const style = {
    displayContainer : {
        height : "100%"
    },
    displayFlex : {
        height : "100%",
        display : "flex",
        justifyContent : "space-evenly",
        margin: "2%",
    }, 
    borderView : { 
        width : "45%",
        height : "75%",
        backgroundColor: "#FFFFFF"
    }
}