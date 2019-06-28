<?php
/*
Plugin Name: [DEV] Reroute emails to Mailhog
Description: Will reroute all emails to mailhog docker container through SMTP connection if environment variable MAILHOG_CONTAINER_NAME is present and WP_ENV is "development".
Version: 1.0
Author: Resultify
*/

if ( defined( 'WP_ENV' ) && 'development' === WP_ENV && defined( 'MAILHOG_CONTAINER_NAME' ) && ! empty( MAILHOG_CONTAINER_NAME ) ) {

	add_action( 'phpmailer_init', 'configure_smtp' );

	function configure_smtp( PHPMailer $phpmailer ) {
		$phpmailer->isSMTP();
		$phpmailer->{'Host'}       = MAILHOG_CONTAINER_NAME;
		$phpmailer->{'SMTPAuth'}   = false;
		$phpmailer->{'Port'}       = 1025;
		$phpmailer->{'SMTPSecure'} = false;
	}
}
