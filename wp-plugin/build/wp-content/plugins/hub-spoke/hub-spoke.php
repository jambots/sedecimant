<?php
$atMs=time();
/*
Plugin name: WordPress Hub Spoke
Plugin URI: http://chromaris.org
Description: Syndicate and Aggregate.
Author: Terrance Schubring
Author URI: http://jambots.com
Version: 0.5
*/
// plugin menu link
add_action( 'admin_menu', 'hub_spoke_menu' );
function hub_spoke_menu(){
  $page_title = 'WordPress Hub Spoke';
  $menu_title = 'Hub Spoke';
  $capability = 'manage_options';
  $menu_slug  = 'hub-spoke';
  $function   = 'hub_spoke_page';
  $icon_url   = 'dashicons-media-code';
  $position   = 4;

  add_menu_page($page_title,$menu_title,$capability,$menu_slug,$function,$icon_url,$position );
	add_action( 'admin_init', 'update_hub_spoke' );
}
//plugin menu page
if( !function_exists("hub_spoke_page") ){
	function hub_spoke_page(){
	?>
	  <h1>WordPress Hub Spoke</h1>

    <div style=" float:left; border:1px solid grey; background-color:white; width:400px;padding:10px; margin:5px;">
      <div id="syndicate">Loading...</div>
    </div>
    <form method="post" action="options.php">
	    <div style=" float:left; border:1px solid grey; background-color:white; width:400px;padding:10px; margin:5px;">
        <h3>Filter Sources</h3>
        <input type="radio" name="hub_spoke_route" value="approved" <?php checked("approved", get_option('hub_spoke_route'), true); ?> onchange="filterChanged('approved')">Approved &nbsp;

        <input type="radio" name="hub_spoke_route" value="list" <?php checked("list", get_option('hub_spoke_route'), true); ?> onchange="filterChanged('list')">All
         <h3>Select Sites to Aggregate</h3>
            <div id="selectSites">Loading...</div>

	      <?php settings_fields( 'hub-spoke-settings' ); ?>
        <?php if( isset($_GET['settings-updated']) ) { ?>
        <?php } ?>
        <input type="hidden" name="hub_spoke_selected" value='<?php echo get_option( 'hub_spoke_selected' ); ?>' />
	      <?php do_settings_sections( 'hub-spoke-settings' ); ?>
        <?php submit_button(); ?>
        <div id="message" class="updated" style="display:none;">
        <p><strong><?php _e('Settings saved.') ?></strong></p>
      </div>
    </div>
	  </form>
<!--
    blogname=<?php echo get_option('blogname') ?><br>
    hub_spoke=<?php echo get_option('hub_spoke_selected') ?><br>
-->
    <script type="text/javascript">
    //var selectedHubSpokes=<?php echo json_encode(get_option('hub_spoke_selected')) ?>;
    var selectedHubSpokes=<?php echo get_option('hub_spoke_selected') ?>;
    //alert(typeof selectedHubSpokes);
    if(typeof selectedHubSpokes=="function"){
      selectedHubSpokes=[];
    }
    console.log(typeof selectedHubSpokes);
    console.log(selectedHubSpokes);
    var blogname=<?php echo json_encode(get_option('blogname')) ?>;
    var siteurl=<?php echo json_encode(get_option('siteurl')) ?>;
    var route=<?php echo json_encode(get_option('hub_spoke_route')) ?>;
    </script>
    <script src="https://code.jquery.com/jquery-3.2.1.min.js"></script>
    <script src="/wp-content/plugins/hub-spoke/hub-spoke.js?<?php echo rand(); ?>"></script>

	<?php
	}
}
// allows save to wp_options
if( !function_exists("update_hub_spoke") ) {
  function update_hub_spoke() {
    add_option('hub_spoke_selected', []);
    register_setting( 'hub-spoke-settings', 'hub_spoke_selected' );
    add_option('hub_spoke_route', 'approved');
    register_setting( 'hub-spoke-settings', 'hub_spoke_route' );
  }
}

