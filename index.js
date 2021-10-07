let globalBookData=[];
const btn=document.getElementById("submitBtn");
// var uid=1;
const details=document.getElementById('data');
btn.addEventListener('click',function(){
    const formData={
        id:Date.now(),
        name:document.getElementById('name').value,
        author:document.getElementById('author').value,
        quantity:document.getElementById('quantity').value,
        price:document.getElementById('price').value
    }
    const saveToLocalStorage=()=>{
        localStorage.setItem('book',JSON.stringify({booksData: globalBookData}));
    } 
    globalBookData.push(formData);  
    saveToLocalStorage();
    details.insertAdjacentHTML('beforeend',generateData(formData));
    // uid=uid+1;   
    window.location.reload();
})

    const generateData= ({id,name,author,quantity,price})=>{
        let totPrice=quantity*price;
        return(`   
            <div class="col-md-3 mt-5" id=${id}>
          <div class="card text-center bg-dark"  style="width: 18rem;">
            <div class="card-header text-white">
              ${author}
            </div>
            <ul class="list-group list-group-flush">
              <li class="list-group-item" >Book Name: ${name} </li>
              <li class="list-group-item">Author: ${author} </li>
              <li class="list-group-item">Quantity: ${quantity}</li>
              <li class="list-group-item">Price: ${price}</li>
              <li class="list-group-item">Total Price: ${totPrice}</li>
              <li class="list-group-item ">
                <button class="btn btn-primary" onclick="editData(this);" name=${id} data-bs-toggle="modal" data-bs-target="#editModal">Edit</button>
                <button class="btn btn-danger " onclick="deleteData(this);" name=${id}>Delete</button>
              </li>
            </ul>
            </div>
            </div>   
        `);

    }

    const reloadData=()=>{
        const getData=JSON.parse(localStorage.getItem("book"));
         if(getData){
            globalBookData=getData.booksData;
            // console.log(globalBookData)
        }
        globalBookData.map((rowData)=>{
            details.insertAdjacentHTML('beforeend',generateData(rowData));
        })
    }
    const deleteData=(e)=>{
        swal({
            title: "Do you want to delete this data ?",
            icon: "warning",
            buttons: ["No","Yes"],
            dangerMode: true,
          })
          .then((willDelete) => {
            if (willDelete) {
                // console.log(e);
                const targetID=e.getAttribute("name")
                // console.log(targetID);
                const globalBookDat=globalBookData.filter((id)=>id.id!=targetID);
                globalBookData=globalBookDat;
                const saveToLocalStorage2=()=>{
                    localStorage.setItem('book',JSON.stringify({booksData: globalBookData}));
                } 
                // console.log(globalBookData);
                saveToLocalStorage2();
                window.location.reload();
            }
          });
    }
    const editData=(e)=>{
        const editId=e.getAttribute('name');
        // alert(editId)
        for (let i = 0; i < globalBookData.length; i++) {
            if (globalBookData[i].id==editId) {
                console.log(globalBookData[i]);
                document.getElementById('editName').value=globalBookData[i].name;
                document.getElementById('editAuthor').value=globalBookData[i].author;
                document.getElementById('editQuantity').value=globalBookData[i].quantity;
                document.getElementById('editPrice').value=globalBookData[i].price;
                const editBtn=document.getElementById('editBtn');
                editBtn.addEventListener('click',function(){
                    const editFormData={
                        eName:document.getElementById('editName').value,
                        eAuthor:document.getElementById('editAuthor').value,
                        eQuantity:document.getElementById('editQuantity').value,
                        ePrice:document.getElementById('editPrice').value
                    }
                
                globalBookData[i].name=editFormData.eName;
                globalBookData[i].author=editFormData.eAuthor;
                globalBookData[i].quantity=editFormData.eQuantity;
                globalBookData[i].price=editFormData.ePrice;
                console.log(globalBookData)
                const saveToLocalStorage3=()=>{
                    localStorage.setItem('book',JSON.stringify({booksData: globalBookData}));
                } 
                // console.log(globalBookData);
                saveToLocalStorage3();
                window.location.reload();
            })
               
            }
        }
    }
    $('#submitBtn').on('click',function(){
        $('#exampleModal').show();
      })