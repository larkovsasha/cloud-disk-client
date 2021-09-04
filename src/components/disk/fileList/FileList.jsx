import React from 'react';
import './fileList.scss'
import {useSelector} from "react-redux";
import File from "./file/File";
const FileList = () => {

    const files = useSelector(state => state.files.files).map( file => <File {...file} key={file._id}/>)
    /*const files = [{_id: 1, name:'dfg', type: 'dir', size: '45gb', date: 'date'},
        {_id: 2, name:'dfg2', type: 'cg', size: '45gb', date: '2020.10.25'}]
        .map( file => <File {...file}key={file._id}/>)*/

    return (
        <div className='file-list'>
            <div className='file-list__header'>
                <div className='file-list__name'>Название</div>
                <div className='file-list__date'>Дата</div>
                <div className='file-list__size'>Размер</div>
            </div>
            {files}
        </div>
    );
};

export default FileList;