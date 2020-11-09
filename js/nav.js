/* eslint-disable no-undef */
document.addEventListener("DOMContentLoaded", function () {
  const elems = document.querySelectorAll(".sidenav");
  let typeFavorit = '';
  M.Sidenav.init(elems);
  loadNav();

  let page = window.location.hash.substr(1);
  loadPage(setupPage(page));

  function setupPage(page){
    if (page == "" || page == "#") {
      page = "home";
    } else if (page === "favorit" || page === "fav-team") {
      page = "favorit";
      typeFavorit = "team";
    } else if (page === "fav-player") {
      page = "favorit";
      typeFavorit = "player";
    } else if (page === "fav-match") {
      page = "favorit";
      typeFavorit = "match";
    }
    return page;
  }

  function loadPage(page){
    const xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
      const content = document.querySelector("#body-content");

      if (this.readyState == 4) {
        if (page === "home") {
          console.log("Home");
        } else if (page == "klasemen") {
          getKlasemen();
        } else if (page == "jadwal") {
          getMatchLeague();
        } else if (page == "favorit") {
          readDataFavHtml(typeFavorit);
        } else {
          tipeFavorit = "";
        }

        if (this.status == 200) {
          content.innerHTML = xhttp.responseText;
        } else if (this.status == 404) {
          content.innerHTML = "<p>Halaman tidak ditemukan.</p>";
        } else {
          content.innerHTML = "<p>Ups.. halaman tidak dapat diakses.</p>";
        }
      }
    };

    xhttp.open("GET", "pages/" + page + ".html", true);
    xhttp.send();
  }

  function loadNav(){
    const xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
      if (this.readyState == 4) {
        if (this.status != 200) return;

        document.querySelectorAll(".topnav, .sidenav").forEach( (elm) => {
          elm.innerHTML = xhttp.responseText;
        });

        document.querySelectorAll(".sidenav a, .topnav a").forEach( (elm) => {
          elm.addEventListener("click",  function(event) {
            const sidenav = document.querySelector(".sidenav");
            M.Sidenav.getInstance(sidenav).close();

            page = event.target.getAttribute("href").substr(1);
            loadPage(page);
          });
        });
      }
    };
    xhttp.open("GET", "nav.html", true);
    xhttp.send();
  }
});