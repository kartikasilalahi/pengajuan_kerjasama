import React, { useEffect, useState } from 'react';
import { Input, Label, Button, Form } from 'reactstrap'
import Axios from 'axios'
import { APIURL } from '../../helper/apiurl'
import Toast from 'light-toast'
import Swal from "sweetalert2";



function Profil() {

    const [dataProfil, setdataProfil] = useState([]);
    const [editProfil, seteditProfil] = useState({});
    const [ubahEmail, setubahEmail] = useState({});
    const [editPass, seteditPass] = useState({
        password: '',
        newpassword: '',
        confpass: ''
    });
    const [message, setmessage] = useState({
        errorprofil: '',
        errorpass: '',
        erroremail: ''
    });


    /* -------- USEEFFECT -------- */
    useEffect(() => {
        let id = parseInt(localStorage.getItem('id'))
        Axios.get(`${APIURL}auth/getprofil/${id}`)
            .then(res => {
                setdataProfil(res.data)
                seteditProfil({
                    ...editProfil, nama: res.data[0].nama,
                    alamat: res.data[0].alamat,
                    phone: res.data[0].phone,
                    linkperusahaan: res.data[0].linkperusahaan,
                    jenisperusahaan: res.data[0].jenisperusahaan
                })
                setubahEmail({ email: res.data[0].email })
            })
            .catch(err => { console.log(err) })
    }, [])


    /* ------------ Button Edit --------- */
    const btnEdit = () => {
        let id = parseInt(localStorage.getItem('id'))
        let data = editProfil
        console.log('ini', data)
        Axios.put(`${APIURL}auth/editprofil/${id}`, data)
            .then(res => {
                Toast.loading('Mengedit Profil.. tunggu beberapa detik!')
                if (res.data.status) {
                    setTimeout(() => {
                        Toast.fail(`Gagal edit profil! ${res.data.message}`, 3000)
                        Toast.hide();
                    }, 3000);
                } else {
                    setTimeout(() => {
                        Toast.success('Success..', 2000)
                        setmessage({ ...message, error: '' })
                        Toast.hide();
                    }, 3000);
                }
            }).catch(err => console.log(err))
    }

    /* ------------ Button change email --------- */
    const btnUbahEmail = () => {
        let id = parseInt(localStorage.getItem('id'))
        console.log('emaill', ubahEmail)
        let email = ubahEmail
        Swal.fire({
            title: 'Yakin Mengganti Email?',
            text: ' Jika Ya Login Selanjutnya Akan Menggunakan Email yang Baru ',
            icon: 'warning',
            showCancelButton: 'true',
            cancelButtonText: 'Tidak',
            confirmButtonText: "Ya"
        }).then(result => {
            if (result.value) {
                Swal.fire({
                    title: 'Mengganti email',
                    text: 'Tunggu beberapa detik',
                    timer: 2100,
                    allowOutsideClick: false,
                    timerProgressBar: true,
                    onBeforeOpen: () => {
                        Swal.showLoading()
                    }
                })
                    .then(() => {
                        Axios.put(`${APIURL}auth/ubahemail/${id}`, email)
                            .then(res => {
                                if (res.data.status === 'error') {
                                    setmessage({ ...message, erroremail: res.data.message })
                                    Swal.fire({
                                        title: 'Email Gagal Diubah',
                                        text: `${res.data.message}`,
                                        icon: 'error',
                                        showConfirmButton: false,
                                        timer: 2800
                                    })
                                } else if (res.data.status === 'warning') {
                                    setmessage({ ...message, erroremail: res.data.message })
                                    Swal.fire({
                                        title: 'Email Tetap Sama',
                                        text: `${res.data.message}`,
                                        icon: 'warning',
                                        showConfirmButton: false,
                                        timer: 2800
                                    })
                                }
                                else {
                                    Swal.fire({
                                        title: 'Email berhasil Diubah',
                                        text: `Perhatikan! Login selanjutnya tidak menggunakan email lama lagi`,
                                        icon: 'success',
                                        showConfirmButton: false,
                                        timer: 2800
                                    })
                                }
                            })
                            .catch(err => console.log(err))
                    })
            }
        })
    }

    /* ------------ Button change password --------- */
    const btnUbahPassword = () => {
        let { password, newpassword, confpass } = editPass

        let id = parseInt(localStorage.getItem('id'))
        if (!password || !newpassword || !confpass) {
            setmessage({ ...message, errorpass: "Pastikan Semua Form Sudah Terisi" })

        } else if (newpassword !== confpass) {
            setmessage({ ...message, errorpass: "Password Baru Dan Konfirmasi Pasword Harus Sama" })
        }
        else {
            Axios.put(`${APIURL}auth/editpassword/${id}`, { password, newpassword, confpass })
                .then((res) => {
                    if (res.data.msg) {
                        setmessage({ ...message, errorpass: res.data.msg })
                    } else {
                        console.log('ya')
                        Toast.loading(`Sedang mengubah Password. Tunggu beberapa detik`);
                        setTimeout(() => {
                            Toast.success('Berhasil', 2000)
                            Toast.hide();
                            seteditPass({ ...editPass, password: '', confpass: '', newpassword: '' })
                        }, 3000);
                    }
                }).catch(err => console.log(err))
        }


    }

    /* ------------ render Error Pass --------- */
    const renderError = () => {
        if (message.errorpass) {
            // console.log('error sis ...')
            return (
                <div className="d-flex alert alert-danger mt-3 mb-2 pb-0" style={{ fontSize: '10px' }} >
                    <div >
                        <p style={{ lineHeight: '7px' }}>{message.errorpass}</p>
                    </div>
                    <div style={{ marginLeft: 'auto', fontWeight: 'bolder' }} >
                        <p onClick={() => setmessage({ ...message, errorpass: '' })} style={{ lineHeight: '7px', cursor: 'pointer' }}>x</p>
                    </div>
                </div>
            )
        }
        else return null
    }




    // ============== test console ==========
    console.log('pass', editPass)
    // console.log('email', message.erroremail)
    // ============== test console ==========

    return (
        <div className='m-1 d-flex'>

            <div className="left col-6 mr-3 py-3" style={{ backgroundColor: "whitesmoke", }}>
                {/* --- edit profil --- */}
                <div>
                    {
                        dataProfil === [] || dataProfil.length === 0 ? null :
                            <div>
                                <Label style={{ fontSize: '13px' }}>Nama Institusi</Label>
                                <Input type="text"
                                    defaultValue={dataProfil[0].nama}
                                    onChange={e => seteditProfil({ ...editProfil, nama: e.target.value })}
                                />
                                <Label className="mt-3" style={{ fontSize: '13px' }}>No Telp Institusi</Label>
                                <Input type="text"
                                    defaultValue={dataProfil[0].phone}
                                    onChange={e => seteditProfil({ ...editProfil, phone: e.target.value })}
                                />
                                <Label className="mt-3" style={{ fontSize: '13px' }}>Link/website Institusi</Label>
                                <Input type="text"
                                    defaultValue={dataProfil[0].linkperusahaan}
                                    onChange={e => seteditProfil({ ...editProfil, linkperusahaan: e.target.value })}
                                />
                                <Label className="mt-3" style={{ fontSize: '13px' }}>Jenis Institusi</Label>
                                {
                                    dataProfil[0].jenisperusahaan === 'Pemerintahan' ?
                                        <select name="jenisperusahaan" className="form-control">
                                            <option selected value="Pemerintahan">Pemerintahan</option>
                                            <option value="Non Pemerintahan">Non Pemerintahan</option>
                                        </select>
                                        :
                                        <select name="jenisperusahaan" className="form-control">
                                            <option selected value="Non Pemerintahan">Non Pemerintahan</option>
                                            <option value="Pemerintahan">Pemerintahan</option>
                                        </select>
                                }
                            </div>
                    }
                    <div className="text-right">
                        <Button className="btn btn-green mt-2" size="md" onClick={btnEdit}> Edit </Button>
                    </div>
                </div>
            </div>

            {/* =================================================================================== */}
            <div className="right col-6 py-3" style={{ backgroundColor: "whitesmoke" }}>
                {/* --- change email --- */}
                <div>
                    {
                        dataProfil === [] || dataProfil.length === 0 ? null :
                            <div>
                                <Form inline>
                                    <Input className="w-75" type="email"
                                        defaultValue={dataProfil[0].email}
                                        onChange={e => setubahEmail({ ...ubahEmail, email: e.target.value })}
                                    />
                                    <Button onClick={btnUbahEmail} className="btn btn-grey ml-4 mr-0" style={{ fontSize: '10px' }} size="sm" >change</Button>
                                </Form>
                            </div>
                    }
                </div>
                {/* ----- change password ----- */}
                <Label style={{ fontSize: '13px' }}>current password</Label>
                <Input defaultValue='' type="password" placeholder="input password sekarang"
                    onChange={e => seteditPass({ ...editPass, password: e.target.value })}
                />
                <Label className="mt-3" style={{ fontSize: '13px' }}>new password</Label>
                <Input type="password" placeholder="input password baru"
                    onChange={e => seteditPass({ ...editPass, newpassword: e.target.value })}
                />
                <Label className="mt-3" style={{ fontSize: '13px' }}>confirm new password</Label>
                <Input type="password" placeholder="confirm password baru"
                    onChange={e => seteditPass({ ...editPass, confpass: e.target.value })}
                />
                {renderError()}
                <Button onClick={btnUbahPassword} className="btn btn-green mt-3" style={{ fontSize: '10px', marginLeft: '68%' }} size="sm" >change password</Button>
            </div>
        </div>
    )

}

export default Profil 
