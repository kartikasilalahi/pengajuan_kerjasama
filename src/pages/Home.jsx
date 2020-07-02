import React, { Component } from 'react';
import Toast from 'light-toast'
import { MDBBtn, MDBCard, MDBInput } from 'mdbreact';
import { Carousel } from 'react-responsive-carousel'
import { Card } from 'reactstrap';
import { Modal, ModalBody, FormGroup, Label } from 'reactstrap'
import { Register, Open_Register, Error_Register, Login, Error_Login } from '../redux/action'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'

class Home extends Component {

    state = {
        jenisperusahaan: ''
    }

    // ---------- button Register ------------
    btnRegister = () => {
        var nama = this.nama.value
        var email = this.email.value
        var phone = this.phone.value
        var alamat = this.alamat.value
        var password = this.password.value
        var confpassword = this.confpassword.value
        var linkperusahaan = this.linkperusahaan.value
        var jenisperusahaan = this.state.jenisperusahaan

        this.props.Register({
            nama, email, phone, alamat, password, confpassword, linkperusahaan, jenisperusahaan
        })
        console.log('limk', linkperusahaan)
        console.log('jenis', jenisperusahaan)
    }

    // ---------- render error register ------------
    renderErrorRegister = () => {
        if (this.props.errorRegister === '') {
            return null
        } else {
            console.log(this.props.errorRegister)
            return (
                <div className="d-flex">
                    <div className="w-75 error_register  ml-3" >
                        <p className="alert alert-danger text-left" style={{ fontSize: "11px", borderRight: '0px none', borderRadius: '10px 0px 0px 10px' }}>{this.props.errorRegister}</p>
                    </div>
                    <div className="w-25 x ">
                        <p className="alert alert-danger text-right" style={{ cursor: 'pointer', fontWeight: "bold", fontSize: "11px", borderLeft: '0px none', borderRadius: '0px 10px 10px 0px' }} onClick={() => this.props.Error_Register(
                            ''
                        )} >x</p>
                    </div>
                </div>
            )
        }
    }


    // ---------- button Login ------------
    btnLogin = () => {
        let email = this.email_log.value
        let password = this.password_log.value
        this.props.Login(email, password)
    }


    // ---------- render erro Login ------------
    renderErrorLogin = () => {
        if (this.props.errorlogin === '') {
            return null
        } else {
            console.log(this.props.errorlogin)
            return (
                <div className="d-flex">
                    <div className="w-75 error_login  ml-3" >
                        <p className="alert alert-danger text-left" style={{ fontSize: "12px", borderRight: '0px none', borderRadius: '10px 0px 0px 10px' }}>{this.props.errorlogin}</p>
                    </div>
                    <div className="w-25 x ">
                        <p className="alert alert-danger text-right" style={{ cursor: 'pointer', fontWeight: "bold", fontSize: "12px", borderLeft: '0px none', borderRadius: '0px 10px 10px 0px' }} onClick={() => this.props.Error_Login(
                            ''
                        )} >x</p>
                    </div>
                </div>
            )
        }
    }


