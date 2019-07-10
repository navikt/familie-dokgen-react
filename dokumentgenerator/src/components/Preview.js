import React, {Component} from 'react';
import {connect} from 'react-redux';
import Iframe from 'react-iframe'


class Preview extends Component {

    render(){
        return (
            <div style={style.previewContainer}>  
                <Iframe url={this.props.previewURL}
                    width="450px"
                    height="450px"
                    id="myId"
                    className="myClassname"
                    display="initial"
                    position="relative"/>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    ...state,
    selectedTemplate : state.templateReducer.selectedTemplate,
    previewContent : state.templateReducer.previewContent,
    previewURL :state.templateReducer.previewURL
});

export default connect(mapStateToProps) (Preview)

const style = {
    previewContainer : {
        overflowY: "scroll",
        height: "95%",
        backgroundColor: "white"
    }
}