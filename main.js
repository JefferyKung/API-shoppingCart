const listElement = document.querySelector(".posts");
const postTemplate = document.querySelector("#single-post");
const form = document.querySelector("#new-post form");
const fetchButton = document.querySelector("#available-posts button");
const postList = document.querySelector("ul");

function sendHttpRequest(method, url, data) {
  //--------------
  // with XHR
  //--------------
  //   const promise = new Promise((resolve, reject) => {
  //     const xhr = new XMLHttpRequest();
  //     xhr.open(method, url);
  //     xhr.onload = function () {
  //       if (xhr.status >= 200 && xhr.status < 300) {
  //         resolve(xhr.response);
  //       } else {
  //         reject(new Error("Something went wrong.... :<"));
  //       }
  //     };
  //     xhr.send();
  //   });
  //   return promise;
  //--------------
  //with fetch function
  //--------------
  //   return fetch(url).then((data) => data.json());
  //--------------
  //with axios
  //--------------
  //   return axios.get(url);

  //example of fetch with optional object as 2nd argument
  return fetch(url, {
    method: method,
    headers: { Accept: "application/json" },
    body: JSON.stringify(data)
  }).then((data) => {
    if(method === "DELETE" && data.status === 200){
        return "Delete successfully"
    }

    return data.json()
  });
}

////////////////////////
// ASYNC CONTROLLERS
////////////////////////
async function fetchPosts() {
  try {
    const responseData = await sendHttpRequest(
      "GET",
      "https://jsonblob.com/api/jsonBlob/1029003043181707264"
    );

    if (responseData.length > 0) {
      for (const post of responseData) {
        const postElClone = document.importNode(postTemplate.content, true);
        postElClone.querySelector("h2").textContent = post.title.toUpperCase();
        postElClone.querySelector("p").textContent = post.price;
        postElClone.querySelector("li").id = post.id;
        postElClone.querySelector("img").setAttribute("src", post.img);
        listElement.appendChild(postElClone);
      }
    }
  } catch (error) {
    console.log(error);
  }
}

async function createPost(title, content) {
  try {
    const post = {
      title: title,
      body: content,
      // userId: Math.random()
    };

    const result = await sendHttpRequest(
      "POST",
      "https://jsonplaceholder.typicode.com/posts",
      post
    );
    console.log(result);
  } catch (error) {
    console.log(error);
  }
}

// async function deletePost(event){
//     if(event.target.tagName === "BUTTON"){

//         event.target.style.backgroundColor = "gray"
//         event.target.style.borderColor = "gray"
//         event.target.textContent = "Loading..."
//         event.target.disabled = true

//         const postToDelete = event.target.closest("li")
//         console.log(postToDelete);

//         const result = await sendHttpRequest("DELETE", "https://jsonplaceholder.typicode.com/posts/" + postToDelete.id)

//         if(result === "Delete successfully"){
//             this.removeChild(postToDelete)
//         }
//     }
// }

//READ
fetchButton.addEventListener("click", fetchPosts);

//CREATE
form.addEventListener("submit", (event) => {
  event.preventDefault();
  const enteredTitle = event.currentTarget.querySelector("#title").value;
  const enteredContent = event.currentTarget.querySelector("#content").value;

  createPost(enteredTitle, enteredContent);
});

//DELETE
// postList.addEventListener("click", deletePost);


// Get the modal
var modal = document.querySelector("#myModal");

$(".close").click(function(){
    modal.style.display = "none";
})

window.addEventListener("click", function(event) {
    if (event.target == modal) {
      modal.style.display = "none";
    }
}
)

$("#cartImage").click(function(){
    $("#cartList").css("display" , "block");
   
})

$(".cartListclose").click(function(){
    $("#cartList").css("display" , "none");
   
})

postList.addEventListener("click", function(){
  modal.style.display = "block";
});



// 新增商品至購物車

