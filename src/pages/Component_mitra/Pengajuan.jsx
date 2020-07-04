import React, { useEffect, useState } from 'react';
import { Input, FormGroup, Label, CustomInput, Table, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import Toast from 'light-toast'
import Swal from "sweetalert2";
import { MDBBtn } from 'mdbreact'
import { AiOutlineWarning } from 'react-icons/ai'
import Axios from 'axios'
import { APIURL, APIURLDoc } from '../../helper/apiurl'

function Pengajuan() {

    /* -------  State Awal -----------*/
    const [Bidang, setBidang] = useState([]);
    const [dokumen, setdokumen] = useState([]);
    const [dataAjuan, setdataAjuan] = useState([]);
    const [dataOnprocess, setdataOnprocess] = useState([]);
    const [dataEvaluasi, setdataEvaluasi] = useState({});
    const [hasilEvaluasi, sethasilEvaluasi] = useState({});
    const [formAjuan, setformAjuan] = useState('true');
    const [ajuan, setajuan] = useState('false');
    const [onprocess, setonprocess] = useState('false');
    const [dataReview, setdataReview] = useState([]);
    const [detailPengajuan, setdetailPengajuan] = useState([]);
    const [daftarOption, setdaftarOption] = useState(['Sangat Kurang', 'Kurang', 'Baik', 'Sangat Baik']);



    const [tulisBidang, settulisBidang] = useState(false);
    const [addPengajuan, setaddPengajuan] = useState({})

    const [idSellect, setidSellect] = useState(0);


    /* ----------- modal------------- */
    const [modalDetail, setmodalDetail] = useState(false);
    const toggleDetail = () => setmodalDetail(!modalDetail);

    const [modalReview, setmodalReview] = useState(false);
    const toggleReview = () => setmodalReview(!modalReview);

    const [modalEvaluasi, setmodalEvaluasi] = useState(false);
    const toggleEvaluasi = () => setmodalEvaluasi(!modalEvaluasi);
    /* ----------- modal------------- */



    /* -------- USEEFFECT -------- */
    useEffect(() => {
        let id = parseInt(localStorage.getItem('id'))
        Axios.get(`${APIURL}pengajuan/getajuan/${id}`)
            .then(res => { setdataAjuan(res.data) })
            .catch(err => { console.log(err) })
        Axios.get(`${APIURL}pengajuan/getonprocess/${id}`)
            .then(res => { setdataOnprocess(res.data) })
            .catch(err => { console.log(err) })
        Axios.get(`${APIURL}pengajuan/getbidang`)
            .then(res => { setBidang(res.data) })
            .catch(err => { console.log(err) })
    }, [])


    /* ----------- Render Option Bidang ------------- */
    const renderSelectBidang = () => {
        return Bidang.map((val, i) => {
            return <option value={val.id_bidang} key={i}>{val.nama}</option>
        })
    }

    /* --------- Handle Select Bidang Kerjasama ------------*/
    const handleBidang = (e) => {
        const { name, value } = e.target
        console.log(value)
        if (parseInt(value) === 5 || parseInt(value) === 6) {
            settulisBidang(true)
            setaddPengajuan({ ...addPengajuan, [name]: value })
        } else {
            settulisBidang(false)
            setaddPengajuan({ ...addPengajuan, [name]: value })
        }
    }


    /* -------- Handle Document -------- */
    const handleDocument = (e) => {
        setdokumen([...dokumen, ...e.target.files])
    }


    /* -------- Add Pengajuan -------- */
    const addNewPengajuan = () => {
        let idmitra = localStorage.getItem('id')
        let formdata = new FormData
        if (tulisBidang === false) {
            console.log('bidanglain', tulisBidang)
            addPengajuan.bidanglain = 'tidak ada'
        }
        const {
            pengaju,
            no_pengaju,
            PIC,
            no_PIC,
            nama_institusi,
            alamat_institusi,
            idbidang,
            pejabat,
            jabatan,
            penanggungjawab,
            unit,
            bidanglain
        } = addPengajuan


        console.log('bidanglain nya', addNewPengajuan.bidanglain)

        let newPengajuan = {
            pengaju: pengaju,
            no_pengaju: no_pengaju,
            PIC: PIC,
            no_PIC: no_PIC,
            nama_institusi: nama_institusi,
            alamat_institusi: alamat_institusi,
            idbidang: parseInt(idbidang),
            pejabat: pejabat,
            jabatan: jabatan,
            penanggungjawab: penanggungjawab,
            unit: unit,
            bidanglain: bidanglain,
            idmitra: parseInt(idmitra)
        }

        let Headers = {
            headers:
            {
                'Content-Type': 'multipart/form-data'
            }
        }

        for (var i = 0; i < dokumen.length; i++) {
            formdata.append('dokumen', dokumen[i])
        }
        console.log('DATAIMG', dokumen)
        formdata.append('data', JSON.stringify(newPengajuan))

        if (
            !pengaju ||
            !no_pengaju ||
            !PIC ||
            !no_PIC ||
            !nama_institusi ||
            !alamat_institusi ||
            !idbidang ||
            !pejabat ||
            !jabatan ||
            !penanggungjawab ||
            !unit
        ) Toast.fail('Pastikan Form Lengkap Terisi', 3000)

        else if (dokumen.length < 4) Toast.fail('Pastikan Semua Dokumen Terpenuhi..', 2700)

        else {
            Toast.loading(`Memproses`);
            setTimeout(() => {
                Axios.post(`${APIURL}pengajuan/addpengajuan`, formdata, Headers)
                    .then(() => {
                        Toast.success('Berhasil..', 2500)
                        Toast.hide();
                        setdokumen([])
                        setaddPengajuan({})
                        settulisBidang(false)
                        setajuan('true')
                        setformAjuan('false')
                        setonprocess('false')
                        let id = parseInt(localStorage.getItem('id'))
                        Axios.get(`${APIURL}pengajuan/getajuan/${id}`)
                            .then(res1 => { setdataAjuan(res1.data) })
                            .catch(err1 => { console.log(err1) })
                    }).catch(err => console.log(err))
            }, 2000);
        }

    }

    /* -------- function show doc -------- */
    const showDocs = (k) => {
        let result = ''
        for (var i = 15; i < k.length; i++) result += k[i]
        return result
    }

    /* ------ Render Option Nilai ------ */
    const OptionNilai = () => {
        return daftarOption.map((val, i) => {
            return <option value={val} key={i}>{val}</option>
        })
    }

    /* -------- function finish kerjasama -------- */
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



    /* ------ Render Daftar Accept/Kerjasama Onprocess ------ */
    const renderOnprocessKerjasama = () => {
        return dataOnprocess.map((val, i) => {
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
                            setdetailPengajuan(dataOnprocess[i])
                            setidSellect(val.id)
                        }}>Detail</MDBBtn>
                    </td>
                    <td>
                        <MDBBtn size='sm' className="my-0" color='info' onClick={() => {
                            setmodalReview(true)
                            // setsellectrole('decline')
                            Axios.get(`${APIURL}pengajuan/getreviewpenilaian/${val.id}`)
                                .then(res => { setdataReview(res.data) })
                                .catch(err => { console.log(err) })
                        }}>Review</MDBBtn>
                    </td>
                    <td style={{ color: '#33B5E5', fontWeight: 'bold' }}>Sedang Berlangsung</td>
                    <td>
                        <MDBBtn size='sm' className="my-0" color='success' onClick={() => {
                            setidSellect(val.id)

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
                        }}> Selesai </MDBBtn>
                    </td>
                </tr>
            )
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


    /* ------------ Button Kirim Evaluasi --------- */
    const kirimEvaluasi = () => {
        let id = parseInt(localStorage.getItem('id'))
        let {
            nama_evaluator,
            instansi,
            jenis_kerjasama,
            bidang_kerjasama,
            skop_kerjasama,
            lama_kerjasama,
            kesepakatan,
            tanggapan_umb,
            penandatanganan,
            implementasi_kegiatan,
            implementasi_kerjasama,
            kepuasan_kerjasama,
            kelanjutan_kerjasama
        } = dataEvaluasi
        dataEvaluasi.id_instansi = id
        dataEvaluasi.id_pengajuan = idSellect

        console.log('dev', idSellect)
        if (
            !nama_evaluator ||
            !instansi ||
            !jenis_kerjasama ||
            !bidang_kerjasama ||
            !skop_kerjasama ||
            !lama_kerjasama ||
            !kesepakatan ||
            !tanggapan_umb ||
            !penandatanganan ||
            !implementasi_kegiatan ||
            !implementasi_kerjasama ||
            !kepuasan_kerjasama ||
            !kelanjutan_kerjasama
        ) Toast.fail('Pastikan Form Lengkap Terisi', 3000)

        else {
            Axios.post(`${APIURL}pengajuan/addevaluasi`, dataEvaluasi)
                .then(res => {
                    Swal.fire({
                        title: 'Evaluasi Berhasil Dikirim',
                        text: 'Kerjasam Dapat Dilihat Kembali Di Menu History',
                        icon: 'success',
                        showConfirmButton: false,
                        timer: 2600
                    }).then(() => {
                        sethasilEvaluasi(res.data.evaluasi)
                        setdataOnprocess(res.data.waiting)
                        setmodalEvaluasi(!modalEvaluasi)
                    })

                })
                .catch(err => console.log(err))

        }

    }




    // =========== TEST CONSOLE======================================

    // console.log('ini data pengajuan', addPengajuan)
    // console.log('tls bdg', tulisBidang)
    // console.log(addPengajuan.idbidang)

    // =========== TEST CONSOLE=======================================



    /* --------- RETURN -----------*/
    return (

        <div className='m-1'>
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
                        <MDBBtn onClick={toggleDetail} size="sm" color="warning"> Tutup </MDBBtn>
                    </ModalFooter>
                </div>
            </Modal>
            {/* ---- end modal detail new pengajuan ---- */}

            {/* ---- start modal review penilaian kelayakan  ---- */}
            <Modal isOpen={modalReview} toggle={toggleReview} centered style={{ width: "50%", maxWidth: "1200px" }}>
                <ModalHeader>
                    <h4 className="font-weight-bold">Table Review Kelayakan Persetujuan Kerjasama</h4>
                </ModalHeader>
                <ModalBody>
                    <Table>
                        <thead>
                            <tr>
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
                    <MDBBtn onClick={toggleReview} size="sm" color="warning"> Tutup </MDBBtn>
                </ModalFooter>
            </Modal>
            {/* ---- end modal review penilaian kelayakan  ---- */}


            {/* ---- start modal evaluasi ---- */}
            <Modal isOpen={modalEvaluasi} toggle={toggleEvaluasi} centered style={{ width: "80%", maxWidth: "1200px" }}>
                <ModalHeader>
                    <h4 className="font-weight-bold">Form Evaluasi Kerjasama</h4>
                </ModalHeader>
                <ModalBody>
                    <div className="d-flex">
                        <div className="col-5">
                            <FormGroup>
                                <Label style={{ fontSize: "15px" }}>Nama Evaluator: </Label>
                                <Input size="sm" className="w-100" type="text"
                                    value={dataEvaluasi.nama_evaluator || ''}
                                    onChange={e => setdataEvaluasi({ ...dataEvaluasi, nama_evaluator: e.target.value })}
                                />
                            </FormGroup>
                            <FormGroup>
                                <Label style={{ fontSize: "15px" }}>Instansi: </Label>
                                <Input size="sm" className="w-100" type="text"
                                    value={dataEvaluasi.instansi || ''}
                                    onChange={e => setdataEvaluasi({ ...dataEvaluasi, instansi: e.target.value })}

                                />
                            </FormGroup>
                            <FormGroup>
                                <Label style={{ fontSize: "15px" }}>Jenis Kerjasama: </Label>
                                <Input size="sm" className="w-100" type="text"
                                    value={dataEvaluasi.jenis_kerjasama || ''}
                                    onChange={e => setdataEvaluasi({ ...dataEvaluasi, jenis_kerjasama: e.target.value })}
                                />
                            </FormGroup>
                            <FormGroup>
                                <Label style={{ fontSize: "15px" }}>Skop Kerjasama: </Label>
                                <Input size="sm" className="w-100" type="text"
                                    value={dataEvaluasi.skop_kerjasama || ''}
                                    onChange={e => setdataEvaluasi({ ...dataEvaluasi, skop_kerjasama: e.target.value })}
                                />
                            </FormGroup>
                            <FormGroup>
                                <Label style={{ fontSize: "15px" }}>Bidang Kerjasama: </Label>
                                <Input size="sm" className="w-100" type="text"
                                    value={dataEvaluasi.bidang_kerjasama || ''}
                                    onChange={e => setdataEvaluasi({ ...dataEvaluasi, bidang_kerjasama: e.target.value })}
                                />
                            </FormGroup>
                            <FormGroup>
                                <Label style={{ fontSize: "15px" }}>Lama Kerjasama dengan UMB: </Label>
                                <Input size="sm" className="w-100" type="text"
                                    value={dataEvaluasi.lama_kerjasama || ''}
                                    onChange={e => setdataEvaluasi({ ...dataEvaluasi, lama_kerjasama: e.target.value })}
                                />
                            </FormGroup>
                        </div>

                        <div className="col-7 mt-4 pt-2">
                            <FormGroup>
                                <select name="nilaiKinerja" className="form-control"
                                    value={dataEvaluasi.kesepakatan || ''}
                                    onChange={e => setdataEvaluasi({ ...dataEvaluasi, kesepakatan: e.target.value })}
                                >
                                    <option selected hidden value="">Kesepakatan Kerjasama Dilakukan Dengan Mudah</option>
                                    {OptionNilai()}
                                </select>
                            </FormGroup>

                            <FormGroup>
                                <select name="nilaiKinerja" className="form-control"
                                    value={dataEvaluasi.tanggapan_umb || ''}
                                    onChange={e => setdataEvaluasi({ ...dataEvaluasi, tanggapan_umb: e.target.value })}
                                >
                                    <option selected hidden value="">Pihak UMB Jakarta Telah Menanggapi Usulan Kerjasama Dengan Cepat</option>
                                    {OptionNilai()}
                                </select>
                            </FormGroup>

                            <FormGroup>
                                <select name="nilaiKinerja" className="form-control"
                                    value={dataEvaluasi.penandatanganan || ''}
                                    onChange={e => setdataEvaluasi({ ...dataEvaluasi, penandatanganan: e.target.value })}
                                >
                                    <option selected hidden value="">Proses Penandatanganan Naskah Kerjasama Dilakukan Dengan Cepat</option>
                                    {OptionNilai()}
                                </select>
                            </FormGroup>

                            <FormGroup>
                                <select name="nilaiKinerja" className="form-control"
                                    value={dataEvaluasi.implementasi_kegiatan || ''}
                                    onChange={e => setdataEvaluasi({ ...dataEvaluasi, implementasi_kegiatan: e.target.value })}
                                >
                                    <option selected hidden value="">Kerjasama Telah Diimplementasikan Dengan kegiatan</option>
                                    {OptionNilai()}
                                </select>
                            </FormGroup>
                            <FormGroup>
                                <select name="nilaiKinerja" className="form-control"
                                    value={dataEvaluasi.implementasi_kerjasama || ''}
                                    onChange={e => setdataEvaluasi({ ...dataEvaluasi, implementasi_kerjasama: e.target.value })}
                                >
                                    <option selected hidden value="">Implementasi Kerjasama Telah Sesuai</option>
                                    {OptionNilai()}
                                </select>
                            </FormGroup>
                            <FormGroup>
                                <select name="nilaiKinerja" className="form-control"
                                    value={dataEvaluasi.kepuasan_kerjasama || ''}
                                    onChange={e => setdataEvaluasi({ ...dataEvaluasi, kepuasan_kerjasama: e.target.value })}
                                >
                                    <option selected hidden value="">Kerjasama Kami Telah Memuaskan</option>
                                    {OptionNilai()}
                                </select>
                            </FormGroup>
                            <FormGroup>
                                <select name="nilaiKinerja" className="form-control"
                                    value={dataEvaluasi.kelanjutan_kerjasama || ''}
                                    onChange={e => setdataEvaluasi({ ...dataEvaluasi, kelanjutan_kerjasama: e.target.value })}
                                >
                                    <option selected hidden value="">Kami Tetap Akan Melanjutkan Kerjasama Ini</option>
                                    <option value='ya'>Ya</option>
                                    <option value='tidak'>Tidak</option>
                                </select>
                            </FormGroup>

                        </div>
                    </div>


                </ModalBody>
                <ModalFooter>
                    <MDBBtn size='sm' className="my-0" color='info' onClick={kirimEvaluasi}>Kirim</MDBBtn>
                </ModalFooter>
            </Modal>
            {/* ---- end modal evaluasi ---- */}


            {/* -- menu -- */}
            <div className="menu-pengajuan d-flex mb-4">
                <div className={`${formAjuan} mr-4 pl-0`}
                    onClick={() => {
                        setformAjuan('true')
                        setajuan('false')
                        setonprocess('false')
                    }}
                    style={{ cursor: 'pointer' }}>
                    Isi form
                </div>
                <div className={`${ajuan} mr-4 pl-0`}
                    onClick={() => {
                        setformAjuan('false')
                        setajuan('true')
                        setonprocess('false')
                    }}
                    style={{ cursor: 'pointer' }}>
                    Sedang diajukan
                </div>
                <div className={`${onprocess} `}
                    onClick={() => {
                        setonprocess('true')
                        setformAjuan('false')
                        setajuan('false')
                    }}
                    style={{ cursor: 'pointer' }}>
                    Sedang Berlangsung
                </div>
            </div>

            {
                formAjuan === 'true' ?
                    <div>
                        <h5 style={{ fontWeight: 'bolder' }}>Form Pengajuan Kerjasama</h5>
                        {
                            dataAjuan.length === 0 || dataAjuan === [] ?
                                <p className="alert alert-warning mb-3 pl-2" style={{ fontSize: '12px', marginTop: '0px' }}>
                                    <AiOutlineWarning />  Perhatikan! Pastikan Semua Form Terisi.</p>
                                :
                                <p className="alert alert-danger mb-3 pl-2" style={{ fontSize: '12px', marginTop: '0px' }}>
                                    <AiOutlineWarning />  Perhatikan! Saat Ini Anda Belum Dapat Mengajukan Kerjasama Baru, Karena Pengajuan Sebelumnya Masih Proses Menunggu. <span
                                        style={{ cursor: 'pointer', fontWeight: 'bold' }}
                                        onClick={() => {
                                            setformAjuan('false')
                                            setajuan('true')
                                        }}>klik Untuk melihat</span> </p>
                        }
                        <div className="form-pengajuan d-flex">
                            <div className="left col-6 mr-2 py-2" style={{ backgroundColor: 'whitesmoke' }}>
                                <FormGroup>
                                    <Label style={{ fontSize: "15px" }}>Nama Pengaju: </Label>
                                    <Input size="sm" className="w-100" type="text"
                                        value={addPengajuan.pengaju || ''}
                                        onChange={e => setaddPengajuan({ ...addPengajuan, pengaju: e.target.value })}
                                    />
                                </FormGroup>
                                <FormGroup>
                                    <Label style={{ fontSize: "15px" }}>No HP/WA: </Label>
                                    <Input size="sm" type="text"
                                        value={addPengajuan.no_pengaju || ''}
                                        onChange={e => setaddPengajuan({ ...addPengajuan, no_pengaju: e.target.value })}
                                    />
                                </FormGroup>
                                <FormGroup>
                                    <Label style={{ fontSize: "15px" }}>PIC (Mitra)  </Label>
                                    <Input size="sm" type="text"
                                        value={addPengajuan.PIC || ''}
                                        onChange={e => setaddPengajuan({ ...addPengajuan, PIC: e.target.value })}
                                    />
                                </FormGroup>
                                <FormGroup>
                                    <Label style={{ fontSize: "15px" }}>No HP/WA PIC (Mitra)  </Label>
                                    <Input size="sm" type="text"
                                        value={addPengajuan.no_PIC || ''}
                                        onChange={e => setaddPengajuan({ ...addPengajuan, no_PIC: e.target.value })}
                                    />
                                </FormGroup>
                                <FormGroup>
                                    <Label style={{ fontSize: "15px" }}>Nama Institusi  </Label>
                                    <Input size="sm" type="text"
                                        value={addPengajuan.nama_institusi || ''}
                                        onChange={e => setaddPengajuan({ ...addPengajuan, nama_institusi: e.target.value })}
                                    />
                                </FormGroup>
                                <FormGroup>
                                    <Label style={{ fontSize: "15px" }}>Alamat Institusi  </Label>
                                    <Input size="sm" type="textarea"
                                        value={addPengajuan.alamat_institusi || ''}
                                        onChange={e => setaddPengajuan({ ...addPengajuan, alamat_institusi: e.target.value })}
                                    />
                                </FormGroup>

                                <FormGroup>
                                    <Label style={{ fontSize: "15px" }}>Bidang Kerjasama </Label>
                                    <select name="idbidang" className="form-control" onChange={handleBidang}>
                                        {
                                            addPengajuan.idbidang === undefined ?
                                                <option selected hidden value="">Pilih Kategori..</option>
                                                :
                                                <option hidden value="">Pilih Kategori..</option>
                                        }
                                        {renderSelectBidang()}
                                    </select>

                                    {
                                        tulisBidang ?
                                            (
                                                <Input className="mt-3" type="text" placeholder='Sebutkan Bidang kerja sama'
                                                    value={addPengajuan.bidanglain || ''}
                                                    onChange={e => setaddPengajuan({ ...addPengajuan, bidanglain: e.target.value })} />
                                            ) : <Input disabled className="mt-3" size="sm" type="text" placeholder='Sebutkan Bidang kerja sama' />
                                    }
                                </FormGroup>
                            </div>

                            <div className=" right col-6 pr-4 py-3" style={{ backgroundColor: 'whitesmoke' }}>
                                <FormGroup>
                                    <Label style={{ fontSize: "15px" }}>Pejabat Penandatangan </Label>
                                    <Input className="mb-3" size="sm" type="text" placeholder="Nama Pejabat"
                                        value={addPengajuan.pejabat || ''}
                                        onChange={e => setaddPengajuan({ ...addPengajuan, pejabat: e.target.value })}
                                    />
                                    <Input size="sm" type="text" placeholder="Jabatan"
                                        value={addPengajuan.jabatan || ''}
                                        onChange={e => setaddPengajuan({ ...addPengajuan, jabatan: e.target.value })}
                                    />
                                </FormGroup>
                                <FormGroup>
                                    <Label style={{ fontSize: "15px" }}>Penanggungjawab Pelaksana </Label>
                                    <Input className="mb-3" size="sm" type="text"
                                        value={addPengajuan.penanggungjawab || ''}
                                        onChange={e => setaddPengajuan({ ...addPengajuan, penanggungjawab: e.target.value })}
                                    />
                                </FormGroup>
                                <FormGroup>
                                    <Label style={{ fontSize: "15px" }}>Unit UMB terkait Kerjasama </Label>
                                    <Input className="mb-3" size="sm" type="text"
                                        value={addPengajuan.unit || ''}
                                        onChange={e => setaddPengajuan({ ...addPengajuan, unit: e.target.value })}
                                    />
                                </FormGroup>
                                <FormGroup>
                                    <Label style={{ fontSize: "15px" }}>Dokumen: </Label>
                                    <CustomInput
                                        onChange={handleDocument} label='Select MoU' name='MOU' size="sm" type='file' className='form-control mb-3' />
                                    <CustomInput
                                        onChange={handleDocument}
                                        name='MOA' type='file' label='Upload file MoA' className='form-control mb-3' />
                                    <CustomInput
                                        onChange={handleDocument}
                                        name='IA' type='file' label='Upload file IA' className='form-control mb-3' />
                                    <CustomInput
                                        onChange={handleDocument}
                                        name='perpanjangan' type='file' label='Upload file Perpanjangan MoU/MoA/IA' className='form-control mb-3' />

                                </FormGroup>
                                {
                                    dataAjuan.length === 0 || dataAjuan === [] ?
                                        <MDBBtn color='success' onClick={addNewPengajuan}  >KIRIM</MDBBtn >
                                        :
                                        <MDBBtn color='success' style={{ cursor: 'text' }} >KIRIM</MDBBtn >
                                }


                            </div>
                        </div>
                    </div>
                    :
                    ajuan === 'true' ?
                        dataAjuan.length === 0 || dataAjuan === [] ?
                            <p>Tidak Ada Kerjasama Baru yang Sedang Diajukan</p>
                            :
                            <div>
                                <p className="alert alert-warning mb-3 pl-2" style={{ fontSize: '12px', marginTop: '0px' }}>
                                    <AiOutlineWarning />  Pengajuan sedang dalam proses menunggu. Mohon menunggu respon dari Admin/Pihak UMB.</p>
                                <div className="sedang-diajukan d-flex">
                                    <div className="label-ajuan col-6">
                                        <p>Nama yang mengajukan </p>
                                        <p>No HP/WA </p>
                                        <p>PIC </p>
                                        <p>No HP/WA PIC</p>
                                        <p>Nama Institusi</p>
                                        <p>Alamat Institusi</p>
                                        <p>Bidang Kerjasama</p>
                                        <p>Pejabat Penandatangan</p>
                                        <p>Jabatan Pejabat Penandatangan</p>
                                        <p>Penanggungjawab Pelaksanaan Kerjasama</p>
                                        <p>Unit di UMB yang terlibat dalam Kerjsama</p>
                                        <p>File MoU</p>
                                        <p>File MOA</p>
                                        <p>File IA</p>
                                        <p>File Perpanjangan MoU/MoA/IA</p>
                                    </div>
                                    <div className="isi-ajuan col-6">
                                        <p>{dataAjuan[0].pengaju}</p>
                                        <p>{dataAjuan[0].no_pengaju}</p>
                                        <p>{dataAjuan[0].PIC}</p>
                                        <p>{dataAjuan[0].no_PIC}</p>
                                        <p>{dataAjuan[0].nama_institusi}</p>
                                        <p>{dataAjuan[0].alamat_institusi}</p>
                                        {
                                            dataAjuan[0].bidanglain != "tidak ada" ?
                                                <p>{dataAjuan[0].nama + '(' + dataAjuan[0].bidanglain + ')'}</p>
                                                :
                                                <p>{dataAjuan[0].nama}</p>
                                        }
                                        <p>{dataAjuan[0].pejabat}</p>
                                        <p>{dataAjuan[0].jabatan}</p>
                                        <p>{dataAjuan[0].penanggungjawab}</p>
                                        <p>{dataAjuan[0].unit}</p>
                                        <p><a target="_blank" href={APIURLDoc + dataAjuan[0].MOU}>{showDocs(dataAjuan[0].MOU)}</a></p>
                                        <p><a target="_blank" href={APIURLDoc + dataAjuan[0].MOA}>{showDocs(dataAjuan[0].MOA)}</a></p>
                                        <p><a target="_blank" href={APIURLDoc + dataAjuan[0].IA}>{showDocs(dataAjuan[0].IA)}</a></p>
                                        <p><a target="_blank" href={APIURLDoc + dataAjuan[0].perpanjangan}>{showDocs(dataAjuan[0].perpanjangan)}</a></p>
                                    </div>
                                </div>
                            </div>
                        :
                        dataOnprocess.length === 0 || dataOnprocess === [] ?
                            <p>Tidak Ada Kerjasama yang Sedang Berlangsung</p> :
                            <Table striped >
                                <thead>
                                    <tr className="text-center">
                                        <th>No.</th>
                                        <th>Nama Instansi</th>
                                        <th>Alamat</th>
                                        <th>Bidang Kerjasama</th>
                                        <th>Detail</th>
                                        <th>Review</th>
                                        <th>Status</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {renderOnprocessKerjasama()}
                                </tbody>
                            </Table>



            }

        </div>
    )

}

export default Pengajuan









    // < CustomInput onChange = { addFileMOU } size = "sm" type = 'file' label = 'Upload file MoU' className = 'form-control mb-3' />
    //     <CustomInput onChange={addFileMOA} type='file' label='Uploa file MoA' className='form-control mb-3' />
    //     <CustomInput onChange={addFileIA} type='file' label='Upload file IA' className='form-control mb-3' />
    //     <CustomInput onChange={addFilePerpanjangan} type='file' label='Upload file Perpanjangan MoU/MoA/IA' className='form-control mb-3' />




        // // START FORM DATA APPEND ===================
        // formdata.append('fileMOU', fileMOU)
        // formdata.append('fileMOA', fileMOA)
        // formdata.append('fileIA', fileIA)
        // formdata.append('filePerpanjangan', filePerpanjangan)
        // // formdata.append('newPengajuan', newPengajuan)

        // formdata.append('data', JSON.stringify(newPengajuan))
        // Axios.post(`${APIURL}pengajuan/addpengajuan`, formdata, Headers)
        //     .then(() => {
        //         console.log('successssss')
        //     })
        //     .catch(err => console.log(err))

        // START FORM DATA APPEND ===================