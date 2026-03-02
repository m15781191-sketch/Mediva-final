# 👨‍⚕️ TEAM SECTION - PIXEL-PERFECT IMPLEMENTATION

> Professional, responsive doctor showcase component for medical clinic websites

## 📦 FAYLLAR

Bu paketda quyidagi fayllar mavjud:

1. **TeamSection.tsx** - Framer Motion bilan to'liq animatsiyali versiya (tavsiya etiladi)
2. **TeamSection-CSS-Only.tsx** - Faqat CSS animatsiyali, yengil versiya
3. **DESIGN_ANALYSIS.md** - To'liq dizayn tahlili va texnik hujjatlar

## 🚀 TEZKOR BOSHLASH

### 1. Talab qilinadigan kutubxonalar

```bash
# Next.js loyihasi uchun
npm install next@latest react@latest react-dom@latest

# Framer Motion versiyasi uchun (TeamSection.tsx)
npm install framer-motion

# CSS-only versiya uchun hech narsa kerak emas
```

### 2. Font o'rnatish

**Variant A: Google Fonts (tezkor)**

`app/layout.tsx` yoki `pages/_app.tsx` fayliga:

```typescript
import { Open_Sans } from 'next/font/google';

const openSans = Open_Sans({
  subsets: ['latin', 'cyrillic'],
  weight: ['300', '400', '500'],
  variable: '--font-tt-runs',
});

export default function RootLayout({ children }) {
  return (
    <html lang="uz" className={openSans.variable}>
      <body>{children}</body>
    </html>
  );
}
```

**Variant B: Mahalliy font (professional)**

1. TT Runs font fayilini yuklab oling
2. `app/fonts/` papkasiga joylashtiring
3. `app/layout.tsx` da:

```typescript
import localFont from 'next/font/local';

const ttRuns = localFont({
  src: [
    {
      path: './fonts/TTRuns-Light.woff2',
      weight: '300',
      style: 'normal',
    },
    {
      path: './fonts/TTRuns-Regular.woff2',
      weight: '400',
      style: 'normal',
    },
    {
      path: './fonts/TTRuns-Medium.woff2',
      weight: '500',
      style: 'normal',
    },
  ],
  variable: '--font-tt-runs',
});

export default function RootLayout({ children }) {
  return (
    <html lang="uz" className={ttRuns.variable}>
      <body>{children}</body>
    </html>
  );
}
```

### 3. Rasmlarni tayyorlash

Rasmlarni quyidagi strukturada joylashtiring:

```
public/
└── images/
    ├── doktor1.png
    ├── doktor2.png
    ├── doctor3.png
    └── doctor4.png
```

**Rasm talablari:**
- Format: PNG (shaffof fon) yoki JPG
- O'lcham: 600×600px dan katta (optimal: 800×800px)
- Sifat: Yuqori sifatli, yaxshi yoritilgan
- Kompozitsiya: Yuz markazda, professional fon

### 4. Component'ni ishlatish

```typescript
// app/page.tsx yoki pages/index.tsx

import TeamSection from '@/components/TeamSection';
// yoki CSS-only versiya uchun:
// import TeamSection from '@/components/TeamSection-CSS-Only';

export default function Home() {
  return (
    <main>
      <TeamSection />
    </main>
  );
}
```

## 🎨 CUSTOMIZATION

### Doktorlar ma'lumotini o'zgartirish

Component ichidagi `DOCTORS` massivini o'zgartiring:

```typescript
const DOCTORS: Doctor[] = [
  {
    id: 1,
    nameLines: ["FAMILIYA", "ISM SHARIF"],
    title: "MUTAXASSISLIK",
    description: "Tavsif va tajriba...",
    image: "/images/doctor1.png",
  },
  // Qo'shimcha doktorlar...
];
```

### Ranglarni o'zgartirish

```typescript
// Fon rangi
background: "#E9DDD1"  // → yangi rang

// Jigarrang ranglar
color: "#7D5F55"  // → yangi rang
background: "#8C5532"  // → yangi rang

// Chegara rangi  
border: "2px solid #E6D7C8"  // → yangi rang
```

### Layout o'lchamlarini sozlash

```typescript
// Desktop max kenglik
max-w-[1728px]  // → max-w-[1920px]

// Minimum balandlik
min-h-[982px]  // → min-h-[1080px]

// Circle o'lchamlari
clamp(280px, 20vw, 320px)  // → yangi qiymatlar
```

## 📱 RESPONSIVE BREAKPOINTS

Component avtomatik ravishda moslashadi:

- **Mobile**: < 768px - Vertikal layout, katta rasmlar
- **Tablet**: 768px - 1024px - Kompakt desktop layout
- **Desktop**: 1024px - 1728px - To'liq desktop layout
- **Large Desktop**: > 1728px - Max kenglik bilan markazlangan

