import React, { useEffect, useState } from 'react';
import Axios from 'axios'
import { APIURL, APIURLDoc } from '../../helper/apiurl'
import { Table } from 'reactstrap'
import { MDBBtn } from 'mdbreact'


function Manajemen_kerjasama() {

    /* -------  State Awal -----------*/
    const [newPengajuan, setnewPengajuan] = useState([]);
    const [baru, setbaru] = useState('true');
    const [accept, setaccept] = useState('false');
    const [decline, setdecline] = useState('false');


    /* -------- USEEFFECT -------- */
    useEffect(() => {
        Axios.get(`${APIURL}pengajuan/allnewpengajuan`)
            .then(res => { setnewPengajuan(res.data) })
            .catch(err => { console.log(err) })
    }, [])

    // =========== TEST CONSOLE======================================

    // console.log('ini data pengajuan', addPengajuan)
    // console.log('tls bdg', tulisBidang)
    // console.log(addPengajuan.idbidang)
    console.log(newPengajuan)

    // =========== TEST CONSOLE=======================================


    /* -------- START RETURN -------- */
    return (
        <div>
            <div className="kategori-user  d-flex pl-0 ml-4" style={{ cursor: 'pointer' }}>
                <div className={`${baru} verified mr-4 pl-0`}
                    onClick={() => {
                        setbaru('true')
                        setaccept('false')
                        setdecline('false')
                    }}
                > Daftar Pengajuan Baru</div>
                <div className={`${accept} verified mr-4 pl-0`}
                    onClick={() => {
                        setbaru('false')
                        setaccept('true')
                        setdecline('false')
                    }}
                > Pengajuan yang diterima</div>
                <div className={`${decline} verified mr-4 pl-0`}
                    onClick={() => {
                        setbaru('false')
                        setaccept('false')
                        setdecline('true')
                    }}
                > Pengajuan yang ditolak</div>
            </div>
            {
                baru ?
                    <div className="mx-auto" style={{ width: '85%' }}>
                        {
                            newPengajuan.length > 0 ?
                                <Table>
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
                                </Table>
                                :
                                <div className="mx-auto mt-5" style={{ fontWeight: 'bold', color: 'gray' }}>Tidak Ada Pengajuan baru atau tidak ditemukan Pengajuan yang belum di accept</div>
                        }
                    </div>
                    :
                    null
            }
        </div>
    )

}

export default Manajemen_kerjasama;