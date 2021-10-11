import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {getFiles, uploadFile} from "../../actions/file";
import FileList from "./fileList/FileList";
import './disk.scss'
import Popup from "../popup/Popup";
import {popFromStack, setCurrentDir, setSort, setVisiblePopup} from "../../reducers/fileReducer";
import {changeFilesView} from "../../reducers/appReducer";

const Disk = () => {
    const dispatch = useDispatch()
    const currentDir = useSelector( state => state.files.currentDir)
    const dirStack = useSelector( state => state.files.dirStack)
    const loader = useSelector(state => state.app.loader)
    const [dragEnter, setDragEnter] = useState(false)
    const sort =useSelector(state => state.files.sort)

    useEffect(() => {
        dispatch(getFiles(currentDir, sort))
    }, [currentDir, dispatch, sort])

    function setSortHandler(e){
        dispatch(setSort(e.target.value))
    }

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
        setDragEnter(false)
        files.forEach(file => dispatch(uploadFile(file, currentDir)))
    }

    if(loader){
        return(
            <div className='loader'>
                <div className="lds-dual-ring">

                </div>
            </div>
        )
    }
    return (

        !dragEnter ?
        <div className='disk' onDragEnter={dragEnterHandler} onDragLeave={dragLeaveHandler} onDragOver={dragEnterHandler}>
            <div className='disk__btns'>
                {currentDir && <button className='disk__back' onClick={backClickHandler}>Назад</button>}
                <button className='disk__create' onClick={() => showPopupHandler()}>Создать папку</button>
                <div className="disk__upload">



                  {/*  <form action="/upload" method="post" encType="multipart/form-data">

                        <label htmlFor="disk__upload-input" className="disk__upload-label">Загрузить файл</label>
                        <input  type='file' id='disk__upload-input' className="disk__upload-input"></input>
                        <input type="submit" value="Send"/>
                    </form>*/}
                    <label htmlFor="disk__upload-input" className="disk__upload-label">Загрузить файл</label>
                    <input onChange={(e) => {fileUploadHandle(e)}}  multiple={true} type='file' id='disk__upload-input' className="disk__upload-input"></input>
                </div>
                <select value={sort} onChange={setSortHandler}  className='disk__select'>
                    <option value="name">По имени</option>
                    <option value="type">По типу</option>
                    <option value="date">По дате</option>
                    <option value="size">По размеру</option>
                </select>
                <button onClick={() => dispatch(changeFilesView('list'))} className='disk__list' />
                <button onClick={() => dispatch(changeFilesView('plate'))} className='disk__plate' />
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