var chalk = require('chalk');

var zbEvtHdlrs = {
    error: errorEvtHdlr,
    permitJoining: permitJoiningEvtHdlr,
    ind: indEvtHdlr
};

/***********************************************/
/* Machine Server Event Handler                */
/***********************************************/
function errorEvtHdlr(rpcServer, err) {
    console.log(chalk.red('[         error ] ') + err.message);
    rpcServer.emit('error', { msg: err.message });
}

// 轉發 permitJoining 事件至 Web Client 端
function permitJoiningEvtHdlr(rpcServer, timeLeft) {
    console.log(chalk.green('[ permitJoining ] ') + timeLeft + ' sec');

    // [TODO]
}

// ind 事件為周邊裝置相關的所有事件，使用分派器處理
function indEvtHdlr(shepherd, rpcServer, msg) {
    var data = msg.data,
        eps = msg.endpoints;

    switch (msg.type) {
        // [TODO]
    }
}

/***********************************************/
/* Peripheral Event Handler                    */
/***********************************************/
function devIncomingHdlr(shepherd, rpcServer, ieeeAddr, eps) {
    console.log(chalk.yellow('[   devIncoming ] ') + '@' + ieeeAddr);

    // [TODO]
}

function devStatusHdlr(rpcServer, status, eps) {
    var chalkStatus = (status === 'online') ? chalk.green(status) : chalk.red(status);

    console.log(chalk.magenta('[     devStatus ] ') + '@' + ieeeAddr + ', ' + chalkStatus);

    // [TODO]
}

function devChangeHdlr(rpcServer, changeData, eps) {
    var ieeeAddr = eps[0].getIeeeAddr(),
        epInfo = eps[0].dump(),
        cid = changeData.cid,
        value;

    if (cid === 'msTemperatureMeasurement') value = changeData.data.measuredValue / 100;
    if (cid === 'genOnOff') value = changeData.data.onOff;
    if (value !== undefined)
        console.log(chalk.blue('[   attrsChange ] ') + '@' + ieeeAddr + ', type: ' + cid + ', value: ' + value);

    // [TODO]
}

module.exports = zbEvtHdlrs;
