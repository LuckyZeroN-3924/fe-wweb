// Du lieu chi tiet san pham (an toan) cho cac id 1-36
const asset = (p) => new URL(`../anhNNKB/${p}`, import.meta.url).href;
import {
  womenCollection,
  accessoriesMale,
  accessoriesFemale,
  menCollection,
  suggestionsToday,
  suggestionsBest,
  specialDeals,
} from "./mock.js";

const commonShipping = [
  { title: "Giao hang toan quoc", sub: "Thanh toan (COD) khi nhan hang" },
  { title: "Mien phi giao hang", sub: "Theo chinh sach" },
  { title: "Doi tra trong 7 ngay", sub: "Ke tu ngay mua" },
  { title: "Ho tro 24/7", sub: "Theo chinh sach" },
];

const idFromImg = (img) => {
  const m = (img || "").match(/\/(\d+)\.webp$/);
  return m ? m[1] : undefined;
};

const merged = [
  ...(womenCollection || []),
  ...(accessoriesMale || []),
  ...(accessoriesFemale || []),
  ...(menCollection || []),
  ...(suggestionsToday || []),
  ...(suggestionsBest || []),
  ...(specialDeals || []),
].filter(Boolean);

const baseMap = Object.fromEntries(
  merged.map((x) => [String(x.id ?? idFromImg(x.img) ?? ""), x]).filter(([k]) => k)
);

const pickRelated = (selfId) => {
  const keys = Object.keys(baseMap).filter((k) => k !== String(selfId));
  return keys.slice(0, 3).map((k) => {
    const it = baseMap[k] || {};
    return { id: k, name: it.name || `San pham ${k}`, price: it.price || "", img: it.img || asset(`${k}.webp`) };
  });
};

const makeDetail = (id) => {
  const k = String(id);
  const b = baseMap[k] || {};
  const name = b.name || `San pham ${k}`;
  const price = b.price || "Lien he";
  const hero = b.img || asset(`${k}.webp`);
  return {
    id: k,
    name,
    price,
    status: "Con hang",
    sku: "Dang cap nhat",
    desc: "Mo ta dang cap nhat. San pham chat lieu thoai mai, thiet ke hien dai, de phoi do.",
    hero,
    images: [],
    shipping: commonShipping,
    info: [
      "Chat lieu thoang mat, ben mau",
      "Form dang de mac, ton dang",
      "Phu hop nhieu hoan canh su dung",
    ],
    policy: [
      { title: "Doi tra", lines: ["Doi trong 7 ngay", "San pham con tem mac, chua qua giat"] },
      { title: "Van chuyen", lines: ["Giao hang toan quoc", "COD – nhan hang thanh toan"] },
    ],
    reviews: [
      { name: "Ngoc", rating: 4.8, text: "Hai long voi chat luong, dong goi can than." },
      { name: "Minh", rating: 4.6, text: "Mac vua van, mau len dep." },
    ],
    related: pickRelated(k),
  };
};

const ids = Array.from({ length: 36 }, (_, i) => String(i + 1));
const productDetails = Object.fromEntries(ids.map((id) => [id, makeDetail(id)]));

export default productDetails;
