import React, {Component} from 'react';
import { connect } from 'react-redux';
import AceEditor from 'react-ace';
import 'brace/mode/markdown';
import 'brace/theme/textmate';
import {getTemplateContentInHTML, updateEditorContent, updateTemplateContent} from "../redux/actions/templateAction";


class Editor extends Component {

    constructor(props){
        super(props);

        this.state={
            selectedTemplate : this.props.selectedTemplate
        }
    }

    onChange = (newValue) => {
        this.props.updateEditorContent(newValue);
        this.props.updateTemplateContent(this.props.selectedTemplate, {"amountMonthly":3.5}, newValue, "html");
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
    readOnly: state.templateReducer.readOnly
});


const mapDispatchToProps = dispatch => ({
    getTemplateContentInHTML: (name) => dispatch(getTemplateContentInHTML(name)),
    updateEditorContent: (content) => dispatch(updateEditorContent(content)),
    updateTemplateContent: (name, interleavingFields, markdownContent, format) => dispatch(updateTemplateContent(name, interleavingFields, markdownContent, format)),
});

export default connect(mapStateToProps, mapDispatchToProps) (Editor)

const style = {
    editorContainer : {
        height: "100%",
        border: "1px solid #E9E7E7", 
        borderTop: "none"
    },
    aceEdit : {
        width:"100%",
        height: "100%"
    }
};
