var PAGECONTROLS;
var OBJCaptura;
var OBJImageStpes = [
    'images/banks-store_545x545.png' //0
    , 'images/banks.png'             //1
    , 'images/analysis.png'          //2
    , 'images/secure.png'            //3
    , 'images/bureau.png'            //4
];

var DtMeses = [
    { id: 1, mes: 'Enero' }
    , { id: 2, mes: 'Febrero' }
    , { id: 3, mes: 'Marzo' }
    , { id: 4, mes: 'Abril' }
    , { id: 5, mes: 'Mayo' }
    , { id: 6, mes: 'Junio' }
    , { id: 7, mes: 'Julio' }
    , { id: 8, mes: 'Agosto' }
    , { id: 9, mes: 'Septiembre' }
    , { id: 10, mes: 'Octubre' }
    , { id: 11, mes: 'Noviembre' }
    , { id: 12, mes: 'Diciembre' }
];
var DtColonias;



/**
 * Tuna Signup Form Wizard
 * @type Javascript Class
 */

var lunaWizard = {
    stepCount: 0,
    /**
     * Resize for Responsive
     */
    setResponsive: function () {
        var self = this;
        var windowHeight = $(window).height();
        var windowWidth = $(window).width();
        windowHeight = windowHeight > 360 ? windowHeight : 360;

        var stepsfooterbanner = $(".steps-footer-banner").height();
        var lunaContainer = $(".luna-signup-container");
        var lunaLeft = $(".luna-signup-left");
        var lunaLeftOverlay = $(".luna-signup-left-overlay");
        var container = $(".container");

        if (windowWidth >= 768) {
            lunaContainer.add(lunaLeft).add(lunaLeftOverlay).innerHeight(windowHeight - (stepsfooterbanner + 18));
        } else {
            lunaContainer.add(lunaLeft).add(lunaLeftOverlay).css("height", "auto");
        }


        //lunaLeftOverlay.width(($(window).width()-$(".container").width())/2+10);        
        lunaLeftOverlay.width(windowWidth * .10);
        container.width(windowWidth * .80);

    },
    /**
     * Change Step
     * @param int currentStep
     * @param int nextStep
     * @returns {void|Boolean}
     */
    changeStep: function (currentStep, nextStep) {
        var self = this;
        var permitirAvanzar = true;


        $('html,body').animate({ scrollTop: 0 }, 'slow');

        if (nextStep <= 0 || nextStep > this.stepCount) {
            return false;
        }

        // var form = $("form[name='signupForm']");
        // form.validate({
        //     rules: {},
        //     ignore: ":hidden",
        //     errorPlacement: function (error, element) {

        //         var formGroup = element.parents(".form-group");
        //         formGroup.find(".errorIcon").remove();
        //         formGroup.append('<span class="errorIcon"><i class="icon icon-info"></i></span>');
        //         element.parents(".form-group").find(".errorIcon").show().find("i").attr("title", error.text()).tooltip({ container: 'body' });
        //     }
        // })



        //Change Step
        if (nextStep > currentStep) {
            // if (!form.valid()) {
            //     console.log("form is invalid");
            //     return;
            // }


            /************  Validación de captura  *******/
            PAGECONTROLS.controls.lunaStepsFooterError.innerHTML = `&nbsp;`;
            switch (currentStep) {
                case '1':
                    if (OBJCaptura.tipoCredito == null) {
                        PAGECONTROLS.controls.lunaStepsFooterError.innerHTML = `Por favor debe seleccionar una opción para avanzar.`;
                        permitirAvanzar = false;
                    }
                    break;
                case '2':
                    if (OBJCaptura.valorAproximado == null) {
                        PAGECONTROLS.controls.lunaStepsFooterError.innerHTML = `Por favor debe seleccionar una opción para avanzar.`;
                        permitirAvanzar = false;
                    }
                    break;
                case '3':
                    if (PAGECONTROLS.controls.txtMonto.value == null || PAGECONTROLS.controls.txtMonto.value == 0) {
                        PAGECONTROLS.controls.lunaStepsFooterError.innerHTML = `Por favor debe capturar un monto.`;
                        permitirAvanzar = false;
                    }
                    break;
                case '4':
                    if (!fg_valida_captura_seccion('stepBody_4')) {
                        PAGECONTROLS.controls.lunaStepsFooterError.innerHTML = `Por favor debe capturar su nombre y su primer apellido.`;
                        permitirAvanzar = false;
                    }

                    break;
                case '5':
                    if (OBJCaptura.Genero == null) {
                        PAGECONTROLS.controls.lunaStepsFooterError.innerHTML = `Debe indicar su genero.`;
                        permitirAvanzar = false;
                    }

                    if (fg_isEmptyOrNull(PAGECONTROLS.controls.txtfechaNacimientoDia.value)
                        || fg_isEmptyOrNull(PAGECONTROLS.controls.cmbfechaNacimientoMes.value)
                        || fg_isEmptyOrNull(PAGECONTROLS.controls.txtfechaNacimientoAnio.value)
                    ) {

                        fg_mostrar_error(PAGECONTROLS.controls.gpoDatefechaNacimiento, 'Dato obligatorio.');
                        permitirAvanzar = false;
                    }
                    else if(PAGECONTROLS.controls.txtfechaNacimientoAnio.value.toString().length != 4){
                        fg_mostrar_error(PAGECONTROLS.controls.gpoDatefechaNacimiento, 'El año debe ser de 4 digitos');
                        permitirAvanzar = false;
                    }
                    else if(PAGECONTROLS.controls.txtfechaNacimientoAnio.value < 1900 ){
                        fg_mostrar_error(PAGECONTROLS.controls.gpoDatefechaNacimiento, 'El año no es valido.');
                        permitirAvanzar = false;
                    }

                    break;
                case '6':
                    if (!fg_valida_captura_seccion('stepBody_6')) {
                        permitirAvanzar = false;
                    }
                    else if(!fg_validarRFC(PAGECONTROLS.controls.txtRFC.value)){
                        permitirAvanzar = false;
                    }

                    break;
                case '7':
                    if (!fg_valida_captura_seccion('stepBody_7')) {
                        permitirAvanzar = false;
                    }


                    break;
                case '8':
                    if (!fg_valida_captura_seccion('stepBody_8')) {
                        permitirAvanzar = false;
                    }
                    else {
                        if (!fg_validarEmail(PAGECONTROLS.controls.txtCorreo.value)) {
                            fg_mostrar_error(PAGECONTROLS.controls.txtCorreo, 'El formato es incorrecto.');
                            permitirAvanzar = false;
                        }
                    }

                    break;
                case '9':
                    if (!fg_valida_captura_seccion('stepBody_9')) {
                        permitirAvanzar = false;
                    }

                    if (permitirAvanzar && !OBJCaptura.codigoAutenticado) {
                        permitirAvanzar = false;
                         irAutenticarCodigoValidacion()
                    }

                    break;

                case '10':
                    if (!fg_valida_captura_seccion('stepBody_10')) {
                        permitirAvanzar = false;
                    }
                    else {
                        if (!fg_isChecked_BtnChk(PAGECONTROLS.controls.btnChkAutorizo)) {
                            fg_mostrar_error(PAGECONTROLS.controls.btnChkAutorizo, 'Debe autorizar para continuar.');
                            permitirAvanzar = false;
                        }

                    }
                    break;
            }

            if (!permitirAvanzar) {
                return;
            }

            $(".step-active").removeClass("step-active").addClass("step-hide");
        } else {
            $(".step-active").removeClass("step-active");
        }



        var nextStepEl = $(".step[data-step-id='" + nextStep + "']");
        nextStepEl.removeClass("step-hide").addClass("step-active");

        var stepCountsEl = $(".steps-count");
        if (nextStep === self.stepCount) {
            stepCountsEl.html("");
            $(".button-container").fadeOut();
            $(".toNext").fadeOut();
            var stepConfirm = $(".step-confirm");

            // form.find("input[type='text'],input[type='email'],input[type='tel'],select, textarea").each(function () {
            //     stepConfirm.find("." + $(this).attr("name")).text($(this).val());
            // });

            // form.find("input[type='radio']").each(function () {
            //     if ($(this).prop("checked")) {
            //         stepConfirm.find("." + $(this).attr("name")).text($(this).val());
            //     }
            // });



            /*
             var hobbies = $("input[name='tn_hobbies[]']:checked").map(function () {
             return this.value;
             }).get();
             */
        } else {
            $(".button-container").fadeIn();
            $(".toNext").fadeIn();
        }

        if (nextStep == 1) {
            $("body").addClass("background-image");
            $(".button-container").hide();
        } else {
            $("body").removeClass("background-image");
        }

        //Current Step Number update
        stepCountsEl.find("span.step-current").text(nextStep);
        $(".dots span").removeClass("selected");
        $(".dots li:nth-child(" + nextStep + ") span").addClass("selected");

        //Hide prevButton if we are in first step
        var prevStepEl = $(".prevStep");
        if (nextStep === 1) {
            prevStepEl.hide();
        } else {
            prevStepEl.css("display", "inline-block");
        }

        if (PAGECONTROLS.controls.stepBody_9.className.indexOf('step-active') != -1) {
            registrarProspecto();
        }


        if (PAGECONTROLS.controls.stepBody_11.className.indexOf('step-active') != -1) {

            PAGECONTROLS.controls.stepFooter.hidden = true;
            validarCredito();
        }


    },
    /**
     * Show Validation Message
     * @param HtmlElement el
     * @returns void
     */
    setInputError: function (el) {
        el.addClass("input-error");
        el.parents(".step").find(".help-info").hide();
        el.parents(".step").find(".help-error").show();
    },
    /**
     * Check email is valid or not
     * @param String value
     * @returns Boolean
     */
    isEmail: function (value) {
        value = value.toLowerCase();
        var reg = new RegExp(/^[a-z]{1}[\d\w\.-]+@[\d\w-]{3,}\.[\w]{2,3}(\.\w{2})?$/);
        return reg.test(value);
    },
    /**
     * Executes Signup Wizard
     * @returns void
     */
    start: function () {
        var self = this;

        //Jquery Uniform Plugin
        $(".luna-signup-container input[type='checkbox'],.luna-signup-container input[type='radio'], .select").uniform();

        //Jquery Mask Plugin
        $('.luna-signup-container input[name="phone"],.luna-signup-container input[name="tn_phone"]').mask('000 000 00 00');

        //Datepicker
        $(".datepicker").datepicker().on('changeDate', function (e) {
            $(this).datepicker('hide');
            $(this).focus().parents(".form-group").find(".errorIcon").remove();
        });

        // Focuses on name input, when page loaded
        window.setTimeout(function () {
            $("#tn_name").focus();
        }, 500);

        // Responsive
        self.setResponsive();
        $(window).resize(function () {
            self.setResponsive();
        });

        // Steps Count
        self.stepCount = $(".luna-steps .step").length;
        $(".luna-steps .step").each(function () {
            $(".dots").append("<li><span></span></li>")
            $(".step-count").text(self.stepCount);
        });
        $(".dots span").first().addClass("selected");

        // Next Step
        $(".nextStep").on("click", function () {
            var currentStep = $(".step-active").attr("data-step-id")
            var nextStep = parseFloat(currentStep) + 1;
            self.changeStep(currentStep, nextStep);
        });

        // Prev Step
        $(".prevStep").on("click", function () {
            var currentStep = $(".step-active").attr("data-step-id")
            var nextStep = parseFloat(currentStep) - 1;
            self.changeStep(currentStep, nextStep);
        });

        // Confirm Details - Show Input
        var stepConfirm = $(".step-confirm");
        stepConfirm.find(".input-container a.editInput").on("click", function () {
            $(this).parent().find("input").focus();
        });

        // Confirm Details - Show Password
        stepConfirm.find(".input-container a.showPass").on("mousedown", function () {
            $(this).parent().find("input").attr("type", "text");
        }).mouseup(function () {
            $(this).parent().find("input").attr("type", "password");
        });

        stepConfirm.find(".input-container input").on("focus", function () {
            $(this).parent().find("a").hide();
        });

        stepConfirm.find(".input-container input").on("focusout", function () {
            if (!$(this).hasClass("confirm-input-error")) {
                $(this).parent().find("a").show();
            }
        })

        stepConfirm.find("select").on('shown.bs.select', function (e) {
            $(this).parents(".form-group").find("a.editInput").hide();
        }).on('hidden.bs.select', function (e) {
            $(this).parents(".form-group").find("a.editInput").show();
        });

        //Press Enter and go to nextStep
        $(".step input").not(".step-confirm input").on("keypress", function (e) {
            if (e.keyCode === 13) {
                $(".button-container .nextStep").click();
            }
        });

        var signupForm = $("form[name='signupForm']");
        //Finish Button
        $(".finishBtn").on("click", function () {
            signupForm.submit();
        })

        // Form Submit
        signupForm.on("submit", function (e) {

            e.preventDefault();

            swal({
                title: null,
                text: "<img class='luna_loading' src='images/loading.svg'/> Saving...",
                html: true,
                showConfirmButton: false
            });

            //Send form to php file
            $.post("smtp.php", $(this).serialize(), function (result) {
                if (result.success) {
                    swal({
                        title: "Success",
                        text: "Your information submitted successfully!",
                        type: "success",
                        confirmButtonText: "Ok"
                    });
                } else {
                    swal({
                        title: "Error!",
                        text: result.msg,
                        type: "error",
                        confirmButtonText: "Ok"
                    });
                }
            }, 'json');

        });


    },
}

