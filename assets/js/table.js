function load_hospital_data(){
	  $.ajax({
        type: "GET",
        url: "https://api.rootnet.in/covid19-in/stats/hospitals"
    }).done(function (res) {
		    var tableHtml='';
		    for (var i = 0; i < res.data.regional.length; i++) {
            var hospital = res.data.regional[i].totalHospitals;
            var state = res.data.regional[i].state;
            var beds = res.data.regional[i].totalBeds;
			      tableHtml += "<tr>"
				        +"<td>"+ state +"</td>"
                + "<td>"+ beds+"</td>"
				        +  "<td>"+ hospital +"</td>"
                + "</tr>";
        }
		    $('#hospitals_table tbody').html(tableHtml);
    }).fail(function (jqXHR, textStatus, errorThrown) {
        document.getElementById('error_msg').innerHTML = jqXHR.responseText;
        if (errorThrown == "BAD REQUEST") {
        }
        if (errorThrown == "UNAUTHORIZED") {
        }
    });
}
$(document).ready(function() {
    // run the first time; all subsequent calls will take care of themselves
    setTimeout(load_hospital_data, 60000);
});

load_hospital_data();
