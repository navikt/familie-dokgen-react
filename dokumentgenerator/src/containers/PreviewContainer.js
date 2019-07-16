import React, { Component } from 'react';
import { connect } from 'react-redux'
import { getTemplateContentInHTML } from '../redux/actions/templateAction'
import Tabs from 'nav-frontend-tabs';
import Preview from "../components/Preview";
import Colors from '../assets/Colors'


class PreviewContainer extends Component {

    constructor(){
        super();

        this.state = {
            tabNames : ["Web", "Nettbrett", "Mobil", "PDF"],
            chosenTab : 0,
            stylingClassName : "Web",
            isPDF : false
        }
    }

    handleSelect(event, index) {
        this.setState({
            chosenTab : index,
            stylingClassName : this.state.tabNames[index]
        })
        if(this.state.tabNames[index] === "PDF"){
            this.setState({ isPDF : true })
            } else {
                this.setState({ isPDF : false })
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
                    isPDF={this.state.isPDF} 
                />
            </div>
        )
    }
}

const mapStateToProps = state => ({
    ...state,
    selectedTemplate : state.templateReducer.selectedTemplate
});

const mapDispatchToProps = dispatch => ({
    getTemplateContentInHTML: (name) => dispatch(getTemplateContentInHTML(name))
});

export default connect(mapStateToProps, mapDispatchToProps) (PreviewContainer)