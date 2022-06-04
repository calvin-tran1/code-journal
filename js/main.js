var $photoUrl = document.querySelector('#photo_url');
var $form = document.querySelector('#journal-form');
var $ul = document.querySelector('ul');
var $entriesBtn = document.querySelector('.entries-btn');
var $entryForm = document.querySelector('.entry-form');
var $newEntryBtn = document.querySelector('.new-entry-btn');
var $entries = document.querySelector('.entries');
var $title = document.querySelector('#title');
var $notes = document.querySelector('#notes');
var $imgPlaceholder = document.querySelector('#img-placeholder');
var $list = document.querySelectorAll('li');
var $delete = document.querySelector('.delete-btn');

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

  // start@submit edited entry
  if (data.editing !== null) {
    var edit = {
      titleValue: $title.value,
      photoUrlValue: $photoUrl.value,
      notesValue: $notes.value,
      entryId: data.editing.entryId
    };

    for (var i = 0; i < data.entries.length; i++) {
      if (data.entries[i].entryId === edit.entryId) {
        data.entries[i] = edit;

        var dataEntryId = $list[i].getAttribute('data-entry-id');
        if (data.entries[i].entryId === dataEntryId) {
          $list[i].replaceWith(createEntry(data.entries[i]));
        }
      }
    }
    data.editing = null;
    // end@submit edited entry
  } else if (data.editing === null) {
    data.nextEntryId++;
    data.entries.unshift(obj);
    document.getElementById('img-placeholder').setAttribute('src', 'images/placeholder-image-square.jpg');
  }
  $form.reset();

  data.view = 'entries';

  $entries.classList.remove('hidden');
  $entryForm.classList.remove('hidden');
  $entryForm.className = 'entry-form container hidden';
  $delete.className = 'delete-btn hidden';

  location.reload();
});

// start@dom creation for entries
function createEntry(entry) {
  // start@li node creation
  var $li = document.createElement('li');
  $li.setAttribute('data-entry-id', entry.entryId);
  $ul.appendChild($li);
  // end@li node creation

  // start@image node creation
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
  // end@image node creation

  // start@title node creation
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
  // end@title node creation

  // start@notes node creation
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
  // end@notes node creation

  // start@edit icon node creation
  var $edit = document.createElement('i');
  $edit.className = 'fas fa-pen';
  $divColumnFullEntriesTitle.appendChild($edit);
  // end@edit icon node creation

  return $li;
}
// end@dom creation for entries

// start@load dom content for new entries
document.addEventListener('DOMContentLoaded', event => {
  for (var i = 0; i < data.entries.length; i++) {
    var journalEntries = createEntry(data.entries[i]);
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

  $form.reset();

  $imgPlaceholder.src = 'images/placeholder-image-square.jpg';
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

  $form.reset();
  $delete.className = 'delete-btn hidden';
  $imgPlaceholder.src = 'images/placeholder-image-square.jpg';
  data.view = 'entry-form';
});
// end@new entry

// start@edit entry
$ul.addEventListener('click', function (e) {
  if (e.target.matches('i')) {
    $entryForm.classList.remove('hidden');
    $entries.className = 'entries container hidden';
    data.view = 'entry-form';

    var dataEntry = e.target.closest('li').getAttribute('data-entry-id');
    dataEntry = parseInt(dataEntry);

    for (var i = 0; i < data.entries.length; i++) {
      if (data.entries[i].entryId === dataEntry) {
        data.editing = data.entries[i];
      }
    }
    $delete.classList.remove('hidden');
    $title.value = data.editing.titleValue;
    $photoUrl.value = data.editing.photoUrlValue;
    $imgPlaceholder.src = $photoUrl.value;
    $notes.value = data.editing.notesValue;
  }
});
// end@edit entry
