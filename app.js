const masaContainer = document.querySelectorAll('.container')[0];
const tatliContainer = document.querySelectorAll('.container')[1];
const icecekContainer = document.querySelectorAll('.container')[2];

// --- Rastgele veri için menüler ---
const tatlilar = [
    { ad: "Tiramisu", fiyat: 60 },
    { ad: "Muhallebi", fiyat: 40 },
    { ad: "San Sebastian", fiyat: 80 },
    { ad: "Mozaik Pasta", fiyat: 50 },
    { ad: "Güllaç", fiyat: 70 },
    { ad: "Baklava", fiyat: 90 }
];

const icecekler = [
    { ad: "Soda", fiyat: 20 },
    { ad: "Kola", fiyat: 35 },
    { ad: "Limonata", fiyat: 25 },
    { ad: "Su", fiyat: 10 },
    { ad: "Şalgam", fiyat: 30 },
    { ad: "Ayran", fiyat: 15 }
];

// --- Masa Ekle ---
document.getElementById('masaEkle').addEventListener('click', () => {
    const count = masaContainer.querySelectorAll('.masa').length + 1;
    const newMasa = document.createElement('button');
    newMasa.classList.add('masa');
    newMasa.textContent = `Masa ${count}`;
    masaContainer.appendChild(newMasa);
    masaTiklamaOlayi(newMasa); // yeni masaya da tıklama özelliği ekle
});

// --- Tatlı Ekle ---
document.getElementById('tatliEkle').addEventListener('click', () => {
    const count = tatliContainer.querySelectorAll('.yiyecek').length + 1;
    const newTatli = document.createElement('button');
    newTatli.classList.add('yiyecek');
    newTatli.textContent = `Tatlı ${count}`;
    tatliContainer.appendChild(newTatli);
});

// --- İçecek Ekle ---
document.getElementById('icecekEkle').addEventListener('click', () => {
    const count = icecekContainer.querySelectorAll('.icecek').length + 1;
    const newIcecek = document.createElement('button');
    newIcecek.classList.add('icecek');
    newIcecek.textContent = `İçecek ${count}`;
    icecekContainer.appendChild(newIcecek);
});

// --- Masa tıklama fonksiyonu ---
function masaTiklamaOlayi(masaButon) {
    masaButon.addEventListener('click', () => {
        const rastgeleTatli = tatlilar[Math.floor(Math.random() * tatlilar.length)];
        const rastgeleIcecek = icecekler[Math.floor(Math.random() * icecekler.length)];
        const toplamFiyat = rastgeleTatli.fiyat + rastgeleIcecek.fiyat;

        alert(`
${masaButon.textContent} siparişi:
Tatlı: ${rastgeleTatli.ad} (${rastgeleTatli.fiyat} TL)
İçecek: ${rastgeleIcecek.ad} (${rastgeleIcecek.fiyat} TL)
Toplam: ${toplamFiyat} TL
        `);
    });
}

// --- Var olan masalara tıklama özelliği ekle ---
document.querySelectorAll('.masa').forEach(masaTiklamaOlayi);
