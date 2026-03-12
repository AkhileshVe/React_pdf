
import dayjs from "dayjs";

const random = (min, max) =>
  Math.floor(Math.random() * (max - min + 1)) + min;

const formatMoney = (num) =>
  Number(num).toLocaleString("en-IN", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  });

const randomNumber = (len) =>
  Math.floor(Math.random() * 10 ** len)
    .toString()
    .padStart(len, "0");

function changeMiddle(num) {
  const s = num.toString();
  const start = s.slice(0, 4);
  const end = s.slice(-4);
  const mid = random(1000, 9999);
  return start + mid + end;
}

const names = [
  "MEENA", "GEETA", "SAVITA", "NEHA", "KOMAL",
  "RAVI", "AMIT", "VIJAY", "PANKAJ", "ASHOK",
  "SANJAY", "RAHUL", "IMRAN", "YOGESH"
];

const banks = ["SBIN", "HDFC", "ICIC", "KKBK", "CNRB", "YESB"];

const randomName = () => names[random(0, names.length - 1)];
const randomBank = () => banks[random(0, banks.length - 1)];

/* debit description */

function generateUPI() {
  const upi = changeMiddle(randomNumber(12));
  const phone = changeMiddle(randomNumber(10));

  return `TO TRANSFER- UPI/DR/${upi}/${randomName()} /${randomBank()}/${phone}/Payme-`;
}

/* credit description */

function generateCredit() {
  const upi = changeMiddle(randomNumber(12));
  const phone = changeMiddle(randomNumber(10));

  return `BY TRANSFER- UPI/CR/${upi}/${randomName()} /${randomBank()}/${phone}/Payme-`;
}

export function generateSelfEmployeeBankData({
  openingBalance = 20000
}) {

  let balance = openingBalance;

  const today = dayjs();
  const startDate = today.subtract(6, "month");

  const data = [];

  let currentDate = startDate;

  let currentMonth = "";
  let repeatDays = [];

  while (currentDate.isBefore(today) || currentDate.isSame(today)) {

    const monthKey = currentDate.format("YYYY-MM");

    /* monthly repeat days */

    if (monthKey !== currentMonth) {
      currentMonth = monthKey;

      const daysInMonth = currentDate.daysInMonth();
      const repeatCount = random(3, 5);

      repeatDays = [];

      for (let i = 0; i < repeatCount; i++) {
        repeatDays.push(random(1, daysInMonth));
      }
    }

    const isRepeat = repeatDays.includes(currentDate.date());
    const txnCount = isRepeat ? random(2, 3) : 1;

    for (let i = 0; i < txnCount; i++) {

      const isCredit = Math.random() < 0.25;

      if (balance < 500) {

        const creditArrey = [
          100, 10000, 2200, 3000, 200, 400, 5000, 300,
          150, 1200, 2000, 7000, 8000, 1500, 350, 450
        ];
        //  const credit  = random(200,10000)
        const credit = creditArrey[random(0, creditArrey.length - 1)];

        balance += credit;

        data.push({
          txnDate: currentDate.format("D MMM YYYY"),
          valueDate: currentDate.format("D MMM YYYY"),
          description: generateCredit(),
          refNo: "TRANSFER FROM " + changeMiddle(randomNumber(13)),
          debit: "",
          credit: formatMoney(credit),
          balance: formatMoney(balance)
        });

      } else {

        if (balance <= 100) return;

        const debit = random(50, Math.min(balance, 2000));

        balance -= debit;

        data.push({
          txnDate: currentDate.format("D MMM YYYY"),
          valueDate: currentDate.format("D MMM YYYY"),
          description: generateUPI(),
          refNo: "TRANSFER TO " + changeMiddle(randomNumber(13)),
          debit: formatMoney(debit),
          credit: "",
          balance: formatMoney(balance)
        });

      }
    }

    currentDate = currentDate.add(1, "day");
  }

  return data;
}



