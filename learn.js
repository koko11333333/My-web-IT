
const devices = {
  ups: {
    title: "UPS เครื่องสำรองไฟ",
    desc: "ช่วยสำรองพลังงานเมื่อไฟดับ",
    model: "models/ups.glb",
    images: ["img/ups1.jpg","img/ups2.jpg","img/ups3.jpg"],
    learn: "UPS เป็นอุปกรณ์สำคัญสำหรับความต่อเนื่องพลังงาน",
    quiz: [
      { q: "UPS ทำหน้าที่อะไร?", options: ["เก็บไฟล์","สำรองไฟฟ้า","เชื่อมต่อเน็ต"], answer: 1 },
      { q: "ควรเลือก UPS อย่างไร?", options: ["กำลังไฟสูงสุด","ราคาถูกที่สุด","สีสวยที่สุด"], answer: 0 }
    ],
    tips: "💡 เลือก UPS ให้เหมาะสมกับกำลังไฟ"
  },
  cpu: {
    title: "CPU",
    desc: "หน่วยประมวลผลกลาง",
    model: "models/cpu.glb",
    images: ["img/cpu1.jpg","img/cpu2.jpg","img/cpu3.jpg"],
    learn: "CPU เป็นสมองคอมพิวเตอร์",
    quiz: [
      { q: "CPU ทำหน้าที่อะไร?", options: ["เก็บไฟล์","ประมวลผลคำสั่ง","แสดงผลภาพ"], answer: 1 },
      { q: "ควรใช้ Thermal Paste ทำไม?", options: ["ช่วยระบายความร้อน","ตกแต่ง CPU","เพิ่มแรงดันไฟ"], answer: 0 }
    ],
    tips: "💡 ติดตั้ง CPU ระมัดระวัง ใช้ Thermal Paste"
  },
  mouse: {
    title: "เม้าส์ไร้สาย",
    desc: "ควบคุมการชี้ตำแหน่งบนหน้าจอ",
    model: "models/m.glb",
    images: ["img/0.png","img/00.png","img/000.png"],
    learn: "เม้าส์ไร้สายช่วยเคลื่อนที่สะดวก",
    quiz: [
      { q: "เม้าส์ไร้สายทำงานอย่างไร?", options: ["ใช้สายไฟ","ใช้สัญญาณไร้สาย","แรงแม่เหล็ก"], answer: 1 }
    ],
    tips: "💡 เปลี่ยนถ่านหรือชาร์จเม้าส์เมื่ออ่อนแรง"
  },
  ram: {
    title: "RAM",
    desc: "หน่วยความจำหลัก",
    model: "models/ram.glb",
    images: ["img/ram1.jpg","img/ram2.jpg","img/ram3.jpg"],
    learn: "RAM เก็บข้อมูลชั่วคราว CPU ใช้งานเร็วขึ้น",
    quiz: [
      { q: "RAM ทำหน้าที่อะไร?", options: ["เก็บข้อมูลถาวร","เก็บข้อมูลชั่วคราว","จัดเก็บพลังงาน"], answer: 1 }
    ],
    tips: "💡 เพิ่ม RAM ช่วยทำงานหลายโปรแกรมพร้อมกันดีขึ้น"
  },
  ssd: {
    title: "SSD",
    desc: "อุปกรณ์จัดเก็บข้อมูลความเร็วสูง",
    model: "models/ssd.glb",
    images: ["img/ssde.jpg","img/ssde1.jpg","img/ssde2.jpg"],
    learn: "SSD ช่วยให้คอมพิวเตอร์บูทและโหลดเร็ว",
    quiz: [
      { q: "SSD ช่วยอะไร?", options: ["ประมวลผลข้อมูล","จัดเก็บข้อมูลเร็ว","ระบายความร้อน"], answer: 1 }
    ],
    tips: "💡 สำรองข้อมูลสม่ำเสมอ หลีกเลี่ยงกระแทก"
  }
};

// ===== DOM Elements =====
const listItems = document.querySelectorAll(".device-list li");
const titleEl = document.getElementById("deviceTitle");
const descEl = document.getElementById("deviceDesc");
const galleryEl = document.getElementById("deviceGallery");
const modelEl = document.getElementById("deviceModel");
const learnText = document.getElementById("learnText");
const quizQuestion = document.getElementById("quizQuestion");
const quizOptions = document.getElementById("quizOptions");
const scoreboard = document.getElementById("scoreboard");
const progressBar = document.getElementById("quizProgress");
const tipsCards = document.getElementById("tipsCards");
const themeBtn = document.getElementById("themeBtn");


