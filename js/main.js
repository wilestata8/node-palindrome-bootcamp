document.querySelector('button').addEventListener('click', userReq)

function userReq(){
  const word = document.querySelector("input").value;

  fetch(`/api?word=${word}`)
    .then(response => response.json())
    .then((data) => {
        console.log(data);
        document.querySelector("h1").textContent = `${data.palindrome}, "${data.word}" backwards is "${data.backwards}" so it ${data.what} a palindrome. `
    });

}