import React from 'react';
import { Icon } from 'antd';

class Footer extends React.Component {

    render() {
        return (
            <div className="bottom-section">
                <div className="footer-top">
                    <div className="row footer-style">
                        <div className="col">
                            <div className="widget-categories items">
                                <ul>
                                    <li className="white-color f20 logo">KROSSARK </li>
                                </ul>
                            </div>
                        </div>
                        <div className="col">
                            <div className="widget-categories items">
                                <ul>
                                    <li className="mb10"><h3 className="widget-title">RECENT POSTS</h3></li>
                                    <li>Shipping & returns</li>
                                    <li>Secure</li>
                                    <li>Free shipping program</li>
                                    <li>Group sales</li>
                                    <li>Affiliates</li>
                                </ul>
                            </div>
                        </div>
                        <div className="col">
                            <div className="widget-categories items">
                                <ul>
                                    <li className="mb10"><h3 className="widget-title">ASSISTANCE</h3></li>
                                    <li>FAQs</li>
                                    <li>Shipping Information</li>
                                    <li>Need Help? Just Ask Us</li>
                                    <li>Customer Support</li>
                                    <li>Terms & Conditions</li>
                                    <li>Legal Notice & Imprint</li>
                                </ul>
                            </div>
                        </div>
                        <div className="col">
                            <div className="widget-categories items">
                                <ul>
                                    <li className="mb10"><h3 className="widget-title">LOCATIONS</h3></li>
                                    <li className="mr20">Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div className="footer-bottom">
                        <div className="footer-bottom-container">
                            <div className="copyright-wrapper">
                                <div className="copyright">
                                    <span className="mr5">{<Icon type="copyright" />}</span>2018 Kross Block.All Rights Reserved.Designed by Krossark Inc.
                                    </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Footer;