// ===== Quiz State =====
let currentQuiz = [], quizIndex = 0, score = 0;

// ===== Device Selection =====
listItems.forEach(li => {
  li.addEventListener("click", () => {
    listItems.forEach(i => i.classList.remove("active"));
    li.classList.add("active");
    const key = li.dataset.device;
    const d = devices[key];
    
    titleEl.textContent = d.title;
    descEl.textContent = d.desc;
    
    // Gallery
    galleryEl.innerHTML = "";
    d.images.forEach(src => {
      const img = document.createElement("img");
      img.src = src;
      galleryEl.appendChild(img);
    });
    
    modelEl.setAttribute("src", d.model);
    learnText.textContent = d.learn;
    showTips(d.tips);
    
    // Quiz
    currentQuiz = d.quiz; 
    quizIndex = 0; 
    score = 0; 
    scoreboard.style.display = "none";
    showQuiz();
  });
});

// ===== Tabs =====
const tabs = document.querySelectorAll(".tab-buttons button");
const tabContents = document.querySelectorAll(".tab-content>div");
tabs.forEach(tab => {
  tab.addEventListener("click", () => {
    tabs.forEach(t => t.classList.remove("active"));
    tab.classList.add("active");
    const target = tab.dataset.tab;
    tabContents.forEach(c => c.classList.remove("active"));
    document.querySelector(`.${target}-tab`).classList.add("active");
  });
});

// ===== Show Tips =====
function showTips(text){
  tipsCards.innerHTML = `<div class="tip-card" style="padding:1rem;animation:fadeIn 0.5s;">${text}</div>`;
  setupGallery();
}

// ===== Quiz Functions =====
function updateProgress(){
  progressBar.style.width = ((quizIndex/currentQuiz.length)*100) + "%";
}

function showQuiz(){
  if(quizIndex >= currentQuiz.length){
    quizQuestion.textContent = "✅ Quiz จบแล้ว!";
    quizOptions.innerHTML = "";
    scoreboard.style.display = "block";
    scoreboard.textContent = `คะแนนของคุณ: ${score} / ${currentQuiz.length}`;
    confetti({particleCount:100,spread:70,origin:{y:0.6}});
    return;
  }
  
  updateProgress();
  const q = currentQuiz[quizIndex];
  quizQuestion.textContent = q.q;
  quizOptions.innerHTML = "";
  
  q.options.forEach((opt,i)=>{
    const li = document.createElement("li");
    li.textContent = opt;
    li.addEventListener("click", () => {
      const feedback = document.querySelector(".quiz-feedback");
      if(i === q.answer){
        feedback.textContent = "✅ ถูกต้อง!";
        feedback.style.color = "green";
        score++;
      } else {
        feedback.textContent = "❌ ผิด!";
        feedback.style.color = "red";
      }
      quizIndex++;
      setTimeout(()=>{ feedback.textContent=""; showQuiz(); },800);
    });
    quizOptions.appendChild(li);
  });
  updateProgress();
}

// ===== Dark Mode =====
themeBtn.addEventListener("click", () => {
  document.body.classList.toggle("dark-mode");
  themeBtn.textContent = document.body.classList.contains("dark-mode") ? "☀️ Light Mode" : "🌙 Dark Mode";
});

// ===== Search Device =====
document.getElementById("searchDevice").addEventListener("input", function(){
  const val = this.value.toLowerCase();
  listItems.forEach(li=>{
    li.style.display = li.textContent.toLowerCase().includes(val) ? "block" : "none";
  });
});

// ===== Lightbox Gallery =====
const lightbox = document.getElementById("lightbox");
const lightboxImg = document.getElementById("lightboxImg");

function setupGallery(){
  document.querySelectorAll("#deviceGallery img").forEach(img => {
    img.addEventListener("click", ()=>{
      lightbox.style.display = "flex";
      lightboxImg.src = img.src;
    });
  });
}

// ปิด lightbox เมื่อคลิก background
lightbox.addEventListener("click", e => {
  if(e.target === lightbox) lightbox.style.display = "none";
});

// เรียก setupGallery ครั้งแรก
setupGallery();
