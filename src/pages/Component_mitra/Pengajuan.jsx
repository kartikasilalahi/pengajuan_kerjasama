import React, { useEffect, useState } from 'react';
import { Input, FormGroup, Label, CustomInput } from 'reactstrap';
import Toast from 'light-toast'

import { MDBBtn } from 'mdbreact'
import { AiOutlineWarning } from 'react-icons/ai'
import Axios from 'axios'
import { APIURL } from '../../helper/apiurl'

function Pengajuan() {

    const [Bidang, setBidang] = useState([]);
    const [dokumen, setdokumen] = useState([]);
    const [tulisBidang, settulisBidang] = useState(false);


    /* -------  State add Penggajuan -----------*/
    const [addPengajuan, setaddPengajuan] = useState({
        // pengaju: useRef(),
        // no_pengaju: useRef(),
        // PIC: useRef(),
        // no_PIC: useRef(),
        // nama_institusi: useRef(),
        // alamat_institusi: useRef(),
        // idbidang: '',
        // pejabat: useRef(),
        // jabatan: useRef(),
        // penanggungjawab: useRef(),
        // unit: useRef(),
        // bidanglain: useRef()
    })


    /* -------- USEEFFECT -------- */
    useEffect(() => {
        Axios.get(`${APIURL}pengajuan/getbidang`)
            .then(res => { setBidang(res.data) })
            .catch(err => { console.log(err) })
    }, [])

    /* ----------- Select Bidang ------------- */
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

        if (tulisBidang === false) {
            addPengajuan.bidanglain = ''
        }
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
            idmitra: idmitra
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
        console.log('DATAIMG', dokumen.length)
        formdata.append('data', JSON.stringify(newPengajuan))

        if (!pengaju || !no_pengaju || !PIC || !no_PIC || !nama_institusi || !alamat_institusi || !idbidang || !pejabat || !jabatan || !penanggungjawab || !unit) Toast.fail('Ops! Pastikan semua sudah terisi..', 2700)
        else if (dokumen.length < 4) Toast.fail('Ops! Pastikan semua dokumen lengkap..', 2700)
        else {
            Axios.post(`${APIURL}pengajuan/addpengajuan`, formdata, Headers)
                .then(() => {
                    console.log('successssss')
                    Toast.success('Berhasil..', 2000)
                    setdokumen([])
                    setaddPengajuan({})
                })
                .catch(err => console.log(err))
        }

    }


    // =========== TEST CONSOLE======================================


    // console.log('ini data pengajuan', addPengajuan)
    console.log('tls bdg', tulisBidang)

    // =========== TEST CONSOLE====================================



    /* --------- RETURN -----------*/
    return (
        <div className='m-1'>
            <h5 style={{ fontWeight: 'bolder' }}>Form Pengajuan Kerjasama</h5>
            <p className="alert alert-warning mb-3 pl-2" style={{ fontSize: '12px', marginTop: '0px' }}>
                <AiOutlineWarning />  Perhatikan! Pastikan semua form terisi,</p>

            <div className="form-pengajuan d-flex">
                <div className="left col-6 mr-2 py-2" style={{ backgroundColor: 'whitesmoke' }}>
                    <FormGroup>
                        <Label style={{ fontSize: "15px" }}>Nama Pengaju: </Label>
                        <Input size="sm" className="w-100" type="text"
                            onChange={e => setaddPengajuan({ ...addPengajuan, pengaju: e.target.value })}
                        />
                    </FormGroup>
                    <FormGroup>
                        <Label style={{ fontSize: "15px" }}>No HP/WA: </Label>
                        <Input size="sm" type="text"
                            onChange={e => setaddPengajuan({ ...addPengajuan, no_pengaju: e.target.value })}
                        />
                    </FormGroup>
                    <FormGroup>
                        <Label style={{ fontSize: "15px" }}>PIC (Mitra)  </Label>
                        <Input size="sm" type="text"
                            onChange={e => setaddPengajuan({ ...addPengajuan, PIC: e.target.value })}
                        />
                    </FormGroup>
                    <FormGroup>
                        <Label style={{ fontSize: "15px" }}>No HP/WA PIC (Mitra)  </Label>
                        <Input size="sm" type="text"
                            onChange={e => setaddPengajuan({ ...addPengajuan, no_PIC: e.target.value })}
                        />
                    </FormGroup>
                    <FormGroup>
                        <Label style={{ fontSize: "15px" }}>Nama Institusi  </Label>
                        <Input size="sm" type="text"
                            onChange={e => setaddPengajuan({ ...addPengajuan, nama_institusi: e.target.value })}
                        />
                    </FormGroup>
                    <FormGroup>
                        <Label style={{ fontSize: "15px" }}>Alamat Institusi  </Label>
                        <Input size="sm" type="textarea"
                            onChange={e => setaddPengajuan({ ...addPengajuan, alamat_institusi: e.target.value })}
                        />
                    </FormGroup>

                    <FormGroup>
                        <Label style={{ fontSize: "15px" }}>Bidang Kerjasama </Label>
                        <select name="idbidang" className="form-control" onChange={handleBidang}>
                            <option hidden value="">Select Category..</option>
                            {renderSelectBidang()}
                        </select>

                        {
                            tulisBidang ?
                                (
                                    <Input className="mt-3" type="text" placeholder='Sebutkan Bidang kerja sama'
                                        onChange={e => setaddPengajuan({ ...addPengajuan, bidanglain: e.target.value })} />
                                ) : <Input disabled className="mt-3" size="sm" type="text" placeholder='Sebutkan Bidang kerja sama' />
                        }
                    </FormGroup>
                </div>

                <div className=" right col-6 pr-4 py-3" style={{ backgroundColor: 'whitesmoke' }}>
                    <FormGroup>
                        <Label style={{ fontSize: "15px" }}>Pejabat Penandatangan </Label>
                        <Input className="mb-3" size="sm" type="text" placeholder="Nama Pejabat"
                            onChange={e => setaddPengajuan({ ...addPengajuan, pejabat: e.target.value })}
                        />
                        <Input size="sm" type="text" placeholder="Jabatan"
                            onChange={e => setaddPengajuan({ ...addPengajuan, jabatan: e.target.value })}
                        />
                    </FormGroup>
                    <FormGroup>
                        <Label style={{ fontSize: "15px" }}>Penanggungjawab Pelaksana </Label>
                        <Input className="mb-3" size="sm" type="text"
                            onChange={e => setaddPengajuan({ ...addPengajuan, penanggungjawab: e.target.value })}
                        />
                    </FormGroup>
                    <FormGroup>
                        <Label style={{ fontSize: "15px" }}>Unit UMB terkait Kerjasama </Label>
                        <Input className="mb-3" size="sm" type="text"
                            onChange={e => setaddPengajuan({ ...addPengajuan, unit: e.target.value })}
                        />
                    </FormGroup>
                    <FormGroup>
                        <Label style={{ fontSize: "15px" }}>Dokumen: </Label>
                        <CustomInput onChange={handleDocument} name='MOU' size="sm" type='file' label='Upload file MoU' className='form-control mb-3' />
                        <CustomInput onChange={handleDocument} name='MOA' type='file' label='Uploa file MoA' className='form-control mb-3' />
                        <CustomInput onChange={handleDocument} name='IA' type='file' label='Upload file IA' className='form-control mb-3' />
                        <CustomInput onChange={handleDocument} name='perpanjangan' type='file' label='Upload file Perpanjangan MoU/MoA/IA' className='form-control mb-3' />

                    </FormGroup>

                    <MDBBtn color='success' onClick={addNewPengajuan} >KIRIM</MDBBtn >
                </div>
            </div>
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