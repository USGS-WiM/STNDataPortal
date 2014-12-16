/**
 * Created by bdraper on 11/10/2014.
 */

///services URLs set to test env: events

var evtObj = [];
var evtTypeObj = [];

$(document).ready(function () {

    $('.dataTypeRadio').each(function(){
        //for the clicked radio
        $(this).on('click', function() {
            var radioId = $(this).attr('id');
            var formToShow = $('#' + radioId + 'Form');
            formToShow.show();
            $('.formsClass').not(formToShow).hide();
        });
    });
    $('.check').on('click', function(){
        $(this).find('span').toggle();
    });
    $('#peakDatePicker').datepicker({
        format: 'mm/dd/yyyy',
        autoclose: true,
        endDate: "today",
        startView: 1,
        todayBtn: true,
        multidate: false,
        clearBtn: true
    });
    $('#stateSelect').select2({
        placeholder: "All States"
    });
    $('#cntySelect').select2({
        placeholder: "All Counties"
    });
    $('#waterbodySelect').select2({
        placeholder: "All Waterbodies"
    });

    //$('#evtSelect').select2({
    //    placeholder: "All Events"
    //});
    //$.ajax({
    //    dataType: 'xml',
    //    type: 'GET',
    //    url: 'http://107.20.206.65/STNServices/events',
    //    headers: {'Accept': '*/*'},
    //    success: function (xml) {
    //        var eventArray = [];
    //        $(xml).find('EVENT').each(function () {
    //            var eventId = $(this).find('EVENT_ID').text();
    //            var eventName = $(this).find('EVENT_NAME').text();
    //            eventArray.push(eventName);
    //        });
    //        var sortedList = eventArray.sort();
    //        for (var i=0; i<sortedList.length; i++){
    //            $('#evtSelect').append("<option value='" + sortedList[i] + "'>" + sortedList[i] + "</option>");
    //        }
    //    },
    //    error: function (error) {
    //        console.log("Error processing the XML. The error is:" + error);
    //    }
    //});

    $('#evtSelect').select2({
        placeholder: "All Events"
    });
    $.ajax({
        dataType: 'json',
        type: 'GET',
        url: 'http://107.20.206.65/STNTest/STNServices/events.json',
        headers: {'Accept': '*/*'},
        success: function (data) {
            data.sort(function (a,b) {
                var eventA = a.EVENT_NAME;
                var eventB = b.EVENT_NAME;
                if (eventA < eventB) {return -1}
                if (eventA > eventB) {return 1}
                else {return 0}
            });
            for (var i=0; i<data.length; i++){
                $('#evtSelect').append("<option value='" + data[i].EVENT_ID + "'>" + data[i].EVENT_NAME + "</option>");
                evtObj.push(data[i]);
            }
        },
        error: function (error) {
            console.log("Error processing the JSON. The error is:" + error);
        }
    });

    $('#evtSelect').on("change", function (selection){
        //check to see if there is any value selected
        if (selection.val.length > 0) {
            //set up an array with the strings from the selection.val object strings converted to numbers
            var convertedEvtIds = [];
            for (var i=0; i<selection.val.length; i++){
                convertedEvtIds.push(Number(selection.val[i]));
            }
            var filtersArray = convertedEvtIds;
            var selectedEvents = evtObj.filter(function (element){
                return filtersArray.indexOf(element.EVENT_ID) > -1;
            });
            var currentEvtTypes = [];
            $('#evtTypeSelect').html("");
            function getEvtTypeName (evtTypeId) {
                for (var i=0; i<evtTypeObj.length; i++) {
                    if (evtTypeObj[i].EVENT_TYPE_ID == evtTypeId){
                        return evtTypeObj[i].TYPE;
                    }
                }
            }
            for (var x=0; x<selectedEvents.length; x++){
                if (currentEvtTypes.indexOf(selectedEvents[x].EVENT_TYPE_ID) == -1 ) {
                    currentEvtTypes.push(selectedEvents[x].EVENT_TYPE_ID);
                    $('#evtTypeSelect').append("<option value='" + selectedEvents[x].EVENT_TYPE_ID + "'>" + getEvtTypeName(selectedEvents[x].EVENT_TYPE_ID) + "</option>");
                }
            }
        } else {
            $('#evtTypeSelect').html("");
            for (var i=0; i<evtTypeObj.length; i++) {
                $('#evtTypeSelect').append("<option value='" + evtTypeObj[i].EVENT_TYPE_ID + "'>" + evtTypeObj[i].TYPE + "</option>");
            }
        }
    });

    $('#evtTypeSelect').on("change", function (selection){
        if (selection.val.length > 0) {
            var selectedEvtTypeIds = [];
            for (var i=0; i<selection.val.length; i++){
                selectedEvtTypeIds.push(Number(selection.val[i]));
            }
            var currentEvents  = evtObj.filter (function (element)  {
                return selectedEvtTypeIds.indexOf(element.EVENT_TYPE_ID) > -1;
            });
            $('#evtSelect').html("");
            for (var x=0; x<currentEvents.length; x++) {
                $('#evtSelect').append("<option value='" + currentEvents[x].EVENT_ID + "'>" + currentEvents[x].EVENT_NAME + "</option>");
            }

        } else {
            $('#evtSelect').html("");
            for (var i=0; i<evtObj.length; i++){
                $('#evtSelect').append("<option value='" + evtObj[i].EVENT_ID + "'>" + evtObj[i].EVENT_NAME + "</option>");
            }
        }
    })


    $('#evtTypeSelect').select2({
        placeholder: "All Types"
    });
    $.ajax({
        dataType: 'json',
        type: 'GET',
        url: 'http://107.20.206.65/STNTest/STNServices/eventtypes.json',
        headers: {'Accept': '*/*'},
        success: function (data) {
            data.sort(function (a,b) {
                var typeA = a.TYPE;
                var typeB = b.TYPE;
                if (typeA < typeB) {return -1}
                if (typeA > typeB) {return 1}
                else {return 0}
            });
            for (var i=0; i<data.length; i++){
                $('#evtTypeSelect').append("<option value='" + data[i].EVENT_TYPE_ID + "'>" + data[i].TYPE + "</option>");
                evtTypeObj.push(data[i]);
            }
        },
        error: function (error) {
            console.log("Error processing the JSON. The error is:" + error);
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



