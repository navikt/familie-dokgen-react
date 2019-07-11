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
            tab : 0
        }
    }

    handleSelect(event, index) {
        this.setState({
            tab : index
        })
    }

    render(){
        return (
            <div style={this.props.style.subContainer}>
                <div style={this.props.style.subsubContainer}> 
                    <Tabs 
                        tabs={[
                            {"label": "Web"},
                            {"label": "Nettbrett"},
                            {"label": "Mobil"},
                            {"label" : "PDF"}
                        ]}
                        onChange={(event, index) => this.handleSelect(event, index)} 
                        style={{backgroundColor: "#F5F5F5"}}
                    />
                   <Preview/>
                </div>
                <div style={style.buttonContainer}>
                    <Knapp style={style.buttons} type="standard" onClick={() => this.props.getTemplateContentInHTML(this.props.selectedTemplate)}>Kompiler</Knapp>
                    <Knapp style={style.buttons} type="standard">Last ned</Knapp>
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
        justifyContent : "center"
    },
    buttons : {
        width: "30%",
        margin: "1%"
    },
};