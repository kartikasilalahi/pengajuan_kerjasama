import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Tabs, Tab, TabPanel, TabList } from "react-web-tabs";
import { MDBBtn } from 'mdbreact'
import Swal from "sweetalert2";
import { Logout } from '../redux/action'
import { Redirect } from 'react-router-dom';
import Profil from './Component_mitra/Profil'
import Pengajuan from './Component_mitra/Pengajuan'
import History from './Component_mitra/History'

class Dashboard_mitra extends Component {

    state = {
        tabActive: 'vertical-tab-one'
    }


    btnlogout = () => {
        Swal.fire({
            title: 'Anda Yakin?',
            icon: 'warning',
            showCancelButton: 'true',
            confirmButtonText: "Ya",
            cancelButtonText: 'Batal'
        }).then(result => {
            if (result.value) {
                Swal.fire({
                    title: 'Memproses',
                    text: 'Tunggu Sebentar',
                    timer: 1800,
                    allowOutsideClick: false,
                    timerProgressBar: true,
                    onBeforeOpen: () => {
                        Swal.showLoading()
                    }
                })
                    .then(() => {
                        Swal.fire({
                            title: 'Berhasil Keluar',
                            icon: 'success',
                            showConfirmButton: false,
                            timer: 1000
                        }).then(() => {
                            localStorage.removeItem("id");
                            this.props.Logout()
                        })
                    })
            }
        })
    }

    render() {
        let id = localStorage.getItem('id')
        console.log('aktif di', this.state.tabActive)
        if (id === null || id === undefined) {
            return <Redirect to={'/'} />
        }
        return (
            <div className="dashboard_mitra m-4">
                <div className="top d-flex mb-4">
                    <div className="logo_dashboard" style={{ width: '20%' }}>
                        <img alt='img' src={require('../image/logo_mercubuana.png')} />
                    </div>
                    <div className="judul_dashboard text-left" style={{ width: '82%', }}>
                        <h4>Sistem Pengajuan Kerjasama</h4>
                        <h5>Universitas Mercubuana</h5>
                    </div>
                </div>


                {/* ----------------- TAB START HERE --------------------- */}
                <Tabs defaultTab={this.state.tabActive} vertical>
                    <TabList className="mr-3">
                        <Tab tabFor="vertical-tab-one">
                            <i className="fa fa-user-circle-o"></i>
                            <p>Profil </p>
                        </Tab>
                        <Tab tabFor="vertical-tab-two" onClick={() => this.setState({ tabActive: 'vertical-tab-two' })}>
                            <i className="fa fa-tasks" ></i>
                            <p>Pengajuan Kerjasama</p>
                        </Tab>
                        <Tab tabFor="vertical-tab-three">
                            <i className="fa fa-history" ></i>
                            <p>History</p>
                        </Tab>
                        <Tab>
                            <div className="button_logout text-center" >
                                <MDBBtn onClick={this.btnlogout} >Keluar </MDBBtn>
                            </div>
                        </Tab>

                    </TabList>
                    <TabPanel style={{ width: "100%" }} tabId="vertical-tab-one">
                        <Profil />
                    </TabPanel>
                    <TabPanel style={{ width: "100%" }} tabId="vertical-tab-two">
                        <Pengajuan tabId={() => this.setState({ tabActive: "vertical-tab-three" })} />
                    </TabPanel>
                    <TabPanel style={{ width: "100%" }} tabId="vertical-tab-three">
                        <History />
                    </TabPanel>
                </Tabs>
                {/* ----------------- TAB END HERE --------------------- */}

            </div>
        )
    }
}

const MapStateToProps = (state) => {
    return {
        logout: state.authReducer.logout,
        id: state.authReducer.id
    }
}

export default connect(MapStateToProps, { Logout })(Dashboard_mitra)