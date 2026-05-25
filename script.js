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
    reveal(); // Запуск один раз при загрузке

    // 3. Фильтрация товаров
    const filterButtons = document.querySelectorAll('.filter-btn');
    const productCards = document.querySelectorAll('.product-card');

    if (filterButtons.length > 0) {
        filterButtons.forEach(button => {
            button.addEventListener('click', () => {
                // Удаляем класс active со всех кнопок
                filterButtons.forEach(btn => btn.classList.remove('active'));
                // Добавляем класс active нажатой кнопке
                button.classList.add('active');
                
                // Получаем категорию для фильтрации
                const filterValue = button.getAttribute('data-filter');
                
                // Фильтруем товары
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

    // 4. Обработка формы (Имитация отправки)
    const orderForm = document.getElementById('orderForm');
    if (orderForm) {
        orderForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const name = document.getElementById('name').value;
            const phone = document.getElementById('phone').value;
            const product = document.getElementById('productSelect').value;
            
            if(name.length < 2 || phone.length < 10) {
                alert('Пожалуйста, проверьте правильность введенных данных.');
                return;
            }

            alert(`Спасибо, ${name}! \nВаша заявка на набор "${product}" успешно оформлена.\nМы свяжемся с вами по номеру ${phone} в ближайшее время.`);
            
            orderForm.reset();
        });
    }
});