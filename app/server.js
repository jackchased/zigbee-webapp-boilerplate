var fs = require('fs'),
    _ = require('busyman'),
    http = require('http'),
    path = require('path'),
    chalk = require('chalk');

var ZShepherd = require('zigbee-shepherd');

// 使用 ioServer 作為與 Web Client 溝通的介面
// [TODO]

// 溫控系統的應用程式
// [TODO]

// 建立 zserver
// [TODO]

// 建立 HTTP Server
// [TODO]

server.listen(3030);

// 啟動 ioServer
// [TODO]

function serverApp () {
    showWelcomeMsg();  // show Welcome Msg
    setLeaveMsg();     // set Leave Msg

    // register Request handler
    // 註冊 permitJoin 處理函式
    ioServer.regReqHdlr('permitJoin', function (args, cb) { 
        // [TODO]
    });

    // 註冊 getDevs 處理函式
    ioServer.regReqHdlr('getDevs', function (args, cb) { 
        // [TODO]
    });

    ioServer.regReqHdlr('write', function (args, cb) { 
        // [TODO]
    });

    // event listeners
    zserver.on('ready', function () {
        console.log(chalk.green('[         ready ] '));

        // 當 zigbee-shepherd 啟動完畢，執行溫控應用
        // [TODO]
    });

    // 監聽 permitJoining 事件，並轉發至 Client端
    zserver.on('permitJoining', function (timeLeft) {
        console.log(chalk.green('[ permitJoining ] ') + timeLeft + ' sec');

        // [TODO]
    });

    zserver.on('error', function (err) {
        console.log(chalk.red('[         error ] ') + err);
    });

    zserver.on('ind', function (msg) {
        var periph = msg.periph;
        
        switch (msg.type) {
            /*** devIncoming   ***/
            // 監聽 devIncoming 事件，並轉發至 Client端
            case 'devIncoming':
                console.log(chalk.yellow('[   devIncoming ] ') + '@' + msg.data);
                // [TODO]
                break;

            /*** devLeaving    ***/
            case 'devLeaving':
                // [TODO]
                break;

            /*** devStatus     ***/
            // 監聽 devStatus 事件，並轉發至 Client端
            case 'devStatus':
                // [TODO]
                break;

            /*** attrChange    ***/
            case 'devChange':
                // [TODO]
                break;
        }
    });

    // 清除 zigbee-shepherd 資料庫中的檔案
    var dbPath = '../node_modules/zigbee-shepherd/lib/database/dev.db';

    dbPath = path.resolve(__dirname, dbPath);
    fs.exists(dbPath, function (isThere) {
        if (isThere) { fs.unlink(dbPath); }
    });

    // 啟動 zigbee-shepherd
    // [TODO]
}

/***********************************************/
/* Cook funciton                               */
/***********************************************/
function getDevInfo (ieeeAddr, eps) {
    var dev = {
            permAddr: ieeeAddr,
            status: zserver.list(ieeeAddr)[0].status,
            gads: {}
        };

    eps.forEach(function (ep) {
        var gadInfo = getGadInfo(ep);

        if (gadInfo) {
            _.forEach(gadInfo, function (info) {
                dev.gads[info.auxId] = info;
            });
        }
    });

    return dev;
}

function getGadInfo (ep) {
    var epInfo = ep.dump(),
        gadType = getGadType(epInfo),
        gads = [];

    if (!gadType) return;

    _.forEach(gadType, function (gad) {
        var val = ep.clusters.get(gad.cid, 'attrs', gad.rid);

        if (gad.rid === 'measuredValue')
            val = val / 100;

        gads.push({
            type: gad.type,
            auxId: epInfo.epId + '/' + gad.type + '/' + gad.cid + '/' + gad.rid,
            value: val
        });
    });

    return gads;
}

function getGadType (epInfo) {
    var props = [];

    switch (epInfo.devId) {
        case 81:    // smartPlug
            if (epInfo.clusters.genOnOff) {
                props.push({
                    type: 'Plug',
                    cid: 'genOnOff',
                    rid: 'onOff',
                });
            }
            break;

        case 770:   // temperatureSensor
            if (epInfo.clusters.msTemperatureMeasurement) {
                props.push({
                    type: 'Temperature',
                    cid: 'msTemperatureMeasurement',
                    rid: 'measuredValue'
                });
            }

            if (epInfo.clusters.msRelativeHumidity) {
                props.push({
                    type: 'Humidity',
                    cid: 'msRelativeHumidity',
                    rid: 'measuredValue'
                });
            }
            break;

        default:
            return;
    }

    return props;
}

/***********************************************/
/* welcome function                            */
/***********************************************/
function showWelcomeMsg() {
var zbPart1 = chalk.blue('      ____   ____ _____ ___   ____ ____        ____ __ __ ____ ___   __ __ ____ ___   ___     '),
    zbPart2 = chalk.blue('     /_  /  /  _// ___// _ ) / __// __/ ____  / __// // // __// _ \\ / // // __// _ \\ / _ \\ '),
    zbPart3 = chalk.blue('      / /_ _/ / / (_ // _  |/ _/ / _/  /___/ _\\ \\ / _  // _/ / ___// _  // _/ / , _// // /  '),
    zbPart4 = chalk.blue('     /___//___/ \\___//____//___//___/       /___//_//_//___//_/   /_//_//___//_/|_|/____/    ');

    console.log('');
    console.log('');
    console.log('Welcome to zigbee-shepherd webapp... ');
    console.log('');
    console.log(zbPart1);
    console.log(zbPart2);
    console.log(zbPart3);
    console.log(zbPart4);
    console.log(chalk.gray('         A network server and manager for the ZigBee machine network'));
    console.log('');
    console.log('   >>> Author:     Jack Wu (jackchased@gmail.com)              ');
    console.log('   >>> Version:    zigbee-shepherd v0.2.0                      ');
    console.log('   >>> Document:   https://github.com/zigbeer/zigbee-shepherd  ');
    console.log('   >>> Copyright (c) 2016 Jack Wu, The MIT License (MIT)       ');
    console.log('');
    console.log('The server is up and running, press Ctrl+C to stop server.     ');
    console.log('---------------------------------------------------------------');
}

/***********************************************/
/* goodbye function                            */
/***********************************************/
function setLeaveMsg() {
    process.stdin.resume();

    function showLeaveMessage() {
        console.log(' ');
        console.log(chalk.blue('      _____              __      __                  '));
        console.log(chalk.blue('     / ___/ __  ___  ___/ /____ / /  __ __ ___       '));
        console.log(chalk.blue('    / (_ // _ \\/ _ \\/ _  //___// _ \\/ // // -_)   '));
        console.log(chalk.blue('    \\___/ \\___/\\___/\\_,_/     /_.__/\\_, / \\__/ '));
        console.log(chalk.blue('                                   /___/             '));
        console.log(' ');
        console.log('    >>> This is a simple demonstration of how the shepherd works.');
        console.log('    >>> Please visit the link to know more about this project:   ');
        console.log('    >>>   ' + chalk.yellow('https://github.com/zigbeer/zigbee-shepherd'));
        console.log(' ');
        process.exit();
    }

    process.on('SIGINT', showLeaveMessage);
}

module.exports = serverApp;
