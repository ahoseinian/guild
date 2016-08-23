import $ from 'jquery';

$('#btnShowGuildForm').on('click', function() {
  $('#guildSubmitForm').removeClass('hidden-xs-up');
  $(this).closest('blockquote').hide();
});
