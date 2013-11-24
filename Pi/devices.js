var date = new Date(),
    lastStatus = {},
    lastUpdateHour = {},
    workdays = [0, 1, 2, 3, 4];

// setInterval(function(){
//     date = new Date();
// }, 1000);

function getData(hours, fn) {

    var hour = date.getHours();
    var new_hour = -1;

    // find the first hour in array that's greater then the current hour
    for (var i in hours) {
        if(hour < i) {
            new_hour = i;
            break;
        }
    }

    // if no hour set, set the last key
    if( new_hour == -1 ){
        new_hour = i;
    }

    if( typeof lastStatus[fn] === 'undefined'
        || typeof lastUpdateHour[fn] === 'undefined'
        || lastUpdateHour[fn] != new_hour
    ) {
        lastStatus[fn] = hours[hour];
        lastUpdateHour[fn] = new_hour;
    }

    return {
        status: lastStatus,
        consumption: (Math.random() < 0.5 ? -1 : 1) * 0.01 + lastStatus * power[fn]
    }
}

function setDate(newDate){
    date = newDate;
}

function pushUpdates(updates){
    for(var i in updates) {
        // "attributes" - workaround against crazy developers
        var item = updates[i].attributes;
        var key = keys.indexOf(item.name);
        lastStatus[key] = item.status;
        lastUpdateHour[key] = getUnix();
    }
}

function getUnix(context){

    if(typeof context === 'undefined') {
        context = new Date();
    }

    return Math.floor(context.getTime()/1000)
}

/*
* stupid stupid workaround for people
* that don't know how to design a database
*/
var keys =  {
    "kitchenLight": "Kitchen Light",
    "bathroomLight": "Bathroom Light",
    "nightLamp": "Night Lamp",
    "wifesPC": "Wife's PC",
    "kidsPC": "Kids' PC",
    "bedroomRadiator": "Bedroom Radiator",
    "kitchenRadiator": "Kitchen Radiator",
    "livingroomTV": "Livingroom TV"
};

var power = {
    "kitchenLight": 100,
    "bathroomLight": 100,
    "nightLamp": 50,
    "wifesPC": 300,
    "kidsPC": 400,
    "bedroomRadiator": 700,
    "kitchenRadiator": 500,
    "livingroomTV": 200
};

function getKey(hour, hours){

    throw new Exception('Deprecated.');

    for(var i in hours){
        if( hour < i ) {
            return i;
        }
    }

    return i; // return the last one, just in case
}

function kitchenLight(){

    var hour = date.getHours();
    var day = date.getDay();
    var fn = 'kitchenLight';

    if( day in workdays ) {

        // this is not very efficient, but it works.
        // it just looks better than creating an
        // anonymous function for each hour or using an eval =)
        var hours = {
            7: Math.random() < 0.5 ? 1 : 0,
            8: Math.random() < 1 ? 1 : 0,
            17: Math.random() < 0.3 ? 1 : 0,
            22: Math.random() < 0.9 ? 1 : 0,
            24: Math.random() < 0.7 ? 1 : 0
        };

        var data = getData(hours, fn);
        return data.consumption;
    }

    var hours = {
        3: Math.random() < 0.5 ? 1 : 0,
        10: Math.random() < 0.2 ? 1 : 0,
        17: Math.random() < 0.3 ? 1 : 0,
        22: Math.random() < 0.9 ? 1 : 0,
        24: Math.random() < 0.7 ? 1 : 0
    }

    var data = getData(hours, fn);
    return data.consumption;
}

function bathroomLight(){

    var hour = date.getHours();
    var day = date.getDay();
    var fn = 'bathroomLight';

    if( day in workdays ) {

        var hours = {
            7: Math.random() < 0.01 ? 1 : 0,
            8: Math.random() < 0.09 ? 1 : 0,
            17: Math.random() < 0.01 ? 1 : 0,
            22: Math.random() < 0.08 ? 1 : 0,
            24: Math.random() < 0.05 ? 1 : 0
        }

        var data = getData(hours, fn);
        return data.consumption;
    }

    var hours = {
        3: Math.random() < 0.05 ? 1 : 0,
        10: Math.random() < 0.01 ? 1 : 0,
        17: Math.random() < 0.02 ? 1 : 0,
        22: Math.random() < 0.08 ? 1 : 0,
        24: Math.random() < 0.05 ? 1 : 0
    }

    var data = getData(hours, fn);
    return data.consumption;
}

function nightLamp(){

    var hour = date.getHours();
    var day = date.getDay();
    var fn = 'nightLamp';

    var hours = {
        7: 0.3 + 0.1 * Math.random(),
        22: 0,
        24: 0.3 + 0.1 * Math.random()
    }

    var data = getData(hours, fn);
    return data.consumption;
}

function wifesPC(){

    var hour = date.getHours();
    var day = date.getDay();
    var fn = 'wifesPC';

    if( day in workdays ) {

        var hours = {
            1: Math.random() * 0.6,
            7: Math.random() * 0.01,
            8: Math.random() * 0.4,
            17: Math.random() * 0.01,
            24: Math.random() * 0.8
        };

        var data = getData(hours, fn);
        return data.consumption;
    }

    var hours = {
        3: Math.random() * 0.8,
        10: Math.random() * 0.01,
        20: Math.random() * 0.7,
        24: Math.random() * 0.3
    }

    var data = getData(hours, fn);
    return data.consumption;
}

function kidsPC(){

    var hour = date.getHours();
    var day = date.getDay();
    var fn = 'kidsPC';

    if( day in workdays ) {

        var hours = {
            8: Math.random() * 0.01,
            9: Math.random() * 0.4,
            15: Math.random() * 0.01,
            24: Math.random() * 0.8
        }

        var data = getData(hours, fn);
        return data.consumption;
    }

    var hours = {
        1: Math.random() * 0.8,
        10: Math.random() * 0.01,
        20: Math.random() * 0.7,
        24: Math.random() * 0.3
    }

    var data = getData(hours, fn);
    return data.consumption;
}

function bedroomRadiator(){

    var hour = date.getHours();
    var day = date.getDay();
    var fn = 'bedroomRadiator';

    if( day in workdays ) {

        var hours = {
            8: Math.random() * 0.1 + 0.7,
            15: Math.random() * 0.1 + 0.2,
            24: Math.random() * 0.1 + 0.7
        }
    }

    return Math.random() * 0.1 + 0.7;
}

function livingroomTV(){

    var hour = date.getHours();
    var day = date.getDay();
    var fn = 'livingroomTV';

    if( day in workdays ) {

        var hours = {
            17: Math.random() < 0.01 ? 1 : 0,
            24: Math.random() < 0.7 ? 1 : 0
        }

        var data = getData(hours, fn);
        return data.consumption;
    }

    var hours = {
        2: Math.random() < 0.7 ? 1 : 0,
        9: Math.random() < 0.01 ? 1 : 0,
        24: Math.random() < 0.7 ? 1 : 0
    }

    var data = getData(hours, fn);
    return data.consumption;
}

module.exports = {
    setDate: setDate,
    kitchenLight: kitchenLight,
    bathroomLight: bathroomLight,
    nightLamp: nightLamp,
    wifesPC: wifesPC,
    kidsPC: kidsPC,
    bedroomRadiator: bedroomRadiator,
    kitchenRadiator: bedroomRadiator,
    livingroomTV: livingroomTV
}
