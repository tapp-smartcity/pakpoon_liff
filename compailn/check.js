window.onload = async () => {
  const UID = await getUID();
  let data = await fetch(
    'https://smartcity-pakpoon-api.herokuapp.com/appeal/find/data?userID=' + UID
  );
  let html = '';
  data = await data.json();
  data = data.data;
  data = data.reverse();
  const c = data.lenght;
  data.forEach((item, key) => {
    html += `
      <div class="min-vw-100">
        <div class="card">
          <div class="card-body">
          <div class="row">
          <div class="col-4">
          <h2><img style="width:100px" src="https://smartcity-pakpoon-api.herokuapp.com/userSmart/${
            item.img[0]
          }"/></h2>
        </div>
        <div class="col-8" >
          <h2 style="color:green;">เลขที่ :${c - (key + 1)}</h2>
          <h4>เรื่อง :${item.topic}</h4>
          <h4>รายละเอียด :${item.type}</h4>
          <h4>สถานะ :<span style="color:${
            item.status === 'รอตรวจสอบ' ? 'skyblue' : 'pink'
          }";>${item.status}</span></h4>
        
        </div>
        </div>
        <br>
        <div class="row">
        <h4>${toThaidate(item.updated)}</h4>
        </div>
        <a class="btn btn-outline-primary " href="./check_details?_id=${
          item._id
        }&key=${key}" style="width: 100%;">
        ดูรายละเอียด</a>
  
          </div>
           
        </div>
      </div>
      `;
  });
  document.getElementById('content').innerHTML = html;
};
