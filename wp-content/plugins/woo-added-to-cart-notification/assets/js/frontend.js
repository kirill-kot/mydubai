jQuery( document ).ready( function( $ ) {
	$( 'body' ).on( 'added_to_cart', function( e ) {
		wooac_show();
	} );

	$( 'body' ).on( 'click', '#wooac-continue', function( e ) {
		var url = $( this ).attr( 'data-url' );
		$.magnificPopup.close();
		if ( url != '' ) {
			window.location.href = url;
		}
		e.preventDefault();
	} );
} );

function wooac_show() {
	if ( jQuery.trim( jQuery( '.wooac-popup' ).html() ).length ) {
		jQuery.magnificPopup.open( {
			items: {
				src: jQuery( '.wooac-popup' ),
				type: 'inline'
			},
			mainClass: 'mfp-wooac',
			callbacks: {
				beforeOpen: function() {
					this.st.mainClass = 'mfp-wooac ' + wooac_vars.effect;
				}
			}
		} );
	}
}