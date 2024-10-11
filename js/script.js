// load category 
const loadCategory = ()  => {
  fetch('https://openapi.programming-hero.com/api/peddy/categories')
  .then( res => res.json())
  .then( data => displayCategory(data.categories)) 
  .catch ( err => console.log(err))
}
// display category
const displayCategory = (categories) => {
  categories.forEach( item => {
    const ParentDiv= document.getElementById('categories');
    const icon=item.category_icon;
    const name =`${item.category}s`
    const div = document.createElement('div');
    div.innerHTML =`
    <button id="btn-${item.category}" onclick= 'categoryBtnHandler("${item.category}")' class="btn categoryBtn border-2 border-neutral-200 hover:border-[#0E7A81] bg-white text-xl font-bold text-center">
    <img src=${icon} class="categories-btn w-7 h-7" />
    ${name}
    </button>
    `;

    ParentDiv.append(div);
  })
}
// load All Pets
const loadAllPets = async() =>{
    const res= await fetch('https://openapi.programming-hero.com/api/peddy/pets')
    const data = await res.json();
    displayAllPets(data.pets);
}
// display all pets
const displayAllPets = (pets) =>{
    // console.log(pets);
    const postContainer=document.getElementById("left-post-container");
    const selctPetContainer=document.getElementById("selectPetContainer");
    
    postContainer.innerHTML="";
    if(pets.length === 0){
        postContainer.classList.remove('grid')
        postContainer.classList.add('bg-gray-50')
        // selctPetContainer.classList.add("hidden")
        postContainer.innerHTML=`
         <div class="min-h-[400px] flex  flex-col justify-center items-center gap-5 p-5">
        <img src="./images/error.webp">
        <h4 class="text-center text-2xl font-bold text-slate-800">No Information Available</h4>
        <p class="text-center ">"It looks like some details are missing. Please double-check the information or contact our team , <br> for assistance. We’re here to help you with all the adoption details."</p>
        </div>
        ` ;
        return;
    }else{
        postContainer.classList='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3'
    }
    pets.forEach(pet => {
        // console.log(pet)
    const div= document.createElement('div');
     div.innerHTML=`
     <div class="card card-compact bg-base-100  shadow-xl p-3 border-2 border-neutral-200 rounded-2xl ">
        <figure>
          <img
            src=${pet.image}
            class="rounded-md"
            alt="pet" />
        </figure>
         <h4 class="text-2xl font-bold mt-2" >${pet.pet_name}</h4>
         <div class=mt-2>
           <div class=" flex items-center gap-1">
            <p ><img class="w-4 h-4" src="https://img.icons8.com/?size=160&id=35oo0tJZ03jT&format=png" alt=""></p>
            <p class="text-gray-500">Breed: ${pet.breed ? pet.breed : "Not Available "}</p>
          </div>
          <div class=" flex items-center gap-1">
            <p><img class="w-4 h-4" src="https://img.icons8.com/?size=100&id=60611&format=png" alt=""></p>
            <p class="text-gray-500">Birth: ${pet.date_of_birth ? pet.date_of_birth : "No Date"}</p>
          </div>
          <div class=" flex items-center gap-1">
            <p><img class="w-4 h-4" src="https://img.icons8.com/?size=100&id=11780&format=png" alt=""></p>
            <p class="text-gray-500">Gender: ${pet.gender ? pet.gender : "Not Available "}</p>
          </div>
          <div class=" flex items-center gap-1">
            <p><img class="w-4 h-4" src="https://img.icons8.com/?size=160&id=QHui8fGzf5rs&format=png" alt=""></p>
            <p class="text-gray-500">Price: ${pet.price? pet.price : "Not Available "}</p>
          </div>
          <hr class="border-b-2 mt-3">
          <!-- card btns -->
          <div class="flex justify-center items-center gap-2 mt-4">
              <div><button onclick="loadPetImages(${pet.petId})" class="btn bg-white text-center border-[#0E7A81] border-opacity-15"><img class="w-5 h-5" src="https://img.icons8.com/?size=160&id=114072&format=png" alt=""></button></div>
              <div><button id="btn-${pet.petId}" onclick="adoptPet(my_modal_2.showModal())" class="btn adopt-button bg-white text-center border-[#0E7A81] border-opacity-15 text-[#0E7A81]">Adopts</button></div>
              <div><button onclick= "loadDetails(${pet.petId})" class="btn text-[#0E7A81] detailsBtn border-[#0E7A81] border-opacity-15 bg-white text-center">Details</button></div>

          </div>
         </div>
        </div>
     `   
     postContainer.appendChild(div); 
         
    });
}
// load pets with  categories btn
const categoryBtnHandler= (id) =>{
  const leftPetContainer=document.getElementById("left-post-container");
  leftPetContainer.classList='flex flex-col justify-center items-center mx-auto'
  leftPetContainer.innerHTML=`<span class="loading loading-bars loading-lg"></span>`
  const likePetContainer=document.getElementById("selectPetContainer");
  likePetContainer.classList.add("hidden");
  // active class removed from active buttons
  activeBtnRemove();
  // active class actived by id
  const activeBtn=document.getElementById(`btn-${id}`)
  // console.log(activeBtn);
  activeBtn.classList.add("active")
  setTimeout( () => {
    fetch(`https://openapi.programming-hero.com/api/peddy/category/${id}`)
  .then( res => res.json())
  .then( output => {
    
    displayAllPets(output.data);

  })
   .catch(error => console.log(error))
   likePetContainer.classList.remove("hidden");
  },2000);
}
//  active btn remove  function
const activeBtnRemove= () =>{
  const btns=document.getElementsByClassName("categoryBtn");
  // console.log(btns)
  for(let btn of btns){
    btn.classList.remove("active")
  }
};

