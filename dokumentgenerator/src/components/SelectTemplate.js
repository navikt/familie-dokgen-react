import React, { Component } from 'react';
import { Select } from 'nav-frontend-skjema';
import { connect } from 'react-redux';
import { setTemplateType, getTemplateNames } from '../redux/actions/templateAction';
import uuid from 'uuid'

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
        <option className="listItem" key={uuid()} > {w} </option>)
        return (
            <div style={style.selectContainer}>
                <Select label='Hvilken mal vil du redigere?'
                        bredde="xl"
                        onChange={(e) => this.handleChange(e)}>
                        {listItems}
                </Select>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    ...state,
    templateType : state.templateReducer.selectedTemplate,
    templates : state.templateReducer.templateNames
   });

const mapDispatchToProps = dispatch => ({
    setTemplateType: (selected) => dispatch(setTemplateType(selected)),
    getTemplateNames : () => dispatch(getTemplateNames())
})

export default connect(mapStateToProps, mapDispatchToProps) ( SelectTemplate );

const style = {
    selectContainer : {
    }
}