// const transactions = [
//     // JULY 2025
//     { txnDate: "01 Jul 2025", valueDate: "01 Jul 2025", description: "OPENING BALANCE", refNo: "-", debit: null, credit: 150000.00, balance: 150000.00 },
//     { txnDate: "02 Jul 2025", valueDate: "02 Jul 2025", description: "UPI TRANSFER TO AMIT", refNo: "UPI/100001", debit: 2500.00, credit: null, balance: 147500.00 },
//     { txnDate: "03 Jul 2025", valueDate: "03 Jul 2025", description: "ATM WITHDRAWAL", refNo: "ATM/345678", debit: 5000.00, credit: null, balance: 142500.00 },
//     { txnDate: "05 Jul 2025", valueDate: "05 Jul 2025", description: "SALARY CREDIT", refNo: "NEFT/EMP001", debit: null, credit: 95000.00, balance: 237500.00 },
//     { txnDate: "06 Jul 2025", valueDate: "06 Jul 2025", description: "POS BIG BAZAAR", refNo: "POS/778801", debit: 4200.00, credit: null, balance: 233300.00 },
//     { txnDate: "07 Jul 2025", valueDate: "07 Jul 2025", description: "ELECTRICITY BILL", refNo: "BILL/778899", debit: 3200.00, credit: null, balance: 230100.00 },
//     { txnDate: "08 Jul 2025", valueDate: "08 Jul 2025", description: "UPI TO RAHUL", refNo: "UPI/100245", debit: 1800.00, credit: null, balance: 228300.00 },
//     { txnDate: "09 Jul 2025", valueDate: "09 Jul 2025", description: "MOBILE BILL", refNo: "BILL/992211", debit: 899.00, credit: null, balance: 227401.00 },
//     { txnDate: "10 Jul 2025", valueDate: "10 Jul 2025", description: "POS AMAZON", refNo: "PG/556677", debit: 4200.00, credit: null, balance: 223201.00 },
//     { txnDate: "12 Jul 2025", valueDate: "12 Jul 2025", description: "UPI TO SUNITA", refNo: "UPI/100555", debit: 3000.00, credit: null, balance: 220201.00 },
//     { txnDate: "15 Jul 2025", valueDate: "15 Jul 2025", description: "CAR EMI", refNo: "ECS/EMI001", debit: 12000.00, credit: null, balance: 208201.00 },
//     { txnDate: "20 Jul 2025", valueDate: "20 Jul 2025", description: "RENT PAYMENT", refNo: "UPI/RENT001", debit: 15000.00, credit: null, balance: 193201.00 },
//     { txnDate: "25 Jul 2025", valueDate: "25 Jul 2025", description: "INTEREST CREDIT", refNo: "INT/0725", debit: null, credit: 350.25, balance: 193551.25 },

//     // AUGUST
//     { txnDate: "01 Aug 2025", valueDate: "01 Aug 2025", description: "SALARY CREDIT", refNo: "NEFT/EMP002", debit: null, credit: 95000.00, balance: 288551.25 },
//     { txnDate: "03 Aug 2025", valueDate: "03 Aug 2025", description: "GROCERY STORE", refNo: "POS/998877", debit: 4200.00, credit: null, balance: 284351.25 },
//     { txnDate: "05 Aug 2025", valueDate: "05 Aug 2025", description: "UPI TO MOHAN", refNo: "UPI/200001", debit: 2700.00, credit: null, balance: 281651.25 },
//     { txnDate: "07 Aug 2025", valueDate: "07 Aug 2025", description: "INSURANCE PREMIUM", refNo: "ECS/INS001", debit: 6500.00, credit: null, balance: 275151.25 },
//     { txnDate: "10 Aug 2025", valueDate: "10 Aug 2025", description: "POS FLIPKART", refNo: "PG/445566", debit: 3800.00, credit: null, balance: 271351.25 },
//     { txnDate: "15 Aug 2025", valueDate: "15 Aug 2025", description: "CAR EMI", refNo: "ECS/EMI002", debit: 12000.00, credit: null, balance: 259351.25 },
//     { txnDate: "20 Aug 2025", valueDate: "20 Aug 2025", description: "RENT PAYMENT", refNo: "UPI/RENT002", debit: 15000.00, credit: null, balance: 244351.25 },
//     { txnDate: "25 Aug 2025", valueDate: "25 Aug 2025", description: "INTEREST CREDIT", refNo: "INT/0825", debit: null, credit: 410.50, balance: 244761.75 },

