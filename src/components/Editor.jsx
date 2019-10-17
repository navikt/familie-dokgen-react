import React, {Component} from 'react';
import {connect} from 'react-redux';
import Colors from '../assets/Colors';
import AceEditor from 'react-ace';
import 'brace/mode/markdown';
import 'brace/theme/textmate';
import {getTemplatePreview, setEditorContent, updateTemplateContent} from '../redux/actions/templateAction';

class Editor extends Component {

  onChange = (newValue) => {
    this.props.updateEditorContent(newValue);
    if (!this.props.readOnly) {
      this.props.updateTemplateContent(
          this.props.selectedTemplate,
          this.props.selectedTestData,
          this.props.previewFormat,
          newValue,
      );
    }
  };

  onChangeFold = (event) => {
    if (this.props.selectedTemplate !== '') {
      this.props.getTemplateContentInHTML(
          this.props.selectedTemplate,
          this.props.selectedTestData,
          this.props.previewFormat);
    }
  };

  render() {
    return (
        <div style={style.editorContainer}>
          <AceEditor
              mode="markdown"
              theme="textmate"
              onChange={this.onChange.bind(this)}
              name="UNIQUE_ID_OF_DIV"
              editorProps={{$blockScrolling: true}}
              value={this.props.editorContent}
              style={style.aceEdit}
              readOnly={this.props.readOnly}
              onLoad={(editor) => {
                editor.getSession().on('changeFold', this.onChangeFold);
              }}
          />
        </div>
    );
  }
}

const mapStateToProps = state => ({
  selectedTemplate: state.templateReducer.selectedTemplate,
  editorContent: state.templateReducer.editorContent,
  readOnly: state.templateReducer.readOnly,
  previewFormat: state.templateReducer.previewFormat,
  selectedTestData: state.templateReducer.selectedTestData,
  aktivTab: state.templateReducer.aktivTab,
});

const mapDispatchToProps = dispatch => ({
  getTemplateContentInHTML: (templateName, testDataName, previewFormat) =>
      dispatch(getTemplatePreview(templateName, testDataName, previewFormat)),
  updateEditorContent: (content) =>
      dispatch(setEditorContent(content)),
  updateTemplateContent: (templateName, testDataName, previewFormat, markdownContent) =>
      dispatch(updateTemplateContent(templateName, testDataName, previewFormat, markdownContent)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Editor);

const style = {
  editorContainer: {
    height: '95%',
    border: '1px solid' + Colors.baseColors.navGra20,
    borderTop: 'none',
  },
  aceEdit: {
    width: '100%',
    height: '100%',
  },
};
