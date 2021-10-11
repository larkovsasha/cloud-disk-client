import React from 'react';
import {useDispatch} from "react-redux";
import {deleteAvatar, uploadAvatar} from "../../actions/user";

const Profile = () => {
    const dispatch = useDispatch()
    return (
        <div>
            <button onClick={() => dispatch(deleteAvatar())}>
                удалить аватар
            </button>
            <input accept='image/*' onChange={ e => dispatch(uploadAvatar(e.target.files[0]))} type="file" placeholder='загрузить аватар'/>
        </div>
    );
};

export default Profile;