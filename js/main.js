var PAGECONTROLS;
var OBJCaptura;


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

        var stepsfooterbanner  = $(".steps-footer-banner").height();
        var lunaContainer = $(".luna-signup-container");
        var lunaLeft = $(".luna-signup-left");
        var lunaLeftOverlay = $(".luna-signup-left-overlay");
        var container = $(".container");


        console.log(windowHeight);
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

        
        
        $('html,body').animate({ scrollTop: 0 }, 'slow');

        if (nextStep <= 0 || nextStep > this.stepCount) {
            return false;
        }
        
        var form = $("form[name='signupForm']");
        form.validate({
            rules : {},
            ignore: ":hidden",
            errorPlacement: function (error, element) {
                
                var formGroup = element.parents(".form-group");
                formGroup.find(".errorIcon").remove();
                formGroup.append('<span class="errorIcon"><i class="icon icon-info"></i></span>');
                element.parents(".form-group").find(".errorIcon").show().find("i").attr("title", error.text()).tooltip({container: 'body'});
            }
        })
        
        

        //Change Step
        if (nextStep > currentStep) {
            if (!form.valid()) {
                console.log("form is invalid");
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

            form.find("input[type='text'],input[type='email'],input[type='tel'],select, textarea").each(function () {
                stepConfirm.find("." + $(this).attr("name")).text($(this).val());
            });

            form.find("input[type='radio']").each(function () {
                if ($(this).prop("checked")) {
                    stepConfirm.find("." + $(this).attr("name")).text($(this).val());
                }
            });

            /*
             var hobbies = $("input[name='tn_hobbies[]']:checked").map(function () {
             return this.value;
             }).get();
             */
        } else {
            $(".button-container").fadeIn();
            $(".toNext").fadeIn();
        }

        if(nextStep==1){
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
        $(".datepicker").datepicker().on('changeDate', function(e){
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

function handleFileSelect()
{
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

function btnStep1NextClick(){

    try{

    }
    catch(e)
    {
        fg_mensaje_problema_tecnico(e);
    }
}

function btnSelQuebuscasClick(_btn){

    try{

        var spanText = _btn.getElementByTag("span").innerHTML;
        OBJCaptura.QueBuscas = spanText;
    }
    catch(e)
    {
        fg_mensaje_problema_tecnico(e);
    }
}

$(document).ready(function () {

    PAGECONTROLS = fg_setIFRAMEControls('lunaSignUpContainer');
    OBJCaptura = new Object();

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



    /**
     * Tuna Signup Form Wizard
     * Let's Start
     */
    lunaWizard.start();

});
