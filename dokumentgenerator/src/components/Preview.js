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
        console.log("props i preview: " + this.props.stylingClassName)
        return (
            <div style={style.previewContainer}>
                <iframe style={style.Web} title="previewFrame" srcDoc={this.props.previewContent}/>
            </div>
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
    },
    Web : {
        backgroundColor : "red"
    },
    Nettbrett : {
        backgroundColor : "pink"
    }, 
    Mobil : {
        backgroundColor : "green"
    },
    PDF : { 
        backgroundColor : "blue"
    }
}