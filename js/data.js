/* exported data */

var data = {
  view: 'entries',
  entries: [],
  editing: null,
  nextEntryId: 1
};

var prevData = window.localStorage.getItem('data');
var $entries = document.querySelector('.entries');
var $entryForm = document.querySelector('.entry-form');
var $entriesPlaceholder = document.querySelector('.entries-placeholder');

if (prevData !== null) {
  data = JSON.parse(prevData);
  if (data.view === 'entry-form') {
    $entries.className = 'entries container hidden';
    $entryForm.className = 'entry-form container';
  }
  if (data.entries !== undefined) {
    $entriesPlaceholder.className = 'entries-placeholder hidden';
  } else {
    $entriesPlaceholder.classList.remove('hidden');
  }
}

window.addEventListener('beforeunload', event => {
  var dataJSON = JSON.stringify(data);
  localStorage.setItem('data', dataJSON);
});
