import NavFrontendSpinner from "nav-frontend-spinner";
import React, {Component} from 'react';
import { connect } from 'react-redux';
import { getTemplateContentInHTML } from "../redux/actions/templateAction";
import Colors from '../assets/Colors'
import { Document, pdfjs, Page } from 'react-pdf'
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;



class Preview extends Component {
    componentDidUpdate(prevProps, prevState, snapshot){
        if(prevProps.previewFormat !== this.props.previewFormat){
            this.props.getTemplateContentInHTML(this.props.selectedTemplate, this.props.selectedTestData, "", this.props.previewFormat);
        }
    }

    //Styles the iframe considering the tab-choice in PreviewContainer
    updateStyle(){
        if( this.props.stylingClassName === "Nettbrett"){
            return style.Nettbrett;
        } else if (this.props.stylingClassName === "Mobil"){
            return style.Mobil;
        } else if (this.props.stylingClassName === "PDF") {
            return style.hidePDF;
        } else {
            return style.Web;
        }
    }

    render(){

        if(!this.props.errorContent) {
            return (
                <div style={style.previewContainer}>
                { //Shows the iframe if PDF-tab is not chosen
                    (this.props.previewFormat !== "pdf" && this.props.previewFormat !== "pdfa") &&
                    <iframe style={this.updateStyle()} title="previewFrame" srcDoc={this.props.previewContent}/>
                }
                {   //Shows the PDF if PDF-tab is chosen
                (this.props.previewFormat === "pdf" || this.props.previewFormat === "pdfa") &&
                    <div style={style.PDF}>
                        <Document
                            file={this.props.pdfContent}
                            error={"Kunne ikke laste inn PDF-fil."}
                            noData={<NavFrontendSpinner />}
                            loading={<NavFrontendSpinner />}
                        >
                            <Page scale={1} pageNumber={1}/>
                        </Document>
                </div>
                }
            </div>
            )
        }
        else {
            return (
                <div style={style.previewContainer}>
                    <pre style={style.errorContainer}>
                        {this.props.errorContent}
                    </pre>
                </div>
            )
        }
    }
}

const mapStateToProps = state => ({
    ...state,
    selectedTemplate: state.templateReducer.selectedTemplate,
    previewContent: state.templateReducer.previewContent,
    pdfContent: state.templateReducer.pdfContent,
    previewFormat: state.templateReducer.previewFormat,
    selectedTestData: state.templateReducer.selectedTestData,
    errorContent: state.templateReducer.errorContent
});

const mapDispatchToProps = dispatch => ({
    getTemplateContentInHTML: (name, interleavingFields, markdownContent, format) =>
        dispatch(getTemplateContentInHTML(name, interleavingFields, markdownContent, format))
});

export default connect(mapStateToProps, mapDispatchToProps) (Preview)

const style = {
    previewContainer : {
        display: "flex",
        height: "95%",
        overflow: "auto",
        border: "1px solid" + Colors.baseColors.navGra20,
        borderTop: "none",
        backgroundColor: Colors.baseColors.previewShadow
    },
    //Options for iframe- and pdf-display
    Web : {
        margin: "auto",
        display: "block",
        minWidth: "1080px",
        minHeight: "720px",
        border: "none",
        backgroundColor : Colors.baseColors.previewBackground
    },
    Nettbrett : {
        margin: "auto",
        display: "block",
        width: "480px",
        height: "640px",
        border: "none",
        backgroundColor : Colors.baseColors.previewBackground
    },
    Mobil : {
        margin: "auto",
        display: "block",
        width: "240px",
        height: "426px",
        border: "none",
        backgroundColor : Colors.baseColors.previewBackground
    },
    hidePDF : {
        display: "none"
    },
    PDF : {
        margin: "auto",
        display: "block",
        overflow: "visible",
    },
    errorContainer : {
        margin: "5% auto 5% auto",
        display: "inline",
        width: "95%",
        minHeight: "90%",
        overflow: "auto",
        border: "3px solid" + Colors.baseColors.errorBackgroundBorder,
        alignItems: "left",
        justifyContent: "left",
        textAlign: "left",
        backgroundColor: Colors.baseColors.errorBackground
    }
};
