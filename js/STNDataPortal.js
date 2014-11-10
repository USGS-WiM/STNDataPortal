/**
 * Created by bdraper on 11/10/2014.
 */


$( document ).ready(function() {
    alert( "ready!" );

    $.ajax({
        dataType: 'xml',
        type: 'GET',
        url:'http://107.20.206.65/STNServices/Statustypes',
        headers:{
            'Accept': '*/*'
        },
        success: function(data, status, jqXHR){
            if (data.length>0){
                $('#stateSelect').append($('<option></option>').val(0).html("All"));
                $.each(data, function(){

                    alert("this ajax is returning:" + data);
                    //$('#stateSelect').append($('<option></option>').val(this['STATE']).html(this['STATE']));
                });
            }
        },
        error: function(error) {
            alert("Oh snap, error. Here it is: " + error);
        }
    });
});




