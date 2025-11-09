import { useState } from "react";\r\nimport SiteHeader from "../components/SiteHeader.jsx";\r\nimport SiteFooter from "../components/SiteFooter.jsx";
import SectionHeading from "../components/SectionHeading.jsx";
import ProductCard from "../components/ProductCard.jsx";
import CategoryRound from "../components/CategoryRound.jsx";
import CouponCard from "../components/CouponCard.jsx";
import NewsCard from "../components/NewsCard.jsx";
import Testimonial from "../components/Testimonial.jsx";
import WomenCollection from "../components/WomenCollection.jsx";
import MenCollection from "../components/MenCollection.jsx";
import {
  products,
  hero,
  categories,
  coupons,
  news,
  gallery,
  accessoriesMale,
  accessoriesFemale,
  suggestionsToday,
  suggestionsBest,
  specialDeals,
} from "../data/mock.js";

const asset = (p) => new URL(`../anhNNKB/${p}`, import.meta.url).href;

export default function Home() {
  const [tab, setTab] = useState("gia-tot");
  const [accTab, setAccTab] = useState("nam");

  return (
    <div className="min-h-screen bg-white">\r\n      <SiteHeader />
      {/* 1. HERO: Banner */}
      <section className="section-hero">
        <div className="max-w-6xl mx-auto px-4 py-10">
          <div className="rounded-2xl overflow-hidden shadow-card">
            <img src={hero} className="w-full h-72 md:h-[380px] lg:h-[460px] object-cover" />
          </div>
        </div>
      </section>

      {/* 2. DANH Má»¤C TRANG */}
      <section className="py-10 section-surface">
        <div className="max-w-6xl mx-auto px-4 grid grid-cols-4 md:grid-cols-8 gap-6">
          {categories.map((c, i) => (
            <CategoryRound key={i} {...c} />
          ))}
        </div>
      </section>

      {/* 3. COUPON */}
      <section className="max-w-6xl mx-auto px-4 py-10">
        <SectionHeading title="DÃ€NH RIÃŠNG CHO Báº N" />
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {coupons.map((cp, i) => (
            <CouponCard key={i} {...cp} />
          ))}
        </div>
      </section>

      {/* 4. Æ¯U ÄÃƒI Äáº¶C BIá»†T (grid 4) */}
      <section className="py-10 bg-gradient-to-b from-[#ffe7df] to-white">
        <div className="max-w-6xl mx-auto px-4">
          <SectionHeading title="Æ¯u Ä‘Ã£i Ä‘áº·c biá»‡t" />
          <div className="grid md:grid-cols-4 gap-4">
            {(specialDeals || products.slice(0, 4)).map((p, i) => (
              <ProductCard key={p.id ?? i} {...p} />
            ))}
          </div>
          <div className="text-center mt-6">
            <button className="inline-flex items-center gap-2 px-4 py-2 rounded-xl border hover:bg-gray-50">Xem táº¥t cáº£</button>
          </div>
        </div>
      </section>

      {/* 5. Gá»¢I Ã HÃ”M NAY */}
      <section className="max-w-6xl mx-auto px-4 py-12">
        <SectionHeading title="Gá»£i Ã½ hÃ´m nay" />
        <div className="flex items-center justify-center gap-6 text-sm">
          {[
            { id: "moi", label: "HÃ ng má»›i vá»" },
            { id: "gia-tot", label: "GiÃ¡ tá»‘t" },
          ].map((t) => (
            <button
              key={t.id}
              onClick={() => setTab(t.id)}
              className={`${tab === t.id ? "text-brand-primary border-b-2 border-brand-primary" : "text-gray-500"} pb-1`}
            >
              {t.label}
            </button>
          ))}
        </div>
        <div className="grid md:grid-cols-4 gap-4 mt-6">
          {(tab === "gia-tot" ? suggestionsBest : suggestionsToday).map((p, i) => (
            <ProductCard key={i} {...p} />
          ))}
        </div>
      </section>

      {/* 6. 4 BANNER KHá»I */}
      <section className="max-w-6xl mx-auto px-4 pb-6">
        <div className="grid md:grid-cols-3 gap-4">
          <img className="rounded-2xl shadow-card" src={asset("img_banner_1.webp")} />
          <img className="rounded-2xl shadow-card" src={asset("img_banner_2.webp")} />
          <div className="grid gap-4">
            <img className="rounded-2xl shadow-card" src={asset("img_banner_3.webp")} />
            <img className="rounded-2xl shadow-card" src={asset("img_banner_4.webp")} />
          </div>
        </div>
      </section>

      {/* 7. Bá»˜ SÆ¯U Táº¬P NAM */}
      <MenCollection />

      {/* 8. LOOKBOOK + TEXT */}
      <section className="py-10 bg-[#ffefe8]">
        <div className="max-w-6xl mx-auto px-4 grid md:grid-cols-2 gap-6 items-center">
          <img className="rounded-2xl shadow-card" src={asset("image_lookbook_1.webp")} />
          <div>
            <h3 className="text-3xl font-semibold">ENCHANTING DRESS 2024</h3>
            <p className="mt-3 text-gray-600">BST Ä‘áº§m dá»‡t kim, tone pastel hiá»‡n Ä‘áº¡i, phá»‘i Ä‘i lÃ m & Ä‘i chÆ¡i.</p>
            <button className="mt-4 px-4 py-2 rounded-xl bg-brand-primary text-white">Xem thÃªm</button>
          </div>
        </div>
      </section>

      {/* 9. Bá»˜ SÆ¯U Táº¬P Ná»® */}
      <WomenCollection />

      {/* 10. BLACK FRIDAY 4 TILE */}
      <section className="max-w-6xl mx-auto px-4 py-6">
        <div className="grid md:grid-cols-3 gap-4 items-stretch">
          <img className="rounded-2xl shadow-card object-cover w-full" src={asset("img_banner_1.webp")} />
          <div className="grid gap-4">
            <img className="rounded-2xl shadow-card" src={asset("img_banner_2.webp")} />
            <img className="rounded-2xl shadow-card" src={asset("img_banner_3.webp")} />
          </div>
          <img className="rounded-2xl shadow-card object-cover w-full" src={asset("img_banner_4.webp")} />
        </div>
      </section>

      {/* 11. PHá»¤ KIá»†N (tabs: nam / ná»¯) */}
      <section className="max-w-6xl mx-auto px-4 py-10">
        <SectionHeading title="PHá»¤ KIá»†N" />
        <div className="flex items-center justify-center gap-6 text-sm">
          {[
            { id: "nam", label: "Phá»¥ kiá»‡n nam" },
            { id: "nu", label: "Phá»¥ kiá»‡n ná»¯" },
          ].map((t) => (
            <button
              key={t.id}
              onClick={() => setAccTab(t.id)}
              className={`${accTab === t.id ? "text-brand-primary border-b-2 border-brand-primary" : "text-gray-500"} pb-1`}
            >
              {t.label}
            </button>
          ))}
        </div>
        <div className="mt-6 grid sm:grid-cols-2 md:grid-cols-4 gap-4">
          {(accTab === "nam" ? accessoriesMale : accessoriesFemale).map((item, i) => (
            <ProductCard key={i} {...item} />
          ))}
        </div>
      </section>

      {/* 12. TESTIMONIAL */}
      <section className="max-w-6xl mx-auto px-4 py-10">
        <Testimonial />
      </section>

      {/* 13. TIN Tá»¨C */}
      <section className="max-w-6xl mx-auto px-4 py-10">
        <SectionHeading title="Tin tá»©c" />
        <div className="grid md:grid-cols-[2fr_1fr] gap-4">
          <NewsCard {...news[0]} />
          <div className="grid gap-4">
            <NewsCard {...news[1]} />
            <NewsCard {...news[2]} />
          </div>
        </div>
        <div className="text-center mt-6">
          <button className="inline-flex items-center gap-2 px-4 py-2 rounded-xl border hover:bg-gray-50">Xem táº¥t cáº£</button>
        </div>
      </section>

      {/* 14. GALLERY */}
      <section className="max-w-6xl mx-auto px-4 py-10">
        <SectionHeading title="Cáº­p nháº­t tá»« ND STYLE" />
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {gallery.map((g, i) => (
            <img key={i} className="rounded-2xl shadow-card border object-cover w-full h-48" src={g} />
          ))}
        </div>
        <div className="text-center mt-6">
          <button className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#ffefe8] text-brand-dark border border-orange-200">Theo dÃµi ngay</button>
        </div>
      </section>
    </div>
  );
}