function getTemplateSeccionBodyStep(_questionTitle, _descripcion, _body, _itemImage) {
    var tag = `
    <div class="row">
    <div class="col-xs-12 col-sm-12 col-md-5 col-lg-6">
        <div class="step-title">${_questionTitle}</div>
        <div class="step-subtitle">${_descripcion}</div>
        <div class="step-body">
            ${_body}
        </div>
    </div>
    <div class="col-xs-12 col-sm-12 col-md-7 col-lg-6">
        <img class='step-image' src='${OBJImageStpes[_itemImage]}' alt="banks store" />
    </div>
    </div>
    `;

    return tag;
}

function getTemplateBtnTitleSubTitle(_idBtn, _title, _subtitle) {

    var tag = `
               <button id="${_idBtn}" type="button" class="btn bg-segundo-plano btn-block">
                  <span id="span${_idBtn}">${_title}</span>
                  <small id="small${_idBtn}">${_subtitle}</small>
               </button>    
             `;


    return tag;
}

function getTemplateTextBoxNum(_idTxt, _Valor, _Etiqueta, _Propiedad_Adicional) {

    var tag = `
                <div class="form-group">
                    <label for="${_idTxt}">${_Etiqueta}</label>
                    <input type="number" class="form-control" id="${_idTxt}" value="${_Valor}" ${_Propiedad_Adicional}>
                </div>
              `;


    return tag;
}
function getTemplateTextBox(_idTxt, _Valor, _Etiqueta, _Propiedad_Adicional) {

    var tag = `
                <div class="form-group">
                    <label for="${_idTxt}">${_Etiqueta}</label>
                    <input type="text" class="form-control" id="${_idTxt}" value="${_Valor}" ${_Propiedad_Adicional} autocomplete="off" />
                </div>
              `;


    return tag;
}