function add(me) {
  var tbody = document.getElementById("tb");
  var div = me.parentNode;
  var divGranny = me.parentNode.parentNode;
  var spans = div.getElementsByTagName("span"); // 獲得商品名字和價格的span
  var name = spans[0].innerText; // 獲得商品名字
  var col_1 = tbody.querySelectorAll("td:nth-child(2)"); // nth-child 作為第幾個孩子
  var found = null; // found 變數代表購物車中找到的td
 
  for(var i = 0; i<col_1.length; i++) {
  if( col_1[i].innerText == name) {
   found = col_1[i];
   break;
    }
  }
  if(found != null) { //商品名字存在
    // 修改數量 found 是找到的td
  var tr = found.parentNode;
  var input = tr.querySelector("td:nth-child(5)>input:last-child");
  console.log(input);
  jia(input);

  } else { //商品名字不存在
    // 新增商品
      var tr = document.createElement("tr");
      var th = document.createElement("th");
      th.innerHTML = '<input type="checkbox" checked onclick="calculate()">';
  
      //品名
      var td1 = document.createElement("td");
      td1.innerText = spans[0].innerText;
  
      //照片
      var td2 = document.createElement("td");
      var img = document.createElement("img");
      img.src = div.getElementsByTagName("img")[0].src;
      img.width = "100";
      td2.appendChild(img);
  
      // 價錢
      var td3 = document.createElement("td");
      td3.innerText = spans[1].innerText;
  
      //數量
      var td4 = document.createElement("td");
      td4.innerHTML = '<input type="button" value="-" onclick="jian(this)"><input id="inputNum" type="number" value="1"><input type="button" value="+" onclick="jia(this)">';
  
      //刪除的按鈕
      var td5 = document.createElement("td");
      td5.innerHTML = '<input type="button" value="DELETE" onclick="del(this)">';
  
      tr.appendChild(th);
      tr.appendChild(td1);
      tr.appendChild(td2);
      tr.appendChild(td3);
      tr.appendChild(td4);
      tr.appendChild(td5);
      tbody.appendChild(tr);
      calculate();
 }
 }


// 增加商品數量
function jia(me) {
  var td = me.parentNode;
  var inputs = td.getElementsByTagName("input"); // 找到此td下所有input標籤
  // inputs[1].value = inputs[1].value - 0 + 1; // 用-0的辦法轉為數字
  // parseInt 將字串轉整數 parseFloat 將字串轉小數
      inputs[1].value = parseInt(inputs[1].value) + 1;
   calculate();
}

// 減少商品數量
function jian(me) {
  var td = me.parentNode;
  var num = td.querySelector("input[type=number]");// 只查詢有type=number屬性的input標籤
  var r = num.value - 1;

  if( r >= 1) { // 只有減得的結果是大於等於1的情況下才需要改變文字框的值
    num.value = r;
      calculate();
  }
};

 // 改變複選框的選中狀態
function check(me) {   
  var tbody = document.getElementById("tb");
  var inputs = tbody.querySelectorAll("th input");

  for(var i = 0; i <inputs.length; i++) {
   inputs[i].checked = me.checked; // 根據me的checked狀態去修改下面的每個checked狀態
 }
   calculate();
}

// 移除商品
function del(me) {
  var tr = me.parentNode.parentNode;
  var tbody = tr.parentNode;
  tbody.removeChild(tr);
   calculate();
 }

// function calculate
function calculate() {
  var tbody = document.getElementById("tb");
  var prices = tbody.querySelectorAll("td:nth-child(4)");
  var numbers = tbody.querySelectorAll("td:nth-child(5)>input[type=number]");
  var checkboxes = tbody.querySelectorAll("th:nth-child(1)>input");
  // console.log(prices);
  //  console.log(numbers);
  //  console.log(checkboxes);
 var total=0;
 var itemNum =0;
   for(var i = 0; i < prices.length; i++) {
    console.log("價格：" +parseInt(prices[i].innerText)+" 數量："+parseInt(numbers[i].value) + "是否勾選:" + checkboxes[i].checked);
    if(checkboxes[i].checked){
     total += parseInt(prices[i].innerText)*parseInt(numbers[i].value);
     itemNum += parseInt(numbers[i].value);
 }
   }
   console.log("總價格：" + total);
   console.log("數量"+itemNum);
   document.getElementById("total").innerText = total;
   document.getElementById("itemNumH3").innerText = "("+itemNum+")";
  

 }
