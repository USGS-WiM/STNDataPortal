/**
 * Created by bdraper on 11/10/2014.
 * Copyright (c) 2015, Blake Draper, USGS WiM
 */
var stnDataPortal = stnDataPortal || {
        data: {
            events: [],
            eventTypes: [],
            states: [],
            counties : [],
            sensorTypes : [],
            sensorStatusTypes : [],
            collectionConditions: [],
            deploymentTypes : [],
            hwmTypes: [],
            hwmQualities : []
        },
        globals: {
            webServicesRoot: 'https://stn.wim.usgs.gov/STNServices',
            csvQueryURL : "",
            jsonQueryURL : "",
            xmlQueryURL : "",
            jsonSensorsURLRoot : "",
            xmlSensorsURLRoot: "",
            csvSensorsURLRoot : "",
            sensorsQueryString : "",
            jsonHWMsURLRoot : "",
            xmlHWMsURLRoot : "",
            csvHWMsURLRoot : "",
            hwmsQueryString : "",
            xmlPeaksURLRoot : "",
            jsonPeaksURLRoot : "",
            csvPeaksURLRoot : "",
            peaksQueryString : ""
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
        startView: 1,
        todayBtn: true,
        multidate: false,
        clearBtn: true
    });
    $('#countySelect').select2({
        placeholder: "All Counties"
    });

    ///function to grab all values from the inputs, form into arrays, and build query strings
    var buildQueryStrings =  function  () {

        //event type
        var eventTypeSelections = "";
        if ($('#evtTypeSelect').val() !== null){
            var evtTypeSelectionsArray = $('#evtTypeSelect').val();
            eventTypeSelections = evtTypeSelectionsArray.toString();
        }
        //event
        var eventSelections = "";
        if ($('#evtSelect').val() !== null){
            var eventSelectionsArray = $('#evtSelect').val();
            eventSelections = eventSelectionsArray.toString();
        }
        //event status
        var eventStatusSelectionArray = [];
        //event status: active
        if ($("#active")[0].checked && !($("#complete")[0].checked) ) {
            eventStatusSelectionArray.push(1);
        }
        //event status: complete
        if ($("#complete")[0].checked && !($("#active")[0].checked)) {
            eventStatusSelectionArray.push(2);
        }
        if ($("#active")[0].checked && $("#complete")[0].checked || !($("#active")[0].checked) && !($("#complete")[0].checked)) {
            eventStatusSelectionArray.push(0);
        }
        var eventStatusSelection =  eventStatusSelectionArray.toString();

        //state
        var stateSelections = "";
        if ($('#stateSelect').val() !== null){
            var stateSelectionsArray = $('#stateSelect').val();
            stateSelections = stateSelectionsArray.toString();
        }
        //county
        var countySelections = "";
        if ($('#countySelect').val() !== null){
            var countySelectionsArray = $('#countySelect').val();
            countySelections = countySelectionsArray.toString();
        }

        ///////////////////////////////////////////////////////////////////////////////////////////////////////////////
        //SENSORS
        if ($("#sensorRad")[0].checked){
            //sensor type
            var sensorTypeSelections = "";
            if ($('#sensorTypeSelect').val() !== null ){
                var sensorTypeSelectionArray = $('#sensorTypeSelect').val();
                sensorTypeSelections = sensorTypeSelectionArray.toString();
            }
            //sensor status
            var sensorStatusSelections = "";
            if ($('#sensorStatusSelect').val() !== null ){
                var sensorStatusSelectionArray = $('#sensorStatusSelect').val();
                sensorStatusSelections = sensorStatusSelectionArray.toString();
            }

            //sensor collection condition
            var collectConditionSelections = "";
            if ($('#collectionConditionSelect').val() !== null ){
                var collectConditionSelectionArray = $('#collectionConditionSelect').val();
                collectConditionSelections = collectConditionSelectionArray.toString();
            }

            //sensor deployment type
            var deploymentTypeSelections = "";
            if ($('#deployTypeSelect').val() !== null ){
                var deploymentTypeSelectionArray = $('#deployTypeSelect').val();
                deploymentTypeSelections = deploymentTypeSelectionArray.toString();
            }

            stnDataPortal.globals.xmlSensorsURLRoot = stnDataPortal.globals.webServicesRoot  + "/Instruments/FilteredInstruments";
            stnDataPortal.globals.jsonSensorsURLRoot = stnDataPortal.globals.webServicesRoot  + "/Instruments/FilteredInstruments.json";
            stnDataPortal.globals.csvSensorsURLRoot = stnDataPortal.globals.webServicesRoot  + "/Instruments/FilteredInstruments.csv";
            stnDataPortal.globals.sensorsQueryString = "?Event=" + eventSelections + "&EventType=" + eventTypeSelections + "&EventStatus=" + eventStatusSelection + "&States=" + stateSelections + "&County=" + countySelections + "&SensorType=" + sensorTypeSelections + "&CurrentStatus=" + sensorStatusSelections + "&CollectionCondition=" + collectConditionSelections + "&DeploymentType=" + deploymentTypeSelections;
            //var resultIsEmpty = false;

            stnDataPortal.globals.csvQueryURL = stnDataPortal.globals.csvSensorsURLRoot + stnDataPortal.globals.sensorsQueryString;
            stnDataPortal.globals.jsonQueryURL = stnDataPortal.globals.jsonSensorsURLRoot + stnDataPortal.globals.sensorsQueryString;
            stnDataPortal.globals.xmlQueryURL = stnDataPortal.globals.xmlSensorsURLRoot + stnDataPortal.globals.sensorsQueryString;

        }
        ////////////////////////////////////////////////////////////////////////////////////////////////////////
        //HWMs
        if ($("#hwmRad")[0].checked) {
            //HWM types
            var hwmTypeSelections = "";
            if ($('#hwmTypeSelect').val() !== null ){
                var hwmTypeSelectionArray = $('#hwmTypeSelect').val();
                hwmTypeSelections = hwmTypeSelectionArray.toString();
            }
            //HWM quality
            var hwmQualitySelections = "";
            if ($('#hwmQualitySelect').val() !== null ){
                var hwmQualitySelectionArray = $('#hwmQualitySelect').val();
                hwmQualitySelections = hwmQualitySelectionArray.toString();
            }
            ////HWM environment
            var hwmEnvSelectionArray = [];
            //HWM environment: coastal
            if ($("#coastal")[0].checked && !($("#riverine")[0].checked)) {
                hwmEnvSelectionArray.push("Coastal");
            }
            //HWM environment: riverine
            if ($("#riverine")[0].checked && !($("#coastal")[0].checked) ) {
                hwmEnvSelectionArray.push("Riverine");
            }
            var hwmEnvSelections = hwmEnvSelectionArray.toString();
            //HWM survey status
            var hwmSurveyStatusSelectionArray = [];
            ///HWM survey status: complete
            if ($("#surveyCompleteYes")[0].checked && !($("#surveyCompleteNo")[0].checked)) {
                hwmSurveyStatusSelectionArray.push("true");
            }
            ///HWM survey status: not complete
            if ($("#surveyCompleteNo")[0].checked && !($("#surveyCompleteYes")[0].checked)) {
                hwmSurveyStatusSelectionArray.push("false");
            }
            var hwmSurveyStatusSelections = hwmSurveyStatusSelectionArray.toString();
            //HWM stillwater status
            var hwmStillwaterStatusSelectionArray = [];
            ///HWM stillwater status: yes
            if ($("#stillWaterYes")[0].checked && !($("#stillWaterNo")[0].checked)) {
                hwmStillwaterStatusSelectionArray.push("true");
            }
            ///HWM stillwater status: no
            if ($("#stillWaterNo")[0].checked  && !($("#stillWaterYes")[0].checked)) {
                hwmStillwaterStatusSelectionArray.push("false");
            }
            var hwmStillwaterStatusSelections = hwmStillwaterStatusSelectionArray.toString();

            stnDataPortal.globals.xmlHWMsURLRoot = stnDataPortal.globals.webServicesRoot  + "/HWMs/FilteredHWMs";
            stnDataPortal.globals.jsonHWMsURLRoot = stnDataPortal.globals.webServicesRoot  + "/HWMs/FilteredHWMs.json";
            stnDataPortal.globals.csvHWMsURLRoot = stnDataPortal.globals.webServicesRoot  + "/HWMs/FilteredHWMs.csv";
            stnDataPortal.globals.hwmsQueryString = "?Event=" + eventSelections + "&EventType=" + eventTypeSelections + "&EventStatus=" + eventStatusSelection + "&States=" + stateSelections + "&County=" + countySelections + "&HWMType=" + hwmTypeSelections + "&HWMQuality=" + hwmQualitySelections + "&HWMEnvironment=" + hwmEnvSelections + "&SurveyComplete=" + hwmSurveyStatusSelections + "&StillWater=" + hwmStillwaterStatusSelections;
            //var resultIsEmpty = false;

            stnDataPortal.globals.csvQueryURL = stnDataPortal.globals.csvHWMsURLRoot + stnDataPortal.globals.hwmsQueryString;
            stnDataPortal.globals.jsonQueryURL = stnDataPortal.globals.jsonHWMsURLRoot + stnDataPortal.globals.hwmsQueryString;
            stnDataPortal.globals.xmlQueryURL = stnDataPortal.globals.xmlHWMsURLRoot + stnDataPortal.globals.hwmsQueryString;

        }
        ////////////////////////////////////////////////////////////////////////////////////////////////////////
        //PEAKS
        if ($("#peakRad")[0].checked) {
            var peakStartDate;
            if ($("#peakStartDate").value !== ""){
                peakStartDate = $("#peakStartDate")[0].value;
            }
            var peakEndDate;
            if ($("#peakEndDate").value !== "") {
                peakEndDate = $("#peakEndDate")[0].value;
            }

            stnDataPortal.globals.xmlPeaksURLRoot = stnDataPortal.globals.webServicesRoot  + "/PeakSummaries/FilteredPeaks";
            stnDataPortal.globals.jsonPeaksURLRoot = stnDataPortal.globals.webServicesRoot  + "/PeakSummaries/FilteredPeaks.json";
            stnDataPortal.globals.csvPeaksURLRoot = stnDataPortal.globals.webServicesRoot  + "/PeakSummaries/FilteredPeaks.csv";
            stnDataPortal.globals.peaksQueryString = "?Event=" + eventSelections + "&EventType=" + eventTypeSelections + "&EventStatus=" + eventStatusSelection + "&States=" + stateSelections + "&County=" + countySelections + "&StartDate="  + peakStartDate + "&EndDate=" + peakEndDate;
            //var resultIsEmpty = false;

            stnDataPortal.globals.csvQueryURL = stnDataPortal.globals.csvPeaksURLRoot + stnDataPortal.globals.peaksQueryString;
            stnDataPortal.globals.jsonQueryURL = stnDataPortal.globals.jsonPeaksURLRoot + stnDataPortal.globals.peaksQueryString;
            stnDataPortal.globals.xmlQueryURL = stnDataPortal.globals.xmlPeaksURLRoot + stnDataPortal.globals.peaksQueryString;

        }
    };

    $('#showURLSButton').on("click", function (){
        buildQueryStrings();
        $.ajax({
            dataType: 'json',
            type: 'GET',
            url: stnDataPortal.globals.jsonQueryURL,
            async: false,
            headers: {'Accept': '*/*'},
            success: function (data) {
                if (data.length === 0) {
                    //alert("Your selection returns no results. Try a different combination of parameters.");
                    $('#noResultsModal').modal('show');
                } else {
                    document.getElementById("jsonString").innerHTML = stnDataPortal.globals.jsonQueryURL;
                    document.getElementById("xmlString").innerHTML = stnDataPortal.globals.xmlQueryURL;
                    $('#stringsModal').modal('show');
                }
            },
            error: function (error) {
                $('#failedRequestModal').modal('show');
                //alert("Sorry, your filter request failed. Please try different parameters.");
            }
        });
    });

    $('#downloadButton').on("click", function () {

        var $btn = $(this).button('downloading');
        buildQueryStrings();
        //ajax call below uses the json endpoint (arbitrary - could also be XML) to check for length and validity of response before telling the browser to download the csv
        $.ajax({
            dataType: 'json',
            type: 'GET',
            url: stnDataPortal.globals.jsonQueryURL,
            async: false,
            headers: {'Accept': '*/*'},
            success: function (data) {
                if (data.length === 0) {
                    $btn.button('reset');
                    //alert("Your selection returns no results. Try a different combination of parameters.");
                    $('#noResultsModal').modal('show');
                } else {
                    document.location.href = stnDataPortal.globals.csvQueryURL;
                    setTimeout(function () {
                        $btn.button('reset');
                    }, 4000);
                }
            },
            error: function (error) {
                $btn.button('reset');
                $('#failedRequestModal').modal('show');
                //alert("Sorry, your filter request failed. Please try different parameters.");
            }
        });

        //e.preventDefault();
    });

    var populateCountiesArray =  function  () {
        for (i=0; i<stnDataPortal.data.states.length; i++) {
            $.ajax({
                dataType: 'json',
                type: 'GET',
                url: stnDataPortal.globals.webServicesRoot  + "/Sites/CountiesByState.json?StateAbbrev=" + stnDataPortal.data.states[i].state_abbrev ,
                headers: {'Accept': '*/*'},
                currentState: stnDataPortal.data.states[i].state_abbrev,
                success: function (data)  {
                    stnDataPortal.data.counties[(this.currentState)] = data;
                },
                error: function (error) {
                    console.log("Error retrieving counties. The error is: " + error);
                }
            });
        }
        setTimeout(function (){
            console.log(stnDataPortal.data.counties);
        }, 300);
    };

    //begin Event form ajax calls
    $('#evtTypeSelect').select2({
        placeholder: "All Types"
    });
    $.ajax({
        dataType: 'json',
        type: 'GET',
        url: stnDataPortal.globals.webServicesRoot + '/eventtypes.json',
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
                $('#evtTypeSelect').append("<option value='" + data[i].event_type_id + "'>" + data[i].type + "</option>");
                //data[i].id = data[i].event_type_id;
                stnDataPortal.data.eventTypes.push(data[i]);
            }
        },
        error: function (error) {
            console.log("Error processing the JSON. The error is:" + error);
        }
    });
    $('#evtSelect').select2({
        placeholder: "All Events"
    });
    $.ajax({
        dataType: 'json',
        type: 'GET',
        url: stnDataPortal.globals.webServicesRoot + '/events.json',
        headers: {'Accept': '*/*'},
        success: function (data) {
            data.sort(function (a,b) {
                var eventA = a.event_name;
                var eventB = b.event_name;
                if (eventA < eventB) {return -1}
                if (eventA > eventB) {return 1}
                else {return 0}
            });
            for (var i=0; i<data.length; i++){
                $('#evtSelect').append("<option value='" + data[i].event_id + "'>" + data[i].event_name + "</option>");
                data[i].id = data[i].event_id;
                stnDataPortal.data.events.push(data[i]);
            }
        },
        error: function (error) {
            console.log("Error processing the JSON. The error is:" + error);
        }
    });
    //end Event form ajax calls
    //begin Location form ajax calls (county form populates from the populateCountiesArray function above)
    $('#stateSelect').select2({
        placeholder: "All States"
    });
    $.ajax({
        dataType: 'json',
        type: 'GET',
        url: stnDataPortal.globals.webServicesRoot + '/States.json',
        headers: {'Accept': '*/*'},
        success: function (data) {
            data.sort(function (a,b) {
                var stateA = a.state_name;
                var stateB = b.state_name;
                if (stateA < stateB) {return -1}
                if (stateA > stateB) {return 1}
                else {return 0}
            });
            for (var i=0; i<data.length; i++){
                $('#stateSelect').append("<option value='" + data[i].state_abbrev + "'>" + data[i].state_name + "</option>");
                data[i].id = data[i];
                stnDataPortal.data.states.push(data[i]);
            }
            populateCountiesArray();
        },
        error: function (error) {
            console.log("Error processing the JSON. The error is:" + error);
        }
    });
    //end Location form ajax calls

    //begin onChange functions for Event form (these tie the event type and event forms together)
    $('#evtTypeSelect').on("change", function (selection){
        if (selection.val.length > 0) {
            var selectedEvtTypeIds = [];
            for (var i=0; i<selection.val.length; i++){
                selectedEvtTypeIds.push(Number(selection.val[i]));
            }
            var currentEvents  = stnDataPortal.data.events.filter (function (element)  {
                return selectedEvtTypeIds.indexOf(element.event_type_id) > -1;
            });
            $('#evtSelect').html("");
            //$("#evtSelect").select2("val", "");
            for (var x=0; x<currentEvents.length; x++) {
                $('#evtSelect').append("<option value='" + currentEvents[x].event_id + "'>" + currentEvents[x].event_name + "</option>");
            }
        } else {
            $('#evtSelect').html("");
            for (var i=0; i<stnDataPortal.data.events.length; i++){
                $('#evtSelect').append("<option value='" + stnDataPortal.data.events[i].event_id + "'>" + stnDataPortal.data.events[i].event_name + "</option>");
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
            if (selectedEventIDNumbers.indexOf(stnDataPortal.data.events[i].event_id) == -1)
            {
                continue;
            }
            // Add the event-type ID to the list.
            selectedEventTypeIDs.push(stnDataPortal.data.events[i].event_type_id);
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
    //end onChange functions for Event form

    //begin onChange function for state form (updates county options based on state selection)
    $('#stateSelect').on("change", function (statesSelected) {
        if (!(statesSelected.val.length > 0)) {
            $('#countySelect').html("");
            $('#countySelect').append("<option value=null>Please select state(s) first </option>");
            return
        }
        var currentCounties = [];
        for (var key in stnDataPortal.data.counties){
            for(var i=0; i<stnDataPortal.data.counties[key].length; i++ ){

                var value = stnDataPortal.data.counties[key][i].county_name;
                if (statesSelected.val.indexOf(key) > -1) {
                    currentCounties = currentCounties.concat(value);
                }

            }
            //segment below is for when return from counties endpoint is an array of strings, rather than an array of objects.
            //var value = stnDataPortal.data.counties[key];
            //if (statesSelected.val.indexOf(key) > -1) {
            //    currentCounties = currentCounties.concat(value);
            //}
        }
        $('#countySelect').html("");
        for (var key in currentCounties) {
            var countyOption = currentCounties[key];
            $('#countySelect').append("<option value='" + countyOption + "'>" + countyOption + "</option>");
        };
    });
    //end onChange function for state form
    ///Begin HWM form ajax calls
    $('#hwmTypeSelect').select2({
        placeholder: "All HWM Types"
    });
    $.ajax({
        dataType: 'json',
        type: 'GET',
        url: stnDataPortal.globals.webServicesRoot +  '/hwmtypes.json',
        headers: {'Accept': '*/*'},
        success: function (data) {
            for (var i=0; i<data.length; i++){
                $('#hwmTypeSelect').append("<option value='" + data[i].hwm_type_id + "'>" + data[i].hwm_type + "</option>");
                data[i].id = data[i].hwm_type_id;
                stnDataPortal.data.hwmTypes.push(data[i]);
            }
        },
        error: function (error) {
            console.log("Error processing the JSON. The error is:" + error);
        }
    });
    $('#hwmQualitySelect').select2({
        placeholder: "All HWM Qualities"
    });
    $.ajax({
        dataType: 'json',
        type: 'GET',
        url: stnDataPortal.globals.webServicesRoot + '/hwmqualities.json',
        headers: {'Accept': '*/*'},
        success: function (data) {
            for (var i=0; i<data.length; i++){
                $('#hwmQualitySelect').append("<option value='" + data[i].hwm_quality_id + "'>" + data[i].hwm_quality + "</option>");
                data[i].id = data[i].hwm_quality_id;
                stnDataPortal.data.hwmQualities.push(data[i]);
            }
        },
        error: function (error) {
            console.log("Error processing the JSON. The error is:" + error);
        }
    });
    //end HWM form ajax calls

    //Begin Sensor form ajax calls
    $('#sensorTypeSelect').select2({
        placeholder: "All Sensor Types"
    });
    $.ajax({
        dataType: 'json',
        type: 'GET',
        url: stnDataPortal.globals.webServicesRoot + '/sensortypes.json',
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
                $('#sensorTypeSelect').append("<option value='" + data[i].sensor_type_id + "'>" + data[i].sensor + "</option>");
                stnDataPortal.data.sensorTypes.push(data[i]);
            }
        },
        error: function (error) {
            console.log("Error processing the JSON. The error is:" + error);
        }
    });
    $('#sensorStatusSelect').select2({
        placeholder: "All Statuses"
    });
    $.ajax({
        dataType: 'json',
        type: 'GET',
        url: stnDataPortal.globals.webServicesRoot + '/statustypes.json',
        headers: {'Accept': '*/*'},
        success: function (data) {
            for (var i=0; i<data.length; i++){
                $('#sensorStatusSelect').append("<option value='" + data[i].status_type_id + "'>" + data[i].status + "</option>");
                stnDataPortal.data.sensorStatusTypes.push(data[i]);
            }
        },
        error: function (error) {
            console.log("Error processing the JSON. The error is:" + error);
        }
    });
    $('#collectionConditionSelect').select2({
        placeholder: "All Collection Conditions"
    });
    $.ajax({
        dataType: 'json',
        type: 'GET',
        url: stnDataPortal.globals.webServicesRoot + '/InstrCollectConditions.json',
        headers: {'Accept': '*/*'},
        success: function (data) {
            for (var i=0; i<data.length; i++){
                $('#collectionConditionSelect').append("<option value='" + data[i].id + "'>" + data[i].condition + "</option>");
                stnDataPortal.data.collectionConditions.push(data[i]);
            }
        },
        error: function (error) {
            console.log("Error processing the JSON. The error is:" + error);
        }
    });
    $('#deployTypeSelect').select2({
        placeholder: "All Deployment Types"
    });
    $.ajax({
        dataType: 'json',
        type: 'GET',
        url: stnDataPortal.globals.webServicesRoot + '/deploymenttypes.json',
        headers: {'Accept': '*/*'},
        success: function (data) {
            for (var i=0; i<data.length; i++){
                $('#deployTypeSelect').append("<option value='" + data[i].deployment_type_id + "'>" + data[i].method + "</option>");
                stnDataPortal.data.deploymentTypes.push(data[i]);
            }
        },
        error: function (error) {
            console.log("Error processing the JSON. The error is:" + error);
        }
    });
    //end Sensor form ajax calls
});