function getTemplateFechaNacimiento(_id) {
    var tag = `
    <section id='gpoDate${_id}'  class="input_date-old">
    <div class="form-group">
        <label class="etiqueta">Fecha de Nacimiento:</label>
        <div class="input-group date-old">
            <input type="number" class="form-control" id="txt${_id}Dia" required="" min="1" max="31" step="1" placeholder="Día"/> <span>/</span>
            <select class="form-control" id="cmb${_id}Mes" required=""></select> <span>/</span>
            <input type="number" class="form-control" id="txt${_id}Anio" required="" max="2021" min="1900" step="1" placeholder="Año"/>
        </div>
    </div>
</section>
`;

    return tag;
}

function getTemplateSelect(_idCmb, _Valor, _Etiqueta, _Propiedad_Adicional) {

    var tag_etiqueta = `${_Etiqueta}`;
    if (_Propiedad_Adicional != null) {
        if (_Propiedad_Adicional.indexOf('required') != -1) {
            //Es requerido
            tag_etiqueta = `* ${_Etiqueta}`;
        }
    }


    var tag = `
                <div class="form-group">
                    <label for="${_idCmb}">${tag_etiqueta}</label>
                    <select class="form-control" id="${_idCmb}" value="${_Valor}" ${_Propiedad_Adicional}></select>
                </div>
              `;

    return tag;
}

