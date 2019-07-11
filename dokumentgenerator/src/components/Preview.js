import React, {Component} from 'react';
import {connect} from 'react-redux';
import {getTemplateContentInHTML} from "../redux/actions/templateAction";


class Preview extends Component {


    componentDidUpdate(prevProps, prevState, snapshot){
        if(prevProps.selectedTemplate !== this.props.selectedTemplate){
            this.props.getTemplateContentInHTML(this.props.selectedTemplate);
        }
    }

    render(){
        return (
            <div style={style.previewContainer}>
                <iframe title="previewFrame" srcDoc={this.props.previewContent} style={style.previewContainer}/>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    ...state,
    selectedTemplate : state.templateReducer.selectedTemplate,
    previewContent : state.templateReducer.previewContent,
    previewURL :state.templateReducer.previewURL
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