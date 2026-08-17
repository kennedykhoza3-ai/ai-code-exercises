function standardShipping(packageDetails, destinationCountry) {
  const { weight, length, width, height } = packageDetails;

  let rate;

  if (destinationCountry === "USA") {
    rate = 2.5;
  } else if (destinationCountry === "Canada") {
    rate = 3.5;
  } else if (destinationCountry === "Mexico") {
    rate = 4.0;
  } else {
    rate = 4.5;
  }

  let cost = weight * rate;

  if (weight < 2 && length * width * height > 1000) {
    cost += 5.0;
  }

  return cost;
}

function expressShipping(packageDetails, destinationCountry) {
  const { weight, length, width, height } = packageDetails;

  let rate;

  if (destinationCountry === "USA") {
    rate = 4.5;
  } else if (destinationCountry === "Canada") {
    rate = 5.5;
  } else if (destinationCountry === "Mexico") {
    rate = 6.0;
  } else {
    rate = 7.5;
  }

  let cost = weight * rate;

  if (length * width * height > 5000) {
    cost += 15.0;
  }

  return cost;
}

function overnightShipping(packageDetails, destinationCountry) {
  const { weight } = packageDetails;

  if (destinationCountry === "USA") {
    return weight * 9.5;
  }

  if (destinationCountry === "Canada") {
    return weight * 12.5;
  }

  return "Overnight shipping not available for this destination";
}

const shippingStrategies = {
  standard: standardShipping,
  express: expressShipping,
  overnight: overnightShipping
};

function calculateShippingCost(packageDetails, destinationCountry, shippingMethod) {
  const strategy = shippingStrategies[shippingMethod];

  if (!strategy) {
    return "Invalid shipping method";
  }

  const result = strategy(packageDetails, destinationCountry);

  if (typeof result === "string") {
    return result;
  }

  return result.toFixed(2);
}

function runTests() {
  console.log("Running Strategy Pattern tests...");

  let allPassed = true;

  const packageDetails = {
    weight: 5,
    length: 10,
    width: 10,
    height: 10
  };

  const standardResult = calculateShippingCost(
    packageDetails,
    "USA",
    "standard"
  );

  if (standardResult !== "12.50") {
    console.error(`FAILED: Expected 12.50, got ${standardResult}`);
    allPassed = false;
  }

  const expressResult = calculateShippingCost(
    packageDetails,
    "Canada",
    "express"
  );

  if (expressResult !== "27.50") {
    console.error(`FAILED: Expected 27.50, got ${expressResult}`);
    allPassed = false;
  }

  const overnightResult = calculateShippingCost(
    packageDetails,
    "USA",
    "overnight"
  );

  if (overnightResult !== "47.50") {
    console.error(`FAILED: Expected 47.50, got ${overnightResult}`);
    allPassed = false;
  }

  const unavailableResult = calculateShippingCost(
    packageDetails,
    "Mexico",
    "overnight"
  );

  if (unavailableResult !== "Overnight shipping not available for this destination") {
    console.error("FAILED: Incorrect overnight-unavailable message");
    allPassed = false;
  }

  if (allPassed) {
    console.log("All tests PASSED ✅");
  } else {
    console.log("Some tests FAILED ❌");
  }
}

runTests();