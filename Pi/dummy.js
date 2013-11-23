var devices = require('./devices')
    request = require('request')
    phpdate = require('./date').date;

function send(data){
    var json = JSON.stringify(data);
}

for (var i = 0; i <= 172800; i += 600) {
// for (var i = 0; i <= 1800; i += 600) {

    var date = new Date( (1385010600 + i) * 1000 );
    devices.setDate(date);

    console.log("Inserting data for: " + date + "\n");

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
            "created_at": phpdate("Y-m-d H:i:s")
        };

        send(consumer);
    }

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
