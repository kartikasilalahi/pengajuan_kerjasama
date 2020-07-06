import React, { useEffect, useState } from 'react'
import Axios from 'axios'
import { APIURL, APIURLDoc } from '../../helper/apiurl'
import { Table, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap'
import { MDBBtn, MDBIcon } from 'mdbreact'

function History_admin() {

    /* -------  State Awal -----------*/
    const [dataHistory, setdataHistory] = useState([]);
    const [detailPengajuan, setdetailPengajuan] = useState([]);
    const [idSellect, setidSellect] = useState(0);
    const [dataReview, setdataReview] = useState([]);
    const [dataEvaluasi, setdataEvaluasi] = useState([]);


    /*--Modal--*/
    const [modalDetail, setmodalDetail] = useState(false);
    const toggleDetail = () => setmodalDetail(!modalDetail);

    const [modalReview, setmodalReview] = useState(false);
    const toggleReview = () => setmodalReview(!modalReview);

    const [modalEvaluasi, setmodalEvaluasi] = useState(false);
    const toggleEvaluasi = () => setmodalEvaluasi(!modalEvaluasi);

    /*--Modal--*/

    /* -------- function show doc -------- */
    const showDocs = (k) => {
        let result = ''
        console.log(k)
        for (var i = 15; i < k.length; i++) result += k[i]
        return result
    }

    /* -------- USEEFFECT -------- */
    useEffect(() => {
        Axios(`${APIURL}pengajuan/getallhistory`)
            .then(res => {
                setdataHistory(res.data)
            })
            .catch(err => { console.log(err) })
    }, [])



    console.log('datahistory', dataHistory.length)


    /* -------- Render Daftar History -------- */
    const renderHistory = () => {
        return dataHistory.map((val, i) => {
            return (
                <tr className="text-center" key={i}>
                    <th>{i + 1}</th>
                    <td>{val.nama_institusi}</td>
                    <td>{val.alamat_institusi}</td>
                    {
                        val.bidanglain === 'tidak ada' ?
                            <td>{val.nama}</td>
                            :
                            <td>{val.nama + ' (' + val.bidanglain + ')'}</td>
                    }
                    {
                        val.status === 'finish' ?
                            <td style={{ color: 'green', fontWeight: 'bold' }}>Selesai</td>
                            :
                            <td style={{ color: 'red', fontWeight: 'bold' }}>Ditolak</td>

                    }
                    <td>
                        <MDBBtn size='sm' className="my-0 px-2" color='info' onClick={() => {
                            setmodalDetail(true)
                            setdetailPengajuan(dataHistory[i])
                            setidSellect(val.id)
                        }}>Detail</MDBBtn>
                    </td>
                    <td>
                        {
                            val.status === 'finish' ?
                                <div className="d-flex">
                                    <MDBBtn size='sm' className="my-0 px-2" color='blue-grey' onClick={() => {
                                        setmodalReview(true)
                                        Axios.get(`${APIURL}pengajuan/getreviewpenilaian/${val.id}`)
                                            .then(res => { setdataReview(res.data) })
                                            .catch(err => { console.log(err) })
                                    }}> Review</MDBBtn>
                                    <MDBBtn size='sm' className="my-0 px-2" color="blue-grey" onClick={() => {
                                        setmodalEvaluasi(true)
                                        setidSellect(val.id)

                                        Axios.get(`${APIURL}pengajuan/getevaluasi/${val.id}`)
                                            .then(res => { setdataEvaluasi(res.data) })
                                            .catch(err => { console.log(err) })
                                    }}> Evaluasi</MDBBtn>
                                </div>
                                :
                                <div className="text-left">
                                    <MDBBtn size='sm' className="my-0 px-2" color='blue-grey' onClick={() => {
                                        setmodalReview(true)
                                        Axios.get(`${APIURL}pengajuan/getreviewpenilaian/${val.id}`)
                                            .then(res => { setdataReview(res.data) })
                                            .catch(err => { console.log(err) })
                                    }}> Review</MDBBtn>
                                </div>
                        }
                    </td>
                </tr>
            )
        })
    }

    /* ------------ Render Review Penilain Kelayakan --------- */
    const renderReviewPenilaian = () => {
        return dataReview.map((val, i) => {
            return (
                <tr className="text-center" key={i}>
                    <td>{val.nama_reviewer}</td>
                    <td>{val.jabatan_reviewer}</td>
                    <td>{val.nilai_profil}</td>
                    <td>{val.nilai_kinerja}</td>
                    <td>{val.nilai_reputasi}</td>
                </tr>
            )
        })
    }

    /* ------------ button refresh --------- */
    const btnRefresh = () => {
        Axios(`${APIURL}pengajuan/getallhistory`)
            .then(res => setdataHistory(res.data))
            .catch(err => { console.log(err) })
    }

    /* ------------ render Evaluasi --------- */
    const renderEvaluasi = () => {
        if (dataEvaluasi[0] !== undefined || dataEvaluasi[0].length === 0) {
            return (
                <div>

                    <div className="col-7">
                        <h6 style={{ fontWeight: 'bold' }}>Identitas Kerjasama</h6>
                        <p>Nama Evaluator</p>
                        <p>Instansi</p>
                        <p>Jenis Kerjasama</p>
                        <p>Skop Kerjasama</p>
                        <p>Bidang Kerjasama</p>
                        <p>Lama Kerjasama</p>

                        <h6 className="mt-5" style={{ fontWeight: 'bold' }}>Kepuasan Terhadap Proses dan Pelaksanaan Kerjasama</h6>
                        <p>Kesepakatan Kerjasama Dilakukan Dengan Mudah</p>
                        <p>Pihak UMB Jakarta Telah Menanggapi Usulan Kerjasama Dengan Cepat</p>
                        <p>Proses Penandatanganan Naskah Kerjasama Dilakukan Dengan Cepat</p>
                        <p>Kerjasama Telah Diimplementasikan Dengan kegiatan</p>
                        <p>Implementasi Kerjasama Telah Sesuai</p>
                        <p>Kerjasama Kami Telah Memuaskan</p>
                        <p>Tetap Akan Melanjutkan Kerjasama Ini</p>

                    </div>
                    <div className="col-5">
                        <h6 style={{ fontWeight: 'bold' }}></h6>
                        <p>{dataEvaluasi[0].nama_evaluator}</p>
                        <p>{dataEvaluasi[0].instansi}</p>
                        <p>{dataEvaluasi[0].jenis_kerjasama}</p>
                        <p>{dataEvaluasi[0].skop_kerjasama}</p>
                        <p>{dataEvaluasi[0].bidang_kerjasama}</p>
                        <p>{dataEvaluasi[0].lama_kerjasama}</p>

                        <h6 className="mt-5" style={{ fontWeight: 'bold' }}>Kepuasan Terhadap Proses dan Pelaksanaan Kerjasama</h6>
                        <p>Kesepakatan Kerjasama Dilakukan Dengan Mudah</p>
                        <p>Pihak UMB Jakarta Telah Menanggapi Usulan Kerjasama Dengan Cepat</p>
                        <p>Proses Penandatanganan Naskah Kerjasama Dilakukan Dengan Cepat</p>
                        <p>Kerjasama Telah Diimplementasikan Dengan kegiatan</p>
                        <p>Implementasi Kerjasama Telah Sesuai</p>
                        <p>Kerjasama Kami Telah Memuaskan</p>
                        <p>Tetap Akan Melanjutkan Kerjasama Ini</p>
                    </div>
                </div>
            )
        } else {
            return null
        }

    }



    return (
        <div>

            {/* ---- start modal detail pengajuan ---- */}
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
            {/* ---- end modal detail pengajuan ---- */}


            {/* ---- start modal review penilaian kelayakan  ---- */}
            <Modal isOpen={modalReview} toggle={toggleReview} centered style={{ width: "50%", maxWidth: "1200px" }}>
                <ModalHeader>
                    <h4 className="font-weight-bold">Table Review Kelayakan Persetujuan Kerjasama</h4>
                </ModalHeader>
                <ModalBody>
                    <Table>
                        <thead>
                            <tr className="text-center" style={{ fontWeight: 'bold' }}>
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
                    <MDBBtn onClick={toggleReview} size="sm" color="warning"> <MDBIcon icon="times-circle" /> Tutup </MDBBtn>
                </ModalFooter>
            </Modal>
            {/* ---- end modal review penilaian kelayakan  ---- */}

            {/* ---- start modal evaluasi kerjasama  ---- */}
            <Modal isOpen={modalEvaluasi} toggle={toggleEvaluasi} centered style={{ width: "60%", maxWidth: "1200px" }}>
                <ModalHeader>
                    <h4 className="font-weight-bold">Evaluasi Kerjasama</h4>
                </ModalHeader>
                <ModalBody>
                    {
                        dataEvaluasi[0] === undefined || dataEvaluasi[0].length === 0 ? null :
                            <div>
                                <div className="d-flex identitas">
                                    <div className="col-5">
                                        <h6 style={{ fontWeight: 'bold' }}>Identitas Kerjasama</h6>
                                        <p>Nama Evaluator</p>
                                        <p>Instansi</p>
                                        <p>Jenis Kerjasama</p>
                                        <p>Skop Kerjasama</p>
                                        <p>Bidang Kerjasama</p>
                                        <p>Lama Kerjasama</p>

                                    </div>
                                    <div className="col-7">
                                        <h6 style={{ fontWeight: 'bold', color: 'white' }}> xd  </h6>
                                        <p>{dataEvaluasi[0].nama_evaluator}</p>
                                        <p>{dataEvaluasi[0].instansi}</p>
                                        <p>{dataEvaluasi[0].jenis_kerjasama}</p>
                                        <p>{dataEvaluasi[0].skop_kerjasama}</p>
                                        <p>{dataEvaluasi[0].bidang_kerjasama}</p>
                                        <p>{dataEvaluasi[0].lama_kerjasama}</p>
                                    </div>
                                </div>
                                <div className="d-flex kepuasan">
                                    <div className="col-9">
                                        <h6 className="mt-5" style={{ fontWeight: 'bold' }}>Kepuasan Terhadap Proses dan Pelaksanaan Kerjasama</h6>
                                        <p>Kesepakatan Kerjasama Dilakukan Dengan Mudah</p>
                                        <p>Pihak UMB Jakarta Telah Menanggapi Usulan Kerjasama Dengan Cepat</p>
                                        <p>Proses Penandatanganan Naskah Kerjasama Dilakukan Dengan Cepat</p>
                                        <p>Kerjasama Telah Diimplementasikan Dengan kegiatan</p>
                                        <p>Implementasi Kerjasama Telah Sesuai</p>
                                        <p>Kerjasama Kami Telah Memuaskan</p>
                                        <p>Tetap Akan Melanjutkan Kerjasama Ini</p>

                                    </div>
                                    <div className="col-3">
                                        <h6 className="mt-5" style={{ fontWeight: 'bold', color: 'white' }}>ds  </h6>
                                        <p>{dataEvaluasi[0].kesepakatan}</p>
                                        <p>{dataEvaluasi[0].tanggapan_umb}</p>
                                        <p>{dataEvaluasi[0].penandatanganan}</p>
                                        <p>{dataEvaluasi[0].implementasi_kegiatan}</p>
                                        <p>{dataEvaluasi[0].implementasi_kerjasama}</p>
                                        <p>{dataEvaluasi[0].kepuasan_kerjasama}</p>
                                        <p>{dataEvaluasi[0].kelanjutan_kerjasama}</p>
                                    </div>
                                </div>
                            </div>
                    }
                </ModalBody>
                <ModalFooter>
                    <MDBBtn onClick={toggleEvaluasi} size="sm" color="warning"> <MDBIcon icon="times-circle" /> Tutup </MDBBtn>
                </ModalFooter>
            </Modal>
            {/* ---- start modal evaluasi kerjasama  ---- */}


            <h5 className="mt-3" style={{ fontWeight: 'bolder' }}>History Pengajuan/Kerjasama</h5>
            <MDBBtn onClick={btnRefresh} size="sm" color="success"> Refresh </MDBBtn>

            {
                dataHistory.length === 0 || dataHistory === [] ?
                    <div>
                        Tidak Ada History Pengajuan/Kerjasama
                </div>
                    :
                    <Table>
                        <thead>
                            <tr className="text-center">
                                <th>No</th>
                                <th>Nama Instansi</th>
                                <th>Alamat</th>
                                <th>Bidang Kerjasama</th>
                                <th>Status</th>
                                <th>Detail</th>
                                <th>Aksi</th>
                            </tr>
                        </thead>
                        <tbody>
                            {renderHistory()}
                        </tbody>
                    </Table>
            }

        </div >
    )

}

export default History_admin;
