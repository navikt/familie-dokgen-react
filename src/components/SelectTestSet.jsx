import React, {Component} from 'react';
import {Select} from 'nav-frontend-skjema';
import {connect} from 'react-redux';
import {getTemplatePreview, setSelectedTestData} from '../redux/actions/templateAction';

class SelectTestSet extends Component {

  handleChange(event) {
    let selected = event.target.value;
    this.props.setSelectedTestData(selected);
  }

  render() {
    const {getTemplateContentInHTML, selectedTemplate, selectedTestData, previewFormat} = this.props;
    getTemplateContentInHTML(selectedTemplate, selectedTestData, previewFormat);

    const testDataList = this.props.testDataList;
    let listItems = testDataList.map((w) =>
        <option className="listItem" key={w.testDataName}> {w.testDataName} </option>);

    return (
        <div style={this.props.style}>
          {this.props.templateIsSelected && <Select label='Hvilket testsett vil du se?'
                                                    bredde="xl"
                                                    onChange={(e) => this.handleChange(e)}
          >
            {listItems}
          </Select>}
        </div>
    );
  }
}

const mapStateToProps = state => ({
  selectedTemplate: state.templateReducer.selectedTemplate,
  templateIsSelected: state.templateReducer.templateIsSelected,
  testDataList: state.templateReducer.testDataList,
  previewFormat: state.templateReducer.previewFormat,
  selectedTestData: state.templateReducer.selectedTestData,
});

const mapDispatchToProps = dispatch => ({
  setSelectedTestData: (testDataName) => dispatch(setSelectedTestData(testDataName)),
  getTemplateContentInHTML: (templateName, testDataName, format) =>
      dispatch(getTemplatePreview(templateName, testDataName, format)),
});

export default connect(mapStateToProps, mapDispatchToProps)(SelectTestSet);
