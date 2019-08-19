var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
const mqtt = require('mqtt');
const fs = require('fs');
var elasticsearch = require('elasticsearch');
const io = require('socket.io')();
const moment = require('moment');
const ioPort = 8000;

const app = express();
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
const port = process.env.PORT || 4001;

app.use('/api', indexRouter);
app.use('/users', usersRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.send('error');
    res.end()
});

app.listen(port, () => console.log(`Listening on port ${port}`));

var client = new elasticsearch.Client({
    hosts: ["http://elastic:changename@localhost:9200"]
});


client.ping({
    requestTimeout: 30000,
}, function (error) {
    if (error) {
        console.error('elasticsearch cluster is down!');
    } else {
        console.log('Everything is ok');
    }
});

client.indices.create({
    index: 'vpp-demo-app2'
}, function (err, resp, status) {
    if (err) {
        console.log(err);
    } else {
        console.log("create", resp);
    }
});

const mqttConfigFile = 'config/mqtt-config.json';
const assetConfigFile = 'config/asset-config.json';
var mqttClient;
var subscribeTopic;
var publishTopic;
var assetGuids;

try {
    fs.readFile(mqttConfigFile, function (err, data) {
        if (err != null) {
            console.error('Failed to read config file ' + mqttConfigFile);
            throw err
        }
        var result = JSON.parse(data);
        client.index({
            index: 'vpp-demo-app2',
            type: 'info',
            body: {
                "Name": "VPP Demo Application",
                "Type": "MQTT Configuration File Contents",
                "Body": JSON.stringify(result),
                "Value": 0.0,
                "timestamp": new Date(),
            }
        }, function (err, resp, status) {
            console.log(resp);
        });

        var brokerUrl = result.mqtt.BrokerUrl;
        var clientId = result.mqtt.ClientID;
        subscribeTopic = result.mqtt.SubscribeTopic;
        publishTopic = result.mqtt.PublishTopic;

        fs.readFile(assetConfigFile, function (err, data) {
            if (err != null) {
                console.error('Failed to read config file ' + assetConfigFile);
                throw err
            }
            var assetResult = JSON.parse(data);
            assetGuids = assetResult.assets.AssetGuids;
            var vppRegistrationMessage = {
                "command": "VPP_REGISTER",
                "device_ids": assetGuids, "timestamp": new Date()
            };

            client.index({
                index: 'vpp-demo-app2',
                type: 'info',
                body: {
                    "Name": "VPP Demo Application",
                    "Type": "Asset Configuration File Contents",
                    "Body": JSON.stringify(assetResult),
                    "Value": 0.0,
                    "timestamp": new Date(),
                }
            }, function (err, resp, status) {
                console.log(resp);
            });

            mqttClient = mqtt.connect(brokerUrl, {
                clientId: clientId,
                username: result.mqtt.Username,
                password: result.mqtt.Password,
                keepalive: 60,
                clean: true
            });

            mqttClient.on('error', function (err) {
                console.error('Error on mqtt connection ' + err);
                throw err
            });

            function vppConnectAction() {
                mqttClient.subscribe(subscribeTopic, { qos: 1 }, function (err, granted) {
                    if (err != null) {
                        console.error('Subscription error ' + err);
                        throw err
                    }
                    client.index({
                        index: 'vpp-demo-app2',
                        type: 'info',
                        body: {
                            "Name": "VPP Demo Application",
                            "Type": "Broker Subscription",
                            "Body": "subscribed to topic" + subscribeTopic,
                            "Value": 0.0,
                            "timestamp": new Date(),
                        }
                    }, function (err, resp, status) {
                        console.log(resp);
                    });
                });

                // For now, the demo works with only 1 asset
                // Publish one time registration message to HAAL
                payload = JSON.stringify(vppRegistrationMessage)
                mqttClient.publish(publishTopic, payload, { qos: 1, retain: true });
                client.index({
                    index: 'vpp-demo-app2',
                    type: 'info',
                    body: {
                        "Name": "VPP Demo Application",
                        "Type": "VPP Registration Messge Sent",
                        "Body": payload + " on topic " + publishTopic,
                        "timestamp": new Date(),
                    }
                }, function (err, resp, status) {
                    console.log(resp);
                });
            }

            mqttClient.on('reconnect', function () {
                client.index({
                    index: 'vpp-demo-app2',
                    type: 'info',
                    body: {
                        "Name": "VPP Demo Application",
                        "Type": "Broker Connection",
                        "Body": "Success",
                        "Value": 0.0,
                        "timestamp": new Date(),
                    }
                }, function (err, resp, status) {
                    console.log(resp);
                });
                vppConnectAction();
            });

            mqttClient.on('connect', function () {
                client.index({
                    index: 'vpp-demo-app2',
                    type: 'info',
                    body: {
                        "Name": "VPP Demo Application",
                        "Type": "Broker Connection",
                        "Body": clientId + " connected to broker",
                        "Value": 0.0,
                        "timestamp": new Date(),
                    }
                }, function (err, resp, status) {
                    console.log(resp);
                });
                vppConnectAction();
            });

            mqttClient.on('message', function (topic, payload, packet) {
                var jsonPayload = JSON.parse(payload);
                console.log('Received message: ' + payload);
                var value, command, status;
                var device_status = jsonPayload.device_status[0];
                if (device_status.status_type == 'SOC_STATUS') {
                    value = parseFloat(device_status.value);
                } else {
                    status = device_status.value;
                    command = device_status.command;
                    io.emit('done');
                }
                client.index({
                    index: 'vpp-demo-app2',
                    type: 'info',
                    body: {
                        "Name": "VPP Demo Application",
                        "Solajit-Home-ID": device_status.device_id,
                        "Type": device_status.status_type,
                        "Command": command,
                        "Value": value,
                        "Status": status,
                        "timestamp": new Date(),
                    }
                }, function (err, resp, status) {
                    console.log(resp);
                });
            });
        });
    });
} finally {
}

const processFormData = function (data) {
    try {
        function sendDrControl() {
            var cmd = { 'charge': 'VPP_DR_CHARGE', 'discharge': 'VPP_DR_DISCHARGE' }[data.vpp_operation_type];
            var time = data.time, now = moment(),
                end = now.clone().add(time, 's'),
                power = data.power * 1000, // Convert kW to W
                energy = time * power / 3600

            var drCommand = {
                "command": cmd, "device_ids": [data.solajitGuid],
                "power": power, "max_energy": energy,
                "start_time": now.format(),
                "end_time": end.format(),
                "timestamp": now
            };

            payload = JSON.stringify(drCommand)
            mqttClient.publish(publishTopic, payload, { qos: 1 });

            client.index({
                index: 'vpp-demo-app2',
                type: 'info',
                body: {
                    "Name": "VPP Demo Application",
                    "Type": data.vpp_operation_type,
                    "Body": payload + " on topic " + publishTopic,
                    "timestamp": now,
                }
            }, function (err, resp, status) {
                console.log(resp);
            });
        }

        sendDrControl();
    } finally {
    }
};

io.on('connection', (client) => {
    client.on('submitForm', (data) => {
        console.log(data);
        processFormData(data);
        //setTimeout(function(){ io.emit('done'); }, 6000);
    });
});


io.listen(ioPort);
console.log('listening on port ', ioPort);
