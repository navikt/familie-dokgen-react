import React, {Component} from 'react';
import {connect} from 'react-redux';
import {getTemplateContentInHTML} from "../redux/actions/templateAction";


class Preview extends Component {

    createPreview() {
        return {__html: this.props.previewContent};
    }

    componentDidUpdate(prevProps, prevState, snapshot){
        if(prevProps.selectedTemplate !== this.props.selectedTemplate){
            this.props.getTemplateContentInHTML(this.props.selectedTemplate);
        }
    }

    render(){
        return (
            <iframe srcDoc={this.props.previewContent} style={style.previewContainer}/>
        )
    }
}

const mapStateToProps = state => ({
    ...state,
    selectedTemplate : state.templateReducer.selectedTemplate,
    previewContent : state.templateReducer.previewContent
});

const mapDispatchToProps = dispatch => ({
    getTemplateContentInHTML: (name) => dispatch(getTemplateContentInHTML(name))
});

export default connect(mapStateToProps, mapDispatchToProps) (Preview)

const style = {
    previewContainer : {
        overflowY: "scroll",
        height: "95%",
        backgroundColor: "white"
    }
}