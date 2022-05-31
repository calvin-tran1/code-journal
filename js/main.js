var $photoUrl = document.querySelector('#photo_url');
var $form = document.querySelector('#journal-form');

$photoUrl.addEventListener('input', function () {
  document.getElementById('img-placeholder').setAttribute('src', $photoUrl.value);
});

$form.addEventListener('submit', function (event) {
  event.preventDefault();

  var titleValue = $form.elements.title.value;
  var photoUrlValue = $form.elements.photoUrl.value;
  var notesValue = $form.elements.notes.value;
  var entryId = data.nextEntryId;
  var obj = { titleValue, photoUrlValue, notesValue, entryId };

  data.nextEntryId++;
  data.entries.unshift(obj);
  document.getElementById('img-placeholder').setAttribute('src', 'images/placeholder-image-square.jpg');

  return $form.reset();
});
