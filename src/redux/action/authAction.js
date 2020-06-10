import Axios from 'axios';
import { APIURL } from '../../helper/apiurl'
import {
    REGISTER_SUCCESS,
    REGISTER_ERROR,
    OPEN_REGISTER,
    LOGIN_SUCCESS,
    LOGIN_ERROR,
    LOGOUT_SUCCESS
} from '../../helper/types'


// -------------- MODAL REGISTER ---------------
export const Open_Register = act => {
    return {
        type: OPEN_REGISTER,
        payload: act
    };
};


// -------------- REGISTER ---------------
export const Register = ({ nama, email, phone, alamat, password, confpassword }) => {
    return (dispacth) => {
        if (nama === '' || email === '' || phone === '' || alamat === '' || password === '' || confpassword === '') {
            return dispacth({ type: REGISTER_ERROR, payload: "Ops.. pastika semua form terisi." })
        }
        if (password !== confpassword) {
            return dispacth({ type: REGISTER_ERROR, payload: 'Pastikan Password dan Konfirmasi Password sudah sesuai' })
        }
        // axios start here ==============================
        else {
            Axios.post(APIURL + 'auth/register', { nama, email, phone, alamat, password })
                .then((res) => {
                    if (res.data.status === REGISTER_ERROR) {
                        dispacth({ type: REGISTER_ERROR, payload: res.data.message })
                        console.log(res.data.message)
                    } else {
                        dispacth({ type: REGISTER_SUCCESS, payload: res.data })
                    }
                }).catch((err) => {
                    console.log('error disini', err)
                    console.log(err);
                })
        }
    }
}

// -------------- Render Error Register ------------
export const Error_Register = (act) => {
    return {
        type: REGISTER_ERROR,
        payload: act
    }
}



// -------------- LOGIN --------------
export const Login = (email, password) => {
    return (dispacth) => {
        Axios.get(`${APIURL}auth/login?email=${email}&password=${password}`)
            .then(res => {
                if (res.data.status === LOGIN_SUCCESS) {
                    console.log('id di authaction', res.data.id)

                    localStorage.setItem('id', res.data.id) // Localstorage membuat/set item dengan nama id. id tersebut akan disimpan saat login
                    dispacth({ type: LOGIN_SUCCESS, payload: res.data.result }) //===============
                    // .then(() => {

                    // })
                } else {
                    console.log(res.data.message)
                    dispacth({ type: LOGIN_ERROR, payload: res.data.message })
                }
            }).catch(err => {
                console.log('error catch login', err)
            })
    }
}


// -------------- Keep Login ------------
export const reLogin = payload => {
    return {
        type: LOGIN_SUCCESS,
        payload
    }
}


// -------------- Render Error Login ------------
export const Error_Login = (act) => {
    return {
        type: LOGIN_ERROR,
        payload: act
    }
}


// -------------- Logout ------------
export const Logout = () => {
    return {
        type: LOGOUT_SUCCESS
    }
}
