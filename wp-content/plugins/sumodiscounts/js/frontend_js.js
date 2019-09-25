/*frontend_js*/
jQuery( function ( $ ) {
    var frontend_js = {
        init : function ( ) {
            $( document ).on( 'found_variation.wc-variation-form' , { variationForm : this } , this.onFoundVariation ) ;
            $( document ).on( 'focusout' , '#billing_email' , this.fp_apply_discount_for_user ) ;
        } ,
        onFoundVariation : function ( ) {
            var variation_id = $( 'input[name=variation_id]' ).val() ;
            frontend_js.after_disp_after_add_to_cart( variation_id ) ;
        } ,
        after_disp_after_add_to_cart : function ( variation_id ) {
            if ( variation_id != '' && variation_id != undefined ) {
                frontend_js.block( '.variations_form' ) ;
                var data = ( {
                    action : 'sumo_discounts_var_fields' ,
                    var_id_data : variation_id ,
                } ) ;
                jQuery.post( fp_sd_args.ajaxurl , data , function ( response ) {
                    jQuery( ".sd_print_price_var" ).remove() ;
                    jQuery( ".sd_variation_datas" ).append( '<span class="sd_print_price_var">' + response + '</span>' ) ;
                    frontend_js.unblock( '.variations_form' ) ;
                } ) ;
            }
        } ,
        fp_apply_discount_for_user : function () {
            frontend_js.block( '.woocommerce-checkout' ) ;
            var billing_email = jQuery( this ).val() ;
            var data = {
                action : 'fp_apply_discount_for_first_purchase' ,
                billing_email : billing_email ,
                sumo_security : fp_sd_args.sd_ajax_nonce
            } ;
            $.post( fp_sd_args.ajaxurl , data , function ( response ) {
                if ( true === response.success ) {
                    frontend_js.unblock( '.woocommerce-checkout' ) ;
                    $('body').trigger('update_checkout');
                } else {
                    window.alert( response.data.error ) ;
                    frontend_js.unblock( '.woocommerce-checkout' ) ;
                }
            } ) ;
        } ,
        block : function ( id ) {
            $( id ).block( {
                message : null ,
                overlayCSS : {
                    background : '#fff' ,
                    opacity : 0.6
                }
            } ) ;
        } ,
        unblock : function ( id ) {
            $( id ).unblock() ;
        } ,
    } ;
    frontend_js.init( ) ;
} ) ;
