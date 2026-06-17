document.addEventListener('DOMContentLoaded', function() {
    
    // 1. Бургер-меню
    const burgerBtn = document.getElementById('burgerBtn');
    const nav = document.querySelector('.nav');
    
    if (burgerBtn && nav) {
        burgerBtn.addEventListener('click', () => {
            nav.classList.toggle('active');
            const icon = burgerBtn.querySelector('i');
            if (nav.classList.contains('active')) {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-times');
            } else {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        });

        document.querySelectorAll('.nav__link').forEach(link => {
            link.addEventListener('click', () => {
                nav.classList.remove('active');
                burgerBtn.querySelector('i').classList.remove('fa-times');
                burgerBtn.querySelector('i').classList.add('fa-bars');
            });
        });
    }

    // 2. Анимация появления при скролле (Scroll Reveal)
    function reveal() {
        var reveals = document.querySelectorAll(".reveal");
        for (var i = 0; i < reveals.length; i++) {
            var windowHeight = window.innerHeight;
            var elementTop = reveals[i].getBoundingClientRect().top;
            var elementVisible = 100;

            if (elementTop < windowHeight - elementVisible) {
                reveals[i].classList.add("active");
            }
        }
    }
    window.addEventListener("scroll", reveal);
    reveal(); 

    // 3. Фильтрация товаров
    const filterButtons = document.querySelectorAll('.filter-btn');
    const productCards = document.querySelectorAll('.product-card');

    if (filterButtons.length > 0) {
        filterButtons.forEach(button => {
            button.addEventListener('click', () => {
                filterButtons.forEach(btn => btn.classList.remove('active'));
                button.classList.add('active');
                
                const filterValue = button.getAttribute('data-filter');
                
                productCards.forEach(card => {
                    const category = card.getAttribute('data-category');
                    
                    if (filterValue === 'all' || category === filterValue) {
                        card.style.display = 'block';
                        setTimeout(() => {
                            card.style.opacity = '1';
                            card.style.transform = 'translateY(0)';
                        }, 10);
                    } else {
                        card.style.display = 'none';
                        card.style.opacity = '0';
                        card.style.transform = 'translateY(20px)';
                    }
                });
            });
        });
    }

    // 4. ВАЛИДАЦИЯ И ОТПРАВКА ФОРМЫ (СТРОГАЯ ПРОВЕРКА)
    const orderForm = document.getElementById('orderForm');
    
    if (orderForm) {
        orderForm.addEventListener('submit', function(e) {
            e.preventDefault(); 
            
            // Получаем значения и убираем лишние пробелы по краям
            const nameInput = document.getElementById('name');
            const phoneInput = document.getElementById('phone');
            const productSelect = document.getElementById('productSelect');
            
            const name = nameInput.value.trim();
            const phone = phoneInput.value.trim();
            const product = productSelect.value;
            
            let errorMessage = '';

            // Регулярное выражение: только кириллица, минимум 2 символа
            // ^[А-Яа-яЁё\s]{2,}$ означает: начало строки, русские буквы или пробел, 2+ раза, конец строки
            const nameRegex = /^[А-Яа-яЁё\s]{2,}$/;

            // Проверка имени
            if (!nameRegex.test(name)) {
                errorMessage = 'Пожалуйста, введите корректное имя (минимум 2 буквы, только кириллица).';
            } 
            // Проверка телефона (минимум 10 символов, цифры/плюс/скобки/тире)
            else if (phone.length < 10 || !/^[\d\+\-\(\)\s]{10,}$/.test(phone)) {
                errorMessage = 'Пожалуйста, введите корректный номер телефона.';
            }
            // Проверка выбора набора
            else if (!product || product === '') {
                errorMessage = 'Пожалуйста, выберите набор из списка.';
            }

            // Если есть ошибка - показываем её и выходим
            if (errorMessage) {
                alert(errorMessage);
                return;
            }

            // Если всё хорошо - формируем красивое сообщение
            const successMessage = `✅ Спасибо, ${name}!\n\nВаша заявка на набор "${product}" успешно оформлена.\nМы свяжемся с вами по номеру ${phone} в ближайшее время.`;
            
            alert(successMessage);
            
            // Очищаем форму после успешной отправки
            orderForm.reset();
        });
    }
});