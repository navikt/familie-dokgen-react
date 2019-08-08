import React, { Component } from 'react';
import { connect } from 'react-redux';
import Colors from '../assets/Colors';
import AceEditor from 'react-ace';
import 'brace/mode/markdown';
import 'brace/theme/textmate';
import {getTemplateContentInHTML, updateEditorContent, updateTemplateContent} from "../redux/actions/templateAction";


class Editor extends Component {

    onChange = (newValue) => {
        this.props.updateEditorContent(newValue);
        this.props.updateTemplateContent(this.props.selectedTemplate, this.props.selectedTestData, newValue, this.props.previewFormat);
    };

    render(){
        return (
            <div style={style.editorContainer}>
                <AceEditor 
                    mode="markdown"
                    theme="textmate"
                    onChange={this.onChange.bind(this)}
                    name="UNIQUE_ID_OF_DIV"
                    editorProps={{$blockScrolling: true}}
                    value={this.props.editorContent}
                    style={style.aceEdit}
                    readOnly={this.props.readOnly}
                    />
            </div>
        )
    }
}

const mapStateToProps = state => ({
    ...state,
    selectedTemplate : state.templateReducer.selectedTemplate,
    editorContent : state.templateReducer.editorContent,
    readOnly: state.templateReducer.readOnly,
    previewFormat: state.templateReducer.previewFormat,
    selectedTestData: state.templateReducer.selectedTestData
});


const mapDispatchToProps = dispatch => ({
    updateEditorContent: (content) => dispatch(updateEditorContent(content)),

    getTemplateContentInHTML: (name, interleavingFields, markdownContent, format) =>
        dispatch(getTemplateContentInHTML(name, interleavingFields, markdownContent, format)),

    updateTemplateContent: (name, interleavingFields, markdownContent, format) =>
        dispatch(updateTemplateContent(name, interleavingFields, markdownContent, format)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Editor)

const style = {
    editorContainer : {
        height: "95%",
        border: "1px solid" + Colors.baseColors.navGra20,
        borderTop: "none"
    },
    aceEdit : {
        width:"100%",
        height: "100%"
    }
};
