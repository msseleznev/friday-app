import React from 'react';
import { SuperButton } from '../../common/superButton/SuperButton';
import {SuperCheckbox} from "../../common/superCheckbox/SuperCheckbox";
import { SuperDoubleRange } from '../../common/superDoubleRange/SuperDoubleRange';
import { SuperInputText } from '../../common/superInputText/SuperInputText';


const TestPage = () => {

    return (
        <div style={{padding: 50}}>
            <hr/>
            <SuperButton>Button</SuperButton>
            <hr/>
            <SuperCheckbox>Checkbox</SuperCheckbox>
            <hr/>
            <div style={{width: 300}}>
                <SuperDoubleRange/>
            </div>

            <hr/>
            <SuperInputText/>


        </div>
    );
};

export default TestPage;

