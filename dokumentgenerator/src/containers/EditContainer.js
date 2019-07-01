import React, { Component } from 'react';
import Knapp from 'nav-frontend-knapper';
import Tabs from 'nav-frontend-tabs'


export default class EditContainer extends Component {

    render(){
        return (
            <div style={style.editContainer}>
                <div style={style.textfieldContainer}> 
                <Tabs 
                        tabs={[
                            {"label": "Markdown"},
                            {"label": "Rich text"},
                        ]}
                        onChange={ () => {}} 
                    />
                    <br/><p>Her skal teksteditoren komme </p>
                </div>
                <Knapp style={style.buttons} type="standard">Kompiler</Knapp>
            </div>
        )
    }
}


const style = {
    editContainer : { 
        height: "100%"
    },
    textfieldContainer : {
        height: "75%",
        width: "80%",
        margin: "auto",
        marginBottom: "2%",
        backgroundColor: "#F5F5F5"
    },
    buttons : {
        width: "250px"
    }
}