import {
    REGISTER_ERROR,
    REGISTER_SUCCESS,
    OPEN_REGISTER,
    LOGIN_SUCCESS,
    LOGIN_ERROR,
    LOGOUT_SUCCESS
} from '../../helper/types'

const INITIAL_STATE = {
    id: 0,
    nama: '',
    email: '',
    phone: '',
    alamat: '',
    status: '',
    roleid: 0,

    errorRegister: '',
    register: false,
    modalregister: false,
    succes_register: '',

    login: false,
    succes_login: '',
    errorlogin: '',

    logout: true
}

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {

        // ---- Register ----
        case REGISTER_SUCCESS:
            return { ...state, ...action.payload, register: true, errorRegister: '', modalregister: false, succes_register: action.payload.message, logout: false }
        case REGISTER_ERROR:
            return { ...state, errorRegister: action.payload, register: false, modalregister: true, succes_register: '', logout: false }
        case OPEN_REGISTER:
            return { ...state, modalregister: action.payload, errorRegister: '', succes_register: '', logout: false }


        // ---- Login ----
        case LOGIN_SUCCESS:
            return { ...state, ...action.payload, login: true, succes_login: 'Berhasil Login..', errorlogin: '', logout: false, succes_register: '' }
        case LOGIN_ERROR:
            return { ...state, errorlogin: action.payload, succes_register: '', login: false, logout: false }

        // ---- Logout ----         
        case LOGOUT_SUCCESS:
            return { ...INITIAL_STATE }

        default:
            return state
    }
}