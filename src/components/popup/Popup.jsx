import React, {useState} from 'react';
import Input from "../input/Input";
import './popup.scss'
import {useDispatch, useSelector} from "react-redux";
import {setVisiblePopup} from "../../reducers/fileReducer";
import {createDir} from "../../actions/file";

const Popup = () => {
    const [dirName, setDirName] = useState('')
    const {visiblePopup, currentDir} = useSelector(state => state.files)
    const dispatch = useDispatch()

    function createDirHandler() {
        dispatch(createDir(currentDir, dirName ))
        dispatch(setVisiblePopup())
        setDirName('')
    }

    return (
        visiblePopup &&
        <div className='popup' onClick={() => dispatch(setVisiblePopup())}>
            <div className="popup__content" onClick={e => e.stopPropagation()}>
                <div className="popup__header">
                    <div className="popup__title"></div>
                    <button className='popup__close' onClick={() => dispatch(setVisiblePopup())}>X</button>
                </div>
                <Input type='text' placeholder='Введит название папки' value={dirName}
                       handleChange={setDirName}/>
                <button className="popup__create" onClick={() => createDirHandler()}>Создать</button>
            </div>
        </div>
    );
};

export default Popup;