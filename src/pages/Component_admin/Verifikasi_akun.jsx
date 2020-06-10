import React, { Component } from 'react'
import Axios from 'axios'
import Swal from "sweetalert2";
import Zoom from '@material-ui/core/Zoom';
import Tooltip from '@material-ui/core/Tooltip';
import { APIURL } from '../../helper/apiurl'
import { Table } from 'reactstrap'
import { MDBBtn } from 'mdbreact'


class Verifikasi_akun extends Component {

    state = {
        daftarAkun: [],
        daftarVerified: [],
        daftarUnverified: [],
        verified: 'false',
        unverified: 'true',
        indexedit: -1
    }

    // ---------- Componentdidmount ------------
    componentDidMount() {
        Axios(`${APIURL}admin/alluser`)
            .then(res => { this.setState({ daftarAkun: res.data }) })
            .catch(err => { console.log(err) })
        Axios(`${APIURL}admin/verified`)
            .then(res => { this.setState({ daftarVerified: res.data }) })
            .catch(err => { console.log(err) })
        Axios(`${APIURL}admin/unverified`)
            .then(res => { this.setState({ daftarUnverified: res.data }) })
            .catch(err => { console.log(err) })
    }


    /* -------- Onverify (untuk mengetahui akun index  ---------
       ---------- ke berapa yang ingin di verify) ------------ */
    onVerify = (i) => {
        this.setState({ indexedit: i })
    }


    // ---------- render isi tabel daftar user unverified ------------
    userUnverified = () => {
        let { daftarUnverified } = this.state
        return (
            daftarUnverified.map((val, i) => {
                return (
                    <tr key={i} className="text-center">
                        <th>{i + 1}</th>
                        <td>{val.nama}</td>
                        <td>{val.email}</td>
                        <td>{val.phone}</td>
                        <td>{val.alamat}</td>
                        {/* <td>{val.status}</td> */}
                        <td >
                            <Tooltip TransitionComponent={Zoom} title="unverified" arrow placement="top">
                                <img src={require('../../image/unverified.png')} width="22px" alt='img' style={{ cursor: "pointer" }} />
                            </Tooltip>
                        </td>
                        <td>
                            <MDBBtn className="my-0" size='sm' color='light-blue' onClick={() => { this.onVerify(i) }}>Verify</MDBBtn>
                        </td>
                    </tr >
                )
            })
        )
    }


    // ---------- render isi tabel daftar user verified ------------
    userVerified = () => {
        let { daftarVerified } = this.state
        return (
            daftarVerified.map((val, i) => {
                return (
                    <tr key={i} className="text-center">
                        <th>{i + 1}</th>
                        <td>{val.nama}</td>
                        <td>{val.email}</td>
                        <td>{val.phone}</td>
                        <td>{val.alamat}</td>
                        <td>
                            <Tooltip TransitionComponent={Zoom} title="verified" arrow placement="top">
                                <img src={require('../../image/verified.png')} width="22px" style={{ cursor: "pointer" }} alt='img' />
                            </Tooltip>
                        </td>
                        <td>
                            <MDBBtn size='sm' className="my-0">Detail</MDBBtn>
                        </td>
                    </tr>
                )
            })
        )
    }


    render() {
        let { verified, unverified, indexedit, daftarUnverified, daftarVerified } = this.state

        if (indexedit > -1) {
            Swal.fire({
                title: 'Yakin untuk verifikasi akun ini?',
                icon: 'warning',
                showCancelButton: 'true',
                confirmButtonText: "ya!"
            }).then(result => {
                if (result.value) {
                    Swal.fire({
                        title: 'Sudah diverifikasi',
                        icon: 'success',
                        showConfirmButton: false,
                        timer: 1000
                    }).then(() => {
                        let email = daftarUnverified[indexedit].email
                        Axios.put(`${APIURL}admin/verifyuser`, { email })
                            .then(res => { this.setState({ daftarUnverified: res.data.unver, daftarVerified: res.data.ver, indexedit: -1 }) })
                            .catch(err => { console.log(err) })
                    })
                }
            })

        }

        return (
            <div>

                <div className="kategori-user  d-flex pl-0 ml-4" style={{ cursor: 'pointer' }}>
                    <div className={`${unverified} verified mr-4 pl-0`}
                        onClick={() => {
                            this.setState({ verified: 'false', unverified: 'true' })
                        }}>
                        Belum diverifikasi
                    </div>
                    <div className={`${verified} verified mr-4 pl-0`}
                        onClick={() => {
                            this.setState({ unverified: 'false', verified: 'true' })
                        }}>
                        Sudah diverifikasi
                    </div>
                </div>

                <div>
                    {
                        unverified === "true" ?
                            <div className="mx-auto" style={{ width: '85%' }}>
                                {
                                    daftarUnverified.length > 0 ?
                                        <Table className="tabel-user m-3" striped >
                                            <thead>
                                                <tr className="text-center">
                                                    <th>No.</th>
                                                    <th>Nama Company</th>
                                                    <th>Email</th>
                                                    <th>Phone</th>
                                                    <th>Alamat</th>
                                                    <th>Status</th>
                                                    <th>Action</th>
                                                </tr>
                                            </thead>
                                            <tbody className="p-3">
                                                {this.userUnverified()}
                                            </tbody>
                                        </Table> : <div className="mx-auto mt-5" style={{ fontWeight: 'bold', color: 'gray' }}>Tidak Ada Akun baru atau tidak ditemukan akun yang belum di verifikasi</div>
                                }
                            </div>
                            :
                            verified === "true" ?
                                <div className="mx-auto" style={{ width: '85%' }}>{
                                    daftarVerified.length > 0 ?
                                        <Table className="tabel-user m-3" striped >
                                            <thead>
                                                <tr className="text-center">
                                                    <th>No.</th>
                                                    <th>Nama Company</th>
                                                    <th>Email</th>
                                                    <th>Phone</th>
                                                    <th>Alamat</th>
                                                    <th>Status</th>
                                                    <th>Action</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {this.userVerified()}
                                            </tbody>
                                        </Table> : <div className="mx-auto mt-5" style={{ fontWeight: 'bold', color: 'gray' }}>Belum ada akun yang terverifikasi</div>
                                }
                                </div>
                                : null
                    }

                </div>
            </div >
        )
    }
}

export default Verifikasi_akun;