// load pet images select for right container
const loadPetImages= (petId) => {
  fetch(`https://openapi.programming-hero.com/api/peddy/pet/${petId}`)
  .then( res => res.json())
  .then( data => DisplaySelectPet(data.petData) )
}
// right col select the pet image by clicking like button
const  DisplaySelectPet = (pet) =>{
  console.log(pet)
  const selectPetContainer= document.getElementById("selectPetContainer");
  const div=document.createElement("div");
  div.innerHTML=`
   <div>
   <img  src=${pet.image}/>
   </div>
  `
  selectPetContainer.append(div);
}
// load Details
const loadDetails= async (petId) =>{
  // console.log(petId);
  const uri=`https://openapi.programming-hero.com/api/peddy/pet/${petId}`
  const res =await fetch(uri);
  const data = await res.json();
   console.log(data);
  displayPetDetails(data.petData);
}
// display pet details
const displayPetDetails = (pet) =>{
 console.log(pet);
 const detailsContainer=document.getElementById("modalContent");
 detailsContainer.innerHTML=`
  <img class="w-full" src=${pet.image} />
  <h4 class="text-2xl font-bold mt-2" >${pet.pet_name}</h4>
  <div class="grid grid-cols-2 gap-3 mt-2">
   <div class=" flex items-center gap-1">
            <p><img class="w-4 h-4" src="https://img.icons8.com/?size=160&id=35oo0tJZ03jT&format=png" alt=""></p>
            <p>Breed: ${pet.breed ? pet.breed : "No Data"}</p>
          </div>
          <div class=" flex items-center gap-1">
            <p><img class="w-4 h-4" src="https://img.icons8.com/?size=100&id=60611&format=png" alt=""></p>
            <p>Birth: ${pet.date_of_birth ? pet.date_of_birth :  "No Date"}</p>
          </div>
          <div class=" flex items-center gap-1">
            <p><img class="w-4 h-4" src="https://img.icons8.com/?size=100&id=11780&format=png" alt=""></p>
            <p>Gender: ${pet.gender? pet.gender : "No Data"}</p>
          </div>
          <div class=" flex items-center gap-1">
            <p><img class="w-4 h-4" src="https://img.icons8.com/?size=160&id=QHui8fGzf5rs&format=png" alt=""></p>
            <p>Price: ${pet.price ? pet.price : "No Data"}</p>
          </div>
          <div class=" flex items-center gap-1">
            <p><img class="w-4 h-4" src="https://img.icons8.com/?size=160&id=QHui8fGzf5rs&format=png" alt=""></p>
            <p>Vaccinated status:${pet.vaccinated_status}</p>
          </div>
  </div>
  <h4 class="text-xl mt-2 font-semibold">Details Information</h4>
  <p>${pet.pet_details}</p>
 `
        // way-1 to show modal while click
  // document.getElementById("showModalData").click();
         // way-2 to show modal while click
  document.getElementById("modalContainer").showModal();
}
//Function to handle of showing modal for adopt button
function adoptPet() {
  // Show the modal
  const adoptionModal = document.getElementById('adoptionModal');
  const countdownText= document.getElementById('modalCountdown');
  // Start countdown from 3
  let countdown = 3; 
// Display the initial countdown value in the modal
  countdownText.innerText = countdown;
  adoptionModal.classList.remove('hidden'); // Show the modal

  // Start countdown timer
  const interval = setInterval(() => {
      countdown -= 1;
      countdownText.innerText = countdown; // Update countdown in modal

      if (countdown === 0) {
          // Stop interval when countdown  0
          clearInterval(interval);
       // Change the modal message to "Adopted!"
          countdownText.innerText = "Adopted!";
          // close the modal after the delay
          setTimeout(() => {
            adoptionModal.classList.add('hidden');
            countdownText.innerText = "Adopted!";
            
          }, 1000); // 1 second delay before closing modal
      }
  }, 1000); 
}

loadCategory();
loadAllPets();


     