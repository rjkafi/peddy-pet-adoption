
document.getElementById("sort-btn").addEventListener('click', () =>{
    const loadData = () => {
        fetch("https://openapi.programming-hero.com/api/peddy/pets")
        .then(res => res.json())
        .then(data => getData(data.pets))

    }
    const getData = (pets) =>{
        const postContainer=document.getElementById("left-post-container");

        postContainer.innerText="";
        const sortData= pets.sort((a,b) =>{
            const sortPrice=b.price - a.price;
            return sortPrice;
        }) 
        if(pets.length === 0){}
        sortData.forEach(element => {
            if(element.length == 0){
                postContainer.classList.remove('grid')
                postContainer.classList.add('bg-gray-50')
                postContainer.innerHTML=`
                <div class="min-h-[400px] w-full mx-auto flex flex-col justify-center items-center p-4 rounded-md gap-4">
                <img  src="/images/error.webp"/>
                <h4 class="text-center text-2xl font-bold text-slate-800">No Information Available</h4>
                <p class="text-center ">"It is a long established fact that a reader will be distracted looking at <br> its layout. The point of using Lorem Ipsum is that it "</p>
                </div>
                ` ;
                return;
            }else{
                postContainer.classList.add('grid',"grid-cols-1","lg:grid-cols-3","gap-2")
            }
            sortData.forEach(pet => {
                // console.log(pet)
            const div= document.createElement('div');
             div.innerHTML=`
             <div class="card card-compact bg-base-100  shadow-xl p-3 border ">
                <figure>
                  <img
                    src=${pet.image}
                    class="rounded-md w-full"
                    alt="pet" />
                </figure>
                 <div class=mt-2>
                   <div class=" flex items-center gap-1">
                    <p ><img class="w-5 h-5" src="https://img.icons8.com/?size=160&id=35oo0tJZ03jT&format=png" alt=""></p>
                    <p class="text-gray-500">Breed: ${pet.breed ? pet.breed : "Not Available Data"}</p>
                  </div>
                  <div class=" flex items-center gap-1">
                    <p><img class="w-5 h-5" src="https://img.icons8.com/?size=100&id=60611&format=png" alt=""></p>
                    <p class="text-gray-500">Birth: ${pet.date_of_birth ? pet.date_of_birth : "No Date"}</p>
                  </div>
                  <div class=" flex items-center gap-1">
                    <p><img class="w-5 h-5" src="https://img.icons8.com/?size=100&id=11780&format=png" alt=""></p>
                    <p class="text-gray-500">Gender: ${pet.gender ? pet.gender : "Not Available Data"}</p>
                  </div>
                  <div class=" flex items-center gap-1">
                    <p><img class="w-5 h-5" src="https://img.icons8.com/?size=160&id=QHui8fGzf5rs&format=png" alt=""></p>
                    <p class="text-gray-500">Price: ${pet.price? pet.price : "Not Available Data"}</p>
                  </div>
                  <hr class="border-b-2 mt-3">
                  <!-- card btns -->
                  <div class="flex justify-center items-center gap-2 mt-4">
                      <div><button onclick="loadPetImages(${pet.petId})" class="btn bg-white text-center border-[#0E7A81] border-opacity-15"><img class="w-5 h-5" src="https://img.icons8.com/?size=160&id=114072&format=png" alt=""></button></div>
                      <div><button onclick="adoptPet(my_modal_2.showModal())" class="btn adopt-button bg-white text-center border-[#0E7A81] border-opacity-15 text-[#0E7A81]">Adopts</button></div>
                      <div><button onclick= "loadDetails(${pet.petId})" class="btn text-[#0E7A81] detailsBtn border-[#0E7A81] border-opacity-15 bg-white text-center">Details</button></div>
        
                  </div>
                 </div>
                </div>
             `   
             postContainer.appendChild(div); 
                 
            });
            
        });

    }
    loadData();

})


