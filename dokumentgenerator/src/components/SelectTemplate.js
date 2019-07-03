import React, { Component } from 'react';
import { Select } from 'nav-frontend-skjema';
import { connect } from 'react-redux';
import { setTemplateType } from '../redux/actions/templateAction';

class SelectTemplate extends Component { 

    handleChange(event) {
        let selected = event.target.value;
        this.props.setTemplateType(selected);
    }

    render() {
        return (
            <div style={style.selectContainer}>
                <Select label='Hvilken mal vil du redigere?'
                        bredde="xl"
                        onChange={(e) => this.handleChange(e)}>
                    <option value=''>Velg mal</option>
                    <option value='mal1'>Mal 1</option>
                    <option value='mal2'>Mal 2</option>
                    <option value='mal3'>Mal 3</option>
                </Select>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    ...state,
    templateType : state.templateReducer.selectedTemplate
   });

const mapDispatchToProps = dispatch => ({
    setTemplateType: (selected) => dispatch(setTemplateType(selected))
})

export default connect(mapStateToProps, mapDispatchToProps) ( SelectTemplate );

const style = {
    selectContainer : {
    }
}