/**
 * Created by bdraper on 11/10/2014.
 */
$(document).ready(function () {

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

    $('#collectMethodSelect').select2({
        placeholder: "All HWM Collection Methods"
    });
    $.ajax({
        dataType: 'xml',
        type: 'GET',
        url: 'http://107.20.206.65/STNServices/horizontalmethods',
        headers: {'Accept': '*/*'},
        success: function (xml) {
            var collectMethodArray = [];
            $(xml).find('HORIZONTAL_COLLECT_METHODS').each(function () {
                var collectMethod = $(this).find('HCOLLECT_METHOD').text();
                collectMethodArray.push(collectMethod);
            });
            var sortedList = collectMethodArray.sort();
            for (var i=0; i<sortedList.length; i++){
                $('#collectMethodSelect').append("<option value='" + sortedList[i] + "'>" + sortedList[i] + "</option>");
            }
        },
        error: function (error) {
            console.log("Error processing the XML. The error is:" + error);
        }
    });

    $('#vertCollectSelect').select2({
        placeholder: "All Vertical Collection Methods"
    });
    $.ajax({
        dataType: 'xml',
        type: 'GET',
        url: 'http://107.20.206.65/STNServices/verticalmethods',
        headers: {'Accept': '*/*'},
        success: function (xml) {
            var vertCollectArray = [];
            $(xml).find('VERTICAL_COLLECT_METHODS').each(function () {
                var vertCollect = $(this).find('VCOLLECT_METHOD').text();
                vertCollectArray.push(vertCollect);
            });
            var sortedList = vertCollectArray.sort();
            for (var i=0; i<sortedList.length; i++){
                $('#vertCollectSelect').append("<option value='" + sortedList[i] + "'>" + sortedList[i] + "</option>");
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

    $('#sensorBrandSelect').select2({
        placeholder: "All Sensor Brands"
    });
    $.ajax({
        dataType: 'xml',
        type: 'GET',
        url: 'http://107.20.206.65/STNServices/sensorbrands',
        headers: {'Accept': '*/*'},
        success: function (xml) {
            var sensorBrandArray = [];
            $(xml).find('SENSOR_BRAND').each(function () {
                var sensorBrand = $(this).find('BRAND_NAME').text();
                sensorBrandArray.push(sensorBrand);
            });
            var sortedList = sensorBrandArray.sort();
            for (var i=0; i<sortedList.length; i++){
                $('#sensorBrandSelect').append("<option value='" + sortedList[i] + "'>" + sortedList[i] + "</option>");
            }
        },
        error: function (error) {
            console.log("Error processing the XML. The error is:" + error);
        }
    });

    $('#housingTypeSelect').select2({
        placeholder: "All Housing Types"
    });
    $.ajax({
        dataType: 'xml',
        type: 'GET',
        url: 'http://107.20.206.65/STNServices/housingtypes',
        headers: {'Accept': '*/*'},
        success: function (xml) {
            var housingTypeArray = [];
            $(xml).find('HOUSING_TYPE').each(function () {
                var housingType = $(this).find('TYPE_NAME').text();
                housingTypeArray.push(housingType);
            });
            var sortedList = housingTypeArray.sort();
            for (var i=0; i<sortedList.length; i++){
                $('#housingTypeSelect').append("<option value='" + sortedList[i] + "'>" + sortedList[i] + "</option>");
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



