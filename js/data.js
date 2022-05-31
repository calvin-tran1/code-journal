/* exported data */

var data = {
  view: 'entry-form',
  entries: [],
  editing: null,
  nextEntryId: 1
};

var prevData = window.localStorage.getItem('data');

if (prevData !== null) {
  data = JSON.parse(prevData);
}

window.addEventListener('beforeunload', event => {
  var dataJSON = JSON.stringify(data);
  localStorage.setItem('data', dataJSON);
});
