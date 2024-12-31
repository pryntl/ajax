"use strict";

//selecting the items
const fName = document.querySelector("#fName");
const lName = document.querySelector("#lName");
const submit = document.querySelector("#submit");

//adding event listener
submit.addEventListener("click", getStatus);

//ajax function to get the status and show an alarm without refreshing the page
function getStatus() {
  
  //validation: if the inputs are not empty and values of inputs are not number
  if (
    fName.value.length >= 1 &&
    lName.value.length >= 1 &&
    isNaN(fName.value) &&
    isNaN(lName.value)
  ) {

    //create the request
    const xhr = new XMLHttpRequest();

    //open the request
    xhr.open("GET", "./data.txt");

    //load the request
    xhr.onload = function () {
      
      //specifying the statuses and putting different sweet alerts for each
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
          if (result.dismiss === Swal.DismissReason.timer) {
            console.log("I was closed by the timer");
          }
        });
      }
    };

    //sending the request
    xhr.send();
  }

  //if the conditions are not true an alert will apear the inform the user
  else {
    Swal.fire({
      icon: "error",
      title: "ERROR",
      text: "Fill In The Blanks Properly",
    });
  }

  //at the end, inputs will be empty again
  fName.value = "";
  lName.value = "";
}
