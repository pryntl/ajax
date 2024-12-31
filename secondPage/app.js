"use strict";

const submit = document.querySelector("#submit");
submit.addEventListener("click", getStatus);

const fName = document.querySelector("#fName");
const lName = document.querySelector("#lName");
function getStatus() {
  if (
    fName.value.length >= 1 &&
    lName.value.length >= 1 &&
    isNaN(fName.value) &&
    isNaN(lName.value)
  ) {
    const xhr = new XMLHttpRequest();
    xhr.open("GET", "./data.txt");
    xhr.onload = function () {
      if (this.status >= 100 && this.status < 200) {
        Swal.fire({
          title: "Your Status Is 1xx",
          icon: "info",
          text: "meaning: Informational Response",
        });
      } else if (this.status >= 200 && this.status < 300) {
        Swal.fire({
          title: "Your Status Is 2xx",
          text: "meaning: success",
          icon: "success",
        });
      } else if (this.status >= 300 && this.status < 400) {
        Swal.fire({
          title: "Your Status Is 3xx",
          text: "meaning: Redirection",
          icon: "question",
        });
      } else if (this.status >= 400 && this.status < 500) {
        Swal.fire({
          icon: "error",
          title: "Your Status Is 4xx",
          text: "It's Your Own Fault Lil Bro",
        });
      } else if (this.status >= 500) {
        let timerInterval;
        Swal.fire({
          title: "Your Status Is 5xx!",
          text: "Oops.. My Bad Bruh",
          html: "I will close in <b></b> milliseconds.",
          timer: 2000,
          timerProgressBar: true,
          didOpen: () => {
            Swal.showLoading();
            const timer = Swal.getPopup().querySelector("b");
            timerInterval = setInterval(() => {
              timer.textContent = `${Swal.getTimerLeft()}`;
            }, 100);
          },
          willClose: () => {
            clearInterval(timerInterval);
          },
        }).then((result) => {
          /* Read more about handling dismissals below */
          if (result.dismiss === Swal.DismissReason.timer) {
            console.log("I was closed by the timer");
          }
        });
      }
    };

    xhr.send();
  } else {
    Swal.fire({
      icon: "error",
      title: "ERROR",
      text: "Fill In The Blanks Properly",
    });
  }
  fName.value = "";
  lName.value = "";
}