    render() {
        // console.log('jenis', this.state.jenisperusahaan)
        let id = localStorage.getItem('id')

        if (this.props.succes_register.length > 0) {
            Toast.success(`${this.props.succes_register}`, 2500)
        }

        if (id > 1) {
            this.props.Error_Login('')
            Toast.success('Berhasil login, Selamat datang..', 2000)

            return <Redirect to={'/dashboard_mitra'} />
            // this.props.login && this.props.roleid === 
        } else if (id == 1) {
            console.log('idnya', id)
            console.log(this.props.succes_register)
            this.props.Error_Login('')
            Toast.success('Berhasil login, Selamat datang.. Anda sebagai ADMIN', 2000)
            return <Redirect to={'/dashboard_admin'} />
        }
        return (
            <div className="homepage p-4">

                {/* ----modal register----- */}
                <Modal centered isOpen={this.props.modalregister} toggle={() => { this.props.Open_Register(false) }}>
                    <ModalBody >
                        <div className="gbr_login text-center">
                            <img alt='img' src={require('../image/logo_mercubuana.png')} />
                        </div>
                        <div className="formlogin px-4"  >
                            <h5 className="text-center judul_form mt-3" style={{ fontWeight: 'bold' }}>Registrasi</h5>
                            {/* start form register */}
                            <form>
                                <div className="grey-text">
                                    <MDBInput size="sm" label="Nama Perusahaan/Instansi" icon="user" group type="text" className=" mt-1" inputRef={ref => this.nama = ref} />
                                    <MDBInput size="sm" label="Email Perusahaan/Instansi" icon="envelope" group type="email" inputRef={ref => this.email = ref} />
                                    <MDBInput size="sm" label="No. Telp Perusahaan/Instansi" icon="phone" group type="text" inputRef={ref => this.phone = ref} />
                                    <MDBInput size="sm" label="Alamat Perusahaan/Instansi" icon="phone" group type="text" inputRef={ref => this.alamat = ref} />
                                    <MDBInput size="sm" label="Input password" icon="lock" group type="password" inputRef={ref => this.password = ref} />
                                    <MDBInput size="sm" label="Confirm password" icon="exclamation-triangle" group type="password" inputRef={ref => this.confpassword = ref} />
                                    <MDBInput size="sm" label={`Link website Perushaan (Kalau tidak ada, ketik " tidak ada " )`} icon="exclamation-triangle" group type="text" inputRef={ref => this.linkperusahaan = ref} />
                                    <FormGroup className="ml-4 pl-1" style={{ width: '50%' }}>
                                        <select name="jenisperusahaan" className="form-control"
                                            onChange={e => this.setState({ jenisperusahaan: e.target.value })}
                                            style={{ color: 'grey', fontSize: '14px' }}>
                                            <option selected hidden value="">Jenis instansi..</option>
                                            <option value="Pemerintahan">Pemerintahan</option>
                                            <option value="Non Pemerintahan">Non Pemerintahan</option>
                                        </select>
                                    </FormGroup>
                                </div>
                                <div className="render_error_register">
                                    {this.renderErrorRegister()}
                                </div>
                                <div className="text-center">
                                    <MDBBtn color='blue' onClick={this.btnRegister}>Registrasi</MDBBtn>
                                </div>
                            </form>
                            {/* end form register */}

                        </div>
                    </ModalBody>
                </Modal>


                <MDBCard className="p-5 " style={{ backgroundColor: 'whitesmoke' }}>
                    <div className="text-center">
                    </div>
                    <div className="d-flex">
                        <div className="home_left w-50 mr-0">
                            <div className="home_slide">
                                <Carousel className="carosel mx-auto" infiniteLoop showThumbs={false} showStatus={false} autoPlay>
                                    <div><img alt='img' src={require('../image/umb1.jpeg')} width="50px" /></div>
                                    <div><img alt='img' src={require('../image/umb2.jpeg')} width="50px" /></div>
                                    <div><img alt='img' src={require('../image/umb3.jpeg')} width="50px" /></div>
                                    <div><img alt='img' src={require('../image/umb4.jpeg')} width="50px" /></div>
                                </Carousel>
                            </div>
                        </div>
                        <div className="home_right w-50 px-5 pb-3" >
                            <div className="home_logo pb-4 pt-0 mt-0 ">
                                <img alt='img' src={require('../image/logo_mercubuana.png')} width="300px" />
                            </div>
                            <h4>Sistem Pengajuan Kerjasama</h4>
                            <h5>Universitas Mercubuana</h5>
                            {/* ----start form login----- */}
                            <Card className="mt-3">
                                <form className="py-3 pr-3" >
                                    <p className="h5 text-center mb-4">Sign in</p>
                                    <div className="grey-text">
                                        <MDBInput inputRef={ref => this.email_log = ref} label="Type your email" icon="envelope" group type="email" validate error="wrong"
                                            success="right" />
                                        <MDBInput inputRef={ref => this.password_log = ref} label="Type your password" icon="lock" group type="password" validate />
                                    </div>
                                    <div className="error_login">
                                        {this.renderErrorLogin()}
                                    </div>
                                    <div className="text-center">
                                        <MDBBtn color='blue' onClick={this.btnLogin}>sign in</MDBBtn>
                                    </div>
                                    <div className="mt-1 pr-2 pb-3 text-right" style={{ fontSize: "13px" }}>
                                        Belum terdaftar?
                                    <br />Register <a className='blue-text font-weight-bold' onClick={() => { this.props.Open_Register(true) }}>disini sekarang!</a>{" "}
                                    </div>
                                </form>
                            </Card>
                            {/* ----end form login----- */}

                        </div>
                    </div>
                </MDBCard>
            </div >
        )
    }
}

const MapStateToProps = (state) => {
    return {
        errorRegister: state.authReducer.errorRegister,
        modalregister: state.authReducer.modalregister,
        succes_register: state.authReducer.succes_register,
        errorlogin: state.authReducer.errorlogin,
        success_login: state.authReducer.success_login,
        login: state.authReducer.login,
        roleid: state.authReducer.roleid

    }
}
export default connect(MapStateToProps, { Register, Open_Register, Error_Register, Login, Error_Login })(Home)