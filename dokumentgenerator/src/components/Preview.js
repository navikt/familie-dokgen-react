import React, {Component} from 'react';
import { connect } from 'react-redux';
import {getTemplateContentInHTML} from "../redux/actions/templateAction";
import { Document, pdfjs, Page } from 'react-pdf'
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;



class Preview extends Component {


    componentDidUpdate(prevProps, prevState, snapshot){
        if(prevProps.selectedTemplate !== this.props.selectedTemplate){
            this.props.getTemplateContentInHTML(this.props.selectedTemplate, {"amountMonthly": 3.50});
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
            return style.hidePDF;
        } else {
            return style.defaultScreen;
        }
    }


    render(){
        return (
            <div style={style.previewContainer}>
                {!this.props.isPDF && <iframe style={this.updateStyle()} title="previewFrame" srcDoc={this.props.previewContent}/>}
                {this.props.isPDF && <div style={style.PDF}><Document file={this.props.pdfContent}> <Page scale={1} pageNumber={1}/></Document></div>}
            </div>
        )
    }
}

const mapStateToProps = state => ({
    ...state,
    selectedTemplate: state.templateReducer.selectedTemplate,
    previewContent: state.templateReducer.previewContent,
    pdfContent: state.templateReducer.pdfContent
});

const mapDispatchToProps = dispatch => ({
    getTemplateContentInHTML: (name, interleavingFields, markdownContent, format) =>
        dispatch(getTemplateContentInHTML(name, interleavingFields, markdownContent, format))
});

export default connect(mapStateToProps, mapDispatchToProps) (Preview)

const style = {
    previewContainer : {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        height: "100%",
        border: "1px solid #E9E7E7", 
        borderTop: "none",
        backgroundColor: "#F5F5F5",
        overflow: "hidden"
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
    hidePDF : {
        display: "none"
    },
    PDF : { 
        height: "90%",
        overflow: "scroll",
    }
}
