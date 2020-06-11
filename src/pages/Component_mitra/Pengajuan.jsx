import React, { useEffect, useState, useRef } from 'react';
import { Input, FormGroup, Label, Col, Button, CustomInput } from 'reactstrap';
import { MDBBtn } from 'mdbreact'
import { AiOutlineWarning } from 'react-icons/ai'
import Axios from 'axios'
import { APIURL } from '../../helper/apiurl'

function Pengajuan() {

    const [dataPengajuan, setdataPengajuan] = useState([]);
    const [Bidang, setBidang] = useState([]);
    const [fileMOU, setfileMOU] = useState();
    const [fileMOA, setfileMOA] = useState();
    const [fileIA, setfileIA] = useState();
    const [filePerpanjangan, setfilePerpanjangan] = useState();
    const [tulisBidang, settulisBidang] = useState(false);


    /* -------  State add Penggajuan -----------*/
    const [addPengajuan, setaddPengajuan] = useState({
        pengaju: useRef(),
        no_pengaju: useRef(),
        PIC: useRef(),
        no_PIC: useRef(),
        nama_institusi: useRef(),
        alamat_institusi: useRef(),
        idbidang: '',
        pejabat: useRef(),
        jabatan: useRef(),
        // MOU: useRef(),
        // MOA: useRef(),
        // IA: useRef(),
        // perpanjangan: useRef(),
        penanggungjawab: useRef(),
        unit: useRef(),
        bidanglain: useRef()
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
        if (value == 5 || value == 6) {
            settulisBidang(true)
            setaddPengajuan({ ...addPengajuan, [name]: value })
        } else {
            settulisBidang(false)
            setaddPengajuan({ ...addPengajuan, [name]: value })
        }
    }

    /* ---------- Add File MOU --------- */
    const addFileMOU = (e) => {
        console.log('ini mou', e.target.files[0])
        let fileMOU = e.target.files[0]
        if (fileMOU) {
            setfileMOU(e.target.files[0])
        } else {
            setfileMOU(undefined)
        }
    }

    /* ---------- Add File MOA --------- */
    const addFileMOA = (e) => {
        console.log('ini moa', e.target.files[0])
        let fileMOA = e.target.files[0]
        if (fileMOA) {
            setfileMOA(e.target.files[0])
        } else {
            setfileMOA(undefined)
        }
    }

    /* ---------- Add File IA --------- */
    const addFileIA = (e) => {
        console.log('ini IA', e.target.files[0])
        let fileIA = e.target.files[0]
        if (fileIA) {
            setfileIA(e.target.files[0])
        } else {
            setfileIA(undefined)
        }
    }

    /* ---------- Add File Perpanjangan --------- */
    const addFilePerpanjangan = (e) => {
        console.log('ini Perpanjangan', e.target.files[0])
        let filePerpanjangan = e.target.files[0]
        if (filePerpanjangan) {
            setfilePerpanjangan(e.target.files[0])
        } else {
            setfilePerpanjangan(undefined)
        }
    }

    /* -------- Add Pengajuan -------- */
    const addNewPengajuan = () => {
        let id = localStorage.getItem('id')
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
            // MOU,
            // MOA,
            // IA,
            // perpanjangan,
            penanggungjawab,
            unit,
            bidanglain
        } = addPengajuan

        let newPengajuan = {
            pengaju: pengaju.current.value,
            no_pengaju: no_pengaju.current.value,
            PIC: PIC.current.value,
            no_PIC: no_PIC.current.value,
            nama_institusi: nama_institusi.current.value,
            alamat_institusi: alamat_institusi.current.value,
            idbidang: parseInt(idbidang.current.value),
            pejabat: pejabat.current.value,
            jabatan: jabatan.current.value,
            penanggungjawab: penanggungjawab.current.value,
            unit: unit.current.value,
            bidanglain: bidanglain.current.value
        }

        let Headers = {
            headers:
            {
                'Content-Type': 'multipart/form-data'
            }
        }

        // START FORM DATA APPEND ===================
        formdata.append('MOU', fileMOU)
        formdata.append('MOA', fileMOA)
        formdata.append('IA', fileIA)
        formdata.append('perpanjangan', filePerpanjangan)
        formdata.append('newPengajuan', newPengajuan)


    }


    // =========== TEST CONSOLE
    console.log('INI', addPengajuan)

    // =========== TEST CONSOLE



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
                        <Input size="sm" className="w-100" type="text" innerRef={addPengajuan.pengaju} />
                    </FormGroup>
                    <FormGroup>
                        <Label style={{ fontSize: "15px" }}>No HP/WA: </Label>
                        <Input size="sm" type="text" innerRef={addPengajuan.no_pengaju} />
                    </FormGroup>
                    <FormGroup>
                        <Label style={{ fontSize: "15px" }}>PIC (Mitra)  </Label>
                        <Input size="sm" type="text" innerRef={addPengajuan.PIC} />
                    </FormGroup>
                    <FormGroup>
                        <Label style={{ fontSize: "15px" }}>No HP/WA PIC (Mitra)  </Label>
                        <Input size="sm" type="text" innerRef={addPengajuan.no_PIC} />
                    </FormGroup>
                    <FormGroup>
                        <Label style={{ fontSize: "15px" }}>Nama Institusi  </Label>
                        <Input size="sm" type="text" innerRef={addPengajuan.alamat_institusi} />
                    </FormGroup>
                    <FormGroup>
                        <Label style={{ fontSize: "15px" }}>Alamat Institusi  </Label>
                        <Input size="sm" type="textarea" innerRef={addPengajuan.alamat_institusi} />
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
                                    <Input className="mt-3" type="text" placeholder='Sebutkan Bidang kerja sama' innerRef={addPengajuan.bidanglain} />
                                ) : <Input disabled className="mt-3" size="sm" type="text" placeholder='Sebutkan Bidang kerja sama' />
                        }
                    </FormGroup>
                </div>

                <div className=" right col-6 pr-4 py-3" style={{ backgroundColor: 'whitesmoke' }}>
                    <FormGroup>
                        <Label style={{ fontSize: "15px" }}>Pejabat Penandatangan </Label>
                        <Input className="mb-3" size="sm" type="text" placeholder="Nama Pejabat" innerRef={addPengajuan.pejabat} />
                        <Input size="sm" type="text" placeholder="Jabatan" innerRef={addPengajuan.jabatan} />
                    </FormGroup>
                    <FormGroup>
                        <Label style={{ fontSize: "15px" }}>Penanggungjawab Pelaksana </Label>
                        <Input className="mb-3" size="sm" type="text" innerRef={addPengajuan.penanggungjawab} />
                    </FormGroup>
                    <FormGroup>
                        <Label style={{ fontSize: "15px" }}>Unit UMB terkait Kerjasama </Label>
                        <Input className="mb-3" size="sm" type="text" innerRef={addPengajuan.unit} />
                    </FormGroup>
                    <FormGroup>
                        <Label style={{ fontSize: "15px" }}>Dokumen: </Label>
                        <CustomInput onChange={addFileMOU} size="sm" type='file' label='Upload file MoU' className='form-control mb-3' />
                        <CustomInput onChange={addFileMOA} type='file' label='Uploa file MoA' className='form-control mb-3' />
                        <CustomInput onChange={addFileIA} type='file' label='Upload file IA' className='form-control mb-3' />
                        <CustomInput onChange={addFilePerpanjangan} type='file' label='Upload file Perpanjangan MoU/MoA/IA' className='form-control mb-3' />

                    </FormGroup>

                    <MDBBtn color='success' >KIRIM</MDBBtn >
                </div>
            </div>
        </div>
    )

}

export default Pengajuan 