function getTemplateBtnChk(_idBtnChk, _isChecked, _Etiqueta, _Propiedad_Adicional) {

    var tag_class_check = _CLASS_UNCHECKED_;

    if (_isChecked) {
        tag_class_check = _CLASS_CHECKED_;
    }

    var tag = `
                <div class="form-group">
                    <label style="display:block;">&nbsp;</label>
                    <label for="${_idBtnChk}" class="mb-1 font-weight-bold">${_Etiqueta}</label>
                    <button id="${_idBtnChk}" type="button" class="btn btnchk"><i class="${tag_class_check}"></i></button>
                </div>

              `;

    return tag;
}




function getTemplateStep_1() {

    var stepBody_1 = document.getElementById('stepBody_1');
    var tagOpciones = getTemplateBtnTitleSubTitle('btnSelAdquirir', 'Adquirir un inmueble', 'Crédito para comprar una vivienda.');
    tagOpciones += getTemplateBtnTitleSubTitle('btnSelMejorar', 'Mejorar mi crédito actual', 'Refinanciar tu crédito hipotecario.');
    tagOpciones += getTemplateBtnTitleSubTitle('btnSelObtener', 'Obtener liquidez', 'Utilizando tu propiedad como garantía.');


    var tagStep = getTemplateSeccionBodyStep('¿Que estas buscando?'
        , 'Elige el tipo de crédito que deseas para ofrecerte una solución adecuada a tus necesidades.'
        , tagOpciones
        , 0
    );

    stepBody_1.innerHTML = tagStep;
}

function getTemplateStep_2() {

    var stepBody_2 = document.getElementById('stepBody_2');
    var tagOpciones = getTemplateBtnTitleSubTitle('btnSelMenos900', 'Menos de $900 mil', '');
    tagOpciones += getTemplateBtnTitleSubTitle('btnSelEntre900y2Mil', 'Entre $900 mil y $2 millones', '');
    tagOpciones += getTemplateBtnTitleSubTitle('btnSelEntre2y3', 'Entre $2 millones y $3 millones', '');
    tagOpciones += getTemplateBtnTitleSubTitle('btnSelEntre3y4', 'Entre $3 millones y $4 millones', '');
    tagOpciones += getTemplateBtnTitleSubTitle('btnSelMasde4Mil', 'Más de $4 millones', '');


    var tagStep = getTemplateSeccionBodyStep('¿Cuál es el valor aproximado del inmueble que buscas?'
        , 'El valor del inmueble nos ayuda a estimar el máximo de crédito que podrías conseguir.'
        , tagOpciones
        , 0
    );

    stepBody_2.innerHTML = tagStep;
}

function getTemplateStep_3() {

    var stepBody_3 = document.getElementById('stepBody_3');
    var tagOpciones = getTemplateTextBoxNum('txtMonto', '0', 'Monto', 'required');

    var tagStep = getTemplateSeccionBodyStep('¿Cuál es tu ingreso mensual?'
        , ''
        , tagOpciones
        , 1
    );

    stepBody_3.innerHTML = tagStep;
}

function getTemplateStep_4() {

    var stepBody_4 = document.getElementById('stepBody_4');
    var tagOpciones = getTemplateTextBox('txtNombres', '', 'Nombre(s)', 'required');
    tagOpciones += getTemplateTextBox('txtPrimerApellido', '', 'Apellido Paterno', 'required');
    tagOpciones += getTemplateTextBox('txtSegundoApellido', '', 'Apellido Materno', '');

    var tagStep = getTemplateSeccionBodyStep('¿Cuál es tu nombre?'
        , 'Tus datos se protegerán bajo estándares internacionales en manejo de datos y encriptación para resguardo.'
        , tagOpciones
        , 2
    );

    stepBody_4.innerHTML = tagStep;
}


