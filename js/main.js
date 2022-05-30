var $photoUrl = document.querySelector('#photo_url');

$photoUrl.addEventListener('input', function () {
  document.getElementById('img-placeholder').setAttribute('src', $photoUrl.value);
});
