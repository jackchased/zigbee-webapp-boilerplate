import React, { PropTypes } from 'react';
import TemperatureIcon from '../Icons/TemperatureIcon';

var bgColor = "#F5D76E",
    bgColorDisabled = "#BDBDBD";

const Temperature = React.createClass({
    propTypes: {
        enable: PropTypes.bool.isRequired,
        value: PropTypes.number.isRequired,
        ieeeAddr: PropTypes.string.isRequired,
        epId: PropTypes.number.isRequired,
        cid: PropTypes.string.isRequired
    },

    render: function() {
        let enable = this.props.enable;
        let cardBgColor = enable ? "#F5D76E" : "#BDBDBD";
        let cardValue = enable ? Math.round(this.props.value) : undefined;

        return (
            <div style={{width: "100%", height: "100%", backgroundColor: cardBgColor}}>
                <div style={{float: "left", width: "50%", height: "100%"}}>
                    <TemperatureIcon />
                </div>

                <div style={{float: "left", width: "50%", height: "100%"}}>
                    <div style={{position: "absolute", top: "30%", bottom: "0", 
                                 left: "50%", right: "0", margin: "0", textAlign: "center", 
                                 fontSize: "2.2em", color: "white"}}>
                        {cardValue} °C
                    </div>
                </div>
            </div>
        );
    }
});

export default Temperature
