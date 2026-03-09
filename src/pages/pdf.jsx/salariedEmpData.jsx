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

/* description generators */

const generateSalary = (company) =>
  `BY TRANSFER- NEFT*${company}*District Treasury`;

const generateCash = () =>
  "CASH WITHDRAWAL-CASH WITHDRAWAL SELF-";

const generateWithdrawal = () =>
  "WITHDRAWAL TRANSFER--";

const generateIMPS = () =>
  `TO TRANSFER- IMPS/${randomNumber(12)} /UCBA-User s/-`;

const generateACH = () =>
  `ECS/ACH RETURN CHG-GRIHUM H NACH FAIL INSUF BAL SBIN${randomNumber(16)}`;

const generateInterest = () =>
  "CREDIT INTEREST--";

export function generateMixedStatement({
  openingBalance = 0,
  salaryAmount = 48610,
  company = "RBISOGOMPEP"
}) {

  let balance = openingBalance;

  const today = dayjs();
  const start = today.subtract(6, "month").startOf("month");

  const data = [];

  let month = start;

  while (month.isBefore(today)) {

    /* ---- Salary ---- */

    const salaryDate = month.date(7);

    balance += salaryAmount;

    data.push({
      txnDate: salaryDate.format("D MMM YYYY"),
      valueDate: salaryDate.format("D MMM YYYY"),
      description: generateSalary(company),
      refNo: "TRANSFER FROM " + randomNumber(10),
      debit: "",
      credit: formatMoney(salaryAmount),
      balance: formatMoney(balance)
    });

    /* ---- Big withdrawal ---- */

    const withdraw = random(10000, 50000);

    if (balance > withdraw) {
      balance -= withdraw;

      data.push({
        txnDate: salaryDate.add(1, "day").format("D MMM YYYY"),
        valueDate: salaryDate.add(1, "day").format("D MMM YYYY"),
        description: generateWithdrawal(),
        refNo: "TRANSFER TO " + randomNumber(10),
        debit: formatMoney(withdraw),
        credit: "",
        balance: formatMoney(balance)
      });
    }

    /* ---- Cash withdrawal ---- */

    const cash = random(10000, 40000);

    if (balance > cash) {
      balance -= cash;

      data.push({
        txnDate: salaryDate.add(1, "day").format("D MMM YYYY"),
        valueDate: salaryDate.add(1, "day").format("D MMM YYYY"),
        description: generateCash(),
        refNo: "",
        debit: formatMoney(cash),
        credit: "",
        balance: formatMoney(balance)
      });
    }

    /* ---- ECS charge ---- */

    const ecs = random(90, 500);

    if (balance > ecs) {
      balance -= ecs;

      data.push({
        txnDate: salaryDate.add(3, "day").format("D MMM YYYY"),
        valueDate: salaryDate.add(3, "day").format("D MMM YYYY"),
        description: generateACH(),
        refNo: randomNumber(7),
        debit: formatMoney(ecs),
        credit: "",
        balance: formatMoney(balance)
      });
    }

    /* ---- IMPS transfer ---- */

    const imps = random(200, 3000);

    if (balance > imps) {
      balance -= imps;

      data.push({
        txnDate: salaryDate.add(15, "day").format("D MMM YYYY"),
        valueDate: salaryDate.add(15, "day").format("D MMM YYYY"),
        description: generateIMPS(),
        refNo: "TRANSFER TO " + randomNumber(10),
        debit: formatMoney(imps),
        credit: "",
        balance: formatMoney(balance)
      });
    }

    /* ---- Interest ---- */

    const interest = random(5, 20);

    balance += interest;

    data.push({
      txnDate: month.date(25).format("D MMM YYYY"),
      valueDate: month.date(25).format("D MMM YYYY"),
      description: generateInterest(),
      refNo: "",
      debit: "",
      credit: formatMoney(interest),
      balance: formatMoney(balance)
    });

    month = month.add(1, "month");
  }

  return data;
}