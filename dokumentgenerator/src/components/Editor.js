import React, {Component} from 'react';
import {connect} from 'react-redux';
import AceEditor from 'react-ace';
import 'brace/mode/markdown';
import 'brace/theme/textmate';
import {getTemplateNames, setTemplateType, updateTemplateContent} from "../redux/actions/templateAction";


class Editor extends Component {

    constructor(props){
        super(props);

        this.state={
            selectedTemplate : this.props.selectedTemplate
        }
    }

    onChange = (newValue) => {
        updateTemplateContent(this.props.selectedTemplate, newValue);
    };

    render(){
        console.log(this.props.selectedTemplate);
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

export default connect(mapStateToProps) (Editor)

const style = {
    aceEdit : {
        width:"100%",
        margin:"1%"
    }
};