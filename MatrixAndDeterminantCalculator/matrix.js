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
const determinant = document.querySelector('#determinant');
const inverse = document.querySelector('#inverse');
let m, n, p, q, r, s;
const result = document.querySelector("#result");

const order = document.createElement('form');
order.style.marginTop = "50px";
order.style.marginLeft = "25px";


function createRowColumn(type){                                            // Create input for entering no. of rows and columns of a matrix
    l1.innerHTML = "";
    if(type==="add"){
        order.id = "order_add";
        order.innerHTML = `<p style="display: inline;">Order of matrices: </p>
    <input id="row" class="order" type="number" title="No. of rows" placeholder="r">
    <i class="ri-close-line"></i>
    <input id="column" class="order" type="number" title="No. of columns" placeholder="c">
    <button id="go" style="padding: 5px;">Go</button>`;
    }

    else if(type==="multiply"){
        order.id = "order_multiply";
        order.innerHTML = `<p style="display: inline;">Order of matrix 1 : </p>
    <input id="row1" class="order" type="number" title="No. of rows in matrix 1" placeholder="p">
    <i class="ri-close-line"></i>
    <input id="column1" type="number" title="No. of columns in matrix 1" placeholder="q">
    <br>
    <br>
    <p style="display: inline;">Order of matrix 2 : </p>
    <input id="row2" class="order" type="number" title="No. of rows in matrix 2" placeholder="r">
    <i class="ri-close-line"></i>
    <input id="column2" class="order" type="number" title="No. of columns in matrix 2" placeholder="s">
    <br>
    <br>
    <button id="go" style="padding: 5px;">Go</button>`;
    }
    
    else if(type==="determinant"){
        order.id = "order_determinant";
        order.innerHTML = `<p style="display: inline;">Order of square matrices: </p>
    <input id="orderOfSquareMatrix" class="order" type="number" title="Order of square matrix" placeholder="n">
    <button id="go" style="padding: 5px;">Go</button>`;
    }
    
    document.querySelector('main').prepend(order);
}


add_sub.addEventListener('click', ()=>{
    result.innerHTML = "";
    createRowColumn("add");
});

multiply.addEventListener('click', ()=>{
    result.innerHTML = "";
    createRowColumn("multiply");
});

determinant.addEventListener('click', ()=>{
    result.innerHTML = "";
    createRowColumn("determinant");
});

inverse.addEventListener('click', () => {
    result.innerHTML = "";
    result.innerHTML = "<h1>Coming soon...</h1>";
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
        p = document.querySelector('#order_multiply #row1').value;
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

    else if(order.id == "order_determinant"){
        n = document.querySelector('#order_determinant #orderOfSquareMatrix').value;
        if(n === '' || n <= 0 ){
            result.innerHTML = "<p>*Please give valid entries</p>";
        }
        else{
            n = parseInt(n);
            l1.innerHTML = "Enter elements of matrix: "
            document.querySelector("#process").appendChild(l1);
            matform.innerHTML+= `<h4>A&nbsp;= </h4>`;
            createMatrix(n,n,"a");
            matform.innerHTML+= `<h4>&nbsp;,&nbsp;&nbsp;&nbsp;det(A)</h4><button id="equi" style="margin:5px">=</button>`;
            result.appendChild(matform);
            
         }
    }
})


const msg = document.createElement('p')
document.querySelector("main").appendChild(msg);

const resultMatrix = document.createElement('table');
resultMatrix.id = "resultMatrix";

function makeArray(arr){
    
    for(let i=1; i<=n; i++){
        arr.push([]);
        for(let j=1; j<=n; j++){
            let a = parseInt(document.querySelector(`#a${i}${j}`).value);
            if(a==''|| isNaN(a)) return false;
            else arr[i-1][j-1] = a;   
        }
    }
    return true;
}

function addition_subtraction(){
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
        result.appendChild(resultMatrix);
}

function multiplication(){
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
    result.appendChild(resultMatrix);
}

function calculateDet(a,l){
    if(l===1){
        return a[0][0];
    }
    
        let value =0;
        
    for(let i = 0; i<l; i++){
        let submatrix = createSubmatrix(a,i,l);
        value += Math.pow(-1,i)*a[0][i]*calculateDet(submatrix,l-1);
    }
    return value; 
}

function createSubmatrix(mat, colToRemove, n){
    let submatrix = [];
    for(let i = 1; i<n; i++){
        let newRow = [];
        for(let j = 0; j<n; j++){
            if(j!== colToRemove){
                newRow.push(mat[i][j]);
            }
        }
        submatrix.push(newRow);
    }
    return submatrix;
}

const ans = document.createElement('p');

function det(){
    ans.innerHTML = "";
    let matrixArr = [];
    if(!makeArray(matrixArr)) {
        msg.innerText = "Please enter valid entries";
        return ;
    }
    console.log(matrixArr);
    ans.innerText = calculateDet(matrixArr,matrixArr.length);
    result.appendChild(ans);
}

matform.addEventListener('submit', (e)=>{
    e.preventDefault();
    resultMatrix.innerHTML = "";
    if(order.id === "order_add") addition_subtraction();
    else if(order.id === "order_multiply") multiplication();
    else if(order.id === "order_determinant") det();

    // m = n = p = q = r = s = undefined;
} )


