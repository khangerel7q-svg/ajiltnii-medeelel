"use client";

import { useState, useEffect, useCallback, useRef, useMemo } from "react";

// ─── STORAGE ──────────────────────────────────────────────────────────────────
const STORAGE_KEY = "employees";
const SETTINGS_KEY = "companySettings";

const getEmployees = () => {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
  } catch {
    return [];
  }
};
const saveEmployees = (data) =>
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));

const getSettings = () => {
  try {
    return (
      JSON.parse(localStorage.getItem(SETTINGS_KEY)) || { name: "", id: "" }
    );
  } catch {
    return { name: "", id: "" };
  }
};
const saveSettingsData = (data) =>
  localStorage.setItem(SETTINGS_KEY, JSON.stringify(data));

// ─── DEFAULT EMPLOYEES (script.js-аас авав) ───────────────────────────────────
const DEFAULT_EMPLOYEES = [
  {
    id: 1,
    lastName: "Нямсүрэн",
    firstName: "Нарантуяа",
    username: "Нарантуяа",
    password: "narantuya0425",
    employeeId: "7004849282",
    gmail: "nmsnnarntuya@gmail.com",
    phone: "+98081324",
    createdAt: "2020-01-01",
  },
  {
    id: 2,
    lastName: "Болортуяа",
    firstName: ".",
    username: "Болортуяа",
    password: "bolortuya0509",
    employeeId: "7004860982",
    gmail: "Bbolortuya.0509@gmail.com",
    phone: "+90902979",
    createdAt: "2020",
  },
  {
    id: 3,
    lastName: "Болдбаатар",
    firstName: "Оюуннаран",
    username: "Оюуннаран",
    password: "ouynnaran1020",
    employeeId: "7005000501",
    gmail: "goviinnaran@yahoo.com",
    phone: "+99030695",
    createdAt: "2020-11",
  },
  {
    id: 4,
    lastName: "Байланч",
    firstName: "Алтанцэцэг",
    username: "Алтанцэцэг",
    password: "altaa0908",
    employeeId: "7005001645",
    gmail: "altantsesteg.b@gmail.com",
    phone: "+99126326",
    createdAt: "2020-11",
  },
  {
    id: 5,
    lastName: "bayndalai",
    firstName: "Bayrtsetseg",
    username: "Bayrtsetseg",
    password: "meegii0703",
    employeeId: "70050332",
    gmail: "meeg-bat@yahoo.com",
    phone: "+99276019",
    createdAt: "2020",
  },
  {
    id: 6,
    lastName: "",
    firstName: "Дээгий",
    username: "Дээгий",
    password: "delgermaa1230",
    employeeId: "7004870700",
    gmail: "ndlg-deko@yahoo.com",
    phone: "99290413",
    createdAt: "2020",
  },
  {
    id: 7,
    lastName: "Баатарсайхан",
    firstName: "Хүслэн",
    username: "Хүслэн",
    password: "Khuslen0606",
    employeeId: "7004877260",
    gmail: "bkhuslen82@gmail.com",
    phone: "+93081324",
    createdAt: "2020",
  },
  {
    id: 8,
    lastName: "",
    firstName: "Болороо",
    username: "Болороо",
    password: "",
    employeeId: "7004979962",
    gmail: "tsemtsger0809@gmail.com",
    phone: "+89989589",
    createdAt: "2020",
  },
  {
    id: 9,
    lastName: "Мөнгөн мандал",
    firstName: "Цэвээням",
    username: "Цэвээням",
    password: "tseegii0907",
    employeeId: "7006015621",
    gmail: "tseegii69@yahoo.com",
    phone: "+96658051",
    createdAt: "2020",
  },
  {
    id: 10,
    lastName: "Мөнхбаяр",
    firstName: "Нямжаргал",
    username: "Нямжаргал",
    password: "nyamka1004",
    employeeId: "7005259544",
    gmail: "infantstoddlers.shop@gmail.com",
    phone: "+94004401",
    createdAt: "2020",
  },
  {
    id: 11,
    lastName: "Эрдэнбаатар",
    firstName: "Энхжин",
    username: "Энхжин",
    password: "BE050607",
    employeeId: "7005037342",
    gmail: "enkhjin_0506@gmail.com",
    phone: "+99316626",
    createdAt: "",
  },
  {
    id: 12,
    lastName: "Бааваа",
    firstName: "Оргилмаа",
    username: "Оргилмаа",
    password: "orgil0608",
    employeeId: "7008287754",
    gmail: "orgiluun0608@icloud.com",
    phone: "+99903225",
    createdAt: "2020",
  },
  {
    id: 13,
    lastName: "Жамьяндорж",
    firstName: "Эрдэнэцацрал",
    username: "Эрдэнэцацрал",
    password: "tsatsaa0424",
    employeeId: "7005489912",
    gmail: "eerdenetsatsral07@gmail.com",
    phone: "+88383424",
    createdAt: "2020",
  },
  {
    id: 14,
    lastName: "",
    firstName: "Tungalag",
    username: "Tungalag",
    password: "tungaa0515",
    employeeId: "7017645518",
    gmail: "Tungalg-shar@yahoo.com",
    phone: "+99090483",
    createdAt: "2020",
  },
  {
    id: 15,
    lastName: "Баатар",
    firstName: "Ууганцэцэг",
    username: "Ууганцэцэг",
    password: "uugaa0731",
    employeeId: "7006604142",
    gmail: "Hena.уугаа@yahoo.com",
    phone: "+88847374",
    createdAt: "2020",
  },
  {
    id: 16,
    lastName: "Ориг",
    firstName: "Мягмарсүрэн",
    username: "Мягмарсүрэн",
    password: "miga0218",
    employeeId: "7006114852",
    gmail: "boldmyagmarsuren44@gmail.com",
    phone: "+99232424",
    createdAt: "2020",
  },
  {
    id: 17,
    lastName: "Мөнхтуяа",
    firstName: "Нямаа",
    username: "Нямаа",
    password: "?",
    employeeId: "7006423771",
    gmail: "?@gmail.com",
    phone: "+99160594",
    createdAt: "2020",
  },
  {
    id: 18,
    lastName: "Түгж",
    firstName: "Ямаа",
    username: "Ямаа",
    password: "nyam0504",
    employeeId: "7007018123",
    gmail: "nargerel13@gmail.com",
    phone: "+93089888",
    createdAt: "2020",
  },
  {
    id: 19,
    lastName: "Баяндалай",
    firstName: "Баярмаа",
    username: "Баярмаа",
    password: "bayrmaa0502",
    employeeId: "7006408567",
    gmail: "Bayrmaanlm@gmail.com",
    phone: "+99036393",
    createdAt: "2020",
  },
  {
    id: 20,
    lastName: "Лхагвасүрэн",
    firstName: "Нямсүрэн",
    username: "Нямсүрэн2",
    password: "nyamaa0814",
    employeeId: "7006531411",
    gmail: "nnyamsurenn@gmail.com",
    phone: "+90081214",
    createdAt: "2021-02-10",
  },
  {
    id: 21,
    lastName: "Мандал",
    firstName: "Тайван",
    username: "Тайван",
    password: "taivan0419",
    employeeId: "7006531786",
    gmail: "jsd_shop2015@yahoo.com",
    phone: "+99004717",
    createdAt: "2021-02-10",
  },
  {
    id: 22,
    lastName: "Энхбаяр",
    firstName: "Нямцэрэн",
    username: "Нямцэрэн",
    password: "nyamaa0723",
    employeeId: "7006683993",
    gmail: "Enkhbayar.nyamtseren@gmail.com",
    phone: "+99409999",
    createdAt: "2021",
  },
  {
    id: 23,
    lastName: "Хорлоо",
    firstName: "Цагаантогоо",
    username: "Цагаантогоо",
    password: "tsagaan1212",
    employeeId: "7006605200",
    gmail: "khtsagaantogoo@gmail.com",
    phone: "+99156371",
    createdAt: "2021",
  },
  {
    id: 24,
    lastName: "Ганбаатар",
    firstName: "Мягмарсүрэн2",
    username: "Мягмарсүрэн3",
    password: "miga0722",
    employeeId: "7006607745",
    gmail: "ganbaatar@gmail.com",
    phone: "+99716551",
    createdAt: "2021",
  },
  {
    id: 25,
    lastName: "Бямбасүрэн",
    firstName: "Мөнхцэцэг",
    username: "Мөнхцэцэг",
    password: "muujig8905",
    employeeId: "7019968768",
    gmail: "munkhtsetseg8905@yahoo.com",
    phone: "+80766816",
    createdAt: "2021",
  },
  {
    id: 26,
    lastName: "Нямсүрэн",
    firstName: "Наранчимэг",
    username: "Наранчимэг",
    password: "chimun0427",
    employeeId: "7007239698",
    gmail: "higerel@yahoo.com",
    phone: "+88570844",
    createdAt: "2021",
  },
  {
    id: 27,
    lastName: "Нямсүрэн",
    firstName: "Наранжаргал",
    username: "Наранжаргал",
    password: "jagaa0608",
    employeeId: "7007260701",
    gmail: "Naranjargalan@yahoo.com",
    phone: "+99126480",
    createdAt: "2021",
  },
  {
    id: 28,
    lastName: "Цэдэвсүрэн",
    firstName: "Оюун эрдэнэ",
    username: "Оюун эрдэнэ",
    password: "ningee0304",
    employeeId: "7007240014",
    gmail: "ts.ouyn34@gmail.com",
    phone: "+99599459",
    createdAt: "2016-08-24",
  },
  {
    id: 29,
    lastName: "Цэдэвсүрэн",
    firstName: "Оюун сувд",
    username: "Оюун сувд",
    password: "suvdaa9214",
    employeeId: "7007298028",
    gmail: "suvdaa9214@gmail.com",
    phone: "+99338171",
    createdAt: "",
  },
  {
    id: 30,
    lastName: "Түмэнжаргал",
    firstName: "Мөнгөнсор",
    username: "Мөнгөнсор",
    password: "89895941a",
    employeeId: "7007342888",
    gmail: "mongonsor@gmail.com",
    phone: "+89895941",
    createdAt: "",
  },
  {
    id: 31,
    lastName: "Төмөрбаатар",
    firstName: "Мөнхдэлгэр",
    username: "Мөнхдэлгэр",
    password: "delger0401",
    employeeId: "7007399514",
    gmail: "tmonkhdelger@gmail.com",
    phone: "+80291996",
    createdAt: "",
  },
  {
    id: 32,
    lastName: "Эрдэнэбат",
    firstName: "Уянга",
    username: "Уянга",
    password: "uyanga1116",
    employeeId: "7007447336",
    gmail: "икашик19@gmail.com",
    phone: "+95272197",
    createdAt: "",
  },
  {
    id: 33,
    lastName: "Уламдэлгэрийн",
    firstName: "Ирмүүнзаяа",
    username: "Ирмүүнзаяа",
    password: "irmuun0725",
    employeeId: "7007501852",
    gmail: "Irmuunzaya@gmail.com",
    phone: "+94352570",
    createdAt: "",
  },
  {
    id: 34,
    lastName: "Отгонбаяр",
    firstName: "Бүтинлхам",
    username: "Бүтинлхам",
    password: "buie0302",
    employeeId: "7007526825",
    gmail: "butinlkham@gmail.com",
    phone: "+90400302",
    createdAt: "",
  },
  {
    id: 35,
    lastName: "Бат очир",
    firstName: "Хонгорзул",
    username: "Хонгорзул",
    password: "hongor0401",
    employeeId: "7007534698",
    gmail: "hongoroobatochir@gmail.com",
    phone: "+99684051",
    createdAt: "",
  },
  {
    id: 36,
    lastName: "Гомбо",
    firstName: "Энхтуяа",
    username: "Энхтуяа2",
    password: "enhee1121",
    employeeId: "7007565616",
    gmail: "enhtuyagombo@yahoo.com",
    phone: "+88070326",
    createdAt: "",
  },
  {
    id: 37,
    lastName: "Очирсайхан",
    firstName: "Мөнхдэжид",
    username: "Мөнхдэжид",
    password: "dejid0322",
    employeeId: "700755016",
    gmail: "omonhdejid@gmail.com",
    phone: "+88333296",
    createdAt: "",
  },
  {
    id: 38,
    lastName: "Болд",
    firstName: "Хишигдорж",
    username: "Хишигдорж",
    password: "hishgee1122",
    employeeId: "7007670818",
    gmail: "khishihdorj2021@gmail.com",
    phone: "+88446669",
    createdAt: "2021",
  },
  {
    id: 39,
    lastName: "Амгаланбаатар",
    firstName: "Нарангэрэл",
    username: "Нарангэрэл",
    password: "naraa0210",
    employeeId: "7007674479",
    gmail: "narangerelumgalanbattar9@gmail.com",
    phone: "+99445664",
    createdAt: "",
  },
  {
    id: 40,
    lastName: "Даваа",
    firstName: "Өнөржаргал",
    username: "Өнөржаргал",
    password: "uunuu1016",
    employeeId: "7007703344",
    gmail: "onoerjargal@gmail.com",
    phone: "+87101666",
    createdAt: "2021-05-06",
  },
  {
    id: 41,
    lastName: "Баасандорж",
    firstName: "Дэлгэрмаа",
    username: "Дэлгэрмаа",
    password: "deegii0424",
    employeeId: "7007778551",
    gmail: "geegii0424@gmail.com",
    phone: "+89958984",
    createdAt: "",
  },
  {
    id: 42,
    lastName: "Мөнхсайхан",
    firstName: "Номин",
    username: "Номин",
    password: "nomin0527",
    employeeId: "7007792908",
    gmail: "s.nomin0527@gmail.com",
    phone: "+99845459",
    createdAt: "",
  },
  {
    id: 43,
    lastName: "Баасандорж",
    firstName: "Хорлоо",
    username: "Хорлоо2",
    password: "khorloo0811",
    employeeId: "7007860663",
    gmail: "b.khorloo1234@gmail.com",
    phone: "+93081103",
    createdAt: "",
  },
  {
    id: 44,
    lastName: "Түмэнжаргал",
    firstName: "Гүрагчаа",
    username: "Гүрагчаа",
    password: "guree0506",
    employeeId: "7007848171",
    gmail: "Gureeguree0506@gmail.com",
    phone: "+89787337",
    createdAt: "",
  },
  {
    id: 45,
    lastName: "Даваа",
    firstName: "Отгонцэцэг",
    username: "Отгонцэцэг",
    password: "otgoo0929",
    employeeId: "7007861458",
    gmail: "Otgontsetseg.d91@gmail.com",
    phone: "+88095801",
    createdAt: "",
  },
  {
    id: 46,
    lastName: "Эрдэнэбилэг",
    firstName: "Сосорбурам",
    username: "Сосорбурам",
    password: "?",
    employeeId: "7008233638",
    gmail: "eesosorburam@gmail.com",
    phone: "+89124070",
    createdAt: "",
  },
  {
    id: 47,
    lastName: "Нямсүрэн",
    firstName: "Энхчимэг",
    username: "Энхчимэг",
    password: "enhee1226",
    employeeId: "7008576302",
    gmail: "naraaenhchimeg1226@gmail.com",
    phone: "+99727124",
    createdAt: "",
  },
  {
    id: 48,
    lastName: "Хишигжаргал",
    firstName: "Лхагвасүрэн",
    username: "Лхагвасүрэн2",
    password: "lhagva1208",
    employeeId: "7008580938",
    gmail: "Lkhagavaa@gmail.com",
    phone: "+80298287",
    createdAt: "",
  },
  {
    id: 49,
    lastName: "Бодьгэрэл",
    firstName: "Одонгэрэл",
    username: "Одонгэрэл",
    password: "odongerel360",
    employeeId: "7020190788",
    gmail: "odongerel.bodigerel89@gmail.com",
    phone: "+99117716",
    createdAt: "",
  },
  {
    id: 50,
    lastName: "Баасанжав",
    firstName: "Болормаа",
    username: "Болормаа2",
    password: "bolor111",
    employeeId: "7008969525",
    gmail: "bolormaa@gmail.com",
    phone: "+88099949",
    createdAt: "",
  },
  {
    id: 51,
    lastName: "Мягмар",
    firstName: "Оюун билэг",
    username: "Оюун билэг",
    password: "oyubileg0522",
    employeeId: "7008749029",
    gmail: "oyubilegmygmar@gmail.com",
    phone: "+94117599",
    createdAt: "",
  },
  {
    id: 52,
    lastName: "Нямдорж",
    firstName: "Цэрэннадмид",
    username: "Цэрэннадмид",
    password: "nadia0310",
    employeeId: "7007848761",
    gmail: "ntserennadmid@gmail.com",
    phone: "+89031011",
    createdAt: "",
  },
  {
    id: 53,
    lastName: "Бодьгэрэл",
    firstName: "Оюунгэрэл",
    username: "Оюунгэрэл",
    password: "oyunaa1217",
    employeeId: "7009051363",
    gmail: "oyunaa_tom@yahoo.com",
    phone: "+88032058",
    createdAt: "",
  },
  {
    id: 54,
    lastName: "Батжаргал",
    firstName: "Янжинлхам",
    username: "Янжинлхам",
    password: "yanjka0708",
    employeeId: "7008991091",
    gmail: "yanjka0708@gmail.com",
    phone: "+99212337",
    createdAt: "",
  },
  {
    id: 55,
    lastName: "Чулуунжав",
    firstName: "Батчимэг",
    username: "Батчимэг",
    password: "Chimgee1133",
    employeeId: "7011487870",
    gmail: "chimgee1126@gmail.com",
    phone: "+99091466",
    createdAt: "",
  },
  {
    id: 56,
    lastName: "Оргил",
    firstName: "Ариунзаяа",
    username: "Ариунзаяа",
    password: "ariun0516",
    employeeId: "7009051364",
    gmail: "Ariunzayaorgil@gmail.com",
    phone: "+99692222",
    createdAt: "",
  },
  {
    id: 57,
    lastName: "Мөнхзул",
    firstName: "Золзаяа",
    username: "Золзаяа",
    password: "zolzaya115",
    employeeId: "7009052170",
    gmail: "zolzayamunkhsul@gmail.com",
    phone: "+99917876",
    createdAt: "",
  },
  {
    id: 58,
    lastName: "Уламбаяр",
    firstName: "Мөнхзаяа",
    username: "Мөнхзаяа",
    password: "Za12020124",
    employeeId: "7009280558",
    gmail: "zzaya8794@gmail.com",
    phone: "+98153562",
    createdAt: "",
  },
  {
    id: 59,
    lastName: "Мягмарсүрэн",
    firstName: "Болорцэцэг",
    username: "Болорцэцэг",
    password: "boloroo0202",
    employeeId: "7009631344",
    gmail: "bolortsetseg@gmail.com",
    phone: "+boloroo0202",
    createdAt: "",
  },
  {
    id: 60,
    lastName: "Баатар",
    firstName: "Нэргүн",
    username: "Нэргүн",
    password: "nergui0315",
    employeeId: "7009494430",
    gmail: "gganba11@gmail.com",
    phone: "+8874323",
    createdAt: "",
  },
  {
    id: 61,
    lastName: "Сэрдсүрэн",
    firstName: "Нямсүрэн",
    username: "Нямсүрэн3",
    password: "nyam0612",
    employeeId: "701161766",
    gmail: "Khangal0805@gmail.com",
    phone: "+93089868",
    createdAt: "",
  },
  {
    id: 62,
    lastName: "Мөнгөрэл",
    firstName: "Даянбилгүүн",
    username: "Даянбилгүүн",
    password: "dayan0613",
    employeeId: "7010456871",
    gmail: "dayanbildgvun@gmail.com",
    phone: "+95720723",
    createdAt: "",
  },
  {
    id: 63,
    lastName: "Болд",
    firstName: "Оюунчимэг",
    username: "Оюунчимэг",
    password: "ouyanaa1130",
    employeeId: "7009737382",
    gmail: "cheegee@yahoo.com",
    phone: "+99194636",
    createdAt: "",
  },
  {
    id: 64,
    lastName: "Алтангэрэл",
    firstName: "Лхамсэржид",
    username: "Лхамсэржид",
    password: "lkhamaa6788",
    employeeId: "7009737976",
    gmail: "Lkhamaa6788@gmail.com",
    phone: "+99509111",
    createdAt: "",
  },
  {
    id: 65,
    lastName: "Отгон",
    firstName: "Энхтуяа",
    username: "Энхтуяа3",
    password: "enkhee0409",
    employeeId: "7009718834",
    gmail: "otgonenkhtuya@gmail.com",
    phone: "+99097431",
    createdAt: "",
  },
  {
    id: 66,
    lastName: "Наравбадам",
    firstName: "Одонтунгалаг",
    username: "Одонтунгалаг",
    password: "odnoo0423",
    employeeId: "7009754350",
    gmail: "odontungalag@gmail.com",
    phone: "+88524004",
    createdAt: "",
  },
  {
    id: 67,
    lastName: "Жалба",
    firstName: "Баярхүү",
    username: "Баярхүү",
    password: "",
    employeeId: "7009888001",
    gmail: "J.bayrhuu01@gmail.com",
    phone: "+88450303",
    createdAt: "",
  },
  {
    id: 68,
    lastName: "Жадамба",
    firstName: "Чулуунбаяр",
    username: "Чулуунбаяр",
    password: "chuk2688",
    employeeId: "7009964160",
    gmail: "chuk@yahoo.com",
    phone: "+99102688",
    createdAt: "",
  },
  {
    id: 69,
    lastName: "Саранчимэг",
    firstName: "Хонгорзул",
    username: "Хонгорзул2",
    password: "",
    employeeId: "7010066333",
    gmail: "zul396522@gmail.com",
    phone: "+86993340",
    createdAt: "",
  },
  {
    id: 70,
    lastName: "Бадамбазар",
    firstName: "Сумьяа",
    username: "Сумьяа",
    password: "suka0415",
    employeeId: "7010235801",
    gmail: "suka-suka@yahoo.com",
    phone: "+99859846",
    createdAt: "",
  },
  {
    id: 71,
    lastName: "Жаргал",
    firstName: "Энхтуул",
    username: "Энхтуул",
    password: "tuul0820",
    employeeId: "7010134580",
    gmail: "tuul6951@gmail.com",
    phone: "+88400114",
    createdAt: "",
  },
  {
    id: 72,
    lastName: "Бодь",
    firstName: "Очгэрэл",
    username: "Очгэрэл",
    password: "ochoo0307",
    employeeId: "7010161878",
    gmail: "ochgerel@gmail.com",
    phone: "+99118526",
    createdAt: "",
  },
  {
    id: 73,
    lastName: "Алтангэрэл",
    firstName: "Энхтуяа",
    username: "Энхтуяа4",
    password: "enkhee0404",
    employeeId: "7010076217",
    gmail: "altangerel.enkhtuya@gmail.com",
    phone: "+99190482",
    createdAt: "",
  },
  {
    id: 74,
    lastName: "Энхбаатар",
    firstName: "Ариунцэцэг",
    username: "Ариунцэцэг",
    password: "ariunka0114",
    employeeId: "7010164793",
    gmail: "ariunaa.enkh@gmail.com",
    phone: "+99013797",
    createdAt: "",
  },
  {
    id: 75,
    lastName: "Жадамба",
    firstName: "Чулуунсүрэн",
    username: "Чулуунсүрэн",
    password: "chuka0313",
    employeeId: "7010235651",
    gmail: "chukachuluunsvren0313@gmail.com",
    phone: "+99271862",
    createdAt: "",
  },
  {
    id: 76,
    lastName: "Дашдондог",
    firstName: "Батсүх",
    username: "Батсүх",
    password: "batsukh1972",
    employeeId: "7010443904",
    gmail: "Batsukhd@yahoo.com",
    phone: "+91186800",
    createdAt: "",
  },
  {
    id: 77,
    lastName: "Баатарсайхан",
    firstName: "Тэлмэн",
    username: "Тэлмэн",
    password: "telmen0601",
    employeeId: "7010234069",
    gmail: "tikanaraa0601@gmail.com",
    phone: "+98991324",
    createdAt: "",
  },
  {
    id: 78,
    lastName: "Рэндэв",
    firstName: "Цэрэнпил",
    username: "Цэрэнпил",
    password: "tserenpil0215",
    employeeId: "7010260184",
    gmail: "Cerenpilrender@gmail.com",
    phone: "+99290467",
    createdAt: "",
  },
  {
    id: 79,
    lastName: "Бүм",
    firstName: "Долгорлхам",
    username: "Долгорлхам",
    password: "doogii0122",
    employeeId: "7010292141",
    gmail: "doogii0122@icloud.com",
    phone: "+88886228",
    createdAt: "",
  },
  {
    id: 80,
    lastName: "Жамьяндорж",
    firstName: "Мөнгөнцэцэг",
    username: "Мөнгөнцэцэг",
    password: "Munguu1122",
    employeeId: "7010411905",
    gmail: "Munguu1122.1@gmail.com",
    phone: "+99222595",
    createdAt: "",
  },
  {
    id: 81,
    lastName: "Даваатөмөр",
    firstName: "Цэцэгмаа",
    username: "Цэцэгмаа",
    password: "tserka1230",
    employeeId: "7011830539",
    gmail: "Tsetsegmaa99146283@gmail.com",
    phone: "+95974959",
    createdAt: "",
  },
  {
    id: 82,
    lastName: "Дархижав",
    firstName: "Болормаа",
    username: "Болормаа3",
    password: "bolor926",
    employeeId: "7010445270",
    gmail: "bolor926@gmail.com",
    phone: "+99175142",
    createdAt: "",
  },
  {
    id: 83,
    lastName: "Балгансүрэн",
    firstName: "Гандолгор",
    username: "Гандолгор",
    password: "9",
    employeeId: "7010447290",
    gmail: "gandolgor.bal@gmail.com",
    phone: "+99000557",
    createdAt: "",
  },
  {
    id: 84,
    lastName: "Суманхүү",
    firstName: "Одончимэг",
    username: "Одончимэг",
    password: "odno0816",
    employeeId: "7010447819",
    gmail: "odno160893@gmail.com",
    phone: "+95989995",
    createdAt: "",
  },
  {
    id: 85,
    lastName: "Хатид",
    firstName: "Дэлгэрбат",
    username: "Дэлгэрбат",
    password: "delger1010",
    employeeId: "7010456044",
    gmail: "delgerbat@gmail.com",
    phone: "+95291770",
    createdAt: "",
  },
  {
    id: 86,
    lastName: "Ганбаатар",
  },
];

