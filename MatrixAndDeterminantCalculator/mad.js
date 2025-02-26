fetch('Header/header.html')
.then((response) => response.text())
.then((data) => {
    console.log(data);
    document.querySelector('header').innerHTML = data;
})
.catch(()=>{
    console.error("Response not received");
    document.body.innerHTML = "<h2>'Sorry, Not found</h2>'"
})

