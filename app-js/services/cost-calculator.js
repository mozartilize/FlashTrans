export function determineWeightRate(weight, destinationAreaId, weights, rates) {
  let result = {
    rate_weight: null,
    rate_price: null,
    bonus_weight: null,
    bonus_price: null
  }

  const nonBonusWeights = _.sortBy(_.filter(weights, ['bonus', false]), ['weight']);
  let indx = _.sortedIndexBy(nonBonusWeights, {'weight': weight}, 'weight');
  if (indx === nonBonusWeights.length) indx = indx - 1;
  const weightLvl = nonBonusWeights[indx];
  const rate = _.find(rates, rate => (
      rate.weight_id === weightLvl.id &&
      rate.destination_area_id === parseInt(destinationAreaId)
    ));

  result.rate_weight = weightLvl.weight;
  result.rate_price = rate.price;

  if (weight > weightLvl.weight) {
    const bonusWeightLvl = _.find(weights, ['bonus', true]);
    const bonusRate = _.find(rates, rate => (
        rate.weight_id === bonusWeightLvl.id &&
        rate.destination_area_id === parseInt(destinationAreaId)
      ));
    result.bonus_weight = bonusWeightLvl.weight;
    result.bonus_price = bonusRate.price;
  }

  return result;
}

export function calculateCost(weight, weightRate) {
  let cost = weightRate.rate_price;
  if (weightRate.bonus_weight && weightRate.bonus_price) {
    cost = cost + weightRate.bonus_price * Math.ceil((weight - weightRate.rate_weight) / weightRate.bonus_weight);
  }
  return cost;
}
