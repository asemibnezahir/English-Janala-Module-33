// Handling Synonyms Array
const synonyms = (arr)=>{
    const createdBtn = arr.map(ele=>`<p class="btn bg-[#EDF7FF]">${ele}</p>`);
    return([...createdBtn]);
}

const loadLessons = () => {
    const lessonUrl = 'https://openapi.programming-hero.com/api/levels/all';
    fetch(lessonUrl)
        .then(res => res.json())
        .then(obj => displayLessons(obj.data));
}

const loadWord = (id) => {
    // Handling Lesson Click Condition
    const lessonClick = document.getElementById('word-container');
    const lessonDefault = document.getElementById('default-show');
    lessonClick.classList.remove('hidden');


    lessonClick.classList.add('grid');
    lessonDefault.classList.add('hidden');

    // Fetching
    const levelUrl = `https://openapi.programming-hero.com/api/level/${id}`
    fetch(levelUrl)
        .then(res => res.json())
        .then(obj => {

            // Handling active buttons
            const activeBtn = document.querySelectorAll('.les-btn');
            activeBtn.forEach(but => {
                but.classList.remove('lesson-active-btn');
            });
            const clickedBtn = document.getElementById(`lesson-btn-${id}`);
            clickedBtn.classList.add("lesson-active-btn");


            displayWords(obj.data);
        });

}

// my_modal_5.showModal()

const loadWordDetail = (id) => {
    const detailUrl = `https://openapi.programming-hero.com/api/word/${id}`;
    fetch(detailUrl)
        .then(res => res.json())
        .then(aData => displayWordDetail(aData.data));
}

const displayWordDetail = (details) => {
    const modalContent = document.getElementById('modal-content');
    modalContent.innerHTML = '';
    modalContent.innerHTML = `
            <div class="modal-word">
                <h1 class="poppins-font font-semibold text-[28px] lg:text-[36px]">${details.word} (<i class="fa-solid fa-microphone-lines"></i>:${details.pronunciation})</h1>
            </div>
            <div class="modal-mean">
                <p class="poppins-font font-medium text-[18px] lg:text-[24px]">Meaning</p>
                <p class="hind-siliguri-font font-medium text-[18px] lg:text-[24px]">${details.meaning}</p>
            </div>
            <div class="modal-example">
                <p class="poppins-font font-semibold text-[18px] lg:text-[24px]">Example</p>
                <p class="poppins-font font-normal text-[18px] lg:text-[24px]">${details.sentence}</p>
            </div>
            <div class="modal-synonym">
                <p class="hind-siliguri-font font-medium text-[18px] lg:text-[24px]">সমার্থক শব্দ গুলো</p>
                <div class="synonym-btn space-x-3">
                    ${synonyms(details.synonyms)}
                </div>
            </div>
    `
    const detailModal = document.getElementById('detail_modal');
    detailModal.showModal();
}

const displayWords = (words) => {

    const wordConatainer = document.getElementById('word-container');
    wordConatainer.innerHTML = '';
    if (words.length === 0) {
        wordConatainer.classList.remove('grid');
        //Container for Empty Lessons
        wordConatainer.innerHTML = `
        <div id="empty-show" class="bg-gray-200 w-11/12 mx-auto min-h-[200px] p-7 rounded-[24px] flex flex-col justify-center mb-[20px] ">
            <img src="assets/alert-error.png" alt="Alert Icon" height="96px" width="96px" class="mx-auto">
            <p class="hind-siliguri-font text-[16px] text-[#79716B] text-center my-[12px]">এই Lesson এ এখনো কোন Vocabulary যুক্ত করা হয়নি।</p>
            <h3 class="hind-siliguri-font text-[34px] text-center">নেক্সট Lesson এ যান</h3>
        </div>
        `;
        return;
    }
    for (word of words) {
        const wordCard = document.createElement("div");
        wordCard.classList.add("rounded-[16px]", "py-12", "px-5", "text-center", "bg-white", "flex", "flex-col", "justify-between");
        wordCard.innerHTML =
            `
            <div>
                <h2 class="name inter-font font-bold text-[32px]">${word.word ? word.word : "No Meaningful Word"}</h1>
                <p class="inter-font font-medium text-[20px] my-[24px]">Meaning /Pronounciation</p>
                <h2 class="hind-siliguri-font font-semibold text-[32px]">"${word.meaning ? word.meaning : "অর্থ পাওয়া যায়নি"} / ${word.pronunciation ? word.pronunciation : "উচ্চারন পাওয়া যায়নি"}"</h2>
            </div>

            <div class="card-btn flex justify-between mt-12">
                <button onclick="loadWordDetail(${word.id})" id="details-btn" class="bg-[#1a91ff1a] rounded-[8px] hover:cursor-pointer hover:bg-[#094a881a]"><i class="fa-solid fa-circle-info text-[24px] text-[#374957] p-[16px]"></i></button>
                <button id="sound-btn" class="bg-[#1a91ff1a] rounded-[8px] hover:cursor-pointer hover:bg-[#094a881a]"><i class="fa-solid fa-volume-high text-[24px] text-[#374957] p-[16px]"></i></button>
            </div>
        `
        wordConatainer.appendChild(wordCard);
    }
}

const displayLessons = (lessons) => {
    // Get The Container
    const levelConatainer = document.getElementById('level-container');
    levelConatainer.innerHTML = '';
    //Getting into every object from the array of object
    for (lesson of lessons) {
        // Create the main body
        const lessonBtn = document.createElement("div");
        lessonBtn.classList.add("mb-[20px]");

        // Added onclick & a funtion with dynamic parameter on it [onclick="loadWord(${lesson.level_no})"]
        lessonBtn.innerHTML = `<button onclick="loadWord(${lesson.level_no})" class="btn btn-outline btn-primary les-btn" id = "lesson-btn-${lesson.level_no}"><i class="fa-solid fa-book-open"></i> Lesson - ${lesson.level_no} </button>`;

        // Append the main body in container
        levelConatainer.appendChild(lessonBtn);
    }
}
loadLessons();




