const loadLessons = () => {
    const lessonUrl = 'https://openapi.programming-hero.com/api/levels/all';
    fetch(lessonUrl)
    .then(res => res.json())
    .then(obj => displayLessons(obj.data));
}

const loadWord = (id) =>{
    // Handling Lesson Click Condition
    const lessonClick = document.getElementById('word-container');
    const lessonDefault = document.getElementById('default-show');
    lessonClick.classList.remove('hidden');


    lessonClick.classList.add('grid');
    lessonDefault.classList.add('hidden');

    // Fetching
    const levelUrl = `https://openapi.programming-hero.com/api/level/${id}`
    fetch(levelUrl)
    .then(res=>res.json())
    .then(obj=>{
        
        // Handling active buttons
        const activeBtn = document.querySelectorAll('.les-btn');
        activeBtn.forEach(but => {
            but.classList.remove('lesson-active-btn');                
        });
        const clickedBtn = document.getElementById(`lesson-btn-${id}`);
        clickedBtn.classList.add("lesson-active-btn");


        // Handle If Any Lessons don't Exist
        if(obj.data.length===0)
        {
            const emptyClick = document.getElementById('empty-show');
            emptyClick.classList.remove('hidden');
            emptyClick.classList.add('flex');
            lessonClick.classList.add('hidden');
            lessonClick.classList.remove('grid');
            lessonDefault.classList.add('hidden');
            return;
        }
        displayWords(obj.data);
    });
    
}

const displayWords =(words)=>{
    const wordConatainer = document.getElementById('word-container');
    wordConatainer.innerHTML = '';
    for(word of words)
    {
        const wordCard = document.createElement("div");
        wordCard.classList.add("rounded-[16px]" , "py-12" , "px-5" , "text-center" , "bg-white" ,"flex", "flex-col" , "justify-between");
        wordCard.innerHTML = 
        `
            <div>
                <h2 class="name inter-font font-bold text-[32px]">${word.word? word.word : "No Meaningful Word"}</h1>
                <p class="inter-font font-medium text-[20px] my-[24px]">Meaning /Pronounciation</p>
                <h2 class="hind-siliguri-font font-semibold text-[32px]">"${word.meaning? word.meaning : "অর্থ পাওয়া যায়নি"} / ${word.pronunciation? word.pronunciation: "উচ্চারন পাওয়া যায়নি"}"</h2>
            </div>

            <div class="card-btn flex justify-between mt-12">
                <button id="details-btn" class="bg-[#1a91ff1a] rounded-[8px]"><i class="fa-solid fa-circle-info text-[24px] text-[#374957] p-[16px]"></i></button>
                <button id="sound-btn" class="bg-[#1a91ff1a] rounded-[8px]"><i class="fa-solid fa-volume-high text-[24px] text-[#374957] p-[16px]"></i></button>
            </div>
        `
        wordConatainer.appendChild(wordCard);
    }
}

const displayLessons = (lessons)=>{
    // Get The Container
    const levelConatainer = document.getElementById('level-container');
    levelConatainer.innerHTML = '';
    //Getting into every object from the array of object
    for(lesson of lessons)
    {
        // Create the main body
        const lessonBtn = document.createElement("div");
        lessonBtn.classList.add("mb-[20px]");

        // Added onclick & a funtion with dynamic parameter on it [onclick="loadWord(${lesson.level_no})"]
        lessonBtn.innerHTML =`<button onclick="loadWord(${lesson.level_no})" class="btn btn-outline btn-primary les-btn" id = "lesson-btn-${lesson.level_no}"><i class="fa-solid fa-book-open"></i> Lesson - ${lesson.level_no} </button>`;
        
        // Append the main body in container
        levelConatainer.appendChild(lessonBtn);
    }
}
loadLessons();




