import React, { Component } from 'react';
import Toast from 'light-toast'
import { MDBBtn, MDBIcon, MDBInput } from 'mdbreact';
import { Carousel } from 'react-responsive-carousel'
import { Card } from 'reactstrap';
import { Modal, ModalBody, FormGroup } from 'reactstrap'
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

    copyright = () => {
        var d = new Date();
        return d.getFullYear()
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
            Toast.success('Berhasil Masuk', 2000)
            return <Redirect to={'/dashboard_admin'} />
        }
        return (
            <div>

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
                                    <img alt='img' src={require('../image/logo_mercubuana.png')} width="300px"
                                        style={{ opacity: 0.1, zIndex: 1, position: "absolute", top: 280, left: 100, transform: 'rotate(-17deg)' }} />
                                    <div className="grey-text">
                                        <MDBInput size="sm" label="Nama Perusahaan/Instansi" icon="user" group type="text" className=" mt-1" inputRef={ref => this.nama = ref} />
                                        <MDBInput size="sm" label="Email Perusahaan/Instansi" icon="envelope" group type="email" inputRef={ref => this.email = ref} />
                                        <MDBInput size="sm" label="No. Telp Perusahaan/Instansi" icon="phone" group type="text" inputRef={ref => this.phone = ref} />
                                        <MDBInput size="sm" label="Alamat Perusahaan/Instansi" icon="location-arrow" group type="text" inputRef={ref => this.alamat = ref} />
                                        <MDBInput size="sm" label="Password" icon="lock" group type="password" inputRef={ref => this.password = ref} />
                                        <MDBInput size="sm" label="Konfirmasi Password" icon="exclamation-triangle" group type="password" inputRef={ref => this.confpassword = ref} />
                                        <MDBInput size="sm" label={`Website Perusahaan (Kalau Tidak Ada, Ketik " Tidak Ada " )`} icon="link" group type="text" inputRef={ref => this.linkperusahaan = ref} />
                                        <FormGroup className="ml-4 pl-1" style={{ width: '50%' }}>
                                            <select name="jenisperusahaan" className="form-control"
                                                onChange={e => this.setState({ jenisperusahaan: e.target.value })}
                                                style={{ color: 'grey', fontSize: '14px' }}>
                                                <option selected hidden value="">Jenis Instansi</option>
                                                <option value="Pemerintahan">Pemerintahan</option>
                                                <option value="Non Pemerintahan">Non-Pemerintahan</option>
                                            </select>
                                        </FormGroup>
                                    </div>
                                    <div className="render_error_register">
                                        {this.renderErrorRegister()}
                                    </div>
                                    <div className="text-center">
                                        <MDBBtn color='blue' onClick={this.btnRegister}><MDBIcon icon="paper-plane" /> Registrasi</MDBBtn>
                                    </div>
                                </form>
                                {/* end form register */}

                            </div>
                        </ModalBody>
                    </Modal>


                    {/* <MDBCard className="p-5 " style={{ backgroundColor: 'whitesmoke' }}> */}
                    <div className="p-5">

                        <div className="d-flex">
                            <div className="home_left w-50 mr-0">
                                <div className="home_slide">
                                    <Carousel className="carosel mx-auto" infiniteLoop showThumbs={false} showStatus={false} autoPlay>
                                        <div><img alt='img' src={require('../image/umb1.jpeg')} width="50px" /></div>
                                        <div><img alt='img' src={require('../image/umb2.jpeg')} width="50px" /></div>
                                        <div><img alt='img' src={require('../image/umb3.jpeg')} width="50px" /></div>
                                        <div><img alt='img' src={require('../image/umb4.jpeg')} width="50px" /></div>
                                        <div><img alt='img' src={require('../image/umb9.jpg')} width="50px" /></div>
                                        <div><img alt='img' src={require('../image/umb10.jpg')} width="50px" /></div>
                                        <div><img alt='img' src={require('../image/umb11.jpg')} width="50px" /></div>
                                        <div><img alt='img' src={require('../image/umb12.jpg')} width="50px" /></div>
                                        <div><img alt='img' src={require('../image/umb13.jpg')} width="50px" /></div>
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
                                    <img alt='img' src={require('../image/logo_mercubuana.png')} width="250px"
                                        style={{ opacity: 0.1, zIndex: 1, position: "absolute", top: 110, left: 120 }} />
                                    <form className="p-3" >
                                        <p className="h5 text-center mt-3 mb-4">Masuk/Login</p>
                                        <div className="grey-text">
                                            <MDBInput inputRef={ref => this.email_log = ref} label="Masukkan Email" icon="envelope" group type="email" validate error="wrong"
                                                success="right" />
                                            <MDBInput inputRef={ref => this.password_log = ref} label="Masukkan Password" icon="lock" group type="password" validate />
                                        </div>
                                        <div className="error_login">
                                            {this.renderErrorLogin()}
                                        </div>
                                        <div className="text-center">
                                            <MDBBtn color='blue' onClick={this.btnLogin}><i class="fa fa-sign-in"></i> Masuk</MDBBtn>
                                        </div>
                                        <div className="mt-1 pr-2 pb-3 text-right" style={{ fontSize: "13px" }}>
                                            Belum Terdaftar?
                                    <br />Register <a className='blue-text font-weight-bold' onClick={() => { this.props.Open_Register(true) }}>Disini Sekarang!</a>{" "}
                                        </div>
                                    </form>
                                </Card>
                                {/* ----end form login----- */}

                            </div>
                        </div>
                    </div>
                    {/* </MDBCard> */}

                </div>

                {/* --------------- start footer -------------------- */}
                <div className="footer pt-4">
                    <div className="visi-side d-flex" style={{ padding: '10% 2% 3% 2%' }}>
                        <div className="visi col-6 text-center" style={{ paddingTop: '7%' }}>
                            <h3 style={{ fontWeight: 'bold', fontSize: '45px' }}>V I S I</h3>

                        </div>
                        <div className="isi-visi col-6 text-center px-4 py-5">
                            <h5 style={{ fontWeight: 'bolder', fontSize: '25px' }}>“Menjadi Universitas Unggul dan Terkemuka di Indonesia untuk Menghasilkan Tenaga Profesional yang Memenuhi Kebutuhan Industri dan Masyarakat dalam Persaingan Global Pada tahun 2024”.</h5>
                        </div>
                    </div>


                    <div className="text-center">
                        <img alt='img' src={require('../image/logo_mercubuana.png')} width="400px"
                            style={{ opacity: 0.2 }} />
                    </div>

                    <div className="misi-side d-flex" style={{ padding: '7% 2% 10% 2%' }}>
                        <div className="isi-misi col-6 text-center">
                            <h6>
                                Menyelenggarakan pendidikan, penelitian dan pengabdian kepada masyarakat, dan mencapai keunggulan akademik untuk menghasilkan tenaga profesional dan lulusan yang memenuhi standar kualitas kerja yang disyaratkan.
                            </h6>
                            <h6>Menerapkan manajemen pendidikan tinggi yang efektif dan efisien, serta mengembangkan jaringan kerjasama dengan industri dan kemitraan yang berkelanjutan sebagai respon atas perubahan arus dan daya saing global.</h6>
                            <h6>Mengembangkan kompetensi dan menumbuh kembangkan jiwa kewirausahaan dan etika profesional kepada para mahasiswa dan staf yang memberikan kontribusi positif terhadap peningkatan kualitas hidup.</h6>
                        </div>
                        <div className="misi col-6 text-center " style={{ paddingTop: '11%' }}>
                            <h3 style={{ fontWeight: 'bold', fontSize: '45px' }}>M I S I</h3>
                        </div>
                    </div>

                    <div className="quotes text-center" style={{ padding: '5% 8% 3% 8%' }}>

                        <h5 style={{ fontFamily: 'Josefin Sans' }}>" ... perguruan tinggi memiliki tanggung jawab pada pundaknya, sesuai amanah dalam Undang-Undang No.12 Tahun 2012 tentang Pendidikan Tinggi yaitu perguruan tinggi memiliki kewajiban untuk turut serta dalam kemajuan peradaban bangsa Indonesia. Amanah tersebut memberi arti bahwa Universitas Mercu Buana harus terus mendorong kualitas dirinya, mengembangkan kemampuan ilmu pengetahuannya, sekaligus meningkatkan produk riset dan inovasi yang semua itu menjadi ukuran kinerja perguruan tinggi."</h5>
                    </div>
                    <div className="prof text-center" style={{ paddingBottom: '2%' }}>
                        <p><span style={{ fontWeight: 'bold' }}>Prof. Dr Ngadino Surip, MS</span> <br />
                        Rektor Universitas Mercu Buana 2018 - 2022</p>
                        <button className="btn btn-outline-dark-blue" style={{ borderRadius: "25px" }}><a className="regist" target='_blank' href='https://www.mercubuana.ac.id' style={{ color: 'black' }}>Selengkapnya</a></button>
                        <div className="mt-5 my-0">
                            <p className="mb-1" style={{ fontWeight: 'bolder' }}>Find us on:</p>
                            <a href="https://twitter.com/univmercubuana" target="_blank" >
                                <img className="mr-3" src={require('../image/twitter.svg')} alt="t" width="20px" />
                            </a>
                            <a href="https://www.facebook.com/univmercubuana" target="_blank" >
                                <img className="mr-3" src={require('../image/fb.svg')} alt="t" width="20px" />
                            </a>
                            <a href="https://www.instagram.com/univmercubuana/" target="_blank" >
                                <img className="mr-3" src={require('../image/ig.svg')} alt="t" width="20px" />
                            </a>
                            <a href="https://www.youtube.com/channel/UCwVzX-FQiOlt45Y2cHcnVyQ" target="_blank" >
                                <img className="mr-3" src={require('../image/yt.svg')} alt="t" width="20px" />
                            </a>
                        </div>
                        <div className="copy-right mt-5">
                            <p className="footer-company-name" style={{ color: 'black', fontSize: '13px' }}>Let's Build Our Own Project ©{this.copyright()}<br />
                                <a href="mailto:buildwithmeh@gmail.com">buildwithmeh@gmail.com</a></p>
                        </div>
                    </div>
                    <div>
                    </div>
                </div>
                {/* --------------- end footer -------------------- */}
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