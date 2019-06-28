<?php

$user_login = 'local';
$user_pass  = 'local';

if ( ! username_exists( $user_login ) ) {

	$user_data = array(
		'user_login' => $user_login,
		'user_pass'  => $user_pass,
		'user_email' => 'root@local.dev',
		'role'       => 'administrator',
	);

	$user_id = wp_insert_user( $user_data );

	if ( is_wp_error( $user_id ) ) {
		echo esc_html( $user_id->get_error_message() );
		die();
	}
} else {

	$user = get_user_by( 'login', $user_login );

	if ( false === $user ) {
		esc_html( sprintf( __( 'User could not be fetched by login: %s', 'iqq' ), $user_login ) );
	}

	$user_id = $user->ID;

	// Make sure that local user has default password.
	wp_update_user(
		array(
			'ID' => $user_id,
			'user_pass' => $user_pass,
		)
	);
}

if ( is_multisite() ) {

	if ( ! is_super_admin( $user_id ) ) {
		grant_super_admin( $user_id );
	}

	// Add to all blogs
	$site_ids = get_sites( array( 'fields' => 'ids' ) );

	foreach ( $site_ids as $site_id ) {

		add_user_to_blog( $site_id, $user_id, 'administrator' );

	}
}
