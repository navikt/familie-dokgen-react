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
        marginTop: "5px"
    },
    displayFlex : {
        height : "100%",
        display : "flex",
        justifyContent : "space-evenly",
        margin: "1%",
    }, 
    borderView : { 
        width : "60%",
        height : "80%"
        
    },
    subContainer : {
        height: "100%"
    },
    subsubContainer : {
        height: "85%",
        width: "95%",
        margin: "2%"
    }
}