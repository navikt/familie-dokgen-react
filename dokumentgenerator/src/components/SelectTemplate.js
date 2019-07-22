import React, { Component } from 'react';
import { Select } from 'nav-frontend-skjema';
import { connect } from 'react-redux';
import { selectedTemplate, getTemplateNames } from '../redux/actions/templateAction';

class SelectTemplate extends Component {

    componentDidMount() {
        this.props.getTemplateNames();
    }

    handleChange(event) {
        let selected = event.target.value;
        this.props.setTemplateType(selected, this.props.previewFormat);
    }

    render() {
        let listItems;
        const templateList = this.props.templates;
        listItems = templateList.map((w) =>
            <option className="listItem" key={w}> {w} </option>);
            
        return (
            <div style={this.props.style}>
                <Select label='Hvilken mal vil du redigere?'
                        bredde="xl"
                        onChange={(e) => this.handleChange(e)}
                        >
                    <option key="" value="">Velg en mal</option>
                    {listItems}
                </Select>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    ...state,
    selectedTemplate: state.templateReducer.selectedTemplate,
    templates: state.templateReducer.templateNames,
    previewFormat: state.templateReducer.previewFormat
});

const mapDispatchToProps = dispatch => ({
    setTemplateType: (selected, format) => dispatch(selectedTemplate(selected, format)),
    getTemplateNames: () => dispatch(getTemplateNames())
});

export default connect(mapStateToProps, mapDispatchToProps)(SelectTemplate);
