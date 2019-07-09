import React, {Component} from 'react';
import {connect} from 'react-redux';
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
        updateTemplateContent(this.props.selectedTemplate, newValue).then(res => {
            console.log("res", res);
            this.props.getTemplateContentInHTML(this.props.selectedTemplate);
        });
    };

    render(){
        return (
            <div>
                <AceEditor 
                    mode="markdown"
                    theme="textmate"
                    onChange={this.onChange.bind(this)}
                    name="UNIQUE_ID_OF_DIV"
                    editorProps={{$blockScrolling: true}}
                    value={this.props.editorContent}
                    style={style.aceEdit}
                    />
            </div>
        )
    }
}

const mapStateToProps = state => ({
    ...state,
    selectedTemplate : state.templateReducer.selectedTemplate,
    editorContent : state.templateReducer.editorContent
});


const mapDispatchToProps = dispatch => ({
    getTemplateContentInHTML: (name) => dispatch(getTemplateContentInHTML(name)),
    updateEditorContent: (content) => dispatch(updateEditorContent(content))
});

export default connect(mapStateToProps, mapDispatchToProps) (Editor)

const style = {
    aceEdit : {
        width:"100%",
        margin:"1%"
    }
};