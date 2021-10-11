import axios from 'axios'
import {addFile, deleteFileAC, setFiles} from "../reducers/fileReducer";
import {toggleLoader} from "../reducers/appReducer";
import {API_URL} from "../config";

export function getFiles(dirId, sort) {
    return async dispatch => {
        dispatch(toggleLoader())
        try {
            let url = `${API_URL}api/files`
            if(dirId){
                url = `${API_URL}api/files` + `?parent=${dirId}`
            }
            if(sort){
                url = `${API_URL}api/files` + `?sort=${sort}`
            }
            if(sort && dirId){
                url = `${API_URL}api/files` + `?parent=${dirId}&sort=${sort}`
            }

            const response = await axios.get(url, {
                headers: {Authorization: `Bearer ${localStorage.getItem('token')}`}
            })
            dispatch(setFiles(response.data))
        } catch (e) {
            alert(e.response.data.message)
        }finally {
            dispatch(toggleLoader())
        }
    }
}

export function createDir(dirId, name) {
    return async dispatch => {
        try {
            const response = await axios.post(`${API_URL}api/files`, {
                name,
                parent: dirId,
                type: 'dir'
            }, {
                headers: {Authorization: `Bearer ${localStorage.getItem('token')}`}
            })
            dispatch(addFile(response.data))
        } catch (e) {
            alert(e.response.data.message)
        }
    }
}

export function uploadFile(file, dirId) {
    return async dispatch => {
        try {
            const formData = new FormData()
            formData.append('file', file)
            if (dirId) {
                formData.append('parent', dirId)
            }
            const response = await axios.post(`${API_URL}api/files/upload`, formData, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                    'content-type': 'multipart/form-data',
                    enctype: "multipart/form-data"
                },
                onUploadProgress: progressEvent => {
                    const totalLength = progressEvent.lengthComputable ? progressEvent.total : progressEvent.target.getResponseHeader('content-length') || progressEvent.target.getResponseHeader('x-decompressed-content-length');
                    console.log('total', totalLength)
                    if (totalLength) {
                        let progress = Math.round((progressEvent.loaded * 100) / totalLength)
                        console.log(progress)
                    }
                }
            })
            dispatch(addFile(response.data))
        } catch (e) {
            console.log(e)
        }
    }
}

export async function downloadFile(file) {
    const response = await fetch(`${API_URL}api/files/download?id=${file._id}`,{
        headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
        }
    })
    if (response.status === 200) {
        const blob = await response.blob()
        //файл приходит в бинарном виде
        const downloadUrl = window.URL.createObjectURL(blob)
        const link = document.createElement('a')
        link.href = downloadUrl
        link.download = file.name
        document.body.appendChild(link)
        link.click()
        link.remove()
    }
}
export function deleteFile(file) {
    return async dispatch => {
        try{
            const response = await axios.delete(`${API_URL}api/files/?id=${file._id}`,{
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            })
            dispatch(deleteFileAC(file._id))
            alert(response.data.message)
        }catch (e){
            console.log(e)
            alert(e?.response?.data?.message)
        }
    }

}
export function searchFiles(searchName) {
    return async dispatch => {
        dispatch(toggleLoader())
        try{
            const response = await axios.get(`${API_URL}api/files/search/?search=${searchName}`,{
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            })
            dispatch(setFiles(response.data))
        }catch (e){
            console.log(e)
            alert(e?.response?.data?.message)
        }finally {
            dispatch(toggleLoader())
        }
    }

}
