import React, { Component } from 'react';
import { connect } from 'react-redux'
import { getTemplateContentInHTML } from '../redux/actions/templateAction'
import Tabs from 'nav-frontend-tabs';
import Preview from "../components/Preview";


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
                        style={{border: "1px solid #C6C2BF"}}
                    />
                   <Preview stylingClassName={this.state.stylingClassName} isPDF={this.state.isPDF} />
                </div>
                {/*<div style={style.buttonContainer}>
                    <Knapp style={style.buttons} type="standard" mini onClick={() => this.props.getTemplateContentInHTML(this.props.selectedTemplate)}>Kompiler</Knapp>
                    <Knapp style={style.buttons} type="standard" mini>Last ned</Knapp>
                </div>*/}
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
    /*buttonContainer : {
        display: "flex",
        justifyContent : "center",
        padding: "2%"
    },
    buttons : {
        width: "20%",
        margin: "3%"
    },*/
}; 