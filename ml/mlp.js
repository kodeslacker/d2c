/* Dear reader, this code works, i've tested last night on a small training set but we didn't have enought time to integrate in our core. Maybe next time. Anyways, it worth mentioning. 
you need some node-ml nodejs library along with several phpjs functions; also request, math and readline from nodejs are requeired 
*/ 
var mlp = require("../lib/index").perceptrons.MultiLayerPerceptron,
    readline = require("readline"),
    php = require('./php'),
    math = require('math'),
    request = require('request'),
    SERVER = 'http://192.168.0.107:9393';

/* don't ask, stupid database model design */
var keys =  {
    "Kitchen Light": 0,
    "Bathroom Light": 1,
    "Night Lamp": 2,
    "Wife's PC": 3,
    "Kids' PC": 4,
    "Bedroom Radiator": 5,
    "Kitchen Radiator": 6,
    "Livingroom TV": 7
};
var USER_INPUT      = [];
var CONSUMER_USSAGE = [];
var maxs1 = [],maxs2 = [];

function _do() {
       /* get maxes and normalize */

    //user input for predicting what to do next
    for(var key in USER_INPUT) {
        consumer = USER_INPUT[key];
        for(var i in consumer) {
            line = consumer[i];
            maxs1[key] = new Array(line.length);
            for(var j in line) {
               value = line[j];
               if(typeof maxs1[key][j] == 'undefined') {
                    maxs1[key][j] = value;
                }
                maxs1[key][j] = math.max(maxs1[key][j], value); 
            }
        }

        for(var i in consumer) {
            line = consumer[i];
            for(var j in line) {
               value = line[j];
               if(maxs1[key][j] > 1) {
                    USER_INPUT[key][i][j] = value / maxs1[key][j];
                }  
            }
        }
    } 

    //detect anomaly
    for(var key in CONSUMER_USSAGE) {
        consumer = CONSUMER_USSAGE[key];
        for(var i in consumer) {
            line = consumer[i];
            maxs2[key] = new Array(line.length);
            for(var j in line) {
               value = line[j];
               if(typeof maxs2[key][j] == 'undefined') {
                    maxs2[key][j] = value;
                }
                maxs2[key][j] = math.max(maxs2[key][j], value);
            }
        }

        for(var i in consumer) {
            line = consumer[i];
            for(var j in line) {
               value = line[j];
                if(maxs2[key][j] > 1) {
                    CONSUMER_USSAGE[key][i][j] = value / maxs2[key][j];
                }
            }
        }
    } 

    var mlp_ui = [], mlp_cu = [], trainModels_cu = [];
    for(var index in USER_INPUT){
        mlp_ui.push(new mlp(USER_INPUT[index], index));
        mlp_cu.push(new mlp(CONSUMER_USSAGE[index], index));
         
        //console.log(USER_INPUT[index]);
    }

    if(typeof mlp_ui[0] != 'undefined') {
        mlp_ui[0].train(cb_ui);
        
        console.log('Training #0' + '_mlp_ui.');
    }

    //mlp_cu[index].train(cb_cu);
}

var trainedModels1 = [], trainedModels2 = [];
/* callback for user input - prediction */
function cb_ui(err, trainedModel) {
    //ultra mega hook for hacking node-ml multi networks issue
    trainedModels1[trainedModel._index] = trainedModel;
    if( typeof mlp_ui[trainedModel._index+1] != 'undefined') {
        mlp_ui[trainedModel._index+1].train(cb_ui);
        console.log('Training #' + (trainedModel._index+1) + '_mlp_ui.');
    } else {
        mlp_cu[0].train(cb_cu);
        console.log('Training #0' + '_mlp_cu.');
    }
}


/* callback for consumer input - anomaly detection */
function cb_cu(err, trainedModel) {
    //ultra mega hook for hacking node-ml multi networks issue
    trainedModels2[trainedModel._index] = trainedModel;
    if( typeof mlp_cu[trainedModel._index+1] != 'undefined') {
        mlp_cu[trainedModel._index+1].train(cb_cu);
        console.log('Training #' + (trainedModel._index+1) + '_mlp_cu.');
    } else {
        doCrawl();        
    }
} 
    
function doCrawl() {
    request(SERVER + '/getAllConsumers',function(err, response, body) {
        var data = JSON.parse(body);
        var monday = php.strtotime(php.date('F j Y', php.strtotime('Last monday')));
        
        if(data.length == 0 ) console.log('No data to check.');
        var count = data.length;  
        
        for(var index in data) {
            value = data[index];
            var a = value.attributes;
            var x = php.strtotime(a.inserted_at)-monday;
            var y = a.consumption;
            var index = keys[a.name];
            trainedModels2[index].perceive([x/maxs2[index][0],y/maxs2[index][1]], function(err, result) {
                console.log(result);
                count--;
                if(!count) setTimeout(doCrawl,6000); //TODO update to 60000, we are just testing at 4:00 AM
            });
            if(!count) setTimeout(doCrawl,6000); // ^ same above
        };    
    });
}

request(SERVER + '/getBulkConsumers',function(err, response, body) {
    //console.log(body);
     var monday = php.strtotime(php.date('F j Y', php.strtotime('Last monday')));
     var data = JSON.parse(body);
      
     for(var index in data) {
        value = data[index];
        var a = value.attributes;

        if(typeof USER_INPUT[keys[a.name]] == 'undefined') {
            USER_INPUT[keys[a.name]] = [];
            CONSUMER_USSAGE[keys[a.name]] = [];
        }

        USER_INPUT[keys[a.name]].push([php.strtotime(a.inserted_at) - monday, a.status]);
        CONSUMER_USSAGE[keys[a.name]].push([php.strtotime(a.inserted_at) - monday, a.consumption]);
        
     }
    
    _do();
});

var rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});
