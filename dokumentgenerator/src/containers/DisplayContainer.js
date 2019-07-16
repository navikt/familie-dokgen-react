import React, { Component } from 'react';
import EditContainer from './EditContainer';
import PreviewContainer from './PreviewContainer';
import SelectTemplate from '../components/SelectTemplate';
import Header from '../components/Header';


export default class DisplayContainer extends Component {

    render(){
        return (
            <div style={style.displayContainer}>
                <Header/>
                <div style={style.selectContainer}>
                    <SelectTemplate/>
                </div>
                <div style={style.displayFlex}>
                    <div style={style.container}>
                        <EditContainer style={style}/>
                    </div>
                    <div style={style.container}>
                        <PreviewContainer style={style}/>
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
    selectContainer : {
        display: "flex",
        marginTop: "2rem",
        marginLeft: "2%"
    },
    displayFlex : {
        height : "100%",
        display : "flex",
        justifyContent : "space-evenly",
        marginTop: "1rem",
        marginLeft: "1%",
        marginRight: "1%"
    }, 
    container : { 
        width : "60%",
        height : "80%"
        
    },
    subContainer : {
        height: "100%",
    },
    subsubContainer : {
        height: "85%",
        width: "95%",
        marginLeft: "2%",
        marginRight: "2%"
    }
}