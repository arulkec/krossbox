import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import SearchSection from '../shared/SearchSection';
import KrossX from '../../images/krossx-bg-img.jpg';

class Home extends React.Component {
    constructor(props) {
        super(props)
        this.next = this.next.bind(this);
        this.previous = this.previous.bind(this);
    }
    next() {
        this.slider.slickNext()
    }
    previous() {
        this.slider.slickPrev()
    }

    render() {
        var settings = {
            dots: true,
            infinite: true,
            slidesToShow: 1,
            arrows: false,
            autoplay: true,
            autoplaySpeed: 10000
        };

        return (
            <div className="home-page">
                <div className="container-fluid">
                    <div className="page-title slider-section parallax parallax1">
                        <Slider dotsClass="home-banner-slide" ref={c => this.slider = c} {...settings}>
                            <div key={1} className="slide">
                                <img className="slider-images" alt="home banner" src={KrossX} />
                            </div>
                        </Slider>
                        <div className="container">
                            <div className="row">
                                <div className="col-md-12">
                                    <div className="page-title-heading">
                                        Search for KrossBox Location
                                        </div>
                                    <div className="text-heading">
                                        Enter Your Location
						                </div>
                                    <div className="p20">
                                        <div className="col-12 col-sm-8 col-md-8 offset-sm-2 offset-md-2">
                                            <SearchSection 
                                            isHomePage = {true}
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Home; 