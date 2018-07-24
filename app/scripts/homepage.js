$(document).ready( function () {
  
  
  // Replace preview images by backgrounds
  $('.preview').each(function () {
    const bg = $(this).children("img").attr("src")
    if ( !bg ) return
    $(this).css("background-image", "url("+ bg +")").empty()
  })
  
  
  console.log("hello");
})