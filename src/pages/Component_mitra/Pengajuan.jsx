import React, { useEffect, useState } from 'react';
import { Input, FormGroup, Label, CustomInput } from 'reactstrap';
import Toast from 'light-toast'

import { MDBBtn } from 'mdbreact'
import { AiOutlineWarning } from 'react-icons/ai'
import Axios from 'axios'
import { APIURL, APIURLDoc } from '../../helper/apiurl'

function Pengajuan() {

    /* -------  State Awal -----------*/
    const [Bidang, setBidang] = useState([]);
    const [dokumen, setdokumen] = useState([]);
    const [dataAjuan, setdataAjuan] = useState([]);
    const [formAjuan, setformAjuan] = useState('true');
    const [ajuan, setajuan] = useState('false');

    const [tulisBidang, settulisBidang] = useState(false);
    const [addPengajuan, setaddPengajuan] = useState({})


    /* -------- USEEFFECT -------- */
    useEffect(() => {
        let id = parseInt(localStorage.getItem('id'))
        Axios.get(`${APIURL}pengajuan/getajuan/${id}`)
            .then(res => { setdataAjuan(res.data) })
            .catch(err => { console.log(err) })
        Axios.get(`${APIURL}pengajuan/getbidang`)
            .then(res => { setBidang(res.data) })
            .catch(err => { console.log(err) })
    }, [])


    /* ----------- Render Option Bidang ------------- */
    const renderSelectBidang = () => {
        return Bidang.map((val, i) => {
            return <option value={val.id} key={i}>{val.nama}</option>
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
        ) Toast.fail('Ops! Pastikan semua sudah terisi..', 3000)

        else if (dokumen.length < 4) Toast.fail('Ops! Pastikan semua dokumen lengkap..', 2700)

        else {
            Toast.loading(`Loading.. Sedang mengirim Pengajuan`);
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
                        // window.location.reload()
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


    // =========== TEST CONSOLE======================================

    // console.log('ini data pengajuan', addPengajuan)
    // console.log('tls bdg', tulisBidang)
    // console.log(addPengajuan.idbidang)
    console.log(dataAjuan[0])

    // =========== TEST CONSOLE=======================================



    /* --------- RETURN -----------*/
    return (
        <div className='m-1'>
            {/* -- menu -- */}
            <div className="menu-pengajuan d-flex mb-4">
                <div className={`${formAjuan} mr-4 pl-0`}
                    onClick={() => {
                        setformAjuan('true')
                        setajuan('false')
                    }}
                    style={{ cursor: 'pointer' }}>
                    Isi form
                </div>
                <div className={`${ajuan} `}
                    onClick={() => {
                        setformAjuan('false')
                        setajuan('true')
                    }}
                    style={{ cursor: 'pointer' }}>
                    Sedang diajukan
                </div>
            </div>

            {
                formAjuan === 'true' ?
                    <div>
                        <h5 style={{ fontWeight: 'bolder' }}>Form Pengajuan Kerjasama</h5>
                        {
                            dataAjuan.length === 0 || dataAjuan === [] ?
                                <p className="alert alert-warning mb-3 pl-2" style={{ fontSize: '12px', marginTop: '0px' }}>
                                    <AiOutlineWarning />  Perhatikan! Pastikan semua form terisi.</p>
                                :
                                <p className="alert alert-danger mb-3 pl-2" style={{ fontSize: '12px', marginTop: '0px' }}>
                                    <AiOutlineWarning />  Perhatikan! Saat ini Anda belum dapat mengajukan kerjasama baru, dikarenakan pengajuan sebelumnya masih proses menunggu. <span style={{ cursor: 'pointer', fontWeight: 'bolder' }} onClick={() => {
                                        setformAjuan('false')
                                        setajuan('true')
                                    }}>klik untuk melihat</span> </p>
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
                    dataAjuan.length === 0 || dataAjuan === [] ?
                        <p>Belum ada</p>
                        :
                        <div>
                            <p className="alert alert-warning mb-3 pl-2" style={{ fontSize: '12px', marginTop: '0px' }}>
                                <AiOutlineWarning />  Pengajuan sedang dalam proses menunggu. Dimohon menunggu respon dari Administrator/Pihak UMB.</p>
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