import React, { Component } from 'react';
import { connect } from 'react-redux';


class Editor extends Component {

    render(){
        return (
            <div>
                {this.props.templateContent}
            </div>
        )
    }
}

const mapStateToProps = state => ({
    ...state,
    templateContent : state.templateReducer.templateContent
   });

export default connect(mapStateToProps) (Editor)