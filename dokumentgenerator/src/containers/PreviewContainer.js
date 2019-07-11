import React, { Component } from 'react';
import { connect } from 'react-redux'
import { getTemplateContentInHTML } from '../redux/actions/templateAction'
import Knapp from 'nav-frontend-knapper'
import Tabs from 'nav-frontend-tabs';
import Preview from "../components/Preview";

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
    }

    render(){
        console.log(this.state.tabNames)
        console.log("Valgt tab: " + this.state.chosenTab)
        console.log("klassenavn: " + this.state.stylingClassName)
        return (
            <div style={this.props.style.subContainer}>
                <div style={this.props.style.subsubContainer}> 
                    <Tabs 
                        tabs={[
                            {"label": this.state.tabNames[0]},
                            {"label": this.state.tabNames[1]},
                            {"label": this.state.tabNames[2]},
                            {"label" : this.state.tabNames[3]}
                        ]}
                        onChange={(event, index) => this.handleSelect(event, index)} 
                        style={{backgroundColor: "#F5F5F5"}}
                    />
                   <Preview stylingClassName={this.state.stylingClassName}/>
                </div>
                <div style={style.buttonContainer}>
                    <Knapp style={style.buttons} type="standard" mini onClick={() => this.props.getTemplateContentInHTML(this.props.selectedTemplate)}>Kompiler</Knapp>
                    <Knapp style={style.buttons} type="standard" mini>Last ned</Knapp>
                </div>
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

const style = {
    buttonContainer : {
        display: "flex",
        justifyContent : "center",
        padding: "2%"
    },
    buttons : {
        width: "20%",
        margin: "3%"
    }
};