window.onload = function () {
  let currentCategory;
  let btn = document.getElementById("view-all");
  let btn2 = document.getElementById("next");

  //bring up trivia catagories
  btn.onclick = function () {
    let hidden = document.getElementsByClassName("hidden");
    for(let i = 0; i < hidden.length; i++) {
      hidden[i].style.display = "contents";
    }

    let hxr = new XMLHttpRequest()
    hxr.responseType = "text";

    hxr.onload = function () {
      if (this.readyState == 4 && this.status == 200) {
        let catagories = JSON.parse(hxr.response);
        for(let i = 2; i < catagories.length; i++) {
          let catagory = document.createElement("li");
          catagory.innerHTML = catagories[i];
          if(i == 2) {
            catagory.className = "selected-category";
            currentCategory = "astronomy";
          }

          //Add listener to select current catagory
          catagory.addEventListener('click', function (event) {
            if(document.getElementsByClassName("selected-category")[0]) {
              document.getElementsByClassName("selected-category")[0].className = "";
            }

            this.className = "selected-category"

            currentCategory = this.innerHTML;
          });
          document.getElementById("categories").appendChild(catagory);
        }
      }
    }

    hxr.open("GET", "trivia.php?mode=categories");
  	hxr.send();
  }

  //get new question
  btn2.onclick = function () {
    let url = "trivia.php?mode=category&name=" + currentCategory;
    let hxr = new XMLHttpRequest()

    hxr.onload = function () {
      if (this.readyState == 4 && this.status == 200) {
        let question = this.response.substr(0,this.response.indexOf("A:"));
        let answer = this.response.substr(this.response.indexOf("A:"),this.response.length - question.length - 3);
        document.getElementById("card").innerHTML = question + "<br />" + answer;
      }
    }

    hxr.open("GET", url);
    hxr.send();
  }
}
