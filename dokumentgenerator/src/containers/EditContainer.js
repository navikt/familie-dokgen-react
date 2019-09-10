import React, { Component } from 'react';
import Tabs from 'nav-frontend-tabs';
import { connect } from 'react-redux';
import { setAktivTab } from '../redux/actions/templateAction';
import Editor from '../components/Editor'
import Colors from '../assets/Colors'
import { MARKDOWN, FELLESMAL } from "../AppConstants";

class EditContainer extends Component {

    constructor() {
        super();
        this._tabs = React.createRef();
    }

    handleSelect(event, index) {
        this.props.setAktivTab(index, this.props.selectedTemplate);
    }

    componentDidUpdate(props) {
        this._tabs.current.setActiveTab("sync", this.props.aktivTab);
    }

    render(){
        return (
            <div style={this.props.style}>
                <Tabs
                    tabs={[
                        {"label": MARKDOWN},
                        {"label": FELLESMAL}
                    ]}
                    onChange={ (event, index) => {this.handleSelect(event, index)}}
                    style={{border: "1px solid" + Colors.baseColors.navGra20}}
                    ref={this._tabs}
                />
                <Editor/>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    selectedTemplate: state.templateReducer.selectedTemplate,
    aktivTab: state.templateReducer.aktivTab,
});

const mapDispatchToProps = dispatch => ({
    setAktivTab: (index, aktivMal) => dispatch(setAktivTab(index, aktivMal)),
});

export default connect(mapStateToProps, mapDispatchToProps)(EditContainer);
