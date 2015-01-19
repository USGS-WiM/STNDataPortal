/**
 * Created by bdraper on 11/10/2014.
 */
///services URLs set to test env: events, eventTypes, states
var stnDataPortal = stnDataPortal || {
        data: {
            events: [],
            eventTypes: [],
            states: [],
            counties : [],
            sensorStatusTypes : [],
            sensorTypes : []
        }
    };

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

    $('#evtTypeSelect').select2({
        placeholder: "All Types"
    });
    $('#evtSelect').select2({
        placeholder: "All Events"
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


    $('#downloadButton').on("click", function () {
        $(this).button('downloading');

        //event type
        var eventTypeSelections;
        if ($('#evtTypeSelect').val() !== null){
            var evtTypeSelectionsArray = $('#evtTypeSelect').val();
            eventTypeSelections = evtTypeSelectionsArray.toString();
        }
        //event
        var eventSelections;
        if ($('#evtSelect').val() !== null){
            var eventSelectionsArray = $('#evtSelect').val();
            eventSelections = eventSelectionsArray.toString();
        }
        //event status: active
        var eventStatusSelectionArray = [];
        if ($("#active")[0].checked) {
            eventStatusSelectionArray.push(1);
        }
        //event status: complete
        if ($("#complete")[0].checked) {
            eventStatusSelectionArray.push(2);
        }
        var eventStatusSelections =  eventStatusSelectionArray.toString();

        //state
        var stateSelections;

        //county
        var countySelections;


        //SENSORS
        //sensor status
        var sensorStatusSelections;
        if ($('#statusSelect').val() !== null ){
            var sensorStatusSelectionArray = $('#statusSelect').val();
            sensorStatusSelections = sensorStatusSelectionArray.toString();
        }

        //sensor collection condition
        var collectConditionSelections;

        //sensor deployment type
        var deploymentTypeSelections;

        //HWMs
        //HWM types
        var hwmTypeSelections;

        //HWM quality
        var hwmQualitySelections;

        ////NOTE: need to find out hwm env type IDs
        var hwmEnvSelectionArray = [];
        //HWM environment: coastal
        if ($("#coastal")[0].checked) {
            hwmEnvSelectionArray.push();
        }
        //HWM environment: riverine
        if ($("#active")[0].checked) {
            hwmEnvSelectionArray.push();
        }
        var hwmEnvSelections = hwmEnvSelectionArray.toString();

        //NOTE: need to find out expected values for HWM survey complete
        //HWM survey status
        var hwmSurveyStatusSelectionArray = [];
        ///HWM survey status: complete
        if ($("surveyCompleteYes")[0].checked) {
            hwmSurveyStatusSelectionArray.push(true);
        }
        ///HWM survey status: not complete
        if ($("#surveyCompleteNo")[0].checked) {
            hwmSurveyStatusSelectionArray.push(false);
        }
        var hwmSurveyStatusSelections = hwmSurveyStatusSelectionArray.toString();

        //NOTE: need to find out expected values for HWM stillwater
        //HWM survey status
        var hwmStillwaterStatusSelectionArray = [];
        ///HWM survey status: complete
        if ($("stillWtrYes")[0].checked) {
            hwmStillwaterStatusSelectionArray.push(true);
        }
        ///HWM survey status: not complete
        if ($("#stillWtrNo")[0].checked) {
            hwmStillwaterStatusSelectionArray.push(false);
        }
        var hwmStillwaterStatusSelections = hwmStillwaterStatusSelectionArray.toString();

        //PEAKS
        var peakFromDate;
        if ($("#peakFromDate")[0].value !== ""){
            peakFromDate = $("#peakFromDate")[0].value;
        }
        var peakToDate;
        if ($("#peakToDate")[0].value !== "") {
            peakToDate = $("#peakToDate")[0].value;
        }


        $(this).button('reset');
    });



    var populateCountiesArray =  function  () {

        for (i=0; i<stnDataPortal.data.states.length; i++) {

            $.ajax({
                dataType: 'json',
                type: 'GET',
                url: "http://107.20.206.65/STNTest/STNServices/StateCounties/" + stnDataPortal.data.states[i] + ".json",
                headers: {'Accept': '*/*'},
                currentState: stnDataPortal.data.states[i],
                success: function (data)  {
                    stnDataPortal.data.counties[String(this.currentState)] = data;
                },
                error: function (error) {
                    console.log("Error retrieving counties. The error is: ");
                }
            });
        }
        setTimeout(function (){
            console.log(stnDataPortal.data.counties);
        }, 300);
    };

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
                //data[i].id = data[i].EVENT_TYPE_ID;
                stnDataPortal.data.eventTypes.push(data[i]);
            }
        },
        error: function (error) {
            console.log("Error processing the JSON. The error is:" + error);
        }
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
                data[i].id = data[i].EVENT_ID;
                stnDataPortal.data.events.push(data[i]);
            }
        },
        error: function (error) {
            console.log("Error processing the JSON. The error is:" + error);
        }
    });

    $.ajax({
        dataType: 'json',
        type: 'GET',
        url: 'http://107.20.206.65/STNTest/STNServices/sitestates.json',
        headers: {'Accept': '*/*'},
        success: function (data) {
            data.sort(function (a,b) {

                if (a< b) {return -1}
                if (a > b) {return 1}
                else {return 0}
            });
            var lookupStateName = function (stateID) {
                if (usStatesByAbbreviation[stateID] === undefined)
                {
                    return "Unspecified";
                }
                return usStatesByAbbreviation[stateID];
            };
            for (var i=0; i<data.length; i++){
                $('#stateSelect').append("<option value='" + data[i] + "'>" + lookupStateName(data[i]) + "</option>");
                data[i].id = data[i];
                stnDataPortal.data.states.push(data[i]);
            }
            populateCountiesArray();
        },
        error: function (error) {
            console.log("Error processing the JSON. The error is:" + error);
        }
    });

    $('#evtTypeSelect').on("change", function (selection){
        if (selection.val.length > 0) {
            var selectedEvtTypeIds = [];
            for (var i=0; i<selection.val.length; i++){
                selectedEvtTypeIds.push(Number(selection.val[i]));
            }
            var currentEvents  = stnDataPortal.data.events.filter (function (element)  {
                return selectedEvtTypeIds.indexOf(element.EVENT_TYPE_ID) > -1;
            });
            $('#evtSelect').html("");
            //$("#evtSelect").select2("val", "");
            for (var x=0; x<currentEvents.length; x++) {
                $('#evtSelect').append("<option value='" + currentEvents[x].EVENT_ID + "'>" + currentEvents[x].EVENT_NAME + "</option>");
            }
        } else {
            $('#evtSelect').html("");
            for (var i=0; i<stnDataPortal.data.events.length; i++){
                $('#evtSelect').append("<option value='" + stnDataPortal.data.events[i].EVENT_ID + "'>" + stnDataPortal.data.events[i].EVENT_NAME + "</option>");
            }
        }
    });

    $('#evtSelect').on("change", function (selection){
        //check to see if there is any value selected
        if (!(selection.val.length > 0)) {
            var opts = document.getElementById('evtTypeSelect').options;
            for (var i=0; i < opts.length; i++) {
                opts[i].disabled = false;
            }
            return
        }
        // Functions
        // Returns a new array with only unique elements from the one given.
        var onlyUnique = function(array) {
            var distinctValues = [];
            // Build a new array with only distinct elements.
            for (var i = 0; i < array.length; i++)
            {
                // Check if the value is already in the new array; if so, skip it.
                if (distinctValues.indexOf(array[i]) != -1) {
                    continue;
                }
                // Add the element to the distinct-values array.
                distinctValues.push(array[i]);
            }
            // Return the array of distinct values.
            return distinctValues;
        };
        // Execution
        //set up an array with the strings from the selection.val object strings converted to numbers
        var selectedEventIDNumbers = [];
        for (var i=0; i<selection.val.length; i++){
            selectedEventIDNumbers.push(parseInt(selection.val[i]));
        }
        // Build a list of the event-type IDs chosen.
        var selectedEventTypeIDs = [];
        for (var i = 0; i < stnDataPortal.data.events.length; i++)
        {
            // If this is not one of the chosen events, skip it.
            if (selectedEventIDNumbers.indexOf(stnDataPortal.data.events[i].EVENT_ID) == -1)
            {
                continue;
            }
            // Add the event-type ID to the list.
            selectedEventTypeIDs.push(stnDataPortal.data.events[i].EVENT_TYPE_ID);
        }
        // Reduce the array of selected event-type IDs to only unique elements.
        var distinctSelectedEventTypeIDs = onlyUnique(selectedEventTypeIDs);
        //Iterate through the DOM elements and disable those not having event IDs that are selected.
        var options = document.getElementById('evtTypeSelect').options;
        for (var i=0; i < options.length; i++) {
            // Disable the element first.
            options[i].disabled = true;
            // If the element is within the list of those selected, enable it.
            if (distinctSelectedEventTypeIDs.indexOf(parseInt(options[i].value)) != -1) {
                options[i].disabled = false;
            }
        }
        return;
    });

    $('#stateSelect').on("change", function (statesSelected) {
        if (!(statesSelected.val.length > 0)) {
            $('#cntySelect').html("");
            $('#cntySelect').append("<option value=null>Please select state(s) first </option>");
            return
        }
        var currentCounties = [];
        for (var key in stnDataPortal.data.counties){

            var value = stnDataPortal.data.counties[key];
            if (statesSelected.val.indexOf(key) > -1) {
                currentCounties = currentCounties.concat(value);
            }
        }
        $('#cntySelect').html("");
        for (var key in currentCounties) {
            var countyOption = currentCounties[key];
            $('#cntySelect').append("<option value='" + countyOption + "'>" + countyOption + "</option>");
        };
    });

    ///"below the fold" inputs
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
        dataType: 'json',
        type: 'GET',
        url: 'http://107.20.206.65/STNTest/STNServices/sensortypes.json',
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
                $('#sensorTypeSelect').append("<option value='" + data[i].SENSOR_TYPE_ID + "'>" + data[i].SENSOR + "</option>");
                stnDataPortal.data.sensorTypes.push(data[i]);
            }
        },
        error: function (error) {
            console.log("Error processing the JSON. The error is:" + error);
        }
    });


    $('#statusSelect').select2({
        placeholder: "All Statuses"
    });
    $.ajax({
        dataType: 'json',
        type: 'GET',
        url: 'http://107.20.206.65/STNTest/STNServices/statustypes.json',
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
                $('#statusSelect').append("<option value='" + data[i].STATUS_TYPE_ID + "'>" + data[i].STATUS + "</option>");
                stnDataPortal.data.sensorStatusTypes.push(data[i]);
            }
        },
        error: function (error) {
            console.log("Error processing the JSON. The error is:" + error);
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