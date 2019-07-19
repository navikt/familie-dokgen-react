import React, { Component } from 'react';
import { connect } from 'react-redux'
import { getTemplateContentInHTML, updatePreviewFormat } from '../redux/actions/templateAction'
import Tabs from 'nav-frontend-tabs';
import Preview from "../components/Preview";
import Colors from '../assets/Colors'


class PreviewContainer extends Component {

    constructor(){
        super();

        this.state = {
            tabNames : ["Web", "Nettbrett", "Mobil", "PDF"],
            chosenTab : 0,
            stylingClassName : "Web"
        }
    }

    handleSelect(event, index) {
        this.setState({
            chosenTab : index,
            stylingClassName : this.state.tabNames[index]
        })
        if(this.state.tabNames[index] === "PDF"){
            this.props.updatePreviewFormat("pdf")
        } else {
            this.props.updatePreviewFormat("html")
            }
        }

    render(){
        return (
            <div style={this.props.style}> 
                <Tabs 
                    tabs={[
                        {"label": this.state.tabNames[0]},
                        {"label": this.state.tabNames[1]},
                        {"label": this.state.tabNames[2]},
                        {"label" : this.state.tabNames[3]}
                    ]}
                    onChange={(event, index) => this.handleSelect(event, index)} 
                    style={{border: "1px solid" + Colors.baseColors.navGra20}}
                />
                <Preview 
                    stylingClassName={this.state.stylingClassName} 
                    isPDF={this.props.previewFormat}
                />
            </div>
        )
    }
}

const mapStateToProps = state => ({
    ...state,
    selectedTemplate : state.templateReducer.selectedTemplate,
    previewFormat: state.templateReducer.previewFormat
});

const mapDispatchToProps = dispatch => ({
    getTemplateContentInHTML: (name) => dispatch(getTemplateContentInHTML(name)),
    updatePreviewFormat: (format) => dispatch(updatePreviewFormat(format))
});

export default connect(mapStateToProps, mapDispatchToProps) (PreviewContainer)
