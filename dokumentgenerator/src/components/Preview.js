import React, {Component} from 'react';
import {connect} from 'react-redux';


class Preview extends Component {

    createPreview() {
        return {__html: this.props.previewContent};
    }



    render(){
        return (
            <div style={style.previewContainer} dangerouslySetInnerHTML={this.createPreview()}/>
        )
    }
}

const mapStateToProps = state => ({
    ...state,
    selectedTemplate : state.templateReducer.selectedTemplate,
    previewContent : state.templateReducer.previewContent
});

export default connect(mapStateToProps) (Preview)

const style = {
    previewContainer : {
        overflow: "scroll",
        height: "95%",
        backgroundColor: "white"
    }
}