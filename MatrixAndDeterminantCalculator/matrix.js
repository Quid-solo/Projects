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

const add_sub = document.querySelector('#add_sub');
const multiply = document.querySelector('#multiply');
let m, n, p, q, r, s;
const result = document.querySelector("#result");

const order = document.createElement('form');
order.style.marginTop = "50px";
order.style.marginLeft = "25px";


function createRowColumn(type){                                            // Create input for entering no. of rows and columns of a matrix
    if(type==="add"){
        order.id = "order_add";
        order.innerHTML = `<p style="display: inline;">Order of matrices: </p>
    <input id="row" type="number" title="No. of rows" placeholder="r">
    <i class="ri-close-line"></i>
    <input id="column" type="number" title="No. of columns" placeholder="c">
    <button style="padding: 5px;">Go</button>`;
    }

    else if(type==="multiply"){
        order.id = "order_multiply";
        order.innerHTML = `<p style="display: inline;">Order of matrix 1 : </p>
    <input id="row1" type="number" title="No. of rows in matrix 1" placeholder="p">
    <i class="ri-close-line"></i>
    <input id="column1" type="number" title="No. of columns in matrix 1" placeholder="q">
    <br>
    <br>
    <p style="display: inline;">Order of matrix 2 : </p>
    <input id="row2" type="number" title="No. of rows in matrix 2" placeholder="r">
    <i class="ri-close-line"></i>
    <input id="column2" type="number" title="No. of columns in matrix 2" placeholder="s">
    <br>
    <br>
    <button style="padding: 5px;">Go</button>`;
    }
    
    
    document.querySelector('main').prepend(order);
}


add_sub.addEventListener('click', ()=>{
    createRowColumn("add");
});

multiply.addEventListener('click', ()=>{
    createRowColumn("multiply");
})

function createMatrix(m,n,v){                                        // To create a matrix for input
    let table = document.createElement('table');
    for(let i=1; i<=m; i++){
        let r = document.createElement('tr');
        for(let j=1; j<=n; j++){
            let data = document.createElement('td');
            let inp = document.createElement('input');
            inp.type = "text";
            inp.id = `${v}${i}${j}`;
            data.appendChild(inp);
            r.appendChild(data);
        }
        table.appendChild(r);
       }

       matform.appendChild(table);
       
}



let matform = document.createElement("form") ;
matform.id = "matform";
let l1 = document.createElement("p");
l1.id = "l1";

order.addEventListener('submit', (e)=>{
    e.preventDefault();
    matform.innerHTML = "";
    result.innerHTML = "";
    l1.innerHTML = "";
    if(order.id === "order_add"){
        m = document.querySelector('#order_add #row').value;
        n = document.querySelector('#order_add #column').value;

        if(m === '' || m <= 0 || n === '' || n <= 0 ){
            result.innerHTML = "<p>*Please give valid entries</p>";
        }
        else{
           m = parseInt(m);
           n = parseInt(n);
           l1.innerHTML = "Enter elements of matrices: "
           document.querySelector("#process").appendChild(l1);
           
           createMatrix(m,n,"a");
           matform.innerHTML+= `<input id="operation" type="text" title = "Operation(+ or -)">`;
           createMatrix(m,n,"b");
           matform.innerHTML+= `<button id="equi">=</button>`;
           result.appendChild(matform);
           
        }
    }
    else if(order.id === "order_multiply"){
        p = parseInt(document.querySelector('#order_multiply #row1').value);
        q = document.querySelector('#order_multiply #column1').value;
        r = document.querySelector('#order_multiply #row2').value;
        s = document.querySelector('#order_multiply #column2').value;
        if(p === '' || p <= 0 || q === '' || q <= 0 || r === '' || r <= 0 || s === '' || s <= 0 ){
            result.innerHTML = "<p>*Please give valid entries</p>";
        }

        else if(q!==r){
            result.innerHTML = `<p>Multiplication not possible</p>`;
        }
        else{
            p = parseInt(p);
            q = parseInt(q);
            r = parseInt(r);
            s = parseInt(s);
            l1.innerHTML = "Enter elements of matrices: "
            document.querySelector("#process").appendChild(l1);
            createMatrix(p,q,"a");
            matform.innerHTML += `<i class="ri-close-fill"></i>`;
            createMatrix(r,s,"b");
            matform.innerHTML+= `<button id="equi">=</button>`;
            result.appendChild(matform);
        }
    }
})


const msg = document.createElement('p')
document.querySelector("main").appendChild(msg);

const resultMatrix = document.createElement('table');
resultMatrix.id = "resultMatrix";


matform.addEventListener('submit', (e)=>{
    e.preventDefault();
    resultMatrix.innerHTML = "";
    if(order.id === "order_add"){
        const operation = document.querySelector("#operation").value;
        console.log(operation);
        Outer: for(let i=1; i<=m; i++){
            let r = document.createElement('tr');
            if(operation !== "+" && operation !== "-"){
                msg.innerText = "Please perform valid operation, either + or - ";
                
                break Outer;
            }
            for(let j=1; j<=n; j++){
                let data = document.createElement('td');
                let a = parseInt(document.querySelector(`#a${i}${j}`).value) ;
                let b = parseInt(document.querySelector(`#b${i}${j}`).value) ;
                
                if(isNaN(a) || isNaN(b) || a === "" || b === ""){
                    
                    msg.innerText = "Please enter valid entries";
                    break Outer;
                }
                

                else {
                    if(operation === "+") data.innerText = a+b;
                    else data.innerText = a-b;
                    
                    r.appendChild(data);
                }

            }
            resultMatrix.appendChild(r);
        }
    }
    else if(order.id === "order_multiply"){
        Outer: for(let i=1; i<=p; i++){
            let row = document.createElement('tr');
            for(let j=1; j<=s; j++){
                let data = document.createElement('td');
                let c=0;
                for(let k=1; k<=r; k++){
                    
                    let a = parseInt(document.querySelector(`#a${i}${k}`).value) ;
                    let b = parseInt(document.querySelector(`#b${k}${j}`).value) ;
                    if(isNaN(a) || isNaN(b) || a === "" || b === ""){
                        msg.innerText = "Please enter valid entries";
                        break Outer;
                    }
                    
                    c += a * b;
                    console.log(c);
                }
                data.innerText = c;
                row.appendChild(data);
            }
            resultMatrix.appendChild(row);
        }
    }
    
    result.appendChild(resultMatrix);
} )


