import React, { useEffect, useState } from 'react';
import Axios from 'axios'
import { APIURL, APIURLDoc } from '../../helper/apiurl'
import { Table, Modal, ModalHeader, ModalBody, ModalFooter, Input, FormGroup, Label } from 'reactstrap'
import { MDBBtn, MDBIcon } from 'mdbreact'
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
    const [idInstansi, setidInstansi] = useState(0);
    const [sellectrole, setsellectrole] = useState('');


    /*--Modal--*/
    const [modalDetail, setmodalDetail] = useState(false);
    const toggleDetail = () => setmodalDetail(!modalDetail);

    const [modalFormKelayakan, setmodalFormKelayakan] = useState(false);
    const toggleKelayakan = () => setmodalFormKelayakan(!modalFormKelayakan);

    const [modalReview, setmodalReview] = useState(false);
    const toggleReview = () => setmodalReview(!modalReview);

    const [modalEvaluasi, setmodalEvaluasi] = useState(false);
    const toggleEvaluasi = () => setmodalEvaluasi(!modalEvaluasi);
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
            title: 'Terima Kerjasama?',
            icon: 'warning',
            showCancelButton: 'true',
            cancelButtonText: 'Tidak',
            confirmButtonText: "Ya"
        }).then(result => {
            if (result.value) {
                Swal.fire({
                    title: 'Memproses',
                    text: 'Tunggu Sebentar',
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
                            text: `Kerjasama Sedang Berlangsung`,
                            icon: 'success',
                            showConfirmButton: false,
                            timer: 2100
                        }).then(() => {
                            let data = {
                                id_pengajuan: idSellect,
                                profil_institusi: dataPenilaian.profil_institusi,
                                kinerja_institusi: dataPenilaian.kinerja_institusi,
                                reputasi_institusi: dataPenilaian.reputasi_institusi,
                                nama_reviewer: dataPenilaian.nama_reviewer,
                                jabatan_reviewer: dataPenilaian.jabatan_reviewer
                                // id_instansi: idSellect
                            }

                            Axios.put(`${APIURL}pengajuan/accept/${idSellect}`, data)
                                .then(res => {
                                    setnewPengajuan(res.data.waiting)
                                    // console.log('data accept all', res.data.accept)
                                    setdaftarKerjasama(res.data.accept)
                                    setdaftarPenilaian(res.data.penilaian)
                                    console.log(res.data)

                                })
                                .catch(err => { console.log(err); })
                            setmodalFormKelayakan(!modalFormKelayakan)
                        })
                    })
            }
        })
    }

    /* --------- Decline Pengajuan ---------- */
    const declinePengajuan = () => {
        Swal.fire({
            title: 'Tolak Kerjasama?',
            icon: 'warning',
            showCancelButton: 'true',
            cancelButtonText: 'Tidak',
            confirmButtonText: "Ya"
        }).then(result => {
            if (result.value) {
                Swal.fire({
                    title: 'Memproses',
                    text: 'Tunggu Sebentar',
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
                            text: 'Kerjasama Ditolak. Pengajuan Dapat Dilihat Kembali Di Menu History (Jika Belum Tampil, Silahkan Klik tombol "refresh")',
                            icon: 'success',
                            showConfirmButton: false,
                            timer: 2100
                        }).then(() => {
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
                            setmodalFormKelayakan(!modalFormKelayakan)

                        })
                    })
            }
        })
    }


    /* --------- Finish Kerjasama ---------- */
    const finishKerjasama = () => {
        Swal.fire({
            title: 'Akhiri Kerjasama?',
            icon: 'warning',
            showCancelButton: 'true',
            cancelButtonText: 'Tidak',
            confirmButtonText: "Ya"
        }).then(result => {
            if (result.value) {
                Swal.fire({
                    title: 'Memproses',
                    text: 'Tunggu Sebentar',
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
                            text: `Kerjasama Berakhir`,
                            icon: 'success',
                            showConfirmButton: false,
                            timer: 2100
                        }).then(() => {
                            setmodalEvaluasi(true)
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
                        <MDBBtn size='sm' className="my-0" color='blue-grey' onClick={() => {
                            setmodalDetail(true)
                            setdetailPengajuan(newPengajuan[i])
                            setidSellect(val.id)
                        }}>Detail</MDBBtn>
                    </td>
                    <td>
                        <MDBBtn size='sm' className="my-0" onClick={() => {
                            setmodalFormKelayakan(true)
                            setidSellect(val.id)
                        }}>terima / tolak</MDBBtn>
                    </td>
                </tr>
            )
        })
    }


    /* ------ Render Daftar Accept/Kerjasama Onprocess ------ */
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
                        <MDBBtn size='sm' className="my-0" color='blue-grey' onClick={() => {
                            setmodalDetail(true)
                            setdetailPengajuan(daftarKerjasama[i])
                            setidSellect(val.id)
                        }}>Detail</MDBBtn>
                    </td>
                    <td>
                        <MDBBtn size='sm' className="my-0" color='blue-grey' onClick={() => {
                            setmodalReview(true)
                            // setsellectrole('decline')
                            Axios.get(`${APIURL}pengajuan/getreviewpenilaian/${val.id}`)
                                .then(res => { setdataReview(res.data) })
                                .catch(err => { console.log(err) })
                        }}>Review</MDBBtn>
                    </td>
                    <td style={{ color: '#33B5E5', fontWeight: 'bold' }}>Sedang Berlangsung</td>
                </tr>
            )
        })
    }

    /* ------ Render Daftar Decline ------ */
    const renderDaftarDecline = () => {
        return daftarDecline.map((val, i) => {
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
                        <MDBBtn size='sm' className="my-0" color='blue-grey' onClick={() => {
                            setmodalDetail(true)
                            setdetailPengajuan(daftarDecline[i])
                            setidSellect(val.id)
                        }}>Detail</MDBBtn>
                    </td>
                    <td>
                        <MDBBtn size='sm' className="my-0" color='blue-grey' onClick={() => {
                            setmodalReview(true)
                            setsellectrole('decline')
                            Axios.get(`${APIURL}pengajuan/getreviewpenilaian/${val.id}`)
                                .then(res => { setdataReview(res.data) })
                                .catch(err => { console.log(err) })
                        }}>Review</MDBBtn>
                    </td>
                    <td style={{ color: 'red', fontWeight: 'bold' }}>
                        Ditolak
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


    /* ------------ Render Review Penilain Kelayakan --------- */
    const renderReviewPenilaian = () => {
        return dataReview.map((val, i) => {
            return (
                <tr key={i}>
                    <td>{val.nama_reviewer}</td>
                    <td>{val.jabatan_reviewer}</td>
                    <td>{val.nilai_profil}</td>
                    <td>{val.nilai_kinerja}</td>
                    <td>{val.nilai_reputasi}</td>
                </tr>
            )
        })

    }




    // =========== TEST CONSOLE======================================

    // console.log(addPengajuan.idbidang)
    // console.log('itu', detailPengajuan.length)
    // console.log('ini', detailPengajuan)
    // console.log('od', dataReview)
    console.log('ini di accept', daftarKerjasama)
    // console.log('ini', dataPenilaian)

    // =========== TEST CONSOLE=======================================


    /* -------- START RETURN -------- */
    return (
        <div>
            {/* ---- start modal detail new pengajuan ---- */}
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
                                            <p>Nama yang Mengajukan </p>
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
                        <MDBBtn onClick={toggleDetail} size="sm" color="warning"> <MDBIcon icon="times-circle" /> Tutup </MDBBtn>
                    </ModalFooter>
                </div>
            </Modal>
            {/* ---- end modal detail new pengajuan ---- */}


            {/* ---- start modal kelayakan persetujuan ---- */}
            <Modal isOpen={modalFormKelayakan} toggle={toggleKelayakan} centered style={{ width: "40%", maxWidth: "1200px" }}>
                <ModalHeader>
                    <h4 className="font-weight-bold">Form Kelayakan Persetujuan Kerjasama</h4>
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
                                <option selected hidden value="">Nilai Profil Institusi</option>
                                {OptionNilai()}
                            </select>
                        </FormGroup>

                        <FormGroup>
                            <select name="nilaiKinerja" className="form-control"
                                onChange={e => setdataPenilaian({ ...dataPenilaian, kinerja_institusi: e.target.value })} >
                                <option selected hidden value="">Nilai Kinerja Institusi</option>
                                {OptionNilai()}
                            </select>
                        </FormGroup>

                        <FormGroup>
                            <select name="nilaiReputasi" className="form-control"
                                onChange={e => setdataPenilaian({ ...dataPenilaian, reputasi_institusi: e.target.value })} >
                                <option selected hidden value="">Nilai Reputasi Institusi</option>
                                {OptionNilai()}
                            </select>
                        </FormGroup>
                    </FormGroup>

                </ModalBody >
                <ModalFooter>
                    <MDBBtn size='sm' className="my-0" onClick={acceptPengajuan}>terima</MDBBtn>
                    <MDBBtn size='sm' className="my-0" onClick={declinePengajuan} color='danger'>tolak</MDBBtn>
                    <MDBBtn onClick={toggleKelayakan} size="sm" color="warning"> <MDBIcon icon="times-circle" /> Tutup </MDBBtn>
                </ModalFooter>
            </Modal >
            {/* ---- end modal kelayakan persetujuan ---- */}


            {/* ---- start modal review penilaian kelayakan  ---- */}
            <Modal isOpen={modalReview} toggle={toggleReview} centered style={{ width: "50%", maxWidth: "1200px" }}>
                <ModalHeader>
                    <h4 className="font-weight-bold">Table Review Kelayakan Persetujuan Kerjasama</h4>
                </ModalHeader>
                <ModalBody>
                    <Table>
                        <thead>
                            <tr style={{ fontWeight: 'bold' }}>
                                <th>Nama Reviewer</th>
                                <th>Jabatan Reviewer</th>
                                <th>Profil</th>
                                <th>Kinerja</th>
                                <th>Reputasi</th>
                            </tr>
                        </thead>
                        <tbody>
                            {renderReviewPenilaian()}
                        </tbody>
                    </Table>
                </ModalBody>
                <ModalFooter>
                    <MDBBtn onClick={toggleReview} size="sm" color="warning"><MDBIcon icon="times-circle" /> Tutup </MDBBtn>
                </ModalFooter>
            </Modal>
            {/* ---- end modal review penilaian kelayakan  ---- */}

            {/* ---- start modal evaluasi ---- */}
            <Modal isOpen={modalEvaluasi} toggle={toggleEvaluasi} centered style={{ width: "80%", maxWidth: "1200px" }}>
                <ModalHeader>
                    <h4 className="font-weight-bold">Form Evaluasi Kerjasama</h4>
                </ModalHeader>
                <ModalBody>
                    <FormGroup>
                        <Label style={{ fontSize: "15px" }}>Nama Reviewer: </Label>
                        <Input size="sm" className="w-100" type="text"
                        // onChange={e => setdataPenilaian({ ...dataPenilaian, nama_reviewer: e.target.value })}
                        />
                    </FormGroup>
                </ModalBody>
                <ModalFooter>
                    <MDBBtn size='sm' className="my-0" color='blue-grey' onClick={() => {
                        // setmodalDetail(true)
                        // setdetailPengajuan(daftarDecline[i])
                        // setidSellect(val.id)
                    }}>Simpan</MDBBtn>
                </ModalFooter>
            </Modal>
            {/* ---- end modal evaluasi ---- */}


            <div div className="kategori-user  d-flex pl-0 ml-4" style={{ cursor: 'pointer' }}>
                <div className={`${baru} verified mr-4 pl-0`}
                    onClick={() => {
                        setbaru('true')
                        setaccept('false')
                        setdecline('false')
                    }}
                > Pengajuan Baru</div>
                <div className={`${accept} verified mr-4 pl-0`}
                    onClick={() => {
                        setbaru('false')
                        setaccept('true')
                        setdecline('false')
                    }}
                > Sedang Belangsung</div>
                <div className={`${decline} verified mr-4 pl-0`}
                    onClick={() => {
                        setbaru('false')
                        setaccept('false')
                        setdecline('true')
                    }}
                > Pengajuan yang Ditolak</div>
            </div>
            {
                baru === 'true' ?
                    <div className="mx-auto pt-2" style={{ width: '98%' }
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
                                            <th>Aksi</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {renderNewPengajuan()}
                                    </tbody>
                                </Table>
                                :
                                <div className="mx-auto mt-5" style={{ fontWeight: 'bold', color: 'gray' }}>Tidak Ada Pengajuan Baru</div>
                        }
                    </div >
                    :
                    accept === 'true' ?
                        <div className="mx-auto pt-2" style={{ width: '98%' }
                        } >
                            {
                                daftarKerjasama.length > 0 ?
                                    <Table striped >
                                        <thead>
                                            <tr className="text-center">
                                                <th>No</th>
                                                <th>Nama Instansi</th>
                                                <th>Alamat</th>
                                                <th>Bidang Kerjasama</th>
                                                <th>Detail</th>
                                                <th>Review</th>
                                                <th>Status</th>
                                                {/* <th>Aksi</th> */}
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {renderDaftarKerjasama()}
                                        </tbody>
                                    </Table>
                                    :
                                    <div className="mx-auto mt-5" style={{ fontWeight: 'bold', color: 'gray' }}>Tidak Ada Kerjasama yang Sedang Berlangsung</div>
                            }
                        </div >
                        :
                        decline === 'true' ?
                            <div className="mx-auto pt-2" style={{ width: '98%' }
                            } >
                                {
                                    daftarDecline.length > 0 ?
                                        <Table striped >
                                            <thead>
                                                <tr className="text-center">
                                                    <th>No</th>
                                                    <th>Nama Instansi</th>
                                                    <th>Alamat</th>
                                                    <th>Bidang Kerjasama</th>
                                                    <th>Detail</th>
                                                    <th>Review</th>
                                                    <th>Status</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {renderDaftarDecline()}
                                            </tbody>
                                        </Table>
                                        :
                                        <div className="mx-auto mt-5" style={{ fontWeight: 'bold', color: 'gray' }}>Tidak Ada Pengajuan yang Ditolak</div>
                                }
                            </div >
                            :
                            null
            }
        </div >
    )

}

export default Manajemen_kerjasama;