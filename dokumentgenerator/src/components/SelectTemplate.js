import React, { Component } from 'react';
import { Select } from 'nav-frontend-skjema';
import { connect } from 'react-redux';
import { setTemplateType, getTemplateNames, getTemplateContent } from '../redux/actions/templateAction';

class SelectTemplate extends Component { 

    componentDidMount(){
        this.props.getTemplateNames();
    }

    handleChange(event) {
        let selected = event.target.value;
        this.props.setTemplateType(selected);
    }

    render() {
        let listItems = []

        const templateList = this.props.templates
        listItems = templateList.map((w) =>  
        <option className="listItem" key={w}  > {w} </option>)
        return (
            <div style={style.selectContainer}>
                <Select label='Hvilken mal vil du redigere?'
                        bredde="xl"
                        onChange={(e) => this.handleChange(e)}>
                        <option key="">Velg en mal</option>
                        {listItems}
                </Select>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    ...state,
    selectedTemplate : state.templateReducer.selectedTemplate,
    templates : state.templateReducer.templateNames
   });

const mapDispatchToProps = dispatch => ({
    setTemplateType: (selected) => dispatch(setTemplateType(selected)),
    getTemplateNames : () => dispatch(getTemplateNames()),
    getTemplateContent : (name) => dispatch(getTemplateContent(name))
})

export default connect(mapStateToProps, mapDispatchToProps) ( SelectTemplate );

const style = {
    selectContainer : {
    }
}