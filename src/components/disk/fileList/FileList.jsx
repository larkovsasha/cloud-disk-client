import React from 'react';
import './fileList.scss'
import {useSelector} from "react-redux";
import File from "./file/File";
import {CSSTransition, TransitionGroup} from "react-transition-group";

const FileList = () => {

    const files = useSelector(state => state.files.files)
    const fileView = useSelector(state => state.app.filesView)
    if (!files.length) {
        return (
            <div className='not-found-files'>
                <span> Файлы отсутствует</span>
            </div>
        )
    }

    if (fileView === 'plate') {
        return (
            <div className='file-plates'>
                {files.map(file => <File key={file._id} {...file}/> )}
            </div>
        );
    }

    return (
        <div className='file-list'>
            <div className='file-list__header'>
                <div className='file-list__name'>Название</div>
                <div className='file-list__date'>Дата</div>
                <div className='file-list__size'>Размер</div>
            </div>
            <TransitionGroup>
                {files.map(file =>
                    <CSSTransition
                        key={file._id}
                        timeout={500}
                        classNames={'file'}
                        exit={false}
                    >
                        <File {...file}/>
                    </ CSSTransition>)}
            </TransitionGroup>

        </div>
    );
};

export default FileList;