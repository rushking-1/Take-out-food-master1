var save = [];

let bestCharge = (selectedItems)=> {
  let selected = splitString(selectedItems).slice(0);
  let getEveryPrice = sumEveryPrice(selected).slice(0);
  let noDiscount = sumEveryPrice(splitString(selectedItems)).slice(0);
  let discountOne = sumDiscountOne(getEveryPrice).slice(0);
  let discountTwo = sumDiscountTwo(selected).slice(0);
  let real = comparePrice(noDiscount, discountOne, discountTwo);

  let str = "============= 订餐明细 =============\n";

  if (real == discountTwo) {
    for (let i = 0; i < real.length - 2; i++) {
      str += real[i].name + " x " + real[i].count + " = " + noDiscount[i].sum + "元\n";
    }
    str += "-----------------------------------\n" + "使用优惠:\n" + "指定菜品半价(";
    for (let j = 0; j < save.length; j++) {
      if (j == save.length - 1)
        str += save[j];
      else
        str += save[j] + "，";

    }
    str += ")，省" + real[real.length - 1] + "元\n" + "-----------------------------------\n" + "总计：" + real[real.length - 2] + "元\n" + "===================================";
  }

  else if (real == discountOne) {
    for (let i = 0; i < real.length - 2; i++) {
      str += real[i].name + " x " + real[i].count + " = " + noDiscount[i].sum + "元\n";
    }
    str += "-----------------------------------\n" + "使用优惠:\n" + "满30减6元，省" + real[real.length - 1] + "元\n" + "-----------------------------------\n" + "总计：" + real[real.length - 2] + "元\n" + "===================================";
  }

  else {
    for (let i = 0; i < real.length - 2; i++) {
      str += real[i].name + " x " + real[i].count + " = " + noDiscount[i].sum + "元\n";
    }
    str += "-----------------------------------\n" + "总计：" + real[real.length - 2] + "元\n" + "===================================";
  }
  return str;
}


let splitString = (inputs)=> {
  let allItems = loadAllItems();
  let selected = [];
  for (let input of inputs) {
    let arr = input.split(" x ");

    for (let item of allItems) {
      if (arr[0] == item.id) {
        selected.push(item);
        item.count = parseInt(arr[1]);
        item.sum = 0;
      }
    }

  }
  return selected;
}

let sumEveryPrice = (selected) => {
  let sumTotal = 0, sumSave = 0;

  for (let item of selected) {
    item.sum = item.price * item.count;
    sumTotal += item.sum;
  }
  selected.push(sumTotal);
  selected.push(sumSave);
  return selected;

}

let sumDiscountOne = (select)=> {
  if (select[select.length - 2] > 30) {
    select[select.length - 2] -= 6;
    select[select.length - 1] = 6;
  }
  return select;
}

let sumDiscountTwo = (selected) => {
  let discount = loadPromotions();
  selected[selected.length - 2] = 0;
  for (let i = 0; i < selected.length - 2; i++) {
    for (let j = 0; j < discount[1].items.length; j++) {
      if (selected[i].id == discount[1].items[j]) {

        save.push(selected[i].name);

        selected[i].sum /= 2;
        selected[selected.length - 1] += selected[i].sum;
      }
    }
    selected[selected.length - 2] += selected[i].sum;
  }
  return selected;

}

let comparePrice = (nodiscount, one, two)=> {
  let bestSave = nodiscount;
  if (one[one.length - 2] < bestSave[bestSave.length - 2]) {
    bestSave = one;
  }
  if (two[two.length - 2] < bestSave[bestSave.length - 2])
    bestSave = two;
  return bestSave;
}
