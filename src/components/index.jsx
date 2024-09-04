import './style.css';
import { useState } from 'react';
import data from "./dummydata";

export const Accordion = () => {
    const [select, setSelect] = useState(null);
    const [enabledMultiSelect, setEnableMultiSelect] = useState(false);
    const [multiple, setMultiple] = useState([]);

    function handleBtnEnabled(enabledMultiSelect) {
        setEnableMultiSelect(enabledMultiSelect);
    }

    function addMultiSelection(currentId) {
        let cpyMutiple = [...multiple];
        const findIndexOfCurrentId = cpyMutiple.indexOf(currentId);

        console.log(findIndexOfCurrentId); // check log file to debug

        if (findIndexOfCurrentId === -1) cpyMutiple.push(currentId);
        else cpyMutiple.splice(findIndexOfCurrentId, 1);

        setMultiple(cpyMutiple);
    }

    function handleSelect(currentId) {
        setSelect(currentId === select ? null : currentId);
    }

    return (
        <div className='wrapper'>
            <button onClick={() => { handleBtnEnabled(!enabledMultiSelect) }}>Enabled Multi Selection</button>
            <div className='container'>
                {
                    data && data.length > 0
                        ? data.map((dataItem) => (
                            <div key={dataItem.id} className="item">
                                <div onClick={enabledMultiSelect
                                    ? () => addMultiSelection(dataItem.id)
                                    : () => handleSelect(dataItem.id)} className="title">
                                    <h4>{dataItem.questions}</h4>
                                    <span>+</span>
                                </div>
                                <div className='overDesc'>
                                    {
                                        enabledMultiSelect
                                            ? multiple.indexOf(dataItem.id) !== -1 && (
                                                <div>{dataItem.answer}</div>
                                            )
                                            : select === dataItem.id && (
                                                <div>{dataItem.answer}</div>
                                            )
                                    }

                                </div>
                            </div>
                        ))
                        : <div>No data founded !</div>
                }
            </div>
        </div>
    )
}
