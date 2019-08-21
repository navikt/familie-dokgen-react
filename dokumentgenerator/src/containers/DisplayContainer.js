import React, { Component } from 'react';
import EditorContainer from './EditContainer';
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
                    <SelectTemplate style={style.selectFlexItems}/>
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
        flexWrap: "wrap",
        justifyContent : "flex-start",
    },
    selectFlexItems : {
        margin: "1%"
    },
    editorFlexContainer : {
        height : "80%",
        display : "flex",
        flexWrap: "wrap",
        justifyContent : "space-between"
    },
    subContainer : {
        height: "100%",
        width: "47%",
        minWidth: "600px",
        margin: "1em 0 1em 0",
        padding: "0 1% 0 1%"
    }
};
