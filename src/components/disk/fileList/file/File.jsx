import React from 'react';
import './file.scss'
import dirLogo from '../../../../assets/img/dir.svg'
import fileLogo from '../../../../assets/img/file.svg'
import {useDispatch, useSelector} from "react-redux";
import {pushToStack, setCurrentDir} from "../../../../reducers/fileReducer";
import {downloadFile} from "../../../../actions/file";

const File = (props) => {
    const dispatch = useDispatch()
    const currentDir = useSelector( state => state.files.currentDir)


    function openDirHandler() {
        if(props.type === 'dir'){
            dispatch(setCurrentDir(props._id))
            dispatch(pushToStack(currentDir))
        }

    }

    function downloadClickHandler(e) {
        e.stopPropagation()
        downloadFile(props)
    }

    return (
            <div className="file" onClick={ openDirHandler}>
                <img alt="" className="file__img"
                     src={props.type === 'dir' ? dirLogo : fileLogo
                     } />
                <div className="file__name"> {props.name} </div>
                {props.type !== 'dir' && <button onClick={(e) => downloadClickHandler(e)} className='file__btn file__download'>download</button>}
                <button className='file__btn file__delete'>delete</button>
                <div className="file__date"> {props.date.slice(0,10)} </div>
                <div className="file__size"> {props.size} </div>

            </div>
    );
};

export default File;