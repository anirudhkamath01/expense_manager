import _ from "lodash";

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

// Calculates the total sum of all transaction amounts
export function getTotal(transaction) {
  const sum = _.sum(getSum(transaction));
  return sum.toFixed(2);
}