//     // SEPTEMBER
//     { txnDate: "01 Sep 2025", valueDate: "01 Sep 2025", description: "SALARY CREDIT", refNo: "NEFT/EMP003", debit: null, credit: 95000.00, balance: 339761.75 },
//     { txnDate: "05 Sep 2025", valueDate: "05 Sep 2025", description: "UPI TO AMIT", refNo: "UPI/300001", debit: 3500.00, credit: null, balance: 336261.75 },
//     { txnDate: "10 Sep 2025", valueDate: "10 Sep 2025", description: "POS DMART", refNo: "POS/300567", debit: 4200.00, credit: null, balance: 332061.75 },
//     { txnDate: "15 Sep 2025", valueDate: "15 Sep 2025", description: "CAR EMI", refNo: "ECS/EMI003", debit: 12000.00, credit: null, balance: 320061.75 },
//     { txnDate: "20 Sep 2025", valueDate: "20 Sep 2025", description: "RENT PAYMENT", refNo: "UPI/RENT003", debit: 15000.00, credit: null, balance: 305061.75 },
//     { txnDate: "25 Sep 2025", valueDate: "25 Sep 2025", description: "INTEREST CREDIT", refNo: "INT/0925", debit: null, credit: 420.80, balance: 305482.55 },

//     // OCTOBER
//     { txnDate: "01 Oct 2025", valueDate: "01 Oct 2025", description: "SALARY CREDIT", refNo: "NEFT/EMP004", debit: null, credit: 95000.00, balance: 400482.55 },
//     { txnDate: "15 Oct 2025", valueDate: "15 Oct 2025", description: "CAR EMI", refNo: "ECS/EMI004", debit: 12000.00, credit: null, balance: 388482.55 },
//     { txnDate: "20 Oct 2025", valueDate: "20 Oct 2025", description: "RENT PAYMENT", refNo: "UPI/RENT004", debit: 15000.00, credit: null, balance: 373482.55 },
//     { txnDate: "25 Oct 2025", valueDate: "25 Oct 2025", description: "INTEREST CREDIT", refNo: "INT/1025", debit: null, credit: 430.60, balance: 373913.15 },

//     // NOVEMBER
//     { txnDate: "01 Nov 2025", valueDate: "01 Nov 2025", description: "SALARY CREDIT", refNo: "NEFT/EMP005", debit: null, credit: 95000.00, balance: 468913.15 },
//     { txnDate: "15 Nov 2025", valueDate: "15 Nov 2025", description: "CAR EMI", refNo: "ECS/EMI005", debit: 12000.00, credit: null, balance: 456913.15 },
//     { txnDate: "20 Nov 2025", valueDate: "20 Nov 2025", description: "RENT PAYMENT", refNo: "UPI/RENT005", debit: 15000.00, credit: null, balance: 441913.15 },
//     { txnDate: "25 Nov 2025", valueDate: "25 Nov 2025", description: "INTEREST CREDIT", refNo: "INT/1125", debit: null, credit: 450.25, balance: 442363.40 },

//     // DECEMBER
//     { txnDate: "01 Dec 2025", valueDate: "01 Dec 2025", description: "SALARY CREDIT", refNo: "NEFT/EMP006", debit: null, credit: 95000.00, balance: 537363.40 },
//     { txnDate: "15 Dec 2025", valueDate: "15 Dec 2025", description: "CAR EMI", refNo: "ECS/EMI006", debit: 12000.00, credit: null, balance: 525363.40 },
//     { txnDate: "20 Dec 2025", valueDate: "20 Dec 2025", description: "RENT PAYMENT", refNo: "UPI/RENT006", debit: 15000.00, credit: null, balance: 510363.40 },
//     { txnDate: "25 Dec 2025", valueDate: "25 Dec 2025", description: "INTEREST CREDIT", refNo: "INT/1225", debit: null, credit: 470.90, balance: 510834.30 }
// ];


// export default transactions;

// export const sbidatata = [
//     { txnDate: "01 Jul 2025", valueDate: "01 Jul 2025", description: "OPENING BALANCE", refNo: "-", debit: null, credit: 150000.00, balance: 150000.00 },

