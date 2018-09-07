import React from 'react';
import { connect } from 'react-redux';
import {
    SEARCH_PAGE_LOADED,
    UPDATE_FIELD,
    KROSSBOX_LOCATIONS
} from '../../constants/actionTypes';
import { Card, Button, Divider, Icon } from 'antd';
import MapComponnet from '../shared/MapComponent';

const mapStateToProps = state =>  ({
    ...state.search,
    ...state.auth
});

const mapDispatchToProps = dispatch => ({
    onLoad: () =>
        dispatch({ type: SEARCH_PAGE_LOADED }),
    onSelectField: (value) =>
        dispatch({ type: UPDATE_FIELD, value }),
    onselectedDetail: (value) =>
        dispatch({ type: KROSSBOX_LOCATIONS, value })
});

class Search extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            data: []
        }
    }

    componentWillMount() {

        this.props.onLoad();
    }

    componentDidUpdate() {
        if (this.props.locationDetail !== false) {
            const krossboxLocation = this.props.krossboxLocation;
            this.MapComponent.handleToggle(krossboxLocation);
        }
    }

    backToResult = () => {
        var locationDetail = false;
        this.props.onSelectField(locationDetail);
        this.MapComponent.handleToggleClose();
    }

    viewLocationDetails = (event) => {
        event.preventDefault();
        var selectedDataId = parseInt(event.target.id);
        this.setState({ selectedDataId: 0 });
        var selectedRecord = this.props.availableKrossBoxLocation[selectedDataId];
        var krossboxLocation = [];
        krossboxLocation.push(selectedRecord);
        this.props.onselectedDetail(krossboxLocation);
        var locationDetail = true;
        this.props.onSelectField(locationDetail);
    }

    render() {
        var availableKrossBoxLocation = this.props.availableKrossBoxLocation ? this.props.availableKrossBoxLocation : [];

        const KrossBoxLocationList = availableKrossBoxLocation.length !== 0 ? availableKrossBoxLocation.map((listData, index) => {
            return (
                <div className="row col-12 col-md-12" >
                    <div className="col-2 col-sm-2 col-md-2 col-lg-2 search-index-list">
                        <img src="https://maps.gstatic.com/mapfiles/api-3/images/spotlight-poi-dotless2.png" alt="google_dot_img" />
                        <span className="marker-index" > {index + 1} </span>
                    </div>
                    <div className="col-6 col-sm-6 col-md-6">
                        <div>  <li><Icon type="environment" theme="twoTone" style={{ fontSize: '20px', color: '#ECAD75' }} /> {listData.address1}</li></div>
                        <div>  <li>{listData.address2}</li></div>
                        <div>  <li>{listData.address3}</li></div>
                        <div>  <li>{listData.address4}</li></div>
                    </div>
                    <div className="col-3 col-sm-3 col-md-3">
                        <div className="float-right">
                            <li><Icon type="clock-circle" theme="twoTone" style={{ fontSize: '16px', color: '#ECAD75' }} /><span> Open 24 hours</span> </li>
                            <Button id={index} className="mt10" style={{ color: '#ECAD75' }} type="dashed" onClick={this.viewLocationDetails}>View Details</Button>
                        </div>
                    </div>
                    <Divider />
                </div>
            );
        }) : <div className="text-center f20"><Icon type="frown" theme="twoTone" /> There is no KrossBox in this Location</div>;

        var krossboxDetails = this.props.krossboxLocation ? this.props.krossboxLocation : [];
        const KrossBoxLocationDetail = krossboxDetails.length !== 0 ? krossboxDetails.map((listData, index) => {
            return (
                <div className="row col-12 col-md-12" >
                    <img src="https://www.habitatmag.com/var/ezwebin_site/storage/images/publication-content/2017/2017-january/featured-articles/package-lockers/705379-1-eng-US/xPackage-Lockers_responsive_reference.png.pagespeed.ic.GCc-ZcYzCI.jpg" style={{ width: '672px', height: '464px' }} alt="locker"/>
                    <div className="col-10 col-sm-10 col-md-10 location-detail">
                        <div className="p10">
                            <li><Icon type="environment" theme="twoTone" style={{ fontSize: '20px', color: '#ECAD75', padding: '5px' }} /> {listData.address1} {listData.address4}</li>
                        </div>
                        <div className="p10">
                            <li><Icon type="clock-circle" theme="twoTone" style={{ fontSize: '16px', color: '#ECAD75', padding: '5px' }} /><span> Open 24 hours</span> </li>
                        </div>
                    </div>
                </div>
            );
        }) : <div className="text-center f20"><Icon type="frown" theme="twoTone" /> There is no KrossBox in this Location</div>;

        return (
            <div>
                <div className="row">
                    <div className="col-12 col-sm-6 col-md-6 p0">
                        <div className="over-flow">
                            <Card>
                                {this.props.locationDetail === false ?
                                    <div> {KrossBoxLocationList} </div>
                                    :
                                    <div>
                                        <a><div className="location-detail" onClick={this.backToResult}>
                                            <Icon type="left-circle" theme="filled" style={{ color: "#ecad75" }} /> Back to Results
                                        </div></a>
                                        {KrossBoxLocationDetail}
                                    </div>
                                }
                            </Card>
                        </div>
                    </div>
                    <div className="col-12 col-sm-6 col-md-6 p0">
                        <MapComponnet onRef={ref => (this.MapComponent = ref)} />
                    </div>
                </div>
            </div>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Search);