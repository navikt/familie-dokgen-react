import {Knapp} from 'nav-frontend-knapper';
import React, {Component} from 'react';
import {connect} from 'react-redux';
import {downloadPdf, setPreviewFormat} from '../redux/actions/templateAction';
import Tabs from 'nav-frontend-tabs';
import Preview from '../components/Preview';
import Colors from '../assets/Colors';
import {MOBIL, NETTBRETT, PDF, WEB} from '../AppConstants';

class PreviewContainer extends Component {

  constructor() {
    super();

    this.state = {
      tabNames: [WEB, NETTBRETT, MOBIL, PDF],
      chosenTab: 0,
      stylingClassName: 'Web',
    };
  }

  handleSelect(event, index) {
    this.setState({
      chosenTab: index,
      stylingClassName: this.state.tabNames[index],
    });
    if (this.state.tabNames[index] === 'PDF') {
      this.props.updatePreviewFormat('preview-pdf');
    } else {
      this.props.updatePreviewFormat('preview-html');
    }
  }

  render() {
    const downloadBtn = () => {
      if (this.props.previewFormat === 'preview-pdf') {
        return (
            <Knapp type="standard"
                   style={{margin: '1em auto 3em auto', display: 'flex', justifyContent: 'center'}}
                   onClick={() => this.props.downloadPdf(this.props.selectedTemplate, this.props.selectedTestData)}
            >
              Last ned PDF
            </Knapp>);
      }
    };

    return (
        <div style={this.props.style}>
          <Tabs
              tabs={[
                {'label': this.state.tabNames[0]},
                {'label': this.state.tabNames[1]},
                {'label': this.state.tabNames[2]},
                {'label': this.state.tabNames[3]},
              ]}
              onChange={(event, index) => this.handleSelect(event, index)}
              style={{border: '1px solid' + Colors.baseColors.navGra20}}
          />
          <Preview
              stylingClassName={this.state.stylingClassName}
              isPDF={this.props.previewFormat}
          />
          {downloadBtn()}
        </div>
    );
  }
}

const mapStateToProps = state => ({
  selectedTemplate: state.templateReducer.selectedTemplate,
  previewFormat: state.templateReducer.previewFormat,
  selectedTestData: state.templateReducer.selectedTestData,
});

const mapDispatchToProps = dispatch => ({
  updatePreviewFormat: (format) => dispatch(setPreviewFormat(format)),
  downloadPdf: (name, testSetName) => dispatch(downloadPdf(name, testSetName)),
});

export default connect(mapStateToProps, mapDispatchToProps)(PreviewContainer);
