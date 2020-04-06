function load_data(){
	  $.ajax({
        type: "GET",
        url: "https://api.rootnet.in/covid19-in/stats/latest"
    }).done(function (res) {
        var totalDeaths = res.data.summary.deaths;
        var totalRecovered = res.data.summary.discharged;
        var total = res.data.summary.total;
        var tableHtml='';
        for (var i = 0; i < res.data.regional.length; i++){
            tableHtml += "<tr>"
				        +"<td>"+ res.data.regional[i].loc +"</td>"
                + "<td>"+ res.data.regional[i].deaths +"</td>"
				        +  "<td>"+ res.data.regional[i].discharged +"</td>"
                + "</tr>";

        }
		    $('#total_cases').html(total);
        $('#deaths').html(totalDeaths);
        $('#recovered').html(totalRecovered);
        $('#state_data tbody').html(tableHtml);
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
    setTimeout(load_data, 60000);
});

load_data();
