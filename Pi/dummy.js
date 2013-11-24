var devices = require('./devices')
    request = require('request')
    phpdate = require('./date').date,
    config = require('./config');

function send(data, callback){

    var json = JSON.stringify(data);
    console.log("Sending: " + json);

    request.post({
        url: config.DOMUS_API_URI + '/submitConsumer',
        body: json
    }, function(error, response){

      if (!error && response.statusCode == 200) {
        // slow down the process
        // otherwise we get BusyException from SQLite
        setTimeout(callback, 50);
        return;
      }

      console.log('Error :(');

    });
}

function send_all(){

    var data = JSON.stringify(toSend);
    console.log("Trying to send " + data.length + " bytes");

    request.post({
        url: config.DOMUS_API_URI + '/submitBulkConsumers',
        body: data
    }, function(error, response){

      if (!error && response.statusCode == 200) {
        // slow down the process
        // otherwise we get BusyException from SQLite
        return;
      }

      console.log('Error :(');
      console.log(error);
    });

    return;

    console.log('Items left: ' + toSend.length);

    if(toSend.length == 0) {
        console.log("Finished!");
        return;
    }

    send(toSend.pop(), send_all);
}

var toSend = [];

for (var s = 0; s <= 172800; s += 600) {
// for (var s = 0; s <= 1800; s += 600) {

    var unix = (1385010600 + s);
    var date = new Date( unix * 1000 );
    devices.setDate(date);

    console.log("Generating data for: " + date);

    /* they refused to create  */
    var consumers = {
        "kitchenLight": {
            power: 100,
            type: "light",
            name: "Kitchen Light"
        },
        "bathroomLight": {
            power: 100,
            type: "light",
            name: "Bathroom Light"
        },
        "nightLamp": {
            power: 50,
            type: "light",
            name: "Night Lamp"
        },
        "wifesPC": {
            power: 300,
            type: "pc",
            name: "Wife's PC"
        },
        "kidsPC": {
            power: 400,
            type: "pc",
            name: "Kids' PC"
        },
        "bedroomRadiator": {
            power: 700,
            type: "radiator",
            name: "Bedroom Radiator"
        },
        "kitchenRadiator": {
            power: 500,
            type: "radiator",
            name: "Kitchen Radiator"
        },
        "livingroomTV": {
            power: 200,
            type: "tv",
            name: "Livingroom TV"
        },
    };

    for(var i in consumers) {

        var raw_status = devices[i]();
        var status = Math.round(raw_status * 100);
        var consumption = Math.round(status / 100 * consumers[i].power);

        var consumer = {
            "status": status,
            "consumerType": consumers[i].type,
            "consumption": consumption,
            "name": consumers[i].name,
            "inserted_at": phpdate("Y-m-d H:i:s", unix)
        };

        toSend.push(consumer);
    }

    console.log("========================");

    // curl -d '{"status":"0","consumerType":"light","consumption":"100W","name":"Kitchen Light"}' 192.168.0.107:9393/submitConsumer

    // console.log('kitchenLight: ' + devices.kitchenLight());
    // console.log('bathroomLight: ' + devices.bathroomLight());
    // console.log('nightLamp: ' + devices.nightLamp());
    // console.log('wifesPC: ' + devices.wifesPC());
    // console.log('kidsPC: ' + devices.kidsPC());
    // console.log('bedroomRadiator: ' + devices.bedroomRadiator());
    // console.log('kitchenRadiator: ' + devices.kitchenRadiator());
    // console.log('livingroomTV: ' + devices.livingroomTV());  

}

send_all();