// create a category on activate
add_action( 'activated_plugin', 'hubspoke_insert_category' );
function hubspoke_insert_category() {
	wp_insert_term(
		'Hub Spoke',
		'category',
		array(
		  'description'	=> 'Posts to be syndicated with the Hub Spoke plugin',
		  'slug' 		=> 'hub-spoke'
		)
	);
}

// display formatted code in content
/*
add_action( 'the_content', 'code_format' );
function code_format ( $content ) {
 $content = str_replace("<p>", "", $content);
 $content = str_replace("</p>", "", $content);
 $content = str_replace("<", "&lt;", $content);
 $content = str_replace(">", "&gt;", $content);
 $content = str_replace(" ", "&nbsp;", $content);
 $content = str_replace("\n", "<br>", $content);
 return '<span style="font-family:\'Lucida Console\', Monaco, monospace">'.$content.'</span>';
}
*/
register_activation_hook( __FILE__, 'my_plugin_create_db' );
function my_plugin_create_db() {

	global $wpdb;
	$charset_collate = $wpdb->get_charset_collate();
	$table_name = $wpdb->prefix . 'my_analysis';

	$sql = "CREATE TABLE $table_name (
		id mediumint(9) NOT NULL AUTO_INCREMENT,
		time varchar(12) NOT NULL,
    blogName varchar(255) NOT NULL,
    postId varchar(255) NOT NULL,
    published varchar(255) NOT NULL,
    tags varchar(255) NOT NULL,
    siteUrl varchar(255) NOT NULL,
    type varchar(255) NOT NULL,
    payload mediumtext NOT NULL,
    username varchar(255) NOT NULL,
		UNIQUE KEY id (id)
	) $charset_collate;";

	require_once( ABSPATH . 'wp-admin/includes/upgrade.php' );
	dbDelta( $sql );
}
add_action( 'transition_post_status', 'a_new_post', 10, 3 );

function a_new_post( $new_status, $old_status, $post )
{
    if ( 'publish' !== $new_status or 'publish' === $old_status )
        return;

    if ( 'post' !== $post->post_type )
        return; // restrict the filter to a specific post type

    // do something awesome
    global $wpdb;
    global $atMs;
    global $post;
    $ppid = $post->ID;

    $wpdb->insert(
        'wp_my_analysis',
        array(
          'time'      => $atMs,
          'blogName'   => "jjjjjjj",
          'postId'    => "jvbdvihsb",
          'published'    => "false",
          'tags'    => "",
          'siteUrl' => "http://",
          'type'    => "emptyObj",
          'payload'    => "{}",
            'username'    => "A username",
        )
    );
    $record_id = $wpdb->insert_id;

}

function my_enqueue($hook) {
    global $atMs;
    if (( 'post-new.php' != $hook )&&( 'post.php' != $hook )) {
        return;
    }
    //wp_register_script('my_custom_script', '/wp-content/plugins/hub-spoke/test.js' );

    wp_enqueue_script( 'my_custom_script',  '/wp-content/plugins/hub-spoke/hub-post-new.js' );
    global $post;
    $id = $post->ID;
    add_post_meta($id, "msKey", $atMs, 'true');


    $current_user = wp_get_current_user();
    $dataToBePassed = array(
      'msKey' => $atMs,
      'userId' => $current_user->ID,
      'postId' => $id,
        'userLogin' => $current_user->user_login,
        'userEmail' => $current_user->user_email
    );
    wp_localize_script( 'my_custom_script', 'php_vars', $dataToBePassed );
    wp_enqueue_script( 'my_custom_script');

}
add_action( 'admin_enqueue_scripts', 'my_enqueue' );


function wrap_attachments($html, $id, $caption, $title, $align, $url) {
  $src  = wp_get_attachment_image_src( $id, $size, false );
  $output = "id=$id<div id='post-$id media-$id' class='align$align'>";
  $output .= "<img id='postImage-$id' class='postImage'  src='$src[0]' alt='$title' width='$src[1]' height='$src[2]' />";
  $output .= "</div>";
  $output .= "";

  return $output;
}
add_filter( 'image_send_to_editor', 'wrap_attachments', 10, 9 );
