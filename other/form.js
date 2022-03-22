liff.init({ liffId: '1656902981-0g1VVnpN' });
async function getUID() {
  const data = await liff.getProfile();
  const uid = await data.userId;
  return uid;
}

function loadFile(event) {
  let reader = new FileReader();
  reader.onload = function () {
    $('#list_images').append(`
    <div class="item">
        <img src="${reader.result}">
    </div>
    `);
    $('#upload').val('');
  };
  reader.readAsDataURL(event.target.files[0]);
}

$(document).ready(async () => {
  document.getElementsByTagName('BODY')[0].style.display = 'none';
  if (!liff.isLoggedIn()) {
    liff.login({
      redirectUri: 'https://wonderful-lalande-320066.netlify.app/register.html'
    });
  }
  const uid = await getUID();
  const checkUser = await checkUser(uid);
  if (!checkUser) {
    window.location = '../register.html?page=other';
  } else {
    document.getElementsByTagName('BODY')[0].style.display = '';
  }
  const urlParams = new URLSearchParams(window.location.search);
  // const myParam = urlParams.get('topic');
  var requestOptions = {
    method: 'GET',
    redirect: 'follow'
  };
  // console.log(myParam);
  let data = await fetch(
    'https://smartcity-pakpoon-api.herokuapp.com/petition/search?topic=',
    requestOptions
  );
  data = await data.json();
  let html = '';
  $('#topic').text(data.topic.type);
  data.type.forEach((element) => {
    html += `<option value="${element}">${element}</option>`;
  });
  $('#choice1').append(html);
});

$('form').submit((e) => {
  e.preventDefault();
  Swal.fire({
    title: 'ยืนยันการยื่นคำร้อง',
    showDenyButton: true,
    showCancelButton: false,
    confirmButtonText: 'ยืนยัน',
    denyButtonText: 'ยกเลิก'
  }).then((result) => {
    if (result.isConfirmed) {
      Swal.fire('ยื่นคำร้องสำเร็จ', '', 'success');
    }
  });
});
