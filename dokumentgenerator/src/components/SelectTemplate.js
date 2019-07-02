import React, { Component } from 'react';
import { Select } from 'nav-frontend-skjema';

export default class SelectTemplate extends Component { 

    constructor(){
        super()

        this.state = {
            value : ''
        }
    }

    handleChange(event) {
        let selected = event.target.value;
        this.setState({
            value : selected
        });
    }

    render() {
        return (
            <div style={style.selectContainer}>
                <Select label='Hvilken mal vil du redigere?'
                        bredde="xl"
                        onChange={(e) => this.handleChange(e)}>
                    <option value=''>Velg mal</option>
                    <option value='mal1'>Mal 1</option>
                    <option value='mal2'>Mal 2</option>
                    <option value='mal3'>Mal 3</option>
                </Select>
            </div>
        )
    }
}

const style = {
    selectContainer : {
    }
}