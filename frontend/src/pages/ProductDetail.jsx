import { useEffect, useMemo, useState } from "react";
import { BadgePercent, ChevronLeft, ChevronRight, Headphones, Truck } from "lucide-react";
import productDetails from "../data/productDetails.js";
import Header from "../components/Header.jsx";
import Footer from "../components/Footer.jsx";
import { womenCollection, accessoriesMale, accessoriesFemale, menCollection, suggestionsToday, suggestionsBest } from "../data/mock.js";

const QtyInput = ({ value, onChange }) => (
  <div className="inline-flex items-center gap-3 rounded-xl border px-3 py-2">
    <button onClick={() => onChange(Math.max(1, value - 1))} className="text-sm">-</button>
    <span className="min-w-6 text-center text-sm">{value}</span>
    <button onClick={() => onChange(value + 1)} className="text-sm">+</button>
  </div>
);

function ShippingIcon({ index }) {
  const icons = [Truck, BadgePercent, Headphones];
  const Icon = icons[index % icons.length];
  return <Icon className="w-4 h-4 text-brand-primary" />;
}

export default function ProductDetail({ id: passedId }) {
  const [qty, setQty] = useState(1);
  const [hashId, setHashId] = useState(() => (location.hash.split("/")[2] || ""));
  useEffect(() => {
    const fn = () => setHashId(location.hash.split("/")[2] || "");
    window.addEventListener("hashchange", fn);
    return () => window.removeEventListener("hashchange", fn);
  }, []);

  const id = passedId || hashId || "1";
  const product = productDetails[id];

  const nameDict = Object.fromEntries([
    ...(womenCollection || []).map((x) => [String(x.id), x]),
    ...(accessoriesMale || []).map((x) => [String(x.id), x]),
    ...(accessoriesFemale || []).map((x) => [String(x.id), x]),
    ...(menCollection || []).map((x) => [String(x.id), x]),
    ...(suggestionsToday || []).map((x) => [String(x.id), x]),
    ...(suggestionsBest || []).map((x) => [String(x.id), x]),
  ]);
  const enrichRelated = (r) => {
    const k = String(r.id);
    const src = nameDict[k] || {};
    const bad = typeof r.name === "string" && /^Sản phẩm\s+\d+$/i.test(r.name);
    return {
      id: k,
      name: (bad || !r.name) ? (src.name || r.name) : r.name,
      price: src.price || r.price,
      img: src.img || r.img || (k ? new URL("../anhNNKB/" + k + ".webp", import.meta.url).href : undefined),
    };
  };

  const gallery = useMemo(() => {
    if (!product) return [];
    return [product.hero, ...(product.images || [])].filter(Boolean);
  }, [product]);

  if (!product) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="max-w-6xl mx-auto py-20 text-center">
          <p className="text-xl font-semibold">Không tìm thấy sản phẩm</p>
          <p className="text-sm text-gray-500">Vui lòng quay lại trang chủ để tiếp tục mua sắm.</p>
        </div>
        <Footer />
      </div>
    );
  }

  const [tab, setTab] = useState("info");
  const tabLabels = { info: "Thông tin sản phẩm", policy: "Chính sách đổi trả", review: "Đánh giá sản phẩm" };
  const related = useMemo(() => {
    const arr = (product?.related || []).filter((r) => String(r.id) !== String(id));
    return arr.slice(0, 3).map(enrichRelated);
  }, [product, id]);

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <div className="py-10">
        <div className="max-w-6xl mx-auto bg-white rounded-2xl shadow-lg overflow-hidden">
          <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr] p-6">
            <div>
              <div className="grid gap-3 lg:grid-cols-[80px_1fr]">
                <div className="flex flex-col gap-3">
                  {gallery.map((img, idx) => (
                    <button
                      key={idx}
                      className="h-16 w-full overflow-hidden rounded-xl bg-gray-100"
                      style={{ border: idx === 0 ? "2px solid #ff7a45" : undefined }}
                      onClick={(evt) => {
                        const main = evt.currentTarget.parentElement.nextElementSibling.querySelector('img');
                        if (main) main.src = img;
                      }}
                    >
                      <img src={img} alt={product.name} className="h-full w-full object-cover" />
                    </button>
                  ))}
                </div>
                <div className="rounded-2xl bg-gray-100 p-3 text-center relative">
                  <img src={gallery[0]} alt={product.name} className="h-96 w-full object-contain" />
                  <button
                    onClick={(e) => {
                      const el = e.currentTarget.parentElement.querySelector('img');
                      const idx = Math.max(0, gallery.indexOf(el?.src));
                      const next = (idx - 1 + gallery.length) % gallery.length;
                      if (el) el.src = gallery[next];
                    }}
                    className="absolute left-3 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white/90 ring-1 ring-gray-200 hover:bg-white"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </button>
                  <button
                    onClick={(e) => {
                      const el = e.currentTarget.parentElement.querySelector('img');
                      const idx = Math.max(0, gallery.indexOf(el?.src));
                      const next = (idx + 1) % gallery.length;
                      if (el) el.src = gallery[next];
                    }}
                    className="absolute right-3 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white/90 ring-1 ring-gray-200 hover:bg-white"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
            <div className="space-y-4">
              <div>
                <p className="text-sm uppercase tracking-[0.3em] text-gray-500">{product.variant}</p>
                <h1 className="text-3xl font-semibold text-brand-dark">{product.name}</h1>
                <p className="text-2xl font-bold text-brand-primary">{product.price}</p>
              </div>
              <p className="text-sm text-gray-600 leading-relaxed">{product.desc}</p>
              <div className="flex items-center gap-3">
                <QtyInput value={qty} onChange={setQty} />
                <button className="rounded-full bg-brand-primary px-5 py-2 text-white">Thêm vào giỏ</button>
              </div>
              <div className="space-y-3 rounded-2xl border bg-[#fffaf6] p-4">
                <p className="text-sm font-semibold text-brand-dark">Ưu đãi & vận chuyển</p>
                <div className="space-y-2 text-sm text-gray-600">
                  {(product.shipping || []).map((item, idx) => (
                    <div key={idx} className="flex items-center gap-2">
                      <ShippingIcon index={idx} />
                      <div>
                        <p className="font-medium text-brand-dark">{item.title}</p>
                        <p>{item.sub}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
          {/* Tabs */}
          <div className="px-6 pb-8">
            <div className="flex gap-6 justify-center border-b">
              {[{ id: "info" }, { id: "policy" }, { id: "review" }].map((t) => (
                <button
                  key={t.id}
                  onClick={() => setTab(t.id)}
                  className={py-2 }
                >
                  {tabLabels[t.id]}
                </button>
              ))}
            </div>
            <div className="mt-6 text-sm text-gray-700 leading-6 max-w-4xl mx-auto">
              {tab === "info" && (
                <div>
                  {Array.isArray(product.info) ? (
                    <ul className="list-disc pl-6 space-y-1">
                      {product.info.map((l, i) => (
                        <li key={i}>{l}</li>
                      ))}
                    </ul>
                  ) : (
                    <p>{product.desc}</p>
                  )}
                </div>
              )}
              {tab === "policy" && (
                <div>
                  {Array.isArray(product.policy) ? (
                    <div className="space-y-3">
                      {product.policy.map((sec, i) => (
                        <div key={i}>
                          {sec.title ? <div className="font-medium mb-1">{sec.title}</div> : null}
                          {sec.lines ? (
                            <ul className="list-disc pl-6 space-y-1">
                              {sec.lines.map((l, j) => <li key={j}>{l}</li>)}
                            </ul>
                          ) : null}
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p>Áp dụng theo chính sách hiện hành.</p>
                  )}
                </div>
              )}
              {tab === "review" && (
                <div className="space-y-3">
                  {Array.isArray(product.reviews) && product.reviews.length ? (
                    product.reviews.map((rv, i) => (
                      <div key={i}>
                        <div className="font-medium">{rv.name} • {rv.rating}/5</div>
                        <p className="text-gray-600">{rv.text}</p>
                      </div>
                    ))
                  ) : (
                    <p>Chưa có đánh giá.</p>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* Related */}
          {related.length ? (
            <div className="px-6 pb-8">
              <h2 className="text-xl font-semibold text-brand-dark text-center mb-4">Sản phẩm liên quan</h2>
              <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4 max-w-6xl mx-auto">
                {related.map((r) => (
                  <a key={r.id} href={"#/p/" + r.id} className="block bg-white rounded-2xl border shadow-card overflow-hidden">
                    <img src={r.img} className="w-full h-56 object-cover" />
                    <div className="p-3">
                      <div className="text-sm text-gray-700 line-clamp-2">{r.name}</div>
                      <div className="mt-1 text-brand-primary font-semibold">{r.price}</div>
                    </div>
                  </a>
                ))}
              </div>
            </div>
          ) : null}
        </div>
      </div>
      <Footer />
    </div>
  );
}



