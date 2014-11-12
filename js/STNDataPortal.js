/**
 * Created by bdraper on 11/10/2014.
 */
$(document).ready(function () {

    $.ajax({
        dataType: 'xml',
        type: 'GET',
        url: 'http://107.20.206.65/STNServices/statustypes',
        headers:{'Accept': '*/*'},
        success: function (xml) {
            $(xml).find('STATUS_TYPE').each(function () {
                var status = $(this).find('STATUS').text();
                $('#stateSelect').append("<option value='" + status + "'>" + status + "</option>");
            });
        },
        error: function (error) {
           console.log("Error processing the XML. The error is:" + error);
        }
    });

    $.ajax({
        dataType: 'xml',
        type: 'GET',
        url: 'http://107.20.206.65/STNServices/events',
        headers: {'Accept': '*/*'},
        success: function (xml) {
            $(xml).find('EVENT').each(function () {
                var eventName = $(this).find('EVENT_NAME').text();
                $('#evtSelect').append("<option value='" + eventName + "'>" + eventName + "</option>");
            });
        },
        error: function (error) {
            console.log("Error processing the XML. The error is:" + error);
        }
    });

    $.ajax({
        dataType: 'xml',
        type: 'GET',
        url: 'http://107.20.206.65/STNServices/deploymenttypes',
        headers: {'Accept': '*/*'},
        success: function (xml) {
            $(xml).find('DEPLOYMENT_TYPE').each(function () {
                var deployType = $(this).find('METHOD').text();
                $('#deployTypeSelect').append("<option value='" + deployType + "'>" + deployType + "</option>");
            });
        },
        error: function (error) {
            console.log("Error processing the XML. The error is:" + error);
        }
    });

    $.ajax({
        dataType: 'xml',
        type: 'GET',
        url: 'http://107.20.206.65/STNServices/eventtypes',
        headers: {'Accept': '*/*'},
        success: function (xml) {
            $(xml).find('EVENT_TYPE').each(function () {
                var eventType = $(this).find('TYPE').text();
                $('#eventTypeSelect').append("<option value='" + eventType + "'>" + eventType + "</option>");
            });
        },
        error: function (error) {
            console.log("Error processing the XML. The error is:" + error);
        }
    });

    $.ajax({
        dataType: 'xml',
        type: 'GET',
        url: 'http://107.20.206.65/STNServices/housingtypes',
        headers: {'Accept': '*/*'},
        success: function (xml) {
            $(xml).find('HOUSING_TYPE').each(function () {
                var housingType = $(this).find('TYPE_NAME').text();
                $('#housingTypeSelect').append("<option value='" + housingType + "'>" + housingType + "</option>");
            });
        },
        error: function (error) {
            console.log("Error processing the XML. The error is:" + error);
        }
    });

});



