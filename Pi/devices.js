var date = new Date();

/** needed for demo */
function setDate(fakeDate){
    date = fakeDate;
}

function kitchenLight(){

    var hour = date.getHours();
    var day = date.getDay();

    if( day in [0, 1, 2, 3, 4] ) {

        if ( hour < 7 ) {
            return Math.random() < 0.5 ? 1 : 0;
        }

        if ( hour < 8 ) {
            return Math.random() < 1 ? 1 : 0;
        }

        if ( hour < 17 ) {
            return Math.random() < 0.3 ? 1 : 0;
        }

        if ( hour < 22 ) {
            return Math.random() < 0.9 ? 1 : 0;
        }

        return Math.random() < 0.7 ? 1 : 0;
    }

    if ( hour < 3 ) {
        return Math.random() < 0.5 ? 1 : 0;
    }

    if ( hour < 10 ) {
        return Math.random() < 0.2 ? 1 : 0;
    }

    if ( hour < 17 ) {
        return Math.random() < 0.3 ? 1 : 0;
    }

    if ( hour < 22 ) {
        return Math.random() < 0.9 ? 1 : 0;
    }

    return Math.random() < 0.7 ? 1 : 0;
}

function bathroomLight(){

    var hour = date.getHours();
    var day = date.getDay();

    if( day in [0, 1, 2, 3, 4] ) {

        if ( hour < 7 ) {
            return Math.random() < 0.01 ? 1 : 0;
        }

        if ( hour < 8 ) {
            return Math.random() < 0.09 ? 1 : 0;
        }

        if ( hour < 17 ) {
            return Math.random() < 0.01 ? 1 : 0;
        }

        if ( hour < 22 ) {
            return Math.random() < 0.08 ? 1 : 0;
        }

        return Math.random() < 0.05 ? 1 : 0;
    }

    if ( hour < 3 ) {
        return Math.random() < 0.05 ? 1 : 0;
    }

    if ( hour < 10 ) {
        return Math.random() < 0.01 ? 1 : 0;
    }

    if ( hour < 17 ) {
        return Math.random() < 0.02 ? 1 : 0;
    }

    if ( hour < 22 ) {
        return Math.random() < 0.08 ? 1 : 0;
    }

    return Math.random() < 0.05 ? 1 : 0;
}

function nightLamp(){

    var hour = date.getHours();

    if ( hour < 7 ) {
        return 0.3 + 0.1 * Math.random();
    }

    if ( hour < 22 ) {
        0;
    }

    return 0.3 + 0.1 * Math.random();
}

function wifesPC(){

    var hour = date.getHours();
    var day = date.getDay();

    if( day in [0, 1, 2, 3, 4] ) {

        if ( hour < 1 ) {
            return Math.random() * 0.6;
        }

        if ( hour < 7 ) {
            return Math.random() * 0.01;
        }

        if ( hour < 8 ) {
            return Math.random() * 0.4;
        }

        if ( hour < 17 ) {
            return Math.random() * 0.01;
        }

        return Math.random() * 0.8;
    }

    if ( hour < 3 ) {
        return Math.random() * 0.8;
    }

    if ( hour < 10 ) {
        return Math.random() * 0.01;
    }

    if ( hour < 20 ) {
        return Math.random() * 0.7;
    }

    return Math.random() * 0.3;
}

function kidsPC(){

    var hour = date.getHours();
    var day = date.getDay();

    if( day in [0, 1, 2, 3, 4] ) {

        if ( hour < 8 ) {
            return Math.random() * 0.01;
        }

        if ( hour < 9 ) {
            return Math.random() * 0.4;
        }

        if ( hour < 15 ) {
            return Math.random() * 0.01;
        }

        return Math.random() * 0.8;
    }

    if ( hour < 1 ) {
        return Math.random() * 0.8;
    }

    if ( hour < 10 ) {
        return Math.random() * 0.01;
    }

    if ( hour < 20 ) {
        return Math.random() * 0.7;
    }

    return Math.random() * 0.3;
}

function bedroomRadiator(){

    var hour = date.getHours();
    var day = date.getDay();

    if( day in [0, 1, 2, 3, 4] ) {

        if ( hour < 8 ) {
            return Math.random() * 0.1 + 0.7;
        }

        if ( hour < 15 ) {
            return Math.random() * 0.1 + 0.2;
        }

        return Math.random() * 0.1 + 0.7;
    }

    return Math.random() * 0.1 + 0.7;
}

function livingroomTV(){

    var hour = date.getHours();
    var day = date.getDay();

    if( day in [0, 1, 2, 3, 4] ) {

        if ( hour < 17 ) {
            return Math.random() < 0.01 ? 1 : 0;
        }

        return Math.random() < 0.7 ? 1 : 0;
    }

    if ( hour < 2 ) {
        return Math.random() < 0.7 ? 1 : 0;
    }

    if ( hour < 9 ) {
        return Math.random() < 0.01 ? 1 : 0;
    }

    return Math.random() < 0.7 ? 1 : 0;
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
