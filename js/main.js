var PAGECONTROLS;
var OBJCaptura;
var OBJImageStpes = [
    'images/img_01_QueEstasBuscando.PNG' //0
    , 'images/banks.png'             //1
    , 'images/analysis.png'          //2
    , 'images/secure.png'            //3
    , 'images/bureau.png'            //4
    , 'images/resultado_1.jpg'       //5
    , 'images/resultado_2.jpg'       //6
    , 'images/step_03_compartenos_tus_datos.jpg'   //7
    , 'images/step_04_historial_credito.jpg'       //8
    , 'images/step_07_Asesores.JPG'                //9        
    , 'images/step_06_AutorizoAsesores.JPG'                //10            
    , 'images/step_05_comparte_tus_datosJPG.jpg'                //11
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

var step_2_titulos = {
   btnSelAdquirir: 'Valor aproximado del inmueble que deseas comprar'
 , btnSelMejorar: 'Monto de tu hipoteca actual' 
 , btnSelObtener: `Monto del crédito que necesitas.` 
}

var step_2_subtitulos = {
    btnSelAdquirir: 'Este dato nos ayuda a conocer el Aforo que los Bancos pueden otorgarte.'
  , btnSelMejorar: 'Este dato nos ayuda a conocer el máximo de crédito que los Bancos te pueden otorgar.' 
  , btnSelObtener: `<span class="text-info">(Te recordamos que únicamente se aceptan casa habitación  y departamentos)</span><br>Este dato nos ayuda a conocer el máximo de crédito que los Bancos te pueden otorgar.` 
 }
 
 var DtEstadosCivil = [
    {id:'1', descripcion:'Soltero'}
  , {id:'2', descripcion:'Casado por bienes  Separados'}
  , {id:'3', descripcion:'Casado Sociedad Conyugal'}
];
var DtActividades = [
  {id:'1', descripcion:'Empleado'}
, {id:'2', descripcion:'Independiente'}
];



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
         console.log(`Inicia nextStep en: ${nextStep}`);   

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
                        if (OBJCaptura.valorAproximado == null) {
                            PAGECONTROLS.controls.lunaStepsFooterError.innerHTML = `Por favor debe seleccionar una opción para avanzar.`;
                            permitirAvanzar = false;
                        }

                        console.log(`OBJCaptura.tipoCreditoID: ${OBJCaptura.tipoCreditoID}`);
                        if(permitirAvanzar){
                            if(OBJCaptura.tipoCreditoID != 'btnSelMejorar'){
                                console.log(`nextStep: ${nextStep}`);
                                nextStep = nextStep + 1;
                                console.log(`nextStep: ${nextStep}`);
                            }                            
                        }


                        break;                    
                        case '4':
                            if (OBJCaptura.valorAproximadoMejorar == null) {
                                PAGECONTROLS.controls.lunaStepsFooterError.innerHTML = `Por favor debe seleccionar una opción para avanzar.`;
                                permitirAvanzar = false;
                            }
                            break;                    
    
                        case '5':
                    if (!fg_valida_captura_seccion('stepBody_5')) {
                        permitirAvanzar = false;
                    }
                    break;
                case '6':
                    if (!fg_valida_captura_seccion('stepBody_6')) {
                        permitirAvanzar = false;
                    }
                    else {

                        var respuesta = fg_getResultSwitch('BtnGpo_HistorialCreditoBueno');
                        if (!fg_isEmptyOrNull(respuesta)) {

                            //Si es no entonces ya lo enviamos a que termine
                            if(respuesta == 'NO'){
                                nextStep = 90;
                                var stepscount = document.getElementsByClassName('steps-count')[0].hidden = true;    
                            }
                        }
                        else{
                            permitirAvanzar = false;
                            var BtnGpo_HistorialCreditoBueno = document.getElementById('BtnGpo_HistorialCreditoBueno');
                            fg_mostrar_error(BtnGpo_HistorialCreditoBueno, 'Debe seleccionar una opción.')                            
                        }    
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
                    // else {
                    //     if (!fg_isChecked_BtnChk(PAGECONTROLS.controls.btnChkAutorizo)) {
                    //         fg_mostrar_error(PAGECONTROLS.controls.btnChkAutorizo, 'Debe autorizar para continuar.');
                    //         permitirAvanzar = false;
                    //     }
                    // }

                    nextStep = 95;
                    var stepscount = document.getElementsByClassName('steps-count')[0].hidden = true;
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

        if (PAGECONTROLS.controls.stepBody_6.className.indexOf('step-active') != -1) {
            registrarProspecto();
        }


        //Solo para ocultar el footer y ya no mostrar el atras y el siguiente
        if (PAGECONTROLS.controls.stepBody_11.className.indexOf('step-active') != -1
            || PAGECONTROLS.controls.stepBody_Termina_HistorialMalo.className.indexOf('step-active') != -1
            || PAGECONTROLS.controls.stepBody_Felicidades.className.indexOf('step-active') != -1
            ) {

            PAGECONTROLS.controls.stepFooter.hidden = true;
        }

        // if (PAGECONTROLS.controls.stepBody_12.className.indexOf('step-active') != -1) {
        //     validarCredito();
        // }

        if (PAGECONTROLS.controls.stepBody_Termina_HistorialMalo.className.indexOf('step-active') != -1) {
            irsetProspectoMalHistorial();
        }

        if (PAGECONTROLS.controls.stepBody_Felicidades.className.indexOf('step-active') != -1) {

            // El el punto dnde se envia el codigo ahi se guarda los datos del prospecto
            //En este punto confirmamos los datos y se guarda los datos de la preclasificación
            irsetProspectoAutenticado();
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
    var tagOpciones = getTemplateBtnTitleSubTitle('btnSelAdquirir', 'ADQUISICION', 'Quiero comprar una casa');
    tagOpciones += getTemplateBtnTitleSubTitle('btnSelMejorar', 'MEJORA DE HIPOTECA', 'Quiero refinanciar mi crédito actual');
    tagOpciones += getTemplateBtnTitleSubTitle('btnSelObtener', 'LIQUIDEZ', 'Quiero liquidez utilizando mi propiedad como garantía');


    var tagStep = getTemplateSeccionBodyStep('¿Que estas buscando?'
        , ''
        , tagOpciones
        , 0
    );

    stepBody_1.innerHTML = tagStep;
}

function getTemplateStep_2() {

    var stepBody_2 = document.getElementById('stepBody_2');
    // var tagOpciones = getTemplateBtnTitleSubTitle('btnSelMenos900', 'Menos de $900 mil', '');
    // tagOpciones += getTemplateBtnTitleSubTitle('btnSelEntre900y2Mil', 'Entre $900 mil y $2 millones', '');
    // tagOpciones += getTemplateBtnTitleSubTitle('btnSelEntre2y3', 'Entre $2 millones y $3 millones', '');
    // tagOpciones += getTemplateBtnTitleSubTitle('btnSelEntre3y4', 'Entre $3 millones y $4 millones', '');
    // tagOpciones += getTemplateBtnTitleSubTitle('btnSelMasde4Mil', 'Más de $4 millones', '');

    var tagOpciones = getTemplateBtnTitleSubTitle('btnValorAproximado_1', 'Menos de 500 mil ', '');
        tagOpciones += getTemplateBtnTitleSubTitle('btnValorAproximado_2', 'De $500 mil  a $1 millón', '');
        tagOpciones += getTemplateBtnTitleSubTitle('btnValorAproximado_3', 'Entre $1millón y  $2 millones', '');
        tagOpciones += getTemplateBtnTitleSubTitle('btnValorAproximado_4', 'Entre $2millones y  $2 millones', '');
        tagOpciones += getTemplateBtnTitleSubTitle('btnValorAproximado_5', 'De $4 millones o más…', '');
    
    var tagStep = getTemplateSeccionBodyStep(''
        , ''
        , tagOpciones
        , 0
    );

    stepBody_2.innerHTML = tagStep;
}

function getTemplateStep_3_Yano() {

    var stepBody_3 = document.getElementById('stepBody_3');
    var tagOpciones = getTemplateTextBoxNum('txtMonto', '0', 'Monto', 'required');

    var tagStep = getTemplateSeccionBodyStep('¿Cuál es tu ingreso mensual?'
        , ''
        , tagOpciones
        , 1
    );

    stepBody_3.innerHTML = tagStep;
}


function getTemplateStep_3() {

    var stepBody = document.getElementById('stepBody_3');
    // var tagOpciones = getTemplateBtnTitleSubTitle('btnSelMenos900', 'Menos de $900 mil', '');
    // tagOpciones += getTemplateBtnTitleSubTitle('btnSelEntre900y2Mil', 'Entre $900 mil y $2 millones', '');
    // tagOpciones += getTemplateBtnTitleSubTitle('btnSelEntre2y3', 'Entre $2 millones y $3 millones', '');
    // tagOpciones += getTemplateBtnTitleSubTitle('btnSelEntre3y4', 'Entre $3 millones y $4 millones', '');
    // tagOpciones += getTemplateBtnTitleSubTitle('btnSelMasde4Mil', 'Más de $4 millones', '');

    var tagOpciones =  getTemplateBtnTitleSubTitle('btnValorAproximadoMejorar_1', 'Menos de 500 mil ', '');
        tagOpciones += getTemplateBtnTitleSubTitle('btnValorAproximadoMejorar_2', 'De $500 mil  a $1 millón', '');
        tagOpciones += getTemplateBtnTitleSubTitle('btnValorAproximadoMejorar_3', 'Entre $1millón y  $2 millones', '');
        tagOpciones += getTemplateBtnTitleSubTitle('btnValorAproximadoMejorar_4', 'Entre $2millones y  $2 millones', '');
        tagOpciones += getTemplateBtnTitleSubTitle('btnValorAproximadoMejorar_5', 'De $4 millones o más…', '');
    
    var tagStep = getTemplateSeccionBodyStep('Valor apróximado del inmueble de la hipoteca a mejorar'
        , ''
        , tagOpciones
        , 0
    );

    stepBody.innerHTML = tagStep;
}

function getTemplateStep_4() {

    var stepBody = document.getElementById('stepBody_4');
    var tagOpciones = `
                        <div class="col-xs-12 col-sm-12 col-md-6 mb-2 text-center">                                                      
                                <div id="BtnGpo_PagoPuntualHipoteca" class="btn-group btn-group-switch" role="group" aria-label="First group">
                                    <button id="BtnPagoPuntualHipoteca_SI" value="SI"type="button" class="btn w-50 bg-segundo-plano"><i class="fa fa-check"></i>&nbsp;Si</button>
                                    <button id="BtnPagoPuntualHipoteca_NO" value="NO" type="button" class="btn w-50 bg-segundo-plano"><i class="fa fa-times"></i>&nbsp;No</button>
                                </div>
                        </div>    
                    `;

    var tagStep = getTemplateSeccionBodyStep('¿Has pagado puntualmente el último año de tu hipoteca?'
        , ''
        , tagOpciones
        , 8
    );

    stepBody.innerHTML = tagStep;
}



//Compártenos tus datos 
function getTemplateStep_5() {

    var stepBody = document.getElementById('stepBody_5');
    
    var tagOpciones = `<div class="col-xs-12 col-sm-12 col-md-12">
                            ${getTemplateTextBox('txtNombres', '', 'Nombre(s)', 'required')}
                       </div>`;

    tagOpciones += `<div class="col-xs-12 col-sm-12 col-md-6">
                       ${getTemplateTextBox('txtPrimerApellido', '', 'Apellido Paterno', 'required')}
                  </div>`;

    tagOpciones += `<div class="col-xs-12 col-sm-12 col-md-6">
                  ${getTemplateTextBox('txtSegundoApellido', '', 'Apellido Materno', '')}
             </div>`;

    tagOpciones += `<div class="col-xs-12 col-sm-12 col-md-6">
             ${getTemplateSelect('cmbEstadoCivil', '', 'Estado Civil', '')}
    </div>`;

    tagOpciones += `<div class="col-xs-12 col-sm-12 col-md-6">
             ${getTemplateSelect('cmbActividad', '', 'Actividad', '')}
    </div>`;

    tagOpciones = `<div class="row">${tagOpciones}</div>`;

    var tagStep = getTemplateSeccionBodyStep('Compártenos tus datos'
        , 'Tus datos se protegerán bajo estándares internacionales en manejo de datos y encriptación para resguardo.'
        , tagOpciones
        , 7
    );

    stepBody.innerHTML = tagStep;
}

function getTemplateStep_6() {

    var stepBody = document.getElementById('stepBody_6');
    //var tagOpciones = getTemplateBtnChk('BtnHistorialCreditoBueno', '', '¿Tu historial de buró de crédito es bueno? ', 'required');
    var tagOpciones = `
                        <div class="col-xs-12 col-sm-12 col-md-12 mb-2 text-center">                                                      
                                <div id="BtnGpo_HistorialCreditoBueno" class="btn-group btn-group-switch" role="group" aria-label="First group">
                                    <button id="BtnHistorialCreditoBueno_SI" value="SI"type="button" class="btn w-50 bg-segundo-plano"><i class="fa fa-check"></i>&nbsp;Si</button>
                                    <button id="BtnHistorialCreditoBueno_NO" value="NO" type="button" class="btn w-50 bg-segundo-plano"><i class="fa fa-times"></i>&nbsp;No</button>
                                </div>
                        </div>    
                    `;

    var tagStep = getTemplateSeccionBodyStep('Recuerda que al momento de estar tramitando un crédito con UN BANCO es prioritario tener BUEN HISTORIAL DE BURO DE CREDITO '
        , '¿Tu historial de buró de crédito es bueno?'
        , tagOpciones
        , 8
    );

    stepBody.innerHTML = tagStep;
}

function getTemplateStep_5_Yano() {

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

function getTemplateStep_6_Yano() {

    var stepBody_6 = document.getElementById('stepBody_6');
    var tagOpciones = getTemplateTextBox('txtRFC', '', 'RFC', 'required')

    var tagStep = getTemplateSeccionBodyStep('¿Cuál es tu RFC?'
        , ''
        , tagOpciones
        , 3
    );

    stepBody_6.innerHTML = tagStep;
}

function getTemplateStep_7_Yano() {

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

function getTemplateStep_7() {

    var stepBody = document.getElementById('stepBody_7');

    var tagOpciones = `<div class="row">
                          <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                              ${getTemplateTextBoxNum('txtCelular', '', 'Celular', 'required')}
                          </div>
                          <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                              ${getTemplateTextBox('txtCorreo', '', 'Correo', 'required')}
                          </div>
                          <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                              <p>
                                Al dar clic en Siguiente, acepto recibir notificaciones por SMS y correo electrónico y que mis datos personales sean tratados para las finalidades descritas en el <strong>Aviso de Privacidad</strong>, y acepto los <strong>Términos y Condiciones de Uso</strong>.
                              </p>
                          </div>

                        </div>`;

    var tagStep = getTemplateSeccionBodyStep('Compártenos tus datos de contacto'
        , 'Enviaremos un código de confirmación a tu celular.'
        , tagOpciones
        , 11
    );

    stepBody.innerHTML = tagStep;
}

function getTemplateStep_8() {

    var stepBody = document.getElementById('stepBody_8');

    var tagOpciones = '';
    tagOpciones += `<div id="step_6_Wait" style="width: 100%; text-align: center;">
                        <img src='images/loading.gif' alt="loading" style="height:280px;" />                    
                        <h3>Procesando envio de código de validación</h3>
                   </div>`;

    tagOpciones += `<div id="step_6_row" class="row" hidden>
                          <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                              ${getTemplateBtnChk('btnChkAutorizo', false, 'Autorizo a MAAY CAPITAL a consultar mi historial crediticio de cualquier SIC que estime conveniente.')}
                          </div>
                          <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                              ${getTemplateTextBoxNum('txtCodigoValidacion', '', 'Ingresa tu código', 'required')}
                          </div>
                        </div>`;

    var tagStep = getTemplateSeccionBodyStep('Autorizo que un asesor certificado se ponga en contacto conmigo para continuar con mi trámite.'
        , ''
        , tagOpciones
        , 10
    );

    stepBody.innerHTML = tagStep;
}

/*Aqui termina */
function getTemplateStep_Felicidades(){

    var stepBody = document.getElementById('stepBody_Felicidades');

   var tagStep = getTemplateSeccionBodyStep('¡Felicidades!'
       , ''
       , '<h3 class="text-center p-2">Un asesor certificado por la AMHEX se pondrá en contacto contigo para continuar con tu trámite.</h3>'
       , 9
   );

   stepBody.innerHTML = tagStep;
    
}

function getTemplateStep_9(){}
function getTemplateStep_10(){}

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

/**
 * Viene de ADQUISICIÓN Step 4 ¿Tu historial de buró de crédito es bueno?  = NO
 */
function getTemplateStep_Termina_HistorialMalo() {



    var stepBody = document.getElementById('stepBody_Termina_HistorialMalo');


    var tagOpciones = ``;

    var tagStep = getTemplateSeccionBodyStep(`Lamentamos no poder atenderte en este momento. <br><br>Te sugerimos mejorar tu historial crediticio y volver a contactarnos. 
    <br><br>Esperamos apoyarte en un futuro para cumplir tus sueños.`
        , ''
        , tagOpciones
        , 6
    );

    stepBody.innerHTML = tagStep;
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
        OBJCaptura.tipoCreditoID = btn.id;
        fg_switch_buttons_listado('stepBody_1', btn);

        var stepBody_2 = document.getElementById('stepBody_2');
        var steptitle = stepBody_2.getElementsByClassName('step-title')[0];
        var stepsubtitle = stepBody_2.getElementsByClassName('step-subtitle')[0];

        steptitle.innerHTML = step_2_titulos[btn.id];
        stepsubtitle.innerHTML = step_2_subtitulos[btn.id];

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


        //Se actualiza las leyendas del step 3 en base a flujo que selecciono al inicio
        var step_3_titulos = {
            btnSelAdquirir: 'Monto apróximado del crédito que necesitas.' 
          , btnSelMejorar: 'Valor apróximado del inmueble de la hipoteca a mejorar'
          , btnSelObtener: 'Valor apróximado del inmueble que desas dejar en garantia.'  
         }
        var stepBody_3 = document.getElementById('stepBody_3');
        var steptitle = stepBody_3.getElementsByClassName('step-title')[0];
        var stepsubtitle = stepBody_3.getElementsByClassName('step-subtitle')[0];

        steptitle.innerHTML = step_3_titulos[OBJCaptura.tipoCreditoID];
        //stepsubtitle.innerHTML = step_2_subtitulos[btn.id];

        PAGECONTROLS.controls.btnNext.click();
    }
    catch (e) {
        fg_mensaje_problema_tecnico(e);
    }
}

/*================== STEP 3 ============================ */
function btnSelValorAproxMejorarClick() {

    try {

        var btn = this;
        var idspan = `span${btn.id}`;
        var spanText = document.getElementById(idspan).innerHTML;
        OBJCaptura.valorAproximadoMejorar = spanText;
        fg_switch_buttons_listado('stepBody_3', btn);
        PAGECONTROLS.controls.btnNext.click();
    }
    catch (e) {
        fg_mensaje_problema_tecnico(e);
    }
}

/*================== STEP 4 ============================ */
function txtMontchange() {
    console.log(PAGECONTROLS.controls.txtMonto.value);
    PAGECONTROLS.controls.txtMonto.value = formatter.format(PAGECONTROLS.controls.txtMonto.value);
    console.log(PAGECONTROLS.controls.txtMonto.value);
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
            PAGECONTROLS.controls.step_6_Wait.hidden = true;
            PAGECONTROLS.controls.step_6_row.hidden = false;
        }

    }
    catch (e) {
        fg_mensaje_problema_tecnico(e);
    }
}
function obtenerValores(){
    // OBJCaptura.ingresoMensual = PAGECONTROLS.controls.txtMonto.value;

    OBJCaptura.nombres = PAGECONTROLS.controls.txtNombres.value;
    OBJCaptura.primerApellido = PAGECONTROLS.controls.txtPrimerApellido.value;
    OBJCaptura.segundoApellido = PAGECONTROLS.controls.txtSegundoApellido.value;

    // OBJCaptura.fechaNacimiento = PAGECONTROLS.controls.txtfechaNacimientoDia.value
    // + '/' + PAGECONTROLS.controls.cmbfechaNacimientoMes.value 
    // + '/' + PAGECONTROLS.controls.txtfechaNacimientoAnio.value
    // ;

    // OBJCaptura.rfc = PAGECONTROLS.controls.txtRFC.value;

    // OBJCaptura.idCodigoPostal = PAGECONTROLS.controls.cmbColonia.value;
    // OBJCaptura.calleyNo = PAGECONTROLS.controls.txtcalleyNo.value;

    OBJCaptura.celular = PAGECONTROLS.controls.txtCelular.value;
    OBJCaptura.correo = PAGECONTROLS.controls.txtCorreo.value;

    OBJCaptura.idEstadoCivil = PAGECONTROLS.controls.cmbEstadoCivil.value;
    OBJCaptura.idActividad = PAGECONTROLS.controls.cmbActividad.value;
    OBJCaptura.tieneBuenHistorial =  fg_getResultSwitch('BtnGpo_HistorialCreditoBueno');       //fg_isChecked_BtnChk(PAGECONTROLS.controls.BtnHistorialCreditoBueno);


    OBJCaptura.autorizoContactoAsesor = fg_isChecked_BtnChk(PAGECONTROLS.controls.btnChkAutorizo);    
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


async function setProspectoMalHistorial() {
    // const filtros = {
    //     Email:'mirra.espinoza@gmail.com',
    //     Password:'test'
    //     };
    obtenerValores();
    const urlAPI = `${_API_}setProspectoMalHistorial`;
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

async function irsetProspectoMalHistorial() {

    const ds = await setProspectoMalHistorial();
    
    console.log('Termino');
    setTimeout(function(){
        console.log('Iniciar');
        location.href = location.href
    }, 5000);
}

async function setProspectoAutenticado() {
    // const filtros = {
    //     Email:'mirra.espinoza@gmail.com',
    //     Password:'test'
    //     };
    obtenerValores();
    const urlAPI = `${_API_}setProspectoAutenticado`;
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

async function irsetProspectoAutenticado() {

    const ds = await setProspectoAutenticado();
    
    console.log('Termino');
    setTimeout(function(){
        console.log('Iniciar');
        location.href = location.href
    }, 5000);

}

function Btn_Switch_Click() {

    var btn = this;
    var agrupador = btn.parentElement;

    var tool = new Object();
    tool.controls = fg_obtener_controles_agrupador(agrupador.id);

    //Primero reseteamos la clase a todos los buttons del grupo; se esperan todos apliquen el mismo criterio de cambio de listado
    $.each(tool.controls, function (key, value) {
        if (value.tagName == 'BUTTON') {
            value.classList = 'btn bg-segundo-plano';
        }
    })

    btn.classList = 'btn bg-primer-plano';

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

    // getTemplateStep_9();
    // getTemplateStep_10();
    // getTemplateStep_11();

    getTemplateStep_Termina_HistorialMalo();
    getTemplateStep_Felicidades();

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


    PAGECONTROLS.controls.btnValorAproximado_1.addEventListener('click', btnSelValorAproxClick);
    PAGECONTROLS.controls.btnValorAproximado_2.addEventListener('click', btnSelValorAproxClick);
    PAGECONTROLS.controls.btnValorAproximado_3.addEventListener('click', btnSelValorAproxClick);
    PAGECONTROLS.controls.btnValorAproximado_4.addEventListener('click', btnSelValorAproxClick);
    PAGECONTROLS.controls.btnValorAproximado_5.addEventListener('click', btnSelValorAproxClick);

    PAGECONTROLS.controls.btnValorAproximadoMejorar_1.addEventListener('click', btnSelValorAproxMejorarClick);
    PAGECONTROLS.controls.btnValorAproximadoMejorar_2.addEventListener('click', btnSelValorAproxMejorarClick);
    PAGECONTROLS.controls.btnValorAproximadoMejorar_3.addEventListener('click', btnSelValorAproxMejorarClick);
    PAGECONTROLS.controls.btnValorAproximadoMejorar_4.addEventListener('click', btnSelValorAproxMejorarClick);
    PAGECONTROLS.controls.btnValorAproximadoMejorar_5.addEventListener('click', btnSelValorAproxMejorarClick);

    


    // PAGECONTROLS.controls.btnSelMujer.addEventListener('click', btnSelGeneroClick);
    // PAGECONTROLS.controls.btnSelHombre.addEventListener('click', btnSelGeneroClick);

    // PAGECONTROLS.controls.btnReenviarCodigo.addEventListener('click', btnReenviarCodigoClick);

    // fg_cargar_combo_from_List(PAGECONTROLS.controls.cmbfechaNacimientoMes, 'id', 'mes', DtMeses, false);

    fg_cargar_combo_from_List(PAGECONTROLS.controls.cmbEstadoCivil, 'id', 'descripcion', DtEstadosCivil, false);
    fg_cargar_combo_from_List(PAGECONTROLS.controls.cmbActividad, 'id', 'descripcion', DtActividades, false);

    // PAGECONTROLS.controls.txtCP.addEventListener('change', txtCPOnChange);

    PAGECONTROLS.controls.btnChkAutorizo.addEventListener('click', btnChkAutorizoClick);

    //PAGECONTROLS.controls.BtnHistorialCreditoBueno.addEventListener('click', BtnHistorialCreditoBuenoClick);
    PAGECONTROLS.controls.BtnHistorialCreditoBueno_SI.addEventListener('click', Btn_Switch_Click);
    PAGECONTROLS.controls.BtnHistorialCreditoBueno_NO.addEventListener('click', Btn_Switch_Click);

    
    PAGECONTROLS.controls.BtnPagoPuntualHipoteca_SI.addEventListener('click', Btn_Switch_Click);
    PAGECONTROLS.controls.BtnPagoPuntualHipoteca_NO.addEventListener('click', Btn_Switch_Click);

    PAGECONTROLS.controls.btnValorAproximado_5.addEventListener('click', btnSelValorAproxClick);
    
    
    /**
     * Tuna Signup Form Wizard
     * Let's Start
     */
    lunaWizard.start();

});
