import React, {Component} from 'react';
import { connect } from 'react-redux';
import { getTemplateContentInHTML } from "../redux/actions/templateAction";
import Colors from '../assets/Colors'
import { Document, pdfjs, Page } from 'react-pdf'
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;



class Preview extends Component {
    componentDidUpdate(prevProps, prevState, snapshot){
        if((prevProps.selectedTemplate !== this.props.selectedTemplate) || (prevProps.previewFormat !== this.props.previewFormat)){
            this.props.getTemplateContentInHTML(this.props.selectedTemplate, {"belop": 3.50}, "", this.props.previewFormat);
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
        return (
            <div style={style.previewContainer}>
                { //Shows the iframe if PDF-tab is not chosen
                    (this.props.previewFormat !== "pdf" && this.props.previewFormat !== "pdfa") &&
                     <iframe style={this.updateStyle()} title="previewFrame" srcDoc={this.props.previewContent}/>
                }
                {   //Shows the PDF if PDF-tab is chosen
                    (this.props.previewFormat === "pdf" || this.props.previewFormat === "pdfa") &&
                    <div style={style.PDF}><Document file={this.props.pdfContent}> <Page scale={1} pageNumber={1}/></Document></div>
                }
            </div>
        )
    }
}

const mapStateToProps = state => ({
    ...state,
    selectedTemplate: state.templateReducer.selectedTemplate,
    previewContent: state.templateReducer.previewContent,
    pdfContent: state.templateReducer.pdfContent,
    previewFormat: state.templateReducer.previewFormat
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
        overflow: "hidden",
        border: "1px solid" + Colors.baseColors.navGra20, 
        borderTop: "none",
        backgroundColor: Colors.baseColors.previewShadow
    },
    //Options for iframe- and pdf-display
    Web : {
        width: "100%",
        height: "100%",
        border: "none",
        backgroundColor : Colors.baseColors.previewBackground
    },
    Nettbrett : {
        width: "480px",
        height: "640px",
        border: "1px solid" + Colors.baseColors.navGra20,
        backgroundColor : Colors.baseColors.previewBackground
        },
    Mobil : {
        width: "240px",
        height: "426px",
        border: "1px solid" + Colors.baseColors.navGra20,
        backgroundColor : Colors.baseColors.previewBackground
    },
    hidePDF : {
        display: "none"
    },
    PDF : { 
        height: "90%",
        overflow: "scroll",
    }
}