//     // JULY (22)
//     { txnDate: "02 Jul 2025", valueDate: "02 Jul 2025", description: "UPI TO AMIT", refNo: "UPI/700001", debit: 2500, credit: null, balance: 147500 },
//     { txnDate: "03 Jul 2025", valueDate: "03 Jul 2025", description: "POS DMART", refNo: "POS/700002", debit: 4200, credit: null, balance: 143300 },
//     { txnDate: "04 Jul 2025", valueDate: "04 Jul 2025", description: "FUEL PAYMENT", refNo: "POS/700003", debit: 2500, credit: null, balance: 140800 },
//     { txnDate: "05 Jul 2025", valueDate: "05 Jul 2025", description: "SALARY CREDIT", refNo: "NEFT/EMP701", debit: null, credit: 95000, balance: 235800 },
//     { txnDate: "06 Jul 2025", valueDate: "06 Jul 2025", description: "MOBILE BILL", refNo: "BILL/700004", debit: 899, credit: null, balance: 234901 },
//     { txnDate: "07 Jul 2025", valueDate: "07 Jul 2025", description: "ELECTRICITY BILL", refNo: "BILL/700005", debit: 3200, credit: null, balance: 231701 },
//     { txnDate: "08 Jul 2025", valueDate: "08 Jul 2025", description: "UPI TO RAHUL", refNo: "UPI/700006", debit: 1800, credit: null, balance: 229901 },
//     { txnDate: "09 Jul 2025", valueDate: "09 Jul 2025", description: "NETFLIX", refNo: "SUB/700007", debit: 649, credit: null, balance: 229252 },
//     { txnDate: "10 Jul 2025", valueDate: "10 Jul 2025", description: "POS AMAZON", refNo: "PG/700008", debit: 4200, credit: null, balance: 225052 },
//     { txnDate: "11 Jul 2025", valueDate: "11 Jul 2025", description: "UPI TO SUNITA", refNo: "UPI/700009", debit: 3000, credit: null, balance: 222052 },
//     { txnDate: "12 Jul 2025", valueDate: "12 Jul 2025", description: "GROCERY STORE", refNo: "POS/700010", debit: 2600, credit: null, balance: 219452 },
//     { txnDate: "13 Jul 2025", valueDate: "13 Jul 2025", description: "SWIGGY ORDER", refNo: "POS/700011", debit: 1100, credit: null, balance: 218352 },
//     { txnDate: "14 Jul 2025", valueDate: "14 Jul 2025", description: "CAR EMI", refNo: "ECS/EMI701", debit: 12000, credit: null, balance: 206352 },
//     { txnDate: "15 Jul 2025", valueDate: "15 Jul 2025", description: "UPI TO MOHAN", refNo: "UPI/700012", debit: 1700, credit: null, balance: 204652 },
//     { txnDate: "16 Jul 2025", valueDate: "16 Jul 2025", description: "POS BIG BAZAAR", refNo: "POS/700013", debit: 3900, credit: null, balance: 200752 },
//     { txnDate: "17 Jul 2025", valueDate: "17 Jul 2025", description: "FUEL PAYMENT", refNo: "POS/700014", debit: 2200, credit: null, balance: 198552 },
//     { txnDate: "18 Jul 2025", valueDate: "18 Jul 2025", description: "RENT PAYMENT", refNo: "UPI/RENT701", debit: 15000, credit: null, balance: 183552 },
//     { txnDate: "19 Jul 2025", valueDate: "19 Jul 2025", description: "UPI TO PANKAJ", refNo: "UPI/700015", debit: 2800, credit: null, balance: 180752 },
//     { txnDate: "20 Jul 2025", valueDate: "20 Jul 2025", description: "POS ZARA", refNo: "POS/700016", debit: 3500, credit: null, balance: 177252 },
//     { txnDate: "22 Jul 2025", valueDate: "22 Jul 2025", description: "ATM WITHDRAWAL", refNo: "ATM/700017", debit: 5000, credit: null, balance: 172252 },
//     { txnDate: "25 Jul 2025", valueDate: "25 Jul 2025", description: "INTEREST CREDIT", refNo: "INT/0725", debit: null, credit: 350.25, balance: 172602.25 },

