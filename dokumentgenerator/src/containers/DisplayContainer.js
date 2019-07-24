import React, { Component } from 'react';
import EditorContainer from './EditorContainer';
import PreviewContainer from './PreviewContainer';
import SelectTemplate from '../components/SelectTemplate';
import Header from '../components/Header';
import SelectTestSet from '../components/SelectTestSet';
import CreateTestSet from '../components/CreateTestSet';


export default class DisplayContainer extends Component {

    render(){
        return (
            <div style={style.displayContainer}>
                <Header/>
                <div style={style.selectFlexContainer}>
                    <SelectTemplate/>
                    <SelectTestSet style={style.selectFlexItems}/>
                    <CreateTestSet style={style.selectFlexItems}/>
                </div>
                <div style={style.editorFlexContainer}>
                    <EditorContainer style={style.subContainer}/>
                    <PreviewContainer style={style.subContainer}/>
                </div>
            </div>
        )
    }
}

const style = {
    displayContainer : {
        height : "100%"
    },
    selectFlexContainer : {
        display: "flex",
        marginTop: "2rem",
        marginLeft: "2%"
    },
    selectFlexItems : {
        paddingLeft: "30px"
    },
    editorFlexContainer : {
        height : "100%",
        display : "flex",
        justifyContent : "space-evenly",
        marginTop: "1rem",
        marginLeft: "1%",
        marginRight: "1%"
    }, 
    subContainer : {
        height: "70%",
        width: "100%",
        margin: "1%",
        marginTop: 0
    }
}