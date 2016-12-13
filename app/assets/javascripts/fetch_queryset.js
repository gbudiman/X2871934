function fetch_queryset() {
  var render_step2 = function(data) {
    return new Promise(
      function(resolve, reject) {

        $.each(data, function(name, x) {
          var s = $('<div></div>')
                    .addClass('col-xs-12 col-sm-6 col-md-4 col-lg-2')
                    .append($('<img></img>')
                              .attr('alt', name)
                              .attr('src', 'photo_placeholder.jpg')
                              .addClass('img-rounded img-padded')
                              .attr('width', 128)
                              .attr('height', 128));

          $('#step2').append(s);
        })

        resolve();
      }
    );
  }

  $('#step2-placeholder').hide();
  $('#step2-loading').show();
  $.get({
    url: '/fetch/queryset'
  }).done(function(data) {
    console.log(data);
    $('#step2-loading').hide();
    render_step2(data).then(function() {
      maximize_height($('#step2'), 16);
    })
  })
}