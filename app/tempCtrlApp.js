var plug, temperature;

function tempCtrlApp(zserver) {
    zserver.on('ind', function (msg) {
        switch (msg.type) {
            case 'devIncoming':
                msg.endpoints.forEach(function (ep) {
                    if (ep.devId === 81 && ep.clusters.has('genOnOff')) {
                        plug = ep;
                        plug.report('genOnOff', function (err) {
                            if (err) console.log(err);
                        });
                    } else if (ep.devId === 770 && ep.clusters.has('msTemperatureMeasurement')) {
                        temperature = ep;
                        temperature.report('msTemperatureMeasurement', function (err) {
                            if (err) console.log(err);
                        });
                    }
                });
                break;

            case 'devChange':
                var ep = msg.endpoints[0],
                    data = msg.data;
                if (ep.devId === 770 && ep.clusters.has('msTemperatureMeasurement')) {
                    tempValue = data.data.measuredValue / 100;
                    tempChangedHdlr(tempValue);
                }
                break;
        }
    });
}

function tempChangedHdlr(tempValue) {
    // 若 plug 尚未入網，則不做任何事
    if (!plug)
        return;

    var plugValue = plug.clusters.get('genOnOff', 'attrs', 'onOff');

    if (tempValue > 28 && plugValue !== 1) {
        // 當溫度過高，則開啟 plug
        plug.functional('genOnOff', 'on', {} ,function (err) {
            if (err) console.log(err);
        });
    } else if (tempValue < 26 && plugValue !== 0) {
        // 當溫度過低，則關閉 plug
        plug.functional('genOnOff', 'off', {} ,function (err) {
            if (err) console.log(err);
        });
    }
}

module.exports = tempCtrlApp;
