import React, { useEffect, useState } from 'react';
import Axios from 'axios'
import { APIURL, APIURLDoc } from '../../helper/apiurl'
import { Table, Modal, ModalHeader, ModalBody, ModalFooter, Input, FormGroup, Label } from 'reactstrap'
import { MDBBtn } from 'mdbreact'
import Swal from "sweetalert2";


function Manajemen_kerjasama() {

    /* -------  State Awal -----------*/
    const [newPengajuan, setnewPengajuan] = useState([]);
    const [detailPengajuan, setdetailPengajuan] = useState([]);
    const [daftarKerjasama, setdaftarKerjasama] = useState([]);
    const [daftarDecline, setdaftarDecline] = useState([]);
    const [daftarPenilaian, setdaftarPenilaian] = useState([]);
    const [dataReview, setdataReview] = useState([]);
    const [dataPenilaian, setdataPenilaian] = useState([]);
    const [daftarOption, setdaftarOption] = useState(['Sangat Kurang', 'Kurang', 'Baik', 'Sangat Baik']);
    const [baru, setbaru] = useState('true');
    const [accept, setaccept] = useState('false');
    const [decline, setdecline] = useState('false');
    const [idSellect, setidSellect] = useState(0);


    /*--Modal--*/
    const [modalDetail, setmodalDetail] = useState(false);
    const toggleDetail = () => setmodalDetail(!modalDetail);

    const [modalReview, setmodalReview] = useState(false);
    const toggleReview = () => setmodalReview(!modalReview);

    /*--Modal--/ 


    /* -------- USEEFFECT -------- */
    useEffect(() => {
        Axios.get(`${APIURL}pengajuan/allnewpengajuan`)
            .then(res => { setnewPengajuan(res.data) })
            .catch(err => { console.log(err) })
        Axios.get(`${APIURL}pengajuan/allaccept`)
            .then(res => { setdaftarKerjasama(res.data) })
            .catch(err => { console.log(err) })
        Axios.get(`${APIURL}pengajuan/alldecline`)
            .then(res => { setdaftarDecline(res.data) })
            .catch(err => { console.log(err) })
    }, [])


    /* -------- function show doc -------- */
    const showDocs = (k) => {
        let result = ''
        console.log(k)
        for (var i = 15; i < k.length; i++) result += k[i]
        return result
    }

    /* --------- Accept Pengajuan ---------- */
    const acceptPengajuan = () => {
        Swal.fire({
            title: 'Yakin terima kerjasama?',
            icon: 'warning',
            showCancelButton: 'true',
            confirmButtonText: "Yes"
        }).then(result => {
            if (result.value) {
                Swal.fire({
                    title: 'Terima Tawaran Kerjasama',
                    text: 'Tunggu beberapa detik',
                    timer: 2100,
                    allowOutsideClick: false,
                    timerProgressBar: true,
                    onBeforeOpen: () => {
                        Swal.showLoading()
                    }
                })
                    .then(() => {
                        Swal.fire({
                            title: 'Berhasil',
                            text: `Kerjasama Onprocess!`,
                            icon: 'success',
                            showConfirmButton: false,
                            timer: 2100
                        }).then(() => {
                            console.log('ini', dataReview)
                            let data = {
                                id_pengajuan: idSellect,
                                profil_institusi: dataPenilaian.profil_institusi,
                                kinerja_institusi: dataPenilaian.kinerja_institusi,
                                reputasi_institusi: dataPenilaian.reputasi_institusi,
                                nama_reviewer: dataPenilaian.nama_reviewer,
                                jabatan_reviewer: dataPenilaian.jabatan_reviewer
                            }

                            Axios.put(`${APIURL}pengajuan/decline/${idSellect}`, data)
                                .then(res => {
                                    setnewPengajuan(res.data.waiting)
                                    setdaftarKerjasama(res.data.accept)
                                    setdaftarPenilaian(res.data.penilaian)
                                    console.log(res.data)

                                })
                                .catch(err => { console.log(err); })
                            setmodalReview(!modalReview)
                        })
                    })
            }
        })
    }


    /* --------- Decline Pengajuan ---------- */
    const declinePengajuan = () => {
        Swal.fire({
            title: 'Yakin decline/tolak kerjasama?',
            icon: 'warning',
            showCancelButton: 'true',
            confirmButtonText: "Yes"
        }).then(result => {
            if (result.value) {
                Swal.fire({
                    title: 'Decline Tawatan Kerjasama',
                    text: 'Tunggu beberapa detik',
                    timer: 2100,
                    allowOutsideClick: false,
                    timerProgressBar: true,
                    onBeforeOpen: () => {
                        Swal.showLoading()
                    }
                })
                    .then(() => {
                        Swal.fire({
                            title: 'Berhasil',
                            text: `Kerjasama ditolak.`,
                            icon: 'success',
                            showConfirmButton: false,
                            timer: 2100
                        }).then(() => {
                            console.log('ini', dataReview)
                            let data = {
                                id_pengajuan: idSellect,
                                profil_institusi: dataPenilaian.profil_institusi,
                                kinerja_institusi: dataPenilaian.kinerja_institusi,
                                reputasi_institusi: dataPenilaian.reputasi_institusi,
                                nama_reviewer: dataPenilaian.nama_reviewer,
                                jabatan_reviewer: dataPenilaian.jabatan_reviewer
                            }

                            Axios.put(`${APIURL}pengajuan/decline/${idSellect}`, data)
                                .then(res => {
                                    setnewPengajuan(res.data.waiting)
                                    setdaftarDecline(res.data.decline)
                                    setdaftarPenilaian(res.data.penilaian)
                                    console.log(res.data)

                                })
                                .catch(err => { console.log(err); })
                            setmodalReview(!modalReview)
                        })
                    })
            }
        })
    }


    /* ------ Render New Pengajuan ------ */
    const renderNewPengajuan = () => {
        return newPengajuan.map((val, i) => {
            return (
                <tr key={i} className="text-center">
                    <th>{i + 1}</th>
                    <td>{val.nama_institusi}</td>
                    <td>{val.alamat_institusi}</td>
                    {
                        val.bidanglain === 'tidak ada' ?
                            <td>{val.nama}</td>
                            :
                            <td>{val.nama + ' (' + val.bidanglain + ')'}</td>
                    }
                    <td>
                        <MDBBtn size='sm' className="my-0" color='info' onClick={() => {
                            setmodalDetail(true)
                            setdetailPengajuan(newPengajuan[i])
                            setidSellect(val.id)
                        }}>Detail</MDBBtn>
                    </td>
                    <td>
                        <MDBBtn size='sm' className="my-0" onClick={() => {
                            setmodalReview(true)
                            setdataReview(newPengajuan[i])
                            setidSellect(val.id)
                        }}>accept / decline</MDBBtn>
                        {/* <MDBBtn size='sm' className="my-0" color='warning'>decline</MDBBtn> */}
                    </td>
                </tr>
            )
        })
    }


    /* ------ Render Kerjasama ------ */
    const renderDaftarKerjasama = () => {
        return daftarKerjasama.map((val, i) => {
            return (
                <tr key={i} className="text-center">
                    <th>{i + 1}</th>
                    <td>{val.nama_institusi}</td>
                    <td>{val.alamat_institusi}</td>
                    {
                        val.bidanglain === 'tidak ada' ?
                            <td>{val.nama}</td>
                            :
                            <td>{val.nama + ' (' + val.bidanglain + ')'}</td>
                    }
                    <td>
                        <MDBBtn size='sm' className="my-0" color='info' onClick={() => {
                            setmodalDetail(true)
                            setdetailPengajuan(daftarKerjasama[i])
                            setidSellect(val.id)
                        }}>Detail</MDBBtn>
                    </td>
                    <td>
                        ONPROCESS
                        </td>
                </tr>
            )
        })
    }


    /* ------ Render Option Nilai ------ */
    const OptionNilai = () => {
        return daftarOption.map((val, i) => {
            return <option value={val} key={i}>{val}</option>
        })
    }


    /* ------------ Handle Penilaian --------- */



    // =========== TEST CONSOLE======================================

    // console.log(addPengajuan.idbidang)
    // console.log('itu', detailPengajuan.length)
    // console.log('ini', detailPengajuan)
    // console.log('ini', dataReview)
    console.log('od', daftarKerjasama)

    // console.log('ini', dataPenilaian)

    // =========== TEST CONSOLE=======================================


    /* -------- START RETURN -------- */
    return (
        <div>
            {/* ---- start modal detai new pengajuan ---- */}
            <Modal isOpen={modalDetail} toggle={toggleDetail} centered style={{ width: "100%", maxWidth: "1200px" }}>
                <div className="m-2">
                    <ModalHeader>
                        <h4 className="font-weight-bold">Detail Pengajuan Kerjasama</h4>
                    </ModalHeader>
                    <ModalBody>
                        {
                            detailPengajuan.length === 0 || detailPengajuan === [] ?
                                null
                                :
                                <div className="d-flex">
                                    <div className="d-flex col-5 p-0">
                                        <div className="label-ajuan col-6 p-0">
                                            <p>Nama yang mengajukan </p>
                                            <p>No HP/WA </p>
                                            <p>PIC </p>
                                            <p>No HP/WA PIC</p>
                                            <p>Nama Institusi</p>
                                            <p>Alamat Institusi</p>
                                            <p>Bidang Kerjasama</p>
                                        </div>
                                        <div className="isi-ajuan col-6 p-0">
                                            <p>{detailPengajuan.pengaju}</p>
                                            <p>{detailPengajuan.no_pengaju}</p>
                                            <p>{detailPengajuan.PIC}</p>
                                            <p>{detailPengajuan.no_PIC}</p>
                                            <p>{detailPengajuan.nama_institusi}</p>
                                            <p>{detailPengajuan.alamat_institusi}</p>
                                            {
                                                detailPengajuan.bidanglain != "tidak ada" ?
                                                    <p>{detailPengajuan.nama + '(' + detailPengajuan.bidanglain + ')'}</p>
                                                    :
                                                    <p>{detailPengajuan.nama}</p>
                                            }
                                        </div>
                                    </div>
                                    <div className="d-flex col-7 p-0">

                                        <div className="label-ajuan col-6 p-0">
                                            <p>Pejabat Penandatangan</p>
                                            <p>Jabatan Pejabat Penandatangan</p>
                                            <p>Penanggungjawab Pelaksanaan Kerjasama</p>
                                            <p>Unit di UMB yang terlibat</p>
                                            <p>File MoU</p>
                                            <p>File MOA</p>
                                            <p>File IA</p>
                                            <p>File Perpanjangan MoU/MoA/IA</p>
                                        </div>
                                        <div className="isi-ajuan col-6 p-0">
                                            <p>{detailPengajuan.pejabat}</p>
                                            <p>{detailPengajuan.jabatan}</p>
                                            <p>{detailPengajuan.penanggungjawab}</p>
                                            <p>{detailPengajuan.unit}</p>
                                            <p><a target="_blank" href={APIURLDoc + detailPengajuan.MOU}>{showDocs(detailPengajuan.MOU)}</a></p>
                                            <p><a target="_blank" href={APIURLDoc + detailPengajuan.MOA}>{showDocs(detailPengajuan.MOA)}</a></p>
                                            <p><a target="_blank" href={APIURLDoc + detailPengajuan.IA}>{showDocs(detailPengajuan.IA)}</a></p>
                                            <p><a target="_blank" href={APIURLDoc + detailPengajuan.perpanjangan}>{showDocs(detailPengajuan.perpanjangan)}</a></p>
                                        </div>
                                    </div>
                                </div>
                        }
                    </ModalBody>
                    <ModalFooter>
                        <MDBBtn onClick={toggleDetail} size="sm" color="warning"> close </MDBBtn>
                        {/* <MDBBtn size='sm' className="my-0" onClick={acceptPengajuan}>accept</MDBBtn>
                        <MDBBtn size='sm' className="my-0" color='danger'>decline</MDBBtn> */}
                    </ModalFooter>
                </div>
            </Modal>
            {/* ---- end modal detai new pengajuan ---- */}


            {/* ---- start modal kelayakan persetujuan ---- */}
            <Modal isOpen={modalReview} toggle={toggleReview} centered style={{ width: "40%", maxWidth: "1200px" }}>
                <ModalHeader>
                    <h4 className="font-weight-bold">Form Review Kelayakan Persetujuan Kerjasama</h4>
                </ModalHeader>
                <ModalBody>
                    <FormGroup>
                        <Label style={{ fontSize: "15px" }}>Nama Reviewer: </Label>
                        <Input size="sm" className="w-100" type="text"
                            onChange={e => setdataPenilaian({ ...dataPenilaian, nama_reviewer: e.target.value })}
                        />
                    </FormGroup>
                    <FormGroup>
                        <Label style={{ fontSize: "15px" }}>Jabatan Reviewer: </Label>
                        <Input size="sm" className="w-100" type="text"
                            onChange={e => setdataPenilaian({ ...dataPenilaian, jabatan_reviewer: e.target.value })}

                        />
                    </FormGroup>
                    <FormGroup>
                        <Label style={{ fontSize: "15px", fontWeight: 'bold' }}>Penilaian Kelayakan Persetujuan(Profil, Kinerja, & Reputasi) : </Label>
                        <FormGroup>
                            <select name="nilaiProfil" className="form-control"
                                onChange={e => setdataPenilaian({ ...dataPenilaian, profil_institusi: e.target.value })} >
                                <option selected hidden value="">Nilai Profil Institusi..</option>
                                {OptionNilai()}
                            </select>
                        </FormGroup>

                        <FormGroup>
                            <select name="nilaiKinerja" className="form-control"
                                onChange={e => setdataPenilaian({ ...dataPenilaian, kinerja_institusi: e.target.value })} >
                                <option selected hidden value="">Nilai Kinerja Institusi..</option>
                                {OptionNilai()}
                            </select>
                        </FormGroup>

                        <FormGroup>
                            <select name="nilaiReputasi" className="form-control"
                                onChange={e => setdataPenilaian({ ...dataPenilaian, reputasi_institusi: e.target.value })} >
                                <option selected hidden value="">Nilai Reputasi Institusi..</option>
                                {OptionNilai()}
                            </select>
                        </FormGroup>
                    </FormGroup>

                </ModalBody >
                <ModalFooter>
                    <MDBBtn size='sm' className="my-0" onClick={acceptPengajuan}>accept</MDBBtn>
                    <MDBBtn size='sm' className="my-0" onClick={declinePengajuan} color='danger'>decline</MDBBtn>
                    <MDBBtn onClick={toggleReview} size="sm" color="warning"> close </MDBBtn>
                </ModalFooter>
            </Modal >
            {/* ---- end modal kelayakan persetujuan ---- */}


            <div div className="kategori-user  d-flex pl-0 ml-4" style={{ cursor: 'pointer' }}>
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
                > Pengajuan yang diterima dan Onprocess</div>
                <div className={`${decline} verified mr-4 pl-0`}
                    onClick={() => {
                        setbaru('false')
                        setaccept('false')
                        setdecline('true')
                    }}
                > Pengajuan yang ditolak</div>
            </div >
            {
                baru === 'true' ?
                    <div className="mx-auto pt-2" style={{ width: '85%' }
                    } >
                        {
                            newPengajuan.length > 0 ?
                                <Table striped >
                                    <thead>
                                        <tr className="text-center">
                                            <th>No.</th>
                                            <th>Nama Instansi</th>
                                            <th>Alamat</th>
                                            <th>Bidang Kerjasama</th>
                                            <th>Detail</th>
                                            <th>Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {renderNewPengajuan()}
                                    </tbody>
                                </Table>
                                :
                                <div className="mx-auto mt-5" style={{ fontWeight: 'bold', color: 'gray' }}>Tidak Ada Pengajuan baru atau tidak ditemukan Pengajuan yang belum di accept</div>
                        }
                    </div >
                    :
                    accept === 'true' ?
                        <div className="mx-auto pt-2" style={{ width: '85%' }
                        } >
                            {
                                daftarKerjasama.length > 0 ?
                                    <Table striped >
                                        <thead>
                                            <tr className="text-center">
                                                <th>No.</th>
                                                <th>Nama Instansi</th>
                                                <th>Alamat</th>
                                                <th>Bidang Kerjasama</th>
                                                <th>Detail</th>
                                                <th>Status</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {renderDaftarKerjasama()}
                                        </tbody>
                                    </Table>
                                    :
                                    <div className="mx-auto mt-5" style={{ fontWeight: 'bold', color: 'gray' }}>Tidak Ada Pengajuan baru atau tidak ditemukan Pengajuan yang belum di accept</div>
                            }
                        </div >
                        :
                        decline === 'true' ?
                            <div className="mx-auto pt-2" style={{ width: '85%' }
                            } >
                                {
                                    daftarDecline.length > 0 ?
                                        <Table striped >
                                            <thead>
                                                <tr className="text-center">
                                                    <th>No.</th>
                                                    <th>Nama Instansi</th>
                                                    <th>Alamat</th>
                                                    <th>Bidang Kerjasama</th>
                                                    <th>Detail</th>
                                                    <th>Action</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {/* {renderNewPengajuan()} */}
                                                DECLINE
                                            </tbody>
                                        </Table>
                                        :
                                        <div className="mx-auto mt-5" style={{ fontWeight: 'bold', color: 'gray' }}>Tidak Ada Pengajuan baru atau tidak ditemukan Pengajuan yang belum di accept</div>
                                }
                            </div >
                            :
                            null
            }
        </div >
    )

}

export default Manajemen_kerjasama;