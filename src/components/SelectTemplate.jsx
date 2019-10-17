import React, {Component} from 'react';
import {Select} from 'nav-frontend-skjema';
import {connect} from 'react-redux';
import {fetchTemplates, selectedTemplate} from '../redux/actions/templateAction';

class SelectTemplate extends Component {

  componentDidMount() {
    this.props.fetchTemplates();
  }

  handleChange(event) {
    let selected = event.target.value;
    this.props.setTemplateType(selected, this.props.previewFormat);
  }

  render() {
    let listItems;
    const templates = this.props.templates;
    listItems = templates.map((w) =>
        <option className="listItem" key={w.name}> {w.name} </option>);

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
    );
  }
}

const mapStateToProps = state => ({
  selectedTemplate: state.templateReducer.selectedTemplate,
  templates: state.templateReducer.templates,
  previewFormat: state.templateReducer.previewFormat,
});

const mapDispatchToProps = dispatch => ({
  setTemplateType: (selected, format) => dispatch(selectedTemplate(selected, format)),
  fetchTemplates: () => dispatch(fetchTemplates()),
});

export default connect(mapStateToProps, mapDispatchToProps)(SelectTemplate);
