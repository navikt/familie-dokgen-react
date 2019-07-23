import React, { Component } from 'react';


class CreateTestSet extends Component {

    render(){
        return (
            <div>
                <Knapp onClick={() => this.openModal()}>Klikk for å åpne modal</Knapp>
                <Modal
                    isOpen={this.state.modalIsOpen}
                    onRequestClose={() => this.closeModal()}
                    closeButton={true}
                    contentLabel="Min modalrute"
                >
                    <div style={{padding:'2rem 2.5rem'}}>Innhold her</div>
                </Modal>
            </div>
        )
    }
}

export default CreateTestSet;