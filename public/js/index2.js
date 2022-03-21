document.querySelector('#checkbox').addEventListener('change', (event) => {

  const checkbox = document.querySelector('#checkbox').checked
  const id = document.querySelector('#id').innerHTML

  console.log(id);

  axios.put('/admin/status', {
      id,
      checkbox
    })
    .then((value) => {
      console.log(value);
      // window.location.href = '/'
    }, (reason) => {
      console.log(reason);
    })
})