import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {getFiles, uploadFile} from "../../actions/file";
import FileList from "./fileList/FileList";
import './disk.scss'
import Popup from "../popup/Popup";
import {popFromStack, setCurrentDir, setVisiblePopup} from "../../reducers/fileReducer";

const Disk = () => {
    const dispatch = useDispatch()
    const currentDir = useSelector( state => state.files.currentDir)
    const dirStack = useSelector( state => state.files.dirStack)
    const [dragEnter, setDragEnter] = useState(false)

    useEffect(() => {
        dispatch(getFiles(currentDir))
    }, [currentDir, dispatch])

    function showPopupHandler() {
        dispatch(setVisiblePopup())
    }


    function backClickHandler() {
        dispatch(popFromStack())
        dispatch(setCurrentDir(dirStack[dirStack.length - 1]))
    }

    function fileUploadHandle(e) {
        const files = [...e.target.files]
        files.forEach(file => dispatch(uploadFile(file, currentDir)))
    }
    function dragEnterHandler(e){
        e.preventDefault()
        e.stopPropagation()
        setDragEnter(true)
    }
    function dragLeaveHandler(e){
        e.preventDefault()
        e.stopPropagation()
        setDragEnter(false)
    }
    function dropHandler(e){
        e.preventDefault()
        e.stopPropagation()
        const files = [...e.dataTransfer.files]
        console.log(files)
        setDragEnter(false)
        files.forEach(file => dispatch(uploadFile(file, currentDir)))
    }


    return (
        !dragEnter ?
        <div className='disk' onDragEnter={dragEnterHandler} onDragLeave={dragLeaveHandler} onDragOver={dragEnterHandler}>
            <div className='disk__btns'>
                {currentDir && <button className='disk__back' onClick={backClickHandler}>Назад</button>}
                <button className='disk__create' onClick={() => showPopupHandler()}>Создать папку</button>
                <div className="disk__upload">
                    <label htmlFor="disk__upload-input" className="disk__upload-label">Загрузить файл</label>
                    <input onChange={(e) => {fileUploadHandle(e)}}  multiple={true} type='file' id='disk__upload-input' className="disk__upload-input"></input>
                </div>
            </div>
           <FileList />
            <Popup/>
        </div>
            :
        <div className='drop-area' onDrop={dropHandler} onDragEnter={dragEnterHandler} onDragLeave={dragLeaveHandler} onDragOver={dragEnterHandler}>
            перетащите файлы сюда
        </div>
    );
};

export default Disk;