//     // AUGUST (22)
//     { txnDate: "01 Aug 2025", valueDate: "01 Aug 2025", description: "SALARY CREDIT", refNo: "NEFT/EMP702", debit: null, credit: 95000, balance: 267602.25 },
//     { txnDate: "02 Aug 2025", valueDate: "02 Aug 2025", description: "UPI TO AMIT", refNo: "UPI/800001", debit: 3200, credit: null, balance: 264402.25 },
//     { txnDate: "03 Aug 2025", valueDate: "03 Aug 2025", description: "POS DMART", refNo: "POS/800002", debit: 4100, credit: null, balance: 260302.25 },
//     { txnDate: "04 Aug 2025", valueDate: "04 Aug 2025", description: "FUEL PAYMENT", refNo: "POS/800003", debit: 2400, credit: null, balance: 257902.25 },
//     { txnDate: "05 Aug 2025", valueDate: "05 Aug 2025", description: "INSURANCE PREMIUM", refNo: "ECS/INS702", debit: 6500, credit: null, balance: 251402.25 },
//     { txnDate: "06 Aug 2025", valueDate: "06 Aug 2025", description: "POS AMAZON", refNo: "PG/800004", debit: 3800, credit: null, balance: 247602.25 },
//     { txnDate: "08 Aug 2025", valueDate: "08 Aug 2025", description: "UPI TO SEEMA", refNo: "UPI/800005", debit: 2600, credit: null, balance: 245002.25 },
//     { txnDate: "10 Aug 2025", valueDate: "10 Aug 2025", description: "CAR EMI", refNo: "ECS/EMI702", debit: 12000, credit: null, balance: 233002.25 },
//     { txnDate: "12 Aug 2025", valueDate: "12 Aug 2025", description: "NETFLIX", refNo: "SUB/800006", debit: 649, credit: null, balance: 232353.25 },
//     { txnDate: "15 Aug 2025", valueDate: "15 Aug 2025", description: "RENT PAYMENT", refNo: "UPI/RENT702", debit: 15000, credit: null, balance: 217353.25 },
//     { txnDate: "18 Aug 2025", valueDate: "18 Aug 2025", description: "GROCERY STORE", refNo: "POS/800007", debit: 3200, credit: null, balance: 214153.25 },
//     { txnDate: "20 Aug 2025", valueDate: "20 Aug 2025", description: "POS ZOMATO", refNo: "POS/800008", debit: 900, credit: null, balance: 213253.25 },
//     { txnDate: "22 Aug 2025", valueDate: "22 Aug 2025", description: "UPI TO RAHUL", refNo: "UPI/800009", debit: 1400, credit: null, balance: 211853.25 },
//     { txnDate: "25 Aug 2025", valueDate: "25 Aug 2025", description: "INTEREST CREDIT", refNo: "INT/0825", debit: null, credit: 410.50, balance: 212263.75 },

//     // SEPTEMBER
//     { txnDate: "01 Sep 2025", valueDate: "01 Sep 2025", description: "SALARY CREDIT", refNo: "NEFT/EMP703", debit: null, credit: 95000, balance: 307263.75 },
//     { txnDate: "02 Sep 2025", valueDate: "02 Sep 2025", description: "UPI TO AMIT", refNo: "UPI/900001", debit: 2800, credit: null, balance: 304463.75 },
//     { txnDate: "03 Sep 2025", valueDate: "03 Sep 2025", description: "POS DMART", refNo: "POS/900002", debit: 3900, credit: null, balance: 300563.75 },
//     { txnDate: "04 Sep 2025", valueDate: "04 Sep 2025", description: "FUEL PAYMENT", refNo: "POS/900003", debit: 2500, credit: null, balance: 298063.75 },
//     { txnDate: "05 Sep 2025", valueDate: "05 Sep 2025", description: "CAR EMI", refNo: "ECS/EMI703", debit: 12000, credit: null, balance: 286063.75 },
//     { txnDate: "07 Sep 2025", valueDate: "07 Sep 2025", description: "GROCERY STORE", refNo: "POS/900004", debit: 3100, credit: null, balance: 282963.75 },
//     { txnDate: "08 Sep 2025", valueDate: "08 Sep 2025", description: "UPI TO RAHUL", refNo: "UPI/900005", debit: 1600, credit: null, balance: 281363.75 },
//     { txnDate: "09 Sep 2025", valueDate: "09 Sep 2025", description: "NETFLIX", refNo: "SUB/900006", debit: 649, credit: null, balance: 280714.75 },
//     { txnDate: "10 Sep 2025", valueDate: "10 Sep 2025", description: "POS AMAZON", refNo: "PG/900007", debit: 4500, credit: null, balance: 276214.75 },
//     { txnDate: "12 Sep 2025", valueDate: "12 Sep 2025", description: "UPI TO SUNITA", refNo: "UPI/900008", debit: 2200, credit: null, balance: 274014.75 },
//     { txnDate: "15 Sep 2025", valueDate: "15 Sep 2025", description: "RENT PAYMENT", refNo: "UPI/RENT703", debit: 15000, credit: null, balance: 259014.75 },
//     { txnDate: "18 Sep 2025", valueDate: "18 Sep 2025", description: "FUEL PAYMENT", refNo: "POS/900009", debit: 2300, credit: null, balance: 256714.75 },
//     { txnDate: "20 Sep 2025", valueDate: "20 Sep 2025", description: "POS SWIGGY", refNo: "POS/900010", debit: 1200, credit: null, balance: 255514.75 },
//     { txnDate: "22 Sep 2025", valueDate: "22 Sep 2025", description: "UPI TO MOHAN", refNo: "UPI/900011", debit: 1900, credit: null, balance: 253614.75 },
//     { txnDate: "25 Sep 2025", valueDate: "25 Sep 2025", description: "INTEREST CREDIT", refNo: "INT/0925", debit: null, credit: 420.80, balance: 254035.55 },