// ─── TOAST HOOK ───────────────────────────────────────────────────────────────
function useToast() {
  const [toast, setToast] = useState({ msg: "", type: "success", show: false });
  const timerRef = useRef(null);

  useEffect(() => {
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, []);

  const showToast = useCallback((msg, type = "success") => {
    if (timerRef.current) clearTimeout(timerRef.current);
    setToast({ msg, type, show: true });
    timerRef.current = setTimeout(() => {
      setToast({ msg: "", type: "success", show: false });
    }, 3000);
  }, []);

  return { toast, showToast };
}

// ─── EMPTY FORM ───────────────────────────────────────────────────────────────
const EMPTY_FORM = {
  lastName: "",
  firstName: "",
  username: "",
  password: "",
  employeeId: "",
  gmail: "",
  phone: "",
};

// ─── MAIN COMPONENT ───────────────────────────────────────────────────────────
export default function EmployeeSystem() {
  const [page, setPage] = useState("register");
  const [employees, setEmployees] = useState([]);
  const [settings, setSettings] = useState({ name: "", id: "" });
  const [settingsForm, setSettingsForm] = useState({ name: "", id: "" });
  const [form, setForm] = useState(EMPTY_FORM);
  const [showFormPwd, setShowFormPwd] = useState(false);
  const [visiblePwds, setVisiblePwds] = useState({});
  const [searchQ, setSearchQ] = useState("");
  const [showModal, setShowModal] = useState(false);
  const { toast, showToast } = useToast();

  // ─── INIT: localStorage + defaultEmployees ─────────────────────────────────
  useEffect(() => {
    const s = getSettings();
    setSettings(s);
    setSettingsForm(s);

    // script.js-ийн init() логик: хоосон бол default өгөгдөл суулгана
    if (getEmployees().length === 0) {
      saveEmployees(DEFAULT_EMPLOYEES);
    }
    setEmployees(getEmployees());
  }, []);

  // ─── HELPERS ──────────────────────────────────────────────────────────────
  const resetForm = useCallback(() => {
    setForm(EMPTY_FORM);
    setShowFormPwd(false);
  }, []);

  const upd = (field) => (e) =>
    setForm((p) => ({ ...p, [field]: e.target.value }));

  const updS = (field) => (e) =>
    setSettingsForm((p) => ({ ...p, [field]: e.target.value }));

  // ─── NEXT EMP ID SUGGESTION ───────────────────────────────────────────────
  const nextId = useMemo(() => {
    return "EMP-" + String(employees.length + 1).padStart(4, "0");
  }, [employees.length]);

  // ─── VALIDATE ─────────────────────────────────────────────────────────────
  const validate = useCallback(() => {
    const {
      lastName,
      firstName,
      username,
      password,
      employeeId,
      gmail,
      phone,
    } = form;
    if (
      !lastName ||
      !firstName ||
      !username ||
      !password ||
      !employeeId ||
      !gmail ||
      !phone
    )
      return "❌ Бүх талбарыг бөглөнө үү!";
    if (!gmail.includes("@")) return "❌ Gmail хаяг буруу байна!";
    if (employees.find((e) => e.username === username))
      return "❌ Энэ username бүртгэлтэй байна!";
    if (employees.find((e) => e.employeeId === employeeId))
      return "❌ Энэ ажилтны ID бүртгэлтэй байна!";
    return null;
  }, [form, employees]);

  // ─── SAVE EMPLOYEE ────────────────────────────────────────────────────────
  const saveEmployee = () => {
    const error = validate();
    if (error) return showToast(error, "error");
    const emp = {
      ...form,
      id: Date.now(),
      createdAt: new Date().toLocaleDateString("mn-MN"),
    };
    const updated = [...employees, emp];
    setEmployees(updated);
    saveEmployees(updated);
    resetForm();
    showToast("✅ Бүртгэл амжилттай хадгалагдлаа!", "success");
  };

  // ─── DELETE ───────────────────────────────────────────────────────────────
  const deleteEmployee = useCallback(
    (id) => {
      const updated = employees.filter((e) => e.id !== id);
      setEmployees(updated);
      saveEmployees(updated);
      showToast("🗑 Бүртгэл устгагдлаа", "success");
    },
    [employees, showToast],
  );

  // ─── SETTINGS SAVE ────────────────────────────────────────────────────────
  const handleSaveSettings = () => {
    saveSettingsData(settingsForm);
    setSettings(settingsForm);
    showToast("✅ Тохиргоо хадгалагдлаа!", "success");
  };

  const handleClearAll = () => {
    saveEmployees([]);
    setEmployees([]);
    setShowModal(false);
    showToast("🗑 Бүх бүртгэл устгагдлаа", "success");
  };

  // ─── SEARCH / FILTER ──────────────────────────────────────────────────────
  const filtered = useMemo(() => {
    const q = searchQ.toLowerCase();
    return employees.filter(
      (e) =>
        !q ||
        `${e.lastName} ${e.firstName}`.toLowerCase().includes(q) ||
        e.username.toLowerCase().includes(q) ||
        e.employeeId.toLowerCase().includes(q) ||
        e.gmail.toLowerCase().includes(q) ||
        e.phone.includes(q),
    );
  }, [employees, searchQ]);

  // ─── RENDER ───────────────────────────────────────────────────────────────
  return (
    <div className="wrapper">
      {/* ── HEADER ── */}
      <header>
        <div className="logo">
          <div className="logo-icon">Б</div>
          <div className="logo-text">
            <span>{settings.name || "Байгууллага"}</span>
            <span>Бүртгэлийн Систем</span>
          </div>
        </div>
        <div className="nav-tabs">
          {[
            { id: "register", label: "➕ Бүртгэл" },
            { id: "list", label: "📋 Жагсаалт" },
            { id: "settings", label: "⚙️ Тохиргоо" },
          ].map((tab) => (
            <button
              key={tab.id}
              className={`nav-tab${page === tab.id ? " active" : ""}`}
              onClick={() => setPage(tab.id)}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </header>

      <main>
        {/* ══ REGISTER PAGE ══ */}
        {page === "register" && (
          <>
            <div className="section-header">
              <div className="section-label">Шинэ Бүртгэл</div>
              <h1 className="section-title">
                Ажилтан <span>нэмэх</span>
              </h1>
              <p className="section-desc">
                Доорх талбаруудыг бөглөж шинэ ажилтан бүртгэнэ үү.
              </p>
            </div>

            <div className="form-card">
              <div className="form-card-title">👤 Ажилтны мэдээлэл</div>
              <div className="form-grid">
                <Field label="Овог нэр (Last Name)" icon="👤">
                  <input
                    type="text"
                    placeholder="Батбаяр"
                    value={form.lastName}
                    onChange={upd("lastName")}
                  />
                </Field>

                <Field label="Нэр (First Name)" icon="👤">
                  <input
                    type="text"
                    placeholder="Болд"
                    value={form.firstName}
                    onChange={upd("firstName")}
                  />
                </Field>

                <Field label="Хэрэглэгчийн нэр (Username)" icon="@">
                  <input
                    type="text"
                    placeholder="bold.batbayar"
                    value={form.username}
                    onChange={upd("username")}
                  />
                </Field>

                <Field label="Нууц үг (Password)" icon="🔒" isPwd>
                  <input
                    type={showFormPwd ? "text" : "password"}
                    placeholder="••••••••"
                    value={form.password}
                    onChange={upd("password")}
                  />
                  <button
                    type="button"
                    className={`pwd-toggle${showFormPwd ? " active" : ""}`}
                    onClick={() => setShowFormPwd((p) => !p)}
                    title="Нууц үг харах"
                  >
                    {showFormPwd ? "🙈" : "👁"}
                  </button>
                </Field>

                <Field label="Ажилтны ID" icon="#">
                  <input
                    type="text"
                    placeholder={nextId}
                    value={form.employeeId}
                    onChange={upd("employeeId")}
                  />
                </Field>

                <Field label="Gmail хаяг" icon="✉️">
                  <input
                    type="email"
                    placeholder="bold@gmail.com"
                    value={form.gmail}
                    onChange={upd("gmail")}
                  />
                </Field>

                <div className="form-group full">
                  <Field label="Утасны дугаар (Phone Number)" icon="📱">
                    <input
                      type="tel"
                      placeholder="+976 9900 0000"
                      value={form.phone}
                      onChange={upd("phone")}
                    />
                  </Field>
                </div>
              </div>

              <div className="btn-row">
                <button className="btn btn-secondary" onClick={resetForm}>
                  🗑 Цэвэрлэх
                </button>
                <button className="btn btn-primary" onClick={saveEmployee}>
                  ✓ Бүртгэл хадгалах
                </button>
              </div>
            </div>
          </>
        )}

        {/* ══ LIST PAGE ══ */}
        {page === "list" && (
          <>
            <div className="section-header">
              <div className="section-label">Бүртгэлийн Жагсаалт</div>
              <h1 className="section-title">
                Нийт <span>ажилтнууд</span>
              </h1>
              <p className="section-desc">
                Бүртгэгдсэн бүх ажилтны мэдээлэл. Нүдний дүрс дарж нууц үгийг
                харна уу.
              </p>
            </div>

            <div className="company-info-bar">
              <div>
                <div className="ci-label">Нийт ажилтан</div>
                <div className="ci-value">{employees.length}</div>
              </div>
              {settings.name && (
                <>
                  <div className="ci-divider" />
                  <div>
                    <div className="ci-label">Байгууллага</div>
                    <div className="ci-value">{settings.name}</div>
                  </div>
                </>
              )}
            </div>

            <div className="list-header">
              <div className="search-bar" style={{ flex: 1, marginBottom: 0 }}>
                <div className="search-wrap">
                  <span className="search-icon">🔍</span>
                  <input
                    className="search-input"
                    type="text"
                    placeholder="Нэр, username, ID-аар хайх..."
                    value={searchQ}
                    onChange={(e) => setSearchQ(e.target.value)}
                  />
                </div>
              </div>
              <div className="count-badge">{filtered.length} бүртгэл</div>
            </div>

            <div className="table-wrap">
              <table>
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Овог нэр</th>
                    <th>Username</th>
                    <th>Нууц үг</th>
                    <th>Ажилтны ID</th>
                    <th>Gmail</th>
                    <th>Утас</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {filtered.map((e, i) => (
                    <tr key={e.id}>
                      <td style={{ color: "var(--text-muted)", fontSize: 12 }}>
                        {i + 1}
                      </td>
                      <td>
                        <strong>{e.lastName}</strong> {e.firstName}
                      </td>
                      <td style={{ color: "var(--accent)" }}>@{e.username}</td>
                      <td>
                        <div className="pwd-cell">
                          {visiblePwds[e.id] ? (
                            <span className="pwd-text">{e.password}</span>
                          ) : (
                            <span className="pwd-dots">••••••••</span>
                          )}
                          <button
                            className={`pwd-eye${visiblePwds[e.id] ? " active" : ""}`}
                            onClick={() =>
                              setVisiblePwds((p) => ({
                                ...p,
                                [e.id]: !p[e.id],
                              }))
                            }
                            title="Нууц үг харах"
                          >
                            {visiblePwds[e.id] ? "🙈" : "👁"}
                          </button>
                        </div>
                      </td>
                      <td>
                        <span className="td-id">{e.employeeId}</span>
                      </td>
                      <td style={{ color: "var(--text-muted)" }}>{e.gmail}</td>
                      <td>{e.phone}</td>
                      <td>
                        <button
                          className="td-delete"
                          onClick={() => deleteEmployee(e.id)}
                          title="Устгах"
                        >
                          ✕
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              {filtered.length === 0 && (
                <div className="empty-state" id="emptyState">
                  <div className="empty-icon">📭</div>
                  <div className="empty-text">Бүртгэл олдсонгүй</div>
                  <div className="empty-sub">
                    {employees.length === 0
                      ? "Шинэ ажилтан бүртгэхийн тулд Бүртгэл таб руу очно уу"
                      : "Хайлтын нөхцөлд тохирох бүртгэл байхгүй байна"}
                  </div>
                </div>
              )}
            </div>
          </>
        )}

        {/* ══ SETTINGS PAGE ══ */}
        {page === "settings" && (
          <>
            <div className="section-header">
              <div className="section-label">Тохиргоо</div>
              <h1 className="section-title">
                Системийн <span>тохиргоо</span>
              </h1>
            </div>

            <div className="settings-card">
              <div className="settings-title">🏢 Байгууллагын мэдээлэл</div>
              <div className="company-grid">
                <Field label="Байгууллагын нэр" icon="🏢">
                  <input
                    type="text"
                    placeholder="Байгууллагын нэр"
                    value={settingsForm.name}
                    onChange={updS("name")}
                  />
                </Field>
                <Field label="Байгууллагын ID" icon="#">
                  <input
                    type="text"
                    placeholder="ORG-0001"
                    value={settingsForm.id}
                    onChange={updS("id")}
                  />
                </Field>
              </div>
              <div className="btn-row" style={{ marginTop: 20 }}>
                <button
                  className="btn btn-primary"
                  style={{ flex: "none", padding: "12px 28px" }}
                  onClick={handleSaveSettings}
                >
                  💾 Хадгалах
                </button>
              </div>
              <div className="danger-zone">
                <div className="danger-title">⚠️ Аюулын бүс</div>
                <button
                  className="btn-danger"
                  onClick={() => setShowModal(true)}
                >
                  🗑 Бүх бүртгэл устгах
                </button>
              </div>
            </div>
          </>
        )}
      </main>

      {/* ── TOAST ── */}
      <div className={`toast ${toast.type}${toast.show ? " show" : ""}`}>
        {toast.msg}
      </div>

      {/* ── MODAL ── */}
      {showModal && (
        <div
          className="modal-overlay open"
          onClick={(e) => e.target === e.currentTarget && setShowModal(false)}
        >
          <div className="modal">
            <h3>⚠️ Бүгдийг устгах уу?</h3>
            <p>
              Бүх ажилтны бүртгэлийг устгах гэж байна. Энэ үйлдлийг буцаах
              боломжгүй.
            </p>
            <div className="modal-btns">
              <button
                className="btn btn-secondary"
                style={{ flex: 1, justifyContent: "center" }}
                onClick={() => setShowModal(false)}
              >
                Болих
              </button>
              <button
                className="btn"
                style={{
                  background: "var(--danger)",
                  color: "#fff",
                  flex: 1,
                  justifyContent: "center",
                }}
                onClick={handleClearAll}
              >
                Тийм, устга
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// ─── FIELD COMPONENT ─────────────────────────────────────────────────────────
function Field({ label, icon, isPwd, children }) {
  return (
    <div className="form-group">
      <label>{label}</label>
      <div className={`input-wrap${isPwd ? " pwd-wrap" : ""}`}>
        <span className="input-icon">{icon}</span>
        {children}
      </div>
    </div>
  );
}
