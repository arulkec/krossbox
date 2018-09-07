import React from 'react';
import {
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand
} from 'reactstrap';
import { Menu, Button } from 'antd';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import Logo from '../../images/kross-x.png';
import SearchSection from '../shared/SearchSection';

const mapStateToProps = state => ({
    ...state.common,
    ...state.search,
    ...state.auth
});

class Header extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            isOpen: false
        };
        this.toggle = this.toggle.bind(this);
    }

    toggle() {
        this.setState({
            isOpen: !this.state.isOpen
        });
    }
   
    render() {
        return (
            <div className="header-page">
                <div className="header-section">
                    <Navbar className="col-12 d-none d-sm-none d-md-none d-lg-flex">
                        <div className="col-4">
                            <NavbarBrand className="pl15" href="/">
                                <img src={Logo} alt="krossx" className="logo-image" />
                                KROSSBOX
                                </NavbarBrand>
                        </div>
                        {!this.props.isHomePage ?
                            <div className="col-4 pt20">
                                <div>
                                  <SearchSection
                                    isHomePage = {false}
                                  />
                                </div>
                            </div>
                            : null}
                        <div className="col-4">
                            <Menu className="row" mode="horizontal" >
                                <Menu.Item key="1" className="col f20">
                                    <Link to="/register" >
                                        <div className="text-center float-right">
                                            <Button type="default" htmlType="submit" disabled={false}>login/Signup</Button>
                                        </div>
                                    </Link>
                                </Menu.Item>
                            </Menu>
                        </div>
                    </Navbar>
                    <Navbar color="faded" className="d-flex d-sm-flex d-md-flex d-lg-none" light>
                        <NavbarBrand href="/">   
                            <img src={Logo} alt="krossx" className="logo-image" />
                            KROSSBOX
                        </NavbarBrand>
                        {!this.props.isHomePage ?
                            <div className="col-4 pt20">
                                <div>
                                  <SearchSection
                                    isHomePage = {false}
                                  />
                                </div>
                            </div>
                            : null}
                        <NavbarToggler onClick={this.toggle} />
                        <Collapse isOpen={this.state.isOpen} navbar>
                            <Menu mode="vertical" >
                                <Menu.Item key="1" className="f20">
                                    <Link to="/register" onClick={this.toggle}>
                                        <div className="text-center">
                                            <Button type="default" htmlType="submit" disabled={false}>login/Signup</Button>
                                        </div>
                                    </Link>
                                </Menu.Item>
                            </Menu>
                        </Collapse>
                    </Navbar>
                </div>
            </div >
        );
    }
}
export default connect(mapStateToProps, () => ({}))(Header);