//     // OCTOBER
//     { txnDate: "01 Oct 2025", valueDate: "01 Oct 2025", description: "SALARY CREDIT", refNo: "NEFT/EMP704", debit: null, credit: 95000, balance: 349035.55 },
//     { txnDate: "02 Oct 2025", valueDate: "02 Oct 2025", description: "UPI TO AMIT", refNo: "UPI/100001", debit: 3000, credit: null, balance: 346035.55 },
//     { txnDate: "03 Oct 2025", valueDate: "03 Oct 2025", description: "POS DMART", refNo: "POS/100002", debit: 4200, credit: null, balance: 341835.55 },
//     { txnDate: "05 Oct 2025", valueDate: "05 Oct 2025", description: "CAR EMI", refNo: "ECS/EMI704", debit: 12000, credit: null, balance: 329835.55 },
//     { txnDate: "10 Oct 2025", valueDate: "10 Oct 2025", description: "RENT PAYMENT", refNo: "UPI/RENT704", debit: 15000, credit: null, balance: 314835.55 },
//     { txnDate: "15 Oct 2025", valueDate: "15 Oct 2025", description: "POS AMAZON", refNo: "PG/100003", debit: 3800, credit: null, balance: 311035.55 },
//     { txnDate: "18 Oct 2025", valueDate: "18 Oct 2025", description: "FUEL PAYMENT", refNo: "POS/100004", debit: 2500, credit: null, balance: 308535.55 },
//     { txnDate: "20 Oct 2025", valueDate: "20 Oct 2025", description: "UPI TO RAHUL", refNo: "UPI/100005", debit: 1700, credit: null, balance: 306835.55 },
//     { txnDate: "22 Oct 2025", valueDate: "22 Oct 2025", description: "GROCERY STORE", refNo: "POS/100006", debit: 3300, credit: null, balance: 303535.55 },
//     { txnDate: "25 Oct 2025", valueDate: "25 Oct 2025", description: "INTEREST CREDIT", refNo: "INT/1025", debit: null, credit: 430.60, balance: 303966.15 },

//     // NOVEMBER
//     { txnDate: "01 Nov 2025", valueDate: "01 Nov 2025", description: "SALARY CREDIT", refNo: "NEFT/EMP705", debit: null, credit: 95000, balance: 398966.15 },
//     { txnDate: "05 Nov 2025", valueDate: "05 Nov 2025", description: "CAR EMI", refNo: "ECS/EMI705", debit: 12000, credit: null, balance: 386966.15 },
//     { txnDate: "10 Nov 2025", valueDate: "10 Nov 2025", description: "RENT PAYMENT", refNo: "UPI/RENT705", debit: 15000, credit: null, balance: 371966.15 },
//     { txnDate: "15 Nov 2025", valueDate: "15 Nov 2025", description: "POS AMAZON", refNo: "PG/110001", debit: 4200, credit: null, balance: 367766.15 },
//     { txnDate: "20 Nov 2025", valueDate: "20 Nov 2025", description: "UPI TO AMIT", refNo: "UPI/110002", debit: 2100, credit: null, balance: 365666.15 },
//     { txnDate: "25 Nov 2025", valueDate: "25 Nov 2025", description: "INTEREST CREDIT", refNo: "INT/1125", debit: null, credit: 450.25, balance: 366116.40 },

