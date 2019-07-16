import React, { Component } from 'react';
import { Select } from 'nav-frontend-skjema';
import { connect } from 'react-redux';

class SelectTestSet extends Component {

    handleChange(event) {
        //let selected = event.target.value;
        //this.props.setTemplateType(selected);
    }

    render() {
        //const templateList = this.props.templates;
        //listItems = templateList.map((w) =>
          //  <option className="listItem" key={w}> {w} </option>);

        return (
            <div style={this.props.style}>
                {this.props.templateIsSelected && <Select label='Hvilken testsett vil du se?'
                        bredde="xl"
                        onChange={(e) => this.handleChange(e)}
                        >
                    <option key="" value="">Velg et testsett</option>
                </Select>}
            </div>
        )
    }
}

const mapStateToProps = state => ({
    ...state,
    selectedTemplate: state.templateReducer.selectedTemplate,
    templateIsSelected : state.templateReducer.templateIsSelected
    //templates: state.templateReducer.templateNames
});

const mapDispatchToProps = dispatch => ({
    //setTemplateType: (selected) => dispatch(selectedTemplate(selected)),
    //getTemplateNames: () => dispatch(getTemplateNames())
});

export default connect(mapStateToProps, mapDispatchToProps)(SelectTestSet);