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


    btnlogout = () => {
        Swal.fire({
            title: 'Anda yakin log out?',
            icon: 'warning',
            showCancelButton: 'true',
            confirmButtonText: "Logout!"
        }).then(result => {
            if (result.value) {
                Swal.fire({
                    title: 'Logging out',
                    text: 'tunggu beberapa detik',
                    timer: 1800,
                    allowOutsideClick: false,
                    timerProgressBar: true,
                    onBeforeOpen: () => {
                        Swal.showLoading()
                    }
                })
                    .then(() => {
                        Swal.fire({
                            title: 'Logout',
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
        console.log(id)
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
                {/* <div className="nama-mitra text-center my-3" style={{ width: '20%' }}>
                    <h6>HI, THERE</h6>
                </div> */}
                <Tabs defaultTab="vertical-tab-one" vertical>
                    <TabList className="mr-3">
                        <Tab tabFor="vertical-tab-one">
                            <i className="fa fa-tasks"></i>
                            <p>Profil </p>
                        </Tab>
                        <Tab tabFor="vertical-tab-two">
                            <i className="fa fa-money" ></i>
                            <p>Pengajuan Kerjasama</p>
                        </Tab>
                        <Tab tabFor="vertical-tab-three">
                            <i className="fa fa-money" ></i>
                            <p>History</p>
                        </Tab>

                    </TabList>
                    <TabPanel style={{ width: "100%" }} tabId="vertical-tab-one">
                        <Profil />
                    </TabPanel>
                    <TabPanel style={{ width: "100%" }} tabId="vertical-tab-two">
                        <Pengajuan />
                    </TabPanel>
                    <TabPanel style={{ width: "100%" }} tabId="vertical-tab-three">
                        <History />
                    </TabPanel>
                </Tabs>
                <div className="button_logout text-center" style={{ width: '20%' }} >
                    <MDBBtn onClick={this.btnlogout} >Logout</MDBBtn>
                </div>
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