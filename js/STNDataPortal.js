/**
 * Created by bdraper on 11/10/2014.
 */

$(document).ready(function () {

    //$('#sensorButton').on('click', function (){
    //    $('#sensorPanelContainer').toggleClass( "hidden" );
    //});
    //
    //$('#hwmButton').on('click', function (){
    //    $('#hwmPanelContainer').toggleClass( "hidden" );
    //});
    //
    //$('#peakButton').on('click', function (){
    //    $('#peakPanelContainer').toggleClass( "hidden" );
    //});

    var sensorForm = document.getElementById("sensorForm");
    var hwmForm = document.getElementById("hwmForm");
    var peakForm = document.getElementById("peakForm");
    sensorForm.style.display = 'none';
    hwmForm.style.display = 'none';
    peakForm.style.display = 'none';
    var formSectionRadios = $('.formSectionRad');
    for (var i =0; i < formSectionRadios.length; i++) {

        formSectionRadios[i].onclick = function () {
            var val = this.id;
            if (val == 'sensorButton') {
                sensorForm.style.display = 'block';
                hwmForm.style.display = 'none';
                peakForm.style.display = 'none';
            } else if(val == 'hwmButton'){
                sensorForm.style.display = 'none';
                hwmForm.style.display = 'block';
                peakForm.style.display = 'none';
            } else if (val == 'peakButton'){
                sensorForm.style.display = 'none';
                hwmForm.style.display = 'none';
                peakForm.style.display = 'block';
            }
        }
    }

    $('#stateSelect').select2({
        placeholder: "All States"
    });
    $('#cntySelect').select2({
        placeholder: "All Counties"
    });
    $('#waterbodySelect').select2({
        placeholder: "All Waterbodies"
    });
    $('#evtSelect').select2({
        placeholder: "All Events"
    });
    $.ajax({
        dataType: 'xml',
        type: 'GET',
        url: 'http://107.20.206.65/STNServices/events',
        headers: {'Accept': '*/*'},
        success: function (xml) {
            var eventArray = [];
            $(xml).find('EVENT').each(function () {
                var eventName = $(this).find('EVENT_NAME').text();
                eventArray.push(eventName);
            });
            var sortedList = eventArray.sort();
            for (var i=0; i<sortedList.length; i++){
                $('#evtSelect').append("<option value='" + sortedList[i] + "'>" + sortedList[i] + "</option>");
            }
        },
        error: function (error) {
            console.log("Error processing the XML. The error is:" + error);
        }
    });

    $('#evtTypeSelect').select2({
        placeholder: "All Types"
    });
    $.ajax({
        dataType: 'xml',
        type: 'GET',
        url: 'http://107.20.206.65/STNServices/eventtypes',
        headers: {'Accept': '*/*'},
        success: function (xml) {
            var evtTypeArray = [];
            $(xml).find('EVENT_TYPE').each(function () {
                var eventType = $(this).find('TYPE').text();
                evtTypeArray.push(eventType);
            });
            var sortedList = evtTypeArray.sort();
            for (var i=0; i<sortedList.length; i++){
                $('#evtTypeSelect').append("<option value='" + sortedList[i] + "'>" + sortedList[i] + "</option>");
            }
        },
        error: function (error) {
            console.log("Error processing the XML. The error is:" + error);
        }
    });


    $('#hwmTypeSelect').select2({
        placeholder: "All HWM Types"
    });
    $.ajax({
        dataType: 'xml',
        type: 'GET',
        url: 'http://107.20.206.65/STNServices/hwmtypes',
        headers: {'Accept': '*/*'},
        success: function (xml) {
            var hwmTypeArray = [];
            $(xml).find('HWM_TYPES').each(function () {
                var hwmType = $(this).find('HWM_TYPE').text();
                hwmTypeArray.push(hwmType);
            });
            var sortedList = hwmTypeArray.sort();
            for (var i=0; i<sortedList.length; i++){
                $('#hwmTypeSelect').append("<option value='" + sortedList[i] + "'>" + sortedList[i] + "</option>");
            }
        },
        error: function (error) {
            console.log("Error processing the XML. The error is:" + error);
        }
    });

    $('#qualitySelect').select2({
        placeholder: "All HWM Qualities"
    });
    $.ajax({
        dataType: 'xml',
        type: 'GET',
        url: 'http://107.20.206.65/STNServices/hwmqualities',
        headers: {'Accept': '*/*'},
        success: function (xml) {
            var qualityArray = [];
            $(xml).find('HWM_QUALITIES').each(function () {
                var quality = $(this).find('HWM_QUALITY').text();
                qualityArray.push(quality);
            });
            var sortedList = qualityArray.sort();
            for (var i=0; i<sortedList.length; i++){
                $('#qualitySelect').append("<option value='" + sortedList[i] + "'>" + sortedList[i] + "</option>");
            }
        },
        error: function (error) {
            console.log("Error processing the XML. The error is:" + error);
        }
    });

    $('#sensorTypeSelect').select2({
        placeholder: "All Sensor Types"
    });
    $.ajax({
        dataType: 'xml',
        type: 'GET',
        url: 'http://107.20.206.65/STNServices/sensortypes',
        headers: {'Accept': '*/*'},
        success: function (xml) {
            var sensorTypeArray = [];
            $(xml).find('SENSOR_TYPE').each(function () {
                var sensorType = $(this).find('SENSOR').text();
                sensorTypeArray.push(sensorType);
            });
            var sortedList = sensorTypeArray.sort();
            for (var i=0; i<sortedList.length; i++){
                $('#sensorTypeSelect').append("<option value='" + sortedList[i] + "'>" + sortedList[i] + "</option>");
            }
        },
        error: function (error) {
            console.log("Error processing the XML. The error is:" + error);
        }
    });

    $('#statusSelect').select2({
        placeholder: "All Statuses"
    });
    $.ajax({
        dataType: 'xml',
        type: 'GET',
        url: 'http://107.20.206.65/STNServices/statustypes',
        headers: {'Accept': '*/*'},
        success: function (xml) {
            var statusArray = [];
            $(xml).find('STATUS_TYPE').each(function () {
                var status = $(this).find('STATUS').text();
                statusArray.push(status);
            });
            var sortedList = statusArray.sort();
            for (var i=0; i<sortedList.length; i++){
                $('#statusSelect').append("<option value='" + sortedList[i] + "'>" + sortedList[i] + "</option>");
            }
        },
        error: function (error) {
            console.log("Error processing the XML. The error is:" + error);
        }
    });

    $('#collectionSelect').select2({
        placeholder: "All Collection Conditions"
    });
    $.ajax({
        dataType: 'xml',
        type: 'GET',
        url: 'http://107.20.206.65/STNServices/InstrCollectConditions',
        headers: {'Accept': '*/*'},
        success: function (xml) {
            var collectionArray = [];
            $(xml).find('INSTR_COLLECTION_CONDITIONS').each(function () {
                var collectionType = $(this).find('CONDITION').text();
                collectionArray.push(collectionType);
            });
            var sortedList = collectionArray.sort();
            for (var i=0; i<sortedList.length; i++){
                $('#collectionSelect').append("<option value='" + sortedList[i] + "'>" + sortedList[i] + "</option>");
            }
        },
        error: function (error) {
            console.log("Error processing the XML. The error is:" + error);
        }
    });

    $('#deployTypeSelect').select2({
        placeholder: "All Deployment Types"
    });
    $.ajax({
        dataType: 'xml',
        type: 'GET',
        url: 'http://107.20.206.65/STNServices/deploymenttypes',
        headers: {'Accept': '*/*'},
        success: function (xml) {
            var deployTypeArray = [];
            $(xml).find('DEPLOYMENT_TYPE').each(function () {
                var deployType = $(this).find('METHOD').text();
                deployTypeArray.push(deployType);
            });
            var sortedList = deployTypeArray.sort();
            for (var i=0; i<sortedList.length; i++){
                $('#deployTypeSelect').append("<option value='" + sortedList[i] + "'>" + sortedList[i] + "</option>");
            }
        },
        error: function (error) {
            console.log("Error processing the XML. The error is:" + error);
        }
    });




});



