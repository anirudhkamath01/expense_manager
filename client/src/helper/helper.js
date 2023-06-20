import _ from "lodash";

const monthNames = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

// Calculates the sum of transaction amounts based on type
// If type is not provided, returns the total sum of all amounts
export function getSum(transaction, type) {
  let sum = _(transaction)
    .groupBy("type")
    .map((objs, key) => {
      if (!type) return _.sumBy(objs, "amount");
      return {
        type: key,
        color: objs[0].color,
        total: _.sumBy(objs, "amount"),
      };
    })
    .value();
  return sum;
}

// Calculates the percentage of each transaction type relative to the total sum
export function getLabels(transaction, categoriesData) {
  const amountSum = getSum(transaction, "type");

  // Create a map to track existing categories
  const categoryMap = _.keyBy(amountSum, "type");

  // Iterate over categoriesData to include missing categories
  const expenseTotal = categoriesData.map((category) => {
    if (categoryMap[category.type]) {
      // Calculate percentage for existing category
      const total = categoryMap[category.type].total;
      return {
        ...categoryMap[category.type],
        expenseTotal: total,
      };
    } else {
      // Add missing category with 0 total and percentage
      return {
        type: category.type,
        color: category.color,
        total: 0,
        expenseTotal: 0,
      };
    }
  });

  return expenseTotal;
}

// Generates the configuration object for the chart component
export function chartData(transaction) {
  let bg = _.map(transaction, (a) => a.color);
  bg = _.uniq(bg);

  let dataValue = getSum(transaction);

  const config = {
    data: {
      datasets: [
        {
          label: "My First Dataset",
          data: dataValue,
          backgroundColor: bg,
          hoverOffset: 4,
          borderRadius: 30,
          spacing: 10,
        },
      ],
    },
    options: {
      cutout: 114,
    },
  };
  return config;
}

export function barChart(transactions) {
  let monthIndexes = _.map(transactions, (a) => new Date(a.date).getMonth());
  monthIndexes = _.uniq(monthIndexes);
  const labels = monthIndexes.map((index) => monthNames[index]);
  const values = getAmountSumsByMonth(transactions);
  const data = {
    labels: labels,
    datasets: [
      {
        label: "My First Dataset",
        data: values,
        backgroundColor: [
          "rgba(255, 99, 132, 0.2)",
          "rgba(255, 159, 64, 0.2)",
          "rgba(255, 205, 86, 0.2)",
          "rgba(75, 192, 192, 0.2)",
          "rgba(54, 162, 235, 0.2)",
          "rgba(153, 102, 255, 0.2)",
          "rgba(201, 203, 207, 0.2)",
        ],
        borderColor: [
          "rgb(255, 99, 132)",
          "rgb(255, 159, 64)",
          "rgb(255, 205, 86)",
          "rgb(75, 192, 192)",
          "rgb(54, 162, 235)",
          "rgb(153, 102, 255)",
          "rgb(201, 203, 207)",
        ],
        borderWidth: 1,
      },
    ],
  };
  return data;
}

// Calculates the total sum of all transaction amounts
export function getTotal(transaction) {
  const sum = _.sum(getSum(transaction));
  return sum.toFixed(2);
}

export function getAmountSumsByMonth(transactions) {
  const amountSums = transactions.reduce((sums, transaction) => {
    const monthIndex = new Date(transaction.date).getMonth();
    sums[monthIndex] = (sums[monthIndex] || 0) + transaction.amount;
    return sums;
  }, []);

  // Convert object to one-dimensional array
  const amountSumsArray = Object.values(amountSums);

  return amountSumsArray;
}
