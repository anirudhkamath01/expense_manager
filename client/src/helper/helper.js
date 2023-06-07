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
export function getLabels(transaction) {
  let amountSum = getSum(transaction, "type");
  let Total = _.sum(getSum(transaction));
  let percent = _(amountSum)
    .map((objs) => _.assign(objs, { percent: (100 * objs.total) / Total }))
    .value();

  return percent;
}

// Generates the configuration object for the chart component
export function chartData(transaction, monthIndex) {
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
  return _.sum(getSum(transaction));
}
