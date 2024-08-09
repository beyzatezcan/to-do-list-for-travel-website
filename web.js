// Sayfa yüklendiğinde çalışacak olan fonksiyon
document.addEventListener('DOMContentLoaded', function() {
    // Tüm kategori öğelerini seç
    const categories = document.querySelectorAll('.category');

    // Her kategori için döngü
    categories.forEach(category => {
        // Kategori içindeki giriş, ekleme düğmesi ve görev listesini seç
        const input = category.querySelector('.task-input');
        const addButton = category.querySelector('.add-task');
        const list = category.querySelector('.todolist');

        // Ekleme düğmesine tıklandığında
        addButton.addEventListener('click', function() {
            // Giriş kutusundan alınan metni al ve boşlukları temizle
            const taskText = input.value.trim();
            // Metin boş değilse
            if (taskText !== '') {
                // Görevi listeye ekle ve giriş kutusunu temizle
                addTask(list, taskText);
                input.value = '';
            }
        });

        // Görev listesine tıklama olayı eklendiğinde
        list.addEventListener('click', function(event) {
            const target = event.target;
            const taskElement = target.closest('.task').querySelector('span');

            // Silme düğmesine tıklanırsa
            if (target.classList.contains('delete-task')) {
                // Görev öğesini sil
                target.parentElement.remove();
            }
            // Tamamlama düğmesine tıklanırsa
            if (target.classList.contains('toggle-task')) {
                // Görev öğesinin tamamlanmışlık durumunu değiştir
                target.parentElement.classList.toggle('completed');
            }
            // Düzenleme düğmesine tıklanırsa
            if (target.classList.contains('edit-task')) {
                // Görev metnini düzenlenebilir hale getir ve odaklan
                taskElement.contentEditable = true;
                taskElement.focus();
            }
        });

        // Görev listesinden odak dışına çıkıldığında
        list.addEventListener('blur', function(event) {
            const target = event.target;
            // Eğer hedef bir span öğesi ise
            if (target.tagName === 'SPAN') {
                // Düzenlenebilirliği kapat
                target.contentEditable = false;
            }
        }, true); // true parametresi bubbling yerine capturing kullanılmasını sağlar
    });
});

// Görev ekleme fonksiyonu
function addTask(list, taskText) {
    const task = document.createElement('li'); // Yeni bir liste öğesi oluştur
    task.classList.add('task'); // CSS sınıfını ekle
    task.innerHTML = `
        <span>${taskText}</span> <!-- Görev metni -->
        <button class="toggle-task">✅</button> <!-- Tamamlama düğmesi -->
        <button class="edit-task">✏️</button> <!-- Düzenleme düğmesi -->
        <button class="delete-task">❌</button> <!-- Silme düğmesi -->
    `;
    list.appendChild(task); // Liste öğesini listeye ekle
}

// Hatırlatıcı kutusunu gizleme fonksiyonu
function hideReminder() {
    var reminderBox = document.getElementById("reminderBox"); // Hatırlatıcı kutusunu al
    reminderBox.style.display = "none"; // Hatırlatıcı kutusunu gizle
}