//     // DECEMBER
//     { txnDate: "01 Dec 2025", valueDate: "01 Dec 2025", description: "SALARY CREDIT", refNo: "NEFT/EMP706", debit: null, credit: 95000, balance: 461116.40 },
//     { txnDate: "05 Dec 2025", valueDate: "05 Dec 2025", description: "CAR EMI", refNo: "ECS/EMI706", debit: 12000, credit: null, balance: 449116.40 },
//     { txnDate: "10 Dec 2025", valueDate: "10 Dec 2025", description: "RENT PAYMENT", refNo: "UPI/RENT706", debit: 15000, credit: null, balance: 434116.40 },
//     { txnDate: "15 Dec 2025", valueDate: "15 Dec 2025", description: "POS AMAZON", refNo: "PG/120001", debit: 3800, credit: null, balance: 430316.40 },
//     { txnDate: "20 Dec 2025", valueDate: "20 Dec 2025", description: "UPI TO RAHUL", refNo: "UPI/120002", debit: 2000, credit: null, balance: 428316.40 },
//     { txnDate: "25 Dec 2025", valueDate: "25 Dec 2025", description: "INTEREST CREDIT", refNo: "INT/1225", debit: null, credit: 470.90, balance: 428787.30 },
// ];


// export const originaldata = [
// // "TO TRANSFER- UPI/DR/405766387708/MEENA S/AIRP/7764208537/Payme-",
// // "TO TRANSFER- UPI/DR/608174669424/GEETA T/IDIB/8646475352/Payme-",
// // "TO TRANSFER- UPI/DR/893169323488/SAVITA/CNRB/8774009477/Payme-",
// // "TO TRANSFER-UPI/DR/327581649439/NEHAD/BKID/9712705802/Payme-",
// // TO TRANSFER-
// // UPI/DR/158923804954/KOMAL
// // S/KKBK/9209741429/Payme-
// // TO TRANSFER-
// // UPI/DR/948691177553/RAVIB/I
// // DFB/7479023636/Payme-
// // TO TRANSFER-
// // UPI/DR/328374737993/AMITT/
// // YESB/8638409133/Payme-
// // TO TRANSFER-
// // UPI/DR/110773077011/VIJAYG
// // /BARB/8132633953/Payme-
// // TO TRANSFER-
// // UPI/DR/151257055812/PANKA
// // J/UBIN/7661768183/Payme-
// // TO TRANSFER-
// // UPI/DR/472992917870/ASHOK
// // S/CBIN/8247049167/Payme-
// // TO TRANSFER-
// // UPI/DR/731524472806/SAVITA
// // /YESB/9720330047/Payme-

//   {
//     txnDate: "22 Jul 2025",
//     valueDate: "22 Jul 2025",
//     description: "TO TRANSFER- UPI/DR/405766387708/MEENA S/AIRP/7764208537/Payme-",
//     refNo: "TRANSFER TO 4698818875927",
//     debit: 955.00,
//     credit: null,
//     balance: 42280.00
//   },
//   {
//     txnDate: "22 Jul 2025",
//     valueDate: "22 Jul 2025",
//     description: "TO TRANSFER- UPI/DR/608174669424/GEETA T/IDIB/8646475352/Payme-",
//     refNo: "TRANSFER TO 4891326431869",
//     debit: 200.00,
//     credit: null,
//     balance: 42080.00
//   },
//   {
//     txnDate: "23 Jul 2025",
//     valueDate: "23 Jul 2025",
//     description: "TO TRANSFER- UPI/DR/893169323488/SAVITA/CNRB/8774009477/Payme-",
//     refNo: "TRANSFER TO 4896655703197",
//     debit: 1100.00,
//     credit: null,
//     balance: 40980.00
//   },

//   {
//     txnDate: "02 Aug 2025",
//     valueDate: "02 Aug 2025",
//     description: "TO TRANSFER- UPI/DR/327581649439/NEHAD/BKID/9712705802/Payme-",
//     refNo: "NEFT INWARD",
//     debit: null,
//     credit: 95000.00,
//     balance: 131990.00
//   },

//   {
//     txnDate: "25 Aug 2025",
//     valueDate: "25 Aug 2025",
//     description: "INTEREST CREDIT",
//     refNo: "CREDIT INTEREST",
//     debit: null,
//     credit: 215.39,
//     balance: 120005.39
//   },

//   // ... continues till Jan 2026
// ];