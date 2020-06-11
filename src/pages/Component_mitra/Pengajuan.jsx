import React, { useEffect, useState, useRef } from 'react';
import { Input, FormGroup, Label, Col, Button, CustomInput } from 'reactstrap';
import { MDBBtn } from 'mdbreact'
import { AiOutlineWarning } from 'react-icons/ai'
import Axios from 'axios'
import { APIURL } from '../../helper/apiurl'

function Pengajuan() {

    const [dataPengajuan, setdataPengajuan] = useState([]);

    return (
        <div className='m-1'>
            <h5 style={{ fontWeight: 'bolder' }}>Form Pengajuan Kerjasama</h5>
            <p className="alert alert-warning mb-3 pl-2" style={{ fontSize: '12px', marginTop: '0px' }}>
                <AiOutlineWarning />  Perhatikan! Pastikan semua form terisi,</p>

            <div className="form-pengajuan d-flex">
                <div className="left col-6 mr-2 py-2" style={{ backgroundColor: 'whitesmoke' }}>
                    <FormGroup>
                        <Label style={{ fontSize: "15px" }}>Nama Pengaju: </Label>
                        <Input size="sm" className="w-100" type="text" />
                        {/* value={editResto.namatoko}
                            onChange={e => seteditResto({ ...editResto, namatoko: e.target.value })} /> */}
                    </FormGroup>
                    <FormGroup>
                        <Label style={{ fontSize: "15px" }}>No HP/WA: </Label>
                        <Input size="sm" type="text" />
                        {/* value={editResto.alamat}
                            onChange={e => seteditResto({ ...editResto, alamat: e.target.value })} /> */}
                    </FormGroup>
                    <FormGroup>
                        <Label style={{ fontSize: "15px" }}>PIC (Mitra)  </Label>
                        <Input size="sm" type="text" />
                        {/* value={editResto.phone}
                            onChange={e => seteditResto({ ...editResto, phone: e.target.value })} /> */}
                    </FormGroup>
                    <FormGroup>
                        <Label style={{ fontSize: "15px" }}>No HP/WA PIC (Mitra)  </Label>
                        <Input size="sm" type="text" />
                        {/* value={editResto.phone}
                            onChange={e => seteditResto({ ...editResto, phone: e.target.value })} /> */}
                    </FormGroup>
                    <FormGroup>
                        <Label style={{ fontSize: "15px" }}>Nama Institusi  </Label>
                        <Input size="sm" type="text" />
                        {/* value={editResto.phone}
                            onChange={e => seteditResto({ ...editResto, phone: e.target.value })} /> */}
                    </FormGroup>
                    <FormGroup>
                        <Label style={{ fontSize: "15px" }}>Alamat Institusi  </Label>
                        <Input size="sm" type="textarea" />
                        {/* value={editResto.phone}
                            onChange={e => seteditResto({ ...editResto, phone: e.target.value })} /> */}
                    </FormGroup>
                    <FormGroup>
                        <Label style={{ fontSize: "15px" }}>Bidang Kerjasama </Label>
                        <select name="takeaway" className="form-control" size="sm">
                            <option value='' hidden>Select..</option>
                            {/* {renderSelect(editResto.takeaway)} */}

                            {/* 
                            <select onChange={handleSelect} name="takeaway" style={{ fontSize: "12px" }} className="form-control" size="sm">
                                <option value='' key={3} hidden>Select..</option>
                                {renderSelect(editResto.takeaway)}
                            </select>
                             */}
                        </select>
                    </FormGroup>
                </div>

                <div className=" right col-6 pr-4 py-3" style={{ backgroundColor: 'whitesmoke' }}>
                    <FormGroup>
                        <Label style={{ fontSize: "15px" }}>Pejabat Penandatangan </Label>
                        <Input className="mb-3" size="sm" type="text" placeholder="Nama Pejabat" />
                        <Input size="sm" type="text" placeholder="Jabatan" />
                        {/* value={editResto.phone}
                            onChange={e => seteditResto({ ...editResto, phone: e.target.value })} /> */}
                    </FormGroup>
                    <FormGroup>
                        <Label style={{ fontSize: "15px" }}>Penanggungjawab Pelaksana </Label>
                        <Input className="mb-3" size="sm" type="text" />
                        {/* value={editResto.phone}
                            onChange={e => seteditResto({ ...editResto, phone: e.target.value })} /> */}
                    </FormGroup>
                    <FormGroup>
                        <Label style={{ fontSize: "15px" }}>Unit UMB terkait Kerjasama </Label>
                        <Input className="mb-3" size="sm" type="text" />
                        {/* value={editResto.phone}
                            onChange={e => seteditResto({ ...editResto, phone: e.target.value })} /> */}
                    </FormGroup>
                    <FormGroup>
                        <Label style={{ fontSize: "15px" }}>Dokumen: </Label>
                        <CustomInput size="sm" type='file' label='Upload file MoU' className='form-control mb-3' />
                        <CustomInput type='file' label='Uploa file MoA' className='form-control mb-3' />
                        <CustomInput type='file' label='Upload file IA' className='form-control mb-3' />
                        <CustomInput type='file' label='Upload file Perpanjangan MoU/MoA/IA' className='form-control mb-3' />

                        {/* <CustomInput type='file' label='Select Image..' onChange={HandleEditImages} className='form-control' /> */}

                    </FormGroup>

                    <MDBBtn color='success' >KIRIM</MDBBtn >
                </div>
            </div>
        </div>
    )

}

export default Pengajuan 
