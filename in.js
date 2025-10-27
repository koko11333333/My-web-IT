  <script src="https://unpkg.com/swiper/swiper-bundle.min.js"></script>
 
    const swiper = new Swiper(".swiper", {
  loop: true,
  slidesPerView: 1,
  spaceBetween: 0,
  autoplay: { delay: 4000, disableOnInteraction: false },
  pagination: { el: ".swiper-pagination", clickable: true },
  navigation: { nextEl: ".swiper-button-next", prevEl: ".swiper-button-prev" },

  on: {
    slideChangeTransitionStart: function () {
      // รีเซ็ตภาพสไลด์ก่อนหน้า กลับไปขนาดใหญ่
      this.slides.forEach(slide => {
        const img = slide.querySelector("img");
        if (img) img.style.transform = "scale(1.05)";
      });
    },
    slideChangeTransitionEnd: function () {
      // สไลด์ active ค่อยๆ zoom out
      const activeImg = this.slides[this.activeIndex].querySelector("img");
      if (activeImg) {
        activeImg.style.transform = "scale(1)"; // ค่อยๆ ลดกลับขนาดปกติ
      }
    }
  }
});
 

  <script src="https://unpkg.com/aos@2.3.1/dist/aos.js"></script>
  
    AOS.init({ duration: 800, easing: 'ease-in-out', once: true });
 
document.querySelectorAll('#device-list li').forEach(item => {
  item.addEventListener('click', () => {
    const img = item.getAttribute('data-img');
    document.getElementById('device-preview').src = img;
  });
});



const deviceDescriptions = {
  "เมนบอร์ด": "เมนบอร์ดคือแผงวงจรหลักของคอมพิวเตอร์ ที่เชื่อมต่อทุกส่วนเข้าด้วยกัน",
  "ซีพียู": "ซีพียูคือสมองของคอมพิวเตอร์ ทำหน้าที่ประมวลผลคำสั่งทั้งหมด",
  "ฮาร์ดดิสก์": "ฮาร์ดดิสก์คือที่เก็บข้อมูลของคอมพิวเตอร์ ใช้บันทึกไฟล์และโปรแกรมต่าง ๆ",
  "SSD": "SSD คือหน่วยเก็บข้อมูลความเร็วสูง ทำให้เครื่องทำงานเร็วขึ้น"
};

const deviceList = document.querySelectorAll('#device-list li');
const devicePreview = document.getElementById('device-preview');
const leftBoxTitle = document.querySelector('.left-box h2');
const leftBoxText = document.querySelector('.left-box p');

deviceList.forEach(item => {
  item.addEventListener('click', () => {
    // เปลี่ยนรูปภาพฝั่งขวา
    const imgSrc = item.getAttribute('data-img');
    devicePreview.src = imgSrc;

    // เปลี่ยนข้อความฝั่งซ้าย
    const deviceName = item.textContent;
    leftBoxTitle.textContent = deviceName;
    leftBoxText.textContent = deviceDescriptions[deviceName] || 'ไม่พบคำอธิบาย';

    // ไฮไลต์อุปกรณ์ที่เลือก
    deviceList.forEach(i => i.classList.remove('active'));
    item.classList.add('active');
  });
});