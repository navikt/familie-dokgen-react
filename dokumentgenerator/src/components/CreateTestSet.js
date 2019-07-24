import React, { Component } from 'react';
import Knapp from 'nav-frontend-knapper';
import Modal from 'nav-frontend-modal';
import { connect } from 'react-redux'
import { getEmptyTestSet } from '../redux/actions/templateAction';
import AceEditor from 'react-ace';
import 'brace/mode/json';
import 'brace/theme/textmate';
import axios from 'axios';


class CreateTestSet extends Component {

    constructor(props){
        super(props)

        this.state = {
            modalIsOpen : false,
            newTestSet : JSON.stringify(this.props.emptyTestSet)
        }
    }

    componentDidMount() {
        Modal.setAppElement('body');
     }

    componentDidUpdate(prevProps){
        if(prevProps.emptyTestSet !== this.props.emptyTestSet){
            this.setState({newTestSet : JSON.stringify(this.props.emptyTestSet, null, '\t')})
        }
    }

    openModal = () => {
        this.setState({modalIsOpen : true});
    }

    closeModal = () => {
        this.setState({modalIsOpen : false, newTestSet : JSON.stringify(this.props.emptyTestSet, null, '\t')})
    }

    onChange = (newValue) => {
        this.setState({newTestSet: newValue})
    }

    saveNewTestSet = (templateName, content) => {
        axios.post("maler/" + templateName + "/nyttTestSett", content, {
            headers: {'Content-Type': 'application/json'}
        })
        this.closeModal();
    }
    

    render(){
        return (
            <div style={this.props.style}>
                {this.props.templateIsSelected && <Knapp type="standard" style={{marginTop: "30px"}} onClick={() => this.openModal()}>Legg til nytt testsett</Knapp>}
                <Modal
                    isOpen={this.state.modalIsOpen}
                    onRequestClose={() => this.closeModal()}
                    closeButton={true}
                    contentLabel="Min modalrute"
                >
                    <div style={{padding:'2rem 2.5rem'}}>
                    <h3>Lag nytt testsett for {this.props.selectedTemplate}-malen</h3>
                    <AceEditor 
                        mode="json"
                        theme="textmate"
                        onChange={this.onChange.bind(this)}
                        name="UNIQUE_ID_OF_DIV"
                        editorProps={{$blockScrolling: true}}
                        value={this.state.newTestSet}
                        readOnly={this.props.readOnly}
                        />
                    <Knapp type="standard" 
                            style={{margin:"auto", marginTop:"5px", display:"flex", justifyContent: "center"}}
                            onClick={() => this.saveNewTestSet(this.props.selectedTemplate, this.state.newTestSet)}
                    >
                        Lagre
                    </Knapp>
                    </div>
                </Modal>
            </div>
        )
    }
}


const mapStateToProps = state => ({
    ...state,
    selectedTemplate: state.templateReducer.selectedTemplate,
    templateIsSelected : state.templateReducer.templateIsSelected,
    emptyTestSet : state.templateReducer.emptyTestSet
});

const mapDispatchToProps = dispatch => ({
    getEmptyTestSet : (name) => dispatch(getEmptyTestSet(name))
});

export default connect(mapStateToProps, mapDispatchToProps)(CreateTestSet);