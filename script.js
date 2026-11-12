const mainSection=document.getElementById("main-section");
const formSection=document.getElementById("form-section");
const addBookmarkBtn=document.getElementById("add-bookmark-button");
const categoryName=document.querySelector(".category-name");
const categoryDropdown=document.getElementById("category-dropdown");
const closeFormBtn=document.getElementById("close-form-button");
const addBookmarkButtonForm=document.getElementById("add-bookmark-button-form");
const name=document.getElementById("name");
const category=document.getElementById("category");
const url=document.getElementById("url");
const bookmarkListSection=document.getElementById("bookmark-list-section");
const viewCategoryBtn=document.getElementById("view-category-button");
const categoryList=document.getElementById("category-list");
const closeListBtn=document.getElementById("close-list-button");
const deleteBookmarkBtn=document.getElementById("delete-bookmark-button");


function getBookmarks(){

  try{
   const datos=localStorage.getItem("bookmarks");

   if(!datos) return [];

   const arr=JSON.parse(datos);

   if(!Array.isArray(arr) || !arr.every(b=> b.name && b.category && b.url)) return [];

   return arr;
   
  }catch{
    return [];
  }
   


}

function displayOrCloseForm(){
  mainSection.classList.toggle("hidden");
  formSection.classList.toggle("hidden");
}

addBookmarkBtn.addEventListener("click",()=>{
  categoryName.innerHTML=categoryDropdown.value;
  displayOrCloseForm();
});

closeFormBtn.addEventListener("click",()=>{
  displayOrCloseForm();
});

addBookmarkButtonForm.addEventListener("click",()=>{
  const nuevoLista=getBookmarks();
  nuevoLista.push({
    name:name.value,
    category:categoryDropdown.value, 
    url:url.value});

  localStorage.setItem("bookmarks",JSON.stringify(nuevoLista));

  name.value="";
  url.value="";

  displayOrCloseForm();
});


function displayOrHideCategory(){
  mainSection.classList.toggle("hidden");
  bookmarkListSection.classList.toggle("hidden");
}

viewCategoryBtn.addEventListener("click",()=>{
  const cat=categoryDropdown.value;
  categoryName.innerHTML=categoryDropdown.value;
  
  const list=getBookmarks();
  const filtered=list.filter(b=>b.category===cat);
  

  categoryList.innerHTML="";
  if(filtered.length===0){
    categoryList.innerHTML="<p>No Bookmarks Found</p>";
  }else{

      filtered.forEach(({name,url})=>{
        categoryList.innerHTML+=`
        <div>
        <input type="radio"
        id="${name}"
        value="${name}"
        name="radiosBtns"/>
        <label for="${name}">
   
        <a href="${url}" target="_blank">${name}</a>
        </label>
        </div>
        `
      });
  }

displayOrHideCategory();
})

closeListBtn.addEventListener("click",()=>{
  displayOrHideCategory();

});


deleteBookmarkBtn.addEventListener("click",()=>{
  const selected=document.querySelector('input[name="radiosBtns"]:checked');

  if(!selected){
    alert("Plase selected with bookmark you want to delete");
    return;
  }


  const categoryNow=categoryDropdown.value;

  const updt=getBookmarks().filter(b=>
  !(b.name===selected.value && b.category === categoryNow));
  localStorage.setItem("bookmarks",JSON.stringify(updt));

  const filterNew=updt.filter(b=>b.category===categoryNow);
  
  categoryList.innerHTML="";

  if(filterNew.length===0){
    categoryList.innerHTML="<p>No Bookmarks Found</p>";
  }else{

      filterNew.forEach(({name,url})=>{

        categoryList.innerHTML+=`
        <div>
        <input type="radio"
        id="${name}"
        value="${name}"
        name="radiosBtns">
        <label for="${name}">
   
        <a href="${url}" target="_blank">${name}</a>
        </label>
        </div>
        `;
      });

  }

 
});

