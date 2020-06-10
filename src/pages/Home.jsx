import React, { Component } from 'react';
import Toast from 'light-toast'
import { MDBBtn, MDBCard, MDBInput } from 'mdbreact';
import { Carousel } from 'react-responsive-carousel'
import { Card } from 'reactstrap';
import { Modal, ModalBody } from 'reactstrap'
import { Register, Open_Register, Error_Register, Login, Error_Login } from '../redux/action'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'

class Home extends Component {

    // ---------- button Register ------------
    btnRegister = () => {
        var nama = this.nama.value
        var email = this.email.value
        var phone = this.phone.value
        var alamat = this.alamat.value
        var password = this.password.value
        var confpassword = this.confpassword.value

        this.props.Register({
            nama, email, phone, alamat, password, confpassword
        })
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
        let id = localStorage.getItem('id')

        if (this.props.succes_register.length > 0) {
            Toast.success(`${this.props.succes_register}`, 2500)
        }
        // this.props.login && this.props.roleid === 2
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
                            <h4 className="text-center judul_form mt-3">Register</h4>
                            {/* start form register */}
                            <form>
                                <div className="grey-text">
                                    <MDBInput size="sm" label="Your Company" icon="user" group type="text" className=" mt-1" inputRef={ref => this.nama = ref} />
                                    <MDBInput size="sm" label="Your Comapany email" icon="envelope" group type="email" inputRef={ref => this.email = ref} />
                                    <MDBInput size="sm" label="Your Company Phone" icon="phone" group type="text" inputRef={ref => this.phone = ref} />
                                    <MDBInput size="sm" label="Your Company Address" icon="phone" group type="text" inputRef={ref => this.alamat = ref} />
                                    <MDBInput size="sm" label="Your password" icon="lock" group type="password" inputRef={ref => this.password = ref} />
                                    <MDBInput size="sm" label="Confirm your password" icon="exclamation-triangle" group type="password" inputRef={ref => this.confpassword = ref} />
                                </div>
                                <div className="render_error_register">
                                    {this.renderErrorRegister()}
                                </div>
                                <div className="text-center">
                                    <MDBBtn color='blue' onClick={this.btnRegister}>register</MDBBtn>
                                </div>
                            </form>
                            {/* end form register */}

                        </div>
                    </ModalBody>
                </Modal>


                <MDBCard className="p-5 " style={{ backgroundColor: 'whitesmoke' }}>
                    <div className="d-flex">
                        <div className="home_left w-50 mr-0">
                            <h4>Sistem Pengajuan Kerjasama</h4>
                            <h5>Universitas Mercubuana</h5>
                            <div className="home_logo p-3">
                                <img alt='img' src={require('../image/logo_mercubuana.png')} />
                            </div>
                            <div className="home_slide">
                                <Carousel className="carosel mx-auto" infiniteLoop showThumbs={false} showStatus={false} autoPlay>
                                    <div><img alt='img' src={require('../image/kerjasama1.jpg')} width="50px" /></div>
                                    <div><img alt='img' src={require('../image/kerjasama2.jpg')} width="50px" /></div>
                                    <div><img alt='img' src={require('../image/kerjasama3.jpg')} width="50px" /></div>
                                </Carousel>
                            </div>
                        </div>
                        <div className="home_right w-50 px-5 py-3">
                            {/* ----start form login----- */}
                            <Card>
                                <form className="py-5 pr-3">
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
                                        <MDBBtn color='blue' onClick={this.btnLogin}>Login</MDBBtn>
                                    </div>
                                    <div className="mt-1 pr-2 pb-3 text-right" style={{ fontSize: "13px" }}>
                                        Don't have an Account?
                                    <br />Register <a className='blue-text font-weight-bold' onClick={() => { this.props.Open_Register(true) }}>here!</a>{" "}
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