import React from 'react';
import './file.scss'
import dirLogo from '../../../../assets/img/dir.svg'
import fileLogo from '../../../../assets/img/file.svg'
import {useDispatch, useSelector} from "react-redux";
import { pushToStack, setCurrentDir} from "../../../../reducers/fileReducer";
import {deleteFile, downloadFile} from "../../../../actions/file";
import {formatSize} from "../../../../utils/formatSize";

const File = (props) => {
    const dispatch = useDispatch()
    const currentDir = useSelector( state => state.files.currentDir)
    const fileView = useSelector(state => state.app.filesView)

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
    function deleteClickHandler(e) {
        e.stopPropagation()
        dispatch(deleteFile(props))
    }
    if (fileView === 'plate') {
        return (
            <div className="file-plate" onClick={ openDirHandler}>
                <img alt="" className="file-plate__img"
                     src={props.type === 'dir' ? dirLogo : fileLogo
                     } />
                <div className="file-plate__name"> {props.name} </div>
                <div className="file-plate__btns">
                    {props.type !== 'dir' &&
                    <button onClick={(e) => downloadClickHandler(e)} className='file__btn-plate file__download'>download</button>}
                    <button className='file__btn-plate file__delete' onClick={deleteClickHandler}>delete</button>
                </div>
            </div>
        );
    }

    return (
            <div className="file" onClick={ openDirHandler}>
                <img alt="" className="file__img"
                     src={props.type === 'dir' ? dirLogo : fileLogo
                     } />
                <div className="file__name"> {props.name} </div>
                {props.type !== 'dir' && <button onClick={(e) => downloadClickHandler(e)} className='file__btn file__download'>download</button>}
                <button className='file__btn file__delete' onClick={deleteClickHandler}>delete</button>
                <div className="file__date"> {props.date.slice(0,10)} </div>
                <div className="file__size"> {formatSize(props.size)} </div>

            </div>
    );
};

export default File;