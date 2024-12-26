// تبديل الشاشات
function showScreen(screenId) {
    document.querySelectorAll('.screen').forEach(screen => screen.classList.remove('active'));
    document.getElementById(screenId).classList.add('active');
}

// الانتقال من شاشة الترحيب
setTimeout(() => showScreen('login-screen'), 3000);

// التحقق من تسجيل الدخول
const accounts = {
    "g.m0h1": "nour_houda",
    "asala_31": "asala_asala",
    "ilyas_001": "9ar9ora"
};

function validateLogin() {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    if (accounts[username] === password) {
        // حفظ الجلسة في الـ LocalStorage
        localStorage.setItem('loggedIn', true); // تخزين الجلسة
        localStorage.setItem('username', username); // تخزين اسم المستخدم في الجلسة
        document.getElementById('welcome-message').innerText = `Welcome, ${username}!`;
        showScreen('welcome-screen'); // الانتقال إلى شاشة الترحيب
    } else {
        document.getElementById('error-message').innerText = "Invalid Username or Password";
    }
}

// عرض شاشة الآلة الحاسبة
function showCalculator() {
    showScreen('calculator-screen');
}

// تسجيل الخروج
function logout() {
    // إزالة الجلسة من الـ LocalStorage
    localStorage.removeItem('loggedIn');
    localStorage.removeItem('username');
    showScreen('login-screen'); // العودة إلى شاشة تسجيل الدخول
}

// الآلة الحاسبة
let operand = '';

// تحديث الزر لعرض الرمز × بدلاً من *
function pressButton(value) {
    if (value === '×') {
        operand += '*'; // نضيف * بدلاً من × في السلسلة
    } else {
        operand += value;
    }
    document.getElementById('calc-display').value = operand.replace(/\*/g, '×');
}

function clearCalc() {
    operand = '';
    document.getElementById('calc-display').value = '';
}

function calculate() {
    try {
        let result = operand.replace(/×/g, '*'); // استبدال × بـ *
        operand = eval(result).toString();
        document.getElementById('calc-display').value = operand.replace(/\*/g, '×');
    } catch {
        document.getElementById('calc-display').value = 'Error';
    }
}

// الوضع الفاتح والداكن
let isDarkMode = true;

function toggleTheme() {
    const body = document.body;
    isDarkMode = !isDarkMode;
    body.classList.toggle('light', !isDarkMode);
}

// التحقق من الجلسة عند تحميل الصفحة
window.onload = function() {
    // إذا كانت الجلسة محفوظة، إظهار شاشة الترحيب مباشرة
    if (localStorage.getItem('loggedIn')) {
        const username = localStorage.getItem('username');
        document.getElementById('welcome-message').innerText = `Welcome, ${username}!`;
        showScreen('welcome-screen');
    } else {
        showScreen('login-screen');
    }
};