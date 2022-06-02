var $photoUrl = document.querySelector('#photo_url');
var $form = document.querySelector('#journal-form');
var $ul = document.querySelector('ul');
var $entriesBtn = document.querySelector('.entries-btn');
var $entryForm = document.querySelector('.entry-form');
var $newEntryBtn = document.querySelector('.new-entry-btn');
var $entries = document.querySelector('.entries');

// start@photoURL updates placeholder img
$photoUrl.addEventListener('input', function () {
  document.getElementById('img-placeholder').setAttribute('src', $photoUrl.value);
});
// end@photoURL updates placeholder img

// start@submit form inputs to data

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
  data.view = 'entries';
  $form.reset();
  $entries.classList.remove('hidden');
  $entryForm.classList.remove('hidden');
  $entryForm.className = 'entry-form container hidden';

  location.reload();
});
// end@submit form inputs to data

// start@dom creation for entries
var id = 0;
function journal(entry) {
  // start@li dom creation
  var $li = document.createElement('li');
  $li.setAttribute('data-entry-id', id++);
  $ul.appendChild($li);
  // end@li dom creation

  // start@image dom creation
  var $divRowEntries = document.createElement('div');
  $divRowEntries.classList.add('row', 'entries');
  $li.appendChild($divRowEntries);

  var $divColumnHalfEntriesImg = document.createElement('div');
  $divColumnHalfEntriesImg.classList.add('column-half', 'entries', 'img');
  $divRowEntries.appendChild($divColumnHalfEntriesImg);

  var $entryImg = document.createElement('img');
  $entryImg.classList.add('entry-img');
  $divColumnHalfEntriesImg.appendChild($entryImg);

  $entryImg.setAttribute('src', entry.photoUrlValue);
  // end@image dom creation

  // start@title dom creation
  var $divColumnHalfEntriesTitleNotes = document.createElement('div');
  $divColumnHalfEntriesTitleNotes.classList.add('column-half', 'entries', 'title-notes');
  $divRowEntries.appendChild($divColumnHalfEntriesTitleNotes);

  var $divRowTitle = document.createElement('div');
  $divRowTitle.classList.add('row', 'title');
  $divColumnHalfEntriesTitleNotes.appendChild($divRowTitle);

  var $divColumnFullEntriesTitle = document.createElement('div');
  $divColumnFullEntriesTitle.classList.add('column-full', 'entries', 'title');
  $divRowTitle.appendChild($divColumnFullEntriesTitle);

  var $pTitle = document.createElement('p');
  $pTitle.classList.add('title');
  $divColumnFullEntriesTitle.appendChild($pTitle);

  $pTitle.append(entry.titleValue);
  // end@title dom creation

  // start@notes dom creation
  var $divRowNotes = document.createElement('div');
  $divRowNotes.classList.add('row', 'notes');
  $divColumnHalfEntriesTitleNotes.appendChild($divRowNotes);

  var $divColumnFullEntriesNotes = document.createElement('div');
  $divColumnFullEntriesNotes.classList.add('column-full', 'entries', 'notes');
  $divRowNotes.appendChild($divColumnFullEntriesNotes);

  var $pNotes = document.createElement('p');
  $pNotes.classList.add('notes');
  $divColumnFullEntriesNotes.appendChild($pNotes);

  $pNotes.append(entry.notesValue);
  // end@notes dom creation

  // start@edit icon dom creation
  var $edit = document.createElement('i');
  $edit.className = 'fas fa-pen';
  $divColumnFullEntriesTitle.appendChild($edit);
  // end@edit icon dom creation

  return $li;
}
// end@dom creation for entries

// start@load dom content for new entries
window.addEventListener('DOMContentLoaded', event => {
  for (var i = 0; i < data.entries.length; i++) {
    var journalEntries = journal(data.entries[i]);

    $ul.appendChild(journalEntries);
  }
});
// end@load dom content for new entries

// start@nav entries
$entriesBtn.addEventListener('click', function (e) {
  if (e.target && e.target.matches('.entries-btn')) {
    $entryForm.className = 'entry-form container hidden';
    $entries.className = 'entries container';
  } else {
    $entryForm.classList.remove('hidden');
    $entries.classList.remove('hidden');
  }

  data.view = 'entries';
});
// end@nav entries

// start@new entry btn
$newEntryBtn.addEventListener('click', function (e) {
  if (e.target && e.target.matches('.new-entry-btn')) {
    $entryForm.classList.remove('hidden');
    $entries.className = 'entries container hidden';
  } else {
    $entries.classList.remove('hidden');
  }

  data.view = 'entry-form';
});
// end@new entry

$ul.addEventListener('click', function (e) {
  if (e.target.matches('i')) {
    $entryForm.classList.remove('hidden');
    $entries.className = 'entries container hidden';
    data.view = 'entry-form';
  }

});
