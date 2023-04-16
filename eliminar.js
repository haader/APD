var Manager;

(function($) {

    $(function() {
        var miURL='https://servicios3.abc.gob.ar/valoracion.docente/api/apd.oferta.encabezado/select?q=*%3A*&rows=6&sort=finoferta%20desc&json.nl=map&fq=descdistrito%3A%22lomas%20de%20zamora%22&wt=json&json.wrf=jQuery35102018777648182737_1680961794936&_=1680961794940';
        var suURL='https://servicios3.abc.gob.ar/valoracion.docente/api/apd.oferta.encabezado/',
        Manager = new AjaxSolr.Manager({
            solrUrl: 'https://servicios3.abc.gob.ar/valoracion.docente/api/apd.oferta.encabezado/',
            offers: []
        });
        

        Manager.addWidget(new AjaxSolr.ResultWidget({
            id: 'result',
            target: '#docs'
        }));
        Manager.addWidget(new AjaxSolr.PagerWidget({
            id: 'pagerTop',
            target: '#pagerTop',
            prevLabel: '<p class="izq"><i class="fas fa-angle-left"></i></p>',
            nextLabel: '<p class="der"><i class="fas fa-angle-right"></i></p>',
            innerWindow: 1,
            renderHeader: function(perPage, offset, total) {
                $('#pager-header-top').html($('<span></span>').text('mostrando ' + Math.min(total, offset + 1) + ' a ' + Math.min(total, offset + perPage) + ' de ' + total));
            }
        }));
        Manager.addWidget(new AjaxSolr.PagerWidget({
            id: 'pagerBottom',
            target: '#pagerBottom',
            prevLabel: '<p class="izq"><i class="fas fa-angle-left"></i></p>',
            nextLabel: '<p class="der"><i class="fas fa-angle-right"></i></p>',
            innerWindow: 1,
            renderHeader: function(perPage, offset, total) {
                $('#pager-header-bottom').html($('<span></span>').text('mostrando ' + Math.min(total, offset + 1) + ' a ' + Math.min(total, offset + perPage) + ' de ' + total));
            }
        }));



        Manager.addWidget(new AjaxSolr.AutocompleteWidget({
            id: 'autocompleteDistrito',
            target: '#autocompleteDistrito',
            fields: ['descdistrito'],
            modal: '.autocomplete-distrito-modal',
            input: '#autocompleteDistritoQuery'
        }));

        Manager.addWidget(new AjaxSolr.CurrentSearchWidget({
            id: 'currentDistritoSelection',
            target: '#currentDistritoSelection',
            field: 'descdistrito'
        }));

	Manager.addWidget(new AjaxSolr.TextWidgetIge({
            id: 'textIge',
            target: '#textIge',
	    fields: ['ige'],
            modal: '.text-ige-modal',
            input: '#textIgeQuery'
        }));
        Manager.addWidget(new AjaxSolr.CurrentSearchWidget({
            id: 'currentIgeSelection',
            target: '#currentIgeSelection',
	    field: 'ige'
        }));
        /* Manager.addWidget(new AjaxSolr.AutocompleteWidgetIge({
            id: 'autocompleteIge',
            target: '#autocompleteIge',
            fields: ['ige'],
            modal: '.autocomplete-ige-modal',
            input: '#autocompleteIgeQuery'
        }));

        Manager.addWidget(new AjaxSolr.CurrentSearchWidget({
            id: 'currentIgeSelection',
            target: '#currentIgeSelection',
            field: 'ige'
        })); */

	    Manager.addWidget(new AjaxSolr.TextWidgetEscuela({
            id: 'textEscuela',
            target: '#textEscuela',
	    fields: ['escuela'],
            modal: '.text-escuela-modal',
            input: '#textEscuelaQuery'
        }));
        Manager.addWidget(new AjaxSolr.CurrentSearchWidget({
            id: 'currentEscuelaSelection',
            target: '#currentEscuelaSelection',
	    field: 'escuela'
        }));

        Manager.addWidget(new AjaxSolr.AutocompleteWidget({
            id: 'autocompleteRama',
            target: '#autocompleteRama',
            fields: ['descnivelmodalidad'],
            modal: '.autocomplete-rama-modal',
            input: '#autocompleteRamaQuery'
        }));
        Manager.addWidget(new AjaxSolr.CurrentSearchWidget({
            id: 'currentRamaSelection',
            target: '#currentRamaSelection',
            field: 'descnivelmodalidad'
        }));
        Manager.addWidget(new AjaxSolr.AutocompleteWidget({
            id: 'autocompleteCargo',
            target: '#autocompleteCargo',
            fields: ['cargo'],
            modal: '.autocomplete-cargo-modal',
            input: '#autocompleteCargoQuery'
        }));
        Manager.addWidget(new AjaxSolr.CurrentSearchWidget({
            id: 'currentCargoSelection',
            target: '#currentCargoSelection',
            field: 'cargo'
        }));
        Manager.addWidget(new AjaxSolr.AutocompleteWidget({
            id: 'autocompleteEstado',
            target: '#autocompleteEstado',
            fields: ['estado'],
            modal: '.autocomplete-estado-modal',
            input: '#autocompleteEstadoQuery'
        }));
        Manager.addWidget(new AjaxSolr.CurrentSearchWidget({
            id: 'currentEstadoSelection',
            target: '#currentEstadoSelection',
            field: 'estado'
        }));

	Manager.addWidget(new AjaxSolr.TextWidgetFechaCierre({	
            id: 'textCierreOferta',	
            target: '#textCierreOferta',	
	    fields: ['finoferta'],	
            modal: '.text-cierreoferta-modal',	
            input: '#textCierreOfertaQuery'	
        }));	
        Manager.addWidget(new AjaxSolr.CurrentSearchWidget({	
            id: 'currentCierreOfertaSelection',	
            target: '#currentCierreOfertaSelection',	
	    field: 'finoferta'	
        }));	


        Manager.init();
        Manager.store.addByValue('q', '*:*');
        var initialFilters = [];
        if (typeof $.getUrlVar('distrito') != 'undefined') { initialFilters.push('descdistrito:' + decodeURIComponent($.getUrlVar('distrito'))); }
        if (typeof $.getUrlVar('estado') != 'undefined') { initialFilters.push('estado:' + $.getUrlVar('estado')); }
        if (initialFilters.length > 0) { Manager.store.addByValue('fq', initialFilters) }
        var params = {
            "q":"*:*",
            "json.wrf":"jQuery35109409287775542432_1680965489636",
            "json.nl":"map",
            "sort":"finoferta desc",
            "fq":"descdistrito:\"tres lomas\"",
            "rows":"6",
            "wt":"json",
            "_":"1680965489642"};
        for (var name in params) {
            Manager.store.addByValue(name, params[name]);
        }
        Manager.doRequest();
    });

    $(document).ready(function(){
        $('#popUpModal').modal('show');
    });

    $.fn.misPostulados = function(e) {
        if ($(e).hasClass('misPostuladosBtnActive')) {
            $(e).removeClass('misPostuladosBtnActive');
            Manager.store.remove('fq');
            Manager.doRequest();
            return;
        }
        $(e).removeClass('misPostuladosBtnActive');
        $(e).addClass('misPostuladosBtnActive');
        let url = 'mis.postulaciones';
        $.ajax({
            dataType: 'json',
            url: url,
            data: {
                'q': 'estadopostulacion:ACTIVA AND cuil:' + $('#logged').val(),
                'rows': 99999,
                'fq': 'estadopostulacion:ACTIVA AND cuil:' + $('#logged').val(),
                'fl': 'iddetalle',
                'json.nl': 'map',
                '_': new Date().getTime()
            },
            success: function(data) {
                let ofertas = 'iddetalle:',
                    i = 0;
                for (i, l = data.response.docs.length; i < l; i++) {
                    ofertas += (i == 0 ? '' : ' OR iddetalle:') + data.response.docs[i].iddetalle;
                }
                if (ofertas != 'iddetalle:') {
                    Manager.store.addByValue('fq', ofertas);
                    Manager.doRequest();
                } else {
                    Manager.store.addByValue('fq', ofertas+'999999999');
                    Manager.doRequest();
                }
            }
        });

    };

    $.fn.showIf = function(condition) {
        if (condition) {
            return this.show();
        } else {
            return this.hide();
        }
    }


    $.fn.privileged = function() {
        return (typeof $('#profile').val() == 'undefined' ? false : ($('#profile').val().includes("PAPD") || $('#profile').val().includes("S2972")));
    }

    $.fn.canDownload = function() {
        return (typeof $('#profile').val() == 'undefined' ? false : ($('#profile').val().includes("PAPD") || $('#profile').val().includes("PI025[01]")));
    }

    $.fn.puedeAnular = function(doc) {
        let esSAD = (typeof $('#profile').val() == 'undefined' ? false : $('#profile').val().includes("PI025[01]"));
        if (esSAD) {
            let esDistrito = false;
            $.each(JSON.parse(atob($('#token').val().split(".")[1])).user.metaPuestoTrabajo, function(k, v) {
                if ((v.substr(16, 5) == 'PI025' || v.substr(0, 5) == 'S2972') && (doc.escuela.substr(1, 3) == v.substr(12, 3))) {
                    esDistrito = true;
                    return false; //break each
                }
            });
            return esDistrito;
        } else {
            return false;
        }
    }

    $.fn.enc = function(argument) {
        return window.btoa(argument).replace(/=/g, '-').replace(/\//g, '_').replace(/\+/g, '.');
    }

    $.fn.download = function(e) {
        let ide = $(e).data('detalle'),
            idd = $(e).data('encabezado'),
            fn = encodeURI($(e).data('escuela') + $(e).data('area')),
            encodedUri = 'download?fn=' + fn + '&idd=' + idd + '&ide=' + ide + '&_t=' + new Date().getTime(),
            link = document.createElement("a");
        link.setAttribute("href", encodedUri);
        link.setAttribute("target", "_blank");
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    }

    $.fn.downloadFof = function(e) {
        let fof = e.fof;
        encodedUri = 'download/fof/?f=' + fof + '&_t=' + new Date().getTime(),
            link = document.createElement("a");
        link.setAttribute("href", encodedUri);
        link.setAttribute("target", "_blank");
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    }

    function habilitarHorasCierre() {	
	let fecha = $("#datepicker").val().split('/');	
	let fechaParseada = new Date(Date.parse(fecha[1]+'/'+fecha[0]+'/'+fecha[2]));	
	let fechaInicio = new Date(Date.parse('11/23/2022'));	
	if (fechaParseada < fechaInicio){	
	    $("#selectModal option").removeAttr("selected");	
	    $("#selectModal option").first().attr("selected", "selected");	
	    $("#selectModal option").filter("[value!=0]").prop('disabled', true);	
	    $("#selectModal option").filter("[value=0]").prop('disabled', false);	
	} else {	
	    $("#selectModal option").removeAttr("selected");	
	    $("#selectModal option").last().attr("selected", "selected");	
	    $("#selectModal option").filter("[value!=0]").prop('disabled', false);	
	    $("#selectModal option").filter("[value=0]").prop('disabled', true);	
	}	
    }	
    function habilitarHorasCierreFiltro() {	
	let fecha = $("#datepickerCierre").val().split('/');	
	let fechaParseada = new Date(Date.parse(fecha[1]+'/'+fecha[0]+'/'+fecha[2]));	
	let fechaInicio = new Date(Date.parse('11/23/2022'));	
	if (fechaParseada < fechaInicio){	
	    $("#selectCierreOferta option").removeAttr("selected");	
	    $("#selectCierreOferta option").first().attr("selected", "selected");	
	    $("#selectCierreOferta option").filter("[value!=0]").prop('disabled', true);	
	    $("#selectCierreOferta option").filter("[value=0]").prop('disabled', false);	
	} else {	
	    $("#selectCierreOferta option").removeAttr("selected");	
	    $("#selectCierreOferta option").last().attr("selected", "selected");	
	    $("#selectCierreOferta option").filter("[value!=0]").prop('disabled', false);	
	    $("#selectCierreOferta option").filter("[value=0]").prop('disabled', true);	
	}	
    }	
    function cargarCierres() {	
        let url = 'https://misaplicaciones6.abc.gob.ar/actos.publicos.digitales/api/cierres?callback=?';	
        $.post(url, {}, function(data, textStatus) {	
            if (data.success) {	
		$.each(data.success, function (i, item) {	
		    $('#selectModal').append($('<option>', { 	
			value: i,	
			text : item 	
		    }));	
		    $('#selectCierreOferta').append($('<option>', { 	
			value: i,	
			text : item 	
		    }));	
		});	
		habilitarHorasCierre();	
		habilitarHorasCierreFiltro();	
            };	
        }, "json");	
    }	
    cargarCierres();	
    $("#datepicker").on("change", function () {	
	habilitarHorasCierre();	
    });	
    $("#datepickerCierre").on("change", function () {	
	habilitarHorasCierreFiltro();	
    });	

    $.fn.confirmRepublicar = function(e) {
        $('#confirmTitle').empty().html('REPUBLICAR OFERTA');
        $('#confirmBody').empty().html('Desea republicar esta Oferta?');
        $('#confirmButton').empty();
        $("<a/>", {
            "class": "btn btn-danger",
            html: "REPUBLICAR",
            click: function() {
                $.fn.republicar(e);
            }
        }).appendTo("#confirmButton");
        $('#confirmModal').modal('show');
    }

    $.fn.republicar = function(e) {
        let url = 'https://misaplicaciones5.abc.gob.ar/wssAPD/APD/republicar/' + btoa($('#logged').val()) + '/' + btoa($(e).data('iddetalle'));
        window.open(url, '_blank');
    }

    $.fn.confirmRenunciada = function(e) {
        $('#confirmTitle').empty().html('OFERTA RENUNCIADA');
        $('#confirmBody').empty().html('Desea marcar como Renunciada esta Oferta?');
        $('#confirmButton').empty();
        $("<a/>", {
            "class": "btn btn-danger",
            html: "RENUNCIADA",
            click: function() {
                $.fn.renunciada(e);
            }
        }).appendTo("#confirmButton");
        $('#confirmModal').modal('show');
    }
    $.fn.renunciada = function(e) {
        let url = 'https://misaplicaciones6.abc.gob.ar/actos.publicos.digitales/api/renunciada.oferta?callback=?';
        $.post(url, { ide: $(e).data('iddetalle'), token: $('#token').val() }, function(data, textStatus) {
            if (data.success) {
                $.fn.hojaRuta(e);
            };
        }, "json");
    }

    $.fn.hojaRuta = function(e) {
        let url = 'https://misaplicaciones6.abc.gob.ar/actos.publicos.digitales/api/hoja.ruta?callback=?';
        $.post(
                url,
                { ide: $(e).data('idencabezado'),
                idd: $(e).data('iddetalle'),
                motivo: 'Renunciar',
                token: $('#token').val() },
                function(data, textStatus) {
                    $.fn.checkOfferNow();
                    $('#confirmModal').modal('hide');
                },
                "json"
        );
    }

    $.fn.confirmAnular = function(e) {
        $('#confirmTitle').empty().html('ANULAR OFERTA');
        $('#confirmBody').empty().html('Desea anular esta Oferta?');
        $('#confirmButton').empty();
        $("<a/>", {
            "class": "btn btn-danger",
            html: "ANULAR",
            click: function() {
                $.fn.anular(e);
            }
        }).appendTo("#confirmButton");
        $('#confirmModal').modal('show');
    }

    $.fn.anular = function(e) {
        let url = 'https://misaplicaciones6.abc.gob.ar/actos.publicos.digitales/api/anular.oferta?callback=?';
        $.post(url, { ide: $(e).data('iddetalle'), token: $('#token').val() }, function(data, textStatus) {
            if (data.success) {
                $.fn.checkOfferNow();
                $('#confirmModal').modal('hide');
            };
        }, "json");
    }
    $.fn.confirmDesierta = function(e) {
        $('#confirmTitle').empty().html('OFERTA DESIERTA');
        $('#confirmBody').empty().html('Desea dejar Desierta esta Oferta?');
        $('#confirmButton').empty();
        $("<a/>", {
            "class": "btn btn-danger",
            html: "DESIERTA",
            click: function() {
                $.fn.desierta(e);
            }
        }).appendTo("#confirmButton");
        $('#confirmModal').modal('show');
    }
    $.fn.desierta = function(e) {
        let url = 'https://misaplicaciones6.abc.gob.ar/actos.publicos.digitales/api/desierta.oferta?callback=?';
        $.post(url, { ide: $(e).data('iddetalle'), token: $('#token').val() }, function(data, textStatus) {
            if (data.success) {
                $.fn.checkOfferNow();
                $('#confirmModal').modal('hide');
            };
        }, "json");
    }
    $.fn.list = function(e) {
        let detalle = $(e).data('detalle'),
            oferta = $(e).data('oferta'),
            fn = encodeURI($(e).data('escuela') + $(e).data('area')),
            encodedUri = 'postulantes?oferta=' + oferta + '&detalle=' + detalle + '&_t=' + new Date().getTime(),
            link = document.createElement("a");
        link.setAttribute("href", encodedUri);
        link.setAttribute("target", "_blank");
        document.body.appendChild(link);
        link.click();
    }

    $.fn.checkOfferNow = function() {
        /* check status offer */
        $.getJSON(Manager.solrUrl + 'check/offer/?idop=' + $.fn.enc(Manager.offers.toString().replace(/,/g, '|')),
            function(data) {
                $.each(data, function(k, v) {
                    if (v.postulacion_idganador != '') {
                        $('#nombreganador'+v.iddetalle).empty().html((v.nombreganador) ? v.nombreganador.toUpperCase() : '');
                        $('#cuilganador'+v.iddetalle).empty().html(v.cuilganador);
			if (v.fechadesignacion !== undefined){
                            $('#fechadesignacion'+v.iddetalle).empty().html($.format.date(v.fechadesignacion , "dd/MM/yyyy"));
			}
			if (v.listadoorigenganador !== undefined){
			    $('#listadoorigenganador'+v.iddetalle).empty().html(v.listadoorigenganador);
			}
			if (v.puntajeganador !== undefined){
                            $('#puntajeganador'+v.iddetalle).empty().html(v.puntajeganador);
			}
                    }
                    let _this = $('#ofertaEncabezado' + v.iddetalle);
                    if (v.estado == 'Publicada') {
                        $(_this).removeClass('alert-danger');
                        $(_this).removeClass('alert-warning');
                        $(_this).html($(_this).html().replace(/FINALIZADA|CERRADA/, v.estado.toUpperCase())).addClass('alert-success');
                        $('.postularseBoton' + v.idoferta).show();
                    }
                    if (v.estado == 'Cerrada') {
                        $(_this).removeClass('alert-danger');
                        $(_this).removeClass('alert-success');
                        $(_this).html($(_this).html().replace(/FINALIZADA|PUBLICADA|ANULADA/, v.estado.toUpperCase())).addClass('alert-warning');
                        $('.postularseBoton' + v.idoferta).hide();
                    }
		    if (v.estado == 'Anulada') {
			let veloText = $('#ofertaVeloText' + v.iddetalle);
			$(veloText).empty().removeClass('cardVeloText');
                        $(_this).removeClass('alert-danger');
                        $(_this).removeClass('alert-success');
                        $(_this).html($(_this).html().replace(/FINALIZADA|CERRADA|DESIGNADA|RENUNCIADA/, v.estado.toUpperCase())).addClass('alert-warning');
                        $('.postularseBoton' + v.idoferta).hide();
			$('.renunciadaBoton' + v.idoferta).hide();
			$('.anularBoton' + v.idoferta).hide();
                    }
                    if (v.estado == 'Finalizada') {
                        $(_this).removeClass('alert-warning');
                        $(_this).removeClass('alert-success');
                        $(_this).html($(_this).html().replace(/CERRADA|PUBLICADA/, v.estado.toUpperCase())).addClass('alert-danger');
                        $('.postularseBoton' + v.idoferta).hide();
                    }
		    if (v.estado == 'RENUNCIADA') {
                        $(_this).removeClass('alert-info');
                        $(_this).html($(_this).html().replace(/DESIGNADA/, v.estado.toUpperCase())).addClass('alert-danger');
                        $('.renunciadaBoton' + v.idoferta).hide();
                    }
		    if (v.estado == 'Desierta') {
                        $(_this).removeClass('alert-danger');
                        $(_this).removeClass('alert-warning');
                        $(_this).html($(_this).html().replace(/FINALIZADA|CERRADA/, v.estado.toUpperCase())).addClass('alert-success').addClass('desierta');
                        $('.desiertaBoton' + v.idoferta).hide();
			$('.anularBoton' + v.idoferta).hide();
                    }
                })
            });
    }

    $.fn.checkOffer = function() {
        setInterval(function() {
            $.fn.checkOfferNow()
        }, 60000);
    }

    $.fn.checkPostulated = function() {
        /* check status postulated */
        if ($('#token').val() != 'undefined') {
            let p = Manager.offers.toString().replace(/,/g, '|') + '$' + $('#logged').val();
            $.getJSON('check/?idop=' + $.fn.enc(p),
                function(data) {
                    $.each(data, function(k, v) {
                        $('.ofertaId' + v.iddetalle).each(function() {
                            if ($(this).parent().parent().data('postulated') == 'none') {
                                $(this).parent().parent().data('postulated', v.iddetalle);
                                $(this).parent().parent().prepend('<div class="checkCardContainer"><div class="' + (v.estado == 'INACTIVA' ? 'checkInactiva' : 'check') + '" id="' + v.iddetalle + '" data-toggle="tooltip" data-placement="top" title="' + (v.estado == 'INACTIVA' ? 'Tu postulaci&oacute;n esta inactiva' : 'Ya te postulaste!') + '"><i class="fas fa-check"></i></div></div>');
                            }
                        })
                    })
                });
            //let interval = setInterval(function() {}, 10000);
        }
    }

    $('#banModal').modal('hide');
    $('#descargarOfertaModal').modal('hide');
    $('[data-toggle="tooltip"]').tooltip();
    $('#datepicker').datepicker({
        locale: 'es-es',
        format: 'dd/mm/yyyy'
    });
    $('#datepickerCierre').datepicker({	
        locale: 'es-es',	
        format: 'dd/mm/yyyy'	
    });

    $('#toolbarMisPostuladosBtn').click(function(argument) {
        $.fn.misPostulados(this);
    });
    $('#toolbarDescargarOfertaBtn').click(function(argument) {
        $('#descargarOfertaModal').modal('show');
    });
    $('#toolbarCargarOfertaBtn').click(function(argument) {
        let url = 'https://misservicios.abc.gob.ar/servicios/saml/auth/?rd=/wssAPD';
        window.open(url, '_blank');
    });

    $.fn.postularse = function(e) {
        let p1 = $.fn.enc($('#uid').val()),
        encodedUri = 'https://misaplicaciones5.abc.gob.ar/postulacionAPD/APD/' + p1 ;
        window.open(encodedUri, '_blank');
        // $.fn.checkPostulated();
    }
    $.fn.enc = function(argument) {
        return window.btoa(argument).replace(/=/g, '-').replace(/\//g, '_').replace(/\+/g, '.');
    }
    $('#toolbarPostularseBtn').click(function(argument){
        $.fn.postularse(this);
       });

    $.fn.postulate = function(e) {
        let p1 = $.fn.enc($('#logged').val()),
            p2 = $.fn.enc($(e).data('iddetalle')),
            encodedUri = 'https://misaplicaciones5.abc.gob.ar/wssAPD/APD/postularse/' + p1 + '/' + p2;
        window.open(encodedUri, '_blank');
        // $.fn.checkPostulated();
    }

    $('#downloadFof').click(function(argument) {
        let fofa = $('#datepicker').val().split('/');
        let horaCierre = $('#selectModal option:selected').text();	
        $.fn.downloadFof({ fof: fofa[2] + '-' + fofa[1] + '-' + fofa[0] + 'T' + horaCierre + ':00Z' });
    });

    $('#botonCierreOfertaQuery').click(function(argument){	
	if (document.getElementById('datepickerCierre').checkValidity() && document.getElementById('selectCierreOferta').checkValidity()){	
	    let fecha = $('#datepickerCierre').val().split('/');	
	    let horaCierre = $('#selectCierreOferta option:selected').text();	
	    $('#textCierreOfertaQuery').val(fecha[2] + '-' + fecha[1] + '-' + fecha[0] + 'T' + horaCierre );	
	    var e = $.Event( "keydown", { which: 13 } );	
	    $('#textCierreOfertaQuery').trigger(e);	
	    $('#modalCierreOfertaFilter').modal('toggle');	
	} else {	
	    document.getElementById('datepickerCierre').reportValidity();	
	    document.getElementById('selectCierreOferta').reportValidity();	
	}	
});

    $('.button-checkbox').each(function() {

        // Settings
        var $widget = $(this),
            $button = $widget.find('button'),
            $checkbox = $widget.find('input:checkbox'),
            color = $button.data('color'),
            settings = {
                on: {
                    icon: 'far fa-check-circle'
                },
                off: {
                    icon: 'far fa-circle'
                }
            };

        // Event Handlers
        $button.on('click', function() {
            $checkbox.prop('checked', !$checkbox.is(':checked'));
            $checkbox.triggerHandler('change');
            updateDisplay();
        });
        $checkbox.on('change', function() {
            updateDisplay();
        });

        // Actions
        function updateDisplay() {
            var isChecked = $checkbox.is(':checked');

            // Set the button's state
            $button.data('state', (isChecked) ? "on" : "off");

            // Set the button's icon
            $button.find('.state-icon')
                .removeClass()
                .addClass('state-icon ' + settings[$button.data('state')].icon);

            // Update the button's color
            if (isChecked) {
                $button
                    .removeClass('btn-default')
                    .addClass('btn-' + color + ' active');
            } else {
                $button
                    .removeClass('btn-' + color + ' active')
                    .addClass('btn-default');
            }
        }

        // Initialization
        function init() {
            updateDisplay();
            // Inject the icon if applicable
            if ($button.find('.state-icon').length == 0) {
                $button.prepend('<i class="state-icon ' + settings[$button.data('state')].icon + '"></i> ');
            }
        }
        init();
    });

})(jQuery);

// Arguments :
//  verb : 'GET'|'POST'
//  target : an optional opening target (a name, or "_blank"), defaults to "_self"
window.io = {
    open: function(verb, url, data, target) {
        var form = document.createElement("form");
        form.action = url;
        form.method = verb;
        form.target = target || "_self";
        if (data) {
            for (var key in data) {
                var input = document.createElement("textarea");
                input.name = key;
                input.value = typeof data[key] === "object" ?
                    JSON.stringify(data[key]) :
                    data[key];
                form.appendChild(input);
            }
        }
        form.style.display = 'none';
        document.body.appendChild(form);
        form.submit();
        document.body.removeChild(form);
    }
};
