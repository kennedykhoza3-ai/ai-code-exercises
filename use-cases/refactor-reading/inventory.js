function processInventory(requestedItems, inventory, quantityRequested) {
  const successfulItems = [];
  let totalCost = 0;

  for (let requestIndex = 0; requestIndex < requestedItems.length; requestIndex++) {
    const currentItem = requestedItems[requestIndex];
    let itemFound = false;

    for (let inventoryIndex = 0; inventoryIndex < inventory.length; inventoryIndex++) {
      const inventoryItem = inventory[inventoryIndex];

      if (currentItem.id === inventoryItem.id) {
        itemFound = true;

        if (inventoryItem.q >= quantityRequested) {
          successfulItems.push(currentItem);
          totalCost += currentItem.p * quantityRequested;
          inventoryItem.q -= quantityRequested;
        }

        break;
      }
    }

    if (!itemFound) {
      console.log("Item " + currentItem.id + " not available");
    }
  }

  return {
    s: successfulItems,
    t: totalCost
  };
}

function runTests() {
  console.log("Running tests for inventory processing function...");

  let testCase1 = () => {
    const requestedItems = [
      { id: "item1", p: 10 },
      { id: "item2", p: 20 },
      { id: "item3", p: 30 }
    ];

    const inventory = [
      { id: "item1", q: 5 },
      { id: "item2", q: 3 },
      { id: "item3", q: 1 }
    ];

    const quantityRequested = 2;

    const result = processInventory(requestedItems, inventory, quantityRequested);

    let success = true;

    if (result.s.length !== 2) {
      console.error(`FAILED: Expected 2 successful items, got ${result.s.length}`);
      success = false;
    }

    if (result.t !== 60) {
      console.error(`FAILED: Expected total 60, got ${result.t}`);
      success = false;
    }

    if (inventory[0].q !== 3 || inventory[1].q !== 1 || inventory[2].q !== 1) {
      console.error("FAILED: Inventory not updated correctly");
      success = false;
    }

    return success;
  };

  let testCase2 = () => {
    const requestedItems = [
      { id: "item1", p: 10 }
    ];

    const inventory = [
      { id: "item1", q: 1 }
    ];

    const quantityRequested = 2;

    const result = processInventory(requestedItems, inventory, quantityRequested);

    let success = true;

    if (result.s.length !== 0) {
      console.error(`FAILED: Expected 0 successful items, got ${result.s.length}`);
      success = false;
    }

    if (result.t !== 0) {
      console.error(`FAILED: Expected total 0, got ${result.t}`);
      success = false;
    }

    return success;
  };

  let testCase3 = () => {
    const requestedItems = [
      { id: "item1", p: 10 },
      { id: "itemNonExistent", p: 20 }
    ];

    const inventory = [
      { id: "item1", q: 5 }
    ];

    const quantityRequested = 1;

    const result = processInventory(requestedItems, inventory, quantityRequested);

    let success = true;

    if (result.s.length !== 1) {
      console.error(`FAILED: Expected 1 successful item, got ${result.s.length}`);
      success = false;
    }

    if (result.t !== 10) {
      console.error(`FAILED: Expected total 10, got ${result.t}`);
      success = false;
    }

    return success;
  };

  const test1Result = testCase1();
  const test2Result = testCase2();
  const test3Result = testCase3();

  if (test1Result && test2Result && test3Result) {
    console.log("All tests PASSED ✅");
  } else {
    console.log("Some tests FAILED ❌");
  }
}

runTests();