import React, { Component } from 'react';
import EditContainer from './EditContainer';
import PreviewContainer from './PreviewContainer';
import SelectTemplate from '../components/SelectTemplate';


export default class DisplayContainer extends Component {

    render(){
        return (
            <div style={style.displayContainer}>
                <SelectTemplate/>
                <div style={style.displayFlex}>
                    <div style={style.borderView}>
                        <h2>Redigering</h2>
                        <EditContainer style={style}/>
                    </div>
                    <div style={style.borderView}>
                        <h2>Forhåndsvisning</h2>
                        <PreviewContainer style={style}/>
                    </div>
                </div>
            </div>
        )
    }
}

const style = {
    displayContainer : {
        height : "100%",
        margin: "2%"
    },
    displayFlex : {
        height : "100%",
        display : "flex",
        justifyContent : "space-evenly",
        margin: "2%",
    }, 
    borderView : { 
        width : "60%",
        height : "80%"
    },
    subContainer : {
        height: "100%"
    },
    subsubContainer : {
        height: "75%",
        width: "95%",
        margin: "auto",
        marginBottom: "2%",
        backgroundColor: "#F5F5F5"
    }
}