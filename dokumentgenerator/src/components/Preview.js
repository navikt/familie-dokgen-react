import React, {Component} from 'react';
import {connect} from 'react-redux';
import {getTemplateContentInHTML} from "../redux/actions/templateAction";


class Preview extends Component {

    componentDidUpdate(prevProps, prevState, snapshot){
        if(prevProps.selectedTemplate !== this.props.selectedTemplate){
            this.props.getTemplateContentInHTML(this.props.selectedTemplate);
        }
    }

    updateStyle(){
        if(this.props.stylingClassName === "Web"){
            return style.Web;
        } else if( this.props.stylingClassName === "Nettbrett"){
            return style.Nettbrett;
        } else if (this.props.stylingClassName === "Mobil"){
            return style.Mobil;
        } else if (this.props.stylingClassName === "PDF") {
            return style.PDF;
        } else {
            return style.defaultScreen;
        }
    }

    render(){
        console.log("props i preview: " + this.props.stylingClassName)

        return (
            <div style={style.previewContainer}>
                <iframe style={this.updateStyle()} title="previewFrame" srcDoc={this.props.previewContent}/>
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
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        height: "100%",
        border: "1px solid #F5F5F5", 
        borderTop: "none",
        backgroundColor: "#F5F5F5"
    },
    defaultScreen : {
        backgroundColor : "yellow"
    },
    Web : {
        width: "100%",
        height: "100%",
        border: "none",
        backgroundColor : "#FFFFFF"
    },
    Nettbrett : {
        width: "480px",
        height: "640px",
        border: "1px solid black",
        backgroundColor : "#FFFFFF"
        }, 
    Mobil : {
        width: "240px",
        height: "426px",
        border: "1px solid black",
        backgroundColor : "#FFFFFF"
    },
    PDF : { 
        width: "500px",
        height: "660px",
        border: "1px solid black",
        backgroundColor : "#FFFFFF"
    }
}