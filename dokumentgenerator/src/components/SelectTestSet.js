import React, { Component } from 'react';
import { Select } from 'nav-frontend-skjema';
import { connect } from 'react-redux';
import { setSelectedTestData } from '../redux/actions/templateAction';

class SelectTestSet extends Component {

    handleChange(event) {
        let selected = event.target.value;
        this.props.setSelectedTestData(selected);
    }

    render() {
        const testSetList = this.props.testDataNames;
        let listItems = testSetList.map((w) =>
            <option className="listItem" key={w}> {w} </option>);

        return (
            <div style={this.props.style}>
                {this.props.templateIsSelected && <Select label='Hvilken testsett vil du se?'
                        bredde="xl"
                        onChange={(e) => this.handleChange(e)}
                        >
                    {listItems}
                </Select>}
            </div>
        )
    }
}

const mapStateToProps = state => ({
    ...state,
    selectedTemplate: state.templateReducer.selectedTemplate,
    templateIsSelected : state.templateReducer.templateIsSelected,
    testDataNames: state.templateReducer.testDataNames,
    selectedTestData : state.templateReducer.selectedTestData
});

const mapDispatchToProps = dispatch => ({
    setSelectedTestData: (testDataName) => dispatch(setSelectedTestData(testDataName))
});

export default connect(mapStateToProps, mapDispatchToProps)(SelectTestSet);