import React, { Component } from 'react';
import { connect } from 'react-redux';
import AceEditor from 'react-ace';
import brace from 'brace'
import 'brace/mode/markdown';
import 'brace/theme/textmate';

class Editor extends Component {

    onChange(newValue){
        console.log("change" + newValue)
    }

    render(){
        return (
            <div>
                <AceEditor 
                    mode="markdown"
                    theme="textmate"
                    onChange={this.onChange}
                    name="UNIQUE_ID_OF_DIV"
                    editorProps={{$blockScrolling: true}}
                    value={this.props.templateContent}
                    style={style.aceEdit}
                    />
            </div>
        )
    }
}

const mapStateToProps = state => ({
    ...state,
    templateContent : state.templateReducer.templateContent
   });

export default connect(mapStateToProps) (Editor)

const style = {
    aceEdit : {
        width:"100%",
        margin:"1%"
    }
}