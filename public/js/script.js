$(document).ready(function(){
	// alert("Hello world");
	var host = "https://apitestkibernum.herokuapp.com/api/search";
	var limit = 50;

	function activate(){
		$('[data-button=search]').click(function(){
			$('[data-model=resultado]').empty();
			searchInfo();
		})
		
		$('[data-button=estadisticas]').click(function(event) {
			getEstadisticas();
		});
		
	}

	function getEstadisticas(){
		var respuesta = '';
		$.ajax({
			url: host,
			type: 'GET',
			dataType: 'json',
			contentType: 'application/json',
    		CrossDomain:true,
		})
		.done(function(data) {
			console.log("success");
			respuesta = data.analisis;
			setEstadisticas(respuesta);
			$('[data-modal=estadisticas]').modal();
		})
		.fail(function(xhr) {
			console.log("error");
		})
		.always(function() {
			console.log("complete");
		});
		// return respuesta;
	}


	function searchInfo(){
		var searchText = $('[data-attribute=keyword]').val();
		var dataSend = {
			keyword: searchText,
			limit: limit
		}
		$.ajax({
			url: host,
			type: 'POST',
			dataType: 'json',
			data: JSON.stringify(dataSend),
			contentType: 'application/json',
			async:false,
    		CrossDomain:true,
		})
		.done(function(data) {
			console.log(data);
			setResultado(data.result);
			console.log("success");
		})
		.fail(function(xhr) {
			console.log("error");
		})
		.always(function() {
			console.log("complete");
		});
		
	}

	function setEstadisticas(data){
		var table = $('[data-modal=estadisticas]').find('[data-modal=tablaresumen]');
		table.find("tbody").empty();

		$.each(data, function(index, val) {
			var tableData = "<tr><td>" + val[0] + "</td><td>" + val[1] + "</td></tr>";
			table.find("tbody").append(tableData);
		});
	}

	function setResultado(data){
		var table = $('<table></table>');
		var thead = $('<thead></thead>');
		var titulo = '<tr><th>#</th><th>Nombre</th></tr>';
		table.addClass('table');
		thead.append(titulo);
		table.append(thead);
		table.append($("<tbody></tbody>"));
		table.find("tbody").empty();

		$.each(data, function(index, val) {
			var tableData = "<tr><td>" + val.id + "</td><td>" + val.nombre + "</td></tr>";
			table.find("tbody").append(tableData);
		});
		$('[data-model=resultado]').append(table);
	}

	function init(){
		$('[data-model=resultado]').empty();
		activate();

	};
	

	init();
});