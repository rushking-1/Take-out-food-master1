describe('Take out food', function () {
  it('should generate best charge when best is 指定菜品半价', function () {
    let inputs = ["ITEM0001 x 1", "ITEM0013 x 2", "ITEM0022 x 1"];
    let summary = bestCharge(inputs).trim();
    let expected = `
============= 订餐明细 =============
黄焖鸡 x 1 = 18元
肉夹馍 x 2 = 12元
凉皮 x 1 = 8元
-----------------------------------
使用优惠:
指定菜品半价(黄焖鸡，凉皮)，省13元
-----------------------------------
总计：25元
===================================`.trim()
    expect(summary).toEqual(expected)
  });

  it('should generate best charge when best is 满30减6元', function () {
    let inputs = ["ITEM0013 x 4", "ITEM0022 x 1"];
    let summary = bestCharge(inputs).trim();
    let expected = `
============= 订餐明细 =============
肉夹馍 x 4 = 24元
凉皮 x 1 = 8元
-----------------------------------
使用优惠:
满30减6元，省6元
-----------------------------------
总计：26元
===================================`.trim()
    expect(summary).toEqual(expected)
  });

  it('should generate best charge when no promotion can be used', function () {
    let inputs = ["ITEM0013 x 4"];
    let summary = bestCharge(inputs).trim();
    let expected = `
============= 订餐明细 =============
肉夹馍 x 4 = 24元
-----------------------------------
总计：24元
===================================`.trim()
    expect(summary).toEqual(expected);
  });


  it("should return selected cartItem and sumPrice without discount", ()=> {

    let inputs = ["ITEM0001 x 1", "ITEM0013 x 2", "ITEM0022 x 1"];
    let cartSelected = [
      {
        id: "ITEM0001",
        name: "黄焖鸡",
        price: 18,
        count: 1,
        sum: 0
      },
      {

        id: "ITEM0013",
        name: "肉夹馍",
        price: 6,
        count: 2,
        sum: 0
      },
      {

        id: "ITEM0022",
        name: "凉皮",
        price: 8,
        count: 1,
        sum: 0
      }
    ];

    let sumPriceNoDiscount = [
      {
        id: "ITEM0001",
        name: "黄焖鸡",
        price: 18,
        count: 1,
        sum: 18
      },
      {
        id: "ITEM0013",
        name: "肉夹馍",
        price: 6,
        count: 2,
        sum: 12
      },
      {
        id: "ITEM0022",
        name: "凉皮",
        price: 8,
        count: 1,
        sum: 8
      },
      38,
      0
    ];
    expect(splitString(inputs)).toEqual(cartSelected);
    expect(sumEveryPrice(cartSelected)).toEqual(sumPriceNoDiscount);
  });

  it("return dicountOne 满30减6元", ()=> {

    let sumPriceNoDiscount = [
      {
        id: "ITEM0001",
        name: "黄焖鸡",
        price: 18,
        count: 1,
        sum: 18
      },
      {
        id: "ITEM0013",
        name: "肉夹馍",
        price: 6,
        count: 2,
        sum: 12
      },
      {
        id: "ITEM0022",
        name: "凉皮",
        price: 8,
        count: 1,
        sum: 8
      },
      38,
      0
    ];
    let output = [
      {
        id: "ITEM0001",
        name: "黄焖鸡",
        price: 18,
        count: 1,
        sum: 18
      },
      {
        id: "ITEM0013",
        name: "肉夹馍",
        price: 6,
        count: 2,
        sum: 12
      },
      {
        id: "ITEM0022",
        name: "凉皮",
        price: 8,
        count: 1,
        sum: 8
      },
      32,
      6
    ];
    expect(sumDiscountOne(sumPriceNoDiscount)).toEqual(output);
  });

  it("return dicountTwo 指定菜品半价", ()=> {

    let sumPriceNoDiscount = [
      {
        id: "ITEM0001",
        name: "黄焖鸡",
        price: 18,
        count: 1,
        sum: 18
      },
      {
        id: "ITEM0013",
        name: "肉夹馍",
        price: 6,
        count: 2,
        sum: 12
      },
      {
        id: "ITEM0022",
        name: "凉皮",
        price: 8,
        count: 1,
        sum: 8
      },
      38,
      0
    ];
    let output = [
      {
        id: "ITEM0001",
        name: "黄焖鸡",
        price: 18,
        count: 1,
        sum: 9
      },
      {
        id: "ITEM0013",
        name: "肉夹馍",
        price: 6,
        count: 2,
        sum: 12
      },
      {
        id: "ITEM0022",
        name: "凉皮",
        price: 8,
        count: 1,
        sum: 4
      },
      25,
      13
    ];
    expect(sumDiscountTwo(sumPriceNoDiscount)).toEqual(output);
  });

  it("return bestcharge discount case", ()=> {

    let nodiscount = [
      {
        id: "ITEM0001",
        name: "黄焖鸡",
        price: 18,
        count: 1,
        sum: 18
      },
      {
        id: "ITEM0013",
        name: "肉夹馍",
        price: 6,
        count: 2,
        sum: 12
      },
      {
        id: "ITEM0022",
        name: "凉皮",
        price: 8,
        count: 1,
        sum: 8
      },
      38,
      0
    ];
    let discountOne = [
      {
        id: "ITEM0001",
        name: "黄焖鸡",
        price: 18,
        count: 1,
        sum: 18
      },
      {
        id: "ITEM0013",
        name: "肉夹馍",
        price: 6,
        count: 2,
        sum: 12
      },
      {
        id: "ITEM0022",
        name: "凉皮",
        price: 8,
        count: 1,
        sum: 8
      },
      32,
      6
    ];
    let discountTow = [
      {
        id: "ITEM0001",
        name: "黄焖鸡",
        price: 18,
        count: 1,
        sum: 9
      },
      {
        id: "ITEM0013",
        name: "肉夹馍",
        price: 6,
        count: 2,
        sum: 12
      },
      {
        id: "ITEM0022",
        name: "凉皮",
        price: 8,
        count: 1,
        sum: 4
      },
      25,
      13
    ];
    expect(comparePrice(nodiscount, discountOne, discountTow)).toEqual(discountTow);
  });
});
