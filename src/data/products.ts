export interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  video: string;
  category: string;
  section?: string;
}

export interface Category {
  name: string;
  products: Product[];
}

export interface FireworkProduct {
  id: number;
  name: { en: string; ms: string };
  price: number;
  image: string;
  videoUrl: string;
  category: string;
  section: string;
}

export const fireworksData: FireworkProduct[] = [
  {
    id: 27,
    name: { en: 'Classic Pop Pop', ms: 'Pop Pop Klasik' },
    price: 25,
    image: 'https://res.cloudinary.com/de8w3ykvy/image/upload/v1753199087/fireworks_400x400/fireworks_400x400/resized_framed_product_38_Pop_Pop.jpg',
    videoUrl: '',
    category: 'pop_pop',
    section: 'POP-POP'
  },
  {
    id: 28,
    name: { en: 'Jumbo Pop Pop', ms: 'Pop Pop Jumbo' },
    price: 35,
    image: 'https://res.cloudinary.com/de8w3ykvy/image/upload/v1753199087/fireworks_400x400/fireworks_400x400/resized_framed_product_38_Pop_Pop.jpg',
    videoUrl: '',
    category: 'pop_pop',
    section: 'POP-POP'
  },
  {
    id: 29,
    name: { en: 'Color Pop Pop', ms: 'Pop Pop Berwarna' },
    price: 35,
    image: 'https://res.cloudinary.com/de8w3ykvy/image/upload/v1753199087/fireworks_400x400/fireworks_400x400/resized_framed_product_38_Pop_Pop.jpg',
    videoUrl: '',
    category: 'pop_pop',
    section: 'POP-POP'
  },
  {
    id: 30,
    name: { en: 'Super Pop Pop', ms: 'Pop Pop Super' },
    price: 45,
    image: 'https://res.cloudinary.com/de8w3ykvy/image/upload/v1753199087/fireworks_400x400/fireworks_400x400/resized_framed_product_38_Pop_Pop.jpg',
    videoUrl: '',
    category: 'pop_pop',
    section: 'POP-POP'
  },
  {
    id: 31,
    name: { en: 'Pop Pop Party Pack', ms: 'Pek Parti Pop Pop' },
    price: 25,
    image: 'https://res.cloudinary.com/de8w3ykvy/image/upload/v1753198878/fireworks_400x400/fireworks_400x400/resized_framed_product_39_Pop_Pop_Besar.jpg',
    videoUrl: '',
    category: 'pop_pop',
    section: 'POP-POP'
  },
  {
    id: 97,
    name: { en: '4 138 Shot Merdeka', ms: '4 138 Shot Merdeka' },
    price: 100,
    image: 'https://res.cloudinary.com/de8w3ykvy/image/upload/v1753199058/fireworks_400x400/fireworks_400x400/resized_framed_product_91_4_138_Shoot_Cake_4_138.jpg',
    videoUrl: 'https://res.cloudinary.com/de8w3ykvy/video/upload/v1753077619/HunterBoom/cm4shk2s0000g03ju9jme3n1g_wrp2hg.mp4',
    category: 'premium',
    section: 'MERDEKA FIREWORKS'
  },
  {
    id: 901,
    name: { en: '5138 Shoot Cake ABC', ms: '5138 Shoot Cake (ABC)' },
    price: 250,
    image: 'https://res.cloudinary.com/de8w3ykvy/image/upload/v1753198938/fireworks_400x400/fireworks_400x400/resized_framed_product_0_5138_Shoot_Cake_28ABC29.jpg',
    videoUrl: 'https://res.cloudinary.com/de8w3ykvy/video/upload/v1753076871/HunterBoom/cm4l31g5200010cmq8qeahfje_gjzsmh.mp4',
    category: 'traditional',
    section: 'MERDEKA FIREWORKS'
  },
  {
    id: 902,
    name: { en: '8 Feet (BOM)', ms: '8 Feet (Bom)' },
    price: 7,
    image: 'https://res.cloudinary.com/de8w3ykvy/image/upload/v1753198958/fireworks_400x400/fireworks_400x400/resized_framed_8_Feet_BOM.jpg',
    videoUrl: '',
    category: 'traditional',
    section: 'RED DRAGON FIRECRACKERS'
  },
  {
    id: 903,
    name: { en: '8 Feet 1.0 Super Red 1.0', ms: '8 Feet 1.0 Super Red' },
    price: 13,
    image: 'https://res.cloudinary.com/de8w3ykvy/image/upload/v1753199029/fireworks_400x400/fireworks_400x400/resized_framed_product_2_8_Feet_1.jpg',
    videoUrl: 'https://res.cloudinary.com/de8w3ykvy/video/upload/v1753076882/HunterBoom/cm3fcqwsm00080dkxfqkt9q7h_jhwrtd.mp4',
    category: 'traditional',
    section: 'RED DRAGON FIRECRACKERS'
  },
  {
    id: 904,
    name: { en: '8 Feet 1.0 Super Rose 1.0', ms: '8 Feet 1.0 Super Rose' },
    price: 13,
    image: 'https://res.cloudinary.com/de8w3ykvy/image/upload/v1753199085/fireworks_400x400/fireworks_400x400/resized_framed_product_3_8_Feet_1.jpg',
    videoUrl: '',
    category: 'traditional',
    section: 'RED DRAGON FIRECRACKERS'
  },
  {
    id: 905,
    name: { en: '8 Feet 1.0 Super Gold 1.0', ms: '8 Feet 1.0 Super Gold' },
    price: 13,
    image: 'https://res.cloudinary.com/de8w3ykvy/image/upload/v1753199075/fireworks_400x400/fireworks_400x400/resized_framed_product_4_8_Feet_1.jpg',
    videoUrl: '',
    category: 'traditional',
    section: 'RED DRAGON FIRECRACKERS'
  },
  {
    id: 906,
    name: { en: '12 Feet 1.2 Super Gold (1.2)', ms: '12 Feet 1.2 Super Gold' },
    price: 25,
    image: 'https://res.cloudinary.com/de8w3ykvy/image/upload/v1753199003/fireworks_400x400/fireworks_400x400/resized_framed_product_5_12_Feet_1.jpg',
    videoUrl: '',
    category: 'traditional',
    section: 'RED DRAGON FIRECRACKERS'
  },
  {
    id: 907,
    name: { en: '18 Feet 1.2 Super Red 18 (1.2)', ms: '18 Feet 1.2 Super Red' },
    price: 35,
    image: 'https://res.cloudinary.com/de8w3ykvy/image/upload/v1753199060/fireworks_400x400/fireworks_400x400/resized_framed_product_6_18_Feet_1.jpg',
    videoUrl: '',
    category: 'traditional',
    section: 'RED DRAGON FIRECRACKERS'
  },
  {
    id: 908,
    name: { en: '18 Feet 1.2 Super Rose 18 (1.2)', ms: '18 Feet 1.2 Super Rose' },
    price: 35,
    image: 'https://res.cloudinary.com/de8w3ykvy/image/upload/v1753198978/fireworks_400x400/fireworks_400x400/resized_framed_product_7_18_Feet_1.jpg',
    videoUrl: '',
    category: 'traditional',
    section: 'RED DRAGON FIRECRACKERS'
  },
  {
    id: 909,
    name: { en: '18 Feet 1.2 Super Gold 18 (1.2)', ms: '18 Feet 1.2 Super Gold' },
    price: 35,
    image: 'https://res.cloudinary.com/de8w3ykvy/image/upload/v1753199089/fireworks_400x400/fireworks_400x400/resized_framed_product_8_18_Feet_1.jpg',
    videoUrl: '',
    category: 'traditional',
    section: 'RED DRAGON FIRECRACKERS'
  },
  {
    id: 910,
    name: { en: '28 Feet Super Gold Gift Box 28', ms: '28 Feet Super Gold (Gift Box)' },
    price: 45,
    image: 'https://res.cloudinary.com/de8w3ykvy/image/upload/v1753198919/fireworks_400x400/fireworks_400x400/resized_framed_product_9_28_Feet_Super_Gold_Gift_Box_28.jpg',
    videoUrl: 'https://res.cloudinary.com/de8w3ykvy/video/upload/v1753076893/HunterBoom/cm3fcklnr00020cmk4ox5hesv_c4wd5e.mp4',
    category: 'traditional',
    section: 'RED DRAGON FIRECRACKERS'
  },
  {
    id: 911,
    name: { en: '38 Feet Red', ms: '38 Feet Super Red' },
    price: 55,
    image: 'https://res.cloudinary.com/de8w3ykvy/image/upload/v1753198946/fireworks_400x400/fireworks_400x400/resized_framed_product_10_B_006_R_38_Feet_Super_Red_38.jpg',
    videoUrl: '',
    category: 'traditional',
    section: 'RED DRAGON FIRECRACKERS'
  },
  {
    id: 912,
    name: { en: '38 Feet Rose', ms: '38 Feet Rose' },
    price: 55,
    image: 'https://res.cloudinary.com/de8w3ykvy/image/upload/v1753199118/fireworks_400x400/fireworks_400x400/resized_framed_product_11_B_006_P_38_Feet_Rose_38.jpg',
    videoUrl: '',
    category: 'traditional',
    section: 'RED DRAGON FIRECRACKERS'
  },
  {
    id: 913,
    name: { en: '38 Feet Gold', ms: '38 Feet Gold' },
    price: 55,
    image: 'https://res.cloudinary.com/de8w3ykvy/image/upload/v1753198924/fireworks_400x400/fireworks_400x400/resized_framed_product_12_B_006_G_38_Feet_Gold_38.jpg',
    videoUrl: '',
    category: 'traditional',
    section: 'RED DRAGON FIRECRACKERS'
  },
  {
    id: 914,
    name: { en: '66 Feet Mix Super Red Rose', ms: '66 Feet Mix (Super Red Rose)' },
    price: 100,
    image: 'https://res.cloudinary.com/de8w3ykvy/image/upload/v1753199045/fireworks_400x400/fireworks_400x400/resized_framed_product_17_88_Feet_Mix_Super_Red_Rose_88.jpg',
    videoUrl: '',
    category: 'traditional',
    section: 'RED DRAGON FIRECRACKERS'
  },
  {
    id: 915,
    name: { en: '88 Feet Red', ms: '88 Feet Super Red' },
    price: 220,
    image: 'https://res.cloudinary.com/de8w3ykvy/image/upload/v1753199024/fireworks_400x400/fireworks_400x400/resized_framed_product_14_88_Feet_Super_Red_88.jpg',
    videoUrl: '',
    category: 'traditional',
    section: 'RED DRAGON FIRECRACKERS'
  },
  {
    id: 916,
    name: { en: '88 Feet Rose', ms: '88 Feet Super Rose' },
    price: 220,
    image: 'https://res.cloudinary.com/de8w3ykvy/image/upload/v1753198880/fireworks_400x400/fireworks_400x400/resized_framed_product_15_88_Feet_Super_Rose_88.jpg',
    videoUrl: '',
    category: 'traditional',
    section: 'RED DRAGON FIRECRACKERS'
  },
  {
    id: 917,
    name: { en: '88 Feet Gold', ms: '88 Feet Super Gold' },
    price: 220,
    image: 'https://res.cloudinary.com/de8w3ykvy/image/upload/v1753199077/fireworks_400x400/fireworks_400x400/resized_framed_product_16_88_Feet_Super_Gold_88.jpg',
    videoUrl: '',
    category: 'traditional',
    section: 'RED DRAGON FIRECRACKERS'
  },
  {
    id: 918,
    name: { en: '88 Feet Mix Super Red Rose', ms: '88 Feet Mix (Super Red Rose)' },
    price: 250,
    image: 'https://res.cloudinary.com/de8w3ykvy/image/upload/v1753199045/fireworks_400x400/fireworks_400x400/resized_framed_product_17_88_Feet_Mix_Super_Red_Rose_88.jpg',
    videoUrl: 'https://res.cloudinary.com/de8w3ykvy/video/upload/v1753076903/HunterBoom/cm3fek40900040dmk0yynbalc_ynqvah.mp4',
    category: 'traditional',
    section: 'RED DRAGON FIRECRACKERS'
  },
  {
    id: 919,
    name: { en: 'Sunset Kayu Tiga Warna', ms: 'Sunset Kayu Tiga Warna' },
    price: 15,
    image: 'https://res.cloudinary.com/de8w3ykvy/image/upload/v1753199081/fireworks_400x400/fireworks_400x400/resized_framed_product_18_Sunset_Kayu_Tiga_Warna.jpg',
    videoUrl: 'https://res.cloudinary.com/de8w3ykvy/video/upload/v1753076913/HunterBoom/cm3flps0e000a0clb8e5pay1e_rzzlcl.mp4',
    category: 'traditional',
    section: 'SPARKLE & SHINE - KIDS\" FAVORITE FIREWORKS!'
  },
  {
    id: 920,
    name: { en: 'Sunset Besar', ms: 'Sunset Besar' },
    price: 25,
    image: 'https://res.cloudinary.com/de8w3ykvy/image/upload/v1753199091/fireworks_400x400/fireworks_400x400/resized_framed_product_19_Sunset_Besar.jpg',
    videoUrl: 'https://res.cloudinary.com/de8w3ykvy/video/upload/v1753076923/HunterBoom/cm3flt42v00020cjwe6jg8qf6_jccz6a.mp4',
    category: 'traditional',
    section: 'SPARKLE & SHINE - KIDS\" FAVORITE FIREWORKS!'
  },
  {
    id: 921,
    name: { en: 'Asap Color', ms: 'Asap Color' },
    price: 8,
    image: 'https://res.cloudinary.com/de8w3ykvy/image/upload/v1753198962/fireworks_400x400/fireworks_400x400/resized_framed_product_20_Asap_Color.jpg',
    videoUrl: 'https://res.cloudinary.com/de8w3ykvy/video/upload/v1753076934/HunterBoom/cm3flwhbe000a0ckw4pm768ja_rewkth.mp4',
    category: 'traditional',
    section: 'SPARKLE & SHINE - KIDS\" FAVORITE FIREWORKS!'
  },
  {
    id: 922,
    name: { en: 'Asap', ms: 'Asap' },
    price: 8,
    image: 'https://res.cloudinary.com/de8w3ykvy/image/upload/v1753198948/fireworks_400x400/fireworks_400x400/resized_framed_product_21_Asap.jpg',
    videoUrl: 'https://res.cloudinary.com/de8w3ykvy/video/upload/v1753076946/HunterBoom/cm3fm4uk200070cl9aimr6np8_pu9rlo.mp4',
    category: 'traditional',
    section: 'SPARKLE & SHINE - KIDS\" FAVORITE FIREWORKS!'
  },
  {
    id: 923,
    name: { en: 'Sunset 4 Color', ms: 'Sunset 4 Color' },
    price: 40,
    image: 'https://res.cloudinary.com/de8w3ykvy/image/upload/v1753198930/fireworks_400x400/fireworks_400x400/resized_framed_product_22_Sunset_4_Color.jpg',
    videoUrl: 'https://res.cloudinary.com/de8w3ykvy/video/upload/v1753076956/HunterBoom/cm3fm751x00030cjv1jticujs_hcsqvb.mp4',
    category: 'traditional',
    section: 'SPARKLE & SHINE - KIDS\" FAVORITE FIREWORKS!'
  },
  {
    id: 924,
    name: { en: 'C018 7 Inch Besi 7', ms: 'C018 7 Inch Besi 7' },
    price: 35,
    image: 'https://res.cloudinary.com/de8w3ykvy/image/upload/v1753198893/fireworks_400x400/fireworks_400x400/resized_framed_product_23_C_018_7_Inch_Besi_7.jpg',
    videoUrl: '',
    category: 'traditional',
    section: 'SPARKLE & SHINE - KIDS\" FAVORITE FIREWORKS!'
  },
  {
    id: 925,
    name: { en: '14 Inch Besi 14', ms: '14 Inch Besi 14' },
    price: 70,
    image: 'https://res.cloudinary.com/de8w3ykvy/image/upload/v1753198993/fireworks_400x400/fireworks_400x400/resized_framed_product_24_14_Inch_Besi_14.jpg',
    videoUrl: 'https://res.cloudinary.com/de8w3ykvy/video/upload/v1753076966/HunterBoom/cm3fmggy000050cl2g5esh2a4_fzrrwr.mp4',
    category: 'traditional',
    section: 'SPARKLE & SHINE - KIDS\" FAVORITE FIREWORKS!'
  },
  {
    id: 926,
    name: { en: '18 Inch Besi 18', ms: '18 Inch Besi 18' },
    price: 90,
    image: 'https://res.cloudinary.com/de8w3ykvy/image/upload/v1753198967/fireworks_400x400/fireworks_400x400/resized_framed_product_25_18_Inch_Besi_18.jpg',
    videoUrl: 'https://res.cloudinary.com/de8w3ykvy/video/upload/v1753076978/HunterBoom/cm3fmin2800060cl27xtic2ae_rhxy2g.mp4',
    category: 'traditional',
    section: 'SPARKLE & SHINE - KIDS\" FAVORITE FIREWORKS!'
  },
  {
    id: 927,
    name: { en: 'Magic Stick (1 Minute)', ms: 'Magic Stick (1 Minute)' },
    price: 10,
    image: 'https://res.cloudinary.com/de8w3ykvy/image/upload/v1753199007/fireworks_400x400/fireworks_400x400/resized_framed_Magic_Stick_1_Minute.jpg',
    videoUrl: 'https://res.cloudinary.com/de8w3ykvy/video/upload/v1753076989/HunterBoom/cm3fnyuab00000ckyfbrt8wvf_cvsdwm.mp4',
    category: 'traditional',
    section: 'SPARKLE & SHINE - KIDS\" FAVORITE FIREWORKS!'
  },
  {
    id: 928,
    name: { en: '15 Kali Magic 15', ms: '15 Kali Magic 15' },
    price: 15,
    image: 'https://res.cloudinary.com/de8w3ykvy/image/upload/v1753198975/fireworks_400x400/fireworks_400x400/resized_framed_product_27_15_Kali_Magic_15.jpg',
    videoUrl: 'https://res.cloudinary.com/de8w3ykvy/video/upload/v1753076999/HunterBoom/cm3fo80ko00000cjhdgg929tm_nqqsui.mp4',
    category: 'traditional',
    section: 'SPARKLE & SHINE - KIDS\" FAVORITE FIREWORKS!'
  },
  {
    id: 929,
    name: { en: '20 Kali Magic 20', ms: '20 Kali Magic 20' },
    price: 20,
    image: 'https://res.cloudinary.com/de8w3ykvy/image/upload/v1753199043/fireworks_400x400/fireworks_400x400/resized_framed_product_28_20_Kali_Magic_20.jpg',
    videoUrl: 'https://res.cloudinary.com/de8w3ykvy/video/upload/v1753077010/HunterBoom/cm3foao1000010cl2dwks4ja7_ndcb6a.mp4',
    category: 'traditional',
    section: 'SPARKLE & SHINE - KIDS\" FAVORITE FIREWORKS!'
  },
  {
    id: 930,
    name: { en: '30 Kali Magic 30', ms: '30 Kali Magic 30' },
    price: 30,
    image: 'https://res.cloudinary.com/de8w3ykvy/image/upload/v1753199051/fireworks_400x400/fireworks_400x400/resized_framed_product_29_30_Kali_Magic_30.jpg',
    videoUrl: 'https://res.cloudinary.com/de8w3ykvy/video/upload/v1753077020/HunterBoom/cm3fobsv5000d0cmd1g4p6uer_rx8d89.mp4',
    category: 'traditional',
    section: 'SPARKLE & SHINE - KIDS\" FAVORITE FIREWORKS!'
  },
  {
    id: 931,
    name: { en: '10 Kali Pili Rain 10', ms: '10 Kali Pili Rain 10' },
    price: 20,
    image: 'https://res.cloudinary.com/de8w3ykvy/image/upload/v1753198952/fireworks_400x400/fireworks_400x400/resized_framed_product_30_10_Kali_Pili_Rain_10.jpg',
    videoUrl: 'https://res.cloudinary.com/de8w3ykvy/video/upload/v1753077031/HunterBoom/cm3foin1h000j0cmddfdtaa4z_dlvbtx.mp4',
    category: 'traditional',
    section: 'KIDS\" FIRECRACKERS'
  },
  {
    id: 932,
    name: { en: '388 Shot Machine Gun 388', ms: '388 Shot Machine Gun 388' },
    price: 35,
    image: 'https://res.cloudinary.com/de8w3ykvy/image/upload/v1753198882/fireworks_400x400/fireworks_400x400/resized_framed_388_Shot_Machine_Gun_388.jpg',
    videoUrl: '',
    category: 'traditional',
    section: 'KIDS\" FIRECRACKERS'
  },
  {
    id: 933,
    name: { en: '888 Shot Machine Gun', ms: '888 Shot Machine Gun' },
    price: 88,
    image: 'https://res.cloudinary.com/de8w3ykvy/image/upload/v1753198969/fireworks_400x400/fireworks_400x400/resized_framed_product_32_888_Shot_Machine_Gun_888.jpg',
    videoUrl: '',
    category: 'traditional',
    section: 'KIDS\" FIRECRACKERS'
  },
  {
    id: 934,
    name: { en: '688 Shot Machine Gun 688', ms: '688 Shot Machine Gun 688' },
    price: 68,
    image: 'https://res.cloudinary.com/de8w3ykvy/image/upload/v1753198895/fireworks_400x400/fireworks_400x400/resized_framed_688_Shot_Machine_Gun_688.jpg',
    videoUrl: '',
    category: 'traditional',
    section: 'KIDS\" FIRECRACKERS'
  },
  {
    id: 935,
    name: { en: 'Blue Ocean Machine Gun', ms: 'Blue Ocean Machine Gun' },
    price: 90,
    image: 'https://res.cloudinary.com/de8w3ykvy/image/upload/v1753199025/fireworks_400x400/fireworks_400x400/resized_framed_product_34_Blue_Ocean_Machine_Gun.jpg',
    videoUrl: 'https://res.cloudinary.com/de8w3ykvy/video/upload/v1753077041/HunterBoom/cm4nyh3v8000c0cjj37ic01jv_dhcjl2.mp4',
    category: 'traditional',
    section: 'KIDS\" FIRECRACKERS'
  },
  {
    id: 936,
    name: { en: 'Mancis', ms: 'Mancis' },
    price: 25,
    image: 'https://res.cloudinary.com/de8w3ykvy/image/upload/v1753198921/fireworks_400x400/fireworks_400x400/resized_framed_product_35_Mancis.jpg',
    videoUrl: 'https://res.cloudinary.com/de8w3ykvy/video/upload/v1753077051/HunterBoom/cm3h1c4ni00020cjq1xzo6888_mg9lzx.mp4',
    category: 'traditional',
    section: 'KIDS\" FIRECRACKERS'
  },
  {
    id: 937,
    name: { en: 'Gasing', ms: 'Gasing' },
    price: 25,
    image: 'https://res.cloudinary.com/de8w3ykvy/image/upload/v1753198999/fireworks_400x400/fireworks_400x400/resized_framed_Gasing.jpg',
    videoUrl: 'https://storage.googleapis.com/takeapp/media/cm3h504ye00000cky15mu1caf.mp4',
    category: 'traditional',
    section: 'KIDS\" FIRECRACKERS'
  },
  {
    id: 938,
    name: { en: 'Lotus', ms: 'Lotus' },
    price: 25,
    image: 'https://res.cloudinary.com/de8w3ykvy/image/upload/v1753198903/fireworks_400x400/fireworks_400x400/resized_framed_product_37_Lotus.jpg',
    videoUrl: 'https://res.cloudinary.com/de8w3ykvy/video/upload/v1753077072/HunterBoom/cm3h53ace00020cmi1mn98djd_udrjjb.mp4',
    category: 'traditional',
    section: 'KIDS\" FIRECRACKERS'
  },
  {
    id: 939,
    name: { en: 'Pop Pop', ms: 'Pop Pop' },
    price: 25,
    image: 'https://res.cloudinary.com/de8w3ykvy/image/upload/v1753199087/fireworks_400x400/fireworks_400x400/resized_framed_product_38_Pop_Pop.jpg',
    videoUrl: '',
    category: 'traditional',
    section: 'KIDS\" FIRECRACKERS'
  },
  {
    id: 940,
    name: { en: 'Pop Pop Besar', ms: 'Pop Pop Besar' },
    price: 35,
    image: 'https://res.cloudinary.com/de8w3ykvy/image/upload/v1753198878/fireworks_400x400/fireworks_400x400/resized_framed_product_39_Pop_Pop_Besar.jpg',
    videoUrl: '',
    category: 'traditional',
    section: 'KIDS\" FIRECRACKERS'
  },
  {
    id: 941,
    name: { en: 'Cili Padi', ms: 'Cili Padi' },
    price: 5,
    image: 'https://res.cloudinary.com/de8w3ykvy/image/upload/v1753198995/fireworks_400x400/fireworks_400x400/resized_framed_product_40_Cili_Padi.jpg',
    videoUrl: 'https://res.cloudinary.com/de8w3ykvy/video/upload/v1753077082/HunterBoom/cm3h5i48h00020cl21q1c1hj3_tvjbrd.mp4',
    category: 'traditional',
    section: 'KIDS\" FIRECRACKERS'
  },
  {
    id: 942,
    name: { en: 'Dragon Egg', ms: 'Dragon Egg' },
    price: 15,
    image: 'https://res.cloudinary.com/de8w3ykvy/image/upload/v1753198971/fireworks_400x400/fireworks_400x400/resized_framed_product_41_Dragon_Egg.jpg',
    videoUrl: 'https://res.cloudinary.com/de8w3ykvy/video/upload/v1753077094/HunterBoom/cm3h5l1ha00040cid2pkh5fg2_b8fvwl.mp4',
    category: 'traditional',
    section: 'KIDS\" FIRECRACKERS'
  },
  {
    id: 943,
    name: { en: 'Dragon Egg Besar', ms: 'Dragon Egg Besar' },
    price: 25,
    image: 'https://res.cloudinary.com/de8w3ykvy/image/upload/v1753199022/fireworks_400x400/fireworks_400x400/resized_framed_product_42_Dragon_Egg_Besar.jpg',
    videoUrl: 'https://res.cloudinary.com/de8w3ykvy/video/upload/v1753077105/HunterBoom/cm3h5mitf00030ci89ilr128t_spn6ne.mp4',
    category: 'traditional',
    section: 'KIDS\" FIRECRACKERS'
  },
  {
    id: 944,
    name: { en: 'Naga 3 Minute', ms: 'Naga 3 Minute' },
    price: 20,
    image: 'https://res.cloudinary.com/de8w3ykvy/image/upload/v1753199049/fireworks_400x400/fireworks_400x400/resized_framed_product_43_Naga_3_Minute.jpg',
    videoUrl: 'https://res.cloudinary.com/de8w3ykvy/video/upload/v1753077116/HunterBoom/cm3h61r5g00000cl5glngbzr5_qccqp9.mp4',
    category: 'traditional',
    section: 'KIDS\" FIRECRACKERS'
  },
  {
    id: 945,
    name: { en: 'Naga 3 Minute Besar', ms: 'Naga 3 Minute Besar' },
    price: 30,
    image: 'https://res.cloudinary.com/de8w3ykvy/image/upload/v1753198884/fireworks_400x400/fireworks_400x400/resized_framed_product_44_Naga_3_Minute_Besar.jpg',
    videoUrl: 'https://res.cloudinary.com/de8w3ykvy/video/upload/v1753077126/HunterBoom/cm3h6944d00010cl9amkl4vj5_lmvyz7.mp4',
    category: 'traditional',
    section: 'KIDS\" FIRECRACKERS'
  },
  {
    id: 946,
    name: { en: 'Mancis Pop Pop', ms: 'Mancis Pop Pop' },
    price: 40,
    image: 'https://res.cloudinary.com/de8w3ykvy/image/upload/v1753199033/fireworks_400x400/fireworks_400x400/resized_framed_product_45_Mancis_Pop_Pop.jpg',
    videoUrl: 'https://res.cloudinary.com/de8w3ykvy/video/upload/v1753077136/HunterBoom/cm4jh480a00090cl86kxk4e08_ddqqdp.mp4',
    category: 'traditional',
    section: 'KIDS\" FIRECRACKERS'
  },
  {
    id: 947,
    name: { en: 'Thunder Clap', ms: 'Thunder Clap' },
    price: 35,
    image: 'https://res.cloudinary.com/de8w3ykvy/image/upload/v1753198906/fireworks_400x400/fireworks_400x400/resized_framed_product_46_Thunder_Clap.jpg',
    videoUrl: 'https://res.cloudinary.com/de8w3ykvy/video/upload/v1753077151/HunterBoom/cm3h762d800010cmb8vpi0nz1_pcf2fz.mp4',
    category: 'traditional',
    section: 'KIDS\" FIRECRACKERS'
  },
  {
    id: 948,
    name: { en: 'Thunder Clap Besar', ms: 'Thunder Clap Besar' },
    price: 55,
    image: 'https://res.cloudinary.com/de8w3ykvy/image/upload/v1753198917/fireworks_400x400/fireworks_400x400/resized_framed_product_47_Thunder_Clap_Besar.jpg',
    videoUrl: 'https://res.cloudinary.com/de8w3ykvy/video/upload/v1753077161/HunterBoom/cm3h7a2v200010cl4bh3jbbyu_k6ikmj.mp4',
    category: 'traditional',
    section: 'KIDS\" FIRECRACKERS'
  },
  {
    id: 950,
    name: { en: 'Moon Travel', ms: 'Moon Travel' },
    price: 25,
    image: 'https://res.cloudinary.com/de8w3ykvy/image/upload/v1753199071/fireworks_400x400/fireworks_400x400/resized_framed_product_49_Moon_Travel.jpg',
    videoUrl: 'https://res.cloudinary.com/de8w3ykvy/video/upload/v1753077183/HunterBoom/cm3h84sp300070cl9h4oie88d_ezcal8.mp4',
    category: 'traditional',
    section: 'ROCKET SKY SHOW'
  },
  {
    id: 951,
    name: { en: 'Jet Flighter', ms: 'Jet Flighter' },
    price: 25,
    image: 'https://res.cloudinary.com/de8w3ykvy/image/upload/v1753199102/fireworks_400x400/fireworks_400x400/resized_framed_product_50_Jet_Flighter.jpg',
    videoUrl: 'https://res.cloudinary.com/de8w3ykvy/video/upload/v1753077193/HunterBoom/cm3h899ws00010cjs8ewv7uer_us6uda.mp4',
    category: 'traditional',
    section: 'ROCKET SKY SHOW'
  },
  {
    id: 952,
    name: { en: 'Big Butterfly', ms: 'Big Butterfly' },
    price: 35,
    image: 'https://res.cloudinary.com/de8w3ykvy/image/upload/v1753199041/fireworks_400x400/fireworks_400x400/resized_framed_product_51_Big_Butterfly.jpg',
    videoUrl: 'https://res.cloudinary.com/de8w3ykvy/video/upload/v1753077203/HunterBoom/cm3h8b4p200060cl6ccz27jkc_jdfrqz.mp4',
    category: 'traditional',
    section: 'ROCKET SKY SHOW'
  },
  {
    id: 953,
    name: { en: '50 Shot Tikus 50', ms: '50 Shot Tikus 50' },
    price: 25,
    image: 'https://res.cloudinary.com/de8w3ykvy/image/upload/v1753199017/fireworks_400x400/fireworks_400x400/resized_framed_product_52_50_Shot_Tikus_50.jpg',
    videoUrl: 'https://res.cloudinary.com/de8w3ykvy/video/upload/v1753077213/HunterBoom/cm3h8dbwc00050cl4ez6v0k0n_kzjh8b.mp4',
    category: 'traditional',
    section: 'KIDS\" FIRECRACKERS'
  },
  {
    id: 954,
    name: { en: '100 Shot Tikus 100', ms: '100 Shot Tikus 100' },
    price: 35,
    image: 'https://res.cloudinary.com/de8w3ykvy/image/upload/v1753198912/fireworks_400x400/fireworks_400x400/resized_framed_product_53_100_Shot_Tikus_100.jpg',
    videoUrl: 'https://res.cloudinary.com/de8w3ykvy/video/upload/v1753077224/HunterBoom/cm3h8efm200070cjrbdj7aygl_jpm9tn.mp4',
    category: 'traditional',
    section: 'KIDS\" FIRECRACKERS'
  },
  {
    id: 955,
    name: { en: '100 Shoot Flying Dragon 100', ms: '100 Shoot Flying Dragon 100' },
    price: 25,
    image: 'https://res.cloudinary.com/de8w3ykvy/image/upload/v1753199035/fireworks_400x400/fireworks_400x400/resized_framed_product_54_100_Shoot_Flying_Dragon_100.jpg',
    videoUrl: 'https://res.cloudinary.com/de8w3ykvy/video/upload/v1753077235/HunterBoom/cm3h8pi2e000a0cl95egh7b6x_u4cwcs.mp4',
    category: 'traditional',
    section: 'MERDEKA FIREWORKS'
  },
  {
    id: 956,
    name: { en: 'Jelly Fish LINK', ms: 'Jelly Fish (LINK)' },
    price: 20,
    image: 'https://res.cloudinary.com/de8w3ykvy/image/upload/v1753198886/fireworks_400x400/fireworks_400x400/resized_framed_product_55_Jelly_Fish_28LINK29.jpg',
    videoUrl: 'https://res.cloudinary.com/de8w3ykvy/video/upload/v1753077247/HunterBoom/cm3h9lci500050cl00a4f0lo5_c88xv6.mp4',
    category: 'traditional',
    section: 'KIDS\" FIRECRACKERS'
  },
  {
    id: 957,
    name: { en: 'Jelly Fish SINGLE', ms: 'Jelly Fish (SINGLE)' },
    price: 20,
    image: 'https://res.cloudinary.com/de8w3ykvy/image/upload/v1753198997/fireworks_400x400/fireworks_400x400/resized_framed_product_56_Jelly_Fish_28SINGLE29.jpg',
    videoUrl: 'https://res.cloudinary.com/de8w3ykvy/video/upload/v1753077256/HunterBoom/cm3h9h3d100000cl86cku7v81_kiqkl0.mp4',
    category: 'traditional',
    section: 'KIDS\" FIRECRACKERS'
  },
  {
    id: 958,
    name: { en: 'Romantic Fountain Fountain V Fireworks', ms: 'Romantic Fountain (Fountain V Fireworks)' },
    price: 40,
    image: 'https://res.cloudinary.com/de8w3ykvy/image/upload/v1753198910/fireworks_400x400/fireworks_400x400/resized_framed_product_57_Romantic_Fountain_Fountain_V_.jpg',
    videoUrl: 'https://res.cloudinary.com/de8w3ykvy/video/upload/v1753077268/HunterBoom/cm3r0ujr500030cmjew7xet44_hzxgmd.mp4',
    category: 'traditional',
    section: 'FOUNTAIN BLAST'
  },
  {
    id: 959,
    name: { en: 'Volcano Fireworks Fountain V Fireworks', ms: 'Volcano Fireworks (Fountain V Fireworks)' },
    price: 50,
    image: 'https://res.cloudinary.com/de8w3ykvy/image/upload/v1753199115/fireworks_400x400/fireworks_400x400/resized_framed_product_58_Volcano_Fireworks_Fountain_V_.jpg',
    videoUrl: 'https://res.cloudinary.com/de8w3ykvy/video/upload/v1753077279/HunterBoom/cm3r1vdh100080cl82g9w37lb_elesoe.mp4',
    category: 'traditional',
    section: 'FOUNTAIN BLAST'
  },
  {
    id: 960,
    name: { en: 'Super Flash Rocket', ms: 'Super Flash Rocket' },
    price: 75,
    image: 'https://res.cloudinary.com/de8w3ykvy/image/upload/v1753198989/fireworks_400x400/fireworks_400x400/resized_framed_Super_Flash_Rocket.jpg',
    videoUrl: 'https://res.cloudinary.com/de8w3ykvy/video/upload/v1753077290/HunterBoom/cm5c2q9uj000803l7h1nt59uk_dvl6n9.mp4',
    category: 'traditional',
    section: 'ROCKET SKY SHOW'
  },
  {
    id: 961,
    name: { en: 'Explosive Gold Rocket', ms: 'Explosive Gold Rocket' },
    price: 75,
    image: 'https://res.cloudinary.com/de8w3ykvy/image/upload/v1753199037/fireworks_400x400/fireworks_400x400/resized_framed_product_60_Explosive_Gold_Rocket.jpg',
    videoUrl: 'https://res.cloudinary.com/de8w3ykvy/video/upload/v1753077299/HunterBoom/cm5xf09kq000f03l8g60yfqdf_t9camd.mp4',
    category: 'traditional',
    section: 'ROCKET SKY SHOW'
  },
  {
    id: 962,
    name: { en: 'Smoke 5 Color', ms: 'Smoke 5 Color' },
    price: 25,
    image: 'https://res.cloudinary.com/de8w3ykvy/image/upload/v1753198992/fireworks_400x400/fireworks_400x400/resized_framed_product_61_Smoke_5_Color.jpg',
    videoUrl: 'https://res.cloudinary.com/de8w3ykvy/video/upload/v1753077311/HunterBoom/cm3fou62o00030cl1fjz21a29_e6fbfx.mp4',
    category: 'traditional',
    section: 'FOUNTAIN BLAST'
  },
  {
    id: 963,
    name: { en: 'Pokok Berlesen Fa Cai Shu', ms: 'Pokok Berlesen (Fa Cai Shu)' },
    price: 20,
    image: 'https://res.cloudinary.com/de8w3ykvy/image/upload/v1753198963/fireworks_400x400/fireworks_400x400/resized_framed_product_62_Pokok_Berlesen_Fa_Cai_Shu.jpg',
    videoUrl: 'https://res.cloudinary.com/de8w3ykvy/video/upload/v1753077321/HunterBoom/cm3fpqma9000f0cl22cvnguto_fskowx.mp4',
    category: 'traditional',
    section: 'FOUNTAIN BLAST'
  },
  {
    id: 964,
    name: { en: 'Pokok Berlesen Besar Big Fa Cai Shu', ms: 'Pokok Berlesen Besar (Big Fa Cai Shu)' },
    price: 35,
    image: 'https://res.cloudinary.com/de8w3ykvy/image/upload/v1753199009/fireworks_400x400/fireworks_400x400/resized_framed_product_63_Pokok_Berlesen_Besar_Big_Fa_Cai_S.jpg',
    videoUrl: 'https://res.cloudinary.com/de8w3ykvy/video/upload/v1753077333/HunterBoom/cm5cjtbon000403k12i40hb2m_tzhznb.mp4',
    category: 'traditional',
    section: 'FOUNTAIN BLAST'
  },
  {
    id: 965,
    name: { en: 'Mini Ice Cream', ms: 'Mini Ice Cream' },
    price: 25,
    image: 'https://res.cloudinary.com/de8w3ykvy/image/upload/v1753199099/fireworks_400x400/fireworks_400x400/resized_framed_product_64_Mini_Ice_Cream.jpg',
    videoUrl: 'https://res.cloudinary.com/de8w3ykvy/video/upload/v1753077342/HunterBoom/cm3fq24zv00060cig5djn3muq_arpgns.mp4',
    category: 'traditional',
    section: 'FOUNTAIN BLAST'
  },
  {
    id: 966,
    name: { en: 'C026 7 Ice Cream 7', ms: 'C026 7 Ice Cream 7' },
    price: 35,
    image: 'https://res.cloudinary.com/de8w3ykvy/image/upload/v1753198987/fireworks_400x400/fireworks_400x400/resized_framed_product_65_C_026_7_Ice_Cream_7.jpg',
    videoUrl: '',
    category: 'traditional',
    section: 'FOUNTAIN BLAST'
  },
  {
    id: 967,
    name: { en: '15 Ice Cream 15', ms: '15 Ice Cream 15' },
    price: 70,
    image: 'https://res.cloudinary.com/de8w3ykvy/image/upload/v1753198932/fireworks_400x400/fireworks_400x400/resized_framed_product_66_15_Ice_Cream_15.jpg',
    videoUrl: 'https://res.cloudinary.com/de8w3ykvy/video/upload/v1753077354/HunterBoom/cm3fqtqw800010cl16gec78r2_bbrxru.mp4',
    category: 'traditional',
    section: 'FOUNTAIN BLAST'
  },
  {
    id: 968,
    name: { en: 'Peacock TIGA', ms: 'Peacock (TIGA)' },
    price: 30,
    image: 'https://res.cloudinary.com/de8w3ykvy/image/upload/v1753199111/fireworks_400x400/fireworks_400x400/resized_framed_product_67_Peacock_28TIGA29.jpg',
    videoUrl: 'https://res.cloudinary.com/de8w3ykvy/video/upload/v1753077363/HunterBoom/cm3fqzobs00000cmh9wgh0cmd_ailyot.mp4',
    category: 'traditional',
    section: 'FOUNTAIN BLAST'
  },
  {
    id: 969,
    name: { en: 'Peacock LIMA', ms: 'Peacock (LIMA)' },
    price: 40,
    image: 'https://res.cloudinary.com/de8w3ykvy/image/upload/v1753198934/fireworks_400x400/fireworks_400x400/resized_framed_product_68_Peacock_28LIMA29.jpg',
    videoUrl: 'https://res.cloudinary.com/de8w3ykvy/video/upload/v1753077373/HunterBoom/cm3fr2ch100000cl7bcm5d512_gdhcvp.mp4',
    category: 'traditional',
    section: 'FOUNTAIN BLAST'
  },
  {
    id: 970,
    name: { en: 'Tiga Segi Fountain', ms: 'Tiga Segi Fountain' },
    price: 30,
    image: 'https://res.cloudinary.com/de8w3ykvy/image/upload/v1753199106/fireworks_400x400/fireworks_400x400/resized_framed_product_69_Tiga_Segi_Fountain.jpg',
    videoUrl: 'https://res.cloudinary.com/de8w3ykvy/video/upload/v1753077385/HunterBoom/cm3fsdlf900000cjt8l45gux4_qehixs.mp4',
    category: 'traditional',
    section: 'FOUNTAIN BLAST'
  },
  {
    id: 971,
    name: { en: 'Tiga Segi Fountain Besar', ms: 'Tiga Segi Fountain Besar' },
    price: 45,
    image: 'https://res.cloudinary.com/de8w3ykvy/image/upload/v1753198956/fireworks_400x400/fireworks_400x400/resized_framed_product_70_Tiga_Segi_Fountain_Besar.jpg',
    videoUrl: 'https://res.cloudinary.com/de8w3ykvy/video/upload/v1753077394/HunterBoom/cm4jiqbre00020cmaculigfcc_tir4jp.mp4',
    category: 'traditional',
    section: 'FOUNTAIN BLAST'
  },
  {
    id: 972,
    name: { en: '12 Patten 160 Saat Fountain', ms: '12 Patten 160 Saat Fountain' },
    price: 60,
    image: 'https://res.cloudinary.com/de8w3ykvy/image/upload/v1753199083/fireworks_400x400/fireworks_400x400/resized_framed_12_Patten_160_Saat_Fountain.jpg',
    videoUrl: 'https://res.cloudinary.com/de8w3ykvy/video/upload/v1753077404/HunterBoom/cm3fsxxwv00030clc0z503ddc_uokg9s.mp4',
    category: 'traditional',
    section: 'FOUNTAIN BLAST'
  },
  {
    id: 973,
    name: { en: 'Colorful Fountain Box (210 Saat)', ms: 'Colorful Fountain Box (210 Saat)' },
    price: 70,
    image: 'https://res.cloudinary.com/de8w3ykvy/image/upload/v1753198891/fireworks_400x400/fireworks_400x400/resized_framed_product_72_Colorful_Fountain_Box_210_Saa.jpg',
    videoUrl: 'https://res.cloudinary.com/de8w3ykvy/video/upload/v1753077415/HunterBoom/cm3mn2l4b00050cled2iye3sr_wjtw7z.mp4',
    category: 'traditional',
    section: 'FOUNTAIN BLAST'
  },
  {
    id: 974,
    name: { en: 'Gasing Fountain', ms: 'Gasing Fountain' },
    price: 50,
    image: 'https://res.cloudinary.com/de8w3ykvy/image/upload/v1753199097/fireworks_400x400/fireworks_400x400/resized_framed_product_73_Gasing_Fountain.jpg',
    videoUrl: 'https://res.cloudinary.com/de8w3ykvy/video/upload/v1753077426/HunterBoom/cm3ftn73h00000cjnfviaf7ku_a8gi9n.mp4',
    category: 'traditional',
    section: 'FOUNTAIN BLAST'
  },
  {
    id: 975,
    name: { en: 'Surprise Fountain', ms: 'Surprise Fountain' },
    price: 70,
    image: 'https://res.cloudinary.com/de8w3ykvy/image/upload/v1753199020/fireworks_400x400/fireworks_400x400/resized_framed_product_74_Surprise_Fountain.jpg',
    videoUrl: 'https://res.cloudinary.com/de8w3ykvy/video/upload/v1753077435/HunterBoom/cm3m79p9j000r0cmh5jfe2vzm_o76vzf.mp4',
    category: 'traditional',
    section: 'FOUNTAIN BLAST'
  },
  {
    id: 976,
    name: { en: 'Happy Go Lucky', ms: 'Happy Go Lucky' },
    price: 70,
    image: 'https://res.cloudinary.com/de8w3ykvy/image/upload/v1753198899/fireworks_400x400/fireworks_400x400/resized_framed_product_75_Happy_Go_Lucky.jpg',
    videoUrl: 'https://res.cloudinary.com/de8w3ykvy/video/upload/v1753077446/HunterBoom/cm4jiap5w00020cl79c888fe1_fpw885.mp4',
    category: 'traditional',
    section: 'FOUNTAIN BLAST'
  },
  {
    id: 977,
    name: { en: 'Golden Harmony', ms: 'Golden Harmony' },
    price: 70,
    image: 'https://res.cloudinary.com/de8w3ykvy/image/upload/v1753198928/fireworks_400x400/fireworks_400x400/resized_framed_product_76_Golden_Harmony.jpg',
    videoUrl: 'https://res.cloudinary.com/de8w3ykvy/video/upload/v1753077458/HunterBoom/cm5ci9aze000103jtdwub6akf_ybrcs8.mp4',
    category: 'traditional',
    section: 'FOUNTAIN BLAST'
  },
  {
    id: 978,
    name: { en: 'Taycan Sparkle', ms: 'Taycan Sparkle' },
    price: 70,
    image: 'https://res.cloudinary.com/de8w3ykvy/image/upload/v1753198960/fireworks_400x400/fireworks_400x400/resized_framed_product_77_Taycan_Sparkle.jpg',
    videoUrl: 'https://res.cloudinary.com/de8w3ykvy/video/upload/v1753077471/HunterBoom/cm3r0q9o500010cm7f1pu2au0_hnpfw9.mp4',
    category: 'traditional',
    section: 'FOUNTAIN BLAST'
  },
  {
    id: 979,
    name: { en: 'Water Fall Sunset', ms: 'Water Fall Sunset' },
    price: 50,
    image: 'https://res.cloudinary.com/de8w3ykvy/image/upload/v1753199062/fireworks_400x400/fireworks_400x400/resized_framed_product_78_Water_Fall_Sunset.jpg',
    videoUrl: 'https://res.cloudinary.com/de8w3ykvy/video/upload/v1753077482/HunterBoom/cm4jgwftl00020ckwe3z558ku_rw2wk2.mp4',
    category: 'traditional',
    section: 'SPARKLE & SHINE - KIDS\" FAVORITE FIREWORKS!'
  },
  {
    id: 980,
    name: { en: 'Dragon Wand', ms: 'Dragon Wand' },
    price: 20,
    image: 'https://res.cloudinary.com/de8w3ykvy/image/upload/v1753199093/fireworks_400x400/fireworks_400x400/resized_framed_product_79_Dragon_Wand.jpg',
    videoUrl: 'https://res.cloudinary.com/de8w3ykvy/video/upload/v1753077493/HunterBoom/cm4jgxxi000090ckxc1j497wx_w51ocw.mp4',
    category: 'traditional',
    section: 'FOUNTAIN BLAST'
  },
  {
    id: 981,
    name: { en: 'Kipas Fountain', ms: 'Kipas Fountain' },
    price: 60,
    image: 'https://res.cloudinary.com/de8w3ykvy/image/upload/v1753199001/fireworks_400x400/fireworks_400x400/resized_framed_product_80_Kipas_Fountain.jpg',
    videoUrl: 'https://res.cloudinary.com/de8w3ykvy/video/upload/v1753077503/HunterBoom/cm4jfx1d600000cl7487jh9o3_yozqmj.mp4',
    category: 'traditional',
    section: 'FOUNTAIN BLAST'
  },
  {
    id: 982,
    name: { en: 'Magic Fountain', ms: 'Magic Fountain' },
    price: 60,
    image: 'https://res.cloudinary.com/de8w3ykvy/image/upload/v1753198980/fireworks_400x400/fireworks_400x400/resized_framed_product_81_Magic_Fountain.jpg',
    videoUrl: 'https://res.cloudinary.com/de8w3ykvy/video/upload/v1753077515/HunterBoom/cm4jgx1ub00020cmkeq874t8v_rpmvpp.mp4',
    category: 'traditional',
    section: 'SPARKLE & SHINE - KIDS\" FAVORITE FIREWORKS!'
  },
  {
    id: 983,
    name: { en: 'Thunder King', ms: 'Thunder King' },
    price: 15,
    image: 'https://res.cloudinary.com/de8w3ykvy/image/upload/v1753198973/fireworks_400x400/fireworks_400x400/resized_framed_product_82_Thunder_King.jpg',
    videoUrl: 'https://res.cloudinary.com/de8w3ykvy/video/upload/v1753077526/HunterBoom/cm3h9pkw600010claepry79lh_vunny5.mp4',
    category: 'traditional',
    section: 'ONE SHOT, BIG BLAST!'
  },
  {
    id: 984,
    name: { en: 'Banana Kecil (0.8)', ms: 'Banana Kecil' },
    price: 25,
    image: 'https://res.cloudinary.com/de8w3ykvy/image/upload/v1753198901/fireworks_400x400/fireworks_400x400/resized_framed_product_83_Banana_Kecil_280.jpg',
    videoUrl: 'https://res.cloudinary.com/de8w3ykvy/video/upload/v1753077535/HunterBoom/cm3hci5r800020cjvenpn6bgx_ldzcog.mp4',
    category: 'traditional',
    section: 'ONE SHOT, BIG BLAST!'
  },
  {
    id: 985,
    name: { en: 'Banana Besar (1.2) (1.2)', ms: 'Banana Besar (1.2)' },
    price: 45,
    image: 'https://res.cloudinary.com/de8w3ykvy/image/upload/v1753199063/fireworks_400x400/fireworks_400x400/resized_framed_product_84_Banana_Besar_281.jpg',
    videoUrl: 'https://res.cloudinary.com/de8w3ykvy/video/upload/v1753077545/HunterBoom/cm3hcly4100000clee9ix79ap_noe5jk.mp4',
    category: 'traditional',
    section: 'ONE SHOT, BIG BLAST!'
  },
  {
    id: 986,
    name: { en: 'Double Shoot Banana Besar (1.75) 1.75', ms: 'Double Shoot Banana Besar (1.75)' },
    price: 75,
    image: 'https://res.cloudinary.com/de8w3ykvy/image/upload/v1753199108/fireworks_400x400/fireworks_400x400/resized_framed_product_85_Double_Shoot_Banana_Besar_281.jpg',
    videoUrl: 'https://res.cloudinary.com/de8w3ykvy/video/upload/v1753077556/HunterBoom/cm3hcptvc00030cjwacdy2wid_ize2rw.mp4',
    category: 'traditional',
    section: 'MERDEKA FIREWORKS'
  },
  {
    id: 987,
    name: { en: 'Dragon Ball (1.75) 1.75', ms: 'Dragon Ball (1.75) 1.75' },
    price: 50,
    image: 'https://res.cloudinary.com/de8w3ykvy/image/upload/v1753198914/fireworks_400x400/fireworks_400x400/resized_framed_product_86_Dragon_Ball_281.jpg',
    videoUrl: 'https://res.cloudinary.com/de8w3ykvy/video/upload/v1753077567/HunterBoom/cm3r0mzzo000h0cjpcs6sgax5_ox6hqc.mp4',
    category: 'traditional',
    section: 'ONE SHOT, BIG BLAST!'
  },
  {
    id: 988,
    name: { en: '8 Shoot Roma Candle 0.8', ms: '8 Shoot Roma Candle (0.8)' },
    price: 45,
    image: 'https://res.cloudinary.com/de8w3ykvy/image/upload/v1753199013/fireworks_400x400/fireworks_400x400/resized_framed_product_87_8_Shoot_Roma_Candle_280.jpg',
    videoUrl: 'https://res.cloudinary.com/de8w3ykvy/video/upload/v1753077577/HunterBoom/cm3hcscy400070cle9y0fc0qv_n2ni5r.mp4',
    category: 'traditional',
    section: 'MERDEKA FIREWORKS'
  },
  {
    id: 989,
    name: { en: '4 25 Shoot Cake 4', ms: '4 25 Shoot Cake 4' },
    price: 25,
    image: 'https://res.cloudinary.com/de8w3ykvy/image/upload/v1753199046/fireworks_400x400/fireworks_400x400/resized_framed_product_88_4_25_Shoot_Cake_4_25.jpg',
    videoUrl: 'https://res.cloudinary.com/de8w3ykvy/video/upload/v1753077588/HunterBoom/cm4shf52l000703mteyab9izo_tpvhu7.mp4',
    category: 'traditional',
    section: 'MERDEKA FIREWORKS'
  },
  {
    id: 990,
    name: { en: '4 36 Shoot Cake 4', ms: '4 36 Shoot Cake 4' },
    price: 36,
    image: 'https://res.cloudinary.com/de8w3ykvy/image/upload/v1753198942/fireworks_400x400/fireworks_400x400/resized_framed_product_89_4_36_Shoot_Cake_4_36.jpg',
    videoUrl: 'https://res.cloudinary.com/de8w3ykvy/video/upload/v1753077598/HunterBoom/cm4shhj0r000003mdfbe23njd_ukabrl.mp4',
    category: 'traditional',
    section: 'MERDEKA FIREWORKS'
  },
  {
    id: 991,
    name: { en: '4 49 Shoot Cake (ABCD) 4', ms: '4 49 Shoot Cake (ABCD) 4' },
    price: 49,
    image: 'https://res.cloudinary.com/de8w3ykvy/image/upload/v1753198982/fireworks_400x400/fireworks_400x400/resized_framed_product_90_4_49_Shoot_Cake_28ABCD29_4_49.jpg',
    videoUrl: 'https://res.cloudinary.com/de8w3ykvy/video/upload/v1753077608/HunterBoom/cm4shhzku000903mt4o59h96b_es7x0u.mp4',
    category: 'traditional',
    section: 'MERDEKA FIREWORKS'
  },
  {
    id: 992,
    name: { en: 'Special Fireworks #92', ms: 'Special Fireworks #92' },
    price: 50,
    image: 'https://res.cloudinary.com/de8w3ykvy/image/upload/v1753198882/fireworks_400x400/fireworks_400x400/resized_framed_388_Shot_Machine_Gun_388.jpg',
    videoUrl: 'https://storage.googleapis.com/takeapp/media/cm4shk2s0000g03ju9jme3n1g.mp4',
    category: 'traditional',
    section: 'FOUNTAIN BLAST'
  },
  {
    id: 993,
    name: { en: '4138 Shoot Cake', ms: '4138 Shoot Cake' },
    price: 120,
    image: 'https://res.cloudinary.com/de8w3ykvy/image/upload/v1753199054/fireworks_400x400/fireworks_400x400/resized_framed_product_92_4138_Shoot_Cake.jpg',
    videoUrl: 'https://res.cloudinary.com/de8w3ykvy/video/upload/v1753077630/HunterBoom/cm4jy49dl00120cky70snaevx_esxtka.mp4',
    category: 'traditional',
    section: 'MERDEKA FIREWORKS'
  },
  {
    id: 994,
    name: { en: '5138 Shoot Cake (Single Abcd) 5', ms: '5138 Shoot Cake (Single Abcd) 5' },
    price: 150,
    image: 'https://res.cloudinary.com/de8w3ykvy/image/upload/v1753199079/fireworks_400x400/fireworks_400x400/resized_framed_5138_Shoot_Cake_Single_Abcd_5.jpg',
    videoUrl: 'https://storage.googleapis.com/takeapp/media/cm4shko51000i03ju5o9q795y.mp4',
    category: 'traditional',
    section: 'MERDEKA FIREWORKS'
  },
  {
    id: 995,
    name: { en: '5414 Shoot Cake (ABC) (Straight V Shape) Bb51', ms: '5414 Shoot Cake (ABC) (Straight V Shape) Bb51' },
    price: 450,
    image: 'https://res.cloudinary.com/de8w3ykvy/image/upload/v1753198989/fireworks_400x400/fireworks_400x400/resized_framed_Super_Flash_Rocket.jpg',
    videoUrl: 'https://storage.googleapis.com/takeapp/media/cm4ii2fc9000c0cjsdadg2xrk.mp4',
    category: 'traditional',
    section: 'MERDEKA FIREWORKS'
  },
  {
    id: 996,
    name: { en: '5414 Shoot Cake (ABC) (Straight V Shape) Bb51', ms: '5414 Shoot Cake (ABC) (Straight V Shape) Bb51' },
    price: 450,
    image: 'https://res.cloudinary.com/de8w3ykvy/image/upload/v1753199083/fireworks_400x400/fireworks_400x400/resized_framed_12_Patten_160_Saat_Fountain.jpg',
    videoUrl: 'https://storage.googleapis.com/takeapp/media/cm4ii399k00000clg655khz7o.mp4',
    category: 'traditional',
    section: 'MERDEKA FIREWORKS'
  },
  {
    id: 997,
    name: { en: '5138 Shoot Cake (ABC) (V Shape) Bb5138 C', ms: '5138 Shoot Cake (ABC) (V Shape) Bb5138 C' },
    price: 450,
    image: 'https://res.cloudinary.com/de8w3ykvy/image/upload/v1753199039/fireworks_400x400/fireworks_400x400/resized_framed_5138_Shoot_Cake_ABC_V_Shape_Bb5138_C.jpg',
    videoUrl: 'https://storage.googleapis.com/takeapp/media/cm4ii591600000ci33jtohs4d.mp4',
    category: 'traditional',
    section: 'MERDEKA FIREWORKS'
  },
  {
    id: 998,
    name: { en: '5138 Shoot Cake (ABC) (V Shape) Bb5138 D', ms: '5138 Shoot Cake (ABC) (V Shape) Bb5138 D' },
    price: 450,
    image: 'https://res.cloudinary.com/de8w3ykvy/image/upload/v1753198983/fireworks_400x400/fireworks_400x400/resized_framed_5138_Shoot_Cake_ABC_V_Shape_Bb5138_D.jpg',
    videoUrl: 'https://storage.googleapis.com/takeapp/media/cm4ii5qox00000cjx6adr5uf7.mp4',
    category: 'traditional',
    section: 'MERDEKA FIREWORKS'
  },
  {
    id: 999,
    name: { en: '5414 Shoot Cake Thor (V Shape) 5414', ms: '5414 Shoot Cake Thor (V Shape) 5414' },
    price: 450,
    image: 'https://res.cloudinary.com/de8w3ykvy/image/upload/v1753199101/fireworks_400x400/fireworks_400x400/resized_framed_5414_Shoot_Cake_Thor_V_Shape_5414.jpg',
    videoUrl: 'https://storage.googleapis.com/takeapp/media/cm3m7ak5r000g0ckwaav6fnq0.mp4',
    category: 'traditional',
    section: 'MERDEKA FIREWORKS'
  },
  {
    id: 1000,
    name: { en: '5414 Shoot Cake Thanos (V Shape) 5414', ms: '5414 Shoot Cake Thanos (V Shape) 5414' },
    price: 450,
    image: 'https://res.cloudinary.com/de8w3ykvy/image/upload/v1753198936/fireworks_400x400/fireworks_400x400/resized_framed_5414_Shoot_Cake_Thanos_V_Shape_5414.jpg',
    videoUrl: 'https://storage.googleapis.com/takeapp/media/cm3m7a56r000g0cmgc2qa7l1w.mp4',
    category: 'traditional',
    section: 'MERDEKA FIREWORKS'
  },
  {
    id: 1001,
    name: { en: '5414 Shoot Cake Rule The Universe 5414', ms: '5414 Shoot Cake Rule The Universe 5414' },
    price: 450,
    image: 'https://res.cloudinary.com/de8w3ykvy/image/upload/v1753198950/fireworks_400x400/fireworks_400x400/resized_framed_5414_Shoot_Cake_Rule_The_Universe_5414.jpg',
    videoUrl: '',
    category: 'traditional',
    section: 'MERDEKA FIREWORKS'
  },
  {
    id: 1002,
    name: { en: '5552 Shoot Cake Four Symbols Mini (V Shape) 5', ms: '5552 Shoot Cake Four Symbols Mini (V Shape) 5' },
    price: 600,
    image: 'https://res.cloudinary.com/de8w3ykvy/image/upload/v1753198897/fireworks_400x400/fireworks_400x400/resized_framed_5552_Shoot_Cake_Four_Symbols_Mini_V_Shape_5.jpg',
    videoUrl: '',
    category: 'traditional',
    section: 'MERDEKA FIREWORKS'
  },
  {
    id: 1003,
    name: { en: '5552 Shoot Cake Xiong He Xin Xi (Straight V S', ms: '5552 Shoot Cake Xiong He Xin Xi (Straight V S' },
    price: 600,
    image: 'https://res.cloudinary.com/de8w3ykvy/image/upload/v1753199011/fireworks_400x400/fireworks_400x400/resized_framed_5552_Shoot_Cake_Xiong_He_Xin_Xi_Straight_V_S.jpg',
    videoUrl: 'https://storage.googleapis.com/takeapp/media/cm4queryp000403mkeyk73q6o.mp4',
    category: 'traditional',
    section: 'MERDEKA FIREWORKS'
  },
  {
    id: 1004,
    name: { en: '5552 Shoot Cake Fu Shou An Kang (V Shape) 555', ms: '5552 Shoot Cake Fu Shou An Kang (V Shape) 555' },
    price: 600,
    image: 'https://res.cloudinary.com/de8w3ykvy/image/upload/v1753198940/fireworks_400x400/fireworks_400x400/resized_framed_5552_Shoot_Cake_Fu_Shou_An_Kang_V_Shape_555.jpg',
    videoUrl: '',
    category: 'traditional',
    section: 'MERDEKA FIREWORKS'
  },
  {
    id: 1005,
    name: { en: '8138 Shoot Cake', ms: '8138 Shoot Cake' },
    price: 450,
    image: 'https://res.cloudinary.com/de8w3ykvy/image/upload/v1753199068/fireworks_400x400/fireworks_400x400/resized_framed_product_104_8138_Shoot_Cake.jpg',
    videoUrl: 'https://res.cloudinary.com/de8w3ykvy/video/upload/v1753077728/HunterBoom/cm4jivsef00010cl21ztbbh6b_g6udgn.mp4',
    category: 'traditional',
    section: 'MERDEKA FIREWORKS'
  },
  {
    id: 1006,
    name: { en: '7276 Shoot Milan Night (Straight V Shape) 727', ms: '7276 Shoot Milan Night (Straight V Shape) 727' },
    price: 450,
    image: 'https://res.cloudinary.com/de8w3ykvy/image/upload/v1753199055/fireworks_400x400/fireworks_400x400/resized_framed_7276_Shoot_Milan_Night_Straight_V_Shape_727.jpg',
    videoUrl: 'https://storage.googleapis.com/takeapp/media/cm5dl1fcx000303jgai1h7hgw.mp4',
    category: 'traditional',
    section: 'MERDEKA FIREWORKS'
  },
  {
    id: 1007,
    name: { en: '6414 Shoot Cake I Am The Only One (V Shape) 6', ms: '6414 Shoot Cake I Am The Only One (V Shape) 6' },
    price: 650,
    image: 'https://res.cloudinary.com/de8w3ykvy/image/upload/v1753199065/fireworks_400x400/fireworks_400x400/resized_framed_6414_Shoot_Cake_I_Am_The_Only_One_V_Shape_6.jpg',
    videoUrl: 'https://storage.googleapis.com/takeapp/media/cm3r0gjys00000djkaama012h.mp4',
    category: 'traditional',
    section: 'MERDEKA FIREWORKS'
  },
  {
    id: 1008,
    name: { en: '9138 Shoot Cake', ms: '9138 Shoot Cake' },
    price: 450,
    image: 'https://res.cloudinary.com/de8w3ykvy/image/upload/v1753199016/fireworks_400x400/fireworks_400x400/resized_framed_product_117_9138_Shoot_Cake.jpg',
    videoUrl: 'https://res.cloudinary.com/de8w3ykvy/video/upload/v1753077868/HunterBoom/cm598lsfi000003l55pwdcx4b_j0398m.mp4',
    category: 'traditional',
    section: 'MERDEKA FIREWORKS'
  },
  {
    id: 1009,
    name: { en: '8036 Shoot Sound King 836', ms: '8036 Shoot Sound King 836' },
    price: 150,
    image: 'https://res.cloudinary.com/de8w3ykvy/image/upload/v1753199005/fireworks_400x400/fireworks_400x400/resized_framed_8036_Shoot_Sound_King_836.jpg',
    videoUrl: 'https://storage.googleapis.com/takeapp/media/cm4qrpog900010cl08qqi6byz.mp4',
    category: 'traditional',
    section: 'MERDEKA FIREWORKS'
  },
  {
    id: 1010,
    name: { en: '9138 Shoot Cake Fu Lu Shou (Straight V Shape', ms: '9138 Shoot Cake Fu Lu Shou (Straight V Shape' },
    price: 450,
    image: 'https://res.cloudinary.com/de8w3ykvy/image/upload/v1753198944/fireworks_400x400/fireworks_400x400/resized_framed_9138_Shoot_Cake_Fu_Lu_Shou_Straight_V_Shape.jpg',
    videoUrl: 'https://storage.googleapis.com/takeapp/media/cm4kyn2zf00000cl6evyfasc7.mp4',
    category: 'traditional',
    section: 'MERDEKA FIREWORKS'
  },
  {
    id: 1011,
    name: { en: '9414 Shoot Cake Fu Lu Shou Straight V Shape 9414', ms: '9414 Shoot Cake Fu Lu Shou (Straight V Shape)' },
    price: 800,
    image: 'https://res.cloudinary.com/de8w3ykvy/image/upload/v1753198908/fireworks_400x400/fireworks_400x400/resized_framed_9414_Shoot_Cake_Fu_Lu_Shou_Straight_V_Shape_9414.jpg',
    videoUrl: 'https://storage.googleapis.com/takeapp/media/cm4kynjnt00050cjo9a2xc10a.mp4',
    category: 'traditional',
    section: 'MERDEKA FIREWORKS'
  },
  {
    id: 1012,
    name: { en: '9138 Shoot Cake God For Wealth (Straight V S', ms: '9138 Shoot Cake God For Wealth (Straight V S' },
    price: 450,
    image: 'https://res.cloudinary.com/de8w3ykvy/image/upload/v1753198985/fireworks_400x400/fireworks_400x400/resized_framed_9138_Shoot_Cake_God_For_Wealth_Straight_V_S.jpg',
    videoUrl: 'https://storage.googleapis.com/takeapp/media/cm4krsuma00000cl42y8x7x95.mp4',
    category: 'traditional',
    section: 'MERDEKA FIREWORKS'
  },
  {
    id: 1013,
    name: { en: '9552 Shoot Cake God For Wealth (Straight V Sh', ms: '9552 Shoot Cake God For Wealth (Straight V Sh' },
    price: 900,
    image: 'https://res.cloudinary.com/de8w3ykvy/image/upload/v1753199031/fireworks_400x400/fireworks_400x400/resized_framed_9552_Shoot_Cake_God_For_Wealth_Straight_V_Sh.jpg',
    videoUrl: 'https://storage.googleapis.com/takeapp/media/cm4krs82800040cme2rrdeu89.mp4',
    category: 'traditional',
    section: 'MERDEKA FIREWORKS'
  },
  {
    id: 1014,
    name: { en: '9138 Shoot Cake Fortune Four 9', ms: '9138 Shoot Cake Fortune Four 9' },
    price: 450,
    image: 'https://res.cloudinary.com/de8w3ykvy/image/upload/v1753199073/fireworks_400x400/fireworks_400x400/resized_framed_9138_Shoot_Cake_Fortune_Four_9.jpg',
    videoUrl: 'https://storage.googleapis.com/takeapp/media/cm3r2lnw200060cla8ua8d5er.mp4',
    category: 'traditional',
    section: 'MERDEKA FIREWORKS'
  },
  {
    id: 1015,
    name: { en: '9552 Shoot Cake Fortune Four 9', ms: '9552 Shoot Cake Fortune Four 9' },
    price: 900,
    image: 'https://res.cloudinary.com/de8w3ykvy/image/upload/v1753199069/fireworks_400x400/fireworks_400x400/resized_framed_9552_Shoot_Cake_Fortune_Four_9.jpg',
    videoUrl: 'https://storage.googleapis.com/takeapp/media/cm3r2lnw200060cla8ua8d5er.mp4',
    category: 'traditional',
    section: 'MERDEKA FIREWORKS'
  },
  {
    id: 1016,
    name: { en: '9138 Shoot Cake Zhong Lu Chai Shen 9138', ms: '9138 Shoot Cake Zhong Lu Chai Shen 9138' },
    price: 450,
    image: 'https://res.cloudinary.com/de8w3ykvy/image/upload/v1753199095/fireworks_400x400/fireworks_400x400/resized_framed_9138_Shoot_Cake_Zhong_Lu_Chai_Shen_9138.jpg',
    videoUrl: 'https://storage.googleapis.com/takeapp/media/cm598y327000003l380dw0qhh.mp4',
    category: 'traditional',
    section: 'MERDEKA FIREWORKS'
  },
  {
    id: 1017,
    name: { en: '949 Shoot Cake', ms: '949 Shoot Cake' },
    price: 200,
    image: 'https://res.cloudinary.com/de8w3ykvy/image/upload/v1753198954/fireworks_400x400/fireworks_400x400/resized_framed_product_116_949_Shoot_Cake.jpg',
    videoUrl: 'https://res.cloudinary.com/de8w3ykvy/video/upload/v1753077856/HunterBoom/cm597rqi4000u03mqe0ml5xhk_qmk1ha.mp4',
    category: 'traditional',
    section: 'MERDEKA FIREWORKS'
  },
  {
    id: 1018,
    name: { en: '9138 Shoot Cake', ms: '9138 Shoot Cake' },
    price: 450,
    image: 'https://res.cloudinary.com/de8w3ykvy/image/upload/v1753199016/fireworks_400x400/fireworks_400x400/resized_framed_product_117_9138_Shoot_Cake.jpg',
    videoUrl: 'https://res.cloudinary.com/de8w3ykvy/video/upload/v1753077868/HunterBoom/cm598lsfi000003l55pwdcx4b_j0398m.mp4',
    category: 'traditional',
    section: 'MERDEKA FIREWORKS'
  },
  {
    id: 1019,
    name: { en: '5276 Shoot Cake Classic (V Shape) 5276', ms: '5276 Shoot Cake Classic (V Shape) 5276' },
    price: 400,
    image: 'https://res.cloudinary.com/de8w3ykvy/image/upload/v1753198965/fireworks_400x400/fireworks_400x400/resized_framed_5276_Shoot_Cake_Classic_V_Shape_5276.jpg',
    videoUrl: 'https://storage.googleapis.com/takeapp/media/cm4la2rms00130cl71m8b1hdf.mp4',
    category: 'traditional',
    section: 'MERDEKA FIREWORKS'
  },
  {
    id: 1020,
    name: { en: 'Pre- Orderb912 9138 Shoot Cake (1.2) 9138', ms: 'Pre- Orderb912 9138 Shoot Cake (1.2) 9138' },
    price: 500,
    image: 'https://res.cloudinary.com/de8w3ykvy/image/upload/v1753198926/fireworks_400x400/fireworks_400x400/resized_framed_product_119_Pre_Orderb_912_9138_Shoot_Ca.jpg',
    videoUrl: '',
    category: 'traditional',
    section: 'MERDEKA FIREWORKS'
  },
  {
    id: 1021,
    name: { en: '9276 Shoot Cake Golden Win (V Shape Gold) 9', ms: '9276 Shoot Cake Golden Win (V Shape Gold) 9' },
    price: 400,
    image: 'https://res.cloudinary.com/de8w3ykvy/image/upload/v1753198888/fireworks_400x400/fireworks_400x400/resized_framed_9276_Shoot_Cake_Golden_Win_V_Shape_Gold_9.jpg',
    videoUrl: 'https://storage.googleapis.com/takeapp/media/cm5cj5yoc000803js4xadhqd4.mp4',
    category: 'traditional',
    section: 'MERDEKA FIREWORKS'
  },
  {
    id: 1022,
    name: { en: '9138 Shoot Cake Hong Yun Dang Tounbsp 9138', ms: '9138 Shoot Cake Hong Yun Dang Tounbsp 9138' },
    price: 450,
    image: 'https://res.cloudinary.com/de8w3ykvy/image/upload/v1753198904/fireworks_400x400/fireworks_400x400/resized_framed_9138_Shoot_Cake_Hong_Yun_Dang_Tounbsp_9138.jpg',
    videoUrl: 'https://storage.googleapis.com/takeapp/media/cm4ktocdv00000cl84989dzmo.mp4',
    category: 'traditional',
    section: 'MERDEKA FIREWORKS'
  },
  {
    id: 1023,
    name: { en: 'Pre- Orderb902 9138 Shoot Cake Xin Xiang Shi Cheng', ms: 'Pre- Orderb902 9138 Shoot Cake Xin Xiang Shi Cheng' },
    price: 500,
    image: 'https://res.cloudinary.com/de8w3ykvy/image/upload/v1753199027/fireworks_400x400/fireworks_400x400/resized_framed_product_122_Pre_Orderb_902_9138_Shoot_Ca.jpg',
    videoUrl: 'https://res.cloudinary.com/de8w3ykvy/video/upload/v1753077911/HunterBoom/cm599gv4o000303js31vc38od_xjq54k.mp4',
    category: 'traditional',
    section: 'MERDEKA FIREWORKS'
  },
  {
    id: 1024,
    name: { en: 'Pre- Orderb903 9138 Shoot Cake Huang Jin Man Wu 91', ms: 'Pre- Orderb903 9138 Shoot Cake Huang Jin Man Wu 91' },
    price: 500,
    image: 'https://res.cloudinary.com/de8w3ykvy/image/upload/v1753199104/fireworks_400x400/fireworks_400x400/resized_framed_product_123_Pre_Orderb_903_9138_Shoot_Ca.jpg',
    videoUrl: 'https://res.cloudinary.com/de8w3ykvy/video/upload/v1753077922/HunterBoom/cm4ktontw00050clabnkqag8q_e34tqy.mp4',
    category: 'traditional',
    section: 'MERDEKA FIREWORKS'
  },
  {
    id: 1025,
    name: { en: '5" 138 Shoot Cake 天地无双 Unparalleled', ms: '5" 138 Shoot Cake 天地无双 Unparalleled' },
    price: 450,
    image: 'https://hunterboom.com/wp-content/uploads/2024/11/Website-product-photos-73.jpg',
    videoUrl: 'https://www.youtube.com/embed/9cyQy8KjbqE',
    category: 'traditional',
    section: 'MERDEKA FIREWORKS'
  },
  {
    id: 1026,
    name: { en: '7" 138 Shoot Cake Fast & Furious', ms: '7" 138 Shoot Cake Fast & Furious' },
    price: 350,
    image: 'https://hunterboom.com/wp-content/uploads/2024/11/7138-SHOOT-CAKE-A-74.jpg',
    videoUrl: 'https://www.youtube.com/embed/BwSb6Yi9-go',
    category: 'traditional',
    section: 'MERDEKA FIREWORKS'
  },
  {
    id: 1027,
    name: { en: '8" 49 Shoot Cake 八面玲珑 Eight-Sided', ms: '8" 49 Shoot Cake 八面玲珑 Eight-Sided' },
    price: 250,
    image: 'https://hunterboom.com/wp-content/uploads/2024/11/8寸49发盆花-八面玲珑-849-SHOOT-CAKE.jpg',
    videoUrl: 'https://www.youtube.com/embed/-0-ADwhfGwY',
    category: 'traditional',
    section: 'MERDEKA FIREWORKS'
  },
  {
    id: 1028,
    name: { en: '9" 138 Shoot Cake 诸葛亮 Zhuge Liang', ms: '9" 138 Shoot Cake 诸葛亮 Zhuge Liang' },
    price: 450,
    image: 'https://hunterboom.com/wp-content/uploads/2024/11/9寸138发盆花G-诸葛亮-9138-SHOOT-CAKE-G.jpg',
    videoUrl: 'https://www.youtube.com/embed/EhloGEN5uRk',
    category: 'traditional',
    section: 'MERDEKA FIREWORKS'
  },
  {
    id: 1029,
    name: { en: 'DS 5-276V MILAN NIGHT (combine2in1)', ms: 'DS 5-276V MILAN NIGHT (combine2in1)' },
    price: 600,
    image: 'https://res.cloudinary.com/de8w3ykvy/image/upload/v1753258170/mci_product/mci_product/mci_1_No184_184_DS_5-276V_MILAN_NIGHT_combine2.jpg',
    videoUrl: 'https://res.cloudinary.com/de8w3ykvy/video/upload/v1753305553/mci_product/mci_video_row_1.mp4',
    category: 'traditional',
    section: 'MERDEKA FIREWORKS'
  },
  {
    id: 1030,
    name: { en: 'DS 5-414V SHI HOU DI DONG (combine3in1) Pyro', ms: 'DS 5-414V SHI HOU DI DONG (combine3in1) Pyro' },
    price: 600,
    image: 'https://res.cloudinary.com/de8w3ykvy/image/upload/v1753258172/mci_product/mci_product/mci_2_No185_185_DS_5-414V_SHI_HOU_DI_DONG_comb.jpg',
    videoUrl: 'https://res.cloudinary.com/de8w3ykvy/video/upload/v1753305597/mci_product/mci_video_row_2.mp4',
    category: 'traditional',
    section: 'MERDEKA FIREWORKS'
  },
  {
    id: 1031,
    name: { en: 'DS 5-414V LONG TENG SHENG SHI (combine3in1)', ms: 'DS 5-414V LONG TENG SHENG SHI (combine3in1)' },
    price: 600,
    image: 'https://res.cloudinary.com/de8w3ykvy/image/upload/v1753258175/mci_product/mci_product/mci_3_No186_186_DS_5-414V_LONG_TENG_SHENG_SHI_.jpg',
    videoUrl: 'https://res.cloudinary.com/de8w3ykvy/video/upload/v1753305641/mci_product/mci_video_row_3.mp4',
    category: 'traditional',
    section: 'MERDEKA FIREWORKS'
  },
  {
    id: 1032,
    name: { en: 'DS 6-552V (combine4in1)', ms: 'DS 6-552V (combine4in1)' },
    price: 600,
    image: 'https://res.cloudinary.com/de8w3ykvy/image/upload/v1753258177/mci_product/mci_product/mci_4_No187_187_DS_6-552V_combine4in1__DS_6-55.jpg',
    videoUrl: 'https://res.cloudinary.com/de8w3ykvy/video/upload/v1753305665/mci_product/mci_video_row_4.mp4',
    category: 'traditional',
    section: 'MERDEKA FIREWORKS'
  },
  {
    id: 1033,
    name: { en: 'DS 9-138V CAI YUAN GUN GUN', ms: 'DS 9-138V CAI YUAN GUN GUN' },
    price: 600,
    image: 'https://res.cloudinary.com/de8w3ykvy/image/upload/v1753258179/mci_product/mci_product/mci_5_No188_188_DS_9-138V_CAI_YUAN_GUN_GUN__DS.jpg',
    videoUrl: 'https://res.cloudinary.com/de8w3ykvy/video/upload/v1753305706/mci_product/mci_video_row_5.mp4',
    category: 'traditional',
    section: 'MERDEKA FIREWORKS'
  },
  {
    id: 1034,
    name: { en: 'DS 1.5-88 YUE LONG MEN', ms: 'DS 1.5-88 YUE LONG MEN' },
    price: 600,
    image: 'https://res.cloudinary.com/de8w3ykvy/image/upload/v1753258181/mci_product/mci_product/mci_6_No189_189_DS_15-88_YUE_LONG_MEN__DS_15-8.jpg',
    videoUrl: 'https://res.cloudinary.com/de8w3ykvy/video/upload/v1753305764/mci_product/mci_video_row_6.mp4',
    category: 'traditional',
    section: 'MERDEKA FIREWORKS'
  },
  {
    id: 1035,
    name: { en: 'DS 1.5-138 JU CAI QI', ms: 'DS 1.5-138 JU CAI QI' },
    price: 600,
    image: 'https://res.cloudinary.com/de8w3ykvy/image/upload/v1753258184/mci_product/mci_product/mci_7_No190_190_DS_15-138_JU_CAI_QI__DS_15-138.jpg',
    videoUrl: 'https://res.cloudinary.com/de8w3ykvy/video/upload/v1753332710/mci_product/mci_video_row_7_ju_cai_qi_compressed.mp4',
    category: 'traditional',
    section: 'MERDEKA FIREWORKS'
  },
  {
    id: 1036,
    name: { en: 'TP 5-276V SHI WAI TAO YUAN (combine2in1)', ms: 'TP 5-276V SHI WAI TAO YUAN (combine2in1)' },
    price: 600,
    image: 'https://res.cloudinary.com/de8w3ykvy/image/upload/v1753258186/mci_product/mci_product/mci_8_TL-001_173_TP_5-276V_SHI_WAI_TAO_YUAN_co.jpg',
    videoUrl: 'https://res.cloudinary.com/de8w3ykvy/video/upload/v1753331110/mci_product/mci_video_row_8_new.mp4',
    category: 'traditional',
    section: 'MERDEKA FIREWORKS'
  },
  {
    id: 1037,
    name: { en: 'TP 6-25 FENG WU JIU TIAN', ms: 'TP 6-25 FENG WU JIU TIAN' },
    price: 600,
    image: 'https://res.cloudinary.com/de8w3ykvy/image/upload/v1753258189/mci_product/mci_product/mci_9_TL-002_174_TP_6-25_FENG_WU_JIU_TIAN__TP_.jpg',
    videoUrl: 'https://res.cloudinary.com/de8w3ykvy/video/upload/v1753305881/mci_product/mci_video_row_9.mp4',
    category: 'traditional',
    section: 'MERDEKA FIREWORKS'
  },
  {
    id: 1038,
    name: { en: 'TP 6-36 YONG PAN GAO FENG', ms: 'TP 6-36 YONG PAN GAO FENG' },
    price: 600,
    image: 'https://res.cloudinary.com/de8w3ykvy/image/upload/v1753258192/mci_product/mci_product/mci_10_TL-003_175_TP_6-36_YONG_PAN_GAO_FENG__TP.jpg',
    videoUrl: 'https://res.cloudinary.com/de8w3ykvy/video/upload/v1753305895/mci_product/mci_video_row_10.mp4',
    category: 'traditional',
    section: 'MERDEKA FIREWORKS'
  },
  {
    id: 1039,
    name: { en: 'TP 7-25 JIN QI LIN', ms: 'TP 7-25 JIN QI LIN' },
    price: 600,
    image: 'https://res.cloudinary.com/de8w3ykvy/image/upload/v1753258195/mci_product/mci_product/mci_11_TL-004_176_TP_7-25_JIN_QI_LIN__TP_7-25_%E9%87%91.jpg',
    videoUrl: 'https://res.cloudinary.com/de8w3ykvy/video/upload/v1753305903/mci_product/mci_video_row_11.mp4',
    category: 'traditional',
    section: 'MERDEKA FIREWORKS'
  },
  {
    id: 1040,
    name: { en: 'TP 7-36 XING CHEN DA HAI', ms: 'TP 7-36 XING CHEN DA HAI' },
    price: 600,
    image: 'https://res.cloudinary.com/de8w3ykvy/image/upload/v1753258197/mci_product/mci_product/mci_12_TL-005_177_TP_7-36_XING_CHEN_DA_HAI__TP_.jpg',
    videoUrl: 'https://res.cloudinary.com/de8w3ykvy/video/upload/v1753305915/mci_product/mci_video_row_12.mp4',
    category: 'traditional',
    section: 'MERDEKA FIREWORKS'
  },
  {
    id: 1041,
    name: { en: 'TP 7-49 FU LU SHUANG QUAN', ms: 'TP 7-49 FU LU SHUANG QUAN' },
    price: 600,
    image: 'https://res.cloudinary.com/de8w3ykvy/image/upload/v1753258200/mci_product/mci_product/mci_13_TL-006_178_TP_7-49_FU_LU_SHUANG_QUAN__TP.jpg',
    videoUrl: 'https://res.cloudinary.com/de8w3ykvy/video/upload/v1753305924/mci_product/mci_video_row_13.mp4',
    category: 'traditional',
    section: 'MERDEKA FIREWORKS'
  },
  {
    id: 1042,
    name: { en: 'TP 7-138V MA DAO CHENG GONG', ms: 'TP 7-138V MA DAO CHENG GONG' },
    price: 600,
    image: 'https://res.cloudinary.com/de8w3ykvy/image/upload/v1753258203/mci_product/mci_product/mci_14_TL-007_179_TP_7-138V_MA_DAO_CHENG_GONG__.jpg',
    videoUrl: 'https://res.cloudinary.com/de8w3ykvy/video/upload/v1753305932/mci_product/mci_video_row_14.mp4',
    category: 'traditional',
    section: 'MERDEKA FIREWORKS'
  },
  {
    id: 1043,
    name: { en: 'TP 9-138V XING HE CUI CAN', ms: 'TP 9-138V XING HE CUI CAN' },
    price: 600,
    image: 'https://res.cloudinary.com/de8w3ykvy/image/upload/v1753258206/mci_product/mci_product/mci_15_TL-008_180_TP_9-138V_XING_HE_CUI_CAN__TP.jpg',
    videoUrl: 'https://res.cloudinary.com/de8w3ykvy/video/upload/v1753305945/mci_product/mci_video_row_15.mp4',
    category: 'traditional',
    section: 'MERDEKA FIREWORKS'
  },
  {
    id: 1044,
    name: { en: 'TP 9-138V HUA KAI FU GUI', ms: 'TP 9-138V HUA KAI FU GUI' },
    price: 600,
    image: 'https://res.cloudinary.com/de8w3ykvy/image/upload/v1753258209/mci_product/mci_product/mci_16_TL-009_181_TP_9-138V_HUA_KAI_FU_GUI__TP_.jpg',
    videoUrl: 'https://res.cloudinary.com/de8w3ykvy/video/upload/v1753305955/mci_product/mci_video_row_16.mp4',
    category: 'traditional',
    section: 'MERDEKA FIREWORKS'
  },
  {
    id: 1045,
    name: { en: 'TP 9-138V CHEN FENG PO LANG', ms: 'TP 9-138V CHEN FENG PO LANG' },
    price: 600,
    image: 'https://res.cloudinary.com/de8w3ykvy/image/upload/v1753258211/mci_product/mci_product/mci_17_TL-010_182_TP_9-138V_CHEN_FENG_PO_LANG__.jpg',
    videoUrl: 'https://res.cloudinary.com/de8w3ykvy/video/upload/v1753305967/mci_product/mci_video_row_17.mp4',
    category: 'traditional',
    section: 'MERDEKA FIREWORKS'
  },
  {
    id: 1046,
    name: { en: 'TP 10-138V YIN HE ZHI LIAN', ms: 'TP 10-138V YIN HE ZHI LIAN' },
    price: 600,
    image: 'https://res.cloudinary.com/de8w3ykvy/image/upload/v1753258214/mci_product/mci_product/mci_18_TL-011_183_TP_10-138V_YIN_HE_ZHI_LIAN__T.jpg',
    videoUrl: 'https://res.cloudinary.com/de8w3ykvy/video/upload/v1753305977/mci_product/mci_video_row_18.mp4',
    category: 'traditional',
    section: 'MERDEKA FIREWORKS'
  },
  {
    id: 1047,
    name: { en: 'TL 5-276V JI QING YOU YU (combine2in1)', ms: 'TL 5-276V JI QING YOU YU (combine2in1)' },
    price: 600,
    image: 'https://res.cloudinary.com/de8w3ykvy/image/upload/v1753258216/mci_product/mci_product/mci_19_FD-001_161_TL_5-276V_JI_QING_YOU_YU_comb.jpg',
    videoUrl: 'https://res.cloudinary.com/de8w3ykvy/video/upload/v1753305991/mci_product/mci_video_row_19.mp4',
    category: 'traditional',
    section: 'MERDEKA FIREWORKS'
  },
  {
    id: 1048,
    name: { en: 'TL 6-552V YING CHUN JIE FU (combine4in1)', ms: 'TL 6-552V YING CHUN JIE FU (combine4in1)' },
    price: 600,
    image: 'https://res.cloudinary.com/de8w3ykvy/image/upload/v1753258219/mci_product/mci_product/mci_20_FD-002_162_TL_6-552V_YING_CHUN_JIE_FU_co.jpg',
    videoUrl: 'https://res.cloudinary.com/de8w3ykvy/video/upload/v1753306008/mci_product/mci_video_row_20.mp4',
    category: 'traditional',
    section: 'MERDEKA FIREWORKS'
  },
  {
    id: 1049,
    name: { en: 'TL 8-138V GONG HE XIN XI', ms: 'TL 8-138V GONG HE XIN XI' },
    price: 600,
    image: 'https://res.cloudinary.com/de8w3ykvy/image/upload/v1753258225/mci_product/mci_product/mci_21_FD-003_163_TL_8-138V_GONG_HE_XIN_XI__TL_.jpg',
    videoUrl: 'https://res.cloudinary.com/de8w3ykvy/video/upload/v1753306043/mci_product/mci_video_row_21.mp4',
    category: 'traditional',
    section: 'MERDEKA FIREWORKS'
  },
  {
    id: 1050,
    name: { en: 'TL 9-138V XIANG YUN RUI CAI', ms: 'TL 9-138V XIANG YUN RUI CAI' },
    price: 600,
    image: 'https://res.cloudinary.com/de8w3ykvy/image/upload/v1753258228/mci_product/mci_product/mci_22_FD-004_164_TL_9-138V_XIANG_YUN_RUI_CAI__.jpg',
    videoUrl: 'https://res.cloudinary.com/de8w3ykvy/video/upload/v1753306085/mci_product/mci_video_row_22.mp4',
    category: 'traditional',
    section: 'MERDEKA FIREWORKS'
  },
  {
    id: 1051,
    name: { en: 'TL 9-138V JI XING GAO ZHAO', ms: 'TL 9-138V JI XING GAO ZHAO' },
    price: 600,
    image: 'https://res.cloudinary.com/de8w3ykvy/image/upload/v1753258231/mci_product/mci_product/mci_23_FD-005_165_TL_9-138V_JI_XING_GAO_ZHAO__T.jpg',
    videoUrl: 'https://res.cloudinary.com/de8w3ykvy/video/upload/v1753306120/mci_product/mci_video_row_23.mp4',
    category: 'traditional',
    section: 'MERDEKA FIREWORKS'
  },
  {
    id: 1052,
    name: { en: 'TL 9-138V RUI QI YING MEN', ms: 'TL 9-138V RUI QI YING MEN' },
    price: 600,
    image: 'https://res.cloudinary.com/de8w3ykvy/image/upload/v1753258234/mci_product/mci_product/mci_24_FD-006_166_TL_9-138V_RUI_QI_YING_MEN__TL.jpg',
    videoUrl: 'https://res.cloudinary.com/de8w3ykvy/video/upload/v1753306142/mci_product/mci_video_row_24.mp4',
    category: 'traditional',
    section: 'MERDEKA FIREWORKS'
  },
  {
    id: 1053,
    name: { en: 'TL 9-138V FENG WEI FEI TIAN', ms: 'TL 9-138V FENG WEI FEI TIAN' },
    price: 600,
    image: 'https://res.cloudinary.com/de8w3ykvy/image/upload/v1753258237/mci_product/mci_product/mci_25_FD-007_167_TL_9-138V_FENG_WEI_FEI_TIAN__.jpg',
    videoUrl: 'https://res.cloudinary.com/de8w3ykvy/video/upload/v1753306163/mci_product/mci_video_row_25.mp4',
    category: 'traditional',
    section: 'MERDEKA FIREWORKS'
  },
  {
    id: 1054,
    name: { en: 'TL 9-138V LONG FENG CHENG XIANG', ms: 'TL 9-138V LONG FENG CHENG XIANG' },
    price: 600,
    image: 'https://res.cloudinary.com/de8w3ykvy/image/upload/v1753258241/mci_product/mci_product/mci_26_FD-008_168_TL_9-138V_LONG_FENG_CHENG_XIA.jpg',
    videoUrl: 'https://res.cloudinary.com/de8w3ykvy/video/upload/v1753306180/mci_product/mci_video_row_26.mp4',
    category: 'traditional',
    section: 'MERDEKA FIREWORKS'
  },
  {
    id: 1055,
    name: { en: 'TL 9-138V MEI LUN MEI HUAN', ms: 'TL 9-138V MEI LUN MEI HUAN' },
    price: 600,
    image: 'https://res.cloudinary.com/de8w3ykvy/image/upload/v1753258244/mci_product/mci_product/mci_27_FD-009_169_TL_9-138V_MEI_LUN_MEI_HUAN__T.jpg',
    videoUrl: 'https://res.cloudinary.com/de8w3ykvy/video/upload/v1753306196/mci_product/mci_video_row_27.mp4',
    category: 'traditional',
    section: 'MERDEKA FIREWORKS'
  },
  {
    id: 1056,
    name: { en: 'TL 9-138V HUA TUAN JIN CU', ms: 'TL 9-138V HUA TUAN JIN CU' },
    price: 600,
    image: 'https://res.cloudinary.com/de8w3ykvy/image/upload/v1753258247/mci_product/mci_product/mci_28_FD-010_170_TL_9-138V_HUA_TUAN_JIN_CU__TL.jpg',
    videoUrl: 'https://res.cloudinary.com/de8w3ykvy/video/upload/v1753306213/mci_product/mci_video_row_28.mp4',
    category: 'traditional',
    section: 'MERDEKA FIREWORKS'
  },
  {
    id: 1057,
    name: { en: 'TL 9-276V TIAN MA XING KONG (combine2in1)', ms: 'TL 9-276V TIAN MA XING KONG (combine2in1)' },
    price: 600,
    image: 'https://res.cloudinary.com/de8w3ykvy/image/upload/v1753258250/mci_product/mci_product/mci_29_FD-011_171_TL_9-276V_TIAN_MA_XING_KONG_c.jpg',
    videoUrl: 'https://res.cloudinary.com/de8w3ykvy/video/upload/v1753306233/mci_product/mci_video_row_29.mp4',
    category: 'traditional',
    section: 'MERDEKA FIREWORKS'
  },
  {
    id: 1058,
    name: { en: 'TL 10-49 FENG CAI JU BAO - Special', ms: 'TL 10-49 FENG CAI JU BAO - Special' },
    price: 600,
    image: 'https://res.cloudinary.com/de8w3ykvy/image/upload/v1753258253/mci_product/mci_product/mci_30_FD-012_172_TL_10-49_FENG_CAI_JU_BAO_-_Sp.jpg',
    videoUrl: 'https://res.cloudinary.com/de8w3ykvy/video/upload/v1753306255/mci_product/mci_video_row_30.mp4',
    category: 'traditional',
    section: 'MERDEKA FIREWORKS'
  },
  {
    id: 1059,
    name: { en: 'FD 5-187V DA YING JIA (combine2in1)', ms: 'FD 5-187V DA YING JIA (combine2in1)' },
    price: 600,
    image: 'https://res.cloudinary.com/de8w3ykvy/image/upload/v1753258256/mci_product/mci_product/mci_31_HP-001_146_FD_5-187V_DA_YING_JIA_combine.jpg',
    videoUrl: 'https://res.cloudinary.com/de8w3ykvy/video/upload/v1753306292/mci_product/mci_video_row_31.mp4',
    category: 'traditional',
    section: 'MERDEKA FIREWORKS'
  },
  {
    id: 1060,
    name: { en: 'FD 5-276V FU DAO CAI DAO (combine2in1)', ms: 'FD 5-276V FU DAO CAI DAO (combine2in1)' },
    price: 600,
    image: 'https://res.cloudinary.com/de8w3ykvy/image/upload/v1753258258/mci_product/mci_product/mci_32_HP-002_147_FD_5-276V_FU_DAO_CAI_DAO_comb.jpg',
    videoUrl: 'https://res.cloudinary.com/de8w3ykvy/video/upload/v1753306360/mci_product/mci_video_row_32.mp4',
    category: 'traditional',
    section: 'MERDEKA FIREWORKS'
  },
  {
    id: 1061,
    name: { en: 'FD 5-414V CAI FU SHI JIA (combine3in1)', ms: 'FD 5-414V CAI FU SHI JIA (combine3in1)' },
    price: 600,
    image: 'https://res.cloudinary.com/de8w3ykvy/image/upload/v1753258260/mci_product/mci_product/mci_33_HP-003_148_FD_5-414V_CAI_FU_SHI_JIA_comb.jpg',
    videoUrl: 'https://res.cloudinary.com/de8w3ykvy/video/upload/v1753306433/mci_product/mci_video_row_33.mp4',
    category: 'traditional',
    section: 'MERDEKA FIREWORKS'
  },
  {
    id: 1062,
    name: { en: 'FD 6-552V ZHAO CAI JIN BAO (combine4in1) | FD 6-552V 招财进宝 (4连线)', ms: 'FD 6-552V ZHAO CAI JIN BAO (combine4in1) | FD 6-552V 招财进宝 (4连线)' },
    price: 600,
    image: 'https://res.cloudinary.com/de8w3ykvy/image/upload/v1753258262/mci_product/mci_product/mci_34_HP-004_149_FD_6-552V_ZHAO_CAI_JIN_BAO_co.jpg',
    videoUrl: 'https://res.cloudinary.com/de8w3ykvy/video/upload/v1753306529/mci_product/mci_video_row_34.mp4',
    category: 'traditional',
    section: 'MERDEKA FIREWORKS'
  },
  {
    id: 1063,
    name: { en: 'FD 9-138 TU HAO JIN', ms: 'FD 9-138 TU HAO JIN' },
    price: 600,
    image: 'https://res.cloudinary.com/de8w3ykvy/image/upload/v1753258264/mci_product/mci_product/mci_35_HP-005_150_FD_9-138_TU_HAO_JIN__FD_9-138.jpg',
    videoUrl: 'https://res.cloudinary.com/de8w3ykvy/video/upload/v1753306635/mci_product/mci_video_row_35.mp4',
    category: 'traditional',
    section: 'MERDEKA FIREWORKS'
  },
  {
    id: 1064,
    name: { en: 'FD 9-187V DA JI DA LI (combine2box in1)', ms: 'FD 9-187V DA JI DA LI (combine2box in1)' },
    price: 600,
    image: 'https://res.cloudinary.com/de8w3ykvy/image/upload/v1753258267/mci_product/mci_product/mci_36_HP-006_151_FD_9-187V_DA_JI_DA_LI_combine.jpg',
    videoUrl: 'https://res.cloudinary.com/de8w3ykvy/video/upload/v1753306684/mci_product/mci_video_row_36.mp4',
    category: 'traditional',
    section: 'MERDEKA FIREWORKS'
  },
  {
    id: 1065,
    name: { en: 'FD 10-25 TIAN LANG (Wolf)', ms: 'FD 10-25 TIAN LANG (Wolf)' },
    price: 600,
    image: 'https://res.cloudinary.com/de8w3ykvy/image/upload/v1753258269/mci_product/mci_product/mci_37_HP-007_152_FD_10-25_TIAN_LANG_Wolf__FD_1.jpg',
    videoUrl: 'https://res.cloudinary.com/de8w3ykvy/video/upload/v1753306717/mci_product/mci_video_row_37.mp4',
    category: 'traditional',
    section: 'MERDEKA FIREWORKS'
  },
  {
    id: 1066,
    name: { en: 'FD 10-36 BEN LANG (Wolf)', ms: 'FD 10-36 BEN LANG (Wolf)' },
    price: 600,
    image: 'https://res.cloudinary.com/de8w3ykvy/image/upload/v1753258271/mci_product/mci_product/mci_38_HP-008_153_FD_10-36_BEN_LANG_Wolf__FD_10.jpg',
    videoUrl: 'https://res.cloudinary.com/de8w3ykvy/video/upload/v1753306733/mci_product/mci_video_row_38.mp4',
    category: 'traditional',
    section: 'MERDEKA FIREWORKS'
  },
  {
    id: 1067,
    name: { en: 'FD 10-49 LANG HAO (Wolf)', ms: 'FD 10-49 LANG HAO (Wolf)' },
    price: 600,
    image: 'https://res.cloudinary.com/de8w3ykvy/image/upload/v1753258274/mci_product/mci_product/mci_39_HP-009_154_FD_10-49_LANG_HAO_Wolf__FD_10.jpg',
    videoUrl: 'https://res.cloudinary.com/de8w3ykvy/video/upload/v1753306753/mci_product/mci_video_row_39.mp4',
    category: 'traditional',
    section: 'MERDEKA FIREWORKS'
  },
  {
    id: 1068,
    name: { en: 'FD 10-138 LANG WANG (Wolf)', ms: 'FD 10-138 LANG WANG (Wolf)' },
    price: 600,
    image: 'https://res.cloudinary.com/de8w3ykvy/image/upload/v1753258277/mci_product/mci_product/mci_40_HP-010_155_FD_10-138_LANG_WANG_Wolf__FD_.jpg',
    videoUrl: 'https://res.cloudinary.com/de8w3ykvy/video/upload/v1753306795/mci_product/mci_video_row_40.mp4',
    category: 'traditional',
    section: 'MERDEKA FIREWORKS'
  },
  {
    id: 1069,
    name: { en: 'FD 15-36 MA DAO CHENG GONG (2.0) | FD 15-36 马到成功 (2.0)', ms: 'FD 15-36 MA DAO CHENG GONG (2.0) | FD 15-36 马到成功 (2.0)' },
    price: 600,
    image: 'https://res.cloudinary.com/de8w3ykvy/image/upload/v1753258283/mci_product/mci_product/mci_41_HP-011_156_FD_15-36_MA_DAO_CHENG_GONG_20.jpg',
    videoUrl: 'https://res.cloudinary.com/de8w3ykvy/video/upload/v1753306843/mci_product/mci_video_row_41.mp4',
    category: 'traditional',
    section: 'MERDEKA FIREWORKS'
  },
  {
    id: 1070,
    name: { en: 'FD 15-49 DING FENG XIANG JIAN (2.0)', ms: 'FD 15-49 DING FENG XIANG JIAN (2.0)' },
    price: 600,
    image: 'https://res.cloudinary.com/de8w3ykvy/image/upload/v1753258285/mci_product/mci_product/mci_42_HP-012_157_FD_15-49_DING_FENG_XIANG_JIAN.jpg',
    videoUrl: 'https://res.cloudinary.com/de8w3ykvy/video/upload/v1753306883/mci_product/mci_video_row_42.mp4',
    category: 'traditional',
    section: 'MERDEKA FIREWORKS'
  },
  {
    id: 1071,
    name: { en: 'FD 15-187V HAO MEN SHENG YAN (combine2box in1)', ms: 'FD 15-187V HAO MEN SHENG YAN (combine2box in1)' },
    price: 600,
    image: 'https://res.cloudinary.com/de8w3ykvy/image/upload/v1753258365/mci_product/mci_product/mci_43_HP-013_158_FD_15-187V_HAO_MEN_SHENG_YAN_.jpg',
    videoUrl: 'https://res.cloudinary.com/de8w3ykvy/video/upload/v1753306930/mci_product/mci_video_row_43.mp4',
    category: 'traditional',
    section: 'MERDEKA FIREWORKS'
  },
  {
    id: 1072,
    name: { en: 'FD 1.5-88 HUANG JIN WAN LIANG', ms: 'FD 1.5-88 HUANG JIN WAN LIANG' },
    price: 600,
    image: 'https://res.cloudinary.com/de8w3ykvy/image/upload/v1753258368/mci_product/mci_product/mci_44_HP-014_159_FD_15-88_HUANG_JIN_WAN_LIANG_.jpg',
    videoUrl: 'https://res.cloudinary.com/de8w3ykvy/video/upload/v1753306970/mci_product/mci_video_row_44.mp4',
    category: 'traditional',
    section: 'MERDEKA FIREWORKS'
  },
  {
    id: 1073,
    name: { en: 'FD 1.5-138 YI WAN FU WENG', ms: 'FD 1.5-138 YI WAN FU WENG' },
    price: 600,
    image: 'https://res.cloudinary.com/de8w3ykvy/image/upload/v1753258370/mci_product/mci_product/mci_45_HP-015_160_FD_15-138_YI_WAN_FU_WENG__FD_.jpg',
    videoUrl: 'https://res.cloudinary.com/de8w3ykvy/video/upload/v1753307002/mci_product/mci_video_row_45.mp4',
    category: 'traditional',
    section: 'MERDEKA FIREWORKS'
  },
  {
    id: 1074,
    name: { en: 'HAPPY 9-276 HE TIAN XIA (combine2box in1)', ms: 'HAPPY 9-276 HE TIAN XIA (combine2box in1)' },
    price: 600,
    image: 'https://res.cloudinary.com/de8w3ykvy/image/upload/v1753258372/mci_product/mci_product/mci_46_FW-001_137_HAPPY_9-276_HE_TIAN_XIA_combi.jpg',
    videoUrl: 'https://res.cloudinary.com/de8w3ykvy/video/upload/v1753307087/mci_product/mci_video_row_46.mp4',
    category: 'traditional',
    section: 'MERDEKA FIREWORKS'
  },
  {
    id: 1075,
    name: { en: 'HAPPY 10-98 HUAN LE XUAN CAI (combine2in1)', ms: 'HAPPY 10-98 HUAN LE XUAN CAI (combine2in1)' },
    price: 600,
    image: 'https://res.cloudinary.com/de8w3ykvy/image/upload/v1753258375/mci_product/mci_product/mci_47_FW-002_138_HAPPY_10-98_HUAN_LE_XUAN_CAI_.jpg',
    videoUrl: 'https://res.cloudinary.com/de8w3ykvy/video/upload/v1753307145/mci_product/mci_video_row_47.mp4',
    category: 'traditional',
    section: 'MERDEKA FIREWORKS'
  },
  {
    id: 1076,
    name: { en: 'HAPPY 10-138 HUAN LE YAN YU', ms: 'HAPPY 10-138 HUAN LE YAN YU' },
    price: 600,
    image: 'https://res.cloudinary.com/de8w3ykvy/image/upload/v1753258377/mci_product/mci_product/mci_48_FW-003_139_HAPPY_10-138_HUAN_LE_YAN_YU__.jpg',
    videoUrl: 'https://res.cloudinary.com/de8w3ykvy/video/upload/v1753307174/mci_product/mci_video_row_48.mp4',
    category: 'traditional',
    section: 'MERDEKA FIREWORKS'
  },
  {
    id: 1077,
    name: { en: 'HAPPY 10-138V HUAN LE ZUI MEI', ms: 'HAPPY 10-138V HUAN LE ZUI MEI' },
    price: 600,
    image: 'https://res.cloudinary.com/de8w3ykvy/image/upload/v1753258380/mci_product/mci_product/mci_49_FW-004_140_HAPPY_10-138V_HUAN_LE_ZUI_MEI.jpg',
    videoUrl: 'https://res.cloudinary.com/de8w3ykvy/video/upload/v1753307210/mci_product/mci_video_row_49.mp4',
    category: 'traditional',
    section: 'MERDEKA FIREWORKS'
  },
  {
    id: 1078,
    name: { en: 'HAPPY 10-138V HUAN LE WAN JIA', ms: 'HAPPY 10-138V HUAN LE WAN JIA' },
    price: 600,
    image: 'https://res.cloudinary.com/de8w3ykvy/image/upload/v1753258382/mci_product/mci_product/mci_50_FW-005_141_HAPPY_10-138V_HUAN_LE_WAN_JIA.jpg',
    videoUrl: 'https://res.cloudinary.com/de8w3ykvy/video/upload/v1753307243/mci_product/mci_video_row_50.mp4',
    category: 'traditional',
    section: 'MERDEKA FIREWORKS'
  },
  {
    id: 1079,
    name: { en: 'HAPPY 11-276 DING JI FU HAO (combine2box in1)', ms: 'HAPPY 11-276 DING JI FU HAO (combine2box in1)' },
    price: 600,
    image: 'https://res.cloudinary.com/de8w3ykvy/image/upload/v1753258385/mci_product/mci_product/mci_51_FW-006_142_HAPPY_11-276_DING_JI_FU_HAO_c.jpg',
    videoUrl: 'https://res.cloudinary.com/de8w3ykvy/video/upload/v1753307294/mci_product/mci_video_row_51.mp4',
    category: 'traditional',
    section: 'MERDEKA FIREWORKS'
  },
  {
    id: 1080,
    name: { en: 'HAPPY 11-414 HUAN LE ZHI ZUN (combine3box in1)', ms: 'HAPPY 11-414 HUAN LE ZHI ZUN (combine3box in1)' },
    price: 600,
    image: 'https://res.cloudinary.com/de8w3ykvy/image/upload/v1753258391/mci_product/mci_product/mci_52_FW-007_143_HAPPY_11-414_HUAN_LE_ZHI_ZUN_.jpg',
    videoUrl: 'https://res.cloudinary.com/de8w3ykvy/video/upload/v1753328702/mci_product/mci_video_row_52.mp4',
    category: 'traditional',
    section: 'MERDEKA FIREWORKS'
  },
  {
    id: 1081,
    name: { en: 'HAPPY 12-49 HUA MAN LOU | HAPPY 12-49 花满楼', ms: 'HAPPY 12-49 HUA MAN LOU | HAPPY 12-49 花满楼' },
    price: 600,
    image: 'https://res.cloudinary.com/de8w3ykvy/image/upload/v1753258395/mci_product/mci_product/mci_53_FW-008_144_HAPPY_12-49_HUA_MAN_LOU_%C2%A0HAPP.jpg',
    videoUrl: 'https://res.cloudinary.com/de8w3ykvy/video/upload/v1753328774/mci_product/mci_video_row_53.mp4',
    category: 'traditional',
    section: 'MERDEKA FIREWORKS'
  },
  {
    id: 1082,
    name: { en: 'HAPPY 12-138 DA SHI JIE', ms: 'HAPPY 12-138 DA SHI JIE' },
    price: 600,
    image: 'https://res.cloudinary.com/de8w3ykvy/image/upload/v1753258397/mci_product/mci_product/mci_54_FW-009_145_HAPPY_12-138_DA_SHI_JIE__HAPP.jpg',
    videoUrl: 'https://res.cloudinary.com/de8w3ykvy/video/upload/v1753328868/mci_product/mci_video_row_54.mp4',
    category: 'traditional',
    section: 'MERDEKA FIREWORKS'
  },
  {
    id: 1083,
    name: { en: '4&quot;16 Shoot Cake', ms: '4&quot;16 Shoot Cake' },
    price: 600,
    image: 'https://res.cloudinary.com/de8w3ykvy/image/upload/v1753258399/mci_product/mci_product/mci_55_MF-001_123_4quot16_Shoot_Cake__4%E5%AF%B8%E9%AB%9816%E5%8F%91%E7%9B%86%E8%8A%B1.jpg',
    videoUrl: 'https://res.cloudinary.com/de8w3ykvy/video/upload/v1753328919/mci_product/mci_video_row_55.mp4',
    category: 'traditional',
    section: 'MERDEKA FIREWORKS'
  },
  {
    id: 1084,
    name: { en: '4&quot;25 Shoot Cake', ms: '4&quot;25 Shoot Cake' },
    price: 600,
    image: 'https://res.cloudinary.com/de8w3ykvy/image/upload/v1753258402/mci_product/mci_product/mci_56_MF-002_124_4quot25_Shoot_Cake__4%E5%AF%B8%E9%AB%9825%E5%8F%91%E7%9B%86%E8%8A%B1.jpg',
    videoUrl: 'https://res.cloudinary.com/de8w3ykvy/video/upload/v1753328949/mci_product/mci_video_row_56.mp4',
    category: 'traditional',
    section: 'MERDEKA FIREWORKS'
  },
  {
    id: 1085,
    name: { en: '4&quot;36 Shoot Cake', ms: '4&quot;36 Shoot Cake' },
    price: 600,
    image: 'https://res.cloudinary.com/de8w3ykvy/image/upload/v1753258405/mci_product/mci_product/mci_57_MF-003_125_4quot36_Shoot_Cake__4%E5%AF%B8%E9%AB%9836%E5%8F%91%E7%9B%86%E8%8A%B1.jpg',
    videoUrl: 'https://res.cloudinary.com/de8w3ykvy/video/upload/v1753328967/mci_product/mci_video_row_57.mp4',
    category: 'traditional',
    section: 'MERDEKA FIREWORKS'
  },
  {
    id: 1086,
    name: { en: '4&quot;49 Shoot Cake', ms: '4&quot;49 Shoot Cake' },
    price: 600,
    image: 'https://res.cloudinary.com/de8w3ykvy/image/upload/v1753258408/mci_product/mci_product/mci_58_MF-004_126_4quot49_Shoot_Cake__4%E5%AF%B8%E9%AB%9849%E5%8F%91%E7%9B%86%E8%8A%B1.jpg',
    videoUrl: 'https://res.cloudinary.com/de8w3ykvy/video/upload/v1753328985/mci_product/mci_video_row_58.mp4',
    category: 'traditional',
    section: 'MERDEKA FIREWORKS'
  },
  {
    id: 1087,
    name: { en: '4&quot;88 Shoot Cake', ms: '4&quot;88 Shoot Cake' },
    price: 600,
    image: 'https://res.cloudinary.com/de8w3ykvy/image/upload/v1753258410/mci_product/mci_product/mci_59_MF-005_127_4quot88_Shoot_Cake__4%E5%AF%B8%E9%AB%9888%E5%8F%91%E7%9B%86%E8%8A%B1.jpg',
    videoUrl: 'https://res.cloudinary.com/de8w3ykvy/video/upload/v1753329017/mci_product/mci_video_row_59.mp4',
    category: 'traditional',
    section: 'MERDEKA FIREWORKS'
  },
  {
    id: 1088,
    name: { en: '4&quot;138 Shoot Cake', ms: '4&quot;138 Shoot Cake' },
    price: 600,
    image: 'https://res.cloudinary.com/de8w3ykvy/image/upload/v1753258412/mci_product/mci_product/mci_60_MF-006_128_4quot138_Shoot_Cake__4%E5%AF%B8%E9%AB%98138%E5%8F%91%E7%9B%86.jpg',
    videoUrl: 'https://res.cloudinary.com/de8w3ykvy/video/upload/v1753329063/mci_product/mci_video_row_60.mp4',
    category: 'traditional',
    section: 'MERDEKA FIREWORKS'
  },
  {
    id: 1089,
    name: { en: '8&quot;49 Shoot Cake', ms: '8&quot;49 Shoot Cake' },
    price: 600,
    image: 'https://res.cloudinary.com/de8w3ykvy/image/upload/v1753258418/mci_product/mci_product/mci_61_MF-007_129_8quot49_Shoot_Cake__8%E5%AF%B8%E9%AB%9849%E5%8F%91%E7%9B%86%E8%8A%B1.jpg',
    videoUrl: 'https://res.cloudinary.com/de8w3ykvy/video/upload/v1753329093/mci_product/mci_video_row_61.mp4',
    category: 'traditional',
    section: 'MERDEKA FIREWORKS'
  },
  {
    id: 1090,
    name: { en: '8&quot;138 Shoot Cake', ms: '8&quot;138 Shoot Cake' },
    price: 600,
    image: 'https://res.cloudinary.com/de8w3ykvy/image/upload/v1753258422/mci_product/mci_product/mci_62_MF-008_130_8quot138_Shoot_Cake__8%E5%AF%B8%E9%AB%98138%E5%8F%91%E7%9B%86.jpg',
    videoUrl: 'https://res.cloudinary.com/de8w3ykvy/video/upload/v1753329502/mci_product/mci_video_row_62.mp4',
    category: 'traditional',
    section: 'MERDEKA FIREWORKS'
  },
  {
    id: 1091,
    name: { en: '9&quot;88 Shoot Cake', ms: '9&quot;88 Shoot Cake' },
    price: 600,
    image: 'https://res.cloudinary.com/de8w3ykvy/image/upload/v1753258425/mci_product/mci_product/mci_63_MF-009_131_9quot88_Shoot_Cake__9%E5%AF%B8%E9%AB%9888%E5%8F%91%E7%9B%86%E8%8A%B1.jpg',
    videoUrl: 'https://res.cloudinary.com/de8w3ykvy/video/upload/v1753329547/mci_product/mci_video_row_63.mp4',
    category: 'traditional',
    section: 'MERDEKA FIREWORKS'
  },
  {
    id: 1092,
    name: { en: '9&quot;138 Shoot Cake Box', ms: '9&quot;138 Shoot Cake Box' },
    price: 600,
    image: 'https://res.cloudinary.com/de8w3ykvy/image/upload/v1753258429/mci_product/mci_product/mci_64_MF-010_132_9quot138_Shoot_Cake_Box__9%E5%AF%B8%E9%AB%981.jpg',
    videoUrl: 'https://res.cloudinary.com/de8w3ykvy/video/upload/v1753329620/mci_product/mci_video_row_64.mp4',
    category: 'traditional',
    section: 'MERDEKA FIREWORKS'
  },
  {
    id: 1093,
    name: { en: '4&quot;138 Shoot Cake (3 type)', ms: '4&quot;138 Shoot Cake (3 type)' },
    price: 600,
    image: 'https://res.cloudinary.com/de8w3ykvy/image/upload/v1753258431/mci_product/mci_product/mci_65_MF-011_133_4quot138_Shoot_Cake_3_type__4.jpg',
    videoUrl: 'https://res.cloudinary.com/de8w3ykvy/video/upload/v1753329686/mci_product/mci_video_row_65.mp4',
    category: 'traditional',
    section: 'MERDEKA FIREWORKS'
  },
  {
    id: 1094,
    name: { en: '4&quot;138 Shoot Cake (V Shape）box - 4138V  | 4寸高138发彩盒装 异形盆花', ms: '4&quot;138 Shoot Cake (V Shape）box - 4138V  | 4寸高138发彩盒装 异形盆花' },
    price: 600,
    image: 'https://res.cloudinary.com/de8w3ykvy/image/upload/v1753258434/mci_product/mci_product/mci_66_MF-012_134%C2%A04quot138%C2%A0Shoot_Cake_V_Shapebo.jpg',
    videoUrl: 'https://res.cloudinary.com/de8w3ykvy/video/upload/v1753329796/mci_product/mci_video_row_66.mp4',
    category: 'traditional',
    section: 'MERDEKA FIREWORKS'
  },
  {
    id: 1095,
    name: { en: '5&quot;138 Shoot Cake (V Shape) Box - 5138V', ms: '5&quot;138 Shoot Cake (V Shape) Box - 5138V' },
    price: 600,
    image: 'https://res.cloudinary.com/de8w3ykvy/image/upload/v1753258436/mci_product/mci_product/mci_67_MF-013_135_5quot138_Shoot_Cake_V_Shape_B.jpg',
    videoUrl: 'https://res.cloudinary.com/de8w3ykvy/video/upload/v1753331743/mci_product/mci_video_row_67_final.mp4',
    category: 'traditional',
    section: 'MERDEKA FIREWORKS'
  },
  {
    id: 1096,
    name: { en: '9&quot;25 Shoot Cake-Daylight Smoke Fireworks(4Colours)', ms: '9&quot;25 Shoot Cake-Daylight Smoke Fireworks(4Colours)' },
    price: 600,
    image: 'https://res.cloudinary.com/de8w3ykvy/image/upload/v1753258439/mci_product/mci_product/mci_68_MF-014_136_9quot25_Shoot_Cake-Daylight_S.jpg',
    videoUrl: 'https://res.cloudinary.com/de8w3ykvy/video/upload/v1753331776/mci_product/mci_video_row_68_final.mp4',
    category: 'traditional',
    section: 'MERDEKA FIREWORKS'
  }
];

export const sections = [
  'POP-POP',
  'ROCKET SKY SHOW',
  'RED DRAGON FIRECRACKERS',
  'SPARKLE & SHINE - KIDS" FAVORITE FIREWORKS!',
  'KIDS" FIRECRACKERS',
  'MERDEKA FIREWORKS'
];

// Transform fireworksData to Product format
const transformToProducts = (data: FireworkProduct[]): Product[] => {
  return data.map(item => ({
    id: item.id.toString(),
    name: item.name.en, // Use English name by default
    price: item.price,
    image: item.image,
    video: item.videoUrl,
    category: item.section,
    section: item.section
  }));
};

// Create categories from the fireworks data
export const categories: Category[] = sections.map(section => ({
  name: section,
  products: transformToProducts(fireworksData.filter(item => item.section === section))
}));