"use strict";
var KTModalOfferADealType = function () {
    var e, t, o, r;
    return {
        init: function () {
            o = KTModalOfferADeal.getForm(), r = KTModalOfferADeal.getStepperObj(), e = KTModalOfferADeal.getStepper().querySelector('[data-kt-element="type-next"]'), t = FormValidation.formValidation(o, {
                plugins: {
                    trigger: new FormValidation.plugins.Trigger,
                    bootstrap: new FormValidation.plugins.Bootstrap5({
                        rowSelector: ".fv-row",
                        eleInvalidClass: "",
                        eleValidClass: ""
                    })
                }
            }), e.addEventListener("click", (function (o) {
                o.preventDefault(), e.disabled = !0, t && t.validate().then((function (t) {
                    console.log("validated!"), "Valid" == t ? (e.setAttribute("data-kt-indicator", "on"), setTimeout((function () {
                        e.removeAttribute("data-kt-indicator"), e.disabled = !1, r.goNext()
                    }), 1e3)) : (e.disabled = !1)
                }))
            }))
        }
    }
}();
"undefined" != typeof module && void 0 !== module.exports && (window.KTModalOfferADealType = module.exports = KTModalOfferADealType);
