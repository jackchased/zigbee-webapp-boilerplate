import React, { PropTypes } from 'react';
import PlugOnIcon from '../Icons/PlugOnIcon';
import PlugOffIcon from '../Icons/PlugOffIcon';

const Plug = React.createClass({
    propTypes: {
        enable: PropTypes.bool.isRequired,
        onOff: PropTypes.bool.isRequired,
        onClick: PropTypes.func.isRequired,
        permAddr: PropTypes.string.isRequired,
        auxId: PropTypes.string.isRequired,
    },
    render: function () {
        let enable = !!this.props.enable;
        let onOff = !!this.props.onOff;
        let onClick = enable ? this.props.onClick : function () {
            console.log('Plug clicked');
        };

        // background color 與 fg color 會根據裝置的網路連線狀態有所不同
        // [TODO]
        let cardBgColor = enable ? '#72E599' : "#BDBDBD";
        let cardFgColor = enable ? "#FFFFFF" : "#EEEEEE";

        // icon 會根據裝置的開關狀態有所不同
        // [TODO]
        let icon = onOff ? <PlugOnIcon fill={cardFgColor} /> : <PlugOffIcon fill={cardFgColor} />;

        // return (
        //     // [TODO]
        // );
        return (
            <div style={{width: '100%', height: '100%', backgroundColor: cardBgColor }} 
                onClick={onClick(this.props.permAddr, this.props.auxId, !onOff)}>
                {icon}
            </div>
        );
    }
});

export default Plug;
