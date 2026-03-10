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

/* -------- Description generators -------- */

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

/* -------- Main Generator -------- */

export function generateMixedStatement({
  openingBalance = 0,
  salaryAmount = 48610,
  company = "RBISOGOMPEP"
}) {

  let balance = openingBalance;

  const today = dayjs();
  const start = today.subtract(6, "month"); // exact 6 month

  const data = [];

  let month = start.startOf("month");

  while (month.isBefore(today)) {

    const salaryDate = month.date(7);

    /* ---- Salary ---- */

    if (salaryDate.isAfter(start) && salaryDate.isBefore(today)) {

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

      /* ---- Withdrawal ---- */

      const withdrawDate = salaryDate.add(1, "day");
      const withdraw = random(10000, 50000);

      if (balance > withdraw && withdrawDate.isBefore(today)) {

        balance -= withdraw;

        data.push({
          txnDate: withdrawDate.format("D MMM YYYY"),
          valueDate: withdrawDate.format("D MMM YYYY"),
          description: generateWithdrawal(),
          refNo: "TRANSFER TO " + randomNumber(10),
          debit: formatMoney(withdraw),
          credit: "",
          balance: formatMoney(balance)
        });
      }

      /* ---- Cash withdrawal ---- */

      const cashDate = salaryDate.add(2, "day");
      const cash = random(10000, 40000);

      if (balance > cash && cashDate.isBefore(today)) {

        balance -= cash;

        data.push({
          txnDate: cashDate.format("D MMM YYYY"),
          valueDate: cashDate.format("D MMM YYYY"),
          description: generateCash(),
          refNo: "",
          debit: formatMoney(cash),
          credit: "",
          balance: formatMoney(balance)
        });
      }

      /* ---- ECS Charge ---- */

      const ecsDate = salaryDate.add(3, "day");
      const ecs = random(90, 500);

      if (balance > ecs && ecsDate.isBefore(today)) {

        balance -= ecs;

        data.push({
          txnDate: ecsDate.format("D MMM YYYY"),
          valueDate: ecsDate.format("D MMM YYYY"),
          description: generateACH(),
          refNo: randomNumber(7),
          debit: formatMoney(ecs),
          credit: "",
          balance: formatMoney(balance)
        });
      }

      /* ---- IMPS Transfer ---- */

      const impsDate = salaryDate.add(15, "day");
      const imps = random(200, 3000);

      if (balance > imps && impsDate.isBefore(today)) {

        balance -= imps;

        data.push({
          txnDate: impsDate.format("D MMM YYYY"),
          valueDate: impsDate.format("D MMM YYYY"),
          description: generateIMPS(),
          refNo: "TRANSFER TO " + randomNumber(10),
          debit: formatMoney(imps),
          credit: "",
          balance: formatMoney(balance)
        });
      }
    }

    /* ---- Interest ---- */

    const interestDate = month.date(25);

    if (interestDate.isAfter(start) && interestDate.isBefore(today)) {

      const interest = random(5, 20);

      balance += interest;

      data.push({
        txnDate: interestDate.format("D MMM YYYY"),
        valueDate: interestDate.format("D MMM YYYY"),
        description: generateInterest(),
        refNo: "",
        debit: "",
        credit: formatMoney(interest),
        balance: formatMoney(balance)
      });
    }

    month = month.add(1, "month");
  }

  return data;
}