function getTemplateStep_5() {

    var stepBody_5 = document.getElementById('stepBody_5');
    var tagOpciones = getTemplateBtnTitleSubTitle('btnSelMujer', 'Mujer', '');
    tagOpciones += getTemplateBtnTitleSubTitle('btnSelHombre', 'Hombre', '');
    tagOpciones += getTemplateFechaNacimiento('fechaNacimiento');

    var tagStep = getTemplateSeccionBodyStep('¿Cuál es tu género?'
        , ''
        , tagOpciones
        , 3
    );

    stepBody_5.innerHTML = tagStep;
}

function getTemplateStep_6() {

    var stepBody_6 = document.getElementById('stepBody_6');
    var tagOpciones = getTemplateTextBox('txtRFC', '', 'RFC', 'required')

    var tagStep = getTemplateSeccionBodyStep('¿Cuál es tu RFC?'
        , ''
        , tagOpciones
        , 3
    );

    stepBody_6.innerHTML = tagStep;
}

function getTemplateStep_7() {

    var stepBody_7 = document.getElementById('stepBody_7');

    var tagOpciones = `<div class="row">
                          <div class="col-xs-12 col-sm-6 col-md-4 col-lg-3">
                              ${getTemplateTextBox('txtCP', '', 'Código Postal', 'required')}
                          </div>
                          <div class="col-xs-12 col-sm-6 col-md-8 col-lg-9">
                              <label id="lblEstadoMunicipio" ></label>
                          </div>
                          <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                              ${getTemplateSelect('cmbColonia', '', 'Colonia', 'required')}
                          </div>
                          <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                              ${getTemplateTextBox('txtcalleyNo', '', 'Calle y número', 'required')}
                          </div>

                        </div>`;

    var tagStep = getTemplateSeccionBodyStep('¿Cuál es tu dirección?'
        , ''
        , tagOpciones
        , 3
    );

    stepBody_7.innerHTML = tagStep;
}

function getTemplateStep_8() {

    var stepBody_8 = document.getElementById('stepBody_8');

    var tagOpciones = `<div class="row">
                          <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                              ${getTemplateTextBoxNum('txtCelular', '', 'Celular', 'required')}
                          </div>
                          <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                              ${getTemplateTextBox('txtCorreo', '', 'Correo', 'required')}
                          </div>
                          <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                              <p>
                                Al dar clic en Siguiente, acepto recibir notificaciones por Whatsapp y que mis datos personales sean tratados para las finalidades descritas en el <strong>Aviso de Privacidad</strong>, y acepto los <strong>Términos y Condiciones de Uso</strong>.
                              </p>
                          </div>

                        </div>`;

    var tagStep = getTemplateSeccionBodyStep('Compártenos tus datos de contacto'
        , 'Enviaremos un código de confirmación a tu celular, y a tu correo información adicional a tu precalificación.'
        , tagOpciones
        , 3
    );

    stepBody_8.innerHTML = tagStep;
}

function getTemplateStep_9() {

    var stepBody_9 = document.getElementById('stepBody_9');
    var tagOpciones = ``;
    tagOpciones += `<div id="step_9_Wait" style="width: 100%; text-align: center;">
                        <img src='images/loading.gif' alt="loading" style="height:280px;" />                    
                        <h3>Procesando envio de código de validación</h3>
                   </div>`;
    tagOpciones += `<div id="step_9_row" class="row" hidden>
                          <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                              ${getTemplateTextBoxNum('txtCodigoValidacion', '', 'Tu número', 'required')}
                          </div>
                          <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                              <button id="btnReenviarCodigo" type="button" class="btn btn-reenvio">Reenviar Código</button>
                          </div>
                        </div>`;

    var tagStep = getTemplateSeccionBodyStep('Escribe el código que recibiste en tu correo.'
        , ''
        , tagOpciones
        , 4
    );

    stepBody_9.innerHTML = tagStep;
}

function getTemplateStep_10() {

    var stepBody_10 = document.getElementById('stepBody_10');

    var tagOpciones = `<div class="row">
                          <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                              ${getTemplateBtnChk('btnChkAutorizo', false, 'Autorizo a MAAY Capital a consultar mi historial crediticio de cualquier SIC que estime conveniente.')}
                          </div>
                          <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                              ${getTemplateTextBoxNum('txtCodigoValidacion2', '', 'Ingresa tu código nuevamente', 'required')}
                          </div>
                        </div>`;

    var tagStep = getTemplateSeccionBodyStep('Autorización para consultar historial crediticio'
        , ''
        , tagOpciones
        , 4
    );

    stepBody_10.innerHTML = tagStep;
}

function getTemplateStep_11() {

    var stepBody_11 = document.getElementById('stepBody_11');


    var tagOpciones = `<div class="row">
                          <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 text-center">
                               <img src='images/loading.png' alt="loading" style="height:280px;" />
                               <span class="procesandoValidacion_1">Somos imparciales.<span>
                               <span class="procesandoValidacion_2">Somos un broker independiente sin preferencias.<span>
                               <img src='images/loading.gif' alt="loading" />
                          </div>
                        </div>`;

    var tagStep = getTemplateSeccionBodyStep('Autorización para consultar historial crediticio'
        , ''
        , tagOpciones
        , 4
    );

    stepBody_11.innerHTML = tagStep;
}

function getTemplateAutorizado(_nivelAceptacion) {

    var formResultado = document.getElementById('formResultado');

    var tagsAutorizado = ``;
    if (_nivelAceptacion == 1) {
        tagsAutorizado = `
        <span class="autorizado_Header">¡Felicidades!<span>
        <div class="alert alert-primary" role="alert">
           <h4 class="alert-heading">Según tu historial de crédito.</h4>
           <span class="autorizado_Monto">Eres un candidato apto para el crédito.<span>
      </div>
        
       `;

    }
    else {
        tagsAutorizado = `
                          <img src='images/resultado_1.jpg' alt="Resultado" style="height:280px;" />
                          <span class="procesandoValidacion_1">Has terminado tu precalificación.<span>
                          <span class="procesandoValidacion_2">En este momento no eres candidato aun ${OBJCaptura.tipoCredito}, no te preocupes, te sugerimos mejorar tu historial créditicio y/o capacidad de pago para volver a aplicar. <span>
                         `;

    }

    var tagOpciones = `<div class="row">
                          <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 text-center">
                          ${tagsAutorizado}
                          </div>
                        </div>`;


    formResultado.innerHTML = tagOpciones;
}


/**
 * Material Input 
 * @returns object
 */
$.fn.materialInput = function () {

    var label;
    var el = this;

    el.find('input.formInput').focus(function (e) {
        el.setLabel(e.target);
        el.checkFocused(e.target);
    });

    el.find('input.formInput').focusout(function (e) {
        el.setLabel(e.target);
        el.checkUnFocused(e.target);
    });

    el.find('input.formInput').keypress(function (e) {
        $(this).parents(".form-group").find(".errorIcon").hide();
    });

    this.setLabel = function (target) {
        label = el.find('label[for=' + target.id + ']');
    };

    this.getLabel = function () {
        return label;
    };

    this.checkFocused = function (target) {
        el.getLabel().addClass('active', '');
        $(target).removeClass("input-error");
    };

    this.checkUnFocused = function (target) {
        if ($(target).val().length === 0) {
            el.getLabel().removeClass('active');
        }
    };
};

function handleFileSelect() {
    if (!window.File || !window.FileReader || !window.FileList || !window.Blob) {
        alert('The File APIs are not fully supported in this browser.');
        return;
    }

    input = document.getElementById('fileinput');
    if (!input) {
        alert("Um, couldn't find the fileinput element.");
    }
    else if (!input.files) {
        alert("This browser doesn't seem to support the `files` property of file inputs.");
    }
    else if (!input.files[0]) {
        alert("Please select a file before clicking 'Load'");
    }
    else {
        file = input.files[0];
        fr = new FileReader();
        fr.onload = receivedText;
        //fr.readAsText(file);
        fr.readAsDataURL(file);
    }
}


/*================== STEP 1 ============================ */
function btnSelQuebuscasClick() {

    try {

        var btn = this;
        var idspan = `span${btn.id}`;
        var spanText = document.getElementById(idspan).innerHTML;
        OBJCaptura.tipoCredito = spanText;

        fg_switch_buttons_listado('stepBody_1', btn);

        PAGECONTROLS.controls.btnNext.click();
    }
    catch (e) {
        fg_mensaje_problema_tecnico(e);
    }
}

/*================== STEP 2 ============================ */
function btnSelValorAproxClick() {

    try {

        var btn = this;
        var idspan = `span${btn.id}`;
        var spanText = document.getElementById(idspan).innerHTML;
        OBJCaptura.valorAproximado = spanText;
        fg_switch_buttons_listado('stepBody_2', btn);
        PAGECONTROLS.controls.btnNext.click();
    }
    catch (e) {
        fg_mensaje_problema_tecnico(e);
    }
}

/*================== STEP 3 ============================ */
function txtMontchange() {
    console.log(PAGECONTROLS.controls.txtMonto.value);
    PAGECONTROLS.controls.txtMonto.value = formatter.format(PAGECONTROLS.controls.txtMonto.value);
    console.log(PAGECONTROLS.controls.txtMonto.value);
}

/*================== STEP 5 ============================ */
function btnSelGeneroClick() {

    try {

        var btn = this;
        var idspan = `span${btn.id}`;
        var spanText = document.getElementById(idspan).innerHTML;
        OBJCaptura.Genero = spanText;

        fg_switch_buttons_listado('stepBody_5', btn);

    }
    catch (e) {
        fg_mensaje_problema_tecnico(e);
    }
}

/*================== STEP 10 ============================ */
function btnChkAutorizoClick() {
    try {

        var btn = this;
        fg_ChekClik(btn);
    }
    catch (e) {
        fg_mensaje_problema_tecnico(e);
    }
}


async function searchColonias() {
    // const filtros = {
    //     Email:'mirra.espinoza@gmail.com',
    //     Password:'test'
    //     };
    var codigoPostal = PAGECONTROLS.controls.txtCP.value;
    const urlAPI = `${_API_}getColoniasPorCP?codigoPostal=${codigoPostal}`;
    const response = await fetch(
        urlAPI
        , {
            method: 'GET', // *GET, POST, PUT, DELETE, etc.
            mode: 'cors', // no-cors, *cors, same-origin
            cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
            //credentials: 'same-origin', // include, *same-origin, omit
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Accept': 'application/json, text/plain',
                'Content-Type': 'application/json;charset=UTF-8'
            },
            redirect: 'follow', // manual, *follow, error
            referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
            //body: JSON.stringify(filtros)
        }
    );

    const data = await response.json();

    return data;
}

async function txtCPOnChange() {
    try {
        const ds = await searchColonias();
        DtColonias = ds.colonias;

        if (DtColonias.length > 0) {
            var estado = DtColonias[0].Estado;
            var municipio = DtColonias[0].Municipio;

            PAGECONTROLS.controls.lblEstadoMunicipio.innerHTML = `${municipio}, ${estado}`;
            fg_cargar_combo_from_List(PAGECONTROLS.controls.cmbColonia, 'Codigo_Postal_ID', 'Colonia', DtColonias, false);
        }
    }
    catch (e) {

        fg_mensaje_problema_tecnico(e);
    }
};

async function setProspecto() {
    // const filtros = {
    //     Email:'mirra.espinoza@gmail.com',
    //     Password:'test'
    //     };
    const urlAPI = `${_API_}setProspecto`;
    const response = await fetch(
        urlAPI
        , {
            method: 'POST', // *GET, POST, PUT, DELETE, etc.
            mode: 'cors', // no-cors, *cors, same-origin
            cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
            //credentials: 'same-origin', // include, *same-origin, omit
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Accept': 'application/json, text/plain',
                'Content-Type': 'application/json;charset=UTF-8'
            },
            redirect: 'follow', // manual, *follow, error
            referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
            body: JSON.stringify(OBJCaptura)
        }
    );

    const data = await response.json();

    return data;
}
async function registrarProspecto() {
    try {

        obtenerValores();
        const ds = await setProspecto();
        if (fg_resultOK(ds.result)) {
            OBJCaptura.idProspecto = ds.result[0].ID;
            PAGECONTROLS.controls.step_9_Wait.hidden = true;
            PAGECONTROLS.controls.step_9_row.hidden = false;
        }

    }
    catch (e) {
        fg_mensaje_problema_tecnico(e);
    }
}
function obtenerValores(){
    OBJCaptura.ingresoMensual = PAGECONTROLS.controls.txtMonto.value;

    OBJCaptura.nombres = PAGECONTROLS.controls.txtNombres.value;
    OBJCaptura.primerApellido = PAGECONTROLS.controls.txtPrimerApellido.value;
    OBJCaptura.segundoApellido = PAGECONTROLS.controls.txtSegundoApellido.value;

    OBJCaptura.fechaNacimiento = PAGECONTROLS.controls.txtfechaNacimientoDia.value
    + '/' + PAGECONTROLS.controls.cmbfechaNacimientoMes.value 
    + '/' + PAGECONTROLS.controls.txtfechaNacimientoAnio.value
    ;

    OBJCaptura.rfc = PAGECONTROLS.controls.txtRFC.value;

    OBJCaptura.idCodigoPostal = PAGECONTROLS.controls.cmbColonia.value;
    OBJCaptura.calleyNo = PAGECONTROLS.controls.txtcalleyNo.value;

    OBJCaptura.celular = PAGECONTROLS.controls.txtCelular.value;
    OBJCaptura.correo = PAGECONTROLS.controls.txtCorreo.value;

}

async function reenviarCodigo() {

    const urlAPI = `${_API_}reenviar-codigoValidacion?id=${OBJCaptura.idProspecto}&correo=${OBJCaptura.correo}`;

    const response = await fetch(
        urlAPI
        , {
            method: 'POST', // *GET, POST, PUT, DELETE, etc.
            mode: 'cors', // no-cors, *cors, same-origin
            cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
            //credentials: 'same-origin', // include, *same-origin, omit
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Accept': 'application/json, text/plain',
                'Content-Type': 'application/json;charset=UTF-8'
            },
            redirect: 'follow', // manual, *follow, error
            referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
            //body: JSON.stringify(OBJCaptura)
        }
    );

    const data = await response.json();

    return data;
}
async function btnReenviarCodigoClick() {
    try {

        OBJCaptura.correo = PAGECONTROLS.controls.txtCorreo.value;

        console.log(`Reenviamos correo ${OBJCaptura.correo}`);
        PAGECONTROLS.controls.step_9_Wait.hidden = false;
        PAGECONTROLS.controls.step_9_row.hidden = true;

        const ds = await reenviarCodigo();
        if (fg_resultOK(ds.result)) {
            PAGECONTROLS.controls.step_9_Wait.hidden = true;
            PAGECONTROLS.controls.step_9_row.hidden = false;
        }
    }
    catch (e) {

        fg_mensaje_problema_tecnico(e);
    }
}

async function autenticarCodigoValidacion() {
    // const filtros = {
    //     Email:'mirra.espinoza@gmail.com',
    //     Password:'test'
    //     };
    const urlAPI = `${_API_}autenticar-codigoValidacion?idProspecto=${OBJCaptura.idProspecto}&codigoValidacion=${PAGECONTROLS.controls.txtCodigoValidacion.value}`;
    const response = await fetch(
        urlAPI
        , {
            method: 'POST', // *GET, POST, PUT, DELETE, etc.
            mode: 'cors', // no-cors, *cors, same-origin
            cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
            //credentials: 'same-origin', // include, *same-origin, omit
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Accept': 'application/json, text/plain',
                'Content-Type': 'application/json;charset=UTF-8'
            },
            redirect: 'follow', // manual, *follow, error
            referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
            //body: JSON.stringify(OBJCaptura)
        }
    );

    const data = await response.json();

    return data;
}

async function irAutenticarCodigoValidacion() {

    const ds = await autenticarCodigoValidacion();

    console.log('Ya fue a autenticar');
    if (fg_resultOK(ds.result)) {

        console.log('Si se autentico?');
        console.log(ds.result);

        OBJCaptura.codigoAutenticado = true;
        PAGECONTROLS.controls.btnNext.click();
    }

}



async function irValidarCredito() {


    const urlAPI = `${_API_}validar-circulo-credito`;
    const response = await fetch(
        urlAPI
        , {
            method: 'POST', // *GET, POST, PUT, DELETE, etc.
            mode: 'cors', // no-cors, *cors, same-origin
            cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
            //credentials: 'same-origin', // include, *same-origin, omit
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Accept': 'application/json, text/plain',
                'Content-Type': 'application/json;charset=UTF-8'
            },
            redirect: 'follow', // manual, *follow, error
            referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
            body: JSON.stringify(OBJCaptura)
        }
    );

    const data = await response.json();

    return data;
}

async function validarCredito() {

    obtenerValores();
    const ds = await irValidarCredito();

    PAGECONTROLS.controls.stepFooter.hidden = false;
    console.log('Ir a validar el crédito');
    if (fg_resultOK(ds.result)) {

        console.log('Se valido el crédito?');

        getTemplateAutorizado(ds.result[0].nivelAceptacion);
        PAGECONTROLS.controls.formSteps.hidden = true;
        PAGECONTROLS.controls.formResultado.hidden = false;

    }

}


$(document).ready(function () {

    getTemplateStep_1();
    getTemplateStep_2();
    getTemplateStep_3();
    getTemplateStep_4();
    getTemplateStep_5();
    getTemplateStep_6();
    getTemplateStep_7();
    getTemplateStep_8();
    getTemplateStep_9();
    getTemplateStep_10();
    getTemplateStep_11();

    PAGECONTROLS = fg_setIFRAMEControls('lunaSignUpContainer');
    OBJCaptura = new Object();
    OBJCaptura.codigoAutenticado = false;
    /**
     * Page Loader
     * If you remove loader, you can delete .luna-loader-container element from Html, and delete this two rows.
     */
    $(".luna-loader-container").fadeOut("slow");
    $(".luna-signup-container").show();


    /**
     * Material Inputs
     * Makes, inputs in selected element material design.
     */
    $(".luna-steps").materialInput();

    /**
     * Bootstrap Select Plugin
     */
    $(".selectpicker").selectpicker();


    PAGECONTROLS.controls.btnSelAdquirir.addEventListener('click', btnSelQuebuscasClick);
    PAGECONTROLS.controls.btnSelMejorar.addEventListener('click', btnSelQuebuscasClick);
    PAGECONTROLS.controls.btnSelObtener.addEventListener('click', btnSelQuebuscasClick);


    PAGECONTROLS.controls.btnSelMenos900.addEventListener('click', btnSelValorAproxClick);
    PAGECONTROLS.controls.btnSelEntre900y2Mil.addEventListener('click', btnSelValorAproxClick);
    PAGECONTROLS.controls.btnSelEntre2y3.addEventListener('click', btnSelValorAproxClick);
    PAGECONTROLS.controls.btnSelEntre3y4.addEventListener('click', btnSelValorAproxClick);
    PAGECONTROLS.controls.btnSelMasde4Mil.addEventListener('click', btnSelValorAproxClick);

    PAGECONTROLS.controls.btnSelMujer.addEventListener('click', btnSelGeneroClick);
    PAGECONTROLS.controls.btnSelHombre.addEventListener('click', btnSelGeneroClick);

    PAGECONTROLS.controls.btnReenviarCodigo.addEventListener('click', btnReenviarCodigoClick);

    //PAGECONTROLS.controls.txtMonto.addEventListener("change", txtMontchange);

    fg_cargar_combo_from_List(PAGECONTROLS.controls.cmbfechaNacimientoMes, 'id', 'mes', DtMeses, false);

    PAGECONTROLS.controls.txtCP.addEventListener('change', txtCPOnChange);

    PAGECONTROLS.controls.btnChkAutorizo.addEventListener('click', btnChkAutorizoClick);



    /**
     * Tuna Signup Form Wizard
     * Let's Start
     */
    lunaWizard.start();

});