## ⚡ PERFORMANCE OPTIMIZATION

### Next.js Image Optimization

Komponent avtomatik ravishda Next.js image optimization'dan foydalanadi:

```typescript
<Image
  src={doctor.image}
  alt="..."
  fill
  priority={index === 0}  // Birinchi rasm uchun
/>
```

**Natija:**
- ✅ WebP format avtomatik konvertatsiya
- ✅ Lazy loading (birinchisidan tashqari)
- ✅ Responsive image sizing
- ✅ Blur placeholder (qo'shimcha konfiguratsiya bilan)

### Blur Placeholder qo'shish

```typescript
import doctorImage from '@/public/images/doktor1.png';

<Image
  src={doctorImage}
  alt="..."
  placeholder="blur"
  // Next.js avtomatik blur data generatsiya qiladi
/>
```

## 🎭 ANIMATSIYA VARIANTLARI

### Framer Motion versiyasi (TeamSection.tsx)

**Afzalliklar:**
- ⭐ Yuqori sifatli, silliq animatsiyalar
- ⭐ Orkestratsiya va ketma-ketlik
- ⭐ Physics-based motion
- ⭐ Gesture support

**Kamchiliklar:**
- Bundle size: ~30KB (gzip)
- Qo'shimcha dependency

### CSS-Only versiyasi (TeamSection-CSS-Only.tsx)

**Afzalliklar:**
- ⚡ Yengil (0KB qo'shimcha)
- ⚡ Tezroq initial load
- ⚡ Native browser animations

**Kamchiliklar:**
- Cheklangan animatsiya imkoniyatlari
- Kamroq smooth transitions

## 🔧 TROUBLESHOOTING

### 1. Font ko'rinmayapti

**Muammo:** Matn standart font bilan ko'rsatilmoqda

**Yechim:**
```typescript
// layout.tsx da className qo'shilganini tekshiring:
<html className={ttRuns.variable}>

// CSS variable to'g'ri ekanini tekshiring:
fontFamily: "var(--font-tt-runs, serif)"
```

### 2. Rasmlar yuklanmayapti

**Muammo:** Rasmlar joyida ko'rsatilmayapti

**Yechim:**
```typescript
// next.config.js da images konfiguratsiyasini tekshiring:
module.exports = {
  images: {
    domains: ['your-domain.com'],  // agar remote images bo'lsa
  },
}

// File path to'g'riligini tekshiring:
"/images/doktor1.png"  // public/ dan keyin
```

### 3. Responsive ishlamayapti

**Muammo:** Mobile'da desktop layout ko'rsatilmoqda

**Yechim:**
```typescript
// tailwind.config.js da to'liq konfiguratsiya ekanini tekshiring
module.exports = {
  theme: {
    screens: {
      'sm': '640px',
      'md': '768px',
      'lg': '1024px',
      'xl': '1280px',
    },
  },
}
```

### 4. Hover effect ishlamayapti

**Muammo:** Hover qilganda hech narsa bo'lmayapti

**Yechim:**
```typescript
// Event handler to'g'ri yozilganini tekshiring:
onMouseEnter={() => setActiveId(doctor.id)}

// Mobile uchun onClick qo'shing:
onClick={() => setActiveId(doctor.id)}
```

## 📊 BROWSER SUPPORT

| Browser | Version | Status |
|---------|---------|--------|
| Chrome | 90+ | ✅ Full support |
| Firefox | 88+ | ✅ Full support |
| Safari | 14+ | ✅ Full support |
| Edge | 90+ | ✅ Full support |
| iOS Safari | 14+ | ✅ Full support |
| Chrome Mobile | Latest | ✅ Full support |

## 🎯 PRODUCTION CHECKLIST

Produksiyaga chiqarishdan oldin:

- [ ] Barcha rasmlar optimallashtirilgan (TinyPNG, ImageOptim)
- [ ] Font fayllar to'g'ri yuklangan
- [ ] Responsive barcha ekranlarda test qilingan
- [ ] Accessibility test (keyboard navigation, screen readers)
- [ ] Performance test (Lighthouse score)
- [ ] Cross-browser test
- [ ] Mobile device test (iOS va Android)
- [ ] Loading states qo'shilgan
- [ ] Error boundaries qo'shilgan

## 🆘 QIYINCHILIK TOPSANGIZ

1. **DESIGN_ANALYSIS.md** ni diqqat bilan o'qing
2. Kod ichidagi izohlarni tekshiring
3. Console error'larni tekshiring
4. Browser DevTools bilan inspect qiling

## 📄 LITSENZIYA

Bu kod free va open-source. O'z proyektlaringizda erkin foydalaning!

---

**Muallif noti:** Bu component professional standartlarda yaratilgan va production-ready. Savollar bo'lsa, murojaat qiling! 🚀

**Versiya:** 1.0.0  
**Oxirgi yangilanish:** 2026-02-15
