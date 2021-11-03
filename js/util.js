var _LOCALE_ = 'es';
var _CERRAR_ = 'Cerrar';
var _CLASS_BTN_DEFAULT = 'btn-default';
var Resultado_Controles_X_Agrupador = [];
var _PROBLEMA_ = 'Problema';
var _RESTRICCION_ = 'RESTRICCION';
var _SOLUCION_ = 'Solución';


function fg_mensaje_problema_tecnico(e) {

    bootbox.dialog({
        message: 'Existe un problema ténico, por favor espere e intente nuevamente o avise a soporte.',
        title: '<span style="color:white;">' + 'Problema técnico' + '</span>',
        locale: _LOCALE_,
        closeButton: true,
        onEscape:true,
        buttons: [{
            label: _CERRAR_,
            className: _CLASS_BTN_DEFAULT,
            callback: function () { }
        }]
    }).css({ 'display': 'flex' }).find('.modal-header').removeClass('modal-header').addClass('modal-header-negro');//esta linea es para que el encabezado sea negro    
}

/**
 * Metodo que muestra mensaje de pregunta; muestra la pregunta y espera se le indica que funcion ejecutar cuando la respuesta sea verdadera
 * @param {any} _mensaje_aviso Indique el mensaje a mostrar, la pregunta ¿Esta seguro de continuar? ya este incluida en el metodo
 * @param {any} _nombre_funcion_ejecutar Indique el nombre de la funcion a ejecutar en caso de que el Login acepte 
 */
 function fg_mensaje_pregunta(_mensaje_aviso, _nombre_funcion_ejecutar_true, _nombre_funcion_ejecutar_false) {
    bootbox.confirm({
        title: '<span style="color:white;">' + "Pregunta" + '</span>',
        message: '<div class="row">'
            + '<div class="col-md-2"><i class="fa fa-question-circle mensaje-pregunta" style="font-size:40px;"></i>' + '</div>'
            + '<div class="col-md-10"><label class="etiqueta-mensajes" style="font-size:18px;">' + _mensaje_aviso + '</label>'
            + '<br><label class="etiqueta-mensajes" style="font-size:18px;" >' + '¿Esta seguro de continuar?' + '</label>'
            + '</div>'
            + '</div>',

        buttons: {

            confirm: {
                label: '<i class="fa fa-check"></i> SI',
                className: _CLASS_BTN_SUCCESS
            },
            cancel: {
                label: '<i class="fa fa-times"></i> NO',
                className: _CLASS_BTN_DANGER
            }
        },
        callback: function (result) {
            if (result == true) {
                var fn = window[_nombre_funcion_ejecutar_true];
                if (typeof fn === 'function') {
                    fn();
                }
            }
            else {
                var fn = window[_nombre_funcion_ejecutar_false];
                if (typeof fn === 'function') {
                    fn();
                }

            }
        }
    }).css({ 'display': 'flex' }).find('.modal-header').removeClass('modal-header').addClass('modal-header-danger').find('.modal-title').addClass('float-left');//esta linea es para que el encabezado sea negro   

    //}).css({ 'display': 'flex' }).find('.modal-header').removeClass('modal-header').addClass('modal-header-danger').find('.modal-title').addClass('float-left');//esta linea es para que el encabezado sea negro   

}

function fg_mensaje_pregunta_especial(_mensaje_aviso,_pregunta_especial,_nombre_funcion_ejecutar_true, _nombre_funcion_ejecutar_false) {
    bootbox.confirm({
        title: '<span style="color:white;">' + "Pregunta" + '</span>',
        message: '<div class="row">'
            + '<div class="col-md-2"><i class="fa fa-question-circle mensaje-pregunta" style="font-size:40px;"></i>' + '</div>'
            + '<div class="col-md-10"><label class="etiqueta-mensajes" style="font-size:18px;">' + _mensaje_aviso + '</label>'
            + '<div class="col-md-10"><label class="etiqueta-mensajes font-weight-bold" style="font-size:14px;">' + _pregunta_especial + '</label>'
            //+ '<br><label class="etiqueta-mensajes" style="font-size:18px;" >' + '¿Esta seguro de continuar?' + '</label>'
            + '</div>'
            + '</div>',

        buttons: {

            confirm: {
                label: '<i class="fa fa-check"></i> SI',
                className: _CLASS_BTN_SUCCESS
            },
            cancel: {
                label: '<i class="fa fa-times"></i> NO',
                className: _CLASS_BTN_DANGER
            }
        },
        callback: function (result) {
            if (result == true) {
                var fn = window[_nombre_funcion_ejecutar_true];
                if (typeof fn === 'function') {
                    fn();
                }
            }
            else {
                var fn = window[_nombre_funcion_ejecutar_false];
                if (typeof fn === 'function') {
                    fn();
                }

            }
        }
    }).css({ 'display': 'flex' }).find('.modal-header').removeClass('modal-header').addClass('modal-header-danger').find('.modal-title').addClass('float-left');//esta linea es para que el encabezado sea negro   

    //}).css({ 'display': 'flex' }).find('.modal-header').removeClass('modal-header').addClass('modal-header-danger').find('.modal-title').addClass('float-left');//esta linea es para que el encabezado sea negro   

}


/**
 * Metodo que muestra un mensaje de tipo alert para indicar problemtaticas que debera de resolver el Login
 * @param {any} _Modulo_Configuracion Indique un modulo o titulo
 * @param {any} _Problema Descrba el problema
 * @param {any} _Restriccion Indique la restrción, no continuar o se cerrra la ventana por ejemplo.
 * @param {any} _Solucion Indique la solución para corregir el problema
 */
function fg_mensaje_aviso_restriccion(_Modulo_Configuracion, _Problema, _Restriccion, _Solucion) {
    bootbox.dialog({
        message: '<div class="row">'
            + '<div class="col-md-1"><i class="fa fa-exclamation-triangle mensaje-restriccion" style="font-size:32px;"></i>' + '</div>'
            + '<div class="col-md-11"><label class="etiqueta-mensajes"><strong>' + _PROBLEMA_ + "</strong>" + '</label>: &nbsp;&nbsp;' + _Problema
            + '<br><label class="etiqueta-mensajes"><strong>' + 'Restricción' + "</strong>" + '</label>: &nbsp;&nbsp;' + _Restriccion
            + '<br><label class="etiqueta-mensajes"><strong>' + _SOLUCION_ + "</strong>" + '</label>: &nbsp;&nbsp;' + _Solucion
            + '</div>'
            + '</div>',
        title: '<span style="color:white;">' + _Modulo_Configuracion + '</span>',
        locale: _LOCALE_,
        closeButton: true,
        buttons: [{
            label: _CERRAR_,
            className: _CLASS_BTN_DEFAULT,
            callback: function () { }
        }]
    }).find('.modal-header').removeClass('modal-header').addClass('modal-header-aviso-restriccion');//esta linea es para que el encabezado sea negro

        //}).css({ 'display': 'flex' }).find('.modal-header').removeClass('modal-header').addClass('modal-header-aviso-restriccion');//esta linea es para que el encabezado sea negro
}



/** Metodo para obtener un listado de los controles contenidos en un agrupador o div agrupador
 * @param {any} _HTMLCollention Indique la colección de elemento HTML
 */
 function fg_controles_x_agrupador(_HTMLCollention) {
    //Iteramos cada elemento
    for (var i = 0; i < _HTMLCollention.length; i++) {
        var sigue = _HTMLCollention[i].tagName;

        //Verificamos si el elmento tiene un ID; se considerara que todos los elementos que tengan ID podran accesarse para obtener sus propiedades o generr un evento
        if (_HTMLCollention[i].id != undefined) {
            //Agregamos el control a array auxiliar
            Resultado_Controles_X_Agrupador.push(_HTMLCollention[i]);
        }
        //Verificamos si el elemento tiene mas elementos para tambien integrarlos en la lista
        if (_HTMLCollention[i].children != undefined) {

            //Si tiene mas elementos se invoca nuevamente a la funcion para recorlectar los controles
            fg_controles_x_agrupador(_HTMLCollention[i].children);
        }

    }
}

/**
 * Metodo para obtener un objeto con la lista de los controles que contiene el agrupador indicado
 * la lista ya contiene como tal los controles por lo que puede accesarse directamente a sus propiedades
 * @param {any} _Agrupador Indique el ID del control agrupador
 */
 function fg_obtener_controles_agrupador(_Agrupador) {
    //Creamos el objeto que recibira la lista de los controles
    arreglo_Controles = new Object();

    //Es un arreglo auxiliar en el que almacenaremos transitivamente los controles
    Resultado_Controles_X_Agrupador = []; //Libero la variable
    var control_agrupador = document.getElementById(_Agrupador);
    if (control_agrupador != undefined) {

        //Obtenemos una lista de elementos del agrupador
        var Elementos_Agrupados = document.getElementById(_Agrupador).children;
        //Se va al metodo que realiza todo el proceso para ir recolectando los controles
        fg_controles_x_agrupador(Elementos_Agrupados);

        //El resultado de la recolección la pasamos al objecto para poder accesar los contoles en un estilo de clase
        for (var i = 0; i < Resultado_Controles_X_Agrupador.length; i++) {
            var control = Resultado_Controles_X_Agrupador[i];
            arreglo_Controles[control.id] = control;
        }

    }
    else {
        fg_mensaje_problema_tecnico(null);
    }

    Resultado_Controles_X_Agrupador = []; //Libero la variable

    return arreglo_Controles;
}

function fg_setIFRAMEControls(_Agrupador) {
    try {

        var CONTROLES = new Object();
        CONTROLES.controls = fg_obtener_controles_agrupador(_Agrupador);
        CONTROLES.this = document.getElementById(_Agrupador);

    }
    catch (e) {
        fg_mensaje_problema_tecnico(e);
    }

    return CONTROLES;
}
