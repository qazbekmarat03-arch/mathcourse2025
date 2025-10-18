// Код бет толық жүктелгенде ғана іске қосылады
document.addEventListener('DOMContentLoaded', () => {

    // Барлық қажетті элементтерді тауып аламыз
    const checkboxes = document.querySelectorAll('.lesson-checkbox');
    const progressBar = document.getElementById('progress-bar');
    const progressText = document.getElementById('progress-text');
    const totalLessons = checkboxes.length;
    const storageKey = 'mathCourseProgress'; // Прогрессті сақтайтын кілт

    // Прогрессті жаңартатын негізгі функция
    function updateProgress() {
        // Қанша checkbox белгіленгенін санаймыз
        const checkedCount = document.querySelectorAll('.lesson-checkbox:checked').length;
        
        // Пайызды есептейміз
        const percentage = (checkedCount / totalLessons) * 100;
        
        // Прогресс-бардың енін және мәтінін жаңартамыз
        progressBar.style.width = percentage + '%';
        progressText.textContent = `Сіздің прогрессіңіз: ${checkedCount} / ${totalLessons} аяқталды`;
    }

    // Прогрессті браузер жадына (localStorage) сақтау функциясы
    function saveProgress() {
        const checkedIds = [];
        checkboxes.forEach(cb => {
            if (cb.checked) {
                // Белгіленген сабақтардың ID-н жинаймыз (data-lesson-id="1", "2"...)
                checkedIds.push(cb.dataset.lessonId);
            }
        });
        // Жиналған массивті JSON форматында сақтаймыз
        localStorage.setItem(storageKey, JSON.stringify(checkedIds));
    }

    // Бет ашылғанда, сақталған прогрессті жүктеу функциясы
    function loadProgress() {
        // Сақталған ID массивті аламыз (егер бос болса, бос массив аламыз)
        const savedProgress = JSON.parse(localStorage.getItem(storageKey)) || [];
        
        if (savedProgress.length > 0) {
            checkboxes.forEach(cb => {
                // Егер сабақтың ID-і сақталған массивте болса, оны белгілейміз
                if (savedProgress.includes(cb.dataset.lessonId)) {
                    cb.checked = true;
                }
            });
        }
        
        // Сақталған деректер негізінде прогрессті жаңартамыз
        updateProgress();
    }

    // Әрбір checkbox-қа "өзгеріс" оқиғасын қосамыз
    checkboxes.forEach(cb => {
        cb.addEventListener('change', () => {
            // Checkbox басылғанда, прогрессті сақтап, экранды жаңартамыз
            saveProgress();
            updateProgress();
        });
    });

    // Бетті бірінші рет ашқанда, сақталған прогрессті жүктейміз
    loadProgress();
});