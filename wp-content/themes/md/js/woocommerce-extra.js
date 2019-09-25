jQuery3_2_1(document).ready(function () {
    var j = 1;
    var h;
    var d;
    var e;
    var i;
    var b;
    let manufacturer_sidebar_id;
    var a = jQuery3_2_1(".catalog__body").data("sales");

    function f() {
        h = jQuery3_2_1(".drop-sort .dropdown-item .active").data("orderby") ? jQuery3_2_1(".drop-sort .dropdown-item .active").data("orderby") : "none";
        d = jQuery3_2_1(".drop-sort .dropdown-item .active").data("order") ? jQuery3_2_1(".drop-sort .dropdown-item .active").data("order") : "ASC";
        e = jQuery3_2_1(".drop-sort .dropdown-item .active").data("orderkey") ? jQuery3_2_1(".drop-sort .dropdown-item .active").data("orderkey") : "";
        b = jQuery3_2_1(".catalog__body").data("category") ? jQuery3_2_1(".catalog__body").data("category") : "all";
        var l = Array();
        jQuery3_2_1('.catalog__filter__group__more [type="checkbox"]').each(function () {
            if (jQuery3_2_1(this).is(":checked")) {
                l.push(jQuery3_2_1(this).data("manufacturer"))
            } else {
                l = Array("all")
            }
        });
        j++;
        i = "&postsPerPage=-1&action=more_products_ajax&category=" + b + "&manufacturer=" + l + "&orderby=" + h + "&order=" + d + "&meta_key=" + e + "&sale_mode=" + a;
        jQuery3_2_1.ajax({
            type: "POST", dataType: "html", url: ajax_more.ajaxurl, data: i, beforeSend: function () {
            }, success: function (n) {
                var m = jQuery3_2_1(n);
                if (n.length) {
                    jQuery3_2_1(".content-block__body").append(n);
                    jQuery3_2_1(n).css({opacity: "0"});
                    jQuery3_2_1("#all_products").attr("disabled", false);
                    jQuery3_2_1(n).css({opacity: "1"});
                    jQuery3_2_1("#all_products, #more_products").css({display: 'none'});
                } else {
                    jQuery3_2_1("#all_products").attr("disabled", true)
                }
            }, error: function (m, o, n) {
                console.log(m + " :: " + o + " :: " + n)
            }
        });
        return false
    }

    jQuery3_2_1("#all_products").on("click", function () {
        jQuery3_2_1("#all_products").attr("disabled", true);
        f()
    });

    // decorator to catch close event of MagnificPopup
    jQuery.magnificPopup.instance.close = function () {
        jQuery3_2_1('.woocommerce-notices-wrapper').empty();
        jQuery.magnificPopup.proto.close